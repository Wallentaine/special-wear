import {
    AUTH_ROUTE,
    ERROR_ROUTE,
    MAIN_ROUTE,
    POST_ROUTE,
    RECEIVING_ROUTE, REPORTS_ROUTE,
    WEAR_ROUTE,
    WORKER_ROUTE,
    WORKSHOP_ROUTE
} from "../utils/routes"
import Worker from "../pages/Worker"
import Error from "../pages/Error"
import Post from "../pages/Post"
import Wear from "../pages/Wear"
import Receiving from "../pages/Receiving"
import Workshop from "../pages/Workshop"
import UserPage from "../pages/UserPage"
import Auth from "../pages/Auth"
import WorkshopInfo from "../pages/WorkshopInfo"
import Reports from "../pages/Reports";

export const unAuthorizedRoutes = [
    {
        path: AUTH_ROUTE,
        Component: Auth
    }
]

export const publicRoutes = [
    {
        path: ERROR_ROUTE,
        Component: Error
    }
]

export const privateRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Worker
    },
    {
        path: WORKER_ROUTE,
        Component: Worker
    },
    {
        path: WORKER_ROUTE + '/:id',
        Component: UserPage
    },
    {
        path: POST_ROUTE,
        Component: Post
    },
    {
        path: WEAR_ROUTE,
        Component: Wear
    },
    {
        path: RECEIVING_ROUTE,
        Component: Receiving
    },
    {
        path: WORKSHOP_ROUTE,
        Component: Workshop
    },
    {
        path: WORKSHOP_ROUTE + '/:id',
        Component: WorkshopInfo
    }
]

export const adminRoutes = [
    {
        path: REPORTS_ROUTE,
        Component: Reports
    }
]