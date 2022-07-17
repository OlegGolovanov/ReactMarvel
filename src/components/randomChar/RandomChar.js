import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

class RandomChar extends Component{   
    state = {
        // Записываем состояние в отдельное совойство, 
        // а не в корень, чтобы иметь возможность расширять 
        // состояния дописывая в него новые свойства
        char: {},
        spinner: true,
        error: false
    }    
    getMarvelData = new GetMarvelData();

    // Не обязательно. Выводим отдельную в функцию
    // запись состояния
    _setState = (char) => { 
        this.setState({
            char,
            spinner: false
        })
    }
    // Не обязательно. Смена сосотояния 
    // при ошибке
    _setStateError = () => { 
        this.setState({
            spinner: false,
            error: true
        })
    }

    _onSpinner =()=> {
        this.setState({
            spinner: true           
        })
    }  
    
    // Загрузка данных из сервера
    // для сайта
    changeCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
        // Чтобы спиннер запускался в момнет запроса данных с сервера
        this._onSpinner()
        // Конструктор с запросом на сервер.       
        this.getMarvelData
        // Метод, в котором храниться в fetch        
        .resPostCharacter(id)
        // Промисы
        // Не обязательно. Запись состояния вынесена 
        // в отдельную функцию this._setState. Полученный
        // ответ от сервера записывается в эту функцию без явного
        // написания об этом.
        // .then(char=> this._setState(char)) длинная запись;
        .then(this._setState)
        .catch(this._setStateError);
    }

    componentDidMount(){
        this.changeCharacter();
    }    

    render(){        
    //    Поскольку вытаскиваем не из корня состояния, а из одного из 
    //     объектов состояния
        const {spinner, char, error} = this.state;
        const spinnerBlock = spinner ? <Spinner/> : null;
        const charBlock = !(spinner || error) ?  <RandomCharShow char= {char}/> :null;
        const errorBlock = error ? <Error/> : null

        return (
            <div className="randomchar">
                {spinnerBlock}
                {charBlock}
                {errorBlock}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={this.changeCharacter} className="button button__main">
                        <div className="inner">try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </div>               
            </div>
        )
    }
}


const RandomCharShow = ({char}) => {    
    const {name, img, homepage, wiki, description} = char;
    let styleRandomchar = {};   
    if(img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleRandomchar = {objectFit: "contain"}
    } else {
        styleRandomchar = {objectFit: "cover"}
    }
    return (
        <div className="randomchar__block">
            <img style={styleRandomchar} src={img} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default RandomChar;