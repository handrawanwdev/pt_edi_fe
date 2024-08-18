import React from "react";

import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";

import { useNavigate, Link } from "react-router-dom";

import ApiService from "../api/ApiService";

export default function Login() {
  const navigate = useNavigate();
  const toast = React.useRef(null);

  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });

  const header = () => {
    return (
      <img
        alt="Card"
        // src="https://primefaces.org/cdn/primereact/images/usercard.png"
        src="https://www.primefaces.org/primereact-v5/showcase/images/home/react-accesibility.png"
        style={{ width: "100%" }}
      />
    );
  };

  const footer = () => {
    return <span>Login with your credentials</span>;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    ApiService.post("/user/login", formData)
      .then(({ data }) => {
        if(data.result.access_token){
          localStorage.setItem("token", data.result.access_token);
          localStorage.setItem("account_data", JSON.stringify({
            username: data.result.username,
            is_admin: data.result.is_admin,
          }));
          toast.current.show({
            severity: "success",
            summary: "Success",
            detail: "Login success",
          });
          setTimeout(() => {
            navigate("/");
          }, 1000);
        }
      })
      .catch((error) => {
        // console.error("Error login: ", error);
        let message = "Login failed";
        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          message = error.response.data.message;
        }
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: message,
          life: 3000,
        });
      }).finally(() => {
        console.log("Finally");
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
                  <Card title="Sign" header={header} footer={footer}>
                    <div className="container">
                      <div className="row">
                        <div className="form-group">
                          <label id="email" style={{ fontSize: "16px" }}>
                            Email
                          </label>
                          <InputText
                            id="email"
                            type="text"
                            className="fs-6 mt-2"
                            placeholder="admin@admin.com"
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
                            placeholder="*******"
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                password: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="row">
                        <div className="form-group">
                          <button
                            type="submit"
                            className="form-control btn btn-primary mt-2"
                          >
                            Login
                          </button>
                        </div>
                        <div className="form-group">
                          <div className="mt-3 d-flex justify-content-center">
                            <Link to={"/register"} className="text-decoration-none">
                              Already have a account ? Register
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
