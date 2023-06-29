import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../features/userDetailSlice";
import * as Yup from "yup";

const Create = () => {
  const [user, setUser] = useState({
    name: "",
    issueDate: "",
    expiryDate: "",
    type: "",
    userName: ""
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    issueDate: Yup.date().required("Issue Date is required"),
    expiryDate: Yup.date()
      .min(Yup.ref("issueDate"), "Expiry Date must be later than Issue Date")
      .required("Expiry Date is required"),
    type: Yup.string().required("Type is required"),
    userName: Yup.string().required("User Name is required"),
  });

  const [errors, setErrors] = useState({});

  const handleChange = async (e) => {
    const { name, value } = e.target;

    try {
      await Yup.reach(validationSchema, name).validate(value);
      setErrors({ ...errors, [name]: "" });
    } catch (err) {
      setErrors({ ...errors, [name]: err.message });
    }

    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(user, { abortEarly: false });

      // Generate ID
      const id = Date.now().toString();

      // Create user object with generated ID
      const newUser = { ...user, id };

      dispatch(createUser(newUser));
      navigate("/read");
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <div className="card card-medium">
      <h2 className="card-header">Fill the data</h2>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="form-control"
              value={user.name}
              onChange={handleChange}
            />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="issueDate" className="form-label">
              Issue Date
            </label>
            <input
              type="date"
              name="issueDate"
              className="form-control"
              value={user.issueDate}
              onChange={handleChange}
            />
            {errors.issueDate && <div className="text-danger">{errors.issueDate}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="expiryDate" className="form-label">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              className="form-control"
              value={user.expiryDate}
              onChange={handleChange}
            />
            {errors.expiryDate && <div className="text-danger">{errors.expiryDate}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="type" className="form-label">
              Type
            </label>
            <select
              name="type"
              className="form-control"
              value={user.type}
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Certificate 1">Certificate 1</option>
              <option value="Certificate 2">Certificate 2</option>
              <option value="Certificate 3">Certificate 3</option>
              <option value="Certificate 4">Certificate 4</option>
              <option value="Certificate 5">Certificate 5</option>
              <option value="License 1">License 1</option>
              <option value="License 2">License 2</option>
              <option value="License 3">License 3</option>
              <option value="License 4">License 4</option>
              <option value="License 5">License 5</option>
            </select>
            {errors.type && <div className="text-danger">{errors.type}</div>}
          </div>
          <div className="mb-3">
            <label htmlFor="userName" className="form-label">
              User Name
            </label>
            <input
              type="text"
              name="userName"
              className="form-control"
              value={user.userName}
              onChange={handleChange}
            />
            {errors.userName && <div className="text-danger">{errors.userName}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Create;
