import "../../sytles/createBlueprint.css";
import $ from "jquery";
import { useState } from "react";
import { backendURL } from "../globals/global_variable";
import PopUpComponent from "../globals/PopUpComponent";
var selectedMarks: number[] = [];
export default function CreateBluePrint() {
  const [selectedOption, setSelectedOption] = useState("");
  const [bpid, setBpId] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const [blueprintdata, setBlueprintdata] = useState<{
    title: string;
    location: string;
    mastercoursename: string;
    subject: string;
    term: string;
    option: string;
    marks: number[];
    totalmarks: number;
  }>({
    title: "",
    location: "9TS",
    mastercoursename: "",
    subject: "",
    term: "",
    option: "",
    marks: selectedMarks,
    totalmarks: 0,
  });

  return (
    <div className="container">
      <h1>Create Blueprint</h1>
      <hr />
      <div id="loading" className="loader"></div>
      <div>
        {isSaved ? (
          <PopUpComponent
            redirectComponent={`/viewBlueprint/${bpid}`}
            setState={setIsSaved}
            message={`Blueprint id ${bpid} has been saved successfully `}
            state={blueprintdata}
          />
        ) : (
          <></>
        )}
      </div>
      <form method="POST" id="marksPage" className="from-page form">
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            name="location"
            id="location"
            value={blueprintdata.location}
            className="form-control bg-light"
            readOnly
          />
        </div>
        <div className="form-group">
          <label htmlFor="mastercoursename">Master Course name:</label>
          <select
            name="mastercoursename"
            id="mastercoursename"
            className="form-control"
            onChange={(e) => {
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]:
                  e.currentTarget.selectedOptions[0].value,
              });
            }}
          >
            <option value="">--Select Option--</option>
            <option value="Master Course 1"> Master Course name 1</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <select
            name="subject"
            id="Subject"
            className="form-control"
            onChange={(e) => {
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]:
                  e.currentTarget.selectedOptions[0].value,
              });
            }}
          >
            <option value="">--Select Option--</option>
            <option value="Subject 1">Subject 1</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="term">Term:</label>
          <select
            name="term"
            id="term"
            className="form-control"
            onChange={(e) => {
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]:
                  e.currentTarget.selectedOptions[0].value,
              });
            }}
          >
            <option value="">--Select Option--</option>
            <option value="Term 1">Term I</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            onChange={(e) => {
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]: e.currentTarget.value,
              });
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="option">Option:</label>
          <select
            name="option"
            id="option"
            className="form-control"
            onChange={(e) => {
              console.log("Before", selectedMarks);
              selectedMarks = [];
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]:
                  e.currentTarget.selectedOptions[0].value,
                  "marks": selectedMarks,
              });
              setSelectedOption(e.target.value);
              const totalMarksSelectionbox =
                document.getElementById("totalMarks");
              if (totalMarksSelectionbox?.classList.contains("selected")) {
                return;
              }
              totalMarksSelectionbox?.classList.add("selected");
            }}
          >
            <option value="">--Select--</option>
            <option value="Objective">Objective</option>
            <option value="Subjective">Subjective</option>
            <option value="Both">Both</option>
          </select>
        </div>
        {optionComponent(selectedOption)}

        <div id="totalMarks" style={{ display: "none" }}>
          <label htmlFor="totalmarks">Total Marks</label>
          <input
            type="number"
            name="totalmarks"
            id="totalmarks"
            className="form-control"
            onChange={(e) => {
              setBlueprintdata({
                ...blueprintdata,
                [e.currentTarget.name]: parseInt(e.currentTarget.value),
              });
            }}
          />
        </div>
        <div className="form-group nextbtn">
          <button
            className="btn btn-primary"
            onClick={async (e) => {
              debugger;
              setBpId(parseInt(await processSubmitForm(e)));
              setIsSaved(true);
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );

  async function processSubmitForm(e: any) {
    debugger;
    e.preventDefault();

    const form = document.forms[0];
    var marksArray: any[] = [];
    if (form?.option.value === "Objective") {
      marksArray = [
        parseFloat(form?.FIB.value),
        parseFloat(form?.MCQ.value),
        parseFloat(form?.TF.value),
      ];
    } else if (form?.option.value === "Subjective") {
      marksArray = [
        parseFloat(form?.FIB.value),
        parseFloat(form?.VSA.value),
        parseFloat(form?.SA.value),
        parseFloat(form?.LA.value),
      ];
    } else if (form?.option.value === "Both") {
      marksArray = [
        parseFloat(form?.FIBOBJ.value),
        parseFloat(form?.VSA.value),
        parseFloat(form?.SA.value),
        parseFloat(form?.LA.value),
        parseFloat(form?.FIBSUB.value),
        parseFloat(form?.MCQ.value),
        parseFloat(form?.TF.values),
      ];
    }

    marksArray.forEach((e: number, idx) => {
      if (Number.isNaN(e)) {
        marksArray[idx] = 0.0;
      }
    });

    const formDataObject = {
      title: form?.bptitle.value,
      location: form?.location.value,
      mastercoursename: form?.mastercoursename.value,
      subject: form?.subject.value,
      term: form?.term.value,
      option: form?.option.value,
      marks: marksArray,
      totalmarks: parseFloat(form?.totalmarks.value),
    };

    setBlueprintdata(formDataObject);
    let result;
    try {
      result = await $.ajax({
        type: "POST",
        url: `${backendURL}blueprint/create`,
        data: JSON.stringify(formDataObject),
        headers: {
          "Content-Type": "application/json",
        },
        beforeSend: function () {
          $("#loading").show();
        },
        complete: function () {
          $("#loading").hide();
        },
      });
    } catch (error) {}
    return result;
  }
  function optionComponent(option: string) {
    if (option === "Subjective") {
      return (
        <>
          <div className="Subjective marks" id="Subjective">
            <div className="form-group">
              <label htmlFor="FIB">
                FIB:
                <input
                  type="number"
                  className="form-control"
                  name="FIB"
                  id="FIB"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[0]!}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="VSA">
                VSA:
                <input
                  type="number"
                  className="form-control"
                  name="VSA"
                  id="VSA"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[1]!}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="LA">
                LA:
                <input
                  type="number"
                  className="form-control"
                  name="LA"
                  id="LA"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[2]!}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="SA">
                SA
                <input
                  type="number"
                  className="form-control"
                  name="SA"
                  id="SA"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[3]!}
                />
              </label>
            </div>
          </div>
        </>
      );
    } else if (option === "Objective") {
      return (
        <>
          <div className="Objective marks" id="Objective">
            <div className="form-group">
              <label htmlFor="FIB">
                FIB:
                <input
                  type="number"
                  className="form-control"
                  name="FIB"
                  id="FIB"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[0]!}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="MCQ">
                MCQ:
                <input
                  type="number"
                  className="form-control"
                  name="MCQ"
                  id="MCQ"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[1]!}
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="T/F">
                T/F:
                <input
                  type="number"
                  className="form-control"
                  name="TF"
                  id="TF"
                  data-attribute="marks"
                  onChange={(e) => {
                    selectedMarks.push(parseInt(e.currentTarget.value));
                    setBlueprintdata({
                      ...blueprintdata,
                      [e.currentTarget.dataset.attribute as string]:
                        selectedMarks,
                    });
                  }}
                  value={blueprintdata.marks[2]!}
                />
              </label>
            </div>{" "}
          </div>
        </>
      );
    } else if (option === "Both") {
      return (
        <>
          <div className="Both marks" id="Both">
            <div className="form-group">
              <label htmlFor="FIB">
                FIB:
                <input
                  type="number"
                  className="form-control"
                  name="FIBOBJ"
                  id="FIBOBJ"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="VSA">
                VSA:
                <input
                  type="number"
                  className="form-control"
                  name="VSA"
                  id="VSA"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="LA">
                LA:
                <input
                  type="number"
                  className="form-control"
                  name="LA"
                  id="LA"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="SA">
                SA
                <input
                  type="number"
                  className="form-control"
                  name="SA"
                  id="SA"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="FIB">
                FIB:
                <input
                  type="number"
                  className="form-control"
                  name="FIBSUB"
                  id="FIBSUB"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="MCQ">
                MCQ:
                <input
                  type="number"
                  className="form-control"
                  name="MCQ"
                  id="MCQ"
                />
              </label>
            </div>
            <div className="form-group">
              <label htmlFor="T/F">
                T/F:
                <input
                  type="number"
                  className="form-control"
                  name="TF"
                  id="TF"
                />
              </label>
            </div>
          </div>
        </>
      );
    } else {
      return <></>;
    }
  }
}
