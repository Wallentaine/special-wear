import React from 'react'
import {Box, FormControl, MenuItem, Select, Typography} from "@mui/material"

const ReportFormOnYearAndMonth = (props) => {

    const {
        filterMonth,
        setFilterMonth,
        filterYear,
        setFilterYear,
        years
    } = props

    const handleChangeFilterMonth = (event) => {
        setFilterMonth(event.target.value)
    }

    const handleChangeFilterYear = (event) => {
        setFilterYear(event.target.value)
    }

    return (
        <Box sx={{mb: 1}}>
            <Typography variant="h6" component="span" color="text.secondary" sx={{mr: 2}}>
                Отчет о получении спецодежды по заводу за
            </Typography>

            <FormControl variant="standard" sx={{mr: 1}}>
                <Select
                    id="demo-simple-select"
                    value={filterMonth}
                    label="Месяц получения"
                    onChange={handleChangeFilterMonth}
                >
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    <MenuItem value={1}>Январь</MenuItem>
                    <MenuItem value={2}>Февраль</MenuItem>
                    <MenuItem value={3}>Март</MenuItem>
                    <MenuItem value={4}>Апрель</MenuItem>
                    <MenuItem value={5}>Май</MenuItem>
                    <MenuItem value={6}>Июнь</MenuItem>
                    <MenuItem value={7}>Июль</MenuItem>
                    <MenuItem value={8}>Август</MenuItem>
                    <MenuItem value={9}>Сентябрь</MenuItem>
                    <MenuItem value={10}>Октябрь</MenuItem>
                    <MenuItem value={11}>Ноябрь</MenuItem>
                    <MenuItem value={12}>Декабрь</MenuItem>
                </Select>
            </FormControl>

            <Typography variant="h6" component="span" color="text.secondary" sx={{mr: 3}}>
                месяц
            </Typography>

            <FormControl variant="standard" sx={{mr: 1}}>
                <Select
                    id="demo-simple-select"
                    value={filterYear}
                    label="Месяц получения"
                    onChange={handleChangeFilterYear}
                >
                    <MenuItem value={0}>Не выбрано</MenuItem>
                    {years.map(year =>
                        <MenuItem key={year} value={year}>{year}</MenuItem>
                    )}
                </Select>
            </FormControl>

            <Typography variant="h6" component="span" color="text.secondary" sx={{mr: 2}}>
                года
            </Typography>
        </Box>
    )
}

export default ReportFormOnYearAndMonth