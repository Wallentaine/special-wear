import React, {useContext, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {Box, Button, TextField, Typography} from "@mui/material"
import {login, registration} from "../../http/userAPI"
import {Context} from "../../index"
import {MAIN_ROUTE} from "../../utils/routes"
import SimpleSnackBar from "../UI/snackbar/SimpleSnackBar"
import {observer} from "mobx-react-lite"

const AuthForm = observer(() => {

    const {user} = useContext(Context)

    const navigate = useNavigate()

    const [isLoginPage, setIsLoginPage] = useState(true)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [snackState, setSnackState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        success: false
    })

    const handleSnackClick = (newState) => {
        setSnackState({ openSnack: true, ...newState })
    }

    const [authError, setAuthError] = useState('')

    const authHandler = async (e) => {

        e.preventDefault()

        if (!email || !password) {
            setAuthError("Вы не заполнили необходимые поля")
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
            return
        }

        let data
        try {
            if (isLoginPage) {
                data = await login(email, password)
            } else {
                data = await registration(email, password)
            }

            if (data.error) {
                setAuthError(data.error)
                handleSnackClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                    success: false
                })

                return
            }

            user.setUser(data.data)
            user.setIsAuth(true)
            navigate(MAIN_ROUTE)

        } catch (error) {
            alert(error.response.data.message)
        }
    }

    return (
        <Box sx={{width: '60%', margin: "0 auto", display: 'flex', flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <Typography variant="h4" component="div" color="text.secondary" sx={{marginBottom: 2}}>
                {isLoginPage ? "Авторизация" : "Регистрация"}
            </Typography>
            <TextField
                required
                id="email-required"
                label="E-mail"
                variant="standard"
                sx={{width: "100%", marginBottom: 4}}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
                required
                id="password-required"
                type="password"
                label="Пароль"
                variant="standard"
                sx={{width: "100%", marginBottom: 6}}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Box sx={{width: '100%', display: 'flex', flexDirection: "column", alignItems: "center", justifyContent: 'center'}}>
                <Button variant="contained" sx={{width: '100%', marginBottom: 2}} onClick={authHandler}>{isLoginPage ? "Войти" : "Зарегистрироваться"}</Button>
                <Typography variant="body" component="div" fontSize="1.1rem" sx={{marginBottom: 1}}>
                    или
                </Typography>
                <Button variant="text" onClick={() => setIsLoginPage(!isLoginPage)}>
                    {isLoginPage ? "Зарегистрироваться" : "Войти"}?
                </Button>
            </Box>
            <SimpleSnackBar
                snackState={snackState}
                setSnackState={setSnackState}
                errorText={authError}
            />
        </Box>
    )
})

export default AuthForm