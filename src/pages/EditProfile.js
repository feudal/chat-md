import React from 'react';
import ProfileImage from "../components/Profile/ProfileImage/ProfileImage";
import ProfileLayout from "../components/layout/ProfileLayout";
import ProfileForm from "../components/Profile/ProfileForm/ProfileForm";

const EditProfile = () => {
    return (
        <ProfileLayout>
            <ProfileImage upload={true}/>
            <ProfileForm/>
        </ProfileLayout>
    );
};

export default EditProfile;