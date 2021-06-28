import React, { useEffect, useState } from "react";
import TestPage from "./pages/TestPage";
import AppRouter from "./Router";
import MainPage from "./pages/MainPage";
import "antd/dist/antd.css";
import { authService } from "./fbase";
import firebase from "firebase";
import { BrowserRouter as Router } from "react-router-dom";

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
            answerStr:
              "문자열이 많은 버튼은 어떻게 표시될까요 알아맞춰보세요 딩동댕!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!",
            answerVal: ["a", "b"],
          },
        ],
      },
    ],
  };
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<firebase.User | null>(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if (user) {
        setUserObj({
          ...user,
          displayName: user.email,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args),
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    if (user) {
      setUserObj({
        ...user,
        displayName: user.displayName,
        uid: user.uid,
        updateProfile: (args) => user.updateProfile(args),
      });
    } else {
      setUserObj(null);
    }
  };
  return (
    <>
      {init ? (
        <div className="App">
          <Router basename="psychologicalTest">
            <MainPage
              refreshUser={refreshUser}
              isLoggedIn={Boolean(userObj)}
              userObj={userObj}
            ></MainPage>
            {/* <TestPage {...TestProps}></TestPage> */}
          </Router>
        </div>
      ) : (
        "Initializing..."
      )}
    </>
  );
}

export default App;
