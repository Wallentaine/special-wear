import React, {useContext} from 'react'
import { Divider, Drawer, List, ListItem, ListItemText } from "@mui/material"
import {Link} from "react-router-dom"
import {POST_ROUTE, RECEIVING_ROUTE, REPORTS_ROUTE, WEAR_ROUTE, WORKER_ROUTE, WORKSHOP_ROUTE} from "../../utils/routes"
import {Context} from "../../index"



const NavigationMenu = (props) => {
    const {
        isMenuOpen,
        closeMenu = Function.prototype
    } = props

    const {user} = useContext(Context)

    return (
        <Drawer
            anchor="right"
            open={isMenuOpen}
            onClose={closeMenu}
        >
            <List sx={{ width: '100%', minWidth: 350, maxWidth: 600, bgcolor: 'background.paper' }}>
                <ListItem>
                    <ListItemText primary="Панель навигации"/>
                </ListItem>
                <Divider/>
                <ListItem>
                    <Link to={WORKER_ROUTE}>
                        <ListItemText primary="Сотрудники"/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={WEAR_ROUTE}>
                        <ListItemText primary="Спецодежда"/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={RECEIVING_ROUTE}>
                        <ListItemText primary="Получение спецодежды"/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={WORKSHOP_ROUTE}>
                        <ListItemText primary="Цеха"/>
                    </Link>
                </ListItem>
                <ListItem>
                    <Link to={POST_ROUTE}>
                        <ListItemText primary="Должности"/>
                    </Link>
                </ListItem>
                <Divider/>

                {user.user.role === "ADMIN" &&
                    <ListItem>
                        <Link to={REPORTS_ROUTE}>
                            <ListItemText primary="Формирование отчётов"/>
                        </Link>
                    </ListItem>
                }
            </List>
        </Drawer>
    )
}

export default NavigationMenu