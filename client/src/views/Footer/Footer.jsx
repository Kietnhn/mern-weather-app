import { Link } from "react-router-dom";
import socials from "../../routes/socials";
import ToolTip from "../../components/ToolTip";
import Wrapper from "../../components/Wrapper";
import Contact from "../Contact/Contact";
import { forwardRef } from "react";
const Footer = forwardRef((_, ref) => {
    return (
        <Wrapper
            ref={ref}
            id="getintouch"
            sizeFull={true}
            className="fixed inset-0 lg:static"
        >
            <div className="h-full flex flex-col justify-end ">
                <Contact />
                <footer className="bg-transparent sm:theme-reverse z-10 lg:z-0 px-6 lg:px-0  sm:pt-12 sm:pb-12 md:pb-24">
                    <div className="w-full xl:max-w-full lg:w-[900px] xl:w-[1300px] lg:mt-5 xl:mt-0  mx-auto">
                        <div className="flex flex-wrap -mx-3 ">
                            <div className="w-full lg:hidden xl:block xl:w-1/4 px-3"></div>
                            <div className="w-1/2 text-xs md:text-base text-[white] sm:text-[unset]  xl:w-1/4 px-3 mb-3">
                                <div>
                                    <h3 className="font-semibold">
                                        Contact me
                                    </h3>
                                    <h4>
                                        nguyenhoangkiet0810@gmail.com
                                        <br />
                                        +84797372607
                                    </h4>
                                </div>
                            </div>
                            <div className="w-1/2 xl:w-2/4 px-3 ">
                                <div className="flex flex-wrap lg:justify-end xl:justify-start lg:gap-4 -mx-2">
                                    {socials.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <div
                                                key={social.name}
                                                className="w-1/2 lg:w-[unset] px-2 mb-3 center"
                                            >
                                                <ToolTip message={social.name}>
                                                    <button className="p-2 rounded-full theme brightness-[.7] hover:brightness-[1]">
                                                        <Link
                                                            to={social.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <span>
                                                                <Icon
                                                                    width="20px"
                                                                    height="20px"
                                                                />
                                                            </span>
                                                        </Link>
                                                    </button>
                                                </ToolTip>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </Wrapper>
    );
});
export default Footer;
