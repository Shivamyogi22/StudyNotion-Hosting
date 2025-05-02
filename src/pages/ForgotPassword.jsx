import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPasswordResetToken } from "../services/operations/authAPI";
import { LiaArrowLeftSolid } from "react-icons/lia";

const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");

    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch()

    const handleOnSubmit = (e) =>{
        e.preventDefault();
        dispatch(getPasswordResetToken(email, setEmailSent))
    }

    return (
    <div className="w-11/12 mx-auto text-white">
        {
            loading ? (
            <div className=""> Loading.... </div>
            ) : (
            <div className="flex flex-col w-[444px] h-[448px]  p-8 mx-auto gap-[22px] mt-[30px]">
                <h1 className="text-3xl font-bold">
                    {
                        !emailSent ? "Reset your Password" : "Check your email"
                    }
                </h1>
                <p className="text-richblack-200 text-xl w-[370px]">
                    {
                        !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                    }
                </p>

                <form
                    onSubmit={handleOnSubmit}
                    className="flex flex-col gap-4"
                >
                    {
                        !emailSent && (
                            <lable>
                                 <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">Email Address
                                 <sup className="text-pink-200">*</sup>
                                </p>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    placeholder="Enter Your Email Address"
                                    value={email}
                                    onChange={ (e) => setEmail(e.target.value) }
                                    style={{
                                        boxShadow:
                                            "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                    }}
                                    className="w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                                />
                            </lable>
                        )
                    }
                    <button className="w-[444px] text-center text-[20px] px-6 py-3 rounded-md font-bold font-inter shadow-inner bg-yellow-50 text-black"
                        type="submit"
                    >
                        {
                            !emailSent ? "Reset Password" : "Resend Email"
                        }
                    </button>
                </form>

                    {/* BAck to login button */}
                    <Link to="/login">
                        <p className="flex flex-row text-xl gap-3 justify-start items-center" >
                        <LiaArrowLeftSolid />
                            Back to login
                            </p>
                    </Link>
            </div>
            )  
        }
    </div>
    )
};

export default ForgotPassword;
