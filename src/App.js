import React from 'react';
import './App.css';
import Product from './demo/Product';
function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Product name= 'banabas' price='1$' description= 'Fresh bananas from Ecuador' />
      <Product name= 'apricot' price='5$' description= 'Fresh apricot from Armenia' />
      </header>
       
    </div>
  );
}

export default App;
