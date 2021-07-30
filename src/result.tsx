import React, {useState,useEffect } from "react"

type Props = {
  color?: string;
}

export type BattleResult = {
  battle_id: number
  battle_time: Date
  my_pokemon1: string
  my_pokemon2: string
  my_pokemon3: string
  my_pokemon4: string
  my_pokemon5: string
  my_pokemon6: string
  choice_pokemon1_id: string | null
  choice_pokemon2_id: string | null
  choice_pokemon3_id: string | null
  choice_pokemon4_id: string | null
  result: number | null
  opo_pokemon1: string
  opo_pokemon2: string
  opo_pokemon3: string
  opo_pokemon4: string
  opo_pokemon5: string
  opo_pokemon6: string
  opo_choice1: string | null
  opo_choice2: string | null
  opo_choice3: string | null
  opo_choice4: string | null
  opo_dmax: string | null
}

const hostname = window.location.hostname
const Result: React.VFC<Props> = () => {
  const [result, setResult] = useState([] as BattleResult[])
  useEffect(() => {
    // Update the document title using the browser API
    const apiRequest = (): Promise<BattleResult[]> => fetch("http://" + hostname + ':3000/battleresult').then((x) => x.json());
    apiRequest().then((x) =>{
      const resultData = x.map((d, id) => ({ ...d, id }))
      setResult(resultData)
    });
  },[]);
  const convertPokkemonNum = (pokemonNum:String) =>{
    const regex = /^0+/i;
    let tempPokemonNum = pokemonNum.replace(regex, '').toLowerCase();
    switch(tempPokemonNum){
      case "80a": // ヤドランガラルの姿
        tempPokemonNum = "80g"
        break;
      case "479water": // ウォッシュロトム
        tempPokemonNum = "479w"
        break;
      case "618a": // マッギョガラルの姿
        tempPokemonNum = "618g"
        break;
      case "745a": // ルガルガンまよなかの姿
        tempPokemonNum = "745f"
        break;
      case "745b": // ルガルガンたそがれの姿
        tempPokemonNum = "745d"
        break;
      case "800a": // 日食ネクロズマ
        tempPokemonNum = "800s"
        break;
      case "876a": // イエッサン（メス）
        tempPokemonNum = "876f"
        break;
    }
    return tempPokemonNum
  }
  const createChoiceDOM = (row:BattleResult) =>{
    return(
      <div>
        {myPokemonDom(row, row.my_pokemon1)}
        {myPokemonDom(row, row.my_pokemon2)}
        {myPokemonDom(row, row.my_pokemon3)}
        {myPokemonDom(row, row.my_pokemon4)}
        {myPokemonDom(row, row.my_pokemon5)}
        {myPokemonDom(row, row.my_pokemon6)}
      </div>
    )
  }
  const myPokemonDom = (row:BattleResult, my_pokemon_id:string) =>{
    return(
      <i className={`
                    icon32_sp
                    choice-style
                    n${ convertPokkemonNum(my_pokemon_id)}
                    ${ my_pokemon_id === row.choice_pokemon1_id ? 'choice' : ''}
                    ${ my_pokemon_id === row.choice_pokemon2_id ? 'choice' : ''}
                    ${ my_pokemon_id === row.choice_pokemon3_id ? 'choice' : ''}
                    ${ my_pokemon_id === row.choice_pokemon4_id ? 'choice' : ''}
                `}></i>
    )
  }
  const resultDom = (resultID: number | null) =>{
    let resultMessage = "unknown"
    let resultStyle = {}
    switch(resultID){
      case 1:
        resultMessage = "Win"
        resultStyle = {
          color: "red"
        }
      break;
      case 0:
        resultMessage = "Lose"
        resultStyle = {
          color: "blue"
        }
      break;
    }
    return(
      <p style={resultStyle}>{resultMessage}</p>
    )
  }
  const createOpoDOM = (row:BattleResult) =>{
    return(
      <div>
        {opoPokemonDom(row, row.opo_pokemon1)}
        {opoPokemonDom(row, row.opo_pokemon2)}
        {opoPokemonDom(row, row.opo_pokemon3)}
        {opoPokemonDom(row, row.opo_pokemon4)}
        {opoPokemonDom(row, row.opo_pokemon5)}
        {opoPokemonDom(row, row.opo_pokemon6)}
      </div>
    )
  }
  const opoPokemonDom = (row:BattleResult, opo_pokemon_id:string) =>{
    return(
      <i className={`
                    icon32_sp
                    choice-style
                    n${ convertPokkemonNum(opo_pokemon_id)}
                    ${ opo_pokemon_id === row.opo_choice1 ? 'choice' : ''}
                    ${ opo_pokemon_id === row.opo_choice2 ? 'choice' : ''}
                    ${ opo_pokemon_id === row.opo_choice3 ? 'choice' : ''}
                    ${ opo_pokemon_id === row.opo_choice4 ? 'choice' : ''}
                    ${ opo_pokemon_id === row.opo_dmax ? 'choice-dmax' : ''}
                `}></i>
    )
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>対戦日時</th>
            <th>選出</th>
            <th>勝敗</th>
            <th>相手</th>
          </tr>
        </thead>
        <tbody>
          {
            result.map((row) => (
              <tr key={row.battle_id}>
               <td>{row["battle_time"]}</td>
               <td className="webp">{createChoiceDOM(row)}</td>
               <td className="result">{resultDom(row.result)}</td>
               <td className="webp">{createOpoDOM(row)}</td> 
              </tr>
            ))
          }

        </tbody>
      </table>
    </div>
  );
};
export default Result;