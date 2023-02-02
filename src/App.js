import './App.css';
import './pages/home.css'
import './pages/pokemonPage.css'
import React from 'react'
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";

import Home  from './pages/home'
import PokemonPage from './pages/pokemonPage'

function App() {
  return (
    // O correto é component e não element
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={PokemonPage} path='/pokemon/:id'/>
    </Switch>
  )
}

export default App;
