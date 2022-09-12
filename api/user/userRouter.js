const {createUser,updateUsers,userById,deleteUser,getusers,login} = require('./userControler')
const router = require('express').Router()
const {checkToken}= require('../../auth/token_validation')

router.post('/' ,checkToken,createUser)
router.get('/' ,checkToken, getusers)
router.get('/:id',checkToken,userById)
router.put('/',checkToken,updateUsers)
router.delete('/',checkToken,deleteUser)
router.post('/login',login)

module.exports = router;