
class GetMarvelData{
    constructor(){
        this.address = 'https://gateway.marvel.com:443/v1/public/';
        this.apikey = 'apikey=827ef5444e9fbf654e8fa51f975d051a';
    }       
    post = async(url) => {        
        let res = await fetch(url);
        return this._transformation(await res.json())
    }

    // Не обязательно. Чтобы иметь возможность обращаться
    // к разным адресам
    resPostAllCharacter = () => {        
        return this.post(`
        ${this.address}characters?limit=9&offset=210&${this.apikey}`
        )
    }
    resPostCharacter = (id) => {
        return this.post(`
        ${this.address}characters/${id}?${this.apikey}`
        )
    }
    _transformation = (data) => {
        return(
            {
            name: data.data.results[0].name,
            img: data.data.results[0].thumbnail.path + "." + data.data.results[0].thumbnail.extension,
            description: data.data.results[0].description,
            homepage: data.data.results[0].urls[0].url,
            wiki: data.data.results[0].urls[1].url
            }
        )
    }
}

export default GetMarvelData;

