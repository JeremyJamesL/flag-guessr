import { useState } from 'react'
import flags from './data/flags';
import Form from './components/Form';
import "./App.css";

const flagsLength = Object.keys(flags).length;

function App() {
  const [flag, updateFlag] = useState(Object.keys(flags)[Math.floor(Math.random() * flagsLength)])
  const [guesses, updateGuesses] = useState({
    attempts: 0,
    correct: 0,
    incorrect: 0,
  });
  const [prevAnswer, updatePrevAnswer] = useState('');
  const [showPrevAnswer, togglePrevAnswer] = useState(false)

  return (
    <div className="app">
      <header>
        <h1>Flag Guessr</h1>
      </header>
      <div className="flag">
       <img src={`https://flagcdn.com/w320/${flag}.png`} alt={`${flags[flag]} flag`} />
      </div>

      <div className="counter">
        <div className='count count--attempts'><strong>{guesses.attempts} / {flagsLength}</strong></div>
        <div className='count count--correct'>Correct: <strong>{guesses.correct}</strong> </div>
        <div className='count count--incorrect'>Incorrect: <strong>{guesses.incorrect}</strong></div>
      </div>

      <Form flagObj={flags} currentFlag={flag} createNewFlag={updateFlag} updateGuesses={updateGuesses} guessesObj={guesses} updateOldAnswer={updatePrevAnswer} togglePrevAnswerDisplay={togglePrevAnswer}/>

      <div className={`prev-answer ${showPrevAnswer ? 'display' : 'hide'}`}>
          The correct answer was: <strong>{prevAnswer}</strong>
      </div>

    </div>
  )
}

export default App
