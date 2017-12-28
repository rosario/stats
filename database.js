const _ = require("lodash");

// Database Mockup. It only provides in memory find and update

let db = {};

function update(courseId, userId, payload) {
    let newStats = [];
    if (_.isEmpty(_.get(db, [courseId, userId]))){
        newStats = [payload];
    } else {
        newStats = _.concat(_.compact(_.get(db, [courseId, userId])), payload);
    }
    _.set(db, [courseId, userId], newStats);
    return newStats;
}

function find(courseId, userId) {
    return (_.get(db, [courseId, userId]) || null);
}


module.exports = {find, update};