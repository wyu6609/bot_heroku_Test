import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Divider from "@mui/material/Divider";

export default function InsetDividers({ botCartList, handleDeleteCartItem }) {
  return (
    <List
      sx={{
        width: "500%",
        maxWidth: "500px",
        bgcolor: "background.paper",
      }}
    >
      <Divider variant="inset" component="li" />
      {botCartList.map((el) => {
        return (
          <>
            <ListItem>
              <ListItemAvatar>
                <Avatar src={el.image}>
                  <ImageIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={el.title} align="left" />
              <ListItemText secondary={`$${el.price}`} align="right" />
              <IconButton
                onClick={() => {
                  handleDeleteCartItem(el.id);
                }}
              >
                <DeleteForeverOutlinedIcon style={{ color: "red" }} />
              </IconButton>
            </ListItem>
          </>
        );
      })}
      <Divider variant="inset" component="li" />
    </List>
  );
}
