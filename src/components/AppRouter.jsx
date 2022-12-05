import React, {useContext} from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import {adminRoutes, privateRoutes, publicRoutes, unAuthorizedRoutes} from "../router/index"
import {AUTH_ROUTE, ERROR_ROUTE} from "../utils/routes"
import {observer} from "mobx-react-lite"
import {Context} from "../index"

const AppRouter = observer(() => {

    const {user} = useContext(Context)

    return (
        <Routes>
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>}/>
            )}
            {!user.isAuth && unAuthorizedRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}/>
            )}
            {user.isAuth && privateRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}/>
            )}
            {user.isAuth && user.user.role === "ADMIN" && adminRoutes.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component />}/>
            )}

            {!user.isAuth ?
                <Route path="*" element={<Navigate to={AUTH_ROUTE}/>}/>
                :
                <Route path="*" element={<Navigate to={ERROR_ROUTE}/>}/>
            }
        </Routes>
    )
})

export default AppRouter