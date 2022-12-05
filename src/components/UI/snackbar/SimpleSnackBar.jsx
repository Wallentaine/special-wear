import React from 'react'
import {Alert, Snackbar} from "@mui/material"

const SimpleSnackBar = (props) => {

    const {
        setSnackState,
        snackState,
        successText,
        errorText,
    } = props

    const { vertical, horizontal, openSnack, success } = snackState

    const handleSnackClose = () => {
        setSnackState({ ...snackState, openSnack: false })
    }

    return (
        <Snackbar
            anchorOrigin={{ vertical, horizontal }}
            open={openSnack}
            autoHideDuration={6000}
            onClose={handleSnackClose}
            key={vertical + horizontal}
        >
            {success ?
                <Alert severity="success" sx={{ width: 600, fontSize: 18 }}>
                    {successText}
                </Alert>
                :
                <Alert severity="error" sx={{ width: 600, fontSize: 18 }}>
                    {errorText}
                </Alert>
            }
        </Snackbar>
    )
}

export default SimpleSnackBar