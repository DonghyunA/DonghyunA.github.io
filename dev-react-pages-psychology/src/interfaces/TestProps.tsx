type Answer = {
  answerStr: string;
  answerVal: string[];
};

type TestQuestion = {
  image: string;
  question: string;
  answerArr: Answer[];
};
export type suiteInfo = {
  image: string;
  title: string;
  question: string;
  answer: string[];
};

export type TestProps = {
  suiteInfo: suiteInfo;
  suiteArr: TestQuestion[];
};
export type TestPropsa = {
  b: string;
};
