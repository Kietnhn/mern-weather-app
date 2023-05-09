import React from "react";
import contactImage from "../../assets/img/contact.png";
import FormContact from "./FormContact";

const Contact = () => {
    return (
        <>
            <div
                className="w-full relative min-h-[360px] contact theme-reverse bg-no-repeat bg-cover bg-center "
                style={{ backgroundImage: `url(${contactImage})` }}
            >
                <div className="absolute w-[1300px] top-0 bottom-0 left-1/2 -translate-x-1/2 ">
                    <div className="absolute bottom-4 left-0">
                        <h1 className="text-5xl font-semibold  text-[white] pointer-events-none">
                            Get In Touch
                        </h1>
                    </div>
                    <div className="absolute top-0 bottom-0 right-0">
                        <FormContact />
                        <div className="absolute top-full -z-[1] left-0 right-0 h-10 theme"></div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
