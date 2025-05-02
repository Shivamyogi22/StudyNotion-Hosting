import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../common/IconBtn";
import { BiSolidEditAlt } from "react-icons/bi";

const MyProfile = () => {
    const { user } = useSelector((state) => state.profile);
    // console.log( "User data in my profile", user);
    const navigate = useNavigate();

    return (
        <div className="text-white">
            <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                My Profile
            </h1>
            {/*Section 1 :  Name and edit */}
            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img
                        src={user?.image}
                        alt={`profile-${user?.firstName}`}
                        className="aspect-square w-[78px] rounded-full object-cover border-black border-1"
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-5 hover:cursor-pointer hover:scale-105">
                            {user?.firstName + " " + user?.lastName}
                        </p>
                        <p className="text-sm text-richblack-300">
                            {user?.email}
                        </p>
                    </div>
                </div>
                {/* Edit button */}
                <IconBtn
                    text="Edit"
                    onclick={() => {
                        navigate("/dashboard/settings");
                    }}
                >
                    {" "}
                    <BiSolidEditAlt />{" "}
                </IconBtn>
            </div>

            {/* Section 2 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                        About
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}
                    >
                        <BiSolidEditAlt />
                    </IconBtn>
                </div>
                <p>
                    {" "}
                    {user?.additionalDetails?.about ??
                        "Write Something about Yourself"}
                </p>
            </div>

            {/* Section 3 */}
            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                {/* Personal details */}
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-5">
                        Personal Details
                    </p>
                    <IconBtn
                        text="Edit"
                        onclick={() => {
                            navigate("/dashboard/settings");
                        }}
                    >
                        <BiSolidEditAlt />
                    </IconBtn>
                </div>

                <div className="flex max-w-[500px] justify-between">
                    {/* Right Side - FirstName, Email, Gender */}
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                First Name
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                Email
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                Gender
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.gender ??
                                    "Add Gender"}
                            </p>
                        </div>
                    </div>

                    {/* Left Side Last Name, phone number, DOB  */}
                    <div className="flex flex-col gap-y-5">
                        {/* Last name */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                Last Name
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.lastName}
                            </p>
                        </div>

                        {/* Phone number */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                Phone Number
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {user?.additionalDetails?.contactNumber ??
                                    "Add Contact Number"}
                            </p>
                        </div>

                        {/* Date of birth */}
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">
                                Date Of Birth
                            </p>
                            <p className="text-sm font-medium text-richblack-5">
                                {/* Ye milgyi to use kr lena nhi to "Ye text rkh dena" */}
                                {user?.additionalDetails?.dateOfBirth ??
                                    "Add Date of birth"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
