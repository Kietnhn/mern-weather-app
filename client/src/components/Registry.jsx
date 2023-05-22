import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
// import { ChevronLeftIcon } from "../components/icons";
import Input from "../views/Contact/Input";
import validateEmail from "../utils/validateEmail";
import { SettingsContext } from "../contexts/SettingsContext";
import useDetectUserDevice from "../hooks/useDetectUserDevice";
const Register = ({ onChangeForm }) => {
    const { registerUser } = useContext(AuthContext);
    const [alert, setAlert] = useState(null);
    const [registerForm, setRegisterForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const navigate = useNavigate();
    const { toggleModalLogin } = useContext(SettingsContext);
    const [isMobile] = useDetectUserDevice();
    const onChangeRegistryForm = (e) =>
        setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    const register = async (e) => {
        e.preventDefault();
        const { password, confirmPassword, email } = registerForm;

        if (password !== confirmPassword) {
            setAlert({ type: "danger", message: "Passwords do not match" });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }
        if (!validateEmail(email)) {
            setAlert({ type: "danger", message: "Invalid Email" });
            setTimeout(() => {
                setAlert(null);
            }, 3000);
            return;
        }
        try {
            const registerData = await registerUser(registerForm);
            if (!registerData.success) {
                setAlert({ type: "danger", message: registerData.message });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            } else {
                if (isMobile) {
                    navigate("/today");
                } else {
                    toggleModalLogin(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-between  font-semibold theme text-center p-8">
            <h1 className="text-3xl font-bold mb-4 uppercase">Sign up</h1>

            <form className="w-full" onSubmit={register}>
                {[...Object.keys(registerForm)].map((item) => (
                    <div key={item} className="w-full">
                        <Input
                            name={item}
                            value={registerForm[item]}
                            onChange={onChangeRegistryForm}
                            placeholder={item}
                        />
                    </div>
                ))}

                {alert && <h1 className="text-[red]">{alert.message}</h1>}
                <button className="mt-10 button ">Sign up</button>
            </form>
            <div className="text-start w-full">
                <p className="text-text">Already have an account ?</p>
                <p className="xl:hidden hover:cursor-pointer hover:underline">
                    <Link to="/login">Sign in</Link>
                </p>
                <p
                    className="hidden xl:block  hover:cursor-pointer hover:underline"
                    onClick={onChangeForm}
                >
                    Sign in
                </p>
            </div>
        </div>
    );
};

export default Register;
