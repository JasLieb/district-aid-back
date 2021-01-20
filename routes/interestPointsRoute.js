var express = require('express');
var router = express.Router();
var InterestPointFactory = require('../factories/interestPointsFactory');
var GeoJSON = require('geojson');

/**
 * @swagger
 * /points:
 *    get:
 *      description: This should return all interest points
 */
router.get('/', async function (req, res, next) {
    try {
        var interestPoints = await InterestPointFactory.getInterestPoints();
        res.status(200).json(interestPoints).end();
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /points:
 *    post:
 *      description: This should create a interest point
 */
router.post('/', async function (req, res, next) {
    try {
        var interestPoint = await InterestPointFactory.createInterestPoint(req.body);
        res.status(200).json(interestPoint).end();
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /points:
 *    delete:
 *      description: This should delete a interest point
 */
router.delete('/', async function (req, res, next) {
    try {
        await InterestPointFactory.deleteInterestPoint(req.body.id);
        res.status(200).end();
    } catch (err) {
        next(err);
    }
});

/**
 * @swagger
 * /points/nearMe:
 *    get:
 *      description: This should return some interest points follow a position
 */
router.get('/nearMe', async function (req, res, next) {
    try {
        var distanceMax = 1000; // in meters, will be given by front or req object
        var geoPoint = GeoJSON.parse({lng: 1, lat: 1}, { Point: ['lng', 'lat'] }); // Will be given by front or req object
        var InterestPoints = await InterestPointFactory.getInterestPointsFollowPosition(geoPoint.geometry, distanceMax);
        res.status(200).json(InterestPoints ?? []).end();
    } catch (err) {
        next(err);
    }
});

module.exports = router;