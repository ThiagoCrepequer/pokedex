import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function PokemonPage({ match }) {
  const [data, setData] = useState()
  const [proximoPokemon, setProximoPokemon] = useState()
  const [anteriorPokemon, setAnteriorPokemon] = useState()
  const [id, setId] = useState()

  // o useEffect é usado para atulizar o valor de id toda vez que o valor da url é alterado, fazendo com que toda a pagina seja carragada
  useEffect(() => {
    setId(match.params.id)
  }, [match.params.id])

  // Várias requests para criar o layout (Não está funcionando de uma forma eficiente)
  axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) + 1}`).then((response) => {
    let entries = Object.entries(response.data)
    setProximoPokemon(entries[10][1])
  })
  axios.get(`https://pokeapi.co/api/v2/pokemon/${parseInt(id) - 1}`).then((response) => {
    let entries = Object.entries(response.data)
    setAnteriorPokemon(entries[10][1])
  })
  axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => {
    let entries = Object.entries(response.data)
    setData(entries)
  })
  
  return (
    data ?
    <>
      <nav className="menu-pokemons">
        <Link to={`/pokemon/${parseInt(id) - 1}`}>
          <button className="botao-menu">Anterior: {anteriorPokemon}</button>
        </Link>
        <Link to={'/'}>
          <button className="botao-menu">Inicial</button>
        </Link>
        <Link to={`/pokemon/${parseInt(id) + 1}`}>
          <button className="botao-menu">Próximo: {proximoPokemon}</button>
        </Link>
      </nav>
    <div className="container-detalhes">
      <div className="container-imagem">
        <img className="imagem-pokemon" src={data[14][1].front_default} alt={'imagem da frente do pokemon ' + data[10][1]}/>
        <img className="imagem-pokemon" src={data[14][1].back_default} alt={'imagem das costas do pokemon ' + data[10][1]}/>

        <div><h1>Nome:</h1> 
          <span> {data[10][1]}</span>
        </div>
        <div><h2>Habilidades:</h2> 
          {data[0][1].map(element => (  
            <span key={element.ability.name}> {element.ability.name}</span>
          ))}
        </div>
      </div>
      <div className="movimentos-pokemons"><h2>Movimentos:</h2> 
        {data[9][1].map(element => (  
          <span key={element.move.name}> {element.move.name},</span>
        ))}
      </div>
      <div><h2>Tipo:</h2>
          {data[15][1].map(element => (
            <span key={element.stat.name}> {element.stat.name},</span>
          ))}
      </div>
      <div>
        <h2>Peso</h2>
          <span>{data[17][1]} g</span>
        <h2>Altura</h2>
          <span>{parseInt(data[4][1])/10} m</span>
      </div>
    </div>
    </>
    :
    <>
      <h1>Erro 404 - página não econtrada</h1>
      <p>Id: {id} não encontrado</p>
    </>
  )
}

export default PokemonPage