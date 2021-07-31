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
  
const hostname = window.location.hostname
const apolloClient = new ApolloClient({
  uri: 'http://' + hostname + ':3000/graphql',
  cache: new InMemoryCache()
});

type ChoiceAppState ={
    battleId:string;
    pokemonChoices:PokemonChoice[];
}

type WebsocketInformation ={
    address:string;
    password:string;
}
const obs = new OBSWebSocket()
const obsConectar = async (websocketInfo:WebsocketInformation): Promise<void> =>{
    try{
        await obs.connect({ address: websocketInfo.address, password: websocketInfo.password });
    } catch(error){
        console.error(error)
        throw error
    }
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
const PUT_OPO_CHOICE = gql`
    mutation setOpoChoice(
            $battle_id: Int!
            $opo_choice1: String!
            $opo_choice2: String!
            $opo_choice3: String!
            $opo_choice4: String!
            $opo_dmax: String!
        ) {opoChoice(data:
            {
                battle_id:$battle_id 
                opo_choice1:$opo_choice1
                opo_choice2:$opo_choice2 
                opo_choice3:$opo_choice3 
                opo_choice4:$opo_choice4 
                opo_dmax:$opo_dmax
            }) {
        battle_id
        }
    }`;
class ChoiceApp extends React.Component<{},ChoiceAppState> {
    private websocketInfo :WebsocketInformation = {address : "", password:""}
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
                        <a className="button Footer" href="!#" onClick={n => this.initilize()}>更新</a>
                    </div>
                }       
            </>
        )
    }
    constructor(props: {}){
        super(props);
        console.log('constructor')
        const pokemonChoices:PokemonChoice[] = [];
        this.state = {
            battleId: "",
            pokemonChoices:pokemonChoices
        }
        const reloadTarget = ["my2pokemon1.png","my2pokemon2.png","my2pokemon3.png","my2pokemon4.png","pokemon1.png","pokemon2.png","pokemon3.png","pokemon4.png","pokemon5.png","pokemon6.png"]
        obs.on('SceneItemTransformChanged', data => {
            console.log("SceneItemTransformChanged");
            console.log(data)
            if(reloadTarget.includes(data['item-name'])){
                this.initilize();
            }
        })
    }

    componentDidMount(){
        fetch("http://" + hostname + ':3000/websocketConnectInfo')
        .then(response => response.json())
        .then(data => {
            this.websocketInfo.address = data.websocketAddress
            this.websocketInfo.password = data.websocketPassword
            obsConectar(this.websocketInfo).then(() => {
                this.initilize();
            });
        });
    }

    async initilize(backBattleId: boolean = false){
        let onlyPokemonNames:  string[] = []
        getPokemonNames()
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
            const pokemonChoices:PokemonChoice[] = [];
            const hash = Math.random().toString(32).substring(2);
            const battleId = !backBattleId ? pokemonStatusResult.data["battleIndex"].id : pokemonStatusResult.data["battleIndex"].id - 1;
            for (let index = 0; index < 6; index++) {
                const tempPokemonChoice:PokemonChoice = {
                    index:index,
                    name:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].NickName: "",
                    no:pokemonStatusResult.data["pokemon" + (index + 1)]? pokemonStatusResult.data["pokemon" + (index + 1)].No: "",
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
                obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_choice_" +  (index + 1),"render":false});
                obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_dmax_" +  (index + 1),"render":false});
            }
            this.setState({
                battleId: battleId,
                pokemonChoices:pokemonChoices
            });
        }).catch((error) =>{
            console.error(error)
        });
    }

    onPressImg(currentChoice:PokemonChoice){
        const battleId = this.state.battleId
        const currentState = this.state.pokemonChoices;
        const returnChoice = Object.assign({}, currentChoice);
        obsConectar(this.websocketInfo).then(() => {
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
            const pokemonChoices:PokemonChoice[] = [];
            for (let index = 0; index < 6; index++) {
                if(index === currentChoice.index){
                    pokemonChoices.push(returnChoice)
                }else{
                    pokemonChoices.push(currentState[index])
                }
            }
            this.setState({
                battleId:battleId,
                pokemonChoices:pokemonChoices
            });
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_choice_" +  (currentChoice.index + 1),"render":returnChoice.choice});
            obs.send('SetSceneItemRender', {"scene-name":"choice","source":"background_color_dmax_" +  (currentChoice.index + 1),"render":returnChoice.dmax});
            this.sendResult()
        });
    }   

    sendResult(){
        const battleId = this.state.battleId
        const currentChoices = this.state.pokemonChoices;
        const choicePokemon = currentChoices.filter(choice => choice.choice).map(choice => choice.no)
        const dmaxPokemon = currentChoices.filter(choice => choice.dmax).map(choice => choice.no)
        const choiceResult = {
            battle_id: battleId,
            opo_choice1: choicePokemon[0] ? choicePokemon[0]:"",
            opo_choice2: choicePokemon[1] ? choicePokemon[1]:"",
            opo_choice3: choicePokemon[2] ? choicePokemon[2]:"",
            opo_choice4: choicePokemon[3] ? choicePokemon[3]:"",
            opo_dmax: dmaxPokemon[0] ? dmaxPokemon[0]:"",
        }
        if(choicePokemon.length === 0){
            console.log("no set choice pokemon and not send choice result.")
        }else{
            console.log("choiceResult is" + JSON.stringify(choiceResult))
            apolloClient.mutate({ mutation: PUT_OPO_CHOICE, 
                variables: choiceResult,
            }).then(()=> {
                //this.initilize()
            }).catch((error) =>{
                console.error(error)
            });
        }
    }
}

export default ChoiceApp;
