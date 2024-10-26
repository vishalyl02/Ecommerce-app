import {Box, FormHelperText, Stack, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useEffect } from 'react'
import Lottie from 'lottie-react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { ecommerceOutlookAnimation, shoppingBagAnimation} from '../../../assets'
import {useDispatch,useSelector} from 'react-redux'
import { LoadingButton } from '@mui/lab';
import {selectLoggedInUser,loginAsync,selectLoginStatus, selectLoginError, clearLoginError, resetLoginStatus} from '../AuthSlice'
import { toast } from 'react-toastify'
import {MotionConfig, motion} from 'framer-motion'

export const Login = () => {
  const dispatch=useDispatch()
  const status=useSelector(selectLoginStatus)
  const error=useSelector(selectLoginError)
  const loggedInUser=useSelector(selectLoggedInUser)
  const {register,handleSubmit,reset,formState: { errors }} = useForm()
  const navigate=useNavigate()
  const theme=useTheme()
  const is900=useMediaQuery(theme.breakpoints.down(900))
  const is480=useMediaQuery(theme.breakpoints.down(480))
  
  // handles user redirection
  useEffect(()=>{
    if(loggedInUser && loggedInUser?.isVerified){
      navigate("/")
    }
    else if(loggedInUser && !loggedInUser?.isVerified){
      navigate("/verify-otp")
    }
  },[loggedInUser])

  // handles login error and toast them
  useEffect(()=>{
    if(error){
      toast.error(error.message)
    }
  },[error])

  // useEffect(() => {
  //   console.log("Checking logged in user:", loggedInUser);
  //   if (loggedInUser && loggedInUser?.isVerified) {
  //     navigate("/");
  //   } else if (loggedInUser && !loggedInUser?.isVerified) {
  //     navigate("/verify-otp");
  //   }
  // }, [loggedInUser, navigate]);

  // // handles login error and toast them
  // useEffect(() => {
  //   if (error) {
  //     console.error("Login error:", error); // Log the error for debugging
  //     toast.error(error.message);
  //   }
  // }, [error]);



  // handles login status and dispatches reset actions to relevant states in cleanup
  useEffect(()=>{
    if(status==='fullfilled' && loggedInUser?.isVerified===true){
      toast.success(`Login successful`)
      reset()
    }
    return ()=>{
      dispatch(clearLoginError())
      dispatch(resetLoginStatus())
    }
  },[status])

  // useEffect(() => {
  //   if (status === 'fulfilled' && loggedInUser?.isVerified === true) {
  //     toast.success(`Login successful`);
  //     reset();
  //   }
  //   return () => {
  //     dispatch(clearLoginError());
  //     dispatch(resetLoginStatus());
  //   };
  // }, [status, loggedInUser, reset, dispatch]);

  // const handleLogin=(data)=>{
  //   const cred={...data}
  //   delete cred.confirmPassword
  //   dispatch(loginAsync(cred))


  // const handleLogin = async (data) => {
  //   const cred = { ...data };
  //   delete cred.confirmPassword; // Ensure this is correct

  //   console.log("Attempting to login with credentials:", cred); // Log the credentials being used

  //   try {
  //     const response = await dispatch(loginAsync(cred));
  //     console.log("Response from loginAsync:", response); // Log the response

  //     if (response && response.payload) {
  //       console.log("Login response data:", response.payload); // Log the payload
  //     } else {
  //       console.error("Unexpected response structure:", response);
  //       toast.error("Login failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error); // Log the caught error
  //     toast.error("An error occurred during login");
  //   }
  // };
  // const handleLogin = async (data) => {
  //   const cred = { ...data };
  //   delete cred.confirmPassword; // Ensure this is correct
  
  //   console.log("Attempting to login with credentials:", cred); // Log the credentials being used
  
  //   try {
  //     const response = await dispatch(loginAsync(cred));
  //     console.log("Response from loginAsync:", response); // Log the response
  
  //     if (response.type === 'auth/loginAsync/rejected') {
  //       console.error("Login failed with error:", response.error.message); // Log the error message
  //       toast.error(response.error.message); // Show error message from backend
  //     } else if (response && response.payload) {
  //       console.log("Login response data:", response.payload); // Log the payload for successful login
  //     } else {
  //       console.error("Unexpected response structure:", response);
  //       toast.error("Login failed. Please try again.");
  //     }
  //   } catch (error) {
  //     console.error("Error during login:", error); // Log the caught error
  //     toast.error("An error occurred during login");
  //   }
  // };

  const handleLogin = async (data) => {
    const { email, password } = data; // Extract email and password
    console.log("Attempting to login with credentials:", { email, password }); // Log the credentials

    try {
        const response = await dispatch(loginAsync({ email, password })); // Dispatch login action
console.log("Iam in Login",response)
console.log("Iam in Login response ",response.meta.arg)
if(response.meta.arg.email!==undefined)
{
  toast.success("Login successful!"); // Notify success
            navigate('/');
}

        // Check if the login is successful
        // if (response.type === 'auth/loginAsync/fulfilled') {
        //     console.log("Login successful!"); // Log success
        //     toast.success("Login successful!"); // Notify success
        //     navigate('/'); // Redirect to homepage
        // } 
        else {
            // Handle login failure
            const errorMessage = response.error.message || "Invalid email or password.";
            console.error("Login failed:", errorMessage); // Log the error
            toast.error(errorMessage); // Show error message
        }
    } catch (error) {
        // Handle unexpected errors
        console.error("Error during login:", error); // Log the error
        toast.error("An error occurred during login. Please try again."); // Notify user
    }
};

  
  return (
    <Stack width={'100vw'} height={'100vh'} flexDirection={'row'} sx={{overflowY:"hidden"}}>
        
        {
          !is900 && 
       
        <Stack bgcolor={'black'} flex={1} justifyContent={'center'} >
          <Lottie animationData={ecommerceOutlookAnimation}/>
        </Stack> 
        }

        <Stack flex={1} justifyContent={'center'} alignItems={'center'}>

              <Stack flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>

                <Stack rowGap={'.4rem'}>
                  <Typography variant='h2' sx={{wordBreak:"break-word"}} fontWeight={600}>Mern Shop</Typography>
                  <Typography alignSelf={'flex-end'} color={'GrayText'} variant='body2'>- Shop Anything</Typography>
                </Stack>

              </Stack>

                <Stack mt={4} spacing={2} width={is480?"95vw":'28rem'} component={'form'} noValidate onSubmit={handleSubmit(handleLogin)}>

                    <motion.div whileHover={{y:-5}}>
                      <TextField fullWidth {...register("email",{required:"Email is required",pattern:{value:/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,message:"Enter a valid email"}})} placeholder='Email'/>
                      {errors.email && <FormHelperText sx={{mt:1}} error>{errors.email.message}</FormHelperText>}
                    </motion.div>

                    
                    <motion.div whileHover={{y:-5}}>
                      <TextField type='password' fullWidth {...register("password",{required:"Password is required"})} placeholder='Password'/>
                      {errors.password && <FormHelperText sx={{mt:1}} error>{errors.password.message}</FormHelperText>}
                    </motion.div>
                    
                    <motion.div whileHover={{scale:1.020}} whileTap={{scale:1}}>
                      <LoadingButton fullWidth  sx={{height:'2.5rem'}} loading={status==='pending'} type='submit' variant='contained'>Login</LoadingButton>
                    </motion.div>

                    <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} flexWrap={'wrap-reverse'} >

                      <MotionConfig whileHover={{x:2}} whileTap={{scale:1.050}}>
                          <motion.div>
                              <Typography mr={'1.5rem'} sx={{textDecoration:"none",color:"text.primary"}} to={'/forgot-password'} component={Link}>Forgot password</Typography>
                          </motion.div>

                          <motion.div>
                            <Typography sx={{textDecoration:"none",color:"text.primary"}} to={'/signup'} component={Link}>Don't have an account? <span style={{color:theme.palette.primary.dark}}>Register</span></Typography>
                          </motion.div>
                      </MotionConfig>

                    </Stack>

                </Stack>
        </Stack>
    </Stack>
  )
}
