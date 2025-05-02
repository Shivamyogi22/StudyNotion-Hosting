import React from "react";
import { FaArrowRight } from "react-icons/fa";
import CTAButton from "../HomePage/Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
    position,
    heading,
    subheading,
    ctabtn1,
    ctabtn2,
    codeblock,
    backgroundGradient,
    codeColor,
}) => {
    return (
        <div
            className={`flex ${position} lg:my-20 my-10 justify-between gap-10`}
        >
            {/* Section 1 */}
            <div className="lg:w-[50%]  flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 font-bold">{subheading}</div>
                {/* 2 buttons */}
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-2 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight />
                        </div>
                    </CTAButton>

                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2 */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {/* HW- Bg-gradient */}
                {backgroundGradient}
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold bg-gray-800 p-6">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>

                {/* Code with type animation */}
                <div
                    className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}
                >
                    <TypeAnimation
                        sequence={[codeblock, 1000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                    />
                </div>
            </div>
        </div>
    );
};

export default CodeBlocks;
