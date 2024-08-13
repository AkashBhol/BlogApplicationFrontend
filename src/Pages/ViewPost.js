import { Box, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewPost = () => {
    const { id } = useParams();
    const [payload, setPayload] = useState([]);

    useEffect(() => {
        loadData();
    }, [])

    const loadData = () => {
        axios.get("http://localhost:8089/api/v2/get/Singlepost?id=" + id, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            },
        }).then((res) => {
            setPayload(res?.data?.data)
        })
    }

    return (
        <>
            <Box mt={2}>
                <Typography variant="fieldLabel">id:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.id ? payload.code : "-"}
            </Typography>

            <Box mt={2}>
                <Typography variant="fieldLabel">content:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.content ? payload.content : "-"}
            </Typography>
            <Box mt={2}>
                <Typography variant="fieldLabel">about:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.about ? payload.about : "-"}
            </Typography>
        </>
    )
}
export default ViewPost;