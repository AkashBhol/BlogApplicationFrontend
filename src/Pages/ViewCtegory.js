import { Box, Grid, Typography } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewCtegory = () => {
    const { id } = useParams();
    const [payload, setPayload] = useState([]);
    useEffect(() => {
        if (id) {
            loadData();
        }
    }, [id])
    const loadData = () => {
        debugger
        axios.get("http://localhost:8089/api/v2/get/single", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            },
            params: {
                id: id
            }
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
                <Typography variant="fieldLabel">Title:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.title ? payload.title : "-"}
            </Typography>
            <Box mt={2}>
                <Typography variant="fieldLabel">categoryDescriptions:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.categoryDescriptions ? payload.categoryDescriptions : "-"}
            </Typography>
        </>
    )
}
export default ViewCtegory;