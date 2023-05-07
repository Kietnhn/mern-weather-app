import React from "react";
import contactImage from "../../assets/img/contact.png";
import FormContact from "./FormContact";
import Footer from "../Footer/Footer";

const Contact = () => {
    return (
        <>
            <div
                className="w-full relative min-h-[360px] contact theme-reverse bg-no-repeat bg-cover bg-center "
                style={{ backgroundImage: `url(${contactImage})` }}
                id="getintouch"
            >
                <div className="absolute w-[1300px] top-0 bottom-0 left-1/2 -translate-x-1/2 ">
                    <div className="absolute bottom-4 left-0">
                        <h1 className="text-5xl font-semibold  text-[white] pointer-events-none">
                            Get In Touch
                        </h1>
                    </div>
                    <div className="absolute top-0 bottom-0 right-0">
                        <FormContact />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Contact;
