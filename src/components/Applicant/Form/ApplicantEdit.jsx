import React from "react";

import { Button } from "primereact/button";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { Link } from "react-router-dom";

import ApiService from "../../../api/ApiService";

import { useParams, useNavigate } from "react-router-dom";

export default function EmployeeEdit() {
  const { id } = useParams();
  const toast = React.useRef(null);
  const navigate = useNavigate();

  const [form, setForm] = React.useState({
    position: "",
    name: "",
    ktp: "",
    birth: "",
    gender: "",
    religion: "",
    blood_type: "",
    status: "",
    address_ktp: "",
    address_live: "",
    email: "",
    phone: "",
    contact_person: "",
    proficiency: "",
    willing: "",
    salary: "",
  });

  const [last_education, setLastEducation] = React.useState([
    {
      id: null,
      education: "",
      institution: "",
      major: "",
      year: "",
      gpa: "",
    },
  ]);

  const [skill, setSkill] = React.useState([
    {
      id: null,
      course: "",
      certification: "",
      year: "",
    },
  ]);

  const [work_experience, setWorkExperience] = React.useState([
    {
      id: null,
      company: "",
      last_position: "",
      last_income: "",
      year: "",
    },
  ]);

  const getDataId = async (id) => {
    try {
      const response = await ApiService.get(`/biodata/${id}`,{
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")||""}`
        }
      });
      let payload = response.data.result;
      setForm({
        position: payload.position,
        name: payload.name,
        ktp: payload.ktp,
        birth: payload.birth,
        gender: payload.gender,
        religion: payload.religion,
        blood_type: payload.blood_type,
        status: payload.status,
        address_ktp: payload.address_ktp,
        address_live: payload.address_live,
        email: payload.email,
        phone: payload.phone,
        contact_person: payload.contact_person,
        proficiency: payload.proficiency,
        willing: payload.willing,
        salary: payload.salary,
      });
      setLastEducation(
        payload.last_education
          ? [...payload.last_education,{
            id: null,
            education: "",
            institution: "",
            major: "",
            year: "",
            gpa: "",
          }]
          : [{
            id: null,
            education: "",
            institution: "",
            major: "",
            year: "",
            gpa: "",
          }]
      );
      setSkill(
        payload.skill
          ? [...payload.skill,{
            id: null,
            course: "",
            certification: "",
            year: "",
          }]
          : [{
            id: null,
            course: "",
            certification: "",
            year: "",
          }]
      );
      setWorkExperience(
        payload.work_experience
          ? [...payload.work_experience,{
            id: null,
            company: "",
            last_position: "",
            last_income: "",
            year: "",
          }]
          : [{
            id: null,
            company: "",
            last_position: "",
            last_income: "",
            year: "",
          }]
      );
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  React.useEffect(() => {
    getDataId(id);
  }, [id]);

  const onSubmit = (e) => {
    e.preventDefault();
    confirmDialog({
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      position: "top",
      accept: async () => {
        try {
          toast.current.show({
            severity: "success",
            summary: "Confirmed",
            detail: "Data berhasil diubah",
            life: 3000,
          });
          await ApiService.put(`/biodata/${id}`, {
            ...form,
            last_education:last_education.filter((item)=>item.education!==""&&item.institution!==""&&item.major!==""&&item.year!==""&&item.gpa!==""),
            skill:skill.filter((item)=>item.course!==""&&item.certification!==""&&item.year!==""),
            work_experience:work_experience.filter((item)=>item.company!==""&&item.last_position!==""&&item.last_income!==""&&item.year!==""),
          },{
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")||""}`
            }
          });
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (error) {
          console.error("Error adding data: ", error);
          let message = "Error adding data";
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            message = error.response.data.message;
          } else {
            message = error.message;
          }
          toast.current.show({
            severity: "danger",
            summary: "Rejected",
            detail: message,
            life: 3000,
          });
        }
      },
      reject: () => {
        toast.current.show({
          severity: "warn",
          summary: "Rejected",
          detail: "Data tidak jadi diubah",
          life: 3000,
        });
      },
    });
  };

  return (
    <section className="d-flex justify-content-center align-items-center">
      <Toast ref={toast} />
      <ConfirmDialog />
      <form
        style={{ width: "850px", position: "relative" }}
        onSubmit={onSubmit}
      >
        {/* <code>{JSON.stringify({...form,last_education:last_education,skill:skill,work_experience:work_experience})}</code> */}
        <div className="container p-2">
          <div className="row">
            <div className="col-12 mb-3">
              <div className="form-group">
                <div className="d-flex justify-content-center">
                  <img
                    src="https://lh3.googleusercontent.com/QKvXIWmiUAAIz7FieMq-S102pIQKwuL7f5Xs3ePDaxe9NkbJ5x_NEOdeqtYchAymKWOlSaIYdGa8yqOv_cdOWEqEfX5zRfgDUeIE1g4_5Ecrmcudo2umJLZg7xVOTa-2gw=w4000"
                    alt="..."
                    width={1024}
                  />
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="d-flex justify-content-center align-items-center">
                <span
                  className="text-center"
                  style={{
                    borderBottom: "1px solid #000",
                    fontSize: "24px",
                    fontWeight: "bold",
                    width: "300px",
                  }}
                >
                  DATA PRIBADI PELAMAR
                </span>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      1. &nbsp;&nbsp; POSISI YANG DILAMAR
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="position"
                        placeholder="..."
                        value={form.position}
                        onChange={(e) =>
                          setForm({ ...form, position: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      2. &nbsp;&nbsp; NAMA
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="name"
                        placeholder="..."
                        value={form.name}
                        onChange={(e) =>
                          setForm({ ...form, name: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      3. &nbsp;&nbsp; NO. KTP
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="ktp"
                        placeholder="..."
                        value={form.ktp}
                        onChange={(e) =>
                          setForm({ ...form, ktp: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      4. &nbsp;&nbsp; TEMPAT, TANGGAL LAHIR
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="birth"
                        placeholder="..."
                        value={form.birth}
                        onChange={(e) =>
                          setForm({ ...form, birth: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      5. &nbsp;&nbsp; JENIS KELAMIN
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <select
                        className="form-control border-0 border-bottom"
                        id="gender"
                        onChange={(e) =>
                          setForm({ ...form, gender: e.target.value })
                        }
                        value={form.gender}
                      >
                        <option value="" selected disabled>
                          ...
                        </option>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      6. &nbsp;&nbsp; AGAMA
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="religion"
                        placeholder="..."
                        value={form.religion}
                        onChange={(e) =>
                          setForm({ ...form, religion: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      7. &nbsp;&nbsp; GOLONGAN DARAH
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <select
                        className="form-control border-0 border-bottom"
                        id="blood_type"
                        value={form.blood_type}
                        onChange={(e) =>
                          setForm({ ...form, blood_type: e.target.value })
                        }
                      >
                        <option value="" selected disabled>
                          ...
                        </option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="AB">AB</option>
                        <option value="O">O</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      8. &nbsp;&nbsp; STATUS
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                      <span>:</span>
                      <select
                        className="form-control border-0 border-bottom"
                        id="status"
                        value={form.status}
                        onChange={(e) =>
                          setForm({ ...form, status: e.target.value })
                        }
                      >
                        <option value="" selected disabled>
                          ...
                        </option>
                        <option value="Belum Menikah">Belum Menikah</option>
                        <option value="Menikah">Menikah</option>
                        <option value="Duda">Duda</option>
                        <option value="Janda">Janda</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <div className="font-weight-bolder">
                      9. &nbsp;&nbsp; ALAMAT KTP
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                      <span>:</span>
                      <textarea
                        className="form-control border-0 border-bottom"
                        id="address_ktp"
                        placeholder="..."
                        cols={30}
                        rows={5}
                        style={{ resize: "none" }}
                        value={form.address_ktp}
                        onChange={(e) =>
                          setForm({ ...form, address_ktp: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <div className="font-weight-bolder">
                      10. &nbsp;&nbsp; ALAMAT TINGGAL
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                      <span>:</span>
                      <textarea
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="address_live"
                        placeholder="..."
                        cols={30}
                        rows={5}
                        style={{ resize: "none" }}
                        value={form.address_live}
                        onChange={(e) =>
                          setForm({ ...form, address_live: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      11. &nbsp;&nbsp; EMAIL
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="email"
                        className="form-control border-0 border-bottom"
                        id="email"
                        placeholder="..."
                        value={form.email}
                        onChange={(e) =>
                          setForm({ ...form, email: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      12. &nbsp;&nbsp; NO TELP
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="phone"
                        placeholder="..."
                        value={form.phone}
                        onChange={(e) =>
                          setForm({ ...form, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-7 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      13. &nbsp;&nbsp; ORANG TERDEKAT YANG DAPAT DIHUBUNGI
                    </div>
                  </div>
                  <div className="col-5">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="contact_person"
                        placeholder="..."
                        value={form.contact_person}
                        onChange={(e) =>
                          setForm({ ...form, contact_person: e.target.value })
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <div className="font-weight-bolder">
                      14. &nbsp;&nbsp; PENDIDIKAN TERAKHIR
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <table className="table table-bordered">
                        <thead className="table-active">
                          <tr>
                            <th scope="col">Jenjang</th>
                            <th scope="col">Institusi Akademik</th>
                            <th scope="col">Jurusan</th>
                            <th scope="col">Tahun Lulus</th>
                            <th scope="col">IPK</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {last_education.map((item, index) => (
                            <tr key={index}>
                              <td width={125}>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="education"
                                  placeholder="..."
                                  value={item.education}
                                  onChange={(e) =>
                                    setLastEducation(
                                      last_education.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              education: e.target.value,
                                            }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={250}>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="institution"
                                  placeholder="..."
                                  value={item.institution}
                                  onChange={(e) =>
                                    setLastEducation(
                                      last_education.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              institution: e.target.value,
                                            }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={250}>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="major"
                                  placeholder="..."
                                  value={item.major}
                                  onChange={(e) =>
                                    setLastEducation(
                                      last_education.map((item, i) =>
                                        i === index
                                          ? { ...item, major: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={200}>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="year"
                                  placeholder="..."
                                  value={item.year}
                                  onChange={(e) =>
                                    setLastEducation(
                                      last_education.map((item, i) =>
                                        i === index
                                          ? { ...item, year: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={150}>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="gpa"
                                  placeholder="..."
                                  value={item.gpa}
                                  onChange={(e) =>
                                    setLastEducation(
                                      last_education.map((item, i) =>
                                        i === index
                                          ? { ...item, gpa: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={150}>
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-success"
                                  icon="pi pi-plus"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setLastEducation([
                                      ...last_education,
                                      {
                                        id: last_education.length + 1,
                                        education: "",
                                        institution: "",
                                        major: "",
                                        year: "",
                                        gpa: "",
                                      },
                                    ])
                                  }
                                />
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-danger"
                                  icon="pi pi-trash"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setLastEducation(
                                      last_education.filter(
                                        (_, i) => i !== index
                                      )
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <div className="font-weight-bolder">
                      15. &nbsp;&nbsp; RIWAYAT PELATIHAN
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <table className="table table-bordered">
                        <thead className="table-active">
                          <tr>
                            <th scope="col">Nama Kursus</th>
                            <th scope="col">Sertifikasi {"(ada/tidak)"}</th>
                            <th scope="col">Tahun</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {skill.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="course"
                                  placeholder="..."
                                  value={item.course}
                                  onChange={(e) =>
                                    setSkill(
                                      skill.map((item, i) =>
                                        i === index
                                          ? { ...item, course: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="certification"
                                  placeholder="..."
                                  value={item.certification}
                                  onChange={(e) =>
                                    setSkill(
                                      skill.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              certification: e.target.value,
                                            }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="year"
                                  placeholder="..."
                                  value={item.year}
                                  onChange={(e) =>
                                    setSkill(
                                      skill.map((item, i) =>
                                        i === index
                                          ? { ...item, year: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-success"
                                  icon="pi pi-plus"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setSkill([
                                      ...skill,
                                      {
                                        id: skill.length + 1,
                                        course: "",
                                        certification: "",
                                        year: "",
                                      },
                                    ])
                                  }
                                />
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-danger"
                                  icon="pi pi-trash"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setSkill(
                                      skill.filter((_, i) => i !== index)
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-12">
                    <div className="font-weight-bolder">
                      16. &nbsp;&nbsp; RIWAYAT PEKERJAAN
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-row justify-content-start align-items-center">
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <table className="table table-bordered">
                        <thead className="table-active">
                          <tr>
                            <th scope="col">Nama Perusahaan</th>
                            <th scope="col">Posisi Terakhir</th>
                            <th scope="col">Pendapatan Terakhir</th>
                            <th scope="col">Tahun</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {work_experience.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="company"
                                  placeholder="..."
                                  value={item.company}
                                  onChange={(e) =>
                                    setWorkExperience(
                                      work_experience.map((item, i) =>
                                        i === index
                                          ? { ...item, company: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="last_position"
                                  placeholder="..."
                                  value={item.last_position}
                                  onChange={(e) =>
                                    setWorkExperience(
                                      work_experience.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              last_position: e.target.value,
                                            }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="last_income"
                                  placeholder="..."
                                  value={item.last_income}
                                  onChange={(e) =>
                                    setWorkExperience(
                                      work_experience.map((item, i) =>
                                        i === index
                                          ? {
                                              ...item,
                                              last_income: e.target.value,
                                            }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control border-0 border-bottom"
                                  id="year"
                                  placeholder="..."
                                  value={item.year}
                                  onChange={(e) =>
                                    setWorkExperience(
                                      work_experience.map((item, i) =>
                                        i === index
                                          ? { ...item, year: e.target.value }
                                          : item
                                      )
                                    )
                                  }
                                />
                              </td>
                              <td width={125}>
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-success"
                                  icon="pi pi-plus"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setWorkExperience([
                                      ...work_experience,
                                      {
                                        id: work_experience.length + 1,
                                        company: "",
                                        last_position: "",
                                        last_income: "",
                                        year: "",
                                      },
                                    ])
                                  }
                                />
                                <Button
                                  type="button"
                                  className="p-button-sm p-button-danger"
                                  icon="pi pi-trash"
                                  style={{
                                    marginRight: ".25em",
                                    fontSize: "14px",
                                  }}
                                  onClick={() =>
                                    setWorkExperience(
                                      work_experience.filter(
                                        (_, i) => i !== index
                                      )
                                    )
                                  }
                                />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-4">
                    <div className="font-weight-bolder">
                      <div>17. &nbsp;&nbsp; SKILL</div>
                      <small>
                        * Tuliskan keahlian & keterampilan yang saat ini kamu
                        kuasai
                      </small>
                      <br />
                    </div>
                  </div>
                  <div className="col-8">
                    <div className="d-flex flex-row justify-content-between align-items-baseline">
                      <span>:</span>
                      <textarea
                        className="form-control border-0 border-bottom"
                        id="proficiency"
                        placeholder="Contoh: Microsoft Office, Adobe Photoshop, dll"
                        cols={30}
                        rows={5}
                        style={{ resize: "none" }}
                        value={form.proficiency}
                        onChange={(e) =>
                          setForm({ ...form, proficiency: e.target.value })
                        }
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-8 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      18. &nbsp;&nbsp; BERSEDIA DITEMPATKAN DI SELURUH KANTOR
                      PERUSAHAAN
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <select
                        className="form-control border-0 border-bottom"
                        id="willing"
                        value={form.willing}
                        onChange={(e) =>
                          setForm({ ...form, willing: e.target.value })
                        }
                      >
                        <option value="" selected disabled>
                          ...
                        </option>
                        <option value="Ya">Ya</option>
                        <option value="Tidak">Tidak</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 m-1">
              <div className="form-group">
                <div className="row">
                  <div className="col-8 d-flex flex-row justify-content-between align-items-center">
                    <div className="font-weight-bolder">
                      19. &nbsp;&nbsp; PENGHASILAN YANG DIHARAPKAN
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="d-flex flex-row justify-content-between align-items-center">
                      <span>:</span>
                      <input
                        type="text"
                        className="form-control border-0 border-bottom"
                        id="salary"
                        placeholder="..."
                        value={form.salary}
                        onChange={(e) =>
                          setForm({ ...form, salary: e.target.value })
                        }
                      />
                      <span>/bulan</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-12 mt-3 mb-3">
              <div className="form-group">
                <Link to="/">
                  <Button
                    type="button"
                    label="Kembali"
                    icon="pi pi-arrow-left"
                    className="p-button-raised p-button-rounded p-button-lg p-button-secondary"
                  />
                </Link>
                <Button
                  type="submit"
                  label="Submit"
                  icon="pi pi-save"
                  className="p-button-raised p-button-rounded p-button-lg p-button-primary ml-3"
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    </section>
  );
}
