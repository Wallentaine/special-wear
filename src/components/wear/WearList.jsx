import React, {useEffect, useState} from 'react'
import {Grid} from "@mui/material"
import WearCard from "./WearCard"
import {fetchAllWear} from "../../http/wearAPI"
import TableLoader from "../UI/loader/TableLoader"
import DefaultPagination from "../UI/pagination/DefaultPagination"

const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

const WearList = ({wears, setWears}) => {

    const [isLoading, setIsLoading] = useState(true)

    const limitElementsOnPage = 10
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)

    // Костыль с элементами на странице, дедлайн горит, нет времени переписывать нормально сервер(
    useEffect(() => {
        fetchAllWear().then((wearData) => {
            const wearOnPage = wearData.slice(currentPage * limitElementsOnPage - limitElementsOnPage, currentPage * limitElementsOnPage)
            setTotalPages(getPageCount(wearData.length, limitElementsOnPage))
            setWears(wearOnPage)
        }).finally(() => setIsLoading(false))
    }, [currentPage, setWears])

    if (isLoading) return <TableLoader/>

    return (
        <>
            <Grid container columnSpacing={2} rowSpacing={2}>
                {wears && wears.map(item =>
                    <WearCard key={item.id} wearId={item.id} type={item.type} wearTime={item.wear_time} price={item.price} wears={wears} setWears={setWears}/>
                )}
                <Grid item xs={12} sm={12} md={12} lg={12} sx={{display: 'flex', justifyContent: 'center', marginTop: 2}}>
                    <DefaultPagination totalPages={totalPages} page={currentPage} setPage={setCurrentPage}/>
                </Grid>
            </Grid>
        </>
    )
}

export default WearList