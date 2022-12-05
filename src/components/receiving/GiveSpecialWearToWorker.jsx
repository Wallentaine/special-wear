import React, {useEffect, useState} from 'react'
import {FormControl, FormControlLabel, FormGroup, InputLabel, MenuItem, Select, Switch, TextField} from "@mui/material"
import {fetchWorkers} from "../../http/workerAPI"
import {fetchAllWear} from "../../http/wearAPI"

const GiveSpecialWearToWorker = (props) => {

    const {
        worker,
        setWorker,
        wear,
        setWear,
        receivingDate,
        setReceivingDate,
        workerSign,
        setWorkerSign
    } = props

    const [workers, setWorkers] = useState([])
    const [wears, setWears] = useState([])

    const handleChangeWorker = (event) => {
        setWorker(event.target.value)
    }
    const handleChangeWear = (event) => {
        setWear(event.target.value)
    }

    const handleWorkerSign = (event) => {
        setWorkerSign(event.target.checked)
    }

    useEffect(() => {
        fetchWorkers().then((workersData) => {
            setWorkers([...workersData])
        })
        fetchAllWear().then((wearsData) => {
            setWears([...wearsData])
        })
    }, [])

    return (
        <>
            <FormControl variant="standard" sx={{ minWidth: "100%", marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">Выберите сотрудника</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={worker ? worker : ``}
                    onChange={handleChangeWorker}
                    label="Выберите сотрудника"
                >
                    <MenuItem value={``}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {workers && workers.map((workerItem) =>
                        <MenuItem key={Number(workerItem.id)} value={Number(workerItem.id)}>{workerItem.fullname}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: "100%", marginBottom: 4  }}>
                <InputLabel id="demo-simple-select-standard-label1">Выберите вещь</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label1"
                    id="demo-simple-select-standard1"
                    value={wear ? wear : ``}
                    onChange={handleChangeWear}
                    label="Выберите вещь"
                >
                    <MenuItem key={0} value={``}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {wears && wears.map((wearItem) =>
                        <MenuItem key={Number(wearItem.id)} value={wearItem.id}>{wearItem.type}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <TextField
                id="date"
                label="Срок использования"
                type="date"
                sx={{ width: "100%", marginBottom: 4 }}
                InputLabelProps={{
                    shrink: true,
                }}
                value={receivingDate}
                onChange={(e) => setReceivingDate(e.target.value)}
            />
            <FormGroup sx={{marginBottom: 4}}>
                <FormControlLabel control={<Switch checked={workerSign} onChange={handleWorkerSign} />} label="Сотрудник расписался?" />
            </FormGroup>
        </>
    )
}

export default GiveSpecialWearToWorker