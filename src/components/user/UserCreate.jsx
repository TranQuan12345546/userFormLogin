import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Use useForm hook from react-hook-form to create a form and handle validation
import { useForm } from "react-hook-form";

const API_URL = "http://localhost:8080/api/v1/user"; // TODO:change to user api url
function UserCreate() {
  const [addressList, setAddressList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // TODO: call api to get province list
    // url: https://provinces.open-api.vn/api/p/
    fetch("https://provinces.open-api.vn/api/p/")
    .then((response) => response.json())
    .then((json) => setAddressList(json))
  }, []);

  // Sử dụng: useForm hook
  // register là function dùng để gán cho các input field để hook-form có thể theo dõi sự thay đổi của input field
  // dùng register thì không cần viết các sự kiện onchange cho các input field
  // handleSubmit: function khi submit form
  // errors: thuộc tính trong formState object, dùng để chứa các validation errors nếu có
  const { register, handleSubmit, formState:{ errors } } = useForm();

  const onSubmit = (data) => {
    fetch("http://localhost:8080/api/v1/user", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
    });

  console.log(data)
  }

  return (
    <>
      <div className="container mt-5 mb-5">
        <h2 className="text-center text-uppercase mb-3">Create user</h2>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="bg-light p-4">
                <div className="mb-3">
                  <label className="col-form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="form-control"
                    {...register("name")}
                  />
                  <p className="text-danger">{errors.name?.message}</p>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Email</label>
                  <input
                    type="text"
                    id="email"
                    className="form-control"
                    // TODO: sử dụng register để đăng kí thuộc tính để theo dõi trong form
                    {...register("email")}
                  />
                  <p className="text-danger">{errors.email?.message}</p>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    className="form-control"
                    // TODO: sử dụng register để đăng kí thuộc tính để theo dõi trong form
                    {...register("phone")}
                  />
                  <p className="text-danger">{errors.phone?.message}</p>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Address</label>
                  <select
                    className="form-select"
                    id="address"
                    // TODO: sử dụng register để đăng kí thuộc tính để theo dõi trong form
                    {...register("address")}
                  >
                    <option hidden value="">
                      Choose province
                    </option>
                    {addressList.map((item) => (
                      <option key={item.code} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <p className="text-danger">{errors.address?.message}</p>
                </div>
                <div className="mb-3">
                  <label className="col-form-label">Password</label>
                  <input
                    type="text"
                    id="password"
                    className="form-control"
                    // TODO: sử dụng register để đăng kí thuộc tính để theo dõi trong form
                    {...register("password")}
                  />
                  <p className="text-danger">{errors.password?.message}</p>
                </div>
              </div>
              <div className="text-center mt-3">
                <button
                  className="btn btn-secondary btn-back"
                  type="button"
                  onClick={() => navigate("/")}
                >
                  Back
                </button>
                <button className="btn btn-success" type="submit" id="btn-save">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserCreate;
