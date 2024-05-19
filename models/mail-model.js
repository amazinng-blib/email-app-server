const mongoose = require('mongoose');
const { Schema } = mongoose;

const mailSchema = new mongoose.Schema(
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
  {
    timestamps: true,
  }
);

const MailModel = mongoose.model('mail', mailSchema);

module.exports = MailModel;
