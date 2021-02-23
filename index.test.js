const axios = require("axios");
const MockAdapter = require("axios-mock-adapter");
const mock = new MockAdapter(axios);

const findServer = require('./index')

const url1 = "https://does-not-work.perfume.new";
const url2 = "https://gitlab.com";
const url3 = "http://app.scnt.me";
const url4 = "https://offline.scentronix.com";

test('All servers available', async () => {
    mock.onGet(url1).reply(200)
    mock.onGet(url2).reply(200)
    mock.onGet(url3).reply(200)
    mock.onGet(url4).reply(200)

    const result = await findServer()
    
    expect(result).toEqual({ url: url1, priority: 1 })
})

test('Second and third server available', async () => {
    mock.onGet(url1).reply(402)
    mock.onGet(url2).reply(200)
    mock.onGet(url3).reply(200)
    mock.onGet(url4).reply(402)

    const result = await findServer()
    
    expect(result).toEqual({ url: url3, priority: 3 })
})

test('All servers offline', async () => {
    mock.onGet(url1).reply(402)
    mock.onGet(url2).reply(402)
    mock.onGet(url3).reply(402)
    mock.onGet(url4).reply(402)

    const promise = findServer()
    
    expect(promise).rejects.toThrowError("No servers are online.")
})