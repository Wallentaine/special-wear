import React, {useContext, useEffect, useState} from 'react'
import {
    Avatar,
    Grid, IconButton,
    Typography
} from "@mui/material"
import DefaultAccordion from "../components/UI/accordion/DefaultAccordion"
import WorkerWearRecordsTable from "../components/worker/WorkerWearRecordsTable"
import {Link, useNavigate, useParams} from "react-router-dom"
import {
    deleteWorkerById,
    fetchBossByWorkerId,
    fetchOneWorker,
    fetchWorkerReceiving,
    updateWorkerById
} from "../http/workerAPI"
import UserPageLoader from "../components/UI/loader/UserPageLoader"
import {WORKER_ROUTE, WORKSHOP_ROUTE} from "../utils/routes"
import BuildIcon from "@mui/icons-material/Build"
import DeleteIcon from "@mui/icons-material/Delete"
import CreateNewWorkerForm from "../components/worker/CreateNewWorkerForm"
import CreateNewEntityModal from "../components/UI/modal/CreateNewEntityModal"
import {observer} from "mobx-react-lite"
import {Context} from "../index"


const UserPage = observer(() => {

    const {user} = useContext(Context)

    const {id} = useParams()

    const navigate = useNavigate()

    const [worker, setWorker] = useState({})
    const [workerReceiving, setWorkerReceiving] = useState([])

    const [post, setPost] = useState(0)
    const [workshop, setWorkshop] = useState(0)
    const [workerFullName, setWorkerFullName] = useState("")

    const [isLoading, setIsLoading] = useState(true)

    const [isOpenCreateWorkerModal, setIsOpenCreateWorkerModal] = useState(false)

    const handleCreateWorkerModalOpen = () => {
        setIsOpenCreateWorkerModal(true)
        setWorkerFullName(worker.fullname)
        setPost(worker.post_id)
        setWorkshop(worker.workshop_id)
    }
    const handleCreateWorkerModalClose = () => {
        setIsOpenCreateWorkerModal(false)
        setWorkerFullName(worker.fullname)
        setPost(worker.post_id)
        setWorkshop(worker.workshop_id)
    }

    useEffect(() => {
        fetchOneWorker(id).then(([workerData]) => {
            fetchBossByWorkerId(workerData.id).then((workerBoss) => {
                setWorker({...workerData, workerBoss})
                return workerData
            }).then((workerData) => {
                fetchWorkerReceiving(id).then((workerReceivingData) => {
                    if (workerReceivingData) {
                        workerReceivingData.forEach((item) => {
                            item.priceWithDiscount = item.price - (item.price * workerData.discount * 0.01)
                            item.discount = workerData.discount
                        })
                        setWorkerReceiving(workerReceivingData)
                    }
                })
            }).finally(() => setIsLoading(false))
        })
    }, [id, post, workshop, workerFullName])

    if (isLoading) return <UserPageLoader/>

    const handleEditWorker = () => {
        handleCreateWorkerModalOpen()
    }

    const saveChangesButtonHandler = () => {
        if (post && workshop && workerFullName) {
            updateWorkerById(id, workshop, post, workerFullName).then(() => {
                setWorker({workshop_id: workshop, post_id: post, fullname: workerFullName, ...worker})
            })
        }
        handleCreateWorkerModalClose()
    }

    const handlerDeleteWorker = () => {
        if (!id) return;
        deleteWorkerById(id).then(() => {
            navigate(WORKER_ROUTE)
        })
    }

    return (
        <div>
            <CreateNewEntityModal isOpen={isOpenCreateWorkerModal} handleClose={handleCreateWorkerModalClose} buttonHandler={saveChangesButtonHandler} title={"Редактировать данные"} sendButtonText={"Сохранить изменения"}>
                <CreateNewWorkerForm post={post} setPost={setPost} workshop={workshop} setWorkshop={setWorkshop} fullName={workerFullName} setFullName={setWorkerFullName}/>
            </CreateNewEntityModal>

            <Typography gutterBottom variant="h4" component="div">
                {worker && worker.fullname}
                <span> </span>
                {user.user.role === "ADMIN" &&
                    <>
                        <IconButton aria-label="change" sx={{flexGrow: 4}} onClick={handleEditWorker}>
                            <BuildIcon />
                        </IconButton>
                        <span> </span>
                        <IconButton aria-label="delete" sx={{flexGrow: 4}} onClick={handlerDeleteWorker}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }

            </Typography>
            <Grid container columnSpacing={2} rowSpacing={2}>
                <Grid item xs={6} md={6} lg={6}>
                    <Avatar
                        alt="avatar"
                        src="/static/images/avatar.jpg"
                        sx={{ width: 160, height: 160}}
                    />
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <DefaultAccordion headText={"ФИО"} bodyText={worker.fullname}/>
                    <DefaultAccordion headText={"Должность"} bodyText={worker.post}/>
                    <DefaultAccordion headText={"Цех"} bodyText={
                        <Link to={WORKSHOP_ROUTE + '/' + worker.workshop_id}>
                            {worker.workshop}
                        </Link>
                    }/>
                    <DefaultAccordion headText={"Скидка на спецодежду"} bodyText={worker.discount + ' %'}/>
                    <DefaultAccordion headText={"Начальник цеха"} bodyText={worker.workerBoss ?
                        worker.workerBoss.map(item => item.fullname).join(', ')
                        :
                        "У цеха нету начальника!"
                    }/>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    <Typography
                        variant="h6"
                        component="div"
                    >
                        Отчёт о получении спецодежды
                    </Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                    {workerReceiving.length ?
                            <WorkerWearRecordsTable workerWearData={workerReceiving}/>
                        :
                            <Typography
                                variant="h6"
                                component="div"
                                color="text.secondary"
                            >
                                Этот сотрудник ещё не получал спецодежду
                            </Typography>
                    }
                </Grid>
            </Grid>
        </div>
    )
})

export default UserPage