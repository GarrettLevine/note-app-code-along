const jwt = require('jsonwebtoken');
const JWT_KEY = 'secret phrase';

exports.createToken = (data) => {
  const token = jwt.sign(data, JWT_KEY);
  return token;
};

// we're creating an async function in order to make sure
// that callers don't forget to catch the exception.
exports.verifyToken = async (token) => {
  try {
    const decoded = jwt.verify(token, JWT_KEY);
    console.log(decoded);
    return decoded;
  } catch (err) {
    throw err;
  }
};
