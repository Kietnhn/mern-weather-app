import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../views/Contact/Input";
import { AuthContext } from "../contexts/AuthContext";
import { CityContext } from "../contexts/CityContext";
import { SettingsContext } from "../contexts/SettingsContext";
import useDetectUserDevice from "../hooks/useDetectUserDevice";
const Login = ({ onChangeForm }) => {
    const { loginUser } = useContext(AuthContext);
    const { getCities } = useContext(CityContext);
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null);
    const [loginForm, setLoginForm] = useState({
        email: "",
        password: "",
    });
    const { toggleModalLogin } = useContext(SettingsContext);
    const [isMobile] = useDetectUserDevice();
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                await getCities();
                if (isMobile) {
                    navigate("/today");
                } else {
                    toggleModalLogin(false);
                }
            } else {
                setAlert({ type: "danger", message: loginData.message });
                setTimeout(() => {
                    setAlert(null);
                }, 3000);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="w-full flex flex-col items-center justify-between  font-semibold theme text-center p-8">
            <h1 className="text-3xl font-bold mb-4 uppercase">Sign in</h1>

            <form className="w-full" onSubmit={login}>
                {[...Object.keys(loginForm)].map((item) => (
                    <div key={item} className="w-full">
                        <Input
                            alert={alert}
                            name={item}
                            value={loginForm[item]}
                            onChange={onChangeLoginForm}
                            placeholder={item}
                        />
                    </div>
                ))}

                {alert && <h1 className="text-[red]">{alert.message}</h1>}
                <button className="mt-10 button ">Sign in</button>
            </form>
            <div className="text-start w-full">
                <p className="text-text">Don't have an account ?</p>
                <p className="lg:hidden hover:cursor-pointer hover:underline">
                    <Link to="/registry">Sign up</Link>
                </p>
                <p
                    className="hidden lg:block  hover:cursor-pointer hover:underline"
                    onClick={onChangeForm}
                >
                    Sign up
                </p>
            </div>
        </div>
    );
};

export default Login;
