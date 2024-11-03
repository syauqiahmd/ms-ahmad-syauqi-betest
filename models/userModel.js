const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      index: true,
    },
    accountNumber: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    emailAddress: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    identityNumber: {
      type: String,
      unique: true,
      required: true,
      minlength: 16,
      trim: true,
      index: true,
    },
  },
  {
    timestamps: true,
    versionKey: 'version',
  },
);

module.exports = mongoose.model('User', userSchema);
