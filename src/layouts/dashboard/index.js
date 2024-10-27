import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Chatbot from "../../chatbot/Chatbot";

// Import the background image
import backgroundImage from "assets/images/bluegradient.jpg.png"; // Adjust path to your image

function Dashboard() {
  const [showWelcome, setShowWelcome] = useState(true);

  // Function to handle the first user input, hiding the welcome message
  const handleFirstInput = () => {
    setShowWelcome(false);
  };

  // Auto-hide the welcome message after 5 seconds
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowWelcome(false);
    }, 5000); // 5000 ms = 5 seconds

    // Clear the timeout if the user sends a message before 5 seconds
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <DashboardLayout>
      <MDBox
        display="flex"
        alignItems="stretch"
        justifyContent="center"
        p={0}
        m={0}
        overflow="hidden"
        style={{
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Grid container spacing={0} style={{ height: "100%", overflow: "hidden" }}>
          <Grid item xs={12} style={{ height: "100%" }}>
            <MDBox
              display="flex"
              flexDirection="column"
              height="100%"
              overflow="hidden"
              style={{
                marginBottom: "30px",
                backgroundColor: "#00000000",
              }}
            >
              {/* Conditionally render the centered welcome message */}
              {showWelcome && (
                <MDBox
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)", // Center the element
                    backgroundColor: "rgba(0, 0, 0, 0.7)",
                    color: "white",
                    padding: "10px 20px",
                    borderRadius: "10px",
                    fontSize: "18px",
                  }}
                >
                  Welcome to Safe Space
                </MDBox>
              )}

              {/* Chatbot Component with first input handler */}
              <Chatbot onFirstInput={handleFirstInput} />
            </MDBox>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Dashboard;
