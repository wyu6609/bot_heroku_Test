import React from "react";
import { useState, useEffect } from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import DataList from "./DataList";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

//get all the reviews for this bot
// includes user name fo reach bo
function Cart({ bot, user, botList }) {
  const [cartList, setCartList] = useState([]);
  const [allCartItems, setAllCartItems] = useState([]);
  const [cartBots, setCartBots] = useState([]);
  //get request for current User's shopping cart
  useEffect(() => {
    fetch("/user_items")
      .then((r) => r.json())
      .then((userItems) => {
        setAllCartItems(userItems);
        // let filteredUserItem = userItems.filter((el) => el.user_id == user.id);

        // let filteredUserItem1 = getProductIds(filteredUserItem);
        // setCartList(filteredUserItem1);
        setCartList(
          getProductIds(userItems.filter((el) => el.user_id == user.id))
        );
      });
  }, []);
  console.log(allCartItems);
  console.log(cartList);
  function getProductIds(objArr) {
    let newArr = [];
    objArr.map((el) => newArr.push(el.product_id));
    return newArr;
  }

  const handleDeleteCartItem = (bot_id) => {
    // console.log(allCartItems);
    // console.log(newArr);
    // console.log(bot_id);
    // console.log(user.id);
    const selectedCartItem = allCartItems.filter((element) => {
      return element.user_id === user.id && element.product_id === bot_id;
    });

    const cartItemId = selectedCartItem[0].id;
    console.log(cartItemId);
    fetch(`/user_items/${cartItemId}`, {
      method: "DELETE",
    }).then(() => {
      window.location.reload();
      // props.setReviews(props.reviews.filter((el) => el.id !== cartItemId));
    });
  };
  const newArr = botList.filter((item) => {
    return cartList.includes(item.id);
  });

  function cartTotal() {}
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />

      <Container
        disableGutters
        maxWidth="large"
        component="main"
        sx={{ pt: 4, pb: 4 }}
      >
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="#3794ff"
          gutterBottom
        >
          your items
        </Typography>
        <Grid align="center" sx={{ mt: 9 }}>
          <DataList
            botCartList={newArr}
            handleDeleteCartItem={handleDeleteCartItem}
          />
        </Grid>
      </Container>

      <Container maxWidth="large" component="main"></Container>
      {/* Footer */}
      <Container
        maxWidth="large"
        component="footer"
        sx={{
          py: [3, 6],
        }}
      >
        <Grid container item justifyContent="center">
          Total: Eth 0
        </Grid>
        <Grid container item justifyContent="center" sx={{ mt: 2 }}>
          <Button variant="contained">Checkout</Button>
        </Grid>
      </Container>
      <Container
        sx={{
          mt: 22,
        }}
      ></Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
export default Cart;
