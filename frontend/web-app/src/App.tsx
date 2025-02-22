import './App.css';
import FighterForm from './components/FighterForm';
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src ="/512px-UFC_logo.svg.png" className="ufc-logo" alt="logo" />
        {/* <h1>UFC Fight Predictor</h1>
        <p>Predict the outcome of UFC fights using machine learning.</p>
        <p>Enter fighter names to get started.</p>*/
        <>
          <p>Note: This is a demo application and the predictions are for entertainment purposes only lol.</p> 
          <p>Model is only trained on data up to 3/25/24</p>
        </>
        }
      </header>
      <main>
        <FighterForm /> 
        <Analytics />
      </main>
    </div>
  );
}

export default App;
