import { Box, Button, Grid } from "@mui/material"
import CustomInput from "../Validation/CustomInput";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CommonUtil from "../Validation/CommonUtil";
import MainContent from "../Components/MainContent";
import axios from "axios";
import Swal from "sweetalert2";

const EditCategory = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [payload, setPayload] = useState({
        title: "",
        categoryDescriptions: "",
        date: ""
    })

    const [error, setError] = useState({
        title: "",
        categoryDescriptions: "",
        date: null
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

    const loadData = () => {
        axios.get("http://localhost:8089/api/v2/get/single", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            },
            params: {
                id: id
            }
        }).then((res) => {
           // setPayload(res?.data?.data);
           const isoDate = res?.data?.data?.date;
           const formattedDate = isoDate ? isoDate.split('T')[0] : "";
           
           setPayload({
               ...res?.data?.data,
               date: formattedDate
           })
           alert(payload?.date)
        })
    }
    useEffect(() => {
        loadData();
    }, [id])

    const handleSubmit = () => {
        axios.put("http://localhost:8089/api/v2/update/category?id=" + id, payload, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("authToken")
            }

        }).then((res) => {
            setPayload(res?.data?.data);

            Swal.fire({
                icon: 'success',
                title: 'User Login Successfully',
                showConfirmButton: false,
                timer: 3500
            });
            navigate("/category");
        })
    }
    return (
        <MainContent title="EditCategory">
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
                        <Button onClick={handleSubmit}>Edit</Button>
                        <Button onClick={() => navigate("/category")}>Back</Button>
                    </Box>
                </Grid>
            </Grid>
        </MainContent>
    )
}
export default EditCategory;