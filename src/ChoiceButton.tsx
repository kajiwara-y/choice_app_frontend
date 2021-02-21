import React from 'react';
import { PokemonChoice } from './PokemonChoice';

type ChoiceButtonProps ={
  pokemonIndex: number
}

type ChoiceButtonState ={
  pokemonChoice: PokemonChoice;
  color:string;
}
class ChoiceButton extends React.Component<ChoiceButtonProps, ChoiceButtonState> {
  constructor(props: ChoiceButtonProps){
    super(props);
    const tempPokemonChoice: PokemonChoice ={
      index : props.pokemonIndex,
      choice : false,
      dmax : false
    };
    this.state = {
      pokemonChoice:tempPokemonChoice,
      color:"none"
    };
  }

  onPressImg(){
    const currentStateChoice = this.state.pokemonChoice;
    if(!currentStateChoice.choice){
      const tempPokemonChoice: PokemonChoice ={
        index : currentStateChoice.index,
        choice : true,
        dmax : false
      }
      this.setState({
        pokemonChoice: tempPokemonChoice,
        color: "aqua"
      });
    }else if(!currentStateChoice.dmax){
      const tempPokemonChoice: PokemonChoice ={
        index : currentStateChoice.index,
        choice : true,
        dmax : true
      }
      this.setState({
        pokemonChoice: tempPokemonChoice,
        color: "pink"
      });
    }else{
      const tempPokemonChoice: PokemonChoice ={
        index : currentStateChoice.index,
        choice : false,
        dmax : false
      }
      this.setState({
        pokemonChoice: tempPokemonChoice,
        color: "none"
      });
    }
  }

  render() {
    const imgPath = `../pokemon${this.props.pokemonIndex + 1 }.png`;
    const backgroundStyle:{ [key: string]: string } ={
      background: this.state.color
    }
    return (
      <div style={backgroundStyle}>
        <input type="image" src={imgPath} alt="送信する"  onClick={n => this.onPressImg()}/>
      </div>
    );
  }
}

export default ChoiceButton