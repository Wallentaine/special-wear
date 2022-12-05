import React from 'react'
import {Accordion, AccordionDetails, AccordionSummary, Typography} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"

const DefaultAccordion = (props) => {
    const {
        headText,
        bodyText
    } = props
    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
            >
                <Typography>{headText}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{background: 'rgba(0, 0, 0, 0.03)'}}>
                <Typography>{bodyText}</Typography>
            </AccordionDetails>
        </Accordion>
    )
}

export default DefaultAccordion