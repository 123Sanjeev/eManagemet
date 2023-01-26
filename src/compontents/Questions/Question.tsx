import { useParams } from "react-router-dom";
import "../../sytles/Questions.css";
import AddQuestion from "./AddQuestion";
import ViewQuestions from "./ViewQuestions";

export type QuestionForm = {
  option: string;
  suboption: string;
  category: string;
  subcategory: string;
  questiondsc: string;
  tfanswer: boolean;
  mcqanswer: string;
  fibanswer: string;
  tfoptions: boolean[];
  mcqoptions: string[];
  questionid: string;
};

export type ViewQuestion = {
  QUESID: string;
  OPTION: string;
  SUBOPTION: string;
  CATEGORY: string;
  SUBCATEGORY: string;
  QUESTIONDESC: string;
};

export default function Question() {
  const { action } = useParams();
  if (action?.toUpperCase() === "ADD") {
    return <AddQuestion />;
  } else if (action?.toUpperCase() === "VIEW") {
    return <ViewQuestions />;
  }
  return <>Question</>
}
