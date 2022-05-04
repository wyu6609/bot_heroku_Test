import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import "./Market.css";
import Card from "@mui/material/Card";
import Avatar from "@mui/material/Avatar";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactPaginate from "react-paginate";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";

import CategoryMenu from "../components/CategoryMenu";
import { useHistory } from "react-router-dom";

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

function Market({ bot, setBot }) {
  const history = useHistory();
  const options = [
    "All",
    "Pre-Programmed",
    "Humanoid",
    "Autonomous",
    "Teleoperated",
    "Augmenting",
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [botList, setBotList] = useState([]);

  useEffect(() => {
    fetch("/products")
      .then((r) => r.json())
      .then((products) => {
        setBotList(products);
      });
  }, []);

  const [pageNumber, setPageNumber] = useState(0);
  const botsPerPage = 12;
  const pagesVisited = pageNumber * botsPerPage;
  const pageChangeSound = () => {
    let pageChangeAudio = new Audio("/sounds/page-change-sound.mp3");
    pageChangeAudio.play();
  };
  const [filteredBotList, setFilteredBotList] = useState(botList);
  useEffect(() => {
    filterHandler();
  }, [botList, selectedIndex]);

  const filterHandler = () => {
    switch (selectedIndex) {
      case 1:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Pre-Programmed")
        );
        break;
      case 2:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Humanoid")
        );
        break;
      case 3:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Autonomous")
        );
        break;
      case 4:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Teleoperated")
        );
        break;
      case 5:
        setFilteredBotList(
          botList.filter((bot) => bot.category.name === "Augmenting")
        );
        break;
      default:
        setFilteredBotList(botList);
        break;
    }
  };

  const displayBots = filteredBotList.slice(
    pagesVisited,
    pagesVisited + botsPerPage
  );

  const pageCount = Math.ceil(filteredBotList.length / botsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  const clickCardHandler = (bot) => {
    setBot(bot);
    history.push("/bot");
  };

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <main>
          {/* Hero unit */}

          <Box
            sx={{
              bgcolor: "background.paper",
              pt: 8,
              pb: 6,
            }}
          >
            <Container maxWidth="sm">
              <Typography
                className="market-header"
                component="h1"
                variant="h2"
                align="center"
                color="
              #3794ff"
                gutterBottom
              >
                market
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="text.secondary"
                paragraph
              >
                buy a bot
              </Typography>
            </Container>
          </Box>
          <Container sx={{ pb: 5 }} maxWidth="medium">
            {/* End hero unit */}

            <div className="bot-grid">
              <CategoryMenu
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
                options={options}
              />
            </div>
            <Grid container spacing={2}>
              {displayBots.map((bot) => (
                <Grid item key={bot} xs={12} sm={6} md={3}>
                  <Card
                    onClick={() => {
                      clickCardHandler(bot);
                      pageChangeSound();
                    }}
                    className="fancy_card"
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        // 16:9
                        pt: "5%",
                      }}
                      image={bot.image}
                      alt="random"
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        align="center"
                        gutterBottom
                        variant="h5"
                        component="h2"
                        sx={{ color: "#3794ff" }}
                      >
                        {bot.title}
                      </Typography>
                      <Typography align="center" component="h3">
                        {bot.description}
                      </Typography>
                    </CardContent>
                    <Typography
                      sx={{ color: "#fd5d77" }}
                      size="small"
                      component="p"
                      align="center"
                    >
                      {bot.category.name}
                    </Typography>
                    <CardActions>
                      <IconButton size="small" sx={{ color: "#3794ff" }}>
                        <AddShoppingCartRoundedIcon />
                      </IconButton>

                      <Typography
                        sx={{
                          mx: "auto",
                        }}
                        align="right"
                        color="#47c758"
                      >
                        ETH{bot.price}
                      </Typography>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
        <ReactPaginate
          onClick={() => {
            pageChangeSound();
          }}
          previousLabel={
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8.4 34.3z"></path>
            </svg>
          }
          nextLabel={
            <svg
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              viewBox="0 0 448 512"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"></path>
            </svg>
          }
          breakLabel={
            <svg
              stroke="currentColor"
              fill="none"
              stroke-width="0"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M5 15C6.65685 15 8 13.6569 8 12C8 10.3431 6.65685 9 5 9C3.34315 9 2 10.3431 2 12C2 13.6569 3.34315 15 5 15ZM5 13C5.55228 13 6 12.5523 6 12C6 11.4477 5.55228 11 5 11C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15ZM12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                fill="currentColor"
              ></path>
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22 12C22 13.6569 20.6569 15 19 15C17.3431 15 16 13.6569 16 12C16 10.3431 17.3431 9 19 9C20.6569 9 22 10.3431 22 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z"
                fill="currentColor"
              ></path>
            </svg>
          }
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"paginationBttns"}
          previousLinkClassName={"previousBttn"}
          nextLinkClassName={"nextBttn"}
          disabledClassName={"paginationDisabled"}
          activeClassName={"paginationActive"}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </ThemeProvider>
    </>
  );
}
export default Market;
