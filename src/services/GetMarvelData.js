class GetMarvelData{   
    
    post = async (url)=>{
        let res = await fetch(url);
        return await res.json();
    }

    resPost = () => {
     return this.post(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=210&apikey=827ef5444e9fbf654e8fa51f975d051a`)
    }
}

export default GetMarvelData;

