import React from 'react';
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from './components/navbar/navbar';
import Home from './components/home/home';
import CrearReceta from './components/crear-receta/crear-receta';
import Detail from './components/detail/detail';
import Presentacion from './components/presentacion/presentacion'
function App() {
  return (
    <BrowserRouter>
      <NavBar/>
      <Switch>
      <Route exact path='/' component={Presentacion}/>
      <Route exact path='/recetas' component={Home}/>
      <Route exact path='/crear' component={CrearReceta}/>
      <Route exact path='/receta/:id' 
          render={({ match }) => (<Detail id={match.params.id} />)}
          />
      </Switch>
      </BrowserRouter>
  );
}

export default App;
