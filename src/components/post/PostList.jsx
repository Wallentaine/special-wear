import React, {useContext, useState} from 'react'
import {
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow, Typography
} from "@mui/material"
import BuildIcon from "@mui/icons-material/Build"
import DeleteIcon from "@mui/icons-material/Delete"
import {deletePostById, updatePostById} from "../../http/postAPI"
import CreateNewEntityModal from "../UI/modal/CreateNewEntityModal"
import CreateNewPostForm from "./CreateNewPostForm"
import {Context} from "../../index"

const PostList = ({posts, setPosts}) => {

    const {user} = useContext(Context)

    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const [workerPost, setWorkerPost] = useState('')
    const [postDiscount, setPostDiscount] = useState(0)
    const [postId, setPostId] = useState(0)

    const [isOpenUpdatePostModal, setIsOpenUpdatePostModal] = useState(false)

    const handleChangePostModalOpen = (id) => {
        setPostId(id)
        const [currentPost] = posts.filter(post => post.id === id)
        setWorkerPost(currentPost.title)
        setPostDiscount(currentPost.discount_percent)
        setIsOpenUpdatePostModal(true)
    }
    const handleChangePostModalClose = () => setIsOpenUpdatePostModal(false)

    const handleChangePage = (event, newPage) => setPage(newPage)

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value)
        setPage(0)
    }

    const updatePostButtonHandler = () => {
        if (workerPost && postDiscount && postId) {
            updatePostById(postId, workerPost, postDiscount).then((newPostId) => {
                setPosts(posts.map((post) => {
                    if (post.id === newPostId) {
                        post.title = workerPost
                        post.discount_percent = postDiscount
                    }
                    return post
                }))
            })
        }
        handleChangePostModalClose()
    }

    const deletePostButtonHandler = (postId) => {
        deletePostById(postId).then(() => {
            setPosts(posts.filter(post => post.id !== postId))
        })
    }

    return (
        <>
            {posts ?
                <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                    <CreateNewEntityModal isOpen={isOpenUpdatePostModal} handleClose={handleChangePostModalClose} buttonHandler={updatePostButtonHandler} title={"Редактировать спецодежду"} sendButtonText={"Сохранить изменения"}>
                        <CreateNewPostForm workerPost={workerPost} setWorkerPost={setWorkerPost} postDiscount={postDiscount} setPostDiscount={setPostDiscount}/>
                    </CreateNewEntityModal>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Должность</TableCell>
                                    <TableCell align="right">Скидка</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {posts && posts.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                                    <TableRow
                                        key={row.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{row.title}
                                            <span style={{marginRight: 16}}></span>
                                            {user.user.role === "ADMIN" &&
                                                <>
                                                    <IconButton aria-label="change" size={"small"} onClick={() => handleChangePostModalOpen(row.id)}>
                                                        <BuildIcon />
                                                    </IconButton>
                                                    <span> </span>
                                                    <IconButton aria-label="delete" size={"small"} onClick={() => deletePostButtonHandler(row.id)}>
                                                        <DeleteIcon />
                                                    </IconButton>
                                                </>
                                            }
                                        </TableCell>
                                        <TableCell align="right">{row.discount_percent} %</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        labelRowsPerPage="Кол-во записей на странице: "
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={posts.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
                :
                <Typography
                    variant="h5"
                    component="div"
                    color="text.secondary"
                >
                    Нет данных
                </Typography>
            }
        </>
    )
}

export default PostList