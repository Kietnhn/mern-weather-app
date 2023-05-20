import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const UserInfo = () => {
    const {
        authState: {
            user: { username, email, avatar },
        },
    } = useContext(AuthContext);
    return (
        <div className="flex items-center font-semibold gap-4">
            <div
                className="w-20 h-20 rounded-full border-4 bg-image"
                style={{
                    backgroundImage: `url(${
                        avatar ? "data:image/jpeg;base64," + avatar : ""
                    })`,
                }}
            ></div>
            <div className="">
                <h2>{username}</h2>
                <p className="text-text">{email}</p>
            </div>
        </div>
    );
};
export default UserInfo;
