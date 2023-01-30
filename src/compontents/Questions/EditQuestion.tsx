import { QuestionForm } from "./Question";
import { useEffect, useState } from "react";
import db from "../../api/dbqueries";
import "../../sytles/editQuestions.css";
import { useNavigate } from "react-router";
type selectedQuesiton = {
  id: number;
};

export default function EditQuestion(props: selectedQuesiton) {
  const redirect = useNavigate();
  useEffect(() => {
    if (selectedQuestion.questionid === "") {
      loadQuestionWithId(props.id);
    }
  });

  const [selectedQuestion, setSelectedOption] = useState<QuestionForm>({
    seq_id: 0,
    option: "",
    suboption: "",
    category: "",
    subcategory: "",
    questiondsc: "",
    tfoptions: [true, false],
    mcqoptions: ["", "", "", ""],
    tfanswer: false,
    mcqanswer: "",
    fibanswer: "",
    questionid: "",
  });
  async function loadQuestionWithId(id: number) {
    const questionData = await db.viewQuestionWithId(id);
    const questionString = JSON.stringify(questionData);
    const questionJSON = JSON.parse(questionString)[0];
    const mcqOptions = questionJSON.mcqOptions;
   
    const question: QuestionForm = {
      seq_id : parseInt(questionJSON.SEQID as string),
      option: questionJSON.option,
      suboption: questionJSON.suboption,
      category: questionJSON.category,
      subcategory: questionJSON.subcategory,
      questiondsc: questionJSON.questiondesc,
      tfanswer: questionJSON.suboption === "TF" ? questionJSON.ANSWER : "",
      mcqanswer: questionJSON.suboption === "MCQ" ? questionJSON.ANSWER : "",
      fibanswer: questionJSON.suboption === "FIB" ? questionJSON.ANSWER : "",
      tfoptions: [true, false],
      mcqoptions: [
        mcqOptions.option1,
        mcqOptions.option2,
        mcqOptions.option3,
        mcqOptions.option4,
      ],
      questionid: questionJSON.quesid,
    };

    setSelectedOption(question as QuestionForm);
  }
  function renderEditForm() {
    return (
      <div className="container">
        <h1>View/Edit Question</h1>
        <hr />

        <div className="form-group">
          <label htmlFor="questionid">Question id</label>
          <input
            type="text"
            name="questionid"
            value={selectedQuestion?.questionid}
            className="form-control bg-light"
            readOnly={true}
          />
        </div>
        <div className="w-100 d-grid editQuestionDetails">
          <div className="form-group">
            <label htmlFor="questionid">Option</label>
            <input
              type="text"
              name="questionid"
              value={selectedQuestion?.option}
              className="form-control bg-light"
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionid">Sub - Option</label>
            <input
              type="text"
              name="suboption"
              value={selectedQuestion?.suboption}
              className="form-control bg-light"
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionid">Category</label>
            <input
              type="text"
              name="category"
              value={selectedQuestion?.category}
              className="form-control bg-light"
              readOnly={true}
            />
          </div>
          <div className="form-group">
            <label htmlFor="questionid">Sub - Category</label>
            <input
              type="text"
              name="subcategory"
              value={selectedQuestion?.subcategory}
              className="form-control bg-light"
              readOnly={true}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="questionid">Question</label>
          <textarea
            name="questiondsc"
            value={selectedQuestion.questiondsc}
            className="form-control bg-light"
            readOnly={true}
            onFocus={(e) => {
              e.currentTarget.classList.remove("bg-light");
              e.currentTarget.readOnly = false;
            }}
            onChange={(e) => {
              setSelectedOption({
                ...selectedQuestion,
                [e.currentTarget.name]: e.currentTarget.value,
              });
            }}
          />
        </div>
        {selectedQuestion?.suboption === "MCQ" ? renderMCQoption() : <></>}

        <div className="d-flex w-100 justify-content-center align-item-center">
          <input type="button" value="Save" className="btn btn-primary m-2" onClick={
            async()=>{
              const updatedQuestion = await db.saveQuestion(selectedQuestion,"updateQuestion")
              freeze()
            }
          }/>
          <input
            type="button"
            value="Cancel"
            className="btn btn-danger m-2"
            onClick={() => {
              redirect("/question/view");
            }}
          />
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="container">{renderEditForm()}</div>
    </>
  );

  function renderMCQoption() {
    var mcqoptions: string[] = selectedQuestion?.mcqoptions;
    const returningData = selectedQuestion?.mcqoptions.map((e, idx) => {
      return (
        <div key={idx}>
          <div className="form-group" key={idx}>
            <input
              type="radio"
              name={"option" + (idx + 1)}
              className="form-check-input"
              value={"option" + (idx + 1)}
              data-attribute="mcqanswer"
              checked={
                selectedQuestion?.mcqanswer === "option" + (idx + 1)
                  ? true
                  : false
              }
              onChange={(e) => {
                setSelectedOption({
                  ...selectedQuestion,
                  [e.currentTarget.dataset.attribute as string]:
                    e.currentTarget.value,
                });
              }}
              readOnly={true}
            />

            <label htmlFor={"option" + idx}>{"option " + (idx + 1)}</label>
            <input
              type="text"
              name={"option" + (idx + 1)}
              value={e}
              readOnly={true}
              className="form-control bg-light"
              data-attribute="mcqoptions"
              onFocus={(e) => {
                e.currentTarget.classList.remove("bg-light");
                e.currentTarget.classList.remove("bg-white");
                e.currentTarget.readOnly = false;
              }}
              onChange={(e) => {
                mcqoptions[idx] = e.currentTarget.value;
                setSelectedOption({
                  ...selectedQuestion,
                  [e.currentTarget.dataset.attribute as string]: mcqoptions,
                });
              }}
            />
          </div>
        </div>
      );
    });
    return returningData;
  }

  function freeze(){
    const editableElements = document.querySelectorAll("input[type='text']")
    if(editableElements  && editableElements.length > 0 ){
      editableElements.forEach((e)=>{
        e.classList.remove('bg-white')
        e.classList.add('bg-light')
      })
    }
  }
}
