// src/components/LandingPage.jsx

import React from "react";
import { Typography, Button, Box, Grid, Paper } from "@mui/material";
import { styled, keyframes } from "@mui/material/styles";
import { Link } from "react-router-dom";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import ChatIcon from "@mui/icons-material/Chat";

// Define keyframes for animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Styled Components
const Container = styled(Box)(({ theme }) => ({
  minHeight: "100vh",
  backgroundImage: `url('/assets/images/gradientbg.png)`, // Path to your background image
  backgroundSize: "cover", // Ensures the image covers the entire container
  backgroundPosition: "center", // Centers the image
  backgroundRepeat: "no-repeat", // Prevents the image from repeating
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(4),
  position: "relative",
  color: "#fff", // Sets default text color to white for better contrast
  // Optional: Add a dark overlay for better text readability
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the opacity as needed
    zIndex: 1,
  },
}));

const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2, // Ensures content is above the overlay
  textAlign: "center",
}));

const Header = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  fontWeight: "700",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  color: "#F8EDDD", // Lighter shade for better contrast
  animation: `${fadeInUp} 1s ease forwards`,
}));

const SubHeader = styled(Typography)(({ theme }) => ({
  fontSize: "1.2rem",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  color: "#F8EDDD", // Slightly lighter than before
  animation: `${fadeInUp} 1s ease forwards`,
  animationDelay: "0.3s",
  opacity: 0,
}));

const FeaturesGrid = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(4),
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: "center",
  color: "#fff",
  borderRadius: "12px",
  backgroundColor: "rgba(255, 255, 255, 0.1)", // Semi-transparent background
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
  transition: "transform 0.3s, box-shadow 0.3s",
  animation: `${fadeInUp} 1s ease forwards`,
  animationDelay: "0.6s",
  opacity: 0,
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
  },
}));

const FeatureIcon = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  color: "#cc0033",
}));

const CallToAction = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(6),
  padding: theme.spacing(1.5, 4),
  fontSize: "1rem",
  backgroundColor: "#cc0033",
  color: "#f5f5f5", // Lighter button text color for readability
  borderRadius: "30px",
  transition: "background-color 0.3s",
  "&:hover": {
    backgroundColor: "#a3002f",
  },
  animation: `${fadeInUp} 1s ease forwards`,
  animationDelay: "0.9s",
  opacity: 0,
}));

const LandingPage = () => {
  return (
    <Container>
      <Content>
        <Header>Welcome to SafeSpace</Header>
        <SubHeader>Your one-stop hub for sexual education and reproductive health.</SubHeader>
        <FeaturesGrid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <SportsEsportsIcon style={{ fontSize: 50 }} />
              </FeatureIcon>
              <Typography variant="h6" gutterBottom>
                Interactive Retro Arcade Games
              </Typography>
              <Typography variant="body2" color="inherit">
                Learn about sexual health in a fun and engaging way through our custom retro-style
                games.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <ChatIcon style={{ fontSize: 50 }} />
              </FeatureIcon>
              <Typography variant="h6" gutterBottom>
                AI-Powered Chatbot
              </Typography>
              <Typography variant="body2" color="inherit">
                Get instant answers to your questions about sexual education and reproductive
                health.
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <FeatureCard>
              <FeatureIcon>
                <EmojiObjectsIcon style={{ fontSize: 50 }} />
              </FeatureIcon>
              <Typography variant="h6" gutterBottom>
                Live Chats with Counselors
              </Typography>
              <Typography variant="body2" color="inherit">
                Connect with professional counselors to discuss and learn more about sexual health.
              </Typography>
            </FeatureCard>
          </Grid>
        </FeaturesGrid>
        <CallToAction variant="contained" component={Link} to="/notifications">
          Get Started
        </CallToAction>
      </Content>
    </Container>
  );
};

export default LandingPage;
