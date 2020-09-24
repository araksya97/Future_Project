import React from 'react';
import './App.css';
import Welcome from './demo/welcome';
import AboutMe from './demo/aboutme';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Welcome />
      <AboutMe /> 
      </header>
       
    </div>
  );
}

export default App;
