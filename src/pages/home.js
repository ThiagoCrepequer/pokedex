import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
    const [dataCompleto, setDataCompleto] = useState([])
    const [selecionado, setSelecionado] = useState('')
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        axios.get('https://pokedex-server.onrender.com/pokemon').then(response => {
            let entries = Object.entries(response.data)
            setDataCompleto(entries)
        })
      }, [])

    // Lógica da pesquisa filtrando os dados de dataCompleto
    let filtrado = dataCompleto.filter(item => item[0].startsWith(pesquisa.toLowerCase()))
    filtrado = filtrado.filter(item => item[1].type.some(type => type.type.name.startsWith(selecionado)))

    return (
        <>
            <form className='formulario-pesquisa'>
                <input 
                    type="search" 
                    id='input-pokemon' 
                    placeholder='Pesquise um pokemon'
                    value={pesquisa}
                    onChange={(event) => {
                        setPesquisa(event.target.value)
                    }}
                    />
                <input type='submit' className='botao-pesquisar'/>
            </form>
            <select 
                className="select-type"
                value={selecionado} 
                onChange={(event) => {
                    setSelecionado(event.target.value);
                }} 
            >
                <option value=''>Início</option>
                <option value='fire'>Fire</option>
                <option value='grass'>Grass</option>
                <option value='poison'>Poison</option>
                <option value='bug'>Bug</option>
                <option value='dragon'>Dragon</option>
                <option value='electric'>Electric</option>
                <option value='ice'>Ice</option>
                <option value='ground'>Ground</option>
                <option value='normal'>Normal</option>
                <option value='rock'>Rock</option>
                <option value='steel'>Steel</option>
                <option value='water'>Water</option>
                <option value='ghost'>Ghost</option>
                <option value='fairy'>Fairy</option>
                <option value='flying'>Flying</option>
                <option value='psychic'>Psychic</option>
            </select>
            <div className='pokemons-container'>
                {filtrado.map(element => (
                    <div key={element[0]} className="bloco-pokemon">
                        <BlocoPokemon value={element} />  
                    </div>
                ))}
            </div> 
        </>
  
    );
}

function BlocoPokemon(props) {
    let element = props.value

    return ( 
        <div>
            <img src={element[1].image_front} alt={"imagem do pokemon " + element[0]}/>
            <p className='Nome' style={props.style}>{element[0]}</p>
            {Object.entries(element[1].type).map((type) => (
               <img src={`../../${type[1].type.name}.jpg`} width='34px' alt={type[1].type.name} key={type[1].type.name}></img>
          ))}
            <Link to={`/pokemon/${element[1].id}`}>
                <button className='botao'>Saiba mais</button> 
            </Link>
        </div>
    )
}

export default Home