import { ReactNode, useState } from "react";
import { backendURL } from "./globals/global_variable";
import "../sytles/viewblueprint.css";
import "../sytles/global.css";
import { useNavigate } from "react-router";

type blueprintType = {
  blueprintid: number;
  masterCourseName: string;
  subject: string;
  term: string;
  option: string;
  status: string;
  totalMarks: string;
};

export default function ViewBlueprint() {
  const redirect = useNavigate();
  const [blueprintdata, setBlueprintdata] = useState<blueprintType>();
  const [bluprintiddata, setBluprintiddata] = useState<blueprintType>();
  const [selectedMarks, setSelectedMarks] = useState<number>(0);
  async function handleLoadBlueprintData(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();
    const form = event.currentTarget;
    const formValues = {
      blueprintid: form.bpid.value,
      mastercoursename: form.mcoursename.value,
      Subject: form.subject.value,
      term: form.term.value,
      option: form.option.value,
      status: form.status.value,
    };

    const response = await fetch(`${backendURL}blueprint/view`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formValues),
    });

    const bpdata = await response.json();
    const bpViewData = bpdata.map((bp: blueprintType, idx: number) => {
      return (
        <div className="row " key={idx}>
          <div className="col border p-2 col-2">{idx + 1}</div>
          <div
            className="col border p-2  text-primary"
            onClick={(e) => {
              setBluprintiddata(bp);
            }}
            id="blueprintid"
          >
            {bp.blueprintid}
          </div>
          <div className="col border p-2">{bp.masterCourseName}</div>
          <div className="col border p-2">{bp.subject}</div>
          <div className="col border p-2">{bp.term}</div>
          <div className="col border p-2">{bp.option}</div>
          <div className="col border p-2">{bp.status}</div>
        </div>
      );
    });
    setBlueprintdata(bpViewData);
  }
  return (
    <div className="container-fluid">
      {bluprintiddata === undefined
        ? viewBlueprintComponent()
        : updateBlueprint(bluprintiddata as blueprintType)}
    </div>
  );
  function viewBlueprintComponent() {
    return (
      <>
        <h1>View Blueprint</h1>
        <hr />
        <div className="container">
          <form
            className="row"
            name="viewbp"
            onSubmit={(e) => {
              handleLoadBlueprintData(e);
            }}
          >
            <div className="col-sm">
              <label htmlFor="bpid">#</label>
              <input type="hidden" />
            </div>
            <div className="col-sm">
              <label htmlFor="bpid">Blueprint Id</label>
              <input type="text" name="bpid" className="form-control " />
            </div>
            <div className="col-sm">
              <label htmlFor="mcoursename">Master Course Name</label>
              <input type="text" name="mcoursename" className="form-control" />
            </div>
            <div className="col-sm">
              <label htmlFor="subject">Subject</label>
              <input type="text" name="subject" className="form-control" />
            </div>
            <div className="col-sm">
              <label htmlFor="term">Term</label>
              <input type="text" name="term" className="form-control" />
            </div>
            <div className="col-sm">
              <label htmlFor="option">Option</label>
              <select name="option" id="option" className="form-control">
                <option value="">--Select--</option>
                <option value="Objective">Objective</option>
                <option value="Subjective">Subjective</option>
                <option value="Both">Both</option>
              </select>
            </div>
            <div className="col-sm">
              <label htmlFor="status">Status</label>
              <input type="text" name="status" className="form-control" />
            </div>
            <button type="submit" className="d-none"></button>
          </form>
        </div>
        <hr />
        <div className="container">{blueprintdata as ReactNode}</div>
      </>
    );
  }
  function updateBlueprint(blueprint: blueprintType) {
    console.log(blueprint);
    return (
      <>
        <div className="container ">
          <input
            type="button"
            value="Back"
            className="btn btn-primary mt-2"
            onClick={() => {
              setBlueprintdata(undefined);
              setBluprintiddata(undefined);
              redirect("/viewblueprint");
            }}
          />
          <h1>Update Blueprint</h1>
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
                value={blueprint.blueprintid || ""}
                readOnly
              />
            </div>
            <div className="from-group">
              <label htmlFor="mastercoursename">Master course name</label>
              <input
                type="text"
                name="mastercoursename"
                className="form-control bg-light"
                value={blueprint.masterCourseName || ""}
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
              <table className="table">
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
              {blueprint.option === "Objective"
                ? objectiveMarksSelectionComponent()
                : ""}
            </div>
          </div>
        </div>
      </>
    );
  }
  function objectiveMarksSelectionComponent() {
    return (
      <div className="objectiveoption table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>
                FIB
                <tr>
                  <th>
                    COMP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    APP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    FACT
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                </tr>
              </th>
              <th>
                MCQ
                <tr>
                  <th>
                    COMP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    APP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    FACT
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                </tr>
              </th>
              <th>
                T/F
                <tr>
                  <th>
                    COMP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    APP
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                  <th>
                    FACT
                    <tr>
                      <th>MK</th>
                      <th>CK</th>
                      <th>SK</th>
                    </tr>
                  </th>
                </tr>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <td>
                  <td>
                    <input type="number" name="1" id="1" defaultValue={0} onChange={(e)=>{
                        validateSelectedMarks(parseInt(e.currentTarget.value))
                    }} min={0} max={2} />
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
  function validateSelectedMarks(count:number){
      
      setSelectedMarks(selectedMarks+count)
  }
}
