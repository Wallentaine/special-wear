import React, {useState, useEffect, useContext} from 'react'
import PostList from "../components/post/PostList"
import {Button, Typography} from "@mui/material"
import ControlPointIcon from "@mui/icons-material/ControlPoint"
import CreateNewEntityModal from "../components/UI/modal/CreateNewEntityModal"
import CreateNewPostForm from "../components/post/CreateNewPostForm"
import SimpleSnackBar from "../components/UI/snackbar/SimpleSnackBar"
import {createNewPost, fetchAllPosts, fetchPostById} from "../http/postAPI"
import UserPageLoader from "../components/UI/loader/UserPageLoader"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const Post = observer(() => {

    const {user} = useContext(Context)

    const [posts, setPosts] = useState([])

    const [isOpenCreateWorkerModal, setIsOpenCreateWorkerModal] = useState(false)
    const handleCreatePostModalOpen = () => setIsOpenCreateWorkerModal(true)
    const handleCreatePostModalClose = () => setIsOpenCreateWorkerModal(false)
    const [workerPost, setWorkerPost] = useState('')
    const [postDiscount, setPostDiscount] = useState(0)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchAllPosts().then((postsData) => {
            setPosts(postsData)
        }).finally(() => setIsLoading(false))
    }, [])

    const [snackState, setSnackState] = useState({
        openSnack: false,
        vertical: 'bottom',
        horizontal: 'right',
        success: false
    })

    const handleSnackClick = (newState) => {
        setSnackState({ openSnack: true, ...newState })
    }

    const createNewPostButtonHandler = () => {
        if (workerPost && postDiscount && postDiscount <= 60) {
            createNewPost(workerPost, postDiscount).then((postId) => {
                handleSnackClick({
                    vertical: 'bottom',
                    horizontal: 'right',
                    success: true
                })
                return postId
            }).then((newPostId) => {
                fetchPostById(newPostId).then((postData) => {
                    setPosts([...postData, ...posts])
                })
            })
        } else {
            handleSnackClick({
                vertical: 'bottom',
                horizontal: 'right',
                success: false
            })
        }
        setPostDiscount(0)
        setWorkerPost('')
        handleCreatePostModalClose()
    }

    if (isLoading) return <UserPageLoader/>

    return (
        <div>
            <Typography gutterBottom variant="h4" component="div">
                Список должностей
                <span> </span>
                {user.user.role === "ADMIN" && <Button variant="text" startIcon={<ControlPointIcon/>} onClick={handleCreatePostModalOpen}>Добавить должность</Button>}
            </Typography>
            <CreateNewEntityModal isOpen={isOpenCreateWorkerModal} handleClose={handleCreatePostModalClose} buttonHandler={createNewPostButtonHandler} title={"Добавить должность"} sendButtonText={"Добавить должность"}>
                <CreateNewPostForm workerPost={workerPost} setWorkerPost={setWorkerPost} postDiscount={postDiscount} setPostDiscount={setPostDiscount}/>
            </CreateNewEntityModal>
            <PostList posts={posts} setPosts={setPosts}/>
            <SimpleSnackBar
                snackState={snackState}
                setSnackState={setSnackState}
                successText={"Вы успешно добавили новую должность"}
                errorText={"Вы не заполнили необходимые поля или ввели некорректные данные!"}
            />
        </div>
    )
})

export default Post