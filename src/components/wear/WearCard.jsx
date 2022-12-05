import React, {useContext, useState} from 'react'
import {Box, Grid, IconButton, Typography} from "@mui/material"
import classes from './Wear.module.css'
import BuildIcon from "@mui/icons-material/Build"
import DeleteIcon from "@mui/icons-material/Delete"
import {deleteWearById, updateWearById} from "../../http/wearAPI"
import CreateSpecialwearForm from "./CreateSpecialwearForm"
import CreateNewEntityModal from "../UI/modal/CreateNewEntityModal"
import {Context} from "../../index"

const WearCard = (props) => {
    const {
        wearId,
        price,
        type,
        wearTime,
        wears,
        setWears,
    } = props

    const {user} = useContext(Context)

    const [wearType, setWearType] = useState(type)
    const [wearPrice, setWearPrice] = useState(price)
    const [wear__wearTime, setWear__wearTime] = useState(wearTime)

    const [isOpenCreateWorkerModal, setIsOpenCreateWorkerModal] = useState(false)
    const handleCreateSpecialwearModalOpen = () => setIsOpenCreateWorkerModal(true)
    const handleCreateSpecialwearModalClose = () => setIsOpenCreateWorkerModal(false)

    const wearDeleteButtonHandler = () => {
        deleteWearById(wearId).then(() => {
            setWears(wears.filter(wear => wear.id !== wearId))
        })
    }

    const wearUpdateButtonHandler = () => {
        if (wearType && wearPrice && wear__wearTime) {
            updateWearById(wearId, wearType, wear__wearTime, wearPrice).then(() => {
                setWears(wears.map((wear) => {
                    if (wear.id === wearId) {
                        wear.type = wearType
                        wear.wear_time = wear__wearTime
                        wear.price = wearPrice
                    }
                    return wear
                }))
            })
        }
        handleCreateSpecialwearModalClose()
    }

    return (
        <Grid item xs={12} sm={6} md={6} lg={6}>
            <CreateNewEntityModal isOpen={isOpenCreateWorkerModal} handleClose={handleCreateSpecialwearModalClose} buttonHandler={wearUpdateButtonHandler}  title={"Редактировать спецодежду"} sendButtonText={"Сохранить изменения"}>
                <CreateSpecialwearForm wearType={wearType} setWearType={setWearType} wearPrice={wearPrice} setWearPrice={setWearPrice} wearTime={wear__wearTime} setWearTime={setWear__wearTime}/>
            </CreateNewEntityModal>
            <Box sx={{display: 'flex', backgroundColor: 'white', padding: 1, borderRadius: "8px", alignItems: 'center'}}>
                <img className={classes.wear__card__img} src="/static/images/specialwear.png" alt="specialwear"/>
                <Box sx={{display: 'flex', flexDirection: 'column'}}>
                    <Typography variant="h5" component="div">
                        {type}
                    </Typography>
                    <Typography variant={"subtitle1"} component="div" color="text.secondary">
                        Цена: {price} ₽
                    </Typography>
                    <Typography variant={"subtitle1"} component="div" color="text.secondary">
                        Время использования: {wearTime}
                    </Typography>
                    <Box>
                        {user.user.role === "ADMIN" &&
                            <>
                                <IconButton aria-label="change" onClick={handleCreateSpecialwearModalOpen}>
                                    <BuildIcon />
                                </IconButton>
                                <span> </span>
                                <IconButton aria-label="delete" onClick={wearDeleteButtonHandler}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                        }
                    </Box>
                </Box>
            </Box>
        </Grid>
    )
}

export default WearCard