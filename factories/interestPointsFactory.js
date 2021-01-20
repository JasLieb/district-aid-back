// const db = require('./databaseMariaFactory');
const InterestPoint = require('../models/interestPointsModel');
// InterestPoint.newPoint(localisation.name, {lng: 1, lat:1}, "Giver");
var GeoJSON = require('geojson');


const getInterestPoints = async () => {
    try {
        // const query = 'SELECT * FROM interest_points';
        // return await db.query(query);
        return await InterestPoint.find({});
    } catch (err) {
        throw err;
    }
}

const createInterestPoint = async (data) => {
    try {
        console.log(data);
        // ${data.localization.lng}, ${data.localization.lat}), '${data.name}', NOW(), ${dueDate}, '${data.type}
        const dueDate = data.dueDate ? data.dueDate : '';
        
        var geoPoint = GeoJSON.parse(data.localization, { Point: ['lng', 'lat'] });
        console.log(geoPoint);
        const point = new InterestPoint({
            type: data.type,
            geometry: geoPoint,
            properties: {
                name: data.name,
                creationDate: new Date(),
                dueDate: dueDate,
                type: data.type
            }
        });

        await point.save();
        return point;
        // const query = `INSERT INTO interest_points (location, name, creation_date, due_date, type) VALUES (POINT(${data.localization.lng}, ${data.localization.lat}), '${data.name}', NOW(), ${dueDate}, '${data.type}')`;
        // await db.query(query);
        // const queryInsertedPoint = `SELECT * FROM interest_points WHERE name='${data.name}' AND type='${data.type}' AND location=POINT(${data.localization.lng}, ${data.localization.lat})`
        // return await db.queryOne(queryInsertedPoint);
    } catch (err) {
        throw err;
    }
}

const deleteInterestPoint = async (data) => {
    try {
        await InterestPoint.deleteOne({
            _id: data
        })
    } catch (err) {
        throw err;
    }
}

const getInterestPointsFollowPosition = async (geoPoint, maxDistance) => {
    try {
        return await InterestPoint.findOne({
            "localization": {
                $near: {
                    $geometry: geoPoint,
                    $maxDistance: `${maxDistance}`
                },
            }
        });
    } catch (err) {
        throw err;
    }
}


module.exports = {
    getInterestPoints,
    createInterestPoint,
    deleteInterestPoint,
    getInterestPointsFollowPosition
}
