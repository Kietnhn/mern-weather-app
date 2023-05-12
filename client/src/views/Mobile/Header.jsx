import { useLocation } from "react-router-dom";
import { Menu as ModalMenu } from "../../components/Modals/Menu";
import SearchCountryState from "../Search/SearchCountryState";

function Header() {
    const location = useLocation();
    return (
        <div className="fixed top-5 left-6 right-6 z-50">
            <div className="flex items-center justify-between gap-4">
                <ModalMenu
                    className={`${
                        location.pathname !== "/get-in-touch"
                            ? ""
                            : "text-[white]"
                    }`}
                />

                {location.pathname !== "/get-in-touch" && (
                    <SearchCountryState size="small" />
                )}
            </div>
        </div>
    );
}

export default Header;
