async function findServer() {
    const axios = require('axios', 'AxiosResponse')

    const mockList = require('./mock.json');

    const results = await Promise.allSettled(mockList.map(item => fetchItem(item)))

    async function fetchItem(item) {
        url = item.url,
        priority = item.priority

        // url = "https://does-not-work.perfume.new" error
        // url = "https://gitlab.com" 200
        // url = "http://app.scnt.me" 200
        // url = "https://offline.scentronix.com" error

        await axios.get(`${url}`).then((response) => {
            if (response.status === 200) {
                console.log(url)
            }
        })
        .catch((error) => {
            // console.log("Log de erro " + error.message)
        })
    }

    console.log(results)

}

module.exports = {
    findServer
}

findServer()