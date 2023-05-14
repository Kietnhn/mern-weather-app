import { createContext, useReducer } from "react";
import { settingsReducer } from "../reducers/settingsReducer";
import {
    IS_SHOW_MODAL_LOGIN,
    IS_SHOW_MODAL_UPDATE_PROFILE,
    SET_GLOBAL_ALERT,
    SET_UNITS,
} from "./constants";
export const SettingsContext = createContext();

const SettingsContextProvider = ({ children }) => {
    // eslint-disable-next-line no-unused-vars
    const [settingsState, dispatch] = useReducer(settingsReducer, {
        units: "metric",
        isShowModalLogin: false,
        isShowModalUpdateProfile: false,
        globalAlert: null,
    });
    const changeUnitsTemperature = (payload) => {
        dispatch({ type: SET_UNITS, payload });
    };
    const toggleModalLogin = (payload) => {
        dispatch({ type: IS_SHOW_MODAL_LOGIN, payload });
    };
    const toggleModalUpdateProfile = (payload) => {
        dispatch({ type: IS_SHOW_MODAL_UPDATE_PROFILE, payload });
    };
    const setGlobalAlert = (payload) => {
        dispatch({ type: SET_GLOBAL_ALERT, payload });
    };
    const SettingsData = {
        settingsState,
        changeUnitsTemperature,
        toggleModalLogin,
        setGlobalAlert,
        toggleModalUpdateProfile,
    };
    return (
        <SettingsContext.Provider value={SettingsData}>
            {children}
        </SettingsContext.Provider>
    );
};
export default SettingsContextProvider;
