import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home(props) {
    const [dataCompleto, setDataCompleto] = useState([])
    const [data, setData] = useState([])
    const [selecionado, setSelecionado] = useState()
    const [pesquisa, setPesquisa] = useState('')

    useEffect(() => {
        setDataCompleto(props.data)
        setData(props.data)
    }, [props.data])

    function PesquisaPokemon() {
        return (
            <form className='formulario-pesquisa'>
                <input type="test" id='input-pokemon' placeholder='Pesquise um pokemon'/>
                <input type='submit' className='botao-pesquisar'/>
            </form>
        )
    }

    useEffect(() => {
        // usar o props.onChange no input tava causando problema com a digitação
        const input_pokemon = document.getElementById('input-pokemon')
        input_pokemon.addEventListener('blur', textChange)
        input_pokemon.addEventListener('keypress', function(res) {
            if(res.key === 'Enter') {
                textChange()
            }
        })
    })

    useEffect(() => {
        if(pesquisa === '') {
            setData(dataCompleto)
        } else {
            setData(dataCompleto.filter(item => item[0].startsWith(pesquisa.toLowerCase())).map(item => item))
        }
    }, [pesquisa])

    const textChange = (event) => {
        if(!event) {
            return setPesquisa('')
        } 
        setPesquisa(event.target.value)
    }

    function CaixaSelecao(props) {
        return (
            // Era mais facil usar o map para escrever todos
            <select value={props.value} onChange={props.onChange} className="select-type">
                <option value='inicio'>Início</option>
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
        )
    }

    const handleChance = (event) => {
        setSelecionado(event.target.value)
    }

    useEffect(() => {
        if(selecionado === 'inicio') {
            setData(dataCompleto)
        } else {
            setData(dataCompleto.filter(element => {
                return element[1].type.some(type => type.type.name === selecionado) 
            }))
        }
    }, [selecionado])
        
    function RepetBlocos(props) {
        return (
            <div className='pokemons-container'>
                {props.value.map(element => (
                    <div key={element[0]} className="bloco-pokemon">
                        <BlocoPokemon value={element} /> 
                        
                    </div>
                ))}
            </div> 
        )
    }

    return (
        <div>
            <PesquisaPokemon/>
            <CaixaSelecao value={selecionado} onChange={handleChance}/>
            <RepetBlocos value={data}/>  
        </div>
  
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
            <Button to={`/pokemon/${element[1].id}`}>Saiba mais</Button>
        </div>
    )
}

function Button({ to, children }) {
    return(
      <Link to={to}>
        <button  className='botao'>{children}</button> 
      </Link>
    )
} 

export default Home