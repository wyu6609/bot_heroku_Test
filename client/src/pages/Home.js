import { React, useState, useEffect } from "react";
import "./Home.css";
import CssBaseline from "@mui/material/CssBaseline";
const Home = ({ botList }) => {
  let imgBots = botList.map((bot) => {
    return <img className="bot-image floating pulse " src={bot.image} />;
  });
  return (
    <>
      <CssBaseline />

      <div id="container">
        <h1 className="home-header ">BOT.IO</h1>
        <p className="home-p vibrate-3">check the bot market!</p>
        <div className="photobanner">{imgBots}</div>
      </div>
    </>
  );
};

export default Home;
