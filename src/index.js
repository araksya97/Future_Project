import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import Counter from './demo/counter/Counter';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

const defaultState = {
   count: 0,
   text: 'hello',
}
const reducer = (state = defaultState, action) => {
   switch (action.type) {
      case 'CHANGE_VALUE': {
         return {
            ...state,
            count: state.count + action.value,
         }
      }
      case 'RESET_VALUE': {
         return {
            ...state,
            count: 0,
         }
      }
      case 'CHANGE_MESSAGE': {
         return {
            ...state,
            text: action.message,
         }
      }
      
      default: return state
   } 
}
const store = createStore(reducer)

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <BrowserRouter>
            <Counter />
            {/* <App /> */}
         </BrowserRouter>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
