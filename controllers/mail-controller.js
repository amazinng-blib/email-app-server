const MailModel = require('../models/mail-model');
const UserModel = require('../models/user-model');

const sendMail = async (req, res) => {
  const { sender_email, receiver_email, subject, content } = req.body;

  try {
    const sender = await UserModel.findOne({ email: sender_email });
    const receiver = await UserModel.findOne({ email: receiver_email });

    // todo: Find sender and receiver in the database

    if (!sender) {
      return res.status(404).json({ message: 'Sender Not found' });
    }

    if (!receiver) {
      return res.status(404).json({ message: 'Receiver Not Found' });
    }
    //todo: Create new email
    const mail = await MailModel.create({
      sender_email,
      receiver_email,
      subject,
      content,
      sender_Id: sender?._id,
      receiver_Id: receiver?._id,
    });

    // todo: Update sender's sent mails and receiver's received mails arrays
    if (sender) {
      sender.sent_mails.push(mail);
    }
    if (receiver) {
      receiver.received_mails.push(mail);
    }

    //todo: Save the changes to the sender and receiver documents
    await sender.save();
    await receiver.save();

    // todo: Respond with success message and mail data
    res.status(201).json({ message: 'Mail sent successfully', mail });
  } catch (error) {
    //todo:  Handle errors
    console.error('Error sending mail:', error);
    res.status(500).json({ error: 'An error occurred while sending the mail' });
  }
};

const deleteUserReceivedMail = async (req, res) => {
  const loggedInUserId = req?.user?._id;
  const mailId = req.body.mailId;
  try {
    const user = await UserModel.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // todo: find the mail to delete
    const sentMailIndex = user.received_mails.findIndex(
      (mail) => mail._id === mailId
    );

    if (sentMailIndex === -1) {
      return res.status(404).json({ message: 'Mail not found' });
    }

    user.received_mails.splice(sentMailIndex, 1);
    await user.save();
    res.status(200).json({ message: 'Mail Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUserSentMail = async (req, res) => {
  const loggedInUserId = req?.user?._id;
  const mailId = req.body.mailId;
  try {
    const user = await UserModel.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: 'Not Found' });
    }

    // todo: find the mail to delete
    const sentMailIndex = user.sent_mails.findIndex(
      (mail) => mail._id === mailId
    );

    if (sentMailIndex === -1) {
      return res.status(404).json({ message: 'Mail not found' });
    }

    user.sent_mails.splice(sentMailIndex, 1);

    await user.save();
    res.status(200).json({ message: 'Mail Deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const toggleMailToRead = async (req, res) => {
  const loggedInUserId = req?.user?._id;
  const mailIdString = req.body.mailId;

  try {
    const user = await UserModel.findById(loggedInUserId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const receivedMail = user.received_mails.find(
      (mail) => mail._id.toString() === mailIdString
    );

    if (!receivedMail) {
      return res.status(404).json({ message: 'Mail not found' });
    }

    receivedMail.isRead = true;

    await user.save();

    res.status(200).json({ message: 'Success', mail: receivedMail });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  sendMail,
  deleteUserReceivedMail,
  deleteUserSentMail,
  toggleMailToRead,
};
