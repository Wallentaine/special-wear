import React, {useState} from 'react'
import {Box, Button, Typography} from "@mui/material"
import {fetchReceivingReport} from "../http/receivingAPI"
import ReportFormOnYearAndMonth from "../components/reports/ReportFormOnYearAndMonth"
import ReportTableOnYearAndMonth from "../components/reports/ReportTableOnYearAndMonth";

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
            <ReportFormOnYearAndMonth
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
                filterYear={filterYear}
                setFilterYear={setFilterYear}
                years={years}
            />
            <Box>
                <Button variant="contained" onClick={getReport}>Сформировать отчёт</Button>
            </Box>
            <Box sx={{mt: 4}}>
                {report && report.map((item, idx) =>
                    <div key={idx}>
                        <Typography gutterBottom variant="h5" component="div" sx={{mb: 2, mt: 4}}>
                            {item.workshopTitle}
                        </Typography>
                        {item.listOfReceiving ?
                            <ReportTableOnYearAndMonth tableRecords={item.listOfReceiving}/>
                            :
                            "Нет данных"
                        }

                        {/*{item.listOfReceiving && item.listOfReceiving.map(row =>*/}
                        {/*    <div key={row.id}>*/}
                        {/*        {row.fullname}*/}
                        {/*    </div>*/}
                        {/*)}*/}
                    </div>
                )}
            </Box>
        </div>
    )
}

export default Reports