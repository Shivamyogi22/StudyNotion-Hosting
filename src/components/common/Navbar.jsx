import React, { useEffect, useState } from "react";
import { Link, matchPath } from "react-router-dom";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { NavbarLinks } from "../../data/navbar-links";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileDropDown from "../core/Auth/ProfileDropDown";

import { AiOutlineMenu, AiOutlineShoppingCart } from "react-icons/ai";
import { apiConnector } from "../../services/apiconnector";
import { categories } from "../../services/apis";

import { IoIosArrowDown } from "react-icons/io";
import { ACCOUNT_TYPE } from "../../utils/constants";

const Navbar = () => {
    //Redux ki state ko fetch krna hoga
    const { token } = useSelector((state) => state.auth);
    const { user } = useSelector((state) => state.profile);
    const { totalItems } = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);

    const location = useLocation();

    //api call*****************************************
    const [subLinks, setSubLinks] = useState([]);
    const fetchSubLinks = async () => {
        setLoading(true);
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            // console.log("Printing SubLinks result", result);
            setSubLinks(result.data.data);
        } catch (error) {
            console.log("Could not fetch the category list");
        }
        setLoading(false);
    };

    // console.log("FETCHED LINKS___>>>",fetchSubLinks);

    useEffect(() => {
        fetchSubLinks();
    }, []);
    //  setSubLinks(fetchSubLinks());

    // **************************************************

    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };

    return (
        <div
            className={`flex h-14 items-center justify-center border-b-[1px] border-b-richblack-700 ${
                location.pathname !== "/" ? "bg-richblack-800" : ""
            } transition-all duration-200`}
        >
            <div className="flex w-11/12 max-w-[1260px] items-center justify-between">
                {/* Image */}
                <Link to="/">
                    <img
                        src={logo}
                        alt="logo"
                        width={160}
                        height={32}
                        loading="lazy"
                    />
                </Link>

                {/* Nav links  */}
                <nav>
                    <ul className="flex gap-x-6 text-richblack-25">
                        {NavbarLinks.map((link, index) => (
                            <li key={index}>
                                {link.title === "Catalog" ? (
                                    <>
                                        <div
                                            className={`group relative flex cursor-pointer items-center gap-1 ${
                                                matchRoute(
                                                    "/catalog/:catalogName"
                                                )
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                            }`}
                                        >
                                            <p>{link.title}</p>
                                            <IoIosArrowDown />

                                            <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em] flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] group-hover:opacity-100 lg:w-[300px]">
                                                <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5"></div>

                                                {/* adding sublinks  */}
                                                {loading ? (
                                                    <p className="text-center">
                                                        Loading...
                                                    </p>
                                                ) : subLinks.length ? (
                                                    <>
                                                        {subLinks
                                                            ?.filter(
                                                                (subLink) =>
                                                                    subLink
                                                                        ?.courses
                                                                        ?.length >
                                                                    0
                                                            )
                                                            .map(
                                                                (
                                                                    subLink,
                                                                    index
                                                                ) => (
                                                                    <Link
                                                                        to={`/catalog/${subLink.name
                                                                            .split(
                                                                                " "
                                                                            )
                                                                            .join(
                                                                                "-"
                                                                            )
                                                                            .toLowerCase()}`}
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <p className="text-richblack-900 hover:font-bold text-lg hover:text-xl transition-all duration-100">
                                                                            {
                                                                                subLink.name
                                                                            }
                                                                        </p>
                                                                    </Link>
                                                                )
                                                            )}
                                                    </>
                                                ) : (
                                                    <p className="text-center">
                                                        No Courses Found
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <Link to={link?.path}>
                                        <p
                                            className={`${
                                                matchRoute(link?.path)
                                                    ? "text-yellow-25"
                                                    : "text-richblack-25"
                                            }`}
                                        >
                                            {link.title}
                                        </p>
                                    </Link>
                                )}
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Login / Signup / Dashboard */}
                <div className="flex gap-x-4 items-center">
                    {/* Checking user type and showing icons accordingly-- argr user instructor nhi h to humko cart show hogi */}
                    {user && user?.accountType !== ACCOUNT_TYPE.INSTRUCTOR && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-2xl text-richblack-100" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {/* Checking login */}
                    {token === null && (
                        <Link to="/login">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">
                                Login
                            </button>
                        </Link>
                    )}

                    {/* Checking signup */}
                    {token === null && (
                        <Link to="/signup">
                            <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-lg">
                                {" "}
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {/* Agr token present h to fir user ki profile se related cehze show kro */}
                    {token !== null && <ProfileDropDown />}
                </div>
                {/* <button className="mr-4 md:hidden">
                    <AiOutlineMenu fontSize={24} fill="#AFB2BF" />
                </button> */}
            </div>
        </div>
    );
};

export default Navbar;
