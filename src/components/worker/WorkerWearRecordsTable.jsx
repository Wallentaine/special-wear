import React, {useState} from 'react'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow} from "@mui/material";

const WorkerWearRecordsTable = ({workerWearData}) => {

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => setPage(newPage)


    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Спецодежда</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Скидка</TableCell>
                            <TableCell align="right">Цена со скидкой</TableCell>
                            <TableCell align="right">Дата получения</TableCell>
                            <TableCell align="right">Срок использования</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {workerWearData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">{row.type}</TableCell>
                                <TableCell align="right">{row.price}</TableCell>
                                <TableCell align="right">{row.discount} %</TableCell>
                                <TableCell align="right">{row.priceWithDiscount}</TableCell>
                                <TableCell align="right">{row.receiving_date}</TableCell>
                                <TableCell align="right">{row.wear_time}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage="Кол-во записей на странице: "
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={workerWearData.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default WorkerWearRecordsTable