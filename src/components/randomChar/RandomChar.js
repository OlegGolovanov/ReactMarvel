import './randomChar.scss';
import thor from '../../resources/img/thor.jpeg';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"

class RandomChar extends Component{

    
    constructor(props){
        super(props)        
        this.getMarvelData = new GetMarvelData();
        this.changeCharacter();
    }
    state = {
        // Записываем состояние в отдельное совойство, 
        // а не в корень, чтобы иметь возможность расширять 
        // состояния дописывая в него новые свойства
        char: {},
        spinner: true,
    }    

    // Не обязательно. Выводим отдельную в функцию
    // запись состояния
    _setState = (char) => { 
        this.setState({
            char,
            spinner: false
        })
        console.log(this.setState.char);
    }

    changeCharacter = () => {
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000)
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
        .then(this._setState);
    }

    render(){
    //    Поскольку вытаскиваем не из корня состояния, а из одного из 
    //     объектов состояния
        const {spinner, char} = this.state;

        return (
            <div className="randomchar">
                {spinner ? <Spinner/> : <RandomCharShow char= {char}/>}
                <div className="randomchar__static">
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button className="button button__main">
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
    return (
        <div className="randomchar__block">
            <img src={img} alt="Random character" className="randomchar__img"/>
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