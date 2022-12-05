import './App.css'
import Layout from "./components/layout/Layout"
import {BrowserRouter} from "react-router-dom"
import {useContext, useEffect, useState} from "react"
import {Context} from "./index"
import {check} from "./http/userAPI"
import {observer} from "mobx-react-lite"
import {Backdrop, CircularProgress} from "@mui/material"

const App = observer(() => {

    const {user} = useContext(Context)

    const [loading, setLoading] = useState(true)

    useEffect(() => {
        check().then(data => {
            if (data) {
                user.setUser(data.data)
                user.setIsAuth(true)
            }
        }).finally(() => setLoading(false))
    }, [user])

    if (loading) return (
        <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={loading}
        >
            <CircularProgress color="inherit" />
        </Backdrop>
    )

    return (
        <div className="App">
            <BrowserRouter>
                <Layout/>
            </BrowserRouter>
        </div>
    )
})

export default App
