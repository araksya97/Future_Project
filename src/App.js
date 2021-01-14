import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Product from './demo/Product';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import NotFound from './components/pages/NotFound/NotFound';
import Contact from './components/pages/Contact/Contact';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import { Route, Switch, Redirect } from 'react-router-dom';

function App() {
  return (
    <div className="App">

      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' />
      </Switch>
    </div>
  );
}

export default App;
