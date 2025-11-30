const Event = require('../models/Event');
const ClubProfile = require('../models/ClubProfile');

class EventController {
    // Create a new event
    async createEvent(req, res) {
        try {
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(403).json({ error: 'Club profile not found. Please create one first.' });
            }
            const event = await Event.create({
                clubId: clubProfile._id,
                ...req.body
            });

            res.status(201).json({
                message: 'Event created successfully',
                event
            });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    async getAllEvents(req, res) {
        try {
            const {
                category,
                status,
                search,
                upcoming,
                page = 1,
                limit = 10
            } = req.query;

            // Build filter
            const filter = {};

            if (category) filter.category = category;
            if (status) filter.status = status;

            // Show only published events by default (unless specified)
            if (!status) filter.status = 'published';

            // Search by text
            if (search) {
                filter.$text = { $search: search };
            }

            // Filter upcoming events
            if (upcoming === 'true') {
                filter.eventDate = { $gt: new Date() };
            }

            // Pagination
            const skip = (page - 1) * limit;

            const events = await Event.find(filter)
                .populate('clubId', 'clubName university logo')
                .skip(skip)
                .limit(parseInt(limit))
                .sort({ eventDate: 1 });  // Nearest events first

            const total = await Event.countDocuments(filter);

            res.json({
                events,
                pagination: {
                    total,
                    page: parseInt(page),
                    pages: Math.ceil(total / limit)
                }
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET SINGLE EVENT (PUBLIC) =====
    async getEventById(req, res) {
        try {
            const event = await Event.findById(req.params.id)
                .populate('clubId', 'clubName university description logo contactPerson');

            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Increment views
            event.analytics.views += 1;
            await event.save();

            res.json({ event });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET MY EVENTS (CLUB ONLY) =====
    async getMyEvents(req, res) {
        try {
            // Get club profile
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(404).json({
                    error: 'Club profile not found'
                });
            }

            const events = await Event.find({ clubId: clubProfile._id })
                .sort({ createdAt: -1 });

            res.json({ events });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== UPDATE EVENT (CLUB ONLY) =====
    async updateEvent(req, res) {
        try {
            // Get club profile
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(404).json({
                    error: 'Club profile not found'
                });
            }

            // Find event
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Check if this club owns the event
            if (event.clubId.toString() !== clubProfile._id.toString()) {
                return res.status(403).json({
                    error: 'You can only update your own events'
                });
            }

            // Update event
            const updatedEvent = await Event.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );

            res.json({
                message: 'Event updated successfully',
                event: updatedEvent
            });

        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    // ===== DELETE EVENT (CLUB ONLY) =====
    async deleteEvent(req, res) {
        try {
            // Get club profile
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(404).json({
                    error: 'Club profile not found'
                });
            }

            // Find event
            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Check ownership
            if (event.clubId.toString() !== clubProfile._id.toString()) {
                return res.status(403).json({
                    error: 'You can only delete your own events'
                });
            }

            await Event.findByIdAndDelete(req.params.id);

            res.json({ message: 'Event deleted successfully' });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET FEATURED EVENTS (PUBLIC) =====
    async getFeaturedEvents(req, res) {
        try {
            const events = await Event.find({
                featured: true,
                status: 'published',
                eventDate: { $gt: new Date() }
            })
                .populate('clubId', 'clubName university logo')
                .limit(6)
                .sort({ eventDate: 1 });

            res.json({ events });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET UPCOMING EVENTS (PUBLIC) =====
    async getUpcomingEvents(req, res) {
        try {
            const events = await Event.find({
                status: 'published',
                eventDate: { $gt: new Date() }
            })
                .populate('clubId', 'clubName university logo')
                .limit(10)
                .sort({ eventDate: 1 });

            res.json({ events });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET EVENTS BY CATEGORY (PUBLIC) =====
    async getEventsByCategory(req, res) {
        try {
            const { category } = req.params;

            const events = await Event.find({
                category,
                status: 'published',
                eventDate: { $gt: new Date() }
            })
                .populate('clubId', 'clubName university logo')
                .limit(20)
                .sort({ eventDate: 1 });

            res.json({
                category,
                count: events.length,
                events
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== PUBLISH EVENT (CLUB ONLY) =====
    async publishEvent(req, res) {
        try {
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(404).json({
                    error: 'Club profile not found'
                });
            }

            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Check ownership
            if (event.clubId.toString() !== clubProfile._id.toString()) {
                return res.status(403).json({
                    error: 'You can only publish your own events'
                });
            }

            event.status = 'published';
            await event.save();

            res.json({
                message: 'Event published successfully',
                event
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    // ===== GET EVENT STATS (CLUB ONLY) =====
    async getEventStats(req, res) {
        try {
            const clubProfile = await ClubProfile.findOne({ userId: req.userId });
            if (!clubProfile) {
                return res.status(404).json({
                    error: 'Club profile not found'
                });
            }

            const event = await Event.findById(req.params.id);
            if (!event) {
                return res.status(404).json({ error: 'Event not found' });
            }

            // Check ownership
            if (event.clubId.toString() !== clubProfile._id.toString()) {
                return res.status(403).json({
                    error: 'Access denied'
                });
            }

            res.json({
                stats: event.analytics
            });

        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new EventController();
