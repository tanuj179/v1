import React from "react";
import { useSelector } from "react-redux";
import "./CustomModal.css";

const CustomModal = ({ id, setShowPopup }) => {
  const allUsers = useSelector((state) => state.app.users);

  const singleUser = allUsers.find((user) => user.id === id);
  console.log("singleUser", singleUser);

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button onClick={() => setShowPopup(false)}>Close</button>
        <h2>{singleUser.name}</h2>
        <h3>{singleUser.username}</h3>
        <p>Issue Date: {singleUser.issueDate}</p>
        <p>Expiry Date: {singleUser.expiryDate}</p>
        <p>Type: {singleUser.type}</p>
      </div>
    </div>
  );
};

export default CustomModal;
