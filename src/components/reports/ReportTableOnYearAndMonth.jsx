import React from 'react'
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material'

const ReportTableOnYearAndMonth = (props) => {

    const {
        tableRecords
    } = props

    const totalPrice = tableRecords.reduce((accum, item) => item.price ? accum += Number(item.price) : 0, 0)
    const totalPriceWithDiscount = tableRecords.reduce((accum, item) => item.price ? accum += Number(item.price - (item.price * item.discount / 100)) : 0, 0)
    const totalCountSpecialWear = tableRecords.reduce((accum, item) => item.type ? accum += 1 : 0, 0)

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="spanning table">
                <TableHead>
                    <TableRow>
                        <TableCell>ФИО сотрудника</TableCell>
                        <TableCell align="right">Вид спецодежды</TableCell>
                        <TableCell align="right">Стоимость</TableCell>
                        <TableCell align="right">Скидка</TableCell>
                        <TableCell align="right">Стоимость с учётом скидки</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {tableRecords.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.fullname}</TableCell>
                            <TableCell align="right">{row.type}</TableCell>
                            <TableCell align="right">{row.price} ₽</TableCell>
                            <TableCell align="right">{row.discount} %</TableCell>
                            <TableCell align="right">{row.price - (row.price * row.discount / 100)} ₽</TableCell>
                        </TableRow>
                    ))}
                    <TableRow sx={{background: "#feeefe"}}>
                        <TableCell colSpan={1}>Итого по цеху</TableCell>
                        <TableCell align="right">{totalCountSpecialWear}</TableCell>
                        <TableCell align="right">{totalPrice.toFixed(2)} ₽</TableCell>
                        <TableCell align="right"></TableCell>
                        <TableCell align="right">{totalPriceWithDiscount.toFixed(2)} ₽</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default ReportTableOnYearAndMonth