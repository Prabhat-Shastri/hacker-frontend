import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import WebSocketChat from "../../websocket"; // Import WebSocketChat component

function WebSocketPage() {
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
              <WebSocketChat /> {/* Use WebSocketChat component */}
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default WebSocketPage;
