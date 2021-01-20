var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = {
    type: String,
    geometry: {
        type: {type: String},
        coordinates: [Number]
    },
    properties: {
        name: String,
        creationDate: Date,
        dueDate: Date,
        type: {type: String}
    }
};

var interestPointModel = new Schema(schema);

module.exports = mongoose.model('InterestPoint', interestPointModel, 'InterestPoints');