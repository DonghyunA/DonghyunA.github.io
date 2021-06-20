
type Answer = {
    answerStr : string,
    answerVal : string[]
}

type TestQuestion = {
    image: string,
    question : string,
    answerArr : Answer[],
}

export type TestProps = {
    suiteArr: TestQuestion[];
  };
export type TestPropsa={
    b:string;
}