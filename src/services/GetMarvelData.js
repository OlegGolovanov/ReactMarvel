
class GetMarvelData{
    constructor(){
        this.address = 'https://gateway.marvel.com:443/v1/public/';
        this.apikey = 'apikey=827ef5444e9fbf654e8fa51f975d051a';
        this.lorem = `Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Impedit omnis qui fugit illum, voluptate iusto consequatur 
        rem officia doloribus eveniet quaerat odit exercitationem corporis,
        cum sit molestias, delectus officiis veniam?`;
        this.baseСharacter = 210;        
    }
    // Запрос данных с сервера    
    post = async(url) => {        
        let res = await fetch(url);
        return await res.json()
    }    

    // Не обязательно. Чтобы иметь возможность обращаться
    // к разным адресам
    // Обращение к группе персонажей
    resPostAllCharacter = async (offsetCharacter = this.baseСharacter) => {        
        const data = await this.post(`
        ${this.address}characters?limit=9&offset=${offsetCharacter}&${this.apikey}`
        )
        // Если возвращается массив с объектами, то вначале их
        // перебираем через .map, а затем также как в  resPostCharacter
        // берем каждый объект и извлекаем из него необходимые свойства.
        // В this._transformation не записываем аргумент, по скольку он туда
        // передается по умолчанию
        return await data.data.results.map(this._transformation)        
    }

    // Не обязательно. Чтобы иметь возможность обращаться
    // к разным адресам
    // Обращение к персонажу по id
    resPostCharacter = async (id) => {
        const data = await this.post(`
        ${this.address}characters/${id}?${this.apikey}`
        )
        return  this._transformation(await data.data.results[0]);
    }

    _сorrectionDescription = (description) => {
        if (description === "") {
            return description = this.lorem.slice(0, 200) + "..."
        }
    }

    _transformation = (char) => {
        return{
            name: char.name,
            img: char.thumbnail.path + "." + char.thumbnail.extension,
            description: this._сorrectionDescription(char.description),
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            id: char.id,
            comics: char.comics.items
        }
        
    }
}

export default GetMarvelData;

