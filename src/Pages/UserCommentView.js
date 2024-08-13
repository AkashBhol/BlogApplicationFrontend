import { Box, Grid, Typography } from "@mui/material"
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getSingleComment } from "../Servive/UserCommentService";


const UserCommentView = () => {
    const { id } = useParams();
    const [payload, setPayload] = useState({
        id: "",
        comment: ""
    });

    getSingleComment(id).then((res) => {
        setPayload(res?.data?.data)
    })

    return (
        <>
            <Box mt={2}>
                <Typography variant="fieldLabel">id:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.id ? payload.code : "-"}
            </Typography>

            <Box mt={2}>
                <Typography variant="fieldLabel">comment:</Typography>
            </Box>
            <Typography variant="fieldValue">
                {payload && payload.comment ? payload.comment : "-"}
            </Typography>

        </>
    )
}
export default UserCommentView;
