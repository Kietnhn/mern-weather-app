import React, { useContext, useState } from "react";
import { SettingsContext } from "../../contexts/SettingsContext";
import Input from "../../views/Contact/Input";
import { AuthContext } from "../../contexts/AuthContext";

const ModalUpdateProfile = () => {
    const {
        settingsState: { isShowModalUpdateProfile },
        toggleModalUpdateProfile,
    } = useContext(SettingsContext);
    const {
        authState: { user },
    } = useContext(AuthContext);
    const [updateForm, setUpdateForm] = useState({
        username: "",
        password: "",
        avatar: "",
    });
    console.log({ user });
    const onChangeUpdateForm = (e) =>
        setUpdateForm({ ...updateForm, [e.target.name]: e.target.value });
    const handleChangeAvatar = (e) => {
        console.log(e.target.files[0]);
    };
    const handleCloseModalUpdateProfile = () => {
        toggleModalUpdateProfile(false);
        setUpdateForm({
            username: "",
            password: "",
            avatar: "",
        });
    };
    const update = async (e) => {
        e.preventDefault();
    };
    return (
        <>
            {isShowModalUpdateProfile && (
                <div
                    className="fixed inset-0 modal-content z-[999999]"
                    onClick={handleCloseModalUpdateProfile}
                >
                    <div
                        className={`theme absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  
                           
                        duration-500 p-8 h-[80vh]`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h1 className="text-center mb-3 text-2xl font-semibold">
                            Update Profile
                        </h1>
                        <div className="mb-3">
                            <label
                                htmlFor="avatar"
                                className="w-20 h-20 rounded-full bg-black block hover:cursor-pointer"
                            ></label>
                            {updateForm.avatar && (
                                <div className="w-20 h-20 rounded-full">
                                    <img
                                        src={updateForm.avatar}
                                        alt="avatar"
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                className="hidden"
                                value={updateForm.avatar}
                                onChange={handleChangeAvatar}
                            />
                        </div>
                        <form className="w-full" onSubmit={update}>
                            {[...Object.keys(updateForm)]
                                .slice(0, 2)
                                .map((item) => (
                                    <div key={item} className="w-full">
                                        <Input
                                            // alert={alert}
                                            name={item}
                                            value={updateForm[item]}
                                            onChange={onChangeUpdateForm}
                                            placeholder={item}
                                        />
                                    </div>
                                ))}

                            {/* {alert && (
                                <h1 className="text-[red]">{alert.message}</h1>
                            )} */}
                            <button
                                className="mt-10 button "
                                onClick={handleCloseModalUpdateProfile}
                            >
                                Cancel
                            </button>
                            <button className="mt-10 button-reverse ">
                                Update
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default ModalUpdateProfile;
