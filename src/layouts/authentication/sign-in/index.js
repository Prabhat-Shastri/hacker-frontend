import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Hardcoded emails and passwords for counselor and student
  const counselorEmail = "counselor@example.com";
  const studentEmail = "student@example.com";
  const hardcodedPassword = "password123";

  const handleSignIn = (e) => {
    e.preventDefault();

    if (email === counselorEmail && password === hardcodedPassword) {
      alert("Counselor authentication successful!");
      localStorage.setItem("role", "Counselor");
      localStorage.setItem("clientId", "1234"); // Store counselor ID
      navigate("/websocket"); // Redirect to WebSocket chat
    } else if (email === studentEmail && password === hardcodedPassword) {
      alert("Student authentication successful!");
      localStorage.setItem("role", "Student");
      localStorage.setItem("clientId", "5678"); // Store student ID (use any value except 1234)
      navigate("/websocket"); // Redirect to WebSocket chat
    } else {
      alert("Invalid email or password. Please try again.");
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign In
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSignIn}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Login;
