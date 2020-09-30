import React from 'react'


type Props = {
    question : string;
    answers : string[];
    callback : any;
    userAnswer : any;
    QuestionNum : number;
    totalQuestion: Number;


}

export const QuestionCard:React.FC<Props>= ({question,answers,callback,userAnswer,QuestionNum,totalQuestion}) => {
    return(
        <div className="card text-white bg-info mb-3">
            <p className="card-header">
                Question: {QuestionNum} / {totalQuestion}
            </p>
            <div className="card-body">
            <b > 
            <p  dangerouslySetInnerHTML = {{ __html : question}} />
            </b>
            <div  >
                {answers.map(answer =>  (
                    
                    <div>
                        <button className="btn" disabled={userAnswer} value={answer} onClick={callback}>
                            <span className="btn btn-outline-light"  dangerouslySetInnerHTML= {{ __html: answer}} />
                        </button>
                    </div>  
                ))}  
            </div>
          </div>
        </div>
    )
}
