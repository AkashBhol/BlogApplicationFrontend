import { Button, Grid } from "@mui/material";
import CustomInput from "../Validation/CustomInput";
import { useState } from "react";
import PassWordInputField from "../Components/PasswordInputField";
import axios from "axios";
import CommonUtil from "../Validation/CommonUtil";
import { enqueueSnackbar } from "notistack";

const UpdatePassword = (props) => {
    const {open, setOpen} = props
    const [payload, setPayload] = useState({
        email: "",
        oldPassword: "",
        newPassword: "",
        conformPassword: ""
    })

    const [error, setError] = useState({
        oldPassword: "",
        newPassword: "",
        conformPassword: ""
    })

    const handleChange = (event) => {
        const name = event.target.name
        setPayload({
            ...payload,
            [name]: event.target.value
        })
        setError({
            ...error,
            name: ""
        })
    }

    const user= CommonUtil.decodeToken();
    
    const handleUpdate = () => {
        let request ={
            ...payload,
            email: user?.email
        }

        axios.put("http://localhost:8089/api/v2/update/password", request,
            {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("authToken")
                }
            }
        ).then((res)=>{
            enqueueSnackbar("PasswordUpdatedSuccessFully",{variant:"success"})
            setOpen(false);
        })
    }
    return (
        <Grid container >
            <Grid item container md={12} pt={2}>
                <PassWordInputField
                    lable={"Old Password"}
                    onChange={handleChange}
                    value={payload.oldPassword}
                    name="oldPassword"
                />
            </Grid>
            <Grid item container md={12} pt={2}>
                <PassWordInputField
                    lable={"New Password"}
                    onChange={handleChange}
                    value={payload.newPassword}
                    name="newPassword"
                />
            </Grid>
            <Grid item container md={12} pt={2}>
                <PassWordInputField
                    lable={"conformPassword"}
                    onChange={handleChange}
                    value={payload.conformPassword}
                    name="conformPassword"

                />
            </Grid>
            <Grid>
                <Button onClick={handleUpdate} >Update</Button>
                <Button>Cancel</Button>
            </Grid>
        </Grid>

    )
}
export default UpdatePassword;