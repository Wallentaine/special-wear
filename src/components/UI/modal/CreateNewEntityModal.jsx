import React from 'react'
import {Box, Button, Modal, Typography} from "@mui/material"

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

const CreateNewEntityModal = ({children, ...props}) => {

    const {
        isOpen,
        handleClose,
        buttonHandler
    } = props

    return (
        <Modal
            open={isOpen}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{outline: "none"}}
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2" color="text.secondary" sx={{marginBottom: 2}}>
                    {props.title}
                </Typography>
                {children}
                <Button onClick={buttonHandler} variant="contained" sx={{width: '100%'}}>{props.sendButtonText}</Button>
            </Box>
        </Modal>
    )
}

export default CreateNewEntityModal