import React from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Product from './demo/Product';
import ToDo from './components/pages/ToDo/ToDo';
import About from './components/pages/About/About';
import NotFound from './components/pages/NotFound/NotFound';
import Contact from './components/pages/Contact/Contact';
import NavMenu from './components/NavMenu/NavMenu';
import SingleTask from './components/pages/SingleTask/SingleTask';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux';
import Spinner from '../src/components/pages/Spinner/Spinner'

function App(props) {
  if(props.errorMessage){
    toast.error(props.errorMessage)
  }
  if(props.successMessage){
    toast.success(props.successMessage)
  }

  return (
    
    <div className="App">

      <NavMenu />
      <Switch>
        <Route path='/' exact component={ToDo} />
        <Route path='/task' exact component={ToDo} />
        <Route path='/about' exact component={About} />
        <Route path='/task/:id' exact component={SingleTask} />
        <Route path='/contact' exact component={Contact} />
        <Route path='/404' exact component={NotFound} />
        <Redirect to='/404' />
      </Switch>
 
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {props.loading && <Spinner/>}
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    errorMessage: state.errorMessage,
    successMessage: state.successMessage,
    loading: state.loading
  }
};
export default connect(mapStateToProps)(App);
