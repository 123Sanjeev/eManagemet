import { ReactNode, useState } from "react";
import { backendURL } from "../globals/global_variable";
import "../../sytles/viewblueprint.css";
import "../../sytles/global.css";
import { useNavigate } from "react-router-dom";

export type blueprintType = {
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
              redirect("/viewBlueprint/" + bp.blueprintid, {state : bp});
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
  return <div className="container-fluid">{viewBlueprintComponent()}</div>;
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
            <div className="col-md-3">
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
}
