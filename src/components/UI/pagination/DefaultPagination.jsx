import React from 'react'
import {Pagination} from "@mui/material"

const DefaultPagination = ({totalPages, page, setPage}) => {

    return (
        <div>
            <Pagination
                count={totalPages}
                page={page}
                onChange={(_, num) => {setPage(num)}}
                variant="outlined"
                shape="rounded"
                color="primary"
            />
        </div>
    )
}

export default DefaultPagination