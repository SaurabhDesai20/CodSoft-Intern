import React, { useState, useRef } from 'react';
import './Quiz.css';
import { data } from '../../assets/data';

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);

  const Option1 = useRef(null);
  const Option2 = useRef(null);
  const Option3 = useRef(null);
  const Option4 = useRef(null);
  const optionArray = [Option1, Option2, Option3, Option4];

  const question = data[index];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add('correct');
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add('incorrect');
        optionArray[question.ans - 1].current.classList.add('correct');
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index === data.length - 1) {
        setResult(true); // Show result at the end
      } else {
        setIndex(index + 1);
        setLock(false);
        optionArray.forEach((option) => option.current.classList.remove('correct', 'incorrect'));
      }
    }
  };

  const reset = () => {
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
    optionArray.forEach((option) => option.current.classList.remove('correct', 'incorrect'));
  };

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />
      {!result ? (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={Option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={Option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={Option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={Option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next} disabled={!lock}>
            Next
          </button>
          <div className="index">
            {index + 1} of {data.length} Questions
          </div>
        </>
      ) : (
        <>
          <h2>You scored {score} out of {data.length}</h2>
          <button onClick={reset}>Reset</button>
        </>
      )}
    </div>
  );
};

export default Quiz;
