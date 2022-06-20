
class GetMarvelData{
    constructor(){
        this.address = 'https://gateway.marvel.com:443/v1/public/';
        this.apikey = 'apikey=827ef5444e9fbf654e8fa51f975d051a';
    }       
    post = async(url) => {        
        let res = await fetch(url);
        return await res.json();
    }

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


}

export default GetMarvelData;

