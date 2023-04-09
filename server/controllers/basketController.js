const ApiError = require('../error/ApiError')
const {BasketDevice} = require("../models/models");

class BasketController {
    async create(req, res, next) {
        try {
            const {deviceId} = req.body
            const basket = await BasketDevice.create({basketId: req.user.id, deviceId})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }


    async getAll(req, res, next) {
        try {
            const basket = await BasketDevice.findAll({where: {basketId: req.user.id}})
            return res.json(basket)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new BasketController()