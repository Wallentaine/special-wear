import React from 'react'
import {Skeleton} from "@mui/material"

const UserPageLoader = () => {
    return (
        <>
            <Skeleton variant="circular" width={160} height={160} sx={{marginBottom: 2}}/>
            <Skeleton variant="rectangular" width="100%" height={30} sx={{marginBottom: 2}}/>
            <Skeleton variant="rectangular" width="100%" height={30} sx={{marginBottom: 2}}/>
            <Skeleton variant="rectangular" width="100%" height={30} sx={{marginBottom: 2}}/>
            <Skeleton variant="rectangular" width="100%" height={30} sx={{marginBottom: 2}}/>
        </>
    )
}

export default UserPageLoader