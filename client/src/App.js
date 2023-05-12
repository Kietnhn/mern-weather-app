import WeatherContextProvider from "./contexts/WeatherContext";
import AuthContextProvider from "./contexts/AuthContext";
import PositionContextProvider from "./contexts/PositionContext";
import AirContextProvider from "./contexts/AirContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout/MainLayout";
import {
    Today,
    Calendar,
    Home,
    Next7Day,
    Landing,
    Login,
    Register,
    City,
    Comparative,
} from "./pages";
import CityContextProvider from "./contexts/CityContext";
import IntervalServerError from "./pages/IntervalServerError";
import PageNotFound from "./pages/PageNotFound";
import ProtectedRoutesIsMobile from "./layout/MainLayout/ProtectedRoutesIsMobile";
import mobileRoutes from "./routes/mobileRoutes";
function App() {
    return (
        <>
            <AuthContextProvider>
                <PositionContextProvider>
                    <AirContextProvider>
                        <WeatherContextProvider>
                            <CityContextProvider>
                                <Router>
                                    <Routes>
                                        {/* Protected Lading && Protected Love Position */}

                                        <Route path="/" element={<Home />} />
                                        <Route
                                            path="/home"
                                            element={<Home />}
                                        />
                                        <Route
                                            path="/landing"
                                            element={<Landing />}
                                        />
                                        <Route
                                            path="/today"
                                            element={
                                                <MainLayout>
                                                    {<Today />}
                                                </MainLayout>
                                            }
                                        />
                                        {mobileRoutes.map((mobileRoute) => {
                                            const Page = mobileRoute.element;
                                            return (
                                                <Route
                                                    key={mobileRoute.path}
                                                    path={mobileRoute.path}
                                                    element={
                                                        <ProtectedRoutesIsMobile>
                                                            <MainLayout>
                                                                <Page />
                                                            </MainLayout>
                                                        </ProtectedRoutesIsMobile>
                                                    }
                                                />
                                            );
                                        })}

                                        <Route
                                            path="/calendar"
                                            element={
                                                <MainLayout>
                                                    {<Calendar />}
                                                </MainLayout>
                                            }
                                        />
                                        <Route
                                            path="/next7Day"
                                            element={
                                                <MainLayout>
                                                    {<Next7Day />}
                                                </MainLayout>
                                            }
                                        />
                                        <Route
                                            path="/login"
                                            element={<Login />}
                                        />
                                        <Route
                                            path="/register"
                                            element={<Register />}
                                        />

                                        <Route
                                            path="/server-error"
                                            element={<IntervalServerError />}
                                        />
                                        <Route
                                            path="/comparative"
                                            element={
                                                <MainLayout>
                                                    <Comparative />
                                                </MainLayout>
                                            }
                                        />
                                        <Route
                                            path="/page-not-found"
                                            element={<PageNotFound />}
                                        />
                                        <Route
                                            path="*"
                                            element={<PageNotFound />}
                                        />
                                    </Routes>
                                </Router>
                            </CityContextProvider>
                        </WeatherContextProvider>
                    </AirContextProvider>
                </PositionContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
