const {postHandler, getHandler} = require("../handlers")


describe("getHandler", () => {

    it("returns empty array when the course is not found", () => {
        let result = getHandler("course1", "user1");
        expect(result).toEqual({});
    });

    it("returns empty array when the user is not found", () => {
        let result = getHandler("course1", "user1");
        expect(result).toEqual({});
    });

    it("returns an the stats object when the course and user is found", () => {

        // Update stats
        let stats1 = {"moduleStudied": 123, "score":5, "timeStudied":898};
        postHandler("course1", "user1", stats1);

        let stats2 = {"moduleStudied": 123, "score":10, "timeStudied":898};
        postHandler("course1", "user1", stats2);

        let result = getHandler("course1", "user1")

        let expectedResponse = {
            totalModulesStudied : 1, averageScore : 7.5, timeStudied : 1796
        };
        expect(result).toEqual(expectedResponse);
    });

});

describe("postHandler", () => {

    it("store stats for a course and user", () => {
        let stats = {"moduleStudied": 123, "score":456, "timeStudied":898};
        let result = postHandler("course1", "user2", stats);
        expect(result).toEqual([stats]);
    })
});