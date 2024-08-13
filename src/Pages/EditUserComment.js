import { Autocomplete, Button, Grid, TextField } from "@mui/material"
import { useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { useParams } from "react-router-dom";
import { getAllPosts, getSingleComment } from "../Servive/UserCommentService";

const EditUserComment = () => {
    const { id } = useParams();
    const [posts, setPosts] = useState([]);
    const [post, setPost] = useState(null);
    const [payload, setPayload] = useState({
        Comment: ""
    })
    const [error, setError] = useState({
        Comment: ""
    })

    const handleChange = (event) => {
        const name = event.target.name;
        setPayload({
            ...payload,
            [name]: event.target.value,
        });
        setError({
            ...error,
            [name]: ""
        })
    }
    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }))
    }

    useEffect(() => {
        loadData();
        loadSingleComment();
    }, [])

    const loadData = () => {
        getAllPosts().then((res) => {
            setPosts(res?.data?.data);
        }).catch((error) => {
            alert("this is an error" + error);
        })
    }

    const loadSingleComment = () => {
        getSingleComment(id).then((res) => {
            setPayload(res?.data?.data)
            alert(JSON.stringify(res?.data?.data))
        })
    }

    const handleEdit = () => {

    }
    return (
        <MainContent title="EditComment">
            <Grid container spacing={2} px={2}>
                <CustomInput
                    id="comment"
                    required
                    label="Comment"
                    size="small"
                    name="comment"
                    error={error.Comment}
                    resetError={() => resetError("comment")}
                    value={payload.Comment}
                    handleChange={handleChange}
                >
                </CustomInput>
                <Autocomplete
                    options={posts}
                    value={post || null}
                    onChange={(e, v) => {
                        setPost(v);
                    }}
                    getOptionLabel={(option) => option.content}
                    renderInput={(params) => <TextField{...params} label="Post" />}
                    sx={{ width: 300 }}
                >
                </Autocomplete>
            </Grid>
            <Button onClick={handleEdit}>Edit</Button>
        </MainContent>
    )
}
export default EditUserComment;