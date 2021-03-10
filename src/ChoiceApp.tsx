import React from 'react';
import './App.css';
import { PokemonChoice } from './PokemonChoice';
import ChoiceButton from './ChoiceButton'
import OBSWebSocket from 'obs-websocket-js'
import {
    gql,
    ApolloClient,
    InMemoryCache 
  } from '@apollo/client';
  
  const apolloClient = new ApolloClient({
    uri: 'http://localhost:3000/graphql',
    cache: new InMemoryCache()
  });

type ChoiceAppState ={
    pokemonChoices:PokemonChoice[];
}
const obs = new OBSWebSocket()
const obsConectar = ()=>{
    const OBS = obs.connect({
        address: 'localhost:4444',
        password: 'yutaka1119'
    }).then(()=>{
        console.log('-> Estas conectado a OBS Studio <-');  
    })

    return OBS;
}

const getPokemonNames = ()=>{
    const promises = [
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName1"}),
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName2"}),
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName3"}),
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName4"}),
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName5"}),
        obs.send('GetTextGDIPlusProperties', {"source":"opoPokemonName6"}),
    ]
    return Promise.all(promises)
}
const GET_POKEMON_INFO = gql`
    query getPokemonsInfo(
        $pokemon1Name: String!
        $pokemon2Name: String!
        $pokemon3Name: String!
        $pokemon4Name: String!
        $pokemon5Name: String!
        $pokemon6Name: String!
    ) {
        battleIndex: saiban{id}
        pokemon1: pokemon(Name: $pokemon1Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
        pokemon2: pokemon(Name: $pokemon2Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
        pokemon3: pokemon(Name: $pokemon3Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
        pokemon4: pokemon(Name: $pokemon4Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
        pokemon5: pokemon(Name: $pokemon5Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
        pokemon6: pokemon(Name: $pokemon6Name) {
            NickName
            No
            Type1
            Type2
            HP
            Attack
            Defence
            SpecialAttack
            SpecialDefence
            Speed
        }
    }`;
class ChoiceApp extends React.Component<{},ChoiceAppState> {
    render() {
        return(
            <>
                <p></p>
                {this.state.pokemonChoices.length > 1 &&
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
                }       
            </>
        )
    }
    constructor(props: {}){
        super(props);
        console.log('constructor')
        const pokemonChoices:PokemonChoice[] = new Array();
        this.state = {
            pokemonChoices:pokemonChoices
        }
    }

    componentDidMount(){
        this.initilize();
    }

    async initilize(){
        let onlyPokemonNames:  string[] = []
        obsConectar().then(() => { return getPokemonNames()})
        .then((pokemonNames) =>{
            onlyPokemonNames = pokemonNames.map(pokemonName => pokemonName.text)
            return apolloClient.query({ query: GET_POKEMON_INFO, 
                variables: {
                    pokemon1Name: onlyPokemonNames[0],
                    pokemon2Name: onlyPokemonNames[1],
                    pokemon3Name: onlyPokemonNames[2],
                    pokemon4Name: onlyPokemonNames[3],
                    pokemon5Name: onlyPokemonNames[4],
                    pokemon6Name: onlyPokemonNames[5],
                },
            })})
        .then((pokemonStatusResult) => {
            console.log(pokemonStatusResult)
            const pokemonChoices:PokemonChoice[] = new Array();
            const hash = Math.random().toString(32).substring(2);
            for (let index = 0; index < 6; index++) {
                const tempPokemonChoice:PokemonChoice = {
                    index:index,
                    name:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].NickName: "",
                    hash:hash,
                    dmax:false,
                    choice:false,
                    color: "none",
                    type1:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].Type1: "",
                    type2:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].Type2: "",
                    hp:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].HP: "",
                    attack:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].Attack: "",
                    defence:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].Defence: "",
                    specialattack:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].SpecialAttack: "",
                    specialdefence:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].SpecialDefence: "",
                    speed:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].Speed: "",
                }
                pokemonChoices.push(tempPokemonChoice)
            }
            this.setState({
                pokemonChoices:pokemonChoices
            });
        }).catch((error) =>{
            console.error(error)
        });
    }

    onPressImg(currentChoice:PokemonChoice){
        const currentState = this.state.pokemonChoices;
        const returnChoice = Object.assign({}, currentChoice);
        obsConectar().then(() => {
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
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_choice_" +  (currentChoice.index + 1),"render":returnChoice.choice});
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_dmax_" +  (currentChoice.index + 1),"render":returnChoice.dmax});
        });
    }   

    sendResult(){
        this.initilize()
    }
}

export default ChoiceApp;
