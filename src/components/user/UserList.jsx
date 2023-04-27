import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
let defaultData = [];

function UserList() {
    const [filterUsers, setfilterUsers] = useState([]);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const newFilter = filterUsers.filter((user, index) => {
            return user.name.toLowerCase().includes(searchValue);
        });
        setfilterUsers(newFilter);
        if (searchValue == "") {
            setfilterUsers(defaultData);
        }
    }, [searchValue]);

    useEffect(() => {
        fetch("http://localhost:8080/api/v1/users")
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                defaultData = json;
                setfilterUsers(json);
            });
    }, []);

    return (
        <>
            <div className="container mt-5 mb-5">
                <h2 className="text-center text-uppercase">Danh sách user</h2>

                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="d-flex justify-content-between align-items-center mt-5 mb-4">
                            <Link to="create" className="btn btn-warning">
                                {" "}
                                Tạo user{" "}
                            </Link>
                            <input
                                type="text"
                                id="search"
                                className="form-control w-50"
                                placeholder="Tìm kiếm user"
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                        </div>

                        <div className="bg-light p-4">
                            <table className="table table-hover">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filterUsers.map((user, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.address}</td>
                                            <td>
                                                <Link
                                                    to={"/" + user.id}
                                                    className="btn btn-success"
                                                >
                                                    Xem chi tiết
                                                </Link>
                                                <button className="btn btn-danger">
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="message d-none"></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default UserList;
