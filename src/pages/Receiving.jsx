import React, {useContext, useEffect, useState} from 'react'
import {Button, Typography} from "@mui/material"
import {createNewReceiving, fetchAllReceiving, fetchReceivingById} from "../http/receivingAPI"
import TableLoader from "../components/UI/loader/TableLoader"
import ReceivingList from "../components/receiving/ReceivingList"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import CreateNewEntityModal from "../components/UI/modal/CreateNewEntityModal"
import GiveSpecialWearToWorker from "../components/receiving/GiveSpecialWearToWorker"
import SimpleSnackBar from "../components/UI/snackbar/SimpleSnackBar"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const Receiving = observer(() => {

    const {user} = useContext(Context)

    const [receivingData, setReceivingData] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [worker, setWorker] = useState('')
    const [wear, setWear] = useState('')
    const [receivingDate, setReceivingDate] = useState('')
    const [workerSign, setWorkerSign] = useState(false)

    const [isOpenCreateReceivingModal, setIsOpenCreateReceivingModal] = useState(false)
    const handleCreateReceivingModalOpen = () => setIsOpenCreateReceivingModal(true)
    const handleCreateReceivingModalClose = () => setIsOpenCreateReceivingModal(false)

    const [snackState, setSnackState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        success: false
    })

    const handleSnackClick = (newState) => {
        setSnackState({ openSnack: true, ...newState })
    }

    useEffect(() => {
        fetchAllReceiving().then((receivingRecords) => {
            setReceivingData(receivingRecords)
        }).finally(() => setIsLoading(false))
    }, [])

    const addNewReceivingButtonHandler = () => {
        if (worker && wear && receivingDate) {
            createNewReceiving(worker, receivingDate, workerSign ? 1 : 0, wear).then((receivingId) => {
                handleSnackClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                    success: true
                })
                return receivingId
            }).then((newReceivingId) => {
                fetchReceivingById(newReceivingId).then((receivingInfo) => {
                    setReceivingData([...receivingInfo, ...receivingData])
                })
            })
        } else {
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
        }

        handleCreateReceivingModalClose()

        setWorker('')
        setWear('')
        setReceivingDate('')
        setWorkerSign(false)
    }

    if (isLoading) return <TableLoader/>

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div">
                Получение спецодежды
                <span> </span>
                {user.user.role === "ADMIN" &&
                    <Button variant="text" startIcon={<ControlPointIcon/>} onClick={handleCreateReceivingModalOpen}>Выдать спецодежду</Button>
                }

            </Typography>
            <CreateNewEntityModal isOpen={isOpenCreateReceivingModal} handleClose={handleCreateReceivingModalClose} buttonHandler={addNewReceivingButtonHandler} title={"Выдать спецодежду"} sendButtonText={"Выдать спецодежду"}>
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
            {receivingData ?
                <ReceivingList receiving={receivingData} setReceiving={setReceivingData}/>
                :
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                    Нет данных
                </Typography>
            }
            <SimpleSnackBar
                snackState={snackState}
                setSnackState={setSnackState}
                successText={"Вы успешно выдали спецодежду"}
                errorText={"Вы не заполнили необходимые поля или ввели некорректные данные!"}
            />
        </div>
    )
})

export default Receiving