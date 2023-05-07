import { NavLink } from "react-router-dom";

function Menu() {
    return (
        <div className="">
            <button className="px-3 ">
                <NavLink
                    to="/today"
                    className={({ isActive }) =>
                        isActive ? "text-primaryText" : "text-text"
                    }
                >
                    Today
                </NavLink>
            </button>
            <button className="px-3 ">
                <NavLink
                    to="/tomorrow"
                    className={({ isActive }) =>
                        isActive ? "text-primaryText" : "text-text"
                    }
                >
                    Tomorrow
                </NavLink>
            </button>
            <button className="px-3 ">
                <NavLink
                    to="/next7Day"
                    className={({ isActive }) =>
                        isActive ? "text-primaryText" : "text-text"
                    }
                >
                    Next 7 Day
                </NavLink>
            </button>
        </div>
    );
}
export default Menu;
