import { ReactNode, useState } from "react";
import { ViewQuestion } from "./Question";
import db from "../../api/dbqueries";
import { useNavigate } from "react-router-dom";

export default function ViewQuestions() {
  const redirect = useNavigate();
  const [formData, setFormData] = useState<ViewQuestion>({
    QUESID: "",
    OPTION: "",
    SUBOPTION: "",
    CATEGORY: "",
    SUBCATEGORY: "",
    QUESTIONDESC: "",
  });

  const [questions, setQuestions] = useState<ReactNode>();
  const [loading, setloading] = useState(false);
  const menuList = [
    { QUESID: "Question Id" },
    { QUESTIONDESC: "Question Description" },
    { OPTION: "Option" },
    { SUBOPTION: "Sub Option" },
    { CATEGORY: "Category" },
    { SUBCATEGORY: "Sub Category" },
    { ACTION: "" },
  ];
  return (
    <>
      {loading ? (
        <div className="container-fluid loading">
          <div></div>
        </div>
      ) : (
        ""
      )}
      <div className="container">
        <h1>View Quesitons</h1>
        <hr />
        <form
          onKeyUp={(e) => {
            if (e.key === "Enter") {
              setloading(true);
              viewQuestions();
              setloading(false);
            }
          }}
        >
          <table className="table">
            <thead>
              <tr>
                {menuList.map((e, idx) => {
                  return (
                    <th key={idx}>
                      {Object.values(e)[0]}
                      <br />
                      {Object.keys(e)[0] === "ACTION" ? (
                        ""
                      ) : (
                        <input
                          type="text"
                          name={Object.keys(e)[0]}
                          onChange={(e) => {
                            setFormData({
                              ...formData,
                              [e.currentTarget.name]: e.currentTarget.value,
                            });
                          }}
                          className="form-control"
                        />
                      )}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>{questions as ReactNode}</tbody>
          </table>
        </form>
      </div>
    </>
  );

  async function viewQuestions() {
    const questionsData = await db.viewQuestions(formData);
    if (questionsData.length < 1) {
      const norecords = (
        <>
          <div className="no-records">** No Records found **</div>
        </>
      );
      setQuestions(norecords);
    } else {
      const questionView = questionsData.map((e: ViewQuestion, idx: number) => {
        return (
          <tr key={idx}>
            <td>{e.QUESID}</td>
            <td>{e.QUESTIONDESC}</td>
            <td>{e.OPTION}</td>
            <td>{e.SUBOPTION}</td>
            <td>{e.CATEGORY}</td>
            <td>{e.SUBCATEGORY}</td>
            <td colSpan={4}>
              <select
                name="Action"
                id=""
                className="form-control"
                onChange={(evt) => {
                  actionEvent(
                    evt.currentTarget.selectedOptions[0].value,
                    parseInt(e.QUESID as string)
                  );
                }}
              >
                <option value="">--Select Action--</option>
                <option value="FRZ">Freeze</option>
                <option value="EDT">View</option>
              </select>
              {/* <Link to={"/question/edit/"+e.QUESID} > Action </Link> */}
            </td>
          </tr>
        );
      });
      setQuestions(questionView);
    }
  }
  function actionEvent(event: string, questionid: number) {
    console.log(event, questionid);
    switch (event) {
      case "FRZ":
        alert("Freeze funcationality will be done on later stages");
        return;
      case "EDT":
        redirect("/question/edit/" + questionid);
    }
  }
}
