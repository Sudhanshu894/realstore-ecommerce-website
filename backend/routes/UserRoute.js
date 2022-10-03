const express = require('express');
const { registerUser, loginUser, logoutUser, forgetUserPassword, resetPassword, getUserInfo, changeUserPassword, updateProfile, GetSpecificUser, GetAllUsers, UpdateUserRole, DeleteUser } = require('../controllers/UserController');
const { IsAuthenticated, RolesBasedAuthorization } = require('../middleware/auth');

const router = express.Router();


router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/password/forget').post(forgetUserPassword);
router.route("/password/reset/:token").patch(resetPassword);
router.route('/logout').get(logoutUser);

router.route('/profile').get(IsAuthenticated, getUserInfo);
router.route('/password/update').patch(IsAuthenticated, changeUserPassword);
router.route('/profile/update').patch(IsAuthenticated, updateProfile);
router.route('/admin/users').get(IsAuthenticated, RolesBasedAuthorization("admin"), GetAllUsers);
router.route('/admin/users/:id').get(IsAuthenticated, RolesBasedAuthorization("admin"), GetSpecificUser).patch(IsAuthenticated, RolesBasedAuthorization("admin"), UpdateUserRole).delete(IsAuthenticated, RolesBasedAuthorization("admin"), DeleteUser);

module.exports = router