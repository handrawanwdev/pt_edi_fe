import React,{ useState, useRef } from "react";

import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";

import ApiService from "../../../api/ApiService";

export default function Filter() {
  const [filterData, setFilterData] = useState({
    name: "",
    position: "",
    last_education: "",
  });

    const op = useRef(null);

  const filterAllData = (name, position, last_education) => {
    let params = {};
    params.page = 1;
    params.limit = 10;
    if (name) params.name = name;
    if (position) params.position = position;
    if (last_education) params.last_education = last_education;
    ApiService.get("/biodata", {
      params,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then(({ data }) => {
        setApplicant(data.result.data);
        setTotalRecords(data.result.total_data);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
      });
  };

  return (
    <React.Fragment>
      <button
        type="button"
        className="btn btn-primary m-1"
        onClick={(e) => op.current.toggle(e)}
      >
        <i className="pi pi-search"></i> Search
      </button>
      <OverlayPanel ref={op}>
        <div className="p-grid" style={{ width: "300px" }}>
          <div className="row">
            <div className="col-md-12 p-1">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="name"
                  placeholder="NodeJS Developer"
                  onChange={(e) => {
                    setFilterData({ ...filterData, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col-md-12 p-1">
              <div className="form-group">
                <label htmlFor="company">Jabatan yang dilamar</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="position"
                  placeholder="NodeJS Developer"
                  onChange={(e) => {
                    setFilterData({ ...filterData, position: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="col-md-12 p-1">
              <div className="form-group">
                <label htmlFor="company">Pendidikan Terakhir</label>
                <input
                  type="text"
                  className="form-control mt-1"
                  id="last_education"
                  placeholder="S1"
                  onChange={(e) => {
                    setFilterData({
                      ...filterData,
                      last_education: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <div className="col-md-12 p-1">
              <div className="form-group">
                <div className="d-flex justify-content-end">
                  <Button
                    type="button"
                    icon="pi pi-search"
                    className="p-button-primary"
                    label="Search"
                    onClick={() => {
                      console.log("Search", filterData);
                      filterAllData(
                        filterData.name,
                        filterData.position,
                        filterData.last_education
                      );
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </OverlayPanel>
    </React.Fragment>
  );
}
