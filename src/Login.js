import { Box, Button, Card, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomInput from './Validation/CustomInput';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CommonUtil from './Validation/CommonUtil';

const Login = () => {
    const navigate = useNavigate();

    const [payload, setPayload] = useState({
        username: "",
        password: "",
    })

    const [error, setError] = useState({
        username: "",
        password: "",
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
        if (CommonUtil.isEmptyString(payload.username)) {
            setError({
                ...error,
                username: "This field is required",
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
            axios.post("http://localhost:8089/api/authenticate", payload)
                .then((res) => {
                    console.log("Response data:", res.data);
                    const { token } = res.data; // Assuming the token is in `res.data.token`

                    // Store the token in localStorage
                    localStorage.setItem('authToken', token);
                    Swal.fire({
                        icon: 'success',
                        title: 'User Login Successfully',
                        showConfirmButton: false,
                        timer: 3500
                    });
                    navigate("/mainLayout");
                })
                .catch((error) => {
                    console.error("Error logging in:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error Logging In',
                        text: 'An error occurred while logging in.',
                        // confirmButtonText: 'OK'
                        timer: 3500
                    });
                });
        }
    };

    return (
        <Grid item container justifyContent={"center"} textAlign={"center"} style={{ minHeight: "80vh", marginTop: "2vh", marginBottom: "10vh" }}>
            <Grid item xs={12} sm={8} md={4}>
                <Card style={{ padding: "20px", textAlign: "center" }}>
                    <Typography>Login</Typography>
                    <Box mb={2}>
                        <CustomInput 
                            id="AddProduct1"
                            required
                            label="username"
                            size="small"
                            name="username"
                            error={error.username}
                            resetError={() => resetError("username")}
                            value={payload.name}
                            handleChange={handleChange}
                            inputProps={{
                                maxLength: 30,
                            }}
                            helperText={error.username}
                            // validation={"alpha-numeric-ch-th"}
                            placeholder={"Enter  UserName"}
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
                            placeholder={"Enter  password"}
                        />
                    </Box>
                    <Box mb={2}>
                        <Button onClick={handleSubmit}>Login</Button>
                        <Button onClick={() => navigate("/signIn")}>SignIN</Button>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    )
}
export default Login;