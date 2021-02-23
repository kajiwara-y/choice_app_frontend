import React from 'react';
import { PokemonChoice } from './PokemonChoice';

type ChoiceButtonProps ={
  pokemonChoice: PokemonChoice;
  onPressImg: (pokemonChoice:PokemonChoice) => void;
}

class ChoiceButton extends React.Component<ChoiceButtonProps> {

  onPressImg(e:PokemonChoice){
    this.props.onPressImg(e)
  }
  render() {
    const backgroundStyle:{ [key: string]: string } ={
      background: this.props.pokemonChoice.color
    }
    const imgPath = `../pokemon${this.props.pokemonChoice.index + 1 }.png?${this.props.pokemonChoice.hash}`;
    return (
      <div style={backgroundStyle}>
        <input type="image" src={imgPath} alt="送信する"  onClick={n => this.onPressImg(this.props.pokemonChoice)}/>
      </div>
    );
  }
}

export default ChoiceButton