import './App.css';
import './pages/home.css'
import './pages/pokemonPage.css'
import React, {useEffect, useState} from 'react'
import { BrowserRouter as Routes, Route, Switch } from "react-router-dom";
import axios from 'axios';

import Home  from './pages/home'
import PokemonPage from './pages/pokemonPage'

function App() {
  return (
    // O correto é component e não element
    <Switch>
      <Route path='/' exact>
        <Home></Home>
      </Route>
      <Route component={PokemonPage} path='/pokemon/:id'/>
    </Switch>
  )
}

export default App;
