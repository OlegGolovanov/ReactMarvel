import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { Component } from 'react/cjs/react.production.min';
import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

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
        error: false
    }    

    // Не обязательно. Выводим отдельную в функцию
    // запись состояния
    _setState = (char) => { 
        this.setState({
            char,
            spinner: false
        })
    }
    _setStateError = () => { 
        this.setState({
            spinner: false,
            error: true
        })
        console.log('error');
        console.log(this.state.error);
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
        .then(this._setState)
        .catch(this._setStateError);
    }

    render(){
    //    Поскольку вытаскиваем не из корня состояния, а из одного из 
    //     объектов состояния
        const {spinner, char, error} = this.state;
        const spinnerBlock = spinner ? <Spinner/> : null;
        const charBlock = !(spinner || error) ?  <RandomCharShow char= {char}/> :null;
        const errorBlock = error ? <Error/> : null

        return (
            <div>
                {spinnerBlock}
                {charBlock}
                {errorBlock}                
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