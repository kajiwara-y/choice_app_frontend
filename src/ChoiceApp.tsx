import React from 'react';
import logo from './logo.svg';
import './App.css';
import { PokemonChoice } from './PokemonChoice';
import ChoiceButton from './ChoiceButton'

class ChoiceApp extends React.Component {
    render() {
        return(
            <div className="Container">
            <ChoiceButton pokemonIndex={0}></ChoiceButton>
            <ChoiceButton pokemonIndex={1}></ChoiceButton>
            <ChoiceButton pokemonIndex={2}></ChoiceButton>
            <ChoiceButton pokemonIndex={3}></ChoiceButton>
            <ChoiceButton pokemonIndex={4}></ChoiceButton>
            <ChoiceButton pokemonIndex={5}></ChoiceButton>
            <a className="button Footer" href="#">次の試合へ</a>
            </div>
        )
    }
}

export default ChoiceApp;
