import { useState, useEffect } from "react";
import { backendURL } from "../globals/global_variable";

export type nav = {
  MenuName: string;
  MenuUrl: string;
  type: string;
  mutiVal: nav[];
};

export default function ManageLinks() {
  const [navdata, setNavdata] = useState<nav[]>();
  const [displayValue, setDisplayValue] = useState<string>("none");
  useEffect(() => {
    setDisplayValue("none");
    loadJSONData();
  }, []);

  async function loadJSONData() {
    const response = await fetch(
       `${backendURL}/navbar/navlist`
    );
    const data = await response.json();
    var navlistArray: nav[] = [];
    data.forEach((nav: nav) => {
      if (nav.type === "multi") {
        navlistArray.push(nav);
        nav.mutiVal.forEach((child) => {
          navlistArray.push(child as nav);
        });
      } else {
        navlistArray.push(nav);
      }
    });
    setNavdata(navlistArray as nav[]);
    console.log(data)
  }
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-center">
      <h1>Manage Routes</h1>
      <hr />

      <div className="w-60">
        <table
          className="table table-bordered table-striped table-dark"
          border={1}
          style={{ borderCollapse: "collapse" }}
        >
          <thead className="thead-dark">
            <tr>
              <th>#</th>
              <th>Menu Name</th>
              <th>Menu URL</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {navdata?.map((e: nav, idx) => {
              return (
                <>
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{e.MenuName}</td>
                    <td>{e.MenuUrl}</td>
                    <td>{e.type}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <hr />
        <div className="container-fluid w-100">
          <button
            className="btn btn-primary float-end"
            onClick={() => setDisplayValue("block")}
          >
            Add Route
          </button>
        </div>
      </div>
      {renderAddRoute(displayValue)}
    </div>
  );
  function renderAddRoute(displayValue: string) {
    return (
      <div
        style={{ display: displayValue, height: "300px" }}
        className="border bg-light rounded container w-75 position-relative position-absolute top-50 start-50 translate-middle z-index-3 center p-2"
      >
        <div className="position-absolute w-100 p-2">
          <button
            className="float-end float-top m-2 bg-transparent border-0 fw-bolder z-index-3"
            onClick={() => {
              setDisplayValue("none");
            }}
          >
            X
          </button>
          <h1>Add Route</h1>
          <hr />
          <div className="container w-100 d-flex justify-content-between h-100 align-center">
            <div className="form-group w-50 p-2 m-2">
              <label htmlFor="menuname">Menu Name</label>
              <input
                className="form-control"
                type="text"
                name="menuname"
                id="menuname"
              />
            </div>
            <div className="form-group w-50 p-2 m-2">
              <label htmlFor="menuurl">Menu URL</label>
              <input
                className="form-control"
                type="text"
                name="menuurl"
                id="menuurl"
              />
            </div>
            <div className="form-group w-50 p-2 m-2">
              <label htmlFor="type">Menu Type</label>
              <input
                className="form-control"
                type="text"
                name="type"
                id="type"
              />
            </div>
          </div>
          <hr />
          <button
            className="btn btn-primary float-end m-2"
            onClick={() => {
              setDisplayValue("none");
            }}
          >
            Save
          </button>
        </div>
      </div>
    );
  }
}
