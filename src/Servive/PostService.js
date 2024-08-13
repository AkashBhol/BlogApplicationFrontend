import axios from "axios"

export const getPostById = (id) => {
    return axios.get("http://localhost:8089/api/v2/get/Singlepost?id=" + id, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}

export const editPost = (id, payload) => {
    debugger
    return axios.put("http://localhost:8089/api/v2/upadte/post?id=" + id, payload,{
        headers: {
            Authorization: "Bearer " + localStorage.getItem("authToken")
        }
    })
}