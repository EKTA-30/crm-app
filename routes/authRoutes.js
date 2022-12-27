const authController = require("../controllers/authenticationController")

const authJWT = require('../middlewares/authJWT')

module.exports = function (app) {

    app.post('/crm/api/auth/signup', authController.signUp)

    app.post('/crm/api/auth/signin', authController.signIn)

    // app.get('/crm/api/users/allUsers',[authJWT.verifyToken],authController.findAll)

}