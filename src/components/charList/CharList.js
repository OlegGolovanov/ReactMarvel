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
        counter: 210
    }

    getMarvelData = new GetMarvelData();

    componentDidMount(){
        this.getMarvelData
            .resPostAllCharacter()
            .then(this._creationChars)
            .catch(this._setStateError);        
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.counter !== prevState.counter) {
            this.getMarvelData       
            .resPostAllCharacter(this.state.counter)
            .then(this._creationChars)
            .catch(this._setStateError);
        }
    }

    onAddNewListChars = () => {
        this.setState(({counter})=> ({
            counter: counter + 9
        }))           
    }

    _setStateError = () => {
        this.setState({
            error: true,
            spinner: false})
    }

    _creationChars = (chars) => {
        this.setState({
            chars: [...this.state.chars, ...chars ],
            spinner: false,
        })
    }
    
    render(){
        const {chars, error, spinner} = this.state;
        const spinnerBlock = spinner ? <Spinner/> : null
        const errorBlock = error ? <Error/> : null
        let li = chars.map(item => {                
                let styleRandomchar = {};   
                if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                    styleRandomchar = {objectFit: "contain"}
                } else {
                    styleRandomchar = {objectFit: "cover"}
                }

                return(
                    <li
                    onClick={()=> {this.props.getId(item.id)}}
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
                <button onClick={this.onAddNewListChars} className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
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
//     }

//     getMarvelData = new GetMarvelData();   

//     componentDidMount(){
//         this.getMarvelData
//         .resPostAllCharacter()
//         .then(this._creationChars)
//         .catch(this._setStateError);
//     }

//     _setStateError = () => {
//         this.setState({
//             error: true,
//             spinner: false})
//     }

//     _creationChars = (chars) => {
//         this.setState({
//             chars,
//             spinner: false,
//         })
//     }
    
//     render(){
//         const {chars, error, spinner} = this.state;
//         const spinnerBlock = spinner ? <Spinner/> : null
//         const errorBlock = error ? <Error/> : null
//         let li = chars.map(item => {                
//                 let styleRandomchar = {};   
//                 if(item.img === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
//                     styleRandomchar = {objectFit: "contain"}
//                 } else {
//                     styleRandomchar = {objectFit: "cover"}
//                 }

//                 return(
//                     <li
//                     onClick={()=> {this.props.getId(item.id)}}
//                     key={item.id} 
//                     className="char__item">
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
//                 <button className="button button__main button__long">
//                     <div className="inner">load more</div>
//                 </button>
//             </div>
//         )
//     }
// }

// export default CharList;