import React from "react";
import TestPage from "./pages/TestPage";
import AppRouter from "./Router";
import "antd/dist/antd.css";

function App() {
  const TestProps = {
    suiteArr: [
      {
        image:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        question: "처음 퀴즈는?",
        answerArr: [
          {
            answerStr: "hello",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "world",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "or word?",
            answerVal: ["a", "b"],
          },
        ],
      },
      {
        image:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        question: "두번째 퀴즈는?",
        answerArr: [
          {
            answerStr: "hello2",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "world2",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "or word?2",
            answerVal: ["a", "b"],
          },
        ],
      },
      {
        image:
          "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        question: "세번째 퀴즈는?",
        answerArr: [
          {
            answerStr: "hello3",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "world3",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "or word?3",
            answerVal: ["a", "b"],
          },
          {
            answerStr: "문자열이 많은 버튼은 어떻게 표시될까요 알아맞춰보세요 딩동댕!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            answerVal: ["a", "b"],
          },
        ],
      },
    ],
  };
  const TestPropsa={
    b:"11",
  }
  return (
    <div className="App">
      <AppRouter></AppRouter>
      <TestPage {...TestProps}></TestPage>
    </div>
  );
}

export default App;
