import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

function UserDetail({}) {
    const [userInfo, setUserInfo] = useState([]);
    const [addressList, setAddressList] = useState([]);
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const { userId } = useParams();

    useEffect(() => {
        fetch("https://provinces.open-api.vn/api/p/")
            .then((response) => response.json())
            .then((json) => setAddressList(json));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8080/api/v1/users/${userId}`)
            .then((response) => response.json())
            .then((json) => {
                setUserInfo(json);
            });
    }, []);

    useEffect(() => {
        if (userInfo.id) {
            setValue("name", userInfo.name);
            setValue("email", userInfo.email);
            setValue("phone", userInfo.phone);
        }
    }, [userInfo, setValue]);

    const onSubmit = (data) => {
        fetch(`http://localhost:8080/api/v1/${userId}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        console.log(data);
    };

    const navigate = useNavigate();

    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="text-center text-uppercase mb-3">
                    Thông tin user
                </h2>

                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="bg-light p-4">
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Fullname
                                    </label>
                                    <input
                                        defaultValue={userInfo.name}
                                        type="text"
                                        id="fullname"
                                        className="form-control"
                                        {...register("name")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Email
                                    </label>
                                    <input
                                        defaultValue={userInfo.email}
                                        type="text"
                                        id="email"
                                        className="form-control"
                                        {...register("email")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Phone
                                    </label>
                                    <input
                                        defaultValue={userInfo.phone}
                                        type="text"
                                        id="phone"
                                        className="form-control"
                                        {...register("phone")}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Address
                                    </label>
                                    <select
                                        className="form-select"
                                        id="address"
                                        {...register("address")}
                                    >
                                        <option hidden value="">
                                            Choose province
                                        </option>
                                        {addressList.map((item) => (
                                            <option
                                                key={item.code}
                                                value={item.name}
                                            >
                                                {item.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Avatar</label>
                                    <div className="avatar-preview mb-3 rounded">
                                        <img
                                            src="https://via.placeholder.com/200"
                                            alt="avatar"
                                            id="avatar-preview"
                                            className="rounded"
                                        />
                                    </div>

                                    <label
                                        className="btn btn-warning"
                                        htmlFor="input"
                                    >
                                        Chọn ảnh
                                    </label>
                                    <input
                                        type="file"
                                        id="input"
                                        className="d-none"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Password
                                    </label>
                                    <div className="">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target="#modal-change-password"
                                        >
                                            Đổi mật khẩu
                                        </button>
                                        <button
                                            className="btn btn-warning"
                                            id="btn-forgot-password"
                                        >
                                            Quên mật khẩu
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center mt-3">
                                <button
                                    className="btn btn-secondary btn-back"
                                    onClick={() => navigate("/")}
                                >
                                    Quay lại
                                </button>
                                <button
                                    className="btn btn-success"
                                    type="submit"
                                    id="btn-save"
                                >
                                    Cập nhật
                                </button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Modal đổi mật khẩu */}
                <div
                    className="modal fade"
                    id="modal-change-password"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                    tabIndex="-1"
                    aria-labelledby="staticBackdropLabel"
                    aria-hidden="true"
                >
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5
                                    className="modal-title"
                                    id="staticBackdropLabel"
                                >
                                    Đổi mật khẩu
                                </h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    data-bs-dismiss="modal"
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Mật khẩu cũ
                                    </label>
                                    <input
                                        type="text"
                                        id="old-password"
                                        className="form-control"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="col-form-label">
                                        Mật khẩu mới
                                    </label>
                                    <input
                                        type="text"
                                        id="new-password"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    type="button"
                                    className="btn btn-secondary"
                                    data-bs-dismiss="modal"
                                >
                                    Đóng
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    id="btn-change-password"
                                >
                                    Xác nhận
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserDetail;
