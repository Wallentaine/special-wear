import React from 'react'
import {Grid, Paper, Typography} from "@mui/material"

const PostCard = (props) => {
    const {title, discount_percent} = props

    return (
        <>
            <Grid container sx={{marginBottom: 1}}>
                <Grid item xs={5.5}>
                    <Paper variant="outlined" sx={{height: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography>
                            {title}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item xs={1}></Grid>
                <Grid item xs={5.5} sx={{paddingLeft: "8px"}}>
                    <Paper variant="outlined" sx={{height: 30, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        <Typography>
                            {discount_percent} %
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </>
    )
}

export default PostCard