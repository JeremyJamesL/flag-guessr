import { useRef } from "react";

const handleGuess = (isTrue, guesses, updGuesses, flagsList, currFlag, newFlag, oldAnswer, togglePrevAns) => {

    const correctOrIncorrect = isTrue ? 'correct' : 'incorrect';

    // Either update correct or incorrect
    if(correctOrIncorrect === 'correct') {
      updGuesses({...guesses, attempts:guesses.attempts+1, correct:guesses.correct+1})
      togglePrevAns(false);
    } else {
      updGuesses({...guesses, attempts:guesses.attempts+1, incorrect:guesses.incorrect+1})
      // Show prev answer
      oldAnswer(flagsList[currFlag]);
      togglePrevAns(true);
    }

    // Delete flag from flags object
    delete flagsList[currFlag];

    //  Create new flag guess
    newFlag(Object.keys(flagsList)[Math.floor(Math.random() * Object.keys(flagsList).length)])
}

function Form(props) {
  const guessInput = useRef(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const targetVal = e.target.children[0].value.toLowerCase();
    const isCorrect = targetVal === props.flagObj[props.currentFlag].toLowerCase();
    handleGuess(isCorrect, props.guessesObj, props.updateGuesses, props.flagObj, props.currentFlag, props.createNewFlag, props.updateOldAnswer, props.togglePrevAnswerDisplay);   

    // Clear input
    guessInput.current.value = "";

  }
    
  return (
    <form onSubmit={handleSubmit}>
        <input type="text" ref={guessInput} autoFocus/>
    </form>
  )
}
export default Form