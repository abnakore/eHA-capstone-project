import React from "react";

import Aside from "../containers/Aside";
import HealthRecordForm from "../containers/HealthRecordForm";
import { useUser } from "../contexts/userContext";

import { Navigate } from "react-router-dom";

import "./addRecord.css";

function AddRecord() {
  // Get data from context
  const { loading, user, loggedInUser } = useUser();

  // !!! Prevent rendering if user is not loaded yet
  if (loading) {
    return <div>Loading...</div>;
  }

  // Redirect to login if no user
  if (!loading && !loggedInUser) {
    return <Navigate to={"/login"} replace />;
  }

  return (
    <div className="add-record-container page">
      <Aside />
      <div className="content">
        <HealthRecordForm />
      </div>
    </div>
  );
}

export default AddRecord;
