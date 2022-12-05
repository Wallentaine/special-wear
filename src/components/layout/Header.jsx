import React, {useContext, useState} from 'react'
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import {Link, useNavigate} from "react-router-dom"
import {AUTH_ROUTE, MAIN_ROUTE} from "../../utils/routes"
import NavigationMenu from "./NavigationMenu"
import {Context} from "../../index"
import {observer} from "mobx-react-lite"

const Header = observer(() => {
    const {user} = useContext(Context)

    const navigate = useNavigate()
    const [isMenuOpen, setMenuOpen] = useState(false)

    const logout = () => {
        user.setUser({})
        user.setIsAuth(false)
        localStorage.removeItem('token')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, ml: 2 }}
                >
                    <Link to={MAIN_ROUTE}>
                        Спецодежда
                    </Link>
                </Typography>

                {!user.isAuth ?
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => navigate(AUTH_ROUTE)}
                    >
                        <LoginIcon/>
                    </IconButton>
                    :
                    <>
                        <Typography sx={{mr: 2}}>
                            {user.user.email && user.user.email}
                        </Typography>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={logout}
                        >
                            <LogoutIcon/>
                        </IconButton>
                    </>
                }

                {user.isAuth &&
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        sx={{ mr: 2 }}
                        onClick={() => setMenuOpen(true)}
                    >
                        <MenuIcon/>
                    </IconButton>
                }

            </Toolbar>
            <NavigationMenu
                isMenuOpen={isMenuOpen}
                closeMenu={() => setMenuOpen(false)}
            />
        </AppBar>
    )
})

export default Header