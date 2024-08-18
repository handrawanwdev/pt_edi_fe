import React from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { useNavigate, Link } from "react-router-dom";

import ApiService from "../api/ApiService";

export default function Register() {
  const navigate = useNavigate();
  const toast = React.useRef(null);

  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    re_password: "",
  });
  const [passwordCheck, setPasswordCheck] = React.useState(false);

  React.useEffect(() => {
    if (passwordCheck&&formData.password !== formData.re_password) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Password and Confirm Password must be same",
        life: 3000,
      });
    }
  }, [formData.password,formData.re_password,passwordCheck]);

  const header = () => {
    return (
      <img
        alt="Card"
        src="https://www.primefaces.org/primereact-v5/showcase/images/home/react-community.png"
        style={{ width: "100%" }}
      />
    );
  };

  const onSubmit = async(e) => {
    e.preventDefault();
    ApiService.post("/user/register", formData).then(({ data }) => {
      // console.log(data);
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Register success",
        life: 3000,
      });
      setTimeout(() =>{
        navigate("/login");
      }, 4000);
    }).catch((error) => {
      // console.error("Error register: ", error);
      let message = "Register failed";
      if (error.response && error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }else{
        console.error("Error register: ", error);
      }
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: message,
        life: 3000,
      });
    });
    console.log("Submitted");
  };

  return (
    <section
      className="d-flex flex-column justify-content-between align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <Toast ref={toast} />
      <div style={{ width: "500px", top: "150px", position: "relative" }}>
        <div className="container">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <div className="row">
              <div className="col">
                <form className="p-fluid" onSubmit={onSubmit}>
                  <Card title="Sign up" header={header}>
                    <div className="container">
                      <div className="row">
                      <div className="form-group">
                          <label id="username" style={{ fontSize: "16px" }}>
                            Username
                          </label>
                          <InputText
                            id="username"
                            type="username"
                            className="fs-6 mt-2"
                            placeholder="Ex: PT EDI Indonesia"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                username: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label id="email" style={{ fontSize: "16px" }}>
                            Email
                          </label>
                          <InputText
                            id="username"
                            type="email"
                            className="fs-6 mt-2"
                            placeholder="Ex: recruiter_edi@mail.com"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                email: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label id="password" style={{ fontSize: "16px" }}>
                            Password
                          </label>
                          <InputText
                            id="password"
                            type="password"
                            className="fs-6 mt-2"
                            placeholder="Ex: ********"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div className="form-group">
                          <label id="re_password" style={{ fontSize: "16px" }}>
                            Confirm Password
                          </label>
                          <InputText
                            id="re_password"
                            type="password"
                            className="fs-6 mt-2"
                            placeholder="Ex: ********"
                            onChange={(e) =>{
                              setPasswordCheck(false);
                              setFormData({
                                ...formData,
                                re_password: e.target.value,
                              })
                            }}
                            onBlur={() => setPasswordCheck(true)}
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="form-control btn btn-primary mt-2"
                          >
                            Submit
                          </button>
                        </div>
                        <div className="form-group">
                          <div className="mt-3 d-flex justify-content-center">
                            <Link to={"/login"} className="text-decoration-none">
                              Back to Login
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
