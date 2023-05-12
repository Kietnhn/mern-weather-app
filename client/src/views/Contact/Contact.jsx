import React from "react";
import contactImage from "../../assets/img/contact.png";
import FormContact from "./FormContact";

const Contact = () => {
    return (
        <>
            <div
                className="w-full fixed inset-0 lg:relative min-h-[360px] lg:z-[11] contact theme lg:theme-reverse bg-no-repeat bg-cover bg-center "
                style={{ backgroundImage: `url(${contactImage})` }}
            >
                <div className="relative  p-6 lg:p-0 lg:absolute w-full lg:max-w-full  lg:w-[1300px] top-0 bottom-0 left-1/2 -translate-x-1/2 lg:between">
                    <div className="static mt-10 lg:mt-0 lg:h-full lg:flex lg:items-end lg:mb-4 ">
                        <h1 className="text-center lg:text-start text-5xl font-semibold text-[white]   pointer-events-none">
                            Get In Touch
                        </h1>
                    </div>
                    <div className="relative -translate-y-[1px]">
                        <FormContact />
                        <div className="hidden lg:block absolute theme top-full -z-[1] left-0 right-0 h-10 "></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
