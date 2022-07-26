import './charList.scss';
import { Component } from 'react/cjs/react.production.min';

import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

class CharList extends Component{
    state = {
        chars: [],
        error: false,
        spinner: true,
        counter: 1548,
        noActiveBTN: false,
        finishedChars: false,
    }

    getMarvelData = new GetMarvelData();

    // При загрузке страницы сразу подгружаем персонажей
    componentDidMount(){
        this.getServerChars()       
    }

    // 2п Поскольку при подгрузке персонажей меняем состояние
    // автоматически вызывается этот метод жизненного цикла компанента, 
    // который подгружает еще персонажей
    componentDidUpdate(prevProps, prevState) {
        if(this.state.counter !== prevState.counter) {
            this.getServerChars() 
        }
    }
    // Метод загрузки персонажей.
    // 1з действия при загруке персонажей. 
    getServerChars = ()=> {
        // 1з вызываем импортированный экземпляр класса
        this.getMarvelData      
            // 2з вызываем его метод, который принимает
            // число, от которого идет отсчет загружаемых персонажей,
            .resPostAllCharacter(this.state.counter)
            // 3з при положительном вызываем метод создания персонажей
            .then(this._creationChars)
            .catch(this._setStateError);
    }
    // При нажатии на кнопку подгружаем еще персонажей.
    // 1п действия при подгрузке    
    onCharsLoading = () => {        
        this.setState(({counter})=> ({
            counter: counter + 9,
            noActiveBTN: true
        }))           
    }
    
    _setStateError = () => {
        this.setState({
            error: true,
            spinner: false})
    }
    // 4з создание персонажей, который автоматически
    // в пункте 3з принимает аргумент с загруженным с сервера
    // массивом персонажей
    _creationChars = (chars) => {
        if (chars.length > 0) {
            this.setState({
                // 5з объединяем массив с загруженными персонажами с 
                // массивом очередных погружаемых
                chars: [...this.state.chars, ...chars ],
                spinner: false,
                noActiveBTN: false
            }) 
        } 
        // Если персонажи закончились
        if (chars.length < 9) {
            this.setState({
                finishedChars: true
            }) 
        }       
    }

    getRef = (elem) => {
        this.myRef = elem
    }

    onGetIdChars = (id, name, e) => {
        this.props.getId(id)      
        // if(name === e.target)
        console.log(e.currentTarget.innerText);
        console.log(name);
    }
    
    render(){
        // Показ различных элементов при отсутствии доступа к серверу error,
        // удачной загрузке персонажей chars, персонажи закончились finishedChars,
        // состоянии загрузки персонажей spinner 
        const {chars, error, spinner, noActiveBTN, finishedChars} = this.state;
        const spinnerBlock = spinner ? <Spinner/> : null
        const errorBlock = error ? <Error/> : null
        // Создание повторяющейся верстки с различным содержанием - разными пероснажами
        let li = chars.map(item => {                
                let styleRandomchar = {};   
                if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    styleRandomchar = {objectFit: "contain"}
                } else {
                    styleRandomchar = {objectFit: "cover"}
                }

                return(
                    <li
                    onClick={(e)=> {this.onGetIdChars(item.id, item.name, e)}}
                    ref = {this.getRef}
                    key={item.id} 
                    className="char__item">
                        <img style={styleRandomchar} src={item.img} alt="abyss"/>
                        <div className="char__name">{item.name}</div>
                    </li>
                    )                
                });   
        return (

            <div className="char__list">
                <ul className="char__grid">
                    {li}
                    {spinnerBlock}
                    {errorBlock}                    
                </ul>
                <button
                    disabled={noActiveBTN}
                    onClick={this.onCharsLoading}
                    style={{"display" : finishedChars ? "none" : "block"}}
                    className="button button__main button__main_active button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}




export default CharList;