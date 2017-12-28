var request = require("request");

var base_url = "http://localhost:3000/"

describe("Courses Controller: ", () => {

    describe("POST /courses", () => {

        it("returns 200", (done) => {
            let postOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-User-Id": "user-A"
                },
                url: base_url + "courses/course123",
                json: {
                    "totalModulesStudied": 123,
                    "average":456,
                    "timeStudied":898
                }
            };

            request(postOptions, (error, response, body) => {
                expect(response.statusCode).toBe(200);
                done();
            });

        });
    });

    describe("GET /courses", () => {

        it("returns stats if the course and the user is found ", (done) => {

            let postOptions = {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "X-User-Id": "user-B"
                },
                url: base_url + "courses/course123",
                json: {
                    "moduleStudied": 111,
                    "score": 222,
                    "timeStudied": 333
                }
            };

            request(postOptions, (error, response, body) => {

                let headers = {
                    "content-type": "application/json",
                    "X-User-Id": "user-B"
                };

                let getOptions = {headers: headers, "url": base_url + "courses/course123"};
                request.get(getOptions, (error, response, body) => {
                    let expectedResponse = { totalModulesStudied : 1, averageScore : 222, timeStudied : 333 };
                    expect(JSON.parse(body)).toEqual(expectedResponse);
                    expect(response.statusCode).toBe(200);
                    done();
                });
            });
        });
    });
});