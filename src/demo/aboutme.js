import React from 'react';
import Name from './Name';
import Language from './Language';
import '../App.css';


const AboutMe = () => (
    <div>
    I'm 
    <Name text='Araks'/> 
    and I want to learn 
    <Language text='ReactJs' />
    </div>
  );

  export default AboutMe