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
    const hostname = window.location.hostname
    const imgPath = `http://${hostname}:3000/pokemon/${this.props.pokemonChoice.no}.png?${this.props.pokemonChoice.hash}`;
    return (
      <div style={backgroundStyle}>
        <input type="image" src={imgPath} alt="送信する"  onClick={n => this.onPressImg(this.props.pokemonChoice)}/>
        <div className="pokemonInformation">
          {this.props.pokemonChoice.name &&
          <table>
            <tbody>
            <tr><td colSpan={2} align="center">{this.props.pokemonChoice.name}</td></tr>
            <tr><td align="center">タイプ</td><td>{this.props.pokemonChoice.type1} {this.props.pokemonChoice.type2} </td></tr>
            <tr><td align="center">HP</td><td>{this.props.pokemonChoice.hp}</td></tr>
            <tr><td align="center">こうげき</td><td>{this.props.pokemonChoice.attack}</td></tr>
            <tr><td align="center">ぼうぎょ</td><td>{this.props.pokemonChoice.defence}</td></tr>
            <tr><td align="center">とくこう</td><td>{this.props.pokemonChoice.specialattack}</td></tr>
            <tr><td align="center">とくぼう</td><td>{this.props.pokemonChoice.specialdefence}</td></tr>
            <tr><td align="center">すばやさ</td><td>{this.props.pokemonChoice.speed}</td></tr>
            </tbody>
          </table>
  }
        </div>
      </div>
    );
  }
}

export default ChoiceButton