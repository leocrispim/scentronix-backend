async function findServer() {
    const axios = require('axios', 'AxiosResponse')
    const mockList = require('./mock.json');
    axios.defaults.timeout = 5000;
    
    let onlineServers = []

    const results = await Promise.allSettled(mockList.map(item => fetchItem(item)))

    async function fetchItem(item) {
        url = item.url,
        priority = item.priority

        return axios.get(`${url}`).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                mockList.map(item => {
                    if(item.url === response.config.url){
                        onlineServers.push(item)
                    }
                })
                return response.config.url
            }
        })
    }
    
    if(onlineServers.length === 0){
        return console.error("No servers are online.")
    }
    else{
        onlineServers.sort(function (a, b){
            return a.priority - b.priority
        })
        return console.log(onlineServers[0])
    }
}

module.exports = {
    findServer
}

findServer()