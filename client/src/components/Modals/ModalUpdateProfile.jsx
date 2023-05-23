import React, { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { AuthContext } from "../../contexts/AuthContext";
import { PencilIcon, UploadFileIcon } from "../icons";
import MapUpdateProfile from "./MapUpdateProfile";
import ChangePassword from "./ChangePassword";
import RecommendNextTime from "./RecommendNextTime";
const ModalUpdateProfile = () => {
    const {
        authState: { isAuthenticated, user },
        updateUser,
        updateUserPosition,
    } = useContext(AuthContext);
    const {
        settingsState: { isShowModalUpdateProfile },
        toggleModalUpdateProfile,
    } = useContext(SettingsContext);
    const [updateForm, setUpdateForm] = useState({
        username: user?.username || "",
        avatar: user?.avatar || "",
        password: "",
    });
    const [position, setPosition] = useState(user?.position || null);
    const [positionOnMap, setPositionOnMap] = useState(null);
    const [isGetRecommend, setIsGetRecommend] = useState(
        user?.position ? true : false
    );
    const [isChangeAvatar, setIsChangeAvatar] = useState(false);

    const onChangeUpdateForm = (e) => {
        if (e.target.name === "avatar") {
            const file = e.target.files[0];
            setUpdateForm({ ...updateForm, avatar: file });
            setIsChangeAvatar(true);
        } else {
            setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
        }
    };

    const handleCloseModalUpdateProfile = () => {
        toggleModalUpdateProfile(false);
        setUpdateForm({
            username: user?.username || "",
            avatar: user?.avatar || "",
            password: "",
            currentPosition: user?.currentPosition || null,
        });
        setPositionOnMap(null);
        setIsGetRecommend(false);
        setIsChangeAvatar(false);
    };
    const addUserPosition = async () => {
        const { lat, lon, country, city } = position;
        const positionToUpdate = {
            lat,
            lon,
            country,
            city,
        };

        await updateUserPosition(positionToUpdate);
    };
    const update = async (e) => {
        e.preventDefault();
        if (position) {
            addUserPosition();
        }

        const formData = new FormData();
        Object.keys(updateForm).forEach((key) =>
            formData.append(key, updateForm[key])
        );
        const response = await updateUser(formData);
        if (response.data.success) {
            handleCloseModalUpdateProfile();
        }
    };
    const urlAvatar = (urlImg) => {
        // urlImg is base64 encoded
        let url = "data:image/jpeg;base64," + urlImg;
        if (isChangeAvatar)
            // urlImg is object FILE
            url = URL.createObjectURL(urlImg);
        return `url(${urlImg ? url : ""})`;
    };
    return (
        <>
            {isAuthenticated && isShowModalUpdateProfile && (
                <div
                    className="fixed inset-0 modal-content z-[999999]"
                    onClick={handleCloseModalUpdateProfile}
                >
                    <div
                        className={`theme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  
                           md:min-w-[768px] sm:min-w-[480px]
                        duration-500 md:h-[80vh]  flex  sm:flex-wrap`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form
                            className="sm:w-full md:w-1/2 p-5 h-full flex flex-col justify-between"
                            onSubmit={update}
                            encType="multipart/form-data"
                        >
                            <h1 className="text-center mb-3  pb-2 text-2xl font-semibold border-b-2">
                                Update Profile
                            </h1>
                            <div className="flex-1 flex flex-col justify-between">
                                <div className="mb-3 flex items-end justify-between gap-4">
                                    <label
                                        htmlFor="avatar"
                                        className="relative w-24 h-24 rounded-full bg-image bg-[gray] block  group overflow-hidden border-theme border-4"
                                        style={{
                                            backgroundImage: `${urlAvatar(
                                                updateForm.avatar
                                            )}`,
                                        }}
                                    >
                                        <div className="absolute inset-0 hidden group-hover:block hover:cursor-pointer bg-[rgba(0,0,0,.25)] ">
                                            <div className="h-full center">
                                                <span>
                                                    <UploadFileIcon
                                                        width="24px"
                                                        height="24px"
                                                    />
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="file"
                                            name="avatar"
                                            id="avatar"
                                            value=""
                                            className="hidden"
                                            onChange={onChangeUpdateForm}
                                        />
                                    </label>
                                    <div className="mb-3 mr-auto">
                                        <div className="relative">
                                            <input
                                                className="font-semibold theme"
                                                placeholder="User name"
                                                value={updateForm.username}
                                                name="username"
                                                onChange={onChangeUpdateForm}
                                                id="username"
                                            />
                                            <label htmlFor="username">
                                                <span className="absolute right-0 top-1/2 -translate-y-1/2 hover:cursor-pointer">
                                                    <PencilIcon
                                                        width="18px"
                                                        height="18px"
                                                    />
                                                </span>
                                            </label>
                                        </div>
                                        <h3 className="max-w-[200px] break-words">
                                            {user.email}
                                        </h3>
                                    </div>
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <ChangePassword
                                        setUpdateForm={setUpdateForm}
                                        updateForm={updateForm}
                                    />
                                    <RecommendNextTime
                                        setPosition={setPosition}
                                        isGetRecommend={isGetRecommend}
                                        setIsGetRecommend={setIsGetRecommend}
                                        positionOnMap={positionOnMap}
                                    />
                                </div>
                            </div>
                            <div className="center gap-4">
                                <button
                                    className="mt-10 button "
                                    onClick={handleCloseModalUpdateProfile}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="mt-10 button-reverse "
                                    onClick={update}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                        <div className="sm:w-full sm:h-[240px]  md:w-1/2 md:h-full">
                            <MapUpdateProfile
                                setPositionOnMap={setPositionOnMap}
                                positionOnMap={positionOnMap}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalUpdateProfile;
