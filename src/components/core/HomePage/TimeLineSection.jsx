import React from "react";
import Logo1 from "..//../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "..//../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "..//../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "..//../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
    {
        Logo: Logo1,
        Heading: "Leadership",
        Description: "Fully committed to the success company",
    },
    {
        Logo: Logo2,
        Heading: "Responsiblity",
        Description: "Students will always be our top priority",
    },
    {
        Logo: Logo3,
        Heading: "Flexibility",
        Description: "The ability to switch is an important",
    },
    {
        Logo: Logo4,
        Heading: "Solve the problem",
        Description: "Code your way to a solution",
    },
];

const TimeLineSection = () => {
    return (
        <div className="">
            <div className="flex lg:flex-row flex-col gap-15 items-center">
                {/* Left box */}
                <div className="lg:w-[45%] flex flex-col gap-10 ">
                    {/* Mapping */}
                    {timeline.map((element, index) => {
                        return (
                            <div className="flex flex-row gap-6" key={index}>
                                {/* left dabba*/}
                                <div className="w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full">
                                    <img src={element.Logo} alt="logo" />
                                </div>
                                {/* <div className='w-1 h-10'></div> */}
                                {/* Right dabba */}
                                <div>
                                    <h2 className="font-semibold text-[18px]">
                                        {element.Heading}
                                    </h2>
                                    <p className="text-base">
                                        {element.Description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Image box */}
                <div className="relative shadow-blue-200">
                    <img
                        src={timelineImage}
                        alt="timelineImage"
                        className="shadow-white object-cover h-fit"
                    />

                    <div className="absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-10 left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7">
                            <p className="text-3xl font-bold">10</p>
                            <p className="gap-1 text-caribbeangreen-300 text-sm">
                                Years of Experience
                            </p>
                        </div>

                        <div className="flex gap-5 items-center px-7">
                            <p className="text-3xl font-bold">250</p>
                            <p className="gap-1 text-caribbeangreen-300 text-sm">
                                Types of courses
                            </p>{" "}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimeLineSection;
