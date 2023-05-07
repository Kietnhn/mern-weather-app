// import { Theme } from "../components/Theme";
import Homepage from "../assets/img/homepage.png";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
function Home() {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    if (isAuthenticated || window.innerWidth > 992)
        return <Navigate to="/landing" />;
    return (
        <>
            <div className="w-full h-screen home relative dark:text-white text-black ">
                <div
                    className="absolute inset-0  bg-no-repeat bg-cover bg-center"
                    style={{ backgroundImage: `url(${Homepage})` }}
                ></div>

                <div className="text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-black-400 p-3 rounded-[24px]">
                    <h1 className="text-6xl font-bold title ">Weather</h1>
                    <h3 className="text-lg font-semibold mt-2 mb-3">
                        Welcome to my website
                    </h3>
                    <div className="btns flex items-center justify-between">
                        <button className="px-3 py-2 rounded-full text-lg font-semibold bg-transparent border w-1/2 mx-2">
                            <Link to="/login">Sign in</Link>
                        </button>
                        <button className="px-3 py-2 rounded-full text-lg font-semibold bg-transparent border w-1/2 mx-2">
                            <Link to="/landing">Continue</Link>
                        </button>
                    </div>
                </div>
                <p className="absolute bottom-0 left-0 right-0 text-center text-lg">
                    &copy; by Kietnhn <a href="/">Terms & Conditions</a>
                </p>
            </div>
        </>
    );
}
export default Home;
