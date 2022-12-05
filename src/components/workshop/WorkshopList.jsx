import React from 'react'
import WorkshopCard from "./WorkshopCard"
import {Grid} from "@mui/material"


const WorkshopList = ({workshops}) => {

    return (
        <Grid container columnSpacing={2} rowSpacing={2}>
            {workshops && workshops.map(item =>
                <WorkshopCard key={item.id} id={item.id} title={item.title}/>
            )}
        </Grid>
    )
}

export default WorkshopList