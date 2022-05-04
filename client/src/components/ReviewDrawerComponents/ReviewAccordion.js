import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ReviewForm from "./ReviewForm";
import "./ReviewAccordion.css";

export default function ReviewAccordion({ handleSubmit, reviewBtnSound }) {
  return (
    <div>
      <Accordion align="center" justifyContent="center">
        <AccordionSummary
          onClick={() => {
            reviewBtnSound();
          }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Add a review!</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <ReviewForm handleSubmit={handleSubmit} />
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
