import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { LiaArrowLeftSolid } from "react-icons/lia";
import { resetPassword } from "../services/operations/authAPI";

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { loading } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { password, confirmPassword } = formData;

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const token = location.pathname.split("/").at(-1);
        console.log("formdata:", { password, confirmPassword });
        dispatch(resetPassword(password, confirmPassword, token));
    };

    return (
        <div className="w-11/12 mx-auto text-white">
            {loading ? (
                <div>Loading....</div>
            ) : (
                <div className="flex flex-col w-[444px] h-[172px] p-8 mx-auto gap-[12px] mt-[30px]">
                    <h1 className="text-3xl font-bold">Choose new Password</h1>
                    <p>
                        Almost done. Enter your new password and your all set.
                    </p>

                    <form onSubmit={handleOnSubmit}>
                        {/* Password fields */}

                        {/* New password */}
                        <label className="relative">
                            <p className=" mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                New Password
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                onChange={handleOnChange}
                                placeholder="Enter New Password"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className=" w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
                            />
                            <span
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer -translate-x-2"
                            >
                                {showPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>

                        {/* Confrim New Password */}
                        <label className="relative mt-3 block">
                            <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                                Confirm New Password
                                <sup className="text-pink-200">*</sup>
                            </p>
                            <input
                                required
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                onChange={handleOnChange}
                                placeholder="Confirm password"
                                style={{
                                    boxShadow:
                                        "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                                }}
                                className="relative w-[444px] rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5 mb-10"
                            />
                            <span
                                onClick={() =>
                                    setShowConfirmPassword((prev) => !prev)
                                }
                                className="absolute right-3 top-[38px] z-[10] cursor-pointer translate-x-14"
                            >
                                {showConfirmPassword ? (
                                    <AiOutlineEyeInvisible
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                ) : (
                                    <AiOutlineEye
                                        fontSize={24}
                                        fill="#AFB2BF"
                                    />
                                )}
                            </span>
                        </label>

                        {/* RESET BUTTTON */}
                        <button
                            type="submit"
                            className="w-[444px] text-center text-[20px] px-6 py-3 rounded-md font-bold font-inter shadow-inner bg-yellow-50 text-black"
                        >
                            Reset Password
                        </button>
                    </form>

                    {/* BAck to login button */}
                    <Link to="/login">
                        <p className="flex flex-row text-xl gap-3 justify-start items-center">
                            <LiaArrowLeftSolid />
                            Back to login
                        </p>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default UpdatePassword;
