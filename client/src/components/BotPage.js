import React from "react";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import StarIcon from "@mui/icons-material/StarBorder";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import AddShoppingCartRoundedIcon from "@mui/icons-material/AddShoppingCartRounded";
import IconButton from "@mui/material/IconButton";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReviewDrawer from "./ReviewDrawerComponents/ReviewDrawer";
import AverageBotRating from "./ReviewDrawerComponents/AverageBotRating";
const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

//get all the reviews for this bot
// includes user name fo reach bo
function BotPage({ bot, user }) {
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState("");
  const [userReview, setUserReview] = useState("");

  useEffect(() => {
    fetch(`/products/${bot.id}`)
      .then((r) => r.json())
      .then((products) => {
        setReviews(products.reviews);
      });
  }, []);

  useEffect(() => {
    let average =
      reviews.reduce((total, next) => total + next.rating, 0) / reviews.length;

    let roundedAverage = Math.round(average / 0.5) * 0.5;

    setAverageRating(roundedAverage);
  }, [reviews]);

  const tiers = [bot];

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="large"
        component="main"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography
          component="h2"
          variant="h2"
          align="center"
          color="#3794ff"
          gutterBottom
        >
          {bot.title}
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          {bot.description}
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="xs" component="main">
        <Grid container item alignItems="center" justifyContent="center">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid alignItems="center">
              <Card>
                <CardHeader
                  title={`Eth${tier.price}`}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={tier.title === "Pro" ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    color: "#01bfa5",
                    backgroundColor: (theme) =>
                      theme.palette.mode === "light"
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: "2%",
                    }}
                    image={bot.image}
                    alt="random"
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  ></Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "baseline",
                      mb: 2,
                    }}
                  >
                    <Typography
                      component="p"
                      variant="h5"
                      color="#fd5d77"
                      align="center"
                    >
                      {bot.category.name}
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  <IconButton sx={{ color: "#3794ff" }}>
                    <AddShoppingCartRoundedIcon size="large" />
                  </IconButton>
                  <AverageBotRating value={averageRating} />
                  <ReviewDrawer
                    bot_id={bot.id}
                    user_id={user.id}
                    reviews={reviews}
                    setReviews={setReviews}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly"></Grid>
      </Container>

      {/* End footer */}
    </ThemeProvider>
  );
}

export default BotPage;
