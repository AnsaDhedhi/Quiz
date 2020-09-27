import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { QuestionCard } from './components/QuestionCard';
import { fetchQuestions, Difficulty, QuestionsState } from './API';
import { totalmem } from 'os';

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
  // setScore(0);
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
    if (correct) setScore(prev => prev + 1)

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
    <div className="App">
      <h1>Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTION ?( 
      <button onClick={StartQuiz}> 
        Start Quiz
      </button>  ) : null }
        {!gameOver ? (
      <p> Score : {score}
      </p> ) : null }
      {Loading ? (
      <h1>loading..</h1> ) : null }

      {!Loading && !gameOver ? (
        <QuestionCard 
          QuestionNum={number + 1}
          totalQuestion= {TOTAL_QUESTION}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        /> ) : null }
      {!gameOver && !Loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
      <button onClick={nextQuestion}>
        Next
      </button> ) : null }
      
    </div>
  );
}

export default App;
