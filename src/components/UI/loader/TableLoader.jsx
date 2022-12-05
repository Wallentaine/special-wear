import React from 'react'
import {Box, Skeleton} from "@mui/material"

const TableLoader = () => {
    return (
        <Box sx={{ width: "100%" }}>
            <Skeleton height={48} width="30%" />
            <Skeleton height={32} />
            <Skeleton height={32} />
            <Skeleton height={32} />
            <Skeleton height={32} />
        </Box>
    )
}

export default TableLoader