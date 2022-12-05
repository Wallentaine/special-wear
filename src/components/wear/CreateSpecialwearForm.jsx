import React from 'react'
import {InputAdornment, TextField} from "@mui/material"

const CreateSpecialwearForm = (props) => {
    const {
        wearType,
        setWearType,
        wearPrice,
        setWearPrice,
        wearTime,
        setWearTime
    } = props

    return (
        <>
            <TextField
                id="standard-basic"
                label="Тип спецодежды"
                variant="standard"
                sx={{width: '100%', marginBottom: 4}}
                value={wearType}
                onChange={(e) => setWearType(e.target.value)}
            />
            <TextField
                id="standard-basic"
                type="number"
                label="Стоимость спецодежды"
                variant="standard"
                InputProps={{
                    startAdornment: <InputAdornment position="start">₽</InputAdornment>,
                }}
                sx={{width: '100%', marginBottom: 4}}
                value={wearPrice}
                onChange={(e) => setWearPrice(e.target.value)}
            />
            <TextField
                id="date"
                label="Срок использования"
                type="date"
                sx={{ width: "100%", marginBottom: 4 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={wearTime}
                onChange={(e) => setWearTime(e.target.value)}
            />
        </>
    )
}

export default CreateSpecialwearForm