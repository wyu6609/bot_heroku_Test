import * as React from "react";
import Container from "@mui/material/Container";
import ProductionQuantityLimitsOutlinedIcon from "@mui/icons-material/ProductionQuantityLimitsOutlined";
import "./EmptyCart.css";
export default function ActionAreaCard() {
  return (
    <Container sx={{ maxWidth: 345, height: 150, my: 5, color: "red" }}>
      <h3>ya cart iz emptee!</h3>
      <ProductionQuantityLimitsOutlinedIcon className="empty-cart-icon" />
    </Container>
  );
}
