import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { showUser, deleteUser } from "../features/userDetailSlice";
import AddIcon from '@material-ui/icons/Add';

const Read = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    dispatch(showUser());
  }, []);

  const handleDelete = async (id) => {
    await dispatch(deleteUser(id));
    dispatch(showUser());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card card-medium">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h2>User List</h2>
        <Link to="/create" className="btn btn-primary">
          <AddIcon /> Add Report
        </Link>
      </div>
      <div className="card-body">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Issue Date</th>
              <th>Expiry Date</th>
              <th>Type</th>
              <th>User Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.issueDate}</td>
                <td>{user.expiryDate}</td>
                <td>{user.type}</td>
                <td>{user.userName}</td>
                <td>
                  <Link to={`/edit/${user.id}`} className="btn btn-primary">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="btn btn-danger ml-2"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Read;
