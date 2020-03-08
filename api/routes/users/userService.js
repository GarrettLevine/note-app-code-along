const User = require('./userModel');

exports.createUser = async ({ email, password, firstName, lastName }) => {
  try {
    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
    });
    const user = await newUser.save();
    return user;
  } catch (ex) {
    throw ex;
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (ex) {
    throw ex;
  }
}