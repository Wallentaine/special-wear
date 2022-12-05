import React, {useContext, useEffect, useState} from 'react'
import WorkerList from "../components/worker/WorkerList"
import {createNewWorker, fetchOneWorker, fetchWorkers} from "../http/workerAPI"
import {Context} from "../index"
import {observer} from "mobx-react-lite"
import {Button, Typography} from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import CreateNewEntityModal from "../components/UI/modal/CreateNewEntityModal"
import CreateNewWorkerForm from "../components/worker/CreateNewWorkerForm"
import SimpleSnackBar from "../components/UI/snackbar/SimpleSnackBar"
import WorkerFiltersForm from "../components/worker/WorkerFiltersForm"

const Worker = observer(() => {

    const {user} = useContext(Context)
    const {worker} = useContext(Context)

    const [isOpenCreateWorkerModal, setIsOpenCreateWorkerModal] = useState(false)
    const handleCreateWorkerModalOpen = () => setIsOpenCreateWorkerModal(true)
    const handleCreateWorkerModalClose = () => setIsOpenCreateWorkerModal(false)

    const [post, setPost] = useState(0)
    const [workshop, setWorkshop] = useState(0)
    const [workerFullName, setWorkerFullName] = useState('')

    // filter
    const [isOpenFilterBlock, setIsOpenFilterBlock] = useState(false)
    const [discountSlider, setDiscountSlider] = useState([0, 100])
    const [isCheckedGettingWear, setCheckedGettingWear] = useState(false)
    const [filterMonth, setFilterMonth] = useState(0)

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
        if (!isCheckedGettingWear && !filterMonth && (discountSlider[0] === 0 && discountSlider[1] === 100)) {
            fetchWorkers().then((workersData) => worker.setWorkers(workersData))
        }
    }, [worker, isCheckedGettingWear, filterMonth, discountSlider])

    const createUserButtonHandler = () => {
        if (post && workshop && workerFullName) {
            createNewWorker(workshop, post, workerFullName).then((newWorkerId) => {
                handleSnackClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                    success: true
                })
                return newWorkerId
            }).then((newWorkerId) => {
                fetchOneWorker(newWorkerId).then((workerData) => {
                    worker.setWorkers([...worker.workers, ...workerData])
                })
            })
        } else {
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
        }
        handleCreateWorkerModalClose()
        setPost(0)
        setWorkshop(0)
        setWorkerFullName('')
    }

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div">
                Сотрудники
                <span> </span>
                {user.user.role === "ADMIN" &&
                    <Button variant="text" startIcon={<ControlPointIcon/>} onClick={handleCreateWorkerModalOpen}>Добавить сотрудника</Button>
                }
            </Typography>
            <CreateNewEntityModal isOpen={isOpenCreateWorkerModal} handleClose={handleCreateWorkerModalClose} buttonHandler={createUserButtonHandler} title={"Добавить сотрудника"} sendButtonText={"Добавить сотрудника"}>
                <CreateNewWorkerForm post={post} setPost={setPost} workshop={workshop} setWorkshop={setWorkshop} fullName={workerFullName} setFullName={setWorkerFullName}/>
            </CreateNewEntityModal>

            <Button variant="contained" sx={{marginTop: "auto", marginBottom: 2}} onClick={() => setIsOpenFilterBlock(!isOpenFilterBlock)}>
                {!isOpenFilterBlock ? 'Открыть фильтры' : 'Закрыть фильтры'}
            </Button>
            <WorkerFiltersForm
                isOpenFilterBlock={isOpenFilterBlock}
                setIsOpenFilterBlock={setIsOpenFilterBlock}
                discountSlider={discountSlider}
                setDiscountSlider={setDiscountSlider}
                isCheckedGettingWear={isCheckedGettingWear}
                setCheckedGettingWear={setCheckedGettingWear}
                filterMonth={filterMonth}
                setFilterMonth={setFilterMonth}
            />

            <WorkerList/>
            <SimpleSnackBar
                snackState={snackState}
                setSnackState={setSnackState}
                successText={"Вы успешно дабавили нового сотрудника"}
                errorText={"Вы не заполнили необходимые поля!"}
            />
        </div>
    )
})

export default Worker