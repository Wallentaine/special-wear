import React from 'react'
import { Container } from "@mui/material"
import AppRouter from "../AppRouter"

const Content = () => {
    return (
        <Container
            maxWidth='md'
            sx={{margin: '20px auto'}}
        >
            <AppRouter/>
        </Container>
    )
}

export default Content