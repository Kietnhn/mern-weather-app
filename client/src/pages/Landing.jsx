import { useContext } from "react";
import Search from "../views/Search";
import { Menu as ModalMenu } from "../components/Modals/Menu";
import homepage from "../assets/img/homepage.png";
import { ChevronLeftIcon } from "../components/icons";
import { AuthContext } from "../contexts/AuthContext";
import { CityContext } from "../contexts/CityContext";
import { useEffect } from "react";
import { LOCAL_STORAGE_TOKEN_NAME } from "../contexts/constants";
import RecommendPosition from "../components/RecommendPosition";
import SearchCountryState from "../views/Search/SearchCountryState";
import CitiesLanding from "../components/CitiesLanding";
// import { PositionContext } from "../contexts/PositionContext";
// import landing1 from "../assets/img/landing1.jpg";
// import landing2 from "../assets/img/landing2.jpg";
// import landing3 from "../assets/img/landing3.jpg";
// import landing4 from "../assets/img/landing4.jpg";
// import landing5 from "../assets/img/landing5.jpg";

// const landings = [landing1, landing2, landing3, landing4, landing5];
function Landing() {
    const { getCities } = useContext(CityContext);
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    // const {
    //     positionState: { currentPosition },
    // } = useContext(PositionContext);
    // const [landing, setLanding] = useState(landing1);
    // const landingRef = useRef();

    // useEffect(() => {
    //     console.log(landing);
    // }, [landing]);

    // useEffect(() => {
    //     const timout = setInterval(() => {
    //         const randomIndex = Math.floor(Math.random() * landings.length);
    //// check exist random landing
    //         setLanding(landings[randomIndex]);
    //     }, 5000);
    //     return () => clearInterval(timout);
    // }, []);

    // if authenticated if use the lovecity list to render replace defaultData if(lovecity.length > 0)
    // if authenticated --> call cities
    useEffect(() => {
        if (localStorage[LOCAL_STORAGE_TOKEN_NAME]) {
            const fetchApi = async () => {
                // get cities from user
                await getCities();
            };
            fetchApi();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <div
            className={`bg-no-repeat bg-cover bg-center brightness-90 lg:brightness-100 w-full
             h-screen dark:bg-[#101014] bg-white px-[26px] relative lg:w-screen overflow-hidden lg:h-screen lg:mx-auto  "
            `}
            style={{ backgroundImage: `url(${homepage})` }}
        >
            <div className="fixed top-5 left-6 right-6 z-50 lg:hidden">
                <ModalMenu />
            </div>
            {!isAuthenticated && (
                <div className="fixed left-8 top-8 lg:hidden">
                    <button
                        className="p-2 rounded-full bg-[rgba(150,28,28,0.4)] text-text"
                        onClick={() => window.history.back()}
                    >
                        <span>
                            <ChevronLeftIcon width="18px" height="18px" />
                        </span>
                    </button>
                </div>
            )}
            <div className="relative mx-auto pt-5 pb-10  w-[300px] z-[49] lg:w-[900px] h-screen flex flex-col justify-between  ">
                <div>
                    <div className="mb-4 lg:flex lg:justify-center lg:items-end">
                        <h1 className="text-6xl font-bold text-center title ">
                            WeT
                        </h1>
                    </div>
                    {/* <Search /> */}
                    <SearchCountryState />
                </div>
                {/* famous Cities using data default */}
                <CitiesLanding />
            </div>
            <RecommendPosition />
        </div>
    );
}

export default Landing;
