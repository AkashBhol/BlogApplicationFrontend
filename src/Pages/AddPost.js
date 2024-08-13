import { Autocomplete, Box, Button, Grid, InputLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import CommonUtil from "../Validation/CommonUtil";
import Swal from "sweetalert2";

const AddPost = () => {
    const navigate = useNavigate();
    const [categories, SetCategories] = useState([]);
    const [category, setCategory] = useState();
    const [email, setEmail] = useState();
    const [payload, setPayload] = useState({
        content: "",
        about: "",
        title: null,
        userEmail: ""
    })

    const [error, setError] = useState({
        content: "",
        about: "",
        title: "",
        userEmail: ""
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
        });
    };

    const resetError = (fieldName) => {
        setError((prevError) => ({
            ...prevError,
            [fieldName]: ""
        }));
    };

    const fetchDetails = () => {
        const user = CommonUtil.decodeToken();
        const email_ = user?.email;
        setEmail(email_);
    }

    useEffect(() => {
        axios.get("http://localhost:8089/api/v2/get/alls", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            SetCategories(res.data.data);
        })
        fetchDetails();
    }, [])

    const handleSubmit = () => {
        let request = {
            ...payload,
            title: category?.title,
            userEmail: email
        }
        axios.post("http://localhost:8089/api/v2/create/post", request, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }
        }).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'User Login Successfully',
                showConfirmButton: false,
                timer: 3500
            });
            navigate("/post")
        })

    }
    return (
        <MainContent title="AddPosts">
            <Grid container spacing={2} px={2}>
                <CustomInput
                    id="content"
                    required
                    label="content"
                    size="small"
                    name="content"
                    error={error.content}
                    resetError={() => resetError("content")}
                    value={payload.content}
                    handleChange={handleChange}
                    inputProps={{
                        maxLength: 30,
                    }}
                    helperText={error.content}
                    // validation={"alpha-numeric-ch-th"}
                    placeholder={"Enter  content"}
                />
                <CustomInput
                    id="about"
                    required
                    label="about"
                    size="small"
                    name="about"
                    error={error.about}
                    resetError={() => resetError("about")}
                    value={payload.about}
                    handleChange={handleChange}
                    inputProps={{
                        maxLength: 30,
                    }}
                    helperText={error.about}
                    // validation={"alpha-numeric-ch-th"}
                    placeholder={"Enter  about"}
                />
                <Autocomplete
                    options={categories}
                    value={category || null}
                    onChange={(e, v) => {
                        setCategory(v)
                    }}
                    getOptionLabel={(option) => option.title}
                    renderInput={(params) => <TextField {...params} label="Title" />}
                    sx={{ width: 300 }}
                />
                <Box mb={2}>
                    <Button onClick={handleSubmit}>Submit</Button>
                    <Button onClick={() => navigate("/post")}>Back</Button>
                </Box>
            </Grid>
        </MainContent>
    )
}
export default AddPost;