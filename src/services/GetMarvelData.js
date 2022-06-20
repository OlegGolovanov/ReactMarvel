class GetMarvelData{   
    
    _address = 'https://gateway.marvel.com:443/v1/public/';
    
    address = () => {
        return this._address = 'https://gateway.marvel.com:443/v1/public/';
    }
    _apikey = 'apikey=827ef5444e9fbf654e8fa51f975d051a';
    
    post = async(url) => {        
        let res = await fetch(url);
        return await res.json();
    }

    resPostAllCharacter = () => {
        return this.post(`
        ${this.address()}characters?limit=9&offset=210&${this._apikey}`
        )
    }


}

export default GetMarvelData;

