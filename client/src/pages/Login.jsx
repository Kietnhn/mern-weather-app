import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { CityContext } from "../contexts/CityContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "../components/icons";
const Login = () => {
    const { loginUser } = useContext(AuthContext);
    const { getCities } = useContext(CityContext);
    // navigate
    const navigate = useNavigate();

    //alert
    const [alert, setAlert] = useState(null);

    const [loginForm, setLoginForm] = useState({
        username: "",
        password: "",
    });
    const { username, password } = loginForm;
    const onChangeLoginForm = (e) =>
        setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    const login = async (e) => {
        e.preventDefault();
        try {
            const loginData = await loginUser(loginForm);
            if (loginData.success) {
                await getCities();
                navigate("/today");
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
        <div
            className="w-full flex flex-col items-center justify-between h-screen font-semibold text-base text-primaryText text-center p-8"
            style={{
                background:
                    "linear-gradient(90deg, rgba(47,65,134,1) 0%, rgba(39,46,69,1) 30%, rgba(69,35,90,1) 60%, rgba(114,49,82,1) 100%)",
            }}
        >
            <div className="fixed left-8 top-8">
                <button
                    className="p-2 rounded-full bg-[rgba(0,0,0,.4)] text-text"
                    onClick={() => window.history.back()}
                >
                    <span>
                        <ChevronLeftIcon width="18px" height="18px" />{" "}
                    </span>
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-2">Sign in</h1>

            <form className="w-full" onSubmit={login}>
                <div className="w-full">
                    <label
                        className="text-start block w-full capitalize"
                        htmlFor="username"
                    >
                        username
                    </label>
                    <input
                        id="username"
                        className="w-full outline-none border-b border-[white] pb-2 bg-transparent mb-4 "
                        value={username}
                        name="username"
                        placeholder="Username"
                        required
                        onChange={onChangeLoginForm}
                    />
                </div>
                <div>
                    <label
                        className="text-start block w-full capitalize"
                        htmlFor="password"
                    >
                        password
                    </label>

                    <input
                        id="password"
                        className="w-full outline-none border-b border-[white] pb-2 bg-transparent mb-4 "
                        value={password}
                        name="password"
                        placeholder="Password"
                        required
                        onChange={onChangeLoginForm}
                    />
                </div>
                {alert && <h1 className="text-[red]">{alert.message}</h1>}
                <button className="mt-10 py-4 px-10 rounded-xl bg-dark ">
                    Sign in
                </button>
            </form>
            <div className="text-start w-full">
                <p className="text-text">Don't have an account ?</p>
                <p>
                    <Link to="/register">Sign up {">"}</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
