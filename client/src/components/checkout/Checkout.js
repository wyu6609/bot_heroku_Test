import * as React from "react";
import { useState, useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AddressForm from "./AddressForm";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useHistory } from "react-router-dom";

import { toast } from "react-toastify";
const steps = ["Shipping address", "Payment details", "Review your order"];

const theme = createTheme({
  typography: {
    fontFamily: ["Press Start 2P", "cursive"].join(","),
  },
});

export default function Checkout({ cartTotal, userCart, user }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [addLine1, setAddLine1] = useState("");
  const [addLine2, setAddLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expDate, setExpDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [cartBots, setCartBots] = useState([]);
  let orderNumber = Math.floor(1000000 + Math.random() * 9000000);

  useEffect(() => {
    fetch("/user_items")
      .then((r) => r.json())
      .then((userItems) => {
        setCartBots(userItems);
      });
  }, []);

  const handleClearCart = () => {
    let userBots = cartBots.filter((cartBot) => cartBot.user_id === user.id);
    console.log(userBots);
    let newArr = [];
    userBots.map((el) => newArr.push(el.id));
    console.log(newArr);
    newArr.map((id) => {
      fetch(`/user_items/${id}`, {
        method: "DELETE",
      }).then(() => {
        console.log(`${id} deleted`);
      });
    });
  };

  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <AddressForm
            setFirstName={setFirstName}
            setLastName={setLastName}
            setAddLine1={setAddLine1}
            setAddLine2={setAddLine2}
            setCity={setCity}
            setState={setState}
            setZip={setZip}
            setCountry={setCountry}
          />
        );
      case 1:
        return (
          <PaymentForm
            setCardName={setCardName}
            setCardNumber={setCardNumber}
            setExpDate={setExpDate}
            setCvv={setCvv}
          />
        );
      case 2:
        return (
          <Review
            firstName={firstName}
            lastName={lastName}
            addLine1={addLine1}
            addLine2={addLine2}
            city={city}
            state={state}
            zip={zip}
            country={country}
            cardName={cardName}
            cardNumber={cardNumber}
            expDate={expDate}
            cvv={cvv}
            cartTotal={cartTotal}
            userCart={userCart}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }
  const history = useHistory();
  const checkOutSuccessSound = () => {
    let checkOutAudio = new Audio("/sounds/purchased-sound.mp3");
    checkOutAudio.play();
  };
  const [activeStep, setActiveStep] = React.useState(0);
  if (activeStep === steps.length) {
    handleClearCart();
    checkOutSuccessSound();
    setTimeout(() => {
      history.push("/market");
    }, "5000");
    toast.success("thanks you for your purchase, rerouting back to market...", {
      theme: "colored",
      position: "top-center",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            BOT.IO
          </Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #{orderNumber}. We have emailed your
                  order confirmation, and will send you an update when your
                  order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                  <IconButton
                    onClick={() => {
                      history.push("/cart");
                    }}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    <ShoppingCartIcon color="primary" />
                  </IconButton>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}

                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    {activeStep === steps.length - 1 ? "Place order" : "Next"}
                  </Button>
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
