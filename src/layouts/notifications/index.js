import React, { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAlert from "components/MDAlert"; // Import the updated MDAlert component

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

function Modules() {
  const [expandedAlert, setExpandedAlert] = useState(null);

  const handleAlertClick = (name) => {
    setExpandedAlert((prev) => (prev === name ? null : name));
  };

  const alertContent = (name) => {
    if (name === "Understanding your Anatomy" && expandedAlert === name) {
      // YouTube Thumbnail Embed for "primary" alert when expanded
      return (
        <div
          style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}
        >
          <iframe
            width="560" // Adjust width for better display
            height="315" // Adjust height proportionally
            src="https://www.youtube.com/embed/wTNVYIySAME"
            title="YouTube video player"
            frameBorder="0"
            style={{ borderRadius: "10px" }} // Optional: Add slight rounded corners
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    return (
      <MDTypography variant="body2" color="white" style={{ fontSize: "14px" }}>
        {expandedAlert === name ? (
          <>
            <strong>{name} Module:</strong> This module contains detailed information about {name}.
            You can click the box again to collapse it.
          </>
        ) : (
          <>
            {name} module. <br /> Click to expand and learn more.
          </>
        )}
      </MDTypography>
    );
  };

  return (
    <DashboardLayout>
      <MDBox mt={6} mb={3}>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} lg={8}>
            <Card>
              <MDBox p={2}>
                <MDTypography variant="h5">Modules</MDTypography>
              </MDBox>
              <MDBox pt={2} px={2}>
                {[
                  "Understanding your Anatomy",
                  "Consent and Boundaries",
                  "Pregnancy and Contraceptives",
                  "STDs",
                  "Reprodutive Health & Fertiliy",
                  "Sexual Orientation and Gender Identities",
                  "Staying safe IRL & Online",
                  "Navigating Peer Pressure",
                ].map((name) => (
                  <MDAlert
                    key={name}
                    moduleName={name} // Pass the module name
                    dismissible
                    onClick={() => handleAlertClick(name)}
                    style={{
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      height: expandedAlert === name ? "auto" : "50px", // Expands on click
                    }}
                  >
                    {alertContent(name)}
                  </MDAlert>
                ))}
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
    </DashboardLayout>
  );
}

export default Modules;
