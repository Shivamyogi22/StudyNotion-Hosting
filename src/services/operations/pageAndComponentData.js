import React from "react";
import toast from "react-hot-toast";
import { apiConnector } from "../apiconnector";
import { catalogData } from "../apis";

export const getCatalogaPageData = async (categoryId) => {
    const toastId = toast.loading("Loading...");
    let result = [];
    try {
        const response = await apiConnector(
            "POST",
            catalogData.CATALOGPAGEDATA_API,
            { categoryId: categoryId }
        );
        // console.log("RESPONSE FOR THE ID", response);
        if (!response?.data?.success)
            throw new Error("COULD NOT FETCH CATEGORY PAGE data");

        result = response?.data;
    } catch (error) {
        console.log("CATALOG_PAGE_DATA API ERROR----->>>", error);
        toast.error(error.message);
        result = error.response?.data;
    }
    toast.dismiss(toastId);
    return result;
};
