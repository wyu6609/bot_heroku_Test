import * as React from "react";
import "./NavBar.css";
import { Link } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Typewriter from "typewriter-effect";
import IconButton from "@mui/material/IconButton";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import LocalConvenienceStoreOutlinedIcon from "@mui/icons-material/LocalConvenienceStoreOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function NavBar({ setUser, user, marketBlink, setMarketBlink }) {
  const logoutSound = () => {
    let logoutAudio = new Audio("/sounds/logout-sound.mp3");
    logoutAudio.play();
  };
  const checkOutSound = () => {
    let checkOutAudio = new Audio("/sounds/checkout-sound.mp3");
    checkOutAudio.play();
  };
  const marketSound = () => {
    let marketAudio = new Audio("/sounds/market-sound.mp3");
    marketAudio.play();
  };
  const homeSound = () => {
    let homeAudio = new Audio("/sounds/home-sound.mp3");
    homeAudio.play();
  };
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        logoutSound();
        setUser(null);
        // window.location.reload(false);
      }
    });
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            as={Link}
            to="/"
            onClick={() => {
              homeSound();
              setMarketBlink(true);
            }}
          >
            <SmartToyOutlinedIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <IconButton
              className={marketBlink ? "blink-1" : ""}
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              as={Link}
              to="/market"
              onClick={() => {
                marketSound();
                setMarketBlink(false);
              }}
            >
              <LocalConvenienceStoreOutlinedIcon />
            </IconButton>
          </Typography>
          <Typewriter
            options={{
              autoStart: true,
              loop: true,
            }}
            onInit={(typewriter) => {
              typewriter
                .typeString(`welcome ${user.first_name}!`)
                .pauseFor(10000)
                .deleteAll()
                .typeString(`username: ${user.username}`)
                .pauseFor(10000)

                .start();
            }}
          />
          <IconButton
            color="inherit"
            className={marketBlink ? "" : "blink-1"}
            as={Link}
            to="/checkout"
            onClick={() => {
              checkOutSound();
              setMarketBlink(true);
            }}
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
          <IconButton color="inherit" onClick={handleLogoutClick}>
            <LogoutOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
