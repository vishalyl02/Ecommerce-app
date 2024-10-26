import {axiosi} from '../../config/axios'

export const signup=async(cred)=>{
    try {
        const res=await axiosi.post("auth/signup",cred)
        return res.data
    } catch (error) {
        console.log(error)
        throw error.response.data
    }
}
export const login=async(cred)=>{
    try {


        const res = await axiosi.post("auth/login", {
      key: cred // Replace with your actual data
    }, {
      withCredentials: true, // Important for sending cookies
      headers: {
        'Content-Type': 'application/json',
      }
    });
    //     const res=await axiosi.post("auth/login",cred)
    //    console.log("I am data", res.data);
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const verifyOtp=async(cred)=>{
    try {
        const res=await axiosi.post("auth/verify-otp",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resendOtp=async(cred)=>{
    try {
        const res=await axiosi.post("auth/resend-otp",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const forgotPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/forgot-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const resetPassword=async(cred)=>{
    try {
        const res=await axiosi.post("auth/reset-password",cred)
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const checkAuth=async(cred)=>{
    try {
        const res=await axiosi.get("auth/check-auth")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}
export const logout=async()=>{
    try {
        const res=await axiosi.get("auth/logout")
        return res.data
    } catch (error) {
        throw error.response.data
    }
}