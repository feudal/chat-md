import React from 'react';
import ProfileImage from "../components/Profile/ProfileImage/ProfileImage";
import ProfileInfo from "../components/Profile/ProfileInfo/ProfileInfo";
import ProfileLayout from "../components/layout/ProfileLayout";


const PROFILE_DATA = {
    name: 'Andreea Marin',
    email: 'andreea@gmail.com',
    mobile: '060 123654',
    gender: 'femenin',
    dob: '12/12/2000',
    text: 'Sunt perfecţionistă ,nu îmi place să fac lucrurile de mântuiala şi ţin la detalii.Am o memorie extraordinară' +
        ' şi ţin minte şi cele mai neinteresante lucruri,deci dacă avem vreun conflict fii sigur că o să ţin minte şi ' +
        'peste 10 ani.Cu toate astea ,iert uşor.Nu sunt genul de persoană care să stea prea mult supărată.Eu iert,dar nu' +
        ' uit.Îmi plac chestiile draguţe ,îmi plac obiectele mici cu mare încărcătură emoţionala.Sunt optimistă şi mă' +
        ' consider o persoană norocoasă din multe puncte de vedere.Sunt veselă în cea mai mare parte a timpului si pot' +
        ' să spun că am făcut un hobby din a-i face pe ceilalţi să râda.Mă consider o persoană echilibrata,nu îmi plac ' +
        'extremele de niciun fel.'
}

const Profile = () => {
    return (
        <ProfileLayout>
            <ProfileImage/>
            <ProfileInfo profileInfo={PROFILE_DATA}/>
        </ProfileLayout>
    );
};

export default Profile;