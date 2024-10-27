import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox"; // Adjust this import path as needed
import kid from "assets/images/bluegradient.jpg.png"; // Adjust path if needed
import App from "../../flappy/src/App"; // Path to your Flappy Bird game component

function GamePage() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "center",
        padding: 0,
        margin: 0,
        overflow: "hidden",
        backgroundImage: `url(${kid})`, // Setting the background image on the outer div
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid container spacing={0} style={{ height: "100%", overflow: "hidden" }}>
        {/* Sidebar */}
        <Grid item xs={3} style={{ height: "100%" }}>
          <MDBox
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="100%"
            style={{ padding: "20px" }}
          >
            {/* Sidebar content */}
            <h3>Sidebar Content</h3>
            <p>Additional Links</p>
            <p>Scores</p>
          </MDBox>
        </Grid>

        {/* Game Container */}
        <Grid
          item
          xs={9}
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="95%"
            width="100%" // Keeps the game container full width
            overflow="hidden"
            style={{ marginLeft: "-70px" }} // Adjust this value to pull closer to the sidebar
          >
            <App /> {/* Embedding the Flappy Bird game component */}
          </MDBox>
        </Grid>
      </Grid>
    </div>
  );
}

export default GamePage;
