import React from "react";
import { useUser } from "../contexts/userContext";
import { Navigate } from "react-router-dom";
import Aside from "../containers/Aside";
import TimelineContainer from "../containers/TimelineContainer";

function Timeline() {
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
    <div className="timeline-container page">
      <Aside />
      <div className="content">
        <TimelineContainer />
      </div>
    </div>
  );
}

export default Timeline;
