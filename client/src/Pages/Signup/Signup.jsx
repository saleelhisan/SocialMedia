import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { signUpPost } from "../../utils/Constants";
import { GoogleLogin } from '@react-oauth/google';
import { toast, Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setLogin } from "../../state";



const Signup = () => {
  const dispatch = useDispatch()
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    firstName : Yup.string()
    .min(3,'Must contain atleast 3 letters')
    .required("Firstname is required")
    .matches(/^[^\s]+$/, "Name cannot contain whitespaces"),
    lastName : Yup.string()
    .matches(/^[^\s]+$/, "Name cannot contain whitespaces"),
    username: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("User Name is required")
      .matches(/^[^\s]+$/, "Name cannot contain whitespaces"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string()
      .matches(/^\d{10}$/, "Invalid phone number")
      .required("Mobile number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[a-z]/, "Password must contain at least one lowercase letter")
      .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
      .matches(/[0-9]/, "Password must contain at least one number")
      .matches(/[^a-zA-Z0-9]/, "Password must contain at least one symbol")
      .required("Password is Required"),
  });

  const handleSubmit = (values) => {
    setIsSubmitting(true);

    axios
      .post(signUpPost, values, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        
        navigate("/login");
      })
      .catch((err) => {

        ((error) => {
            toast.error(error.response.data.msg, {
                position: "top-center",
            });
        })(err);
    })
    setIsSubmitting(false);
  };
  const handleGoogleLogin = async (response) => {
    const data = JSON.stringify({ token: response.credential })
    axios.post('api/google-signup', data, {
        headers: { "Content-Type": "application/json" },
    }).then((response) => {
        
      dispatch(
        setLogin({
            user: response.data.user,
            token: response.data.token,
        })
    );
    navigate('/');
         
        navigate('/');
    })
        .catch((err) => {
            console.log(err);
            ((error) => {
                toast.error(error.response.data.msg, {
                    position: "top-center",
                });
            })(err);
        });
}
  return (
    <Grid
      container
      sx={{
        height: "100vh",
        background:
          "linear-gradient(to right, rgba(106,133,182,0.4), rgba(186,200,224,0.4))",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Grid item xs={12} md={6}>
        <Card
          sx={{
            marginTop: { xs: "6rem", sm: "0" },
          }}
        >
          <Stack direction={{ xs: "column", sm: "row" }}>
            <Box
              flex={1}
              sx={{
                height: "80vh",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                justifyContent: "center",
              }}
            >
              <Typography variant="h4" color="#555" fontWeight="bold" marginTop={"15px"}>
                Register
              </Typography>
              <Formik
                initialValues={{
                  firstName:"",
                  lastName:"",
                  username: "",
                  email: "",
                  phone: "",
                  password: "",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <Field
                      name="firstName"
                      as={TextField}
                      label="First Name"
                      variant="standard"
                      error={touched.firstName && Boolean(errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    /><Field
                    name="lastName"
                    as={TextField}
                    label="Last Name"
                    variant="standard"
                    error={touched.lastName && Boolean(errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                    <Field
                      name="username"
                      as={TextField}
                      label="User Name"
                      variant="standard"
                      error={touched.username && Boolean(errors.username)}
                      helperText={touched.username && errors.username}
                    />
                    <Field
                      name="email"
                      as={TextField}
                      label="Email"
                      variant="standard"
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                    <Field
                      name="password"
                      as={TextField}
                      variant="standard"
                      label="Password"
                      type="password"
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                    <Field
                      name="phone"
                      as={TextField}
                      variant="standard"
                      label="Phone Number"
                      error={touched.phone && Boolean(errors.phone)}
                      helperText={touched.phone && errors.phone}
                    />
                    <Button
                      sx={{
                        width: "50%",
                        backgroundColor: "black",
                        color: "white",
                        fontWeight: "bold",
                        cursor: "pointer",
                        marginTop: "1rem",
                        "&:hover": {
                          backgroundColor: "grey",
                        },
                      }}
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                    >
                      Signup
                    </Button>
                    <Box sx={{marginY : '15px'}}>
                    <GoogleLogin
                                onSuccess={response => {
                                    handleGoogleLogin(response)
                                    // fetch("http://localhost:6001/api/google-login", {
                                    //     method: "POST",
                                    //     headers: {
                                    //         "Content-Type": "application/json"
                                    //     },
                                    //     body: JSON.stringify({ token: response.credential })
                                    // })
                                    //     .then(response => response.json())
                                    //     .then(data => console.log(data))
                                    //     .catch(error => console.error(error));
                                }}
                                onError={() => {
                                    console.log('Login Failed');
                                }}
                                useOneTap
                            />
                    </Box>
                    
                  </Form>
                )}
              </Formik>
            </Box>
            <Box
              flex={1}
              sx={{
                background: `linear-gradient(rgba(106,133,182,0.4), rgba(186,200,224,0.4)),  url(${"https://images.pexels.com/photos/2055500/pexels-photo-2055500.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"}), center`,
                backgroundSize: "cover",
                height: "80vh",
                padding: "3rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                color: "white",
              }}
            >
              <Typography fontWeight={500} variant="h2" lineHeight={1}>
                Register Here..
              </Typography>
              <Typography variant="p">
                {/* Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, */}
              </Typography>
              <Typography variant="span" fontSize={14}>
                Do you have an account ?
              </Typography>
              <Link to="/login">
                <Button
                  sx={{
                    width: "50%",
                    backgroundColor: "white",
                    color: "rebeccapurple",
                    fontWeight: "bold",
                    cursor: "pointer",
                    textDecoration: "none",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    marginTop: "10rem",
                    marginLeft:"4rem"
                  }}
                  variant="contained"
                >
                  Login
                </Button>
              </Link>
              <Toaster />
            </Box>
          </Stack>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Signup;
