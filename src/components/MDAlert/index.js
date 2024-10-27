import { useState } from "react";

// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Fade from "@mui/material/Fade";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Custom styles for the MDAlert
import MDAlertRoot from "components/MDAlert/MDAlertRoot";
import MDAlertCloseIcon from "components/MDAlert/MDAlertCloseIcon";

// Color map for each module
const moduleColorMap = {
  "Understanding your Anatomy": "primary",
  "Consent and Boundaries": "secondary",
  "Pregnancy and Contraceptives": "success",
  STDs: "error",
  "Reprodutive Health & Fertiliy": "warning",
  "Sexual Orientation and Gender Identities": "info",
  "Staying safe IRL & Online": "light",
  "Navigating Peer Pressure": "dark",
};

function MDAlert({ moduleName, dismissible, children, ...rest }) {
  const [alertStatus, setAlertStatus] = useState("mount");

  const handleAlertStatus = () => setAlertStatus("fadeOut");

  // Get color for the module name
  const color = moduleColorMap[moduleName] || "info"; // Fallback to "info" if no match

  // The base template for the alert
  const alertTemplate = (mount = true) => (
    <Fade in={mount} timeout={300}>
      <MDAlertRoot ownerState={{ color }} {...rest}>
        <MDBox display="flex" alignItems="center" color="white">
          {children}
        </MDBox>
        {dismissible ? (
          <MDAlertCloseIcon onClick={mount ? handleAlertStatus : null}>&times;</MDAlertCloseIcon>
        ) : null}
      </MDAlertRoot>
    </Fade>
  );

  switch (true) {
    case alertStatus === "mount":
      return alertTemplate();
    case alertStatus === "fadeOut":
      setTimeout(() => setAlertStatus("unmount"), 400);
      return alertTemplate(false);
    default:
      alertTemplate();
      break;
  }

  return null;
}

// Setting default values for the props of MDAlert
MDAlert.defaultProps = {
  dismissible: false,
};

// Typechecking props of the MDAlert
MDAlert.propTypes = {
  moduleName: PropTypes.oneOf([
    "Understanding your Anatomy",
    "Consent and Boundaries",
    "Pregnancy and Contraceptives",
    "STDs",
    "Reprodutive Health & Fertiliy",
    "Sexual Orientation and Gender Identities",
    "Staying safe IRL & Online",
    "Navigating Peer Pressure",
  ]).isRequired, // moduleName is now required
  dismissible: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default MDAlert;
