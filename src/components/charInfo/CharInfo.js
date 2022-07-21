import './charInfo.scss';

import { Component} from 'react/cjs/react.production.min';

import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"
import Skeleton from "../skeleton/Skeleton"


class CharInfo extends Component {
    state = {
        char: null,
        error: false,
        spinner: false
    }
    

    getMarvelData = new GetMarvelData();   
   

    changeCharacter = () => {
        // Если id еще не выбран, то команды ниже не 
        // запустятся, поскольку сработает return
        const {id} = this.props
        
        if(!id) {
            return
        }
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
            .then(this._creationChar)
            .catch(this._setStateError);
    }    

    componentDidMount(){
        this.changeCharacter();
    }

    componentDidUpdate(prevProps) {       
        if(this.props.id !== prevProps.id) {
            this.changeCharacter();
        }        
    }

    _setStateError = () => {
        this.setState({
            error: true,
            spinner: false
        })
    }

    _creationChar = (char) => {
        this.setState({
            char,
            spinner: false,
        })
    }

    _onSpinner = ()=> {
        this.setState({
            spinner: true           
        })
    } 

    render(){
        const {spinner, error, char} = this.state;
        // Если спиннер в позиции true то показывается он
        const loading = spinner ? <Spinner/> : null
        // Если ошибка в позиции true то показывается она
        const errorMessage = error ? <Error/> : null        
        // Если задействованны или спиннер, ошибка, выбран персонаж, то ничего не показывается,
        // а если ничего не задействованно то показывается заглушка (скелетон)
        const skeleton = spinner || error || char ? null : <Skeleton/>  
        // Если отключены спиннер, ошибка и выбран персонаж, то показывается
        // персонаж
        const charInfo = !(spinner || error || !char) ? <Char char = {char}/> : null
        return (
            <div className="char__info">               
                {skeleton}
                {loading}
                {charInfo}
                {errorMessage}
            </div>
        )
    }
}



const Char = ({char}) => {    
    const {name, img, homepage, wiki, description, comics} = char;
    let styleRandomchar = {};   
    if(img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        styleRandomchar = {objectFit: "contain"}
    } else {
        styleRandomchar = {objectFit: "cover"}
    }
    return(
        <>
            <div className="char__basics">
                <img style={styleRandomchar} src={img} alt="abyss"/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">
                {comics.length === 0 ? "Комиксы отсутствуют" : "Comics:"}
                </div>
            <ul className="char__comics-list">
                {comics.map((item, i)=>{
                    if (i > 9) {
                        return null
                    }                                       
                    return( 
                        <li key={item.name} className="char__comics-item">
                            {item.name}
                        </li>
                    )
                    
                })}
                
            </ul>
        
        </>
    )
}

export default CharInfo;