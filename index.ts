import axios from "axios"

class ServerResponse {
    constructor(
        private url: string,
        private priority: string,
        private status: string,
        private timeout: string,
    ){}

    public getUrl(): string{
        return this.url
    }

    public setUrl(url: string): void{
        this.url = url
    }

    public getPriority(): string{
        return this.url
    }

    public setPriority(url: string): void{
        this.url = url
    }

    public getStatus(): string{
        return this.url
    }

    public setStatus(url: string): void{
        this.url = url
    }

    public getTimeout(): string{
        return this.url
    }

    public setTimeout(url: string): void{
        this.url = url
    }

}

async function findServer(){
    const url = "https://gitlab.com"

        const request = axios.get(`${url}`, {
            headers:{},
        })
    
        request.then((response) => {
            console.log(response.status)
        }).catch((error) =>{
            console.error(error.message)
        })

}

findServer()