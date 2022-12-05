import React, {createContext} from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {ThemeProvider, createTheme} from "@mui/material"
import WorkerStore from "./store/WorkerStore"
import UserStore from "./store/UserStore"

const theme = createTheme({
    palette: {
        primary: {
            main: "#303b44"
        },
        background: {
            default: "#f0f0f0",
        }
    }
})

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <React.StrictMode>
        <Context.Provider value = {{
            user: new UserStore(),
            worker: new WorkerStore()
        }}>
            <ThemeProvider theme={theme}>
                <App />
            </ThemeProvider>
        </Context.Provider>

    </React.StrictMode>
)
