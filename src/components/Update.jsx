// Update.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { updateUser } from "../features/userDetailSlice";

const Update = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [updateData, setUpdateData] = useState({});

  const { users, loading } = useSelector((state) => state.app);

  useEffect(() => {
    if (id) {
      const singleUser = users.find((ele) => ele.id === id); // Use find instead of filter
      setUpdateData(singleUser);
    }
  }, [id, users]);

  const newData = (e) => {
    setUpdateData({ ...updateData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(updateUser(updateData));
    navigate("/read");
  };

  return (
    <div>
      <h2 className="my-2">Edit the data</h2>
      <form className="w-50 mx-auto my-5" onSubmit={handleUpdate}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={updateData && updateData.name}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Issue Date</label>
          <input
            type="date"
            name="issueDate"
            className="form-control"
            value={updateData && updateData.issueDate}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Expiry Date</label>
          <input
            type="date"
            name="expiryDate"
            className="form-control"
            value={updateData && updateData.expiryDate}
            onChange={newData}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select
            name="type"
            className="form-select"
            value={updateData && updateData.type}
            onChange={newData}
          >
            <optgroup label="Certificate">
              <option value="1">Certificate 1</option>
              <option value="2">Certificate 2</option>
              <option value="3">Certificate 3</option>
              <option value="4">Certificate 4</option>
              <option value="5">Certificate 5</option>
            </optgroup>
            <optgroup label="License">
              <option value="1">License 1</option>
              <option value="2">License 2</option>
              <option value="3">License 3</option>
              <option value="4">License 4</option>
              <option value="5">License 5</option>
            </optgroup>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={updateData && updateData.username}
            onChange={newData}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default Update;
