import { Link } from "react-router-dom";
import socials from "../../routes/socials";
import ToolTip from "../../components/ToolTip";
import Wrapper from "../../components/Wrapper";
import Contact from "../Contact/Contact";
const Footer = () => {
    return (
        <Wrapper id="getintouch" sizeFull={true} className="fixed inset-0">
            <div className="h-full flex flex-col justify-end ">
                <Contact />
                <footer className="bg-transparent lg:theme-reverse z-10 lg:z-0 px-6 lg:px-0  lg:pt-12 lg:pb-24">
                    <div className="w-full lg:max-w-full lg:w-[1300px] mx-auto">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full lg:w-1/4 px-3"></div>
                            <div className="w-1/2 text-xs lg:text-base text-[white] lg:text-[unset]  lg:w-1/4 px-3 mb-3">
                                <div>
                                    <h3 className="font-semibold">
                                        Contact me
                                    </h3>
                                    <h4>
                                        nguyenhoangkiet0810@gmail.com
                                        +84797372607
                                    </h4>
                                </div>
                            </div>
                            <div className="w-1/2 lg:w-2/4 px-3 ">
                                <div className="flex flex-wrap  lg:gap-4 -mx-2">
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
};
export default Footer;
