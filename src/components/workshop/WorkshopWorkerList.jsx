import React from 'react'
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    Typography
} from "@mui/material";
import {useState} from "react"
import {WORKER_ROUTE} from "../../utils/routes"
import {Link} from "react-router-dom"

const WorkshopWorkerList = (props) => {

    const {workers} = props

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    return (
        <>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ФИО</TableCell>
                            <TableCell align="right">Должность</TableCell>
                            <TableCell align="right">Скидка</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workers && workers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((worker) => (
                            <TableRow
                                key={worker.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    <Link to={WORKER_ROUTE + '/' + worker.id}>
                                        {worker.fullname}
                                    </Link>
                                </TableCell>
                                <TableCell align="right">{worker.title}</TableCell>
                                <TableCell align="right">{worker.discount_percent} %</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage="Кол-во записей в таблице: "
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={workers.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </>
    )
}

export default WorkshopWorkerList