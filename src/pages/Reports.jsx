import React, {useState} from 'react'
import {Box, Button, FormControl, MenuItem, Select, Typography} from "@mui/material"
import {fetchReceivingReport} from "../http/receivingAPI"

const sortReportsByWorkshop = (array) => {
    if (!array) return

    const groupByWorkshop = {}

    array.forEach(item => {
        groupByWorkshop[item.workshop] = groupByWorkshop[item.workshop] || []
        groupByWorkshop[item.workshop].push(item)
    })

    const result = []

    for (let item in groupByWorkshop) {
        const tempResultItem = {}

        tempResultItem.workshopTitle = item
        tempResultItem.listOfReceiving = groupByWorkshop[item]

        result.push(tempResultItem)
    }

    return result
}

const Reports = () => {

    const [filterMonth, setFilterMonth] = useState(0)
    const [filterYear, setFilterYear] = useState(0)

    const [report, setReport] = useState([])

    const handleChangeFilterMonth = (event) => {
        setFilterMonth(event.target.value)
    }

    const handleChangeFilterYear = (event) => {
        setFilterYear(event.target.value)
    }

    let years = []

    const year = new Date(Date.now()).getFullYear()

    for (let y = year; y >= year - 50; y--) {
        years.push(y)
    }

    const getReport = () => {
        if (!filterMonth || !filterYear) return
        fetchReceivingReport(filterMonth, filterYear).then((data) => {
            setReport(sortReportsByWorkshop(data))
        })
    }

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div">
                Формирование отчётов
            </Typography>

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
            <Box>
                <Button variant="contained" onClick={getReport}>Сформировать отчёт</Button>
            </Box>
            <Box sx={{mt: 4}}>
                {report && report.map((item, idx) =>
                    <div key={idx}>
                        {item.workshopTitle}

                        {item.listOfReceiving && item.listOfReceiving.map(row =>
                            <div key={row.id}>
                                {row.fullname}
                            </div>
                        )}
                    </div>
                )}
            </Box>
        </div>
    )
}

export default Reports