import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// import Product from './demo/Product';
import ToDo from './components/todo/ToDo';


function App() {
  return (
    <div className="App">
      <header className="App-header">
      
      {/* <Product name= 'apricot' price='5$' rate= {490} description= 'Fresh apricot from Armenia' /> */}
      
      <ToDo   />
      </header>
       
    </div>
  );
}

export default App;
