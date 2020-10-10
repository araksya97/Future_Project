import React from 'react';
import './App.css';
import Welcome from './demo/Welcome';
import AboutMe from './demo/Aboutme';

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
