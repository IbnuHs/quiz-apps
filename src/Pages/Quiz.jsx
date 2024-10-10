import React, { useEffect, useState } from "react";
import { api } from "../lib/API";
import axios from "axios";
// import { data } from "../lib/Data";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);
  const [length, setLenght] = useState(0);
  const [score, setScore] = useState(0);
  const [index, setIndex] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [time, setTime] = useState(60);

  const shuffleindex = (i) => {
    return i.sort(() => Math.random() - 0.5);
  };

  const location = useLocation();
  const { category, difficulty } = location.state;
  function choseAnswer(correct_answer, answer, dataQuiz) {
    if (correct_answer === answer) {
      setScore(score + 1);
    }
    if (index === dataQuiz.length - 1) {
      setQuizFinished(true);
    } else {
      setIndex(index + 1);
    }
  }
  // console.log(category);

  const fetchApi = async () => {
    const res = await axios.get(
      `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    console.log(res);
    return res.data;
  };

  const getData = useQuery({
    queryKey: ["getQuiz", category, difficulty],
    queryFn: fetchApi,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });
  function resetQuiz() {
    getData.refetch({ force: true }).then(() => {
      setIndex(0);
      setScore(0);
      setTime(60);
      setQuizFinished(false);
    });
    getData.refetch();
  }
  // console.log(time);
  // return () => clearInterval(intervalId);
  useEffect(() => {
    if (time === 0) {
      setQuizFinished(true);
    }
    const intervalId = setInterval(() => {
      setTime((prevTime) => Math.max(prevTime - 1, 0));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [index, quizFinished, time]);
  useEffect(() => {
    if (getData.data) {
      const quizData = getData.data.results.map((i) => {
        const answer = shuffleindex([...i.incorrect_answers, i.correct_answer]);
        return {
          ...i,
          answer,
        };
      });
      setQuiz(quizData);
    }
  }, [getData.data]);

  if (getData.isError) {
    return <h1>Error</h1>;
  }
  if (getData.isLoading) {
    return <h1 className="text-center">Loading ....</h1>;
  }
  if (quizFinished) {
    return (
      <div className="w-[70%] border px-10 py-8 text-center">
        <h1 className="text-lg">Your Score :</h1>
        <h1>{score}</h1>

        <div className="mt-5">
          <button
            onClick={resetQuiz}
            type="button"
            className="border-2 rounded-md px-8 py-1 bg-gray-100"
          >
            Try Again
          </button>
        </div>
        <Link to="/option" className="underline mt-4 text-sm text-blue-600">
          Change Level
        </Link>
      </div>
    );
  }
  if (getData.isSuccess && quiz.length > 0) {
    // console.log(quiz[index].question);
    // const quiz = getData.data;

    // const dataQuiz = quiz.results.map((i) => {
    //   const answer = shuffleindex([...i.incorrect_answers, i.correct_answer]);
    //   return {
    //     ...i,
    //     answer,
    //   };
    // });
    // console.log(dataQuiz);
    return (
      <div className="w-[70%] border px-10 py-8 xl:w-[50%]">
        <h1 className="font-semibold text-center text-xl">Quiz Time</h1>

        <div className="text-center mt-2 ">
          <h1 className="">
            {index + 1}/{quiz.length}
          </h1>
          <p>{time}</p>
        </div>
        <div className="mt-10">
          <h1 className="font-semibold text-lg">{quiz[index].question}</h1>

          <ol className="flex flex-col gap-4 mt-5 lg:mt-7">
            {quiz[index].answer.map((i, idx) => {
              return (
                <li className="" key={idx}>
                  <button
                    type="button"
                    onClick={() =>
                      choseAnswer(quiz[index].correct_answer, i, quiz)
                    }
                    className="text-center w-full border-2 shadow-lg py-2 rounded-md hover:bg-gray-200 hover:border-white
                "
                  >
                    {i}
                  </button>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    );
  }
}
