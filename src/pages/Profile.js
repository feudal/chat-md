import React from 'react';
import ProfileImage from "../components/Profile/ProfileImage/ProfileImage";
import ProfileInfo from "../components/Profile/ProfileInfo/ProfileInfo";
import ProfileLayout from "../components/layout/ProfileLayout";

const Profile = () => {
    return (
        <ProfileLayout>
            <ProfileImage/>
            <ProfileInfo/>
        </ProfileLayout>
    );
};

export default Profile;