const validateRequired = (fields, req) => {
  for (const field of fields) {
    if (!req.body[field]) {
      return `${field} is required`;
    }
  }
  return null;
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validatePhone = (phone) => {
  const regex = /^\d{10}$/;
  return regex.test(phone);
};

module.exports = { validateRequired, validateEmail, validatePhone };
