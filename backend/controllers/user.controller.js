import bcryptjs from 'bcryptjs';
import errorHandler from '../utils/errorHandler.js';
import User from '../model/user.model.js';

export const updateUser = async (req, res, next) => {

  // Check if the requesting user is authorized to update the profile
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to update this user'));
  }

  // Initialize updateFields object
  const updateFields = {};

  // Conditionally add fields to updateFields if they are present in the request body
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Password must be at least 6 characters'));
    }
    updateFields.password = bcryptjs.hashSync(req.body.password, 10);
  }

  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(errorHandler(400, 'Username must be between 7 and 20 characters'));
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, 'Username cannot contain spaces'));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, 'Username must be lowercase'));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(errorHandler(400, 'Username can only contain letters and numbers'));
    }

    // Check if the new username already exists in the database
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser && existingUser._id.toString() !== req.params.userId) {
      return next(errorHandler(400, 'Username is already taken'));
    }

    updateFields.username = req.body.username;
  }

  if (req.body.email) {
    updateFields.email = req.body.email;
  }

  if (req.body.profilePicture) {
    updateFields.profilePicture = req.body.profilePicture;
  }

  // Check if there are no fields to update
  if (Object.keys(updateFields).length === 0) {
    return next(errorHandler(400, 'No fields to update'));
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedUser) {
      return next(errorHandler(404, 'User not found'));
    }

    // Exclude the password from the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json({ success: true, ...rest });
  } catch (error) {
    // Handle duplicate key error
    if (error.code === 11000) {
      return next(errorHandler(400, 'Duplicate key error'));
    }
    console.error('Error Updating User:', error);
    next(error);
  }
};
