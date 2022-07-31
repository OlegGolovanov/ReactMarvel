import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import decoration from '../../resources/img/vision.png';

import { useState } from "react";

const App = () => {
    const [id, setId] = useState(null);
    
    function getId(num){
        setId(num)
    }
    return (
        <div className="app">
            <AppHeader/>
            <main>
                <RandomChar/>
                <div className="char__content">
                    <CharList getId = {getId}
                    id = {id}/>
                    <ErrorBoundary>
                        <CharInfo id = {id}/>
                    </ErrorBoundary>                    
                </div>
                <img className="bg-decoration" src={decoration} alt="vision"/>
            </main>
        </div>
    )    
}

export default App;