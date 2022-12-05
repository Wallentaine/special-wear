import React, {useContext, useState} from 'react'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from "@mui/material"
import {Link} from "react-router-dom"
import {WORKER_ROUTE} from "../../utils/routes"
import BuildIcon from "@mui/icons-material/Build"
import DeleteIcon from "@mui/icons-material/Delete"
import {deleteReceivingDataById, fetchReceivingById, updateReceivingDataById} from "../../http/receivingAPI"
import CreateNewEntityModal from "../UI/modal/CreateNewEntityModal"
import GiveSpecialWearToWorker from "./GiveSpecialWearToWorker"
import {Context} from "../../index"

const ReceivingList = ({receiving, setReceiving}) => {

    const {user} = useContext(Context)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const [receivingId, setReceivingId] = useState(0)
    const [worker, setWorker] = useState('')
    const [wear, setWear] = useState('')
    const [receivingDate, setReceivingDate] = useState('')
    const [workerSign, setWorkerSign] = useState(false)

    const [isOpenUpdatePostModal, setIsOpenUpdatePostModal] = useState(false)

    const handleChangeReceivingModalOpen = (id) => {
        setReceivingId(Number(id))
        const [currentReceiving] = receiving.filter(rec => rec.receiving_id === id)
        setWorker(currentReceiving.worker_id)
        setWear(currentReceiving.wear_id)
        setReceivingDate(currentReceiving.receiving_date)
        setWorkerSign(Number(currentReceiving.sign) === 1)
        setIsOpenUpdatePostModal(true)
    }

    const handleChangePostModalClose = () => setIsOpenUpdatePostModal(false)

    const deleteReceivingButtonHandler = (receivingId) => {
        deleteReceivingDataById(receivingId).then((deletedReceivingId) => {
            setReceiving(receiving.filter(rec => rec.receiving_id !== deletedReceivingId))
        })
    }

    const updateReceivingButtonHandler = () => {
        if (receivingId && worker && wear && receivingDate) {
            updateReceivingDataById(receivingId, worker, receivingDate, workerSign ? 1 : 0, [wear]).then((updatedReceivingId) => {
                fetchReceivingById(updatedReceivingId).then((([recData]) => {
                    setReceiving(receiving.map(rec => {
                        if (rec.receiving_id === updatedReceivingId) {
                            rec = recData
                        }
                        return rec
                    }))
                }))
            })
        }
        handleChangePostModalClose()
    }

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <CreateNewEntityModal isOpen={isOpenUpdatePostModal} handleClose={handleChangePostModalClose} buttonHandler={updateReceivingButtonHandler} title={"Редактировать запись"} sendButtonText={"Сохранить изменения"}>
                <GiveSpecialWearToWorker
                    worker={worker}
                    setWorker={setWorker}
                    wear={wear}
                    setWear={setWear}
                    receivingDate={receivingDate}
                    setReceivingDate={setReceivingDate}
                    workerSign={workerSign}
                    setWorkerSign={setWorkerSign}
                />
            </CreateNewEntityModal>
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>Получатель</TableCell>
                            <TableCell align="right">Вещь</TableCell>
                            <TableCell align="right">Цена</TableCell>
                            <TableCell align="right">Скидка</TableCell>
                            <TableCell align="right">Цена со скидкой</TableCell>
                            <TableCell align="right">Дата получения</TableCell>
                            <TableCell align="right">Расписался</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {receiving.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                            <TableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="right">
                                    {user.user.role === "ADMIN" &&
                                        <>
                                            <IconButton aria-label="change" size={"small"} onClick={() => {handleChangeReceivingModalOpen(row.receiving_id)}}>
                                            <BuildIcon />
                                        </IconButton>
                                            <IconButton aria-label="delete" size={"small"} onClick={() => {deleteReceivingButtonHandler(row.receiving_id)}}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </>
                                    }
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <Link to={WORKER_ROUTE + '/' + row.worker_id}>{row.fullname}</Link>
                                </TableCell>
                                <TableCell align="right">{row.type}</TableCell>
                                <TableCell align="right">{row.price}₽</TableCell>
                                <TableCell align="right">{row.discount_percent}%</TableCell>
                                <TableCell align="right">{row.price - (row.price * row.discount_percent * 0.01)}</TableCell>
                                <TableCell align="right">{row.receiving_date}</TableCell>
                                <TableCell align="right">{Number(row.sign) === 1 ? "Да" : "Нет"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                labelRowsPerPage="Кол-во записей на странице: "
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={receiving.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    )
}

export default ReceivingList