import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRoute, FaCircle, FaMapMarked } from "react-icons/fa";
import Draggable from "react-draggable";
import { user } from "../Dashboard";
import RouteWF from "../../wf/RouteWF";
import routeWFDB from "../../api/routeWFDB";
export type wfResDataType = {
  app: string;
  pendingWith: string;
  routedTo: string;
};
type roleType = {
  UEB: string;
  CI: string;
};

type bpType = {
  blueprintid: number;
  title: string;
  mastercoursename: any;
  subject: any;
  term: any;
  option: any;
  status: string;
  totalMarks: number;
};
const roleListLogic: roleType = {
  UEB: "CI",
  CI: "OIC UEB",
};
export default function UpdateBlueprint(props: { title: string; user: user }) {
  const redirect = useNavigate();
  const location = useLocation();
  const { bpid } = useParams();
  const { user } = props;
  const [selectMarksOption, setSelectMarksOption] = useState("");
  const [blueprint, setBlueprint] = useState<bpType>({
    blueprintid: parseInt(bpid as string),
    mastercoursename: "",
    title: "",
    subject: "",
    term: "",
    option: "",
    status: "",
    totalMarks: 0,
  });
  const [wfState, setWFState] = useState<wfResDataType>({
    app: "BP",
    pendingWith: "UEB",
    routedTo: "CI",
  });
  const [selectedMarks, setSelectedMarks] = useState<number>(0);
  const [routeWf, setRouteWf] = useState(false);

  useEffect(() => {
    document.title = props.title;
    setBlueprint(location.state);
    handleWFRecordCheck();
  }, [location, props.title]);

  async function handleWFRecordCheck() {
    const wfRecord = await routeWFDB.checkWF("" + blueprint.blueprintid);
    if (wfRecord.pendingWith === "UEB") {
      wfRecord.routedTo = roleListLogic.UEB;
    } else if (wfRecord.pendingWith === "CI") {
      wfRecord.routedTo = roleListLogic.CI;
    }
    setWFState(wfRecord);
  }
  return (
    <div className="container-fluid">
      <div className="container">
        {routeWf ? (
          <RouteWF
            app={wfState.app}
            to={wfState.routedTo}
            setRouteWf={setRouteWf}
            user={user}
            currentRole={wfState.pendingWith}
            ownerid={"" + blueprint.blueprintid}
            setWFState={setWFState}
          />
        ) : (
          ""
        )}

        {selectMarksOption !== "" ? <MarksComponent /> : ""}
        <input
          type="button"
          value="Back"
          className="btn btn-primary mt-2"
          onClick={() => {
            redirect("/viewblueprint");
          }}
        />

        <FaMapMarked
          className="m-2 p-2"
          style={{
            float: "right",
            height: "40px",
            width: "40px",
            cursor: "pointer",
            color: blueprint.status === "DRAFT" ? "black" : "grey",
          }}
          title="Route Workflow"
          onClick={() => {
            console.table(user.roles);
            setRouteWf(true);
          }}
        />
        <h1>Update Blueprint ({blueprint.title})</h1>
        <hr />
      </div>

      <div className="container">
        <div className="updateBlueprint">
          <div className="from-group">
            <label htmlFor="blueprintid">Blueprint Id</label>
            <input
              type="text"
              name="blueprintid"
              className="form-control bg-light"
              value={bpid}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="mastercoursename">Master course name</label>
            <input
              type="text"
              name="mastercoursename"
              className="form-control bg-light"
              value={blueprint.mastercoursename || ""}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              name="subject"
              className="form-control bg-light"
              value={blueprint.subject || ""}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="term">Term</label>
            <input
              type="text"
              name="term"
              className="form-control bg-light"
              value={blueprint.term || ""}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="option">Option</label>
            <input
              type="text"
              name="option"
              className="form-control bg-light"
              value={blueprint.option || ""}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              name="status"
              className="form-control bg-light"
              value={blueprint.status || ""}
              readOnly
            />
          </div>
        </div>
        <hr />
        <div className="marksDetails">
          <div className="from-group">
            <label htmlFor="totalmarks">Total Selected Marks</label>
            <input
              type="text"
              name="totalmarks"
              className="form-control bg-light"
              value={blueprint.totalMarks || ""}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="selectedmarks">Selected Marks</label>
            <input
              type="text"
              name="selectedmarks"
              className="form-control bg-light"
              value={selectedMarks}
              readOnly
            />
          </div>
          <div className="from-group">
            <label htmlFor="questionSelected">Question Selected</label>
            <input
              type="text"
              name="questionSelected"
              className="form-control bg-light"
              readOnly
            />
          </div>
        </div>
        <hr />
        <div className="marksSelection">
          <div className="subjectlist">
            <table className="custom-table">
              <SubjectListComponent />
              {blueprint.option === "Objective" ? (
                <ObjectiveMarksSelectionComponent />
              ) : (
                ""
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );

  function SubjectListComponent() {
    return (
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Subject Title</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((e) => {
            return (
              <tr>
                <td>{blueprint.subject}</td>
                <td>{blueprint.subject} - Topic</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function ObjectiveMarksSelectionComponent() {
    return (
      <table className="markSelectionPanel">
        <thead>
          <tr className="objectivemarksselection">
            <th>FIB</th>
            <th>MCQ</th>
            <th>T/F</th>
          </tr>
        </thead>
        <tbody>
          {[1, 2].map((e) => {
            return (
              <tr>
                <td className="">
                  <input
                    type="text"
                    name="totalQuestionsFIB"
                    id="fibtotalQuestion"
                    className="form-control totalmarks"
                    readOnly
                    style={{backgroundColor:"grey", color:"white"}}
                    defaultValue={0}
                   
                  />{" "}
                  <FaCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openMarksModal("FIB");
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="totalQuestionsMCQ"
                    id="MCQtotalQuestion"
                    className="form-control totalmarks"
                    readOnly
                    style={{backgroundColor:"grey", color:"white"}}
                    defaultValue={0}
                   
                  />{" "}
                  <FaCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openMarksModal("MCQ");
                    }}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    name="totalQuestionsTF"
                    id="TFtotalQuestion"
                    className="form-control totalmarks"
                    readOnly
                    style={{backgroundColor:"grey", color:"white"}}
                    defaultValue={0}
                   
                  />{" "}
                  <FaCircle
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      openMarksModal("TF");
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  function MarksComponent() {
    return (
      <Draggable>
        <div className="marksmodal">
          <button className="closebtn" type="button" onClick={()=>{
            setSelectMarksOption("")
          }}> X </button>
          <h3>{selectMarksOption}</h3>
          <hr />
          <table className="table text-center" border={1}>
            <thead>
              <tr>
                <th>
                  FACT
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CK</th>
                        <th>MK</th>
                        <th>SK</th>
                      </tr>
                    </thead>
                  </table>
                </th>
                <th>
                  COMP
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CK</th>
                        <th>MK</th>
                        <th>SK</th>
                      </tr>
                    </thead>
                  </table>
                </th>
                <th>
                  APP
                  <table className="table">
                    <thead>
                      <tr>
                        <th>CK</th>
                        <th>MK</th>
                        <th>SK</th>
                      </tr>
                    </thead>
                  </table>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className="table">
                    <tbody>
                      <tr>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                        <td>
                          <input type="text" name="" id=""  className="form-control" />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <button className="btn btn-success" style={{float : "right"
            }}>
              Save
            </button>
          </div>
        </div>
      </Draggable>
    );
  }

  function openMarksModal(option: string) {
    setSelectMarksOption(option);
  }
}
