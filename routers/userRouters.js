
const express  = require('express');
const router = express.Router();
const {updateAllUsersByRole,updateUserByID,getallUsers,createNewUser,findUserByRole,deleteUserByID} = require('../controllers/userController');

router.get('/users', getallUsers);
router.post('/users',createNewUser);
router.post('/users/role',findUserByRole);
router.delete('/users/:id',deleteUserByID);
router.put('/users/:id',updateUserByID);
router.put('/usersRoles',updateAllUsersByRole);


module.exports = router;