import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ChatIcon from "@mui/icons-material/Chat";
import "./App.css";
import MDBox from "components/MDBox";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import theme from "assets/theme";
import themeDark from "assets/theme-dark";
import routes from "routes";
import { useMaterialUIController, setMiniSidenav, setOpenConfigurator } from "context";
import brandWhite from "assets/images/logo-ct.png";
import brandDark from "assets/images/logo-ct-dark.png";

const symbols = ["🤝", "🍒", "💬"];

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];
const getRandomPosition = (width, height) => ({
  x: Math.random() * width,
  y: Math.random() * height,
});

export default function App() {
  const [controller, dispatch] = useMaterialUIController();
  const {
    miniSidenav,
    layout,
    openConfigurator,
    sidenavColor,
    transparentSidenav,
    whiteSidenav,
    darkMode,
  } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const { pathname } = useLocation();

  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) return getRoutes(route.collapse);
      if (route.route)
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      return null;
    });

  useEffect(() => {
    const canvas = document.getElementById("emojiCanvas");
    const ctx = canvas.getContext("2d");
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = window.innerHeight);
    const symbolCount = 30;

    const symbolsData = Array.from({ length: symbolCount }, () => ({
      symbol: getRandomSymbol(),
      ...getRandomPosition(width, height),
      speed: Math.random() * 1,
      direction: Math.random() < 0.5 ? 1 : -1,
    }));

    const drawSymbols = () => {
      ctx.clearRect(0, 0, width, height);

      symbolsData.forEach((s) => {
        ctx.font = "30px Arial";
        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        ctx.fillText(s.symbol, s.x, s.y);
        s.y += s.speed * s.direction;

        if (s.y < 0 || s.y > height) {
          s.y = s.direction === 1 ? 0 : height;
          s.x = getRandomPosition(width, height).x;
        }
      });

      requestAnimationFrame(drawSymbols);
    };

    drawSymbols();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const configsButton = pathname !== "/dashboard" && (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99} // Ensures the button appears above the canvas
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={() => (window.location.href = "/dashboard")}
    >
      <ChatIcon fontSize="small" color="inherit" />
    </MDBox>
  );

  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName="Material Dashboard 2"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {configsButton}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {/* Redirect root path to /authentication/sign-in */}
        <Route path="/" element={<Navigate to="/authentication/sign-in" replace />} />

        {/* Render all routes */}
        {getRoutes(routes)}

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
      <canvas
        id="emojiCanvas"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1, // Ensures the canvas stays in the background
          background: "linear-gradient(135deg, #9c27b0, #2196f3)", // Gradient background
        }}
      />
    </ThemeProvider>
  );
}
