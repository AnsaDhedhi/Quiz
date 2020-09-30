import React, { useState } from 'react';
import './App.css';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionsState } from './API';



const TOTAL_QUESTION = 10;

type AnswerObject ={
  question: string;
  answer: string;
  correct: Boolean;
  correctAnswer : string;
}

function App() {

  const [Loading, setLoading ] = useState(false);
  const [questions, setQuestions] = useState<QuestionsState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);


const StartQuiz = async() => {
  setLoading(true);
  setGameOver(false);
  const newQuestions = await fetchQuestions(TOTAL_QUESTION, Difficulty.EASY);
  setQuestions(newQuestions);
  setScore(0);
  setUserAnswers([]);
  setNumber(0);
  setLoading(false);
};

const nextQuestion = async() => {
  const nextQuestion = number + 1;
  if ( nextQuestion === TOTAL_QUESTION ){
    setGameOver(true);
  }
  else{
    setNumber(nextQuestion);
  }
};

const checkAnswer = (e:React.MouseEvent<HTMLButtonElement>) =>{
  if (!gameOver) {
    const answer = e.currentTarget.value;

    const correct = questions[number].correct_answer === answer;
    console.log(correct)

    if (correct) {setScore(score + 1)}

    const answerObject = {
      question : questions[number].question,
      answer,
      correct,
      correctAnswer: questions[number].correct_answer
    }
    setUserAnswers(prev => [...prev , answerObject])
    console.log(questions)
  }
};


  return (
     

    
    <div className="bg_image,container"> 
    
    <div className="App" >
     <div className="alert alert-info" role="alert">
      <h1>Quiz</h1>
      </div >
      
      <div>
      {gameOver || userAnswers.length === TOTAL_QUESTION ?( 
      <button onClick={StartQuiz} type="button" className="btn btn-outline-info"> 
       <b> Start Quiz </b>
      </button>  ) : null }
      </div>
    
      <br/>
      <div >
      {Loading ? (
        
        <div className="spinner-border text-info" role="status"> 
        
        <p className="sr-only"></p> 
        </div>
      ) : null }
      </div>
      <div >
      {!Loading && !gameOver ? (
        <QuestionCard 
        
          QuestionNum={number + 1}
          totalQuestion= {TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        /> ) : null }
        </div>
        <div >
      {!gameOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
        
      <button className="btn btn-outline-info" onClick={nextQuestion} id="next_Btn">
        Next
      </button> ) : null  }
      
      </div>
      <div>
        {!gameOver ? (
      <p> Score : {score}
      </p> ) : null }

      </div>
    </div>
    <br/>
    <br/>
    {/* <br/>
    <br/>
    <br/>
    <br/> */}
    </div>
  );
}

export default App;
