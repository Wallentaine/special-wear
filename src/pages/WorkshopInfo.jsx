import React, {useContext, useEffect, useState} from 'react'
import {Box, Button, IconButton, Modal, TextField, Typography} from "@mui/material"
import {useNavigate, useParams} from "react-router-dom"
import {deleteWorkshop, fetchOneWorkshop, updateWorkshop} from "../http/workshopAPI"
import WorkshopWorkerList from "../components/workshop/WorkshopWorkerList"
import {fetchWorkersByWorkshop} from "../http/workerAPI"
import TableLoader from "../components/UI/loader/TableLoader"
import DeleteIcon from "@mui/icons-material/Delete"
import BuildIcon from '@mui/icons-material/Build'
import {WORKSHOP_ROUTE} from "../utils/routes"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    borderRadius: 2,
    padding: '24px 24px 32px 24px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

const WorkshopInfo = observer(() => {

    const {user} = useContext(Context)

    const {id} = useParams()

    const navigate = useNavigate()

    const [workshop, setWorkshop] = useState({})
    const [workshopWorkers, setWorkshopWorkers] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const [workshopTitle, setWorkshopTitle] = useState('')


    useEffect(() => {
        if (!workshop.title) {
            fetchOneWorkshop(id).then(([workshopData]) => {
                setWorkshop(workshopData)
            })
        }
        setIsLoading(false)
    }, [workshop, id])

    useEffect(() => {
        fetchWorkersByWorkshop(id).then((workersList) => {
            setWorkshopWorkers(workersList)
        })
    },[id])

    const deleteWorkshopHandler = () => {
        deleteWorkshop(id).then(() => {
            navigate(WORKSHOP_ROUTE)
        })
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => {
        setWorkshopTitle(workshop.title)
        setOpen(true)
    }

    const handleClose = () => setOpen(false)

    const saveWorkshopChangesHandler = () => {
        if (workshopTitle.length) {
            updateWorkshop(id, workshopTitle).then(() => {
                setWorkshop({title: workshopTitle})
            })
        }
        handleClose()
    }

    if (isLoading) return <TableLoader/>

    return (
        <>
            <Typography gutterBottom variant="h4" component="div">
                {workshop && workshop.title}
                <span> </span>
                {user.user.role === "ADMIN" &&
                    <>
                        <IconButton aria-label="change" sx={{flexGrow: 4}} onClick={handleOpen}>
                            <BuildIcon />
                        </IconButton>
                        <span> </span>
                        <IconButton aria-label="delete" sx={{flexGrow: 4}} onClick={deleteWorkshopHandler}>
                            <DeleteIcon />
                        </IconButton>
                    </>
                }
            </Typography>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" color="text.secondary" sx={{marginBottom: 2}}>
                        Изменить данные цеха
                    </Typography>
                    <TextField value={workshopTitle} onChange={(e) => setWorkshopTitle(e.target.value)} id="standard-basic" label="Название цеха" variant="standard" sx={{width: '100%', marginBottom: 4}} />
                    <Button variant="contained" sx={{width: '100%'}} onClick={saveWorkshopChangesHandler}>Сохранить изменения</Button>
                </Box>
            </Modal>
            {workshopWorkers ?
                <WorkshopWorkerList workers={workshopWorkers}/>
                :
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                    Нет данных
                </Typography>
            }

        </>
    )
})

export default WorkshopInfo