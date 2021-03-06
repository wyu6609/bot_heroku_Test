import * as React from "react";
import PropTypes from "prop-types";
import { Global } from "@emotion/react";
import { styled } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import "./ReviewDrawer.css";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import DrawerList from "./DrawerList";
import Grid from "@mui/material/Grid";
import ReviewAccordion from "./ReviewAccordion";
import { toast } from "react-toastify";
const drawerBleeding = 56;

const Root = styled("div")(({ theme }) => ({
  height: "100%",
}));

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "light" ? "#fff" : "#fff",
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: theme.palette.mode === "light" ? grey[300] : grey[900],
  borderRadius: 3,
  position: "absolute",
  top: 8,
  left: "calc(50% - 15px)",
}));

//sounds
//////////////////////////////////////
const reviewBtnSound = () => {
  let reviewBtnAudio = new Audio("/sounds/review-btn-sound.mp3");
  reviewBtnAudio.play();
};

const submitReviewSound = () => {
  let submitReviewAudio = new Audio("/sounds/submit-review-sound.mp3");
  submitReviewAudio.play();
};

const errorSound = () => {
  let errorAudio = new Audio("/sounds/error-sound.mp3");
  errorAudio.play();
};

const deleteReviewSound = () => {
  let deleteReviewAudio = new Audio("/sounds/deleted-sound.mp3");
  deleteReviewAudio.play();
};

//////////////////////////////////////
function ReviewDrawer(props) {
  const { window } = props;
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (description, value) => {
    let newReview = {
      description: description,
      rating: value,
      product_id: props.bot_id,
      user_id: props.user_id,
    };
    console.log(newReview);
    fetch("/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newReview),
    }).then((r) => {
      if (r.ok) {
        r.json().then((newRev) => {
          console.log(newRev);

          props.setReviews([newRev, ...props.reviews]);
          toast.success("ya review has been added!", {
            theme: "colored",
            position: "top-left",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          submitReviewSound();
        });
      } else {
        r.json().then((err) => {
          errorSound();
          toast.error("product reviewed OR fill out the form!  ", {
            theme: "colored",
            position: "top-left",
            autoClose: 2000,
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

  //delete users Review for specified bot
  const handleDelete = () => {
    let user_product_review = props.reviews.filter(
      (el) => el.user.id === props.user_id
    );

    let productReviewId = user_product_review[0].id;

    fetch(`/reviews/${productReviewId}`, {
      method: "DELETE",
    }).then(() => {
      props.setReviews(props.reviews.filter((el) => el.id !== productReviewId));
      deleteReviewSound();
      toast.success("ya review has been deleted! ", {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // });
    });
  };
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
    reviewBtnSound();
  };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Root>
      <CssBaseline />
      <Global
        styles={{
          ".MuiDrawer-root > .MuiPaper-root": {
            height: `calc(50% - ${drawerBleeding}px)`,
            overflow: "visible",
          },
        }}
      />

      <IconButton
        onClick={toggleDrawer(true)}
        className="blink"
        sx={{ color: "#01bfa5" }}
      >
        <PreviewOutlinedIcon />
      </IconButton>

      <SwipeableDrawer
        container={container}
        anchor="bottom"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <StyledBox
          sx={{
            position: "absolute",
            top: -drawerBleeding,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
            visibility: "visible",
            right: 0,
            left: 0,
          }}
        >
          <Typography align="center" sx={{ p: 2, color: "#01bfa5" }}>
            {props.reviews.length} Reviews
          </Typography>
        </StyledBox>
        <StyledBox
          sx={{
            px: 2,
            pb: 2,
            height: "100%",
            overflow: "auto",
          }}
        >
          <Grid container>
            <Grid item xs={6}>
              <DrawerList
                reviews={props.reviews}
                user_id={props.user_id}
                handleDelete={handleDelete}
              />
            </Grid>
            <Grid item xs={6}>
              <ReviewAccordion
                handleSubmit={handleSubmit}
                reviewBtnSound={reviewBtnSound}
              />
            </Grid>
          </Grid>
        </StyledBox>
      </SwipeableDrawer>
    </Root>
  );
}

export default ReviewDrawer;
