import { ReactNode, useState } from "react";
const backendURL = process.env.REACT_APP_EXTERNAL_API;
type blueprintType = {
  blueprintid: number;
  masterCourseName: string;
  subject: string;
  term: string;
  option: string;
};

export default function ViewBlueprint() {
  const [blueprintdata, setBlueprintdata] = useState<blueprintType>();
  const [bluprintiddata, setBluprintiddata] = useState<blueprintType>();
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
        debugger
      return (
        <div className="row " key={idx}>
          <div className="col border p-2 col-2">{idx + 1}</div>
          <div
            className="col border p-2  text-primary"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
                setBluprintiddata(bp)
            }}
          >
            {bp.blueprintid}
          </div>
          <div className="col border p-2">{bp.masterCourseName}</div>
          <div className="col border p-2">{bp.subject}</div>
          <div className="col border p-2">{bp.term}</div>
          <div className="col border p-2">{bp.option}</div>
        </div>
      )
    })
    setBlueprintdata(bpViewData);
  }
  return (
    <div className="container-fluid">
      <h1>View Blueprint</h1>
      <hr />
      {(bluprintiddata === undefined) ? viewBlueprintComponent() : updateBlueprint(bluprintiddata as blueprintType) }
    </div>
  );
  function viewBlueprintComponent() {
    return (
      <>
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
            <button type="submit" className="d-none"></button>
          </form>
        </div>
        <hr />
        <div className="container">{blueprintdata as ReactNode}</div>
      </>
    );
  }
  function updateBlueprint(blueprintid:blueprintType){
    return (
        <>{blueprintid.blueprintid}</>
    );
  }
}
