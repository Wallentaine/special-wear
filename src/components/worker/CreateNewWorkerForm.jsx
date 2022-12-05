import React, {useEffect, useState} from 'react'
import {FormControl, InputLabel, MenuItem, Select, TextField} from "@mui/material"
import {fetchAllWorkshops} from "../../http/workshopAPI";
import {fetchAllPosts} from "../../http/postAPI";

const CreateNewWorkerForm = (props) => {
    const {
        post,
        setPost,
        workshop,
        setWorkshop,
        fullName,
        setFullName
    } = props

    const [workshops, setWorkshops] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetchAllWorkshops().then((data) => {
            setWorkshops(data)
        })
    }, [])

    useEffect(() => {
        fetchAllPosts().then((data) => {
            setPosts(data)
        })
    }, [])

    const handleChangePost = (event) => {
        setPost(event.target.value)
    }

    const handleChangeWorkshop = (event) => {
        setWorkshop(event.target.value)
    }

    return (
        <>
            <TextField value={fullName} onChange={(e) => setFullName(e.target.value)} id="standard-basic" label="ФИО сотрудника" variant="standard" sx={{width: '100%', marginBottom: 2}} />
            <FormControl variant="standard" sx={{ minWidth: "100%", marginBottom: 2 }}>
                <InputLabel id="demo-simple-select-standard-label">Выберите цех</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    value={workshop.length ? workshop : ''}
                    onChange={handleChangeWorkshop}
                    label="Выберите цех"
                >
                    <MenuItem value={``}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {workshops && workshops.map((item) =>
                        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ minWidth: "100%", marginBottom: 4 }}>
                <InputLabel id="demo-simple-select-standard-label1">Выберите должность</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label1"
                    id="demo-simple-select-standard1"
                    value={post.length ? post : ''}
                    onChange={handleChangePost}
                    label="Выберите должность"
                >
                    <MenuItem value={``}>
                        <em>Не выбрано</em>
                    </MenuItem>
                    {posts && posts.map((item) =>
                        <MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>
                    )}
                </Select>
            </FormControl>
        </>
    )
}

export default CreateNewWorkerForm