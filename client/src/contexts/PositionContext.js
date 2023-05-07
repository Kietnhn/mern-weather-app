import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { positionReducer } from "../reducers/positionReducer";
import {
    apiUrl,
    SET_CURRENT_POSIITON,
    SET_LOADING,
    SET_POSITIONS,
    SET_AREA_ON_MAP,
} from "./constants";
export const PositionContext = createContext();
const PositionContextProvider = ({ children }) => {
    const [positionState, dispatch] = useReducer(positionReducer, {
        positions: null,
        currentPosition: null,
        areaOnMap: "",
        isLoading: false,
    });
    const getPosition = async (position, limit = 5) => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        try {
            const data = await axios
                .get(`${apiUrl}/position`, {
                    params: {
                        position,
                        limit,
                    },
                })
                .then((res) => {
                    if (res.data.data.length < 1) {
                        return [];
                    }
                    return res.data.data;
                });
            dispatch({
                type: SET_POSITIONS,
                payload: data,
            });
            console.log("positions", data);
            if (data.length < 1) {
                return { success: false, data, message: "No results found" };
            }
            return { success: true, data, message: "" };
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.log(error);
        }
        // position is name of countr,city
    };
    const getCurrenPosition = async () => {
        dispatch({
            type: SET_LOADING,
            payload: true,
        });
        try {
            const response = await axios(`${apiUrl}/position/current`);
            if (response.data.success) {
                console.log("current Position", response.data.data);
                dispatch({
                    type: SET_CURRENT_POSIITON,
                    payload: response.data.data,
                });
            }
        } catch (error) {
            dispatch({
                type: SET_LOADING,
                payload: false,
            });
            console.log(error);
        }
        // const { latitude, longitude } = response.data.data;
        // await getNearByPosition({ lat: latitude, lon: longitude });
    };
    const getPositionByLatLon = async ({ lat, lon, limit = 1 }) => {
        // dispatch({
        //     type: SET_LOADING,
        //     payload: true,
        // });
        try {
            const response = await axios
                .get(`${apiUrl}/position/reverse`, {
                    params: {
                        lat,
                        lon,
                        limit,
                    },
                })
                .then((res) => {
                    return res.data;
                });
            dispatch({
                type: SET_AREA_ON_MAP,
                payload: response.data[0],
            });
        } catch (e) {
            console.log(e);
        }
    };
    const getNearByPosition = async ({ lat, lon }) => {
        const data = await axios.get(`${apiUrl}/position/nearby`, {
            params: {
                lat,
                lon,
            },
        });
        console.log("newarby", data);
    };
    const setAreaOnMap = (payload) => {
        dispatch({
            type: SET_AREA_ON_MAP,
            payload: payload,
        });
    };
    useEffect(() => {
        getCurrenPosition();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const PositionContextData = {
        positionState,
        getPosition,
        getCurrenPosition,
        getNearByPosition,
        getPositionByLatLon,
        setAreaOnMap,
    };
    return (
        <PositionContext.Provider value={PositionContextData}>
            {children}
        </PositionContext.Provider>
    );
};
export default PositionContextProvider;
