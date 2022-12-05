import React, {useContext, useState} from 'react'
import {Grid} from "@mui/material"
import WorkerCard from "./WorkerCard"
import {Context} from "../../index"
import {observer} from "mobx-react-lite"
import DefaultPagination from "../UI/pagination/DefaultPagination"

const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

const WorkerList = observer(() => {
    const {worker} = useContext(Context)

    const limitElementsOnPage = 6
    const [currentPage, setCurrentPage] = useState(1)
    const totalPages = getPageCount(worker.workers.length, limitElementsOnPage)

    return (
        <Grid container columnSpacing={2} rowSpacing={2}>
            {worker.workers && worker.workers.slice(currentPage * limitElementsOnPage - limitElementsOnPage, currentPage * limitElementsOnPage).map(({id, fullname, post}) =>
                <WorkerCard key={id} id={id} fullName={fullname} post={post}/>
            )}
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                <DefaultPagination totalPages={totalPages} page={currentPage} setPage={setCurrentPage}/>
            </Grid>
        </Grid>
    )
})

export default WorkerList