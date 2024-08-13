import React, { useEffect, useState } from "react";
import { Box, InputAdornment, InputLabel, TextField } from "@mui/material";
import CommonUtil from "./CommonUtil";
import { useTranslation } from "react-i18next";

export default function CustomInput(props) {
    const [helperText, setHelperText] = useState(props.helperText);
    const [error, setError] = useState(props.error);
    const { t } = useTranslation();

    useEffect(() => {
        setError(props.error);
        setHelperText(props.helperText);
    }, [props.error]);

    const handleChange = (e) => {
       
        if (props.regex === "none" && props.validation) {
            switch (props.validation) {
                case "alpha-numeric":
                    handleAlphaNumeric(e);
                    break;
                case "alpha-numeric-ch-th":
                    handleAlphaNumericCHAndTh(e);
                    break;
                case "numeric":
                    handleNumeric(e);
                    break;
                case "numeric-percentage":
                    handleNumericPercentage(e);
                    break;
                case "email":
                    handleEmail(e);
                    break;
                case "password":
                    handlePassword(e);
                    break;
                case "code":
                    handleCode(e);
                    break;
                case "mobile":
                    handleMobile(e);
                    break;
                case "postcode":
                    handlePostCode(e);
                    break;
                case "alpha-numeric-underscore":
                    handleCodeUnderscore(e);
                    break;
                case "alpha-numeric-space":
                    handleAlphaNumericSpace(e);
                    break;
                case "alpha-numeric-space-dot":
                    handleAlphaNumericSpaceDot(e);
                    break;
                case "numericWithoutDot":
                    handleNumericWithoutDot(e);
                    break;
                case "numericWithSingleDot":
                    handleNumericWithSingleDot(e);
                default:
                    props.handleChange(e);
            }
        }
    };

    const handleAlphaNumeric = (e) => {
        if (CommonUtil.isAlphaNumericSpace(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0006"));
        }
    };

    const handleAlphaNumericCHAndTh = (e) => {
        if (CommonUtil.isAlphaNumericChAndThSpace(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0006"));
        }
    };

    const handleCodeUnderscore = (e) => {
        if (CommonUtil.isAlphaNumericUnderscore(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0016"));
        }
    };

    const handleAlphaNumericSpaceDot = (e) => {
        if (CommonUtil.isAlphaNumericSpaceDot(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0017"));
        }
    };
    const handleAlphaNumericSpace = (e) => {
        if (CommonUtil.isAlphaNumericSpace(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0018"));
        }
    };
    const handleNumericWithoutDot = (e) => {
        if (CommonUtil.isValidPasitiveNumeric(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0019"));
        }
    };

    const handleCode = (e) => {
        if (CommonUtil.isValidCode(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0004"));
        }
    };

    const handlePostCode = (e) => {
        if (CommonUtil.isValidCode(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0002"));
        }
    };

    const handleNumeric = (e) => {
        if (CommonUtil.isValidNumeric(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("Please enter only numeric"));
        }
    };

    const handleNumericPercentage = (e) => {
        if (CommonUtil.isValidPercentage(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("Accepts valid percentage only"));
        }
    };

    const handleNumericWithSingleDot = (e) => {
        if (CommonUtil.isValidNumericWithSingleDot(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("LVL0005"));
        }
    };

    const handleEmail = (e) => {
        props.handleChange(e);
        if (CommonUtil.isValidEmail(e.target.value)) {
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("This is invalid Email"));
        }
    };
    const handleMobile = (e) => {
        if (CommonUtil.isValidPasitiveNumeric(e.target.value)) {
            props.handleChange(e);
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(("Invalid Mobile NO"));
        }
    };

    const handlePassword = (e) => {
        props.handleChange(e);
        if (CommonUtil.isValidPassword(e.target.value)) {
            setHelperText(props.helperText);
            setError(false);
        } else {
            setError(true);
            setHelperText(t("Give Strong Password"));
        }
    };

    const preventHandleBlur = [
        "email",
        "superAdminEmail",
        "password",
        "confirmPassword",
        "oldPassword",
        "newPassword",
        "date",
    ];
    const handleBlur = () => {
        if (!preventHandleBlur.includes(props.name)) {
            setHelperText("");
            setError(false);
            props.resetError();
        }
    };

    return (
        <Box letiant="standard" style={{ width: "100%" }} pb={1}>
            <InputLabel shrink htmlFor="bootstrap-input"
                style={{ paddingLeft: "0px" }} >
                {props.label}{" "}
                {props.required ? <span style={{ color: "red" }}>*</span> : ""}
            </InputLabel>
            <TextField
                {...props}
                autoComplete="new-password"
                fullWidth
                sx={{
                    borderRadius: "10px",
                    color: "#474B4F",
                    opacity: "0.8",
                    height: "60px",
                    fontSize: "16px",
                    fontFamily: "Roboto",
                    "& .MuiOutlinedInput-input.MuiInputBase-inputSizeSmall": {
                        fontSize: "13px",
                        padding: "12px",
                    },

                    height: 40,
                    "& label.Mui-focused": {
                        color: "#0F5A9C",
                    },
                    "& label": {
                        color: "#8A8A8A !important",
                        fontFamily: "inter",
                        fontStyle: "normal",
                        fontWeight: "400",
                        fontSize: "14px",
                        lineHeight: "20px",
                    },

                    "& .MuiOutlinedInput-root": {
                        borderRadius: "8px",
                        "& fieldset": {
                            border: (props) =>
                                (props.hasValue
                                    ? "1px solid rgba(20, 20, 20, 0.80)"
                                    : "1px solid #B9B9B9") + " !important",
                        },

                        "&:hover fieldset": {
                            border: "1px solid rgba(20, 20, 20, 0.80) !important",
                        },

                        "&.Mui-focused fieldset": {
                            border: "1px solid #2F54EB !important",
                        },

                        "&.Mui-disabled fieldset": {
                            border: "1px solid #B9B9B9 !important",
                        },
                        "&.Mui-disabled:hover fieldset": {
                            // Prevent hover effect on disabled fields
                            border: "1px solid #B9B9B9 !important",
                        },
                        "&.Mui-error fieldset": {
                            // Border color on error
                            border: "1px solid #FF4D4F !important",
                        },
                    },
                    "& .MuiFormHelperText-root": {
                        margin: "4px 0px 0px 0px !important",
                    },
                }}
                label={""}
                value={props.value}
                helperText={helperText}
                error={error}
                onBlur={() => handleBlur()}
                onChange={(e) => handleChange(e)}
                disabled={props.disabled ? props.disabled : false}
            />
        </Box>
    );
}

CustomInput.defaultProps = {
    validation: "none",
    regex: "none",
};
