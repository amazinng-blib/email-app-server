const {
  registerUser,
  getUserReceivedMessages,
  loginUser,
} = require('../controllers/user-controllers');
const { verifyToken } = require('../utils/handletoken');

const router = require('express').Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/get-user-messages', verifyToken, getUserReceivedMessages);

module.exports = router;
