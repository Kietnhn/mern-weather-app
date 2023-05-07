const filterListByName = (list, name) => {
    return list.filter(
        (position) =>
            position?.name?.toLowerCase().includes(name.toLowerCase()) ||
            position?.countryCode?.toLowerCase().includes(name.toLowerCase()) ||
            position?.isoCode?.toLowerCase().includes(name.toLowerCase())
    );
};
export default filterListByName;
