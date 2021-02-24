import React from 'react';
import './App.css';
import { PokemonChoice } from './PokemonChoice';
import ChoiceButton from './ChoiceButton'
import OBSWebSocket from 'obs-websocket-js'


type ChoiceAppState ={
    pokemonChoices:PokemonChoice[];
}
const obs = new OBSWebSocket()
class ChoiceApp extends React.Component<{},ChoiceAppState> {
    render() {
        return(
            <div className="Container">
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[0]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[1]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[2]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[3]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[4]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <ChoiceButton 
                    pokemonChoice={this.state.pokemonChoices[5]} 
                    onPressImg={(currentChoice) => this.onPressImg(currentChoice)} ></ChoiceButton>
                <a className="button Footer" href="#" onClick={n => this.sendResult()}>次の試合へ</a>
            </div>
        )
    }
    constructor(props: {}){
        super(props);
        const hash = Math.random().toString(32).substring(2);
        let pokemonChoices:PokemonChoice[] = new Array();
        for (let index = 0; index < 6; index++) {
            const tempPokemonChoice:PokemonChoice = {
                index:index,
                hash:hash,
                dmax:false,
                choice:false,
                color: "none"
            }
            pokemonChoices.push(tempPokemonChoice)
        }
        this.state = {
            pokemonChoices:pokemonChoices
        };
    }

    onPressImg(currentChoice:PokemonChoice){
        const currentState = this.state.pokemonChoices;
        const returnChoice = Object.assign({}, currentChoice);
        obs.connect({
        }).then(() => {
            if(!currentChoice.choice){
                returnChoice.choice = true;
                returnChoice.color = "aqua"
            }else if(!currentChoice.dmax){
                returnChoice.dmax = true;
                returnChoice.color = "pink"
            }else{
                returnChoice.choice = false;
                returnChoice.dmax = false;
                returnChoice.color = "none"
            }
            const pokemonChoices:PokemonChoice[] = new Array();
            for (let index = 0; index < 6; index++) {
                if(index == currentChoice.index){
                    pokemonChoices.push(returnChoice)
                }else{
                    pokemonChoices.push(currentState[index])
                }
            }
            this.setState({
                pokemonChoices:pokemonChoices
            });
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_choice_" +  currentChoice.index,"render":returnChoice.choice});
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_dmax_" +  currentChoice.index,"render":returnChoice.dmax});
        });
    }   

    sendResult(){
        const hash = Math.random().toString(32).substring(2);
        let pokemonChoices:PokemonChoice[] = new Array();
        for (let index = 0; index < 6; index++) {
            const tempPokemonChoice:PokemonChoice = {
                index:index,
                hash:hash,
                dmax:false,
                choice:false,
                color: "none"
            }
            pokemonChoices.push(tempPokemonChoice)
        }
        this.setState({
            pokemonChoices:pokemonChoices
        });
    }
}

export default ChoiceApp;
