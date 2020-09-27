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
        <div>
            <p>
                Question: {QuestionNum} / {totalQuestion}
            </p>
            
            <p dangerouslySetInnerHTML = {{ __html : question}} />
            <div>
                {answers.map(answer => (
                    <div>
                        <button disabled={userAnswer} onClick={callback}>
                            <span dangerouslySetInnerHTML= {{ __html: answer}} />
                        </button>
                    </div>  
                ))}  
          </div>
        </div>
    )
}
