import React from "react";
import { FooterLink2 } from "../../data/footer-links";
import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaFacebook, FaGoogle, FaTwitter, FaYoutube } from "react-icons/fa";

const BottomFooter = ["Privacy Policy", "Cookie Policy", "Terms"];
const Resources = [
    "Articles",
    "Blog",
    "Chart Sheet",
    "Code challenges",
    "Docs",
    "Projects",
    "Videos",
    "Workspaces",
];
const Plans = ["Paid memberships", "For students", "Business solutions"];
const Community = ["Forums", "Chapters", "Events"];

const Footer = () => {
    return (
        <div className="bg-richblack-800">
            <div className="flex lg:flex-row gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto relative py-14">
                <div className="border-b w-[100%] flex flex-col lg:flex-row pb-5 border-richblack-700">
                    {/* Section 1 */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between lg:border-r lg:border-richblack-700 pl-3 lg:pr-5 gap-3">
                        {/* Part-1 */}
                        <div className="w-[30%] flex flex-col gap-3 lg:w-[30%] mb-7 lg:pl-0">
                           
                            {/* Logo img */}
                            <img src={Logo} alt="" className="object-contain" />

                            {/* Heading-1 */}
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Company
                            </h1>

                            {/* List items-1 */}
                            <div className="flex flex-col gap-2">
                                {["About", "Careers", "Affiliates"].map(
                                    (element, i) => {
                                        return (
                                            <div
                                                key={i}
                                                className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                            >
                                                <Link
                                                    to={element.toLowerCase()}
                                                >
                                                    {element}
                                                </Link>
                                            </div>
                                        );
                                    }
                                )}
                            </div>

                            {/* Social Links logo */}
                            <div className="flex gap-3 text-xl">
                                <Link
                                    to={"/facebook"}
                                    className="hover:text-blue-200 transition"
                                >
                                    <FaFacebook />
                                </Link>
                                <Link
                                    to={"/google"}
                                    className="hover:text-pink-400 transition"
                                >
                                    <FaGoogle />
                                </Link>

                                <Link
                                    to={"/twitter"}
                                    className="hover:text-blue-200 transition"
                                >
                                    <FaTwitter />
                                </Link>
                                <Link
                                    to={"/youtube"}
                                    className="hover:text-pink-600 transition"
                                >
                                    <FaYoutube />
                                </Link>
                            </div>

                            <div></div>
                        </div>

                        {/* Part-2- Resource/Support*/}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            {/* Heading-2 Resource */}
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Resources
                            </h1>

                            {/* List using Map */}
                            <div className="flex flex-col gap-2 mt-2">
                                {Resources.map((items, index) => {
                                    return (
                                        <div key={index} className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200">
                                            <Link to={items.split(" ").join("-").toLowerCase()}>
                                                {items}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Heading-3 Support */}
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                                Support
                            </h1>

                            {/* Item */}
                            <div className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200 mt-2">
                                <Link to={"/help-center"}>Help Center</Link>
                            </div>
                        </div>

                        {/* Part-3 Plans/Community */}
                        <div className="w-[48%] lg:w-[30%] mb-7 lg:pl-0">
                            {/* Heading-4 Plans */}
                            <h1 className="text-richblack-50 font-semibold text-[16px]">
                                Plans
                            </h1>

                            {/* List using map */}
                            <div className="flex flex-col gap-2 mt-2">
                                {Plans.map((ele, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                            <Link to={ele.split(" ").join("-").toLowerCase()} >
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* Heading-5 Community */}
                            <h1 className="text-richblack-50 font-semibold text-[16px] mt-7">
                                Community
                            </h1>

                            {/* List using map */}
                            <div className="flex flex-col gap-2 mt-2">
                                {Community.map((ele, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                        >
                                            <Link
                                                to={ele.split(" ").join("-").toLowerCase()}
                                            >
                                                {ele}
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    </div>

                    {/* Section 2 */}
                    <div className="lg:w-[50%] flex flex-wrap flex-row justify-between pl-3 lg:pl-5 gap-3">
                        {FooterLink2.map((ele, i) => {
                            return (
                                <div
                                    key={i}
                                    className="w-[48%] lg:w-[30%] mb-7 lg:pl-0"
                                >
                                    <h1 className="text-richblack-50 font-semibold text-[16px]">
                                        {ele.title}
                                    </h1>
                                    <div className="flex flex-col gap-2 mt-2">
                                        {ele.links.map((link, index) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="text-[14px] cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                                >
                                                    <Link to={link.link}>
                                                        {link.title}
                                                    </Link>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="flex flex-row items-center justify-between w-11/12 max-w-maxContent text-richblack-400 mx-auto  pb-14 text-sm">
                {/* Section 1 */}
                <div className="flex justify-between lg:items-start items-center flex-col lg:flex-row gap-3 w-full">
                    <div className="flex flex-row">
                        {BottomFooter.map((ele, i) => {
                            return (
                                <div
                                    key={i}
                                    className={` ${
                                        BottomFooter.length - 1 === i
                                            ? ""
                                            : "border-r border-richblack-700 cursor-pointer hover:text-richblack-50 transition-all duration-200"
                                    } px-3 `}
                                >
                                    <Link
                                        to={ele
                                            .split(" ")
                                            .join("-")
                                            .toLocaleLowerCase()}
                                    >
                                        {ele}
                                    </Link>
                                </div>
                            );
                        })}
                    </div>

                    <div className="text-center">
                        Made with ❤️ CodeHelp © 2023 Studynotion
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
