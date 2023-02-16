import { useParams } from "react-router-dom";
import "../../sytles/Questions.css";
import AddQuestion from "./AddQuestion";
import EditQuestion from "./EditQuestion";
import ViewQuestions from "./ViewQuestions";
import db from  '../../api/dbqueries'
import { useEffect, useState } from "react";
import { user } from "../Dashboard";
export type QuestionForm = {
  seq_id : number;
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

export default function Question(props:{title:string, user: user}) {
  const { action ,id} = useParams();
  useEffect(()=>{
    document.title= action +" " +  props.title
  })
  const [qid , setQid] = useState(0);
  async function initQuestionid() {
    const newQuestionid = await db.initQuestion();
    setQid(parseInt(newQuestionid));
  }



  if (action?.toUpperCase() === "ADD") {
    initQuestionid()
    return <AddQuestion isEditMode={false} id={0} questionid={qid}/>;
  } else if (action?.toUpperCase() === "VIEW") {
    return <ViewQuestions />;
  }else if(action?.toUpperCase() === "EDIT"){
    return <EditQuestion id={parseInt(id as string) } user={props.user} />;
  }
  return <>Question</>


}
