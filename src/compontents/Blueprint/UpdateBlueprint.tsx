import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaRoute } from "react-icons/fa";
import { user } from "../Dashboard";
import RouteWF from "../../wf/RouteWF";
export default function UpdateBlueprint(props: { title: string, user: user }) {
  const redirect = useNavigate();
  const location = useLocation();
  const { bpid } = useParams();
  const {user} = props
  console.log("Blueprint id in update blueprint : " + bpid);
  const [blueprint, setBlueprint] = useState<{
    blueprintid: number;
    title: string;
    mastercoursename: any;
    subject: any;
    term: any;
    option: any;
    status: string;
    totalMarks: number;
  }>({
    blueprintid: parseInt(bpid as string),
    mastercoursename: "",
    title: "",
    subject: "",
    term: "",
    option: "",
    status: "",
    totalMarks: 0,
  });
  const [selectedMarks, setSelectedMarks] = useState<number>(0);
  const [routeWf, setRouteWf] = useState(false);

  useEffect(() => {
    document.title = props.title;
    console.log("Location data: ", location.state);
    setBlueprint(location.state);
  }, [location, props.title]);

  return (
    <>
      <div className="container ">
        {(routeWf) ? <RouteWF app={"BP"}  to={"CO"} setRouteWf={setRouteWf} user={user} currentRole={"UEB"}/> : ""}
        <input
          type="button"
          value="Back"
          className="btn btn-primary mt-2"
          onClick={() => {
            redirect("/viewblueprint");
          }}
        />

        <FaRoute
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
            console.table(user.roles)
            setRouteWf(true)
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
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>topic</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{blueprint.subject}</td>
                  <td>{blueprint.subject} - Topic</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="vr"></div>
          <div className="questionCounts">
            {blueprint.option === "Objective" ? (
              <ObjectiveMarksSelectionComponent />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </>
  );

  function ObjectiveMarksSelectionComponent() {
    const sub_options = ["FIB", "MCQ", "T/F"];
    const categories = ["FACT", "COMP", "APP"];
    const sub_categories = ["MK", "CK", "SK"];

    return (
      <div className="objectiveoption">
        <table className="custom-table">
          <thead>
            <tr className="objectivemarksselection">
              {sub_options.map((e, inx) => {
                return (
                  <>
                    <th className="options" id={e + "_option"}>
                      <span id={e === "T/F" ? "TF" : e}>{e}</span>
                      <tr key={inx} className="suboptions">
                        {categories.map((category, idx) => {
                          return (
                            <>
                              <th id={category}>
                                {category}
                                <tr key={idx}>
                                  {sub_categories.map((subcategory, i) => {
                                    return (
                                      <>
                                        <th>{subcategory}</th>
                                      </>
                                    );
                                  })}
                                </tr>
                              </th>
                            </>
                          );
                        })}
                      </tr>
                    </th>
                  </>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <tr className="objective_marksselectionpanel">
              <td>
                <td>
                  <td>
                    <input
                      type="number"
                      name="1"
                      id="1"
                      defaultValue={0}
                      onChange={(e) => {
                        validateSelectedMarks(parseInt(e.currentTarget.value));
                      }}
                      min={0}
                      max={2}
                    />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
              </td>
              <td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
              </td>
              <td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="2" id="2" defaultValue={0} />
                  </td>
                  <td>
                    <input type="number" name="3" id="3" defaultValue={0} />
                  </td>
                </td>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  function validateSelectedMarks(count: number) {
    setSelectedMarks(selectedMarks + count);
  }
}
