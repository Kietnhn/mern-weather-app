import { NavLink } from "react-router-dom";
import navs from "../../routes/navigate";

function Navigation() {
    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-[49]">
                <div className="flex  items-center justify-center gap-5 duration-200  bg-primaryText dark:bg-secondDark  text-dark dark:text-primaryText px-6">
                    {navs.map((nav, index) => {
                        const Icon = nav.icon;
                        return (
                            <NavLink
                                key={index}
                                to={nav.to}
                                className={({ isActive }) =>
                                    `navlink  ${
                                        isActive ? "navActive indicator" : ""
                                    }`
                                }
                            >
                                <button className="iconNav ">
                                    <Icon width="18px" height="18px" />
                                </button>
                                <p className="titleNav">{nav.title}</p>
                            </NavLink>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default Navigation;
