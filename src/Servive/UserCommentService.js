import axios from "axios"

export const getAllPosts = () => {
    return axios.get("http://localhost:8089/api/v2/get/post", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const createComment = (payload) => {
    return axios.post("http://localhost:8089/api/v2/create/comment", payload, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const getAllComment = (page, pageSize) => {
    return axios.get("http://localhost:8089/api/v2/get/comment/all?page=" + page + "&pageSize=" + pageSize, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const deleteComment = (id) => {
    return axios.delete("http://localhost:8089/api/v2/delete/comment?id=" + id, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const getSingleComment = (id) => {
    return axios.get("http://localhost:8089/api/v2/get/single/comment?id=" + id, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const updateComment = (id) => {
    return axios.put("http://localhost:8089/api/v2/put/comment?id=" + id, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const getAllsPost = () => {
    return axios.get("http://localhost:8089/api/v2/post/all", {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}