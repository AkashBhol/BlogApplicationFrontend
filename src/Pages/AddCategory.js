import { Box, Button, Card, Grid } from "@mui/material";
import { useState } from "react";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { Title } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import CommonUtil from "../Validation/CommonUtil";
import axios from "axios";
import Swal from "sweetalert2";

const AddCategory = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        title: "",
        categoryDescriptions: "",
        date: null
    })

    const [error, setError] = useState({
        title: "",
        categoryDescriptions: "",
        date: ""
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

    const validateForm = () => {
        if (CommonUtil.isEmptyString(payload.title)) {
            setError({
                ...error,
                title: "This Feild IS required"
            })
            return;
        }
        if (CommonUtil.isEmptyString(payload.categoryDescriptions)) {
            setError({
                ...error,
                categoryDescriptions: "This feild is required"
            })
            return;
        }
        return true;
    }
    const handleSubmit = () => {
        debugger
        if (validateForm()) {
            axios.post("http://localhost:8089/api/v2/create/category", payload, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken")
                },
            }).then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successfully',
                    showConfirmButton: false,
                    timer: 3500
                });
                navigate("/category");
            }).catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error adding category',
                    text: err.response?.data?.message || 'Something went wrong',
                    showConfirmButton: true,
                });
            });
        }
    }
    return (
        <MainContent title="AddCategory">
            <Grid container spacing={2} px={2}>
                <CustomInput
                    id="title"
                    required
                    label="title"
                    size="small"
                    name="title"
                    error={error.title}
                    resetError={() => resetError("username")}
                    value={payload.title}
                    handleChange={handleChange}
                    inputProps={{
                        maxLength: 30,
                    }}
                    helperText={error.title}
                    // validation={"alpha-numeric-ch-th"}
                    placeholder={"Enter  title"}
                />
                <CustomInput
                    id="categoryDescriptions"
                    required
                    label="categoryDescriptions"
                    size="small"
                    name="categoryDescriptions"
                    error={error.categoryDescriptions}
                    resetError={() => resetError("categoryDescriptions")}
                    value={payload.categoryDescriptions}
                    handleChange={handleChange}
                    inputProps={{
                        maxLength: 30,
                    }}
                    helperText={error.categoryDescriptions}
                    // validation={"alpha-numeric-ch-th"}
                    placeholder={"Enter  categoryDescriptions"}
                />
                <input
                    type="date"
                    id="date-input"
                    name="date"
                    value={payload.date}
                    onChange={handleChange}
                    style={{ width: '100%' }}
                />
                <Grid xs={12}>
                    <Box mb={2}>
                        <Button onClick={handleSubmit}>Submit</Button>
                        <Button onClick={() => navigate("/category")}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
        </MainContent>
    )
}
export default AddCategory;