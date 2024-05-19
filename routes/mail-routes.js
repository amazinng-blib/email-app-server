const {
  sendMail,
  deleteUserSentMail,
  deleteUserReceivedMail,
  toggleMailToRead,
} = require('../controllers/mail-controller');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/send-mail', verifyToken, sendMail);
router.put('/read-mail', verifyToken, toggleMailToRead);
router.delete('/delete-sent-mail', verifyToken, deleteUserSentMail);
router.delete('/delete-received-mail', verifyToken, deleteUserReceivedMail);

module.exports = router;
