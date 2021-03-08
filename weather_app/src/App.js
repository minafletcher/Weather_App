import React from 'react';
import './App.css';
import Forecast from "./components/Forecast/Forecast";
import Logo from './components/Logo/Logo';

function App() {
 return (
   <div className="App">
     <main>
     <h1 className="App-header">Weather!</h1>
       <Forecast />
     </main>
     <footer>
       Weather! created by Mina Fletcher
     </footer>
   </div>
 );
}
export default App;
