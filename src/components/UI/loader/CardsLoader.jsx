import React from 'react'
import {Box, Grid, Skeleton} from "@mui/material"

const CardsLoader = () => {
    return (
        <Grid container columnSpacing={2} rowSpacing={10}>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton variant="rectangular" height={160} />
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton variant="rectangular" height={160}/>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
                <Skeleton variant="rectangular" height={160}/>
                <Box sx={{ pt: 0.5 }}>
                    <Skeleton />
                    <Skeleton width="60%" />
                </Box>
            </Grid>
        </Grid>
    )
}

export default CardsLoader