import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import WeatherContextProvider from "./contexts/WeatherContext";
import AuthContextProvider from "./contexts/AuthContext";
import PositionContextProvider from "./contexts/PositionContext";
import AirContextProvider from "./contexts/AirContext";
import SettingsContextProvider from "./contexts/SettingsContext";
import CityContextProvider from "./contexts/CityContext";

import MainLayout from "./layout/MainLayout/MainLayout";
import ProtectedRoutesIsMobile from "./layout/MainLayout/ProtectedRoutesIsMobile";
import {
    Today,
    Calendar,
    Home,
    Landing,
    Comparative,
    IntervalServerError,
    PageNotFound,
} from "./pages";

import mobileRoutes from "./routes/mobileRoutes";
function App() {
    return (
        <>
            <AuthContextProvider>
                <SettingsContextProvider>
                    <PositionContextProvider>
                        <AirContextProvider>
                            <WeatherContextProvider>
                                <CityContextProvider>
                                    <Router>
                                        <Routes>
                                            <Route
                                                path="/"
                                                element={<Home />}
                                            />
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
                                                const Page =
                                                    mobileRoute.element;
                                                const Layout =
                                                    mobileRoute.layout;
                                                return (
                                                    <Route
                                                        key={mobileRoute.path}
                                                        path={mobileRoute.path}
                                                        element={
                                                            <ProtectedRoutesIsMobile>
                                                                {Layout ? (
                                                                    <Layout>
                                                                        <Page />
                                                                    </Layout>
                                                                ) : (
                                                                    <Page />
                                                                )}
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
                                                path="/server-error"
                                                element={
                                                    <IntervalServerError />
                                                }
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
                </SettingsContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
