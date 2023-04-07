const Router = require('express')
const router = new Router()
const deviceController = require('../controllers/deviceController')
const ratingController = require('../controllers/ratingController')

router.post('/', deviceController.create)
router.get('/', deviceController.getAll)
router.get('/:id', deviceController.getOne)

router.post('/rating/', ratingController.create)
router.get('/rating/', ratingController.getAll)


module.exports = router