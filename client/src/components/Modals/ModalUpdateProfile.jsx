import React, { useContext, useEffect, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import { AuthContext } from "../../contexts/AuthContext";
// import { PositionContext } from "../../contexts/PositionContext";
import { PencilIcon, UploadFileIcon } from "../icons";
import MapUpdateProfile from "./MapUpdateProfile";
import { PositionContext } from "../../contexts/PositionContext";
import ChangePassword from "./Menu/ChangePassword";

const ModalUpdateProfile = () => {
    const {
        authState: { isAuthenticated },
    } = useContext(AuthContext);
    const {
        settingsState: { isShowModalUpdateProfile },
        toggleModalUpdateProfile,
    } = useContext(SettingsContext);
    const {
        authState: { user },
    } = useContext(AuthContext);
    const {
        positionState: { currentPosition },
    } = useContext(PositionContext);
    const [updateForm, setUpdateForm] = useState({
        username: user?.username || "",
        avatar: user?.avatar || "",
        password: "",
        currentPosition: user?.currentPosition || null,
    });

    const [positionOnMap, setPositionOnMap] = useState(null);
    const [isGetRecommend, setIsGetRecommend] = useState(false);

    const onChangeUpdateForm = (e) =>
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    const handleChangeAvatar = (e) => {
        setUpdateForm({ ...updateForm, avatar: e.target.files[0] });
    };
    const handleCloseModalUpdateProfile = () => {
        toggleModalUpdateProfile(false);
        setUpdateForm({
            username: user?.username || "",
            avatar: user?.avatar || "",
        });
    };
    const update = async (e) => {
        e.preventDefault();
    };
    const RecommendNextTime = () => {
        return (
            <>
                <div className="between">
                    <label htmlFor="recommend" className="mr-2">
                        Want to get recommendations next time ?
                    </label>
                    <input
                        type="checkbox"
                        name="recommend"
                        id="recommend"
                        value={isGetRecommend}
                        onChange={() => setIsGetRecommend(!isGetRecommend)}
                    />
                </div>
                {isGetRecommend && (
                    <div>
                        <div>
                            <label htmlFor="current">
                                Your current position:{" "}
                                <span>
                                    {currentPosition.countryCode} -{" "}
                                    {currentPosition.city}
                                </span>
                            </label>
                            <input type="radio" name="typePosition" />
                        </div>
                        <div>
                            <label>
                                Position on map:{" "}
                                <span>
                                    {positionOnMap?.country} -{" "}
                                    {positionOnMap?.name}
                                </span>
                            </label>
                            <input type="radio" name="typePosition" />
                        </div>
                    </div>
                )}
            </>
        );
    };
    useEffect(() => {
        console.log({ updateForm });
    }, [updateForm]);
    return (
        <>
            {isAuthenticated && isShowModalUpdateProfile && (
                <div
                    className="fixed inset-0 modal-content z-[999999]"
                    onClick={handleCloseModalUpdateProfile}
                >
                    <div
                        className={`theme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  
                           min-w-[768px]
                        duration-500 h-[80vh] flex `}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <form
                            className="w-1/2 p-5 h-full flex flex-col justify-between"
                            onSubmit={update}
                        >
                            <h1 className="text-center mb-3  pb-2 text-2xl font-semibold border-b-2">
                                Update Profile
                            </h1>
                            <div className="flex-1">
                                <div className="mb-3 flex items-end justify-between gap-4">
                                    <label
                                        htmlFor="avatar"
                                        className="relative w-24 h-24 rounded-full bg-image bg-[gray] block  group overflow-hidden border-theme border-4"
                                        style={{
                                            backgroundImage: `url(${
                                                updateForm.avatar
                                                    ? URL.createObjectURL(
                                                          updateForm.avatar
                                                      )
                                                    : ""
                                            })`,
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
                                            onChange={handleChangeAvatar}
                                        />
                                    </label>
                                    <div className="mb-3 mr-auto">
                                        <div className="relative">
                                            <input
                                                className="font-semibold "
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
                                        <h3 className="">{user.email}</h3>
                                    </div>
                                </div>
                                <ChangePassword />
                                <RecommendNextTime />
                            </div>
                            <div className="center gap-4">
                                <button
                                    className="mt-10 button "
                                    onClick={handleCloseModalUpdateProfile}
                                >
                                    Cancel
                                </button>
                                <button className="mt-10 button-reverse ">
                                    Update
                                </button>
                            </div>
                        </form>
                        <div className="w-1/2 h-full">
                            <MapUpdateProfile
                                setUpdateForm={setUpdateForm}
                                positionOnMap={
                                    positionOnMap?.name || currentPosition.city
                                }
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalUpdateProfile;
