import React, { useState, useLayoutEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Paginator } from "primereact/paginator";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';

import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { OverlayPanel } from "primereact/overlaypanel";

import { useNavigate } from "react-router-dom";

import ApiService from "../../api/ApiService";

export default function PaginatorBasicDemo() {
  const [applicant, setApplicant] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(applicant.length);

  let account_data = JSON.parse(localStorage.getItem("account_data")) || {};

  const [filterData, setFilterData] = useState({
    name: "",
    position: "",
    last_education: ""
  });

  const op = useRef(null);
  const toast = useRef(null);

  const navigate = useNavigate();

  useLayoutEffect(() => {
    getAllData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const getAllData = (page, limit) => {
    let params = {};
    params.page = page + 1;
    params.limit = limit;
    ApiService.get("/biodata",{params, headers: {
      Authorization: `Bearer ${localStorage.getItem("token")||""}`
    }}).then(({data}) => {
      setApplicant(data.result.data);
      setTotalRecords(data.result.total_data);
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  const filterAllData = (name, position, last_education) => {
    let params = {};
    params.page = 1;
    params.limit = 10;
    if(name) params.name = name;
    if(position) params.position = position;
    if(last_education) params.last_education = last_education
    ApiService.get("/biodata",{params, headers: {
      Authorization: `Bearer ${localStorage.getItem("token")||""}`
    }}).then(({data}) => {
      setApplicant(data.result.data);
      setTotalRecords(data.result.total_data);
    }).catch((error) => {
      console.error("Error fetching data: ", error);
    });
  }

  const onPageChange = (event) => {
    setPage(event.page);
    setRowsPerPage(event.rows);
    setTotalRecords(event.totalPages * event.rows);
  };

  const deleteData = (id) => {
    confirmDialog({
      message: 'Are you sure you want to delete ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      defaultFocus: 'accept',
      accept:async()=>{
        try {
          toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Data telah diproses', life: 3000 });
          await ApiService.delete(`/biodata/${id}`,{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")||""}`
            }
          });
          toast.current.show({ severity: 'success', summary: 'Berhasil', detail: 'Data telah dihapus', life: 3000 });
          getAllData(page, rowsPerPage);
        } catch (error) {
          console.error("Error deleting data: ", error);
        }
      },
      reject:()=>{
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
      }
    });
  };
  
  const actionBodyTemplate = (rowData) => {
    return (
      <div className="form-group">
        <Link
          to={`/edit-applicant/${rowData.id}`}
          className="btn btn-success m-1"
        >
          <i className="pi pi-pen-to-square"></i> Edit
        </Link>
        <ConfirmDialog />
        <button onClick={()=>deleteData(rowData.id)} className="btn btn-danger m-1">
          <i className="pi pi-trash"></i> Hapus
        </button>
      </div>
    );
  };

  return (
    <div className="container">
      <Toast ref={toast} />
      <h4>Applicant {account_data?.username}</h4>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="#">Home</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Applicant
          </li>
        </ol>
      </nav>
      <div className="row m-1">
        <div className="col-md-8">
          <div className="d-flex justify-content-start align-items-center">
            <Link to="/add-applicant" className="btn btn-primary mr-2">
              <i className="pi pi-plus"></i>
              {"  "}Add Applicant
            </Link>
          </div>
        </div>
        <div className="col-md-4">
          <div className="d-flex justify-content-end">
          <button
              type="button"
              className="btn btn-danger m-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ><i className="pi pi-sign-out"></i> Logout</button>
            { account_data?.is_admin ? (
              <React.Fragment>
                <button type="button" className="btn btn-primary m-1" onClick={(e) => op.current.toggle(e)}>
                  <i className="pi pi-search"></i> Search
                </button>
                <OverlayPanel ref={op}>
                  <div className="p-grid" style={{'width':"300px"}}>
                    <div className="row">
                      <div className="col-md-12 p-1">
                        <div className="form-group">
                          <label htmlFor="name">Name</label>
                          <input
                            type="text"
                            className="form-control mt-1"
                            id="name"
                            placeholder="John Doe"
                            onChange={(e) => {
                              setFilterData({...filterData, name: e.target.value});
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 p-1">
                        <div className="form-group">
                          <label htmlFor="position">Jabatan yang dilamar</label>
                          <input
                            type="text"
                            className="form-control mt-1"
                            id="position"
                            placeholder="NodeJS Developer"
                            onChange={(e) => {
                              setFilterData({...filterData, position: e.target.value});
                            }}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 p-1">
                        <div className="form-group">
                          <label htmlFor="last_education">Pendidikan Terakhir</label>
                          <input
                            type="text"
                            className="form-control mt-1"
                            id="last_education"
                            placeholder="S1"
                            onChange={(e) => {
                              setFilterData({...filterData, last_education: e.target.value});
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
                                  console.log("Search",filterData);
                                  filterAllData(filterData.name, filterData.position, filterData.last_education);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </OverlayPanel>
              </React.Fragment>
            ):(
              <React.Fragment></React.Fragment>
            )}
          </div>
        </div>
      </div>
      <div className="p-fluid">
        <DataTable
          rowsPerPageOptions={[10, 25, 50, 100]}
          value={applicant.slice(page * rowsPerPage, (page + 1) * rowsPerPage)}
          rows={rowsPerPage}
          onPage={onPageChange}
          totalRecords={totalRecords}
          tableStyle={{ minWidth: "50rem" }}
          className="p-datatable border-0"
          emptyMessage="No data found."
        >
          <Column sortable field="name" header="Name"></Column>
          <Column field="position" header="Jabatan yang dilamar"></Column>
          <Column field="birth" header="Tempat, Tanggal Lahir"></Column>
          <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
        </DataTable>

        <Paginator
          first={page * rowsPerPage}
          rows={rowsPerPage}
          totalRecords={totalRecords}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
