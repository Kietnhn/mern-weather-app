import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Input from "./Input";
import TextArea from "./TextArea";
import { UploadFileIcon, InfoIcon } from "../../components/icons";
import UserInfo from "../../components/UserInfo";
import { AuthContext } from "../../contexts/AuthContext";
const FormContact = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
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
    const handleSendEmail = (e) => {
        e.preventDefault();
        console.log("send");
        const { name, email, message } = inputs;
        if (!name || !email || !message) {
            setAlert(true);
            setTimeout(() => {
                setAlert(false);
            }, 3000);
            return;
        }
        console.log({ inputs });
    };

    return (
        <div className="theme h-full min-w-[360px] px-5 py-4 flex flex-col justify-between">
            <h3 className="uppercase text-xs font-semibold tracking-widest mb-5">
                Feedback form
            </h3>
            <form
                onSubmit={handleSendEmail}
                className="flex-1 flex flex-col justify-between"
            >
                {isAuthenticated ? (
                    <div className="mb-5">
                        <UserInfo />
                    </div>
                ) : (
                    ["name", "email"].map((item, index) => (
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

                {!isAuthenticated && (
                    <div className="-mt-4 mb-4 text-sm">
                        <div className="flex items-center">
                            <span className="mr-2">
                                <InfoIcon width="16px" height="16px" />
                            </span>
                            We only use your email to send thanks
                        </div>
                        Please check the
                        <span className="text-[#4a9cdb] underline mx-2">
                            <Link to="/">Terms and Conditions</Link>
                        </span>
                        for more details
                    </div>
                )}
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
