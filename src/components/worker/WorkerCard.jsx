import React from 'react'
import {Avatar, Button, Card, CardActions, CardContent, Grid, Typography} from "@mui/material"
import {useNavigate} from "react-router-dom"
import {WORKER_ROUTE} from "../../utils/routes"

const WorkerCard = (props) => {
    const {
        id,
        fullName,
        post,
    } = props

    const navigate = useNavigate()

    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card variant="outlined">
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Сотрудник
                    </Typography>
                    <Avatar alt="Remy Sharp" src="/static/images/avatar.jpg" sx={{ width: 96, height: 96 }}/>
                    <Typography variant="h5" component="div">
                        {fullName}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {post}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="medium" onClick={() => navigate(WORKER_ROUTE + '/' + id)}>Подробнее</Button>
                </CardActions>
            </Card>
        </Grid>
    )
}

export default WorkerCard