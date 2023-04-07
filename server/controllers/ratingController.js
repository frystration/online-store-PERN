const ApiError = require('../error/ApiError');
const {Rating} = require("../models/models");


class RatingController {
    async create(req, res, next) {
        try {
            let {userId, deviceId, rate} = req.body
            const rating = await Rating.create({userId, deviceId, rate})
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            let {deviceId} = req.body
            const rating = await Rating.findAll({where: {deviceId}})
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()