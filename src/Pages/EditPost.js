import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import CustomInput from "../Validation/CustomInput";
import { useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { editPost, getPostById } from "../Servive/PostService";
import Swal from "sweetalert2";
import { useSnackbar } from "notistack";

const EditPost = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState(null);
    const [email, setEmail] = useState("");
    const [payload, setPayload] = useState({
        content: "",
        about: "",
        title: "",
        userEmail: "",
        category: null
    });

    const [error, setError] = useState({
        content: "",
        about: "",
        title: "",
        userEmail: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        setPayload({
            ...payload,
            [name]: event.target.value,
        });

        setError({
            ...error,
            [name]: ""
        });
    };

    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }));
    };

    useEffect(() => {
        axios.get("http://localhost:8089/api/v2/get/alls", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            setCategories(res.data.data);
        });
        getData();
    }, []);

    const getData = () => {
        getPostById(id).then((res) => {
            setPayload(res?.data?.data);
            setCategory(res?.data?.data?.category || null);
        });
    };

    const handleSubmit = () => {
        let request = {
            ...payload,
            category: category
        };
        editPost(id, request).then((res) => {
            enqueueSnackbar("Updated", { variant: "success" })
            navigate("/post");
        }).catch((error) => {
        });
    };

    return (
        <MainContent title="Edit Post">
            <Grid container spacing={2} px={2}>
                <CustomInput
                    id="content"
                    required
                    label="Content"
                    size="small"
                    name="content"
                    error={error.content}
                    resetError={() => resetError("content")}
                    value={payload.content}
                    handleChange={handleChange}
                    inputProps={{ maxLength: 30 }}
                    helperText={error.content}
                    placeholder="Enter content"
                />
                <CustomInput
                    id="about"
                    required
                    label="About"
                    size="small"
                    name="about"
                    error={error.about}
                    resetError={() => resetError("about")}
                    value={payload.about}
                    handleChange={handleChange}
                    inputProps={{ maxLength: 30 }}
                    helperText={error.about}
                    placeholder="Enter about"
                />
                <Autocomplete style={{ paddingTop: "20px" }}
                    options={categories}
                    value={category}
                    onChange={(e, v) => {
                        setCategory(v);
                        setPayload((prevPayload) => ({
                            ...prevPayload,
                            category: v
                        }));
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} label="Category" />}
                    sx={{ width: 300 }}
                />

            </Grid>
            <Box mb={2}>
                <Button onClick={handleSubmit}>Edit</Button>
                <Button onClick={() => navigate("/post")}>Back</Button>
            </Box>
        </MainContent>
    );
};

export default EditPost;
