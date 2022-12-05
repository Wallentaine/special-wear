import React from 'react'
import {InputAdornment, TextField} from "@mui/material"

const CreateNewPostForm = (props) => {

    const {
        workerPost,
        setWorkerPost,
        postDiscount,
        setPostDiscount
    } = props

    return (
        <>
            <TextField
                id="standard-basic"
                label="Название должности"
                variant="standard"
                sx={{width: '100%', marginBottom: 4}}
                value={workerPost}
                onChange={(e) => setWorkerPost(e.target.value)}
            />
            <TextField
                id="standard-basic"
                type="number"
                label="Стоимость спецодежды"
                variant="standard"
                InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                sx={{width: '100%', marginBottom: 4}}
                value={postDiscount}
                onChange={(e) => setPostDiscount(e.target.value)}
            />
        </>
    )
}

export default CreateNewPostForm