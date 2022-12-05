import React, {useContext, useState} from 'react'
import WearList from "../components/wear/WearList"
import {Button, Typography} from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import CreateNewEntityModal from "../components/UI/modal/CreateNewEntityModal"
import CreateSpecialwearForm from "../components/wear/CreateSpecialwearForm"
import SimpleSnackBar from "../components/UI/snackbar/SimpleSnackBar"
import {createNewSpecialWear, fetchOneWear} from "../http/wearAPI"
import {observer} from "mobx-react-lite"
import {Context} from "../index"


const Wear = observer(() => {

    const {user} = useContext(Context)

    const [wears, setWears] = useState([])

    const [wearType, setWearType] = useState('')
    const [wearPrice, setWearPrice] = useState('')
    const [wearTime, setWearTime] = useState('')

    const [snackState, setSnackState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        success: false
    })

    const handleSnackClick = (newState) => {
        setSnackState({ openSnack: true, ...newState })
    }

    const [isOpenCreateWorkerModal, setIsOpenCreateWorkerModal] = useState(false)
    const handleCreateSpecialwearModalOpen = () => setIsOpenCreateWorkerModal(true)
    const handleCreateSpecialwearModalClose = () => setIsOpenCreateWorkerModal(false)

    const createSpecialwearButtonHandler = () => {
        if (wearType && wearPrice && wearTime) {
            createNewSpecialWear(wearType, wearTime, wearPrice).then((wearId) => {
                handleSnackClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                    success: true
                })
                return wearId
            }).then((createdWearId) => {
                fetchOneWear(createdWearId).then((wearData) => {
                    setWears([...wearData, ...wears])
                })
            })
        } else {
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
        }
        handleCreateSpecialwearModalClose()
        setWearType('')
        setWearPrice('')
        setWearTime('')
    }

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div">
                Список спецодежды
                <span> </span>
                {user.user.role === "ADMIN" &&
                    <Button variant="text" startIcon={<ControlPointIcon/>} onClick={handleCreateSpecialwearModalOpen}>Добавить спецодежду</Button>
                }
            </Typography>
            <CreateNewEntityModal isOpen={isOpenCreateWorkerModal} handleClose={handleCreateSpecialwearModalClose} buttonHandler={createSpecialwearButtonHandler}  title={"Добавить спецодежду"} sendButtonText={"Добавить спецодежду"}>
                <CreateSpecialwearForm wearType={wearType} setWearType={setWearType} wearPrice={wearPrice} setWearPrice={setWearPrice} wearTime={wearTime} setWearTime={setWearTime}/>
            </CreateNewEntityModal>
            <WearList wears={wears} setWears={setWears}/>
            <SimpleSnackBar
                snackState={snackState}
                setSnackState={setSnackState}
                successText={"Вы успешно дабавили новую спецодежду"}
                errorText={"Вы не заполнили необходимые поля!"}
            />
        </div>
    )
})

export default Wear