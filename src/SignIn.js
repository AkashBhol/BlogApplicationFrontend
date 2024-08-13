import { Box, Button, Card, Grid, TextField, Typography } from "@mui/material"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomInput from "./Validation/CustomInput";
import axios from 'axios';
import { toast } from 'react-toastify';
import CommonUtil from "./Validation/CommonUtil";
import Swal from "sweetalert2";
const SignIn = () => {
    const navigate = useNavigate();
    const [payload, setPayload] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: ""
    });

    const [error, setError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        password: ""
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
        if (CommonUtil.isEmptyString(payload.firstName)) {
            setError({
                ...error,
                firstName: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.lastName)) {
            setError({
                ...error,
                lastName: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.email)) {
            setError({
                ...error,
                email: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.mobile)) {
            setError({
                ...error,
                mobile: "This field is required",
            });
            return;
        }
        if (CommonUtil.isEmptyString(payload.password)) {
            setError({
                ...error,
                password: "This field is required",
            });
            return;
        }
        return true;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            axios.post("http://localhost:8089/api/v2/user/create", payload).then((res) => {
                // toast.success(("User Created SuccessFully"), { position: "top-right" });
                Swal.fire({
                    icon: 'success',
                    title: 'User Login Successfully',
                    showConfirmButton: false,
                    timer: 3500
                });
                navigate("/")
            })
        }
    }

    return (
        <Grid item container justifyContent={"center"} textAlign={"center"} style={{ minHeight: "80vh", marginTop: "2vh", marginBottom: "10vh" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Card style={{ padding: "20px", textAlign: "center" }}>
                    <Typography>SignIn</Typography>
                    <Box mb={2}>
                        <CustomInput
                            id="AddProduct1"
                            required
                            label="name"
                            size="small"
                            name="firstName"
                            error={error.firstName}
                            resetError={() => resetError("firstName")}
                            value={payload.firstName}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 20,
                            }}
                            helperText={error.firstName}
                            validation={"alpha-numeric-ch-th"}
                            placeholder={"Enter First Name"}
                        />

                    </Box>
                    <Box mb={2}>
                        <CustomInput
                            id="AddProduct1"
                            required
                            label="lastName"
                            size="small"
                            name="lastName"
                            error={error.lastName}
                            resetError={() => resetError("lastName")}
                            value={payload.lastName}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 10,
                            }}
                            helperText={error.lastName}
                            validation={"alpha-numeric-ch-th"}
                            placeholder={"Enter lastName"}
                        />
                    </Box>
                    <Box mb={2}>
                        <CustomInput
                            id="AddProduct1"
                            required
                            label="email"
                            size="small"
                            name="email"
                            error={error.email}
                            resetError={() => resetError("email")}
                            value={payload.email}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText={error.email}
                            validation={"email"}
                            placeholder={"Enter email"}
                        />
                    </Box>
                    <Box mb={2}>
                        <CustomInput
                            id="AddProduct1"
                            required
                            label="mobile"
                            size="small"
                            name="mobile"
                            error={error.mobile}
                            resetError={() => resetError("mobile")}
                            value={payload.mobile}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 10,
                            }}
                            helperText={error.mobile}
                            validation={"mobile"}
                            placeholder={"Enter mobile"}
                        />
                    </Box>
                    <Box mb={2}>
                        <CustomInput
                            id="AddProduct1"
                            required
                            label="password"
                            size="small"
                            name="password"
                            error={error.password}
                            resetError={() => resetError("password")}
                            value={payload.password}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText={error.password}
                            validation={"password"}
                            placeholder={"Enter password"}
                        />
                    </Box>
                    <Button onClick={handleSubmit}>SignIn</Button>
                    <Button onClick={() => navigate("/")}>Back</Button>
                </Card>
            </Grid>
        </Grid>
    )
}
export default SignIn;