const ApiError = require('../error/ApiError')
const {BasketDevice} = require("../models/models");

class BasketController {
    async create(req, res) {
        const {basketId, deviceId} = req.body
        const basket = await BasketDevice.create({basketId, deviceId})
        return res.json(basket)
    }

    async getAll(req, res) {
        const {basketId} = req.body
        const basket = await BasketDevice.findAll({where: {basketId}})
        return res.json(basket)
    }
}

module.exports = new BasketController()