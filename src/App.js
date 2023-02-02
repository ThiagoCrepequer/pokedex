import './App.css';
import './pages/home.css'
import './pages/pokemonPage.css'
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Home  from './pages/home'
import PokemonPage from './pages/pokemonPage'

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    axios.get('https://pokedex-server.onrender.com/pokemon').then(response => {
        let entries = Object.entries(response.data)
        setData(entries);
    })
  }, [])

  return (
    // O correto é component e não element
    <Switch>
      <Route path='/' exact>
        <Home data={data}></Home>
      </Route>
      <Route component={PokemonPage} path='/pokemon/:id'/>
    </Switch>
  )
}

export default App;
