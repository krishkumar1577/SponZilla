// Mock events database
export interface Event {
  id: number;
  name: string;
  organizer: string;
  organizerType: 'club' | 'brand';
  date: string;
  time: string;
  location: string;
  expectedAttendance: string;
  description: string;
  image: string;
  category: string;
  sponsorshipTiers: SponsorshipTier[];
  pastEventImages: string[];
  contact: {
    email: string;
    phone?: string;
  };
}

export interface SponsorshipTier {
  name: string;
  price: string;
  benefits: string[];
}

export const mockEvents: Event[] = [
  {
    id: 1,
    name: 'Tech Conference 2024',
    organizer: 'Computer Science Club',
    organizerType: 'club',
    date: 'October 26, 2024',
    time: '9:00 AM - 5:00 PM',
    location: 'Student Union Ballroom',
    expectedAttendance: '500+',
    category: 'Technology',
    description: 'The Tech Conference is an annual event organized by the Computer Science Club, bringing together students, faculty, and industry professionals for a day of learning, networking, and innovation. This year\'s conference will feature keynote speakers, workshops, and a career fair.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3ccMPX69nkRnhKpMogD56tq1TotEw2R7CzBB2WIamPs28Q8kZWBOfY4pW1P4ineUKFSrWRH9a2t4vOC5lXk2kt5XWVKgRzMLsnTXxvQHR6-IsqD3lYb2GfpxoBoyG2zHq7yfoxaWCAItpjJ0BxR4t1jZuyCe3Lp0ANklD8I4KkCfkXg2JRefCurHGhVRka0L6Tw11M3UuJhPNBG1aoH_VNR7G2JaSUDvsBbU_Cc0z_LnT8B_RRblID9K58NCvKr_-mFol9-oUofE',
    sponsorshipTiers: [
      {
        name: 'Bronze',
        price: '$500',
        benefits: [
          'Logo on event website',
          'Social media mention'
        ]
      },
      {
        name: 'Silver', 
        price: '$1,000',
        benefits: [
          'All Bronze benefits',
          'Booth at career fair',
          'Speaking slot'
        ]
      },
      {
        name: 'Gold',
        price: '$2,000', 
        benefits: [
          'All Silver benefits',
          'Keynote speaking slot',
          'Premium booth location'
        ]
      }
    ],
    pastEventImages: [
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC3ccMPX69nkRnhKpMogD56tq1TotEw2R7CzBB2WIamPs28Q8kZWBOfY4pW1P4ineUKFSrWRH9a2t4vOC5lXk2kt5XWVKgRzMLsnTXxvQHR6-IsqD3lYb2GfpxoBoyG2zHq7yfoxaWCAItpjJ0BxR4t1jZuyCe3Lp0ANklD8I4KkCfkXg2JRefCurHGhVRka0L6Tw11M3UuJhPNBG1aoH_VNR7G2JaSUDvsBbU_Cc0z_LnT8B_RRblID9K58NCvKr_-mFol9-oUofE",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAHfMjs4387dt8VSB4Ixsrf6yffJVsSZcWJhmHyECS3pBD_tzexwCtcp4IHrMuW1Htg217EHNPLl6Re9kzdZN_OG5EvUpg9iLJrdUcHJE2VuKbrNW4P4Szn4sOmwH-wiK6izb-clj5EHGW7dMJkZMog-Os41bVnfCsm1Ei33BCjcu3FAoNBsuPUQJVb1fraxZVu_X8Ig5LwsGyqnoRmgEoGyUbaAFmlLXutdq3q3VTTGADe2JDHYvF1pCEYW9Pwq3sXxK6hcvu3Fuk",
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBhW1gkOuPBduysbgE7boMQtsvbfLmO89XePO2UQogfNTA7JyclIicaIi6Q556m1y4CdcmmwTAAc_Y5ZW30WuhlDRh5qKqIaIdP0I6eU05KWw6jbEnVazCLhM7bUPidN7LuEXQJwVoulO06ir4NohPXj1rERtG_BceHOc94-IQ9zuELNPtu-HUQS-0ZcGURMWPDIlpzhKWflxSxOW52fkmJexewoNqOdPhf4GbsSJuRX4mtpqkrODfqYD5NyRHU4KFzZWyq9uGqXxk"
    ],
    contact: {
      email: 'cs-club@university.edu',
      phone: '(555) 123-4567'
    }
  },
  {
    id: 2,
    name: 'Annual Sports Gala',
    organizer: 'Athletics Department',
    organizerType: 'club',
    date: 'November 15, 2024',
    time: '6:00 PM - 11:00 PM',
    location: 'Campus Stadium',
    expectedAttendance: '1000+',
    category: 'Sports',
    description: 'Join us for the Annual Sports Gala, celebrating athletic excellence and school spirit. This prestigious event will feature awards ceremony, entertainment, and networking opportunities with alumni athletes and sports industry professionals.',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sponsorshipTiers: [
      {
        name: 'Bronze',
        price: '$750',
        benefits: [
          'Logo on event materials',
          'Social media recognition',
          'Complimentary tickets (4)'
        ]
      },
      {
        name: 'Silver', 
        price: '$1,500',
        benefits: [
          'All Bronze benefits',
          'Display booth opportunity',
          'Program advertisement',
          'Complimentary tickets (8)'
        ]
      },
      {
        name: 'Gold',
        price: '$3,000', 
        benefits: [
          'All Silver benefits',
          'Title sponsor recognition',
          'Speaking opportunity',
          'VIP reception access',
          'Complimentary tickets (12)'
        ]
      }
    ],
    pastEventImages: [
      "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80",
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    contact: {
      email: 'athletics@university.edu',
      phone: '(555) 987-6543'
    }
  },
  {
    id: 3,
    name: 'Entrepreneurship Summit',
    organizer: 'Business Club',
    organizerType: 'club',
    date: 'December 8, 2024',
    time: '10:00 AM - 6:00 PM',
    location: 'Business School Auditorium',
    expectedAttendance: '300+',
    category: 'Business',
    description: 'The Entrepreneurship Summit brings together aspiring entrepreneurs, successful business leaders, and investors for a day of inspiration, education, and networking. Features include startup pitch competitions, workshops, and keynote presentations.',
    image: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sponsorshipTiers: [
      {
        name: 'Startup',
        price: '$400',
        benefits: [
          'Logo on website',
          'Social media mention',
          'Networking lunch access'
        ]
      },
      {
        name: 'Growth', 
        price: '$800',
        benefits: [
          'All Startup benefits',
          'Booth space',
          'Workshop sponsorship',
          'Program listing'
        ]
      },
      {
        name: 'Enterprise',
        price: '$1,500', 
        benefits: [
          'All Growth benefits',
          'Keynote sponsorship',
          'Pitch competition judging',
          'VIP networking dinner'
        ]
      }
    ],
    pastEventImages: [
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80",
      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    contact: {
      email: 'business-club@university.edu',
      phone: '(555) 456-7890'
    }
  },
  {
    id: 4,
    name: 'Cultural Arts Festival',
    organizer: 'International Students Association',
    organizerType: 'club',
    date: 'January 20, 2025',
    time: '2:00 PM - 10:00 PM',
    location: 'Campus Cultural Center',
    expectedAttendance: '800+',
    category: 'Cultural',
    description: 'Celebrate diversity and cultural heritage at our Annual Cultural Arts Festival. Experience performances, art exhibits, food from around the world, and cultural workshops that showcase the rich diversity of our campus community.',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    sponsorshipTiers: [
      {
        name: 'Community',
        price: '$300',
        benefits: [
          'Logo on festival materials',
          'Social media recognition',
          'Complimentary admission (2)'
        ]
      },
      {
        name: 'Cultural', 
        price: '$600',
        benefits: [
          'All Community benefits',
          'Food vendor opportunity',
          'Program advertisement',
          'Cultural booth space'
        ]
      },
      {
        name: 'Heritage',
        price: '$1,200', 
        benefits: [
          'All Cultural benefits',
          'Main stage announcement',
          'VIP reception access',
          'Performance slot opportunity'
        ]
      }
    ],
    pastEventImages: [
      "https://images.unsplash.com/photo-1508669232496-137b159c1cdb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1549451371-64aa98a6f660?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    contact: {
      email: 'isa@university.edu',
      phone: '(555) 234-5678'
    }
  },
  {
    id: 5,
    name: 'Green Innovation Expo',
    organizer: 'Environmental Science Club',
    organizerType: 'club',
    date: 'February 14, 2025',
    time: '11:00 AM - 4:00 PM',
    location: 'Science Building Atrium',
    expectedAttendance: '400+',
    category: 'Environment',
    description: 'Discover the latest in sustainable technology and environmental innovation at our Green Innovation Expo. Connect with eco-friendly companies, learn about renewable energy solutions, and participate in sustainability workshops.',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2071&q=80',
    sponsorshipTiers: [
      {
        name: 'Eco',
        price: '$250',
        benefits: [
          'Green certification logo',
          'Sustainability report mention',
          'Eco-friendly booth materials'
        ]
      },
      {
        name: 'Renewable', 
        price: '$500',
        benefits: [
          'All Eco benefits',
          'Workshop sponsorship',
          'Demo space allocation',
          'Speaking opportunity'
        ]
      },
      {
        name: 'Carbon Neutral',
        price: '$1,000', 
        benefits: [
          'All Renewable benefits',
          'Title sponsor recognition',
          'Premium exhibition space',
          'Sustainability award presentation'
        ]
      }
    ],
    pastEventImages: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=2057&q=80",
      "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    ],
    contact: {
      email: 'env-science@university.edu',
      phone: '(555) 345-6789'
    }
  }
];

// Helper function to get event by ID
export const getEventById = (id: number): Event | undefined => {
  return mockEvents.find(event => event.id === id);
};

// Helper function to get all events
export const getAllEvents = (): Event[] => {
  return mockEvents;
};

// Helper function to get events by category
export const getEventsByCategory = (category: string): Event[] => {
  return mockEvents.filter(event => event.category.toLowerCase() === category.toLowerCase());
};

// Helper function to get events by organizer type
export const getEventsByOrganizerType = (type: 'club' | 'brand'): Event[] => {
  return mockEvents.filter(event => event.organizerType === type);
};
