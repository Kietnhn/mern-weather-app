export const cityReducer = (state, action) => {
    const { type, payload } = action;
    switch (type) {
        case "SET_CITIES":
            return {
                ...state,
                cities: payload,
            };
        case "ADD_CITY":
            return {
                ...state,
                cities: [...state.cities, payload],
            };
        case "DELETE_CITY":
            return {
                ...state,
                cities: state.cities.filter((city) => city._id !== payload),
            };
        case "SET_CITIES_WEATHER":
            return {
                ...state,
                cities: payload,
                isLoadingWeather: false,
            };
        default:
            return state;
    }
};
