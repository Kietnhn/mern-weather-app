import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import TextArea from "./TextArea";
import { UploadFileIcon, InfoIcon } from "../../components/icons";
import UserInfo from "../../components/UserInfo";
import { AuthContext } from "../../contexts/AuthContext";
import ToolTip from "../../components/ToolTip";
import { SettingsContext } from "../../contexts/SettingsContext";
const FormContact = () => {
    const {
        authState: { isAuthenticated, user },
        sendEmail,
    } = useContext(AuthContext);
    const { setGlobalAlert } = useContext(SettingsContext);
    const [inputs, setInputs] = useState({
        username: user?.username || "",
        email: user?.email || "",
        message: "",
        file: "",
    });

    const [alert, setAlert] = useState(false);
    const handleChangeInput = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleClearInput = () => {
        setInputs({
            username: user?.username || "",
            email: user?.email || "",
            message: "",
            file: "",
        });
    };
    const handleSendEmail = async (e) => {
        e.preventDefault();
        const { username, email, message } = inputs;
        if (!isAuthenticated) {
            if (!username || !email) {
                setAlert(true);
                setTimeout(() => {
                    setAlert(false);
                }, 3000);
                return;
            }
        }
        if (!message) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
            return;
        }
        const response = await sendEmail(inputs);
        setGlobalAlert({
            type: response.success ? "success" : "",
            content: response.message,
        });
        setTimeout(() => {
            setGlobalAlert(null);
        }, [3000]);
        if (response.success) {
            handleClearInput();
        }
    };

    return (
        <div className="mt-10 lg:m-0 theme h-full lg:min-w-[360px] px-5 py-4 flex flex-col justify-between">
            <div className="mb-5 center justify-start">
                <h3 className="uppercase inline-block text-xs font-semibold tracking-widest mr-2">
                    Feedback form
                </h3>
                <ToolTip
                    className="flex relative"
                    message={
                        <span className="text-xs font-normal">
                            We only use your email to send thanks <br />
                            Click{" "}
                            <span className="text-[#4a9cdb] underline">
                                <Link to="/">Terms and Conditions</Link>
                            </span>{" "}
                            to more details
                        </span>
                    }
                    arrow="top-0 left-1/2 -translate-x-1/2 -translate-y-full 
                    border-[transparent_transparent_white_transparent] dark:border-[transparent_transparent_black_transparent]"
                    position="top-1 left-1/2 -translate-x-1/2 translate-y-1/2 w-[240px]"
                >
                    <span className="">
                        <InfoIcon width="16px" height="16px" />
                    </span>
                </ToolTip>
            </div>
            <form
                onSubmit={handleSendEmail}
                className="flex-1 flex flex-col justify-between"
            >
                {isAuthenticated ? (
                    <div className="mb-5">
                        <UserInfo />
                    </div>
                ) : (
                    ["username", "email"].map((item, index) => (
                        <div key={index}>
                            <Input
                                alert={alert}
                                name={item}
                                value={inputs[item]}
                                onChange={(e) => handleChangeInput(e)}
                                placeholder={item}
                            />
                        </div>
                    ))
                )}
                <TextArea
                    alert={alert}
                    name="message"
                    value={inputs["message"]}
                    onChange={(e) => handleChangeInput(e)}
                    placeholder="message"
                    maxHeight={isAuthenticated ? 136 : 88}
                />

                <div className="between">
                    <div className="">
                        <label
                            htmlFor="file"
                            className="font-bold center gap-2 button"
                        >
                            <span>
                                <UploadFileIcon width="20px" height="20px" />
                            </span>
                            Upload file
                        </label>
                        <input type="file" name="file" className="hidden" />
                    </div>
                    <div>
                        <button className="button-reverse font-semibold">
                            Send Message
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default FormContact;
