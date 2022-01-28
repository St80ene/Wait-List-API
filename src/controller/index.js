import User from '../model/user.js';

const register = async (req, res) => {
  try {
    const { full_name, email, asset_description, type } = req.body;
    
    // Check DB for duplicate email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(401)
        .json({ status: 401, message: 'Email already in use' });
    }

    const new_user = await User.create({
      name: full_name,
      email,
      type,
      asset_description,
    });

    return res.status(201).json({
      status: 'success',
      message: 'User created successfully',
      user: new_user,
    });
  } catch (error) {
    return {
      status: 'false',
      message: 'Internal Server error',
      error: error.message,
    };
  }
};

export default register;
