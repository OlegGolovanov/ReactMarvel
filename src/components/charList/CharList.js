// Этот компонент переписал с классового на функциональный. Поэтому
// оставшийся код от классового компанента закомментирован.

import './charList.scss';
import { useState, useEffect} from 'react';
import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

const CharList = ({getId}) => {

    // state = {
    //     chars: [],
    //     error: false,
    //     spinner: true,
    //     counter: 1548,
    //     noActiveBTN: false,
    //     finishedChars: false,
    //     activeCardChars: null
    // }

    const [chars, setChars] = useState([]);
    const [error, setError] = useState(false);
    const [spinner, setSpinner] = useState(true);
    const [counter, setCounter] = useState(1548);
    const [noActiveBTN, setNoActiveBTN] = useState(false);
    const [finishedChars, setFinishedChars] = useState(false);
    const [activeCardChars, setActiveCardChars] = useState(null);

    const getMarvelData = new GetMarvelData();

    // При загрузке страницы сразу подгружаем персонажей
    useEffect(()=> {
        getServerChars();
    // eslint-disable-next-line            
    }, [])
    // componentDidMount(){
    //     this.getServerChars()       
    // }

    // 2п Поскольку при подгрузке персонажей меняем состояние
    // автоматически вызывается этот метод жизненного цикла компанента, 
    // который подгружает еще персонажей
    useEffect(()=>{
        getServerChars();
    // eslint-disable-next-line
    }, [counter])
    // componentDidUpdate(prevProps, prevState) {
    //     if(this.state.counter !== prevState.counter) {
    //         this.getServerChars() 
    //     }
    // }
    

    // Метод загрузки персонажей.
    // 1з действия при загруке персонажей. 
    const getServerChars = () => {        
        // 1з вызываем импортированный экземпляр класса
        getMarvelData      
            // 2з вызываем его метод, который принимает
            // число, от которого идет отсчет загружаемых персонажей,
            .resPostAllCharacter(counter)
            // 3з при положительном вызываем метод создания персонажей
            // eslint-disable-next-line
            .then(_creationChars)
            .catch(_setStateError);
    }
    // При нажатии на кнопку подгружаем еще персонажей.
    // 1п действия при подгрузке    
    const onCharsLoading = () => { 
        setCounter(counter + 9);
        setNoActiveBTN(true)
        // this.setState(({counter})=> ({
        //     counter: counter + 9,
        //     noActiveBTN: true
        // }))           
    }
    
    const _setStateError = ()=> {
        setError(true);
        setSpinner(false);
        // this.setState({
        //     error: true,
        //     spinner: false})
    }
    // 4з создание персонажей, который автоматически
    // в пункте 3з принимает аргумент с загруженным с сервера
    // массивом персонажей
    const _creationChars = (plusChars)=> {
        if (plusChars.length > 0) {
             // 5з объединяем массив с загруженными персонажами с 
            //     // массивом очередных погружаемых
            setChars([...chars, ...plusChars ]);
            setSpinner();
            setNoActiveBTN();
            // this.setState({            //    
            //     chars: [...this.state.chars, ...chars ],
            //     spinner: false,
            //     noActiveBTN: false
            // }) 
            
        } 
        // Если персонажи закончились
        if (plusChars.length < 9) {
            setFinishedChars(true);
            // this.setState({
            //     finishedChars: true
            // }) 
        }       
    }
  
    
    const onInstallationIdChars = (num)=> {        
        setActiveCardChars(num)        
        // this.setState({
        //     activeCardChars: id
        // })        
    }
    
    
    // Показ различных элементов при отсутствии доступа к серверу error,
    // удачной загрузке персонажей chars, персонажи закончились finishedChars,
    // состоянии загрузки персонажей spinner 
    // const {chars, error, spinner, noActiveBTN, finishedChars} = this.state;
    const spinnerBlock = spinner ? <Spinner/> : null
    const errorBlock = error ? <Error/> : null
    // Создание повторяющейся верстки с различным содержанием - разными пероснажами
    let li = chars.map((item, i) => {                
            let styleRandomchar = {};   
            if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                styleRandomchar = {objectFit: "contain"}
            } else {
                styleRandomchar = {objectFit: "cover"}
            }
            // Для выделения нажимаемой карты с персонажем Charachter
            // Если id нажимаемого персонажа равен id из id из состояния 
            // activeCardChars, то в эту переменную записывается tru
            let active = activeCardChars === item.id
            const clazz = active ? "char__item_selected" : ""
            return(
                <li
                onClick={()=> {
                    // Для помещения id в головной файл app 
                    getId(item.id)
                    // Для помещения id в состояние этого файла 
                    onInstallationIdChars(item.id)}}
                className = {`char__item ${clazz}`}
                // Каждой карточке присваиваем порядковый номер, чтобы была возможность
                // выбрать карточнку а клавиатуре
                tabIndex={i+1}
                key={item.id}
                onKeyPress={(e) => {                        
                    if (e.key === ' ' || e.key === "Enter") {
                        getId(item.id)
                        onInstallationIdChars(item.id)
                    }
                    
                }}
                
                >
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
                onClick={onCharsLoading}
                style={{"display" : finishedChars ? "none" : "block"}}
                className="button button__main button__main_active button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
    
}




export default CharList;



// import './charList.scss';
// import { Component } from 'react/cjs/react.production.min';

// import GetMarvelData from '../../services/GetMarvelData'
// import Spinner from "../Spinner/spinner"
// import Error from "../error/error.js"

// class CharList extends Component{
//     state = {
//         chars: [],
//         error: false,
//         spinner: true,
//         counter: 1548,
//         noActiveBTN: false,
//         finishedChars: false,
//         activeCardChars: null
//     }
//     // char__item_selected

//     getMarvelData = new GetMarvelData();

//     // При загрузке страницы сразу подгружаем персонажей
//     componentDidMount(){
//         this.getServerChars()       
//     }

//     // 2п Поскольку при подгрузке персонажей меняем состояние
//     // автоматически вызывается этот метод жизненного цикла компанента, 
//     // который подгружает еще персонажей
//     componentDidUpdate(prevProps, prevState) {
//         if(this.state.counter !== prevState.counter) {
//             this.getServerChars() 
//         }
//     }
//     // Метод загрузки персонажей.
//     // 1з действия при загруке персонажей. 
//     getServerChars = ()=> {
//         // 1з вызываем импортированный экземпляр класса
//         this.getMarvelData      
//             // 2з вызываем его метод, который принимает
//             // число, от которого идет отсчет загружаемых персонажей,
//             .resPostAllCharacter(this.state.counter)
//             // 3з при положительном вызываем метод создания персонажей
//             .then(this._creationChars)
//             .catch(this._setStateError);
//     }
//     // При нажатии на кнопку подгружаем еще персонажей.
//     // 1п действия при подгрузке    
//     onCharsLoading = () => {        
//         this.setState(({counter})=> ({
//             counter: counter + 9,
//             noActiveBTN: true
//         }))           
//     }
    
//     _setStateError = () => {
//         this.setState({
//             error: true,
//             spinner: false})
//     }
//     // 4з создание персонажей, который автоматически
//     // в пункте 3з принимает аргумент с загруженным с сервера
//     // массивом персонажей
//     _creationChars = (chars) => {
//         if (chars.length > 0) {
//             this.setState({
//                 // 5з объединяем массив с загруженными персонажами с 
//                 // массивом очередных погружаемых
//                 chars: [...this.state.chars, ...chars ],
//                 spinner: false,
//                 noActiveBTN: false
//             }) 
//         } 
//         // Если персонажи закончились
//         if (chars.length < 9) {
//             this.setState({
//                 finishedChars: true
//             }) 
//         }       
//     }

//     getRef = (elem) => {
//         this.myRef = elem
//     }
    
//     onInstallationIdChars = (id) => {        
//         this.setState({
//             activeCardChars: id
//         })        
//     }
    
//     render(){
//         // Показ различных элементов при отсутствии доступа к серверу error,
//         // удачной загрузке персонажей chars, персонажи закончились finishedChars,
//         // состоянии загрузки персонажей spinner 
//         const {chars, error, spinner, noActiveBTN, finishedChars} = this.state;
//         const spinnerBlock = spinner ? <Spinner/> : null
//         const errorBlock = error ? <Error/> : null
//         // Создание повторяющейся верстки с различным содержанием - разными пероснажами
//         let li = chars.map((item, i) => {                
//                 let styleRandomchar = {};   
//                 if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                     styleRandomchar = {objectFit: "contain"}
//                 } else {
//                     styleRandomchar = {objectFit: "cover"}
//                 }
//                 // Для выделения нажимаемой карты с персонажем Charachter
//                 // Если id нажимаемого персонажа равен id из id из состояния 
//                 // activeCardChars, то в эту переменную записывается tru
//                 let active = this.state.activeCardChars === item.id
//                 const clazz = active ? "char__item_selected" : ""

//                 return(
//                     <li
//                     onClick={()=> {
//                         // Для помещения id в головной файл app 
//                         this.props.getId(item.id)
//                         // Для помещения id в состояние этого файла 
//                         this.onInstallationIdChars(item.id)}}
//                     className = {`char__item ${clazz}`}
//                     ref = {this.getRef}
//                     // Каждой карточке присваиваем порядковый номер, чтобы была возможность
//                     // выбрать карточнку а клавиатуре
//                     tabIndex={i+1}
//                     key={item.id}
//                     onKeyPress={(e) => {                        
//                         if (e.key === ' ' || e.key === "Enter") {
//                             this.props.getId(item.id)
//                             this.onInstallationIdChars(item.id)
//                         }
                        
//                     }}
                    
//                     >
//                         <img style={styleRandomchar} src={item.img} alt="abyss"/>
//                         <div className="char__name">{item.name}</div>
//                     </li>
//                     )                
//                 });   
//         return (

//             <div className="char__list">
//                 <ul className="char__grid">
//                     {li}
//                     {spinnerBlock}
//                     {errorBlock}                    
//                 </ul>
//                 <button
//                     disabled={noActiveBTN}
//                     onClick={this.onCharsLoading}
//                     style={{"display" : finishedChars ? "none" : "block"}}
//                     className="button button__main button__main_active button__long">
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         )
//     }
// }




// export default CharList;