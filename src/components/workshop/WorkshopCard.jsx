import React from 'react'
import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {WORKSHOP_ROUTE} from "../../utils/routes"

const WorkshopCard = (props) => {

    const {id, title} = props

    const navigate = useNavigate()

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card>
                <CardActionArea
                    onClick={() => navigate(WORKSHOP_ROUTE + '/' + id)}
                >
                    <CardMedia
                        component="img"
                        alt="workshop"
                        height="128"
                        image="/static/images/workshop1.png"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            {title}
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default WorkshopCard