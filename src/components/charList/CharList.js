import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import { Component } from 'react/cjs/react.production.min';
import GetMarvelData from '../../services/GetMarvelData'
import Spinner from "../Spinner/spinner"
import Error from "../error/error.js"

class CharList extends Component{
    state = {
        chars: [],
        error: true,
        spinner: false,
    }

    getMarvelData = new GetMarvelData();   

    componentDidMount(){
        this.getMarvelData.
        resPostAllCharacter()
        .then(this._creationChars)
    }

    _creationChars = (chars) => {
        this.setState({chars})
    }
    
    render(){
        const {chars} = this.state;
        if(chars.length > 0) {
            chars.forEach(item => {console.log(item);});
        }
        return (
            <div className="char__list">
                <ul className="char__grid">
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item char__item_selected">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                    <li className="char__item">
                        <img src={abyss} alt="abyss"/>
                        <div className="char__name">Abyss</div>
                    </li>
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;