import { Menu as ModalMenu } from "../../components/Modals/Menu";
import SearchCountryState from "../Search/SearchCountryState";

function Header() {
    return (
        <div className="fixed top-5 left-6 right-6 z-50">
            <div className="flex items-center justify-between gap-4">
                <ModalMenu className="" />

                <SearchCountryState size="small" />
                {/* <Search /> */}
            </div>
        </div>
    );
}

export default Header;
