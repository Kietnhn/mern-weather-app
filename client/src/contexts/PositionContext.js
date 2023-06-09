import axios from "axios";
import { createContext, useEffect, useReducer } from "react";
import { positionReducer } from "../reducers/positionReducer";
import {
    apiUrl,
    SET_CURRENT_POSIITON,
    SET_LOADING,
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
            const response = await axios
                .get(`${apiUrl}/position`, {
                    params: {
                        position,
                        limit,
                    },
                })
                .then((res) => {
                    return res.data;
                });
            if (response.success) {
                return response.data;
            } else {
                return [];
            }
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
                const lat = response.data.data.latitude;
                const lon = response.data.data.longitude;
                const country = response.data.data.countryCode;
                const city = response.data.data.city;
                const currentPosition = {
                    ...response.data.data,
                    lat,
                    lon,
                    country,
                    city,
                };
                dispatch({
                    type: SET_CURRENT_POSIITON,
                    payload: currentPosition,
                });
                return currentPosition;
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

            return response.data[0];
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
        // // if access in the first time
        // const setCurrentPosition = async ()=>{
        //     if(!user.currentPosition){
        //         const currentPosition = await getCurrenPosition();
        //         await updateUser({currentPosition:{
        //             latitude: currentPosition.latitude,
        //             longitude: currentPosition.longitude,
        //             city: currentPosition.city,
        //             countryCode: currentPosition.countryCode
        //         }})

        //     }else{
        //         // if not sign in then only get the current position
        //     }
        // }
        // setCurrentPosition();
        const setCurrentPosition = async () => {
            await getCurrenPosition();
        };
        setCurrentPosition();
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
