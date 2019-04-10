const fetch = require("node-fetch");
const swapi = require("./script2");

// when doing async test remember do expect assertions
// either use return promise or use done

describe("swapi api called", () => {
  it("calls swapi to get people", done => {
    expect.assertions(1);
    swapi.getPeopleAsyncAwait(fetch).then(data => {
      expect(data.count).toEqual(87);
      done();
    });
  });

  it("calls swapi to get people with promise", () => {
    expect.assertions(2);
    return swapi.getPeoplePromise(fetch).then(data => {
      expect(data.count).toEqual(87);
      expect(data.results.length).toBeGreaterThan(1);
    });
  });

  it("getPeople returns count and results", () => {
    const mockFetch = jest.fn().mockReturnValue(
      Promise.resolve({
        json: () =>
          Promise.resolve({
            count: 89,
            results: [0, 1, 2, 3, 4, 5]
          })
      })
    );

    expect.assertions(4);
    return swapi.getPeoplePromise(mockFetch).then(data => {
      expect(mockFetch.mock.calls.length).toBe(1);
      expect(mockFetch).toBeCalledWith("https://swapi.co/api/people");
      expect(data.count).toEqual(89);
      expect(data.results.length).toBeGreaterThan(5);
    });
  });
});
