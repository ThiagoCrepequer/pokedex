import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
let quantidadeBlocos = 20

function Home() {
    const [dataCompleto, setDataCompleto] = useState([])
    const [selecionado, setSelecionado] = useState('')
    const [pesquisa, setPesquisa] = useState('')
    const [pagina, setPagina] = useState(0)

    useEffect(() => {
        axios.get('https://pokedex-server.onrender.com/pokemon').then(response => {
            let entries = Object.entries(response.data)
            setDataCompleto(entries)
        })
      }, [])

    // Lógica da pesquisa filtrando os dados de dataCompleto e organizando em blocos baseado na variavel quantidadeBlocos
    let filtro = dataCompleto.filter(item => item[0].startsWith(pesquisa.toLowerCase()))
    filtro = filtro.filter(item => item[1].type.some(type => type.type.name.startsWith(selecionado)))
    let filtrado = filtro.slice(pagina, pagina + quantidadeBlocos)

    return (
        <>
            <input 
                type="search" 
                id='input-pokemon' 
                placeholder='Pesquise um pokemon'
                value={pesquisa}
                onChange={(event) => {
                    setPagina(0)
                    setPesquisa(event.target.value)
                }}
                />
            <select 
                className="select-type"
                value={selecionado} 
                onChange={(event) => {
                    setPagina(0)
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
            <nav className='botoes-nav'>
                <button
                    className='botao-anterior'
                    onClick={() => {
                        if(pagina > 0) {
                            setPagina(pagina - quantidadeBlocos)
                        }
                    }}
                >Página anterior</button>

                {
                pagina === 0 ?
                    <button 
                        style={{opacity: 0}}
                        className='botao-pagina-inicial'
                        >Pagina inicial</button> 
                : 
                    <button
                        className='botao-pagina-inicial'
                        onClick={() => {
                            setPagina(0)
                        }}
                    >Página inicial</button>
                }

                <button 
                    className='botao-proximo'
                    onClick={() => {
                        if(pagina + quantidadeBlocos > filtro.length) return
                        setPagina(pagina + quantidadeBlocos)
                    }}
                >Próxima página</button>
            </nav>
            <div className='pokemons-container'>
                {
                filtrado.map(element => (
                    <div key={element[0]} className="bloco-pokemon">
                        <BlocoPokemon value={element} />  
                    </div>
                ))
                }
            </div>
            
        </>
  
    );
}

function BlocoPokemon(props) {
    let element = props.value

    return ( 
        <>
            <img src={element[1].image_front} alt={"imagem do pokemon " + element[0]}/>
            <p className='Nome' style={props.style}>{element[0]}</p>
            {Object.entries(element[1].type).map((type) => (
               <img src={`../../${type[1].type.name}.jpg`} width='34px' alt={type[1].type.name} key={type[1].type.name}></img>
          ))}
            <Link to={`/pokemon/${element[1].id}`}>
                <button className='botao'>Saiba mais</button> 
            </Link>
        </>
    )
}

export default Home