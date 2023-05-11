import { Link } from "react-router-dom";
import socials from "../../routes/socials";
import ToolTip from "../../components/ToolTip";
import Wrapper from "../../components/Wrapper";
import Contact from "../Contact/Contact";
const Footer = () => {
    return (
        <Wrapper id="getintouch" sizeFull={true}>
            <div className="h-full flex flex-col justify-end">
                <Contact />
                <footer className="theme-reverse pt-12 pb-24">
                    <div className="w-full lg:max-w-full lg:w-[1300px] mx-auto">
                        <div className="flex flex-wrap -mx-3">
                            <div className="w-full lg:w-1/4 px-3"></div>
                            <div className="w-full lg:w-1/4 px-3">
                                <h3>Contact me</h3>
                                <div>
                                    nguyenhoangkiet0810@gmail.com +84797372607
                                </div>
                            </div>
                            <div className="w-full lg:w-2/4 px-3">
                                <div className="flex gap-4">
                                    {socials.map((social) => {
                                        const Icon = social.icon;
                                        return (
                                            <div key={social.name}>
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
