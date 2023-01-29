import { useEffect, useState } from "react";
import { QuestionForm } from "./Question";
import db from "../../api/dbqueries";
import "../../sytles/global.css";
import PopUpComponent from "../globals/PopUpComponent";

type isEditMode = {
  isEditMode: boolean;
  id: number;
  questionid : number;
};

type RenderQuestionType = {
  questionType : string;
  
}

export default function AddQuestion(props: isEditMode) {

  const [questionid, setQuestionid] = useState<string>();
  const [question, setQuestion] = useState<QuestionForm>({
    seq_id : 0,
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
  const [questionType, setQuestionType] = useState("");
  const [suboption, setSuboption] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  
  useEffect(()=>{
    question.questionid = props.questionid.toString()
    setQuestionid(props.questionid.toString())
  },[questionid , question ,isSaved, props.questionid])

  function RenderAnswerComponent(answers:RenderQuestionType) {
    switch (answers.questionType) {
      case "FIB":
        return (
          <fieldset className="grid-template-row-2">
            <label htmlFor="questiondsc">Question</label>
            <textarea
              name="questiondsc"
              id="question"
              className="form-control h-100 p-4 fibquestion"
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
              readOnly={props.isEditMode}
            ></textarea>
            <div className="form-group">
              <div>
                <label htmlFor="fibanswer">Answer</label>
                <input
                  type="text"
                  name="fibanswer"
                  id="finanswer"
                  className="form-control"
                  onChange={(e) => {
                    setQuestion({
                      ...question,
                      [e.currentTarget.name]: e.currentTarget.value,
                    });
                  }}
                  readOnly={props.isEditMode}
                />
              </div>
            </div>
          </fieldset>
        );
      case "TF":
        return (
          <div>
            <label htmlFor="questiondsc">Question</label>
            <textarea
              name="questiondsc"
              id="question"
              className="form-control h-100 p-4 fibquestion"
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
              readOnly={props.isEditMode}
            ></textarea>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="true"
                id="true"
                data-attribute="tfanswer"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: e
                      .currentTarget.checked
                      ? true
                      : false,
                  });
                }}
                checked={question.tfanswer ? true : false}
                readOnly={props.isEditMode}
              />
              <label className="form-check-label" htmlFor="true">
                True
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="false"
                id="questionOptions"
                data-attribute="tfanswer"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: e
                      .currentTarget.checked
                      ? false
                      : true,
                  });
                }}
                checked={question.tfanswer ? false : true}
                readOnly={props.isEditMode}
              />
              <label className="form-check-label" htmlFor="false">
                False
              </label>
            </div>
          </div>
        );
      case "MCQ":
        var mcqoptions: string[] = question.mcqoptions;
        return (
          <div className="form-group .grid-template-columns-4">
            <label htmlFor="Question">Question</label>
            <textarea
              name="questiondsc"
              id="question"
              className="form-control h-100 p-4 fibquestion"
              onChange={(e) => {
                debugger
                setQuestion({
                  ...question,
                  [e.currentTarget.name]: e.currentTarget.value,
                });
              }}
              value={question.questiondsc}
              readOnly={props.isEditMode}
            ></textarea>
            <div className="form-check">
              <input
                type="radio"
                name="option1"
                className="form-check-input"
                value={"option1"}
                data-attribute="mcqanswer"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]:
                      e.currentTarget.value,
                  });
                }}
                checked={question.mcqanswer === "option1" ? true : false}
                readOnly={props.isEditMode}
              />
              <label htmlFor="option1">Option 1</label>
              <input
                type="text"
                name="option1Text"
                id="option1"
                className="form-control"
                data-attribute="mcqoptions"
                onChange={(e) => {
                  mcqoptions[0] = e.currentTarget.value;
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: mcqoptions,
                  });
                }}
                readOnly={props.isEditMode}
                value={question.mcqoptions[0]}
              />
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="option2"
                className="form-check-input"
                value={"option2"}
                data-attribute="mcqanswer"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]:
                      e.currentTarget.value,
                  });
                }}
                checked={question.mcqanswer === "option2" ? true : false}
                readOnly={props.isEditMode}
              />
              <label htmlFor="option2">Option 2</label>
              <input
                type="text"
                name="option2Text"
                id="option2Text"
                className="form-control"
                data-attribute="mcqoptions"
                onChange={(e) => {
                  mcqoptions[1] = e.currentTarget.value;
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: mcqoptions,
                  });
                }}
                readOnly={props.isEditMode}
                value={question.mcqoptions[1]}
              />
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="option3"
                value={"option3"}
                data-attribute="mcqanswer"
                className="form-check-input"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]:
                      e.currentTarget.value,
                  });
                }}
                readOnly={props.isEditMode}
                checked={question.mcqanswer === "option3" ? true : false}
              />
              <label htmlFor="option3">Option 3</label>
              <input
                type="text"
                name="option3Text"
                id="option3Text"
                className="form-control"
                data-attribute="mcqoptions"
                onChange={(e) => {
                  mcqoptions[2] = e.currentTarget.value;
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: mcqoptions,
                  });
                }}
                readOnly={props.isEditMode}
                value={question.mcqoptions[2]}
              />
            </div>
            <div className="form-check">
              <input
                type="radio"
                name="option4"
                value={"option4"}
                data-attribute="mcqanswer"
                className="form-check-input"
                onChange={(e) => {
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]:
                      e.currentTarget.value,
                  });
                }}
                checked={question.mcqanswer === "option4" ? true : false}
                readOnly={props.isEditMode}
              />
              <label htmlFor="option4">Option 4</label>
              <input
                type="text"
                name="option4Text"
                id="option4Text"
                className="form-control"
                data-attribute="mcqoptions"
                onChange={(e) => {
                  mcqoptions[3] = e.currentTarget.value;
                  setQuestion({
                    ...question,
                    [e.currentTarget.dataset.attribute as string]: mcqoptions,
                  });
                }}
                readOnly={props.isEditMode}
                value={question.mcqoptions[3]}
              />
            </div>
          </div>
        );
        default:
          return <></>;
    }
  }

  return (
    <>
      {isSaved ? (
        <PopUpComponent
          message={`Question id ${question.questionid} has been saved successfully`}
          redirectComponent="/question/view"
        />
      ) : (
        ""
      )}
      <div className="container h-50">
        <h1>Add Question</h1>
        <hr />

        <div className="form-group">
          <label htmlFor="questionid">Question Id</label>
          <input
            type="text"
            name="questionid"
            id="questionid"
            readOnly
            className="form-control bg-light"
            value={questionid}
          />
        </div>
        <div className="question-creation">
          <div className="form-group">
            <label htmlFor="option">Option</label>
            <select
              name="option"
              id="option"
              className="form-control bg-light"
              onChange={async (e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]:
                    e.currentTarget.selectedOptions[0].value,
                });
                const jsonResponse = await db.getSubOption(
                  e.currentTarget.selectedOptions[0].value
                );
                setSuboption(jsonResponse);
              }}
              value={question.option}
            >
              <option value="">--Select--</option>
              <option value="OBJ">Objective</option>
              <option value="SUBJ">Subjective</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="suboption">Sub-Option</label>
            <select
              name="suboption"
              id="suboption"
              className="form-control bg-light"
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]:
                    e.currentTarget.selectedOptions[0].value,
                });
                setQuestionType(e.currentTarget.selectedOptions[0].value);
              }}
              value={question.suboption}
            >
              <option value="">--Select--</option>
              {Object.entries(suboption).map((key) => {
                return (
                  <option value={"" + key[0] + ""}>{"" + key[1] + ""}</option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Category">Category</label>
            <select
              name="category"
              id="Category"
              className="form-control bg-light"
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]:
                    e.currentTarget.selectedOptions[0].value,
                });
              }}
              value={question.category}
            >
              <option value="">--Select--</option>
              <option value="FACT">Factual</option>
              <option value="COMP">Comprehensive</option>
              <option value="APP">Application</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="subcategory">Sub Category</label>
            <select
              name="subcategory"
              id="subcategory"
              className="form-control bg-light"
              onChange={(e) => {
                setQuestion({
                  ...question,
                  [e.currentTarget.name]:
                    e.currentTarget.selectedOptions[0].value,
                });
              }}
              value={question.subcategory}
            >
              <option value="">--Select--</option>
              <option value="MK">Must Know</option>
              <option value="SK">Should Know</option>
              <option value="CK">Could Know</option>
            </select>
          </div>
        </div>

        <div className="answerSection">
          {
            RenderAnswerComponent({questionType} as RenderQuestionType)
            // <RenderAnswerComponent questionType={questionType} />
            
            }
        </div>
        <div className="interaction-btn">
          <input
            type="button"
            value="Save"
            className="btn btn-primary"
            onClick={(e) => {
              saveQuestion();
            }}
          />
          <input type="button" value="Cancel" className="btn btn-danger" />
        </div>
      </div>
    </>
  );

  async function saveQuestion() {
    await db.saveQuestion(question,"addQuestion");
    setIsSaved(true);
  }
}
