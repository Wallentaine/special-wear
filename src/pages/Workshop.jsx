import React, {useState, useEffect, useContext} from 'react'
import WorkshopList from "../components/workshop/WorkshopList"
import {Alert, Box, Button, Modal, Snackbar, TextField, Typography} from "@mui/material"
import ControlPointIcon from '@mui/icons-material/ControlPoint'
import {createWorkshop, fetchAllWorkshops} from "../http/workshopAPI"
import CardsLoader from "../components/UI/loader/CardsLoader"
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

const Workshop = observer(() => {

    const {user} = useContext(Context)

    const [snackState, setSnackState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        success: false
    })

    const { vertical, horizontal, openSnack, success } = snackState

    const handleSnackClick = (newState) => {
        setSnackState({ openSnack: true, ...newState })
    }

    const handleSnackClose = () => {
        setSnackState({ ...snackState, openSnack: false })
    }

    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    const [workshopTitle, setWorkshopTitle] = useState('')

    const [workshops, setWorkshops] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    const addWorkshopButtonClickHandler = () => {
        handleClose()
        if (workshopTitle.length) {
            createWorkshop(workshopTitle).then((data) => {
                console.log(data)
            })
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: true
            })
        } else {
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
        }
        setWorkshopTitle('')
    }

    useEffect(() => {
        fetchAllWorkshops().then((workshopsData) => {
            setWorkshops(workshopsData)
        }).finally(() => setIsLoading(false))
    }, [workshops])

    if (isLoading) return <CardsLoader/>

    return (
        <>
            <Typography gutterBottom variant="h4" component="div">
                Список цехов
                {user.user.role === "ADMIN" &&
                    <Button variant="text" startIcon={<ControlPointIcon/>} onClick={handleOpen}>Добавить цех</Button>
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
                        Добавить цех
                    </Typography>
                    <TextField value={workshopTitle} onChange={(e) => setWorkshopTitle(e.target.value)} id="standard-basic" label="Название цеха" variant="standard" sx={{width: '100%', marginBottom: 4}} />
                    <Button variant="contained" sx={{width: '100%'}} onClick={addWorkshopButtonClickHandler}>Добавить цех</Button>
                </Box>
            </Modal>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openSnack}
                autoHideDuration={6000}
                onClose={handleSnackClose}
                key={vertical + horizontal}
            >
                {success ?
                    <Alert severity="success" sx={{ width: 600, fontSize: 18 }}>
                        Вы успешно добавили новый цех
                    </Alert>
                    :
                    <Alert severity="error" sx={{ width: 600, fontSize: 18 }}>
                        Вы не ввели необходимые данные
                    </Alert>
                }
            </Snackbar>

            <WorkshopList workshops={workshops}/>
        </>
    )
})

export default Workshop