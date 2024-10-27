// index.js (Dashboard Component)
import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Chatbot from "../../chatbot/Chatbot";

// Import the background image
import backgroundImage from "assets/images/bluegradient.jpg.png"; // Adjust path to your image

function Dashboard() {
  return (
    <DashboardLayout>
      <MDBox
        // height="100vh"
        display="flex"
        alignItems="stretch"
        justifyContent="center"
        p={0}
        m={0}
        overflow="hidden"
        style={{
          // backgroundImage: `url(${backgroundImage})`, // Uncomment if needed
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container spacing={0} style={{ height: "100%", overflow: "hidden" }}>
          <Grid item xs={12} style={{ height: "100%" }}>
            <MDBox
              display="flex"
              flexDirection="column" // Ensure column direction for flex
              height="100%"
              overflow="hidden"
              style={{
                marginBottom: "30px",
                backgroundColor: "#00000000", // Transparent background for chatbot container
              }}
            >
              <Chatbot />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
