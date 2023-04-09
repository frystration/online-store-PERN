const ApiError = require('../error/ApiError');
const {Rating, Device} = require("../models/models");
const {getAverage} = require("../utils/getAvarage");


class RatingController {
    async create(req, res, next) {
        try {
            let {deviceId, rate} = req.body

            await Rating.create({userId: req.user.id, deviceId, rate})

            const ratingByDeviceId = await Rating.findAll({where: {deviceId}})

            const rating = getAverage(ratingByDeviceId)

            await Device.update({rating: rating},
                {
                    where: {id: deviceId}
                }
            );
            return res.json(rating)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }

    async check(req, res, next) {
        try {
            let {deviceId} = req.query
            const isRate = await Rating.findOne(
                {
                    where: {userId: req.user.id, deviceId}
                }
            )

            return res.json(isRate)
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }
    }
}

module.exports = new RatingController()