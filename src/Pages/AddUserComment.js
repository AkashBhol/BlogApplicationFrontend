import { Autocomplete, Box, Button, Grid, TextField } from "@mui/material";
import MainContent from "../Components/MainContent";
import CustomInput from "../Validation/CustomInput";
import { useEffect, useState } from "react";
import { createComment, getAllPosts, getAllsPost } from "../Servive/UserCommentService";
import { useNavigate, useParams } from "react-router-dom";
import CommonUtil from "../Validation/CommonUtil";
import { enqueueSnackbar } from "notistack";

const AddUserComment = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [post, setpost] = useState(null);
  const [email, setEmail] = useState();
  const [payload, setPayload] = useState({
    comment: ""
  });

  const [error, setError] = useState({
    comment: ""
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
    getAllsPost().then((res) => {
      setPosts(res?.data?.data);
    }).catch((error) => {
      alert("There is an error: " + error);
      console.error("Error fetching posts:", error);
    });
    getDetails();
  }, []);

  const getDetails = () => {
    const user = CommonUtil.decodeToken();
    const email_ = user.email;
    setEmail(email_)
  }
  const handleSubmit = () => {
    debugger
    let request = {
      ...payload,
      post: post,
      email: email
    }
    console.log(JSON.stringify(request))
    createComment(request).then((res) => {
      enqueueSnackbar("Comment created Successfully", { variant: "success" })
      navigate("/comment")
    }).catch((error) => {
      alert("sommething went wrong in Comment craetion")
    })
  };

  return (
    <MainContent title="AddComment">
      <Grid container spacing={2} px={2}>
        <CustomInput
          id="comment"
          required
          label="comment"
          size="small"
          name="comment"
          error={error.comment}
          resetError={() => resetError("comment")}
          value={payload.comment}
          handleChange={handleChange}
          inputProps={{
            maxLength: 30,
          }}
          helperText={error.comment}
          placeholder={"Enter comment"}
        />
        <Autocomplete
          options={posts}
          value={post || null}
          onChange={(e, v) => {
            console.log("Autocomplete onChange event:", e);
            console.log("Selected value (console.log):", v);
            setpost(v)
          }}
          getOptionLabel={(option) => option.content}
          renderInput={(params) => <TextField {...params} label="content" />}
          sx={{ width: 300 }}
        >
        </Autocomplete>
      </Grid>
      <Box>
        <Button onClick={handleSubmit}>Submit</Button>
      </Box>
    </MainContent>
  );
};

export default AddUserComment;
