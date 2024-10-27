import React from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import CardMatchingGame from "../../game/CardMatchingGame"; // Adjust path if needed
//import kid from "assets/images/bluegradient.jpg.png"; // Importing the local image

function Game() {
  return (
    <MDBox
      height="100vh"
      display="flex"
      alignItems="stretch"
      justifyContent="center"
      p={0}
      m={0}
      overflow="hidden"
      style={{
        //backgroundImage: `url(${kid})`, // Using the imported image
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Grid container spacing={0} style={{ height: "100%", overflow: "hidden" }}>
        <Grid item xs={12} style={{ height: "100%" }}>
          <MDBox
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="calc(100% - 45px)" /* Slightly reduce height */
            width="100%"
            overflow="hidden"
            style={{ marginBottom: "30px" }} /* Adds a bit of space below */
          >
            <CardMatchingGame />
          </MDBox>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default Game;
