import * as React from "react";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const labels = {
  1: "Useless",

  2: "Poor",

  3: "Ok",

  4: "Good",

  5: "Excellent",
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function DrawerList({ reviews, user_id, handleDelete }) {
  return (
    <List
      sx={{
        width: "100%",
        maxWidth: "80%",
        bgcolor: "background.paper",
      }}
    >
      {reviews.map((review) => (
        <>
          <Divider component="li" variant="inset" />

          <ListItem>
            <ListItemAvatar>
              <Avatar
                src={`https://avatars.dicebear.com/api/pixel-art/${review.user.id}.svg`}
              >
                <BeachAccessIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={review.description}
              secondary={review.user.username}
            />
            {user_id === review.user.id && (
              <IconButton
                onClick={() => {
                  handleDelete();
                }}
              >
                <DeleteForeverOutlinedIcon style={{ color: "red" }} />
              </IconButton>
            )}
            <Rating
              name="read-only"
              value={review.rating}
              getLabelText={getLabelText}
              readOnly
            />
          </ListItem>
          <Divider component="li" variant="inset" />
        </>
      ))}
    </List>
  );
}
