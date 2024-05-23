const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    sent_mails: [
      {
        sender_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sender_email: String,
        receiver_email: String,
        subject: String,
        content: String,
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
    received_mails: [
      {
        sender_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        receiver_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        sender_email: String,
        receiver_email: String,
        subject: String,
        content: String,
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('users', UserSchema);
module.exports = UserModel;
