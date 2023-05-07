const validateEmail = (value) => {
    if (!value) return false;
    const regex =
        // eslint-disable-next-line no-useless-escape
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return value.match(regex);
};
export default validateEmail;
