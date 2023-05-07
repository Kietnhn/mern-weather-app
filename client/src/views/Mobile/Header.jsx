import Search from "../Search";

import { Menu as ModalMenu } from "../../components/Modals/Menu";

function Header() {
    return (
        <div className="fixed top-5 left-6 right-6 z-50">
            <div className="flex items-center justify-between gap-4">
                <ModalMenu className="" />

                <Search />
            </div>
        </div>
    );
}

export default Header;
