import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Login from "../pages/Login";
import Home from "../pages/Home";
import NavBar from "./NavBar";
import Market from "../pages/Market";
import Error from "../pages/Error";
import Footer from "./Footer";
import Checkout from "./checkout/Checkout";
import BotPage from "./BotPage";
import Cart from "./CartComponents/Cart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [user, setUser] = useState(null);
  const [marketBlink, setMarketBlink] = useState(true);
  const [bot, setBot] = useState(null);
  const [botList, setBotList] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [cartTotal, setCartTotal] = useState([]);
  const [cartBotIds, setCartBotIds] = useState([]);
  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          fetch("/products")
            .then((r) => r.json())
            .then((products) => {
              setBotList(products);
            });
          setUser(user);
          // history.push("/");
        });
      }
    });
  }, []);

  if (!user) return <Login onLogin={setUser} />;
  const submitReviewSound = () => {
    let submitReviewAudio = new Audio("/sounds/submit-review-sound.mp3");
    submitReviewAudio.play();
  };
  const errorSound = () => {
    let errorAudio = new Audio("/sounds/error-sound.mp3");
    errorAudio.play();
  };
  const handleAddCart = (bot_id, user_id) => {
    let newObj = {
      user_id: user.id,
      product_id: bot_id,
    };

    console.log(newObj);
    fetch("/user_items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newObj),
    }).then((r) => {
      if (r.ok) {
        r.json().then((obj) => {
          console.log(obj);
          submitReviewSound();
          toast.success("bot added to cart!", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      } else {
        r.json().then((err) => {
          errorSound();
          toast.error("limited to one bot per user!", {
            position: "top-center",
            autoClose: 500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
      }
    });
  };

  const onCheckOutClick = (cartSum, newArr) => {
    console.log(cartTotal);
    setCartTotal(cartSum);

    setUserCart(newArr);
  };

  return (
    <div>
      <ToastContainer />
      <NavBar
        user={user}
        setUser={setUser}
        marketBlink={marketBlink}
        setMarketBlink={setMarketBlink}
      />
      <main>
        <Switch>
          <Route path="/market">
            <Market
              botList={botList}
              bot={bot}
              setBot={setBot}
              handleAddCart={handleAddCart}
            />
          </Route>
          <Route path="/bot">
            <BotPage bot={bot} user={user} handleAddCart={handleAddCart} />
          </Route>
          <Route path="/cart">
            <Cart
              botList={botList}
              bot={bot}
              user={user}
              onCheckOutClick={onCheckOutClick}
            />
          </Route>
          <Route path="/checkout">
            <Checkout cartTotal={cartTotal} userCart={userCart} user={user} />
          </Route>
          <Route path="/">
            <Home botList={botList} />
          </Route>
          <Route path="*">
            <Error />
          </Route>
        </Switch>
      </main>

      <Footer style={{ position: "fixed", left: 0, bottom: 0, right: 0 }} />
    </div>
  );
}

export default App;
