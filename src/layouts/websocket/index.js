import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import WebSocketChat from "../../websocket"; // Import WebSocketChat component

function WebSocketPage() {
  const [showStartMessage, setShowStartMessage] = useState(true);

  // Hide the start message after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowStartMessage(false);
    }, 5000); // 5000 ms = 5 seconds

    // Cleanup the timeout on component unmount
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <DashboardLayout>
      <MDBox
        height="100vh"
        display="flex"
        alignItems="stretch"
        justifyContent="center"
        p={0}
        m={0}
        overflow="hidden"
      >
        <Grid container spacing={0} style={{ height: "100%", overflow: "hidden" }}>
          <Grid item xs={12} style={{ height: "100%" }}>
            <MDBox
              display="flex"
              alignItems="center"
              justifyContent="center"
              height="calc(100% - 43px)" /* Slightly reduce height */
              width="100%"
              overflow="hidden"
              style={{ marginBottom: "30px" }} /* Adds a bit of space below */
            >
              {/* Conditionally render the start message */}
              {showStartMessage && (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    position: "absolute",
                    top: "20px",
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "18px",
                  }}
                >
                  Your chat has started
                </MDBox>
              )}
              {/* WebSocketChat Component */}
              <WebSocketChat /> {/* Use WebSocketChat component */}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default WebSocketPage;
