import React, {useContext} from 'react'
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormGroup,
    Grid,
    InputLabel, MenuItem, Select,
    Slider,
    Switch,
    Typography
} from "@mui/material"
import {Context} from "../../index"
import {fetchWorkerBetweenDiscount, fetchWorkerByReceivingMonth, fetchWorkerNotReceiving} from "../../http/workerAPI";

function valuetext(value) {
    return `${value}`
}

const WorkerFiltersForm = (props) => {

    const {worker} = useContext(Context)

    const {
        isOpenFilterBlock,
        isCheckedGettingWear,
        setCheckedGettingWear,
        discountSlider,
        setDiscountSlider,
        filterMonth,
        setFilterMonth,
    } = props

    const handleChangeCheckedGettingWear = (event) => {
        setCheckedGettingWear(event.target.checked)
    }

    const handleChangeDiscountSlider = (event, newValue) => {
        setDiscountSlider(newValue)
    }

    const handleChangeFilterMonth = (event) => {
        setFilterMonth(event.target.value)
    }

    const handleGettingWearButton = () => {
        if (isCheckedGettingWear) {
            setDiscountSlider([0, 100])
            setFilterMonth(0)
            fetchWorkerNotReceiving().then((workersData) => {
                worker.setWorkers(workersData)
            })
        }
    }

    const handleSelectDiscountButton = () => {
        if (discountSlider[0] !== 0 || discountSlider[1] !== 100) {
            setCheckedGettingWear(true)
            setFilterMonth(0)
            fetchWorkerBetweenDiscount(discountSlider[0], discountSlider[1]).then((workersData) => {
                worker.setWorkers(workersData)
            })
        }

    }

    const handleSelectMonthButton = () => {
        if (filterMonth) {
            setCheckedGettingWear(true)
            setDiscountSlider([0, 100])
            fetchWorkerByReceivingMonth(filterMonth).then((workersData) => {
                worker.setWorkers(workersData)
            })
        }
    }

    const resetFiltersButtonHandler = () => {
        setCheckedGettingWear(false)
        setDiscountSlider([0, 100])
        setFilterMonth(0)
    }

    return (
        <Box sx={{width: "100%", marginBottom: 4, display: isOpenFilterBlock ? 'flex' : 'none'}}>
            <Grid container columnSpacing={2} rowSpacing={2} sx={{height: "100%"}}>
                <Grid item xs={12} md={6} lg={4} sx={{display: 'flex', flexDirection: "column"}}>
                    <FormGroup sx={{marginTop: 'auto'}}>
                        <FormControlLabel control={
                            <Switch
                                checked={isCheckedGettingWear}
                                onChange={handleChangeCheckedGettingWear}
                                inputProps={{ 'aria-label': 'controlled' }}
                            />}
                            label="???? ?????????????? ????????????????????"
                        />
                    </FormGroup>
                    <Button variant="outlined" sx={{marginTop: "auto"}} onClick={handleGettingWearButton}>??????????????????</Button>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{display: 'flex', flexDirection: "column"}}>
                    <Typography variant="body" component="div" color="text.secondary">
                        ???????????? ????????????????????
                    </Typography>
                    <Slider
                        sx={{marginBottom: 2, width: '95%', margin: '0 auto'}}
                        min={0}
                        max={100}
                        step={5}
                        marks
                        getAriaLabel={() => 'Discount Range'}
                        value={discountSlider}
                        onChange={handleChangeDiscountSlider}
                        valueLabelDisplay="auto"
                        getAriaValueText={valuetext}
                    />
                    <Button variant="outlined" sx={{marginTop: "auto"}} onClick={handleSelectDiscountButton}>??????????????????</Button>
                </Grid>
                <Grid item xs={12} md={6} lg={4} sx={{display: 'flex', flexDirection: "column"}}>
                    <FormControl fullWidth variant="standard" sx={{marginBottom: 2}}>
                        <InputLabel id="demo-simple-select-label">?????????? ??????????????????</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={filterMonth}
                            label="?????????? ??????????????????"
                            onChange={handleChangeFilterMonth}
                            sx={{height: '80%'}}
                        >
                            <MenuItem value={0}>???? ??????????????</MenuItem>
                            <MenuItem value={1}>????????????</MenuItem>
                            <MenuItem value={2}>??????????????</MenuItem>
                            <MenuItem value={3}>????????</MenuItem>
                            <MenuItem value={4}>????????????</MenuItem>
                            <MenuItem value={5}>??????</MenuItem>
                            <MenuItem value={6}>????????</MenuItem>
                            <MenuItem value={7}>????????</MenuItem>
                            <MenuItem value={8}>????????????</MenuItem>
                            <MenuItem value={9}>????????????????</MenuItem>
                            <MenuItem value={10}>??????????????</MenuItem>
                            <MenuItem value={11}>????????????</MenuItem>
                            <MenuItem value={12}>??????????????</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="outlined" sx={{marginTop: "auto"}} onClick={handleSelectMonthButton}>??????????????????</Button>
                </Grid>
                <Grid item xs={12} md={12} lg={12} sx={{display: 'flex', flexDirection: "column"}}>
                    <Button variant="contained" onClick={resetFiltersButtonHandler}>???????????????? ??????????????</Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default WorkerFiltersForm