const {find, update} = require("./database");
const _ = require("lodash");


function validate(stats) {
    if (stats &&
        stats.moduleStudied && typeof(stats.moduleStudied) === 'number' &&
        stats.score && typeof(stats.score === 'number') &&
        stats.timeStudied && typeof(stats.timeStudied === 'number'))
        return true
    else
        return false;
}

// Some validation for userId and courseId, at the moment it's just a check for type String
function validUser(userId) {
    return userId && typeof(userId) === 'string' ? true : false;
}

function validCourse(courseId) {
    return courseId && typeof(courseId) === 'string' ? true : false;
}


function postHandler(courseId, userId, stats){
    if (validUser(userId) && validCourse(courseId) && validate(stats)){
        return update(courseId, userId, stats);
    } else {
        console.log("something failed");
        return null;
    }
}

function getHandler(courseId, userId) {
    if (validUser(userId) && validCourse(courseId)) {
        let stats = find(courseId, userId);

        if (stats) {
            // Calculate Stats
            let totalModulesStudied = _.keys(_.groupBy(stats, "moduleStudied")).length
            let scores              = _.map(stats, "score");
            let averageScore        = _.reduce(scores, (a,b) => a + b) / scores.length
            let timeStudied         = _.reduce(_.map(stats, "timeStudied"), (a,b) => a + b)

            return {
                "totalModulesStudied": totalModulesStudied,
                "averageScore": averageScore,
                "timeStudied": timeStudied
            };
        } else {
            return {};
        }
    }
    else {
        console.log("something failed");
        return null;
    }
}

module.exports = {postHandler, getHandler};