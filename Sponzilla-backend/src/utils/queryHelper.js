const paginationHelper = (page, limit) => {
  const skip = (page - 1) * limit;
  return { skip, limit: parseInt(limit) };
};

const populateFields = (query, populations) => {
  // Example: populateFields(query, [
  //   { path: 'userId', select: 'name email' },
  //   { path: 'eventId', select: 'title' }
  // ])
  populations.forEach(pop => query.populate(pop));
  return query;
};

module.exports = { paginationHelper, populateFields };
