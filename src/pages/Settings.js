import React from 'react';
import ChangeSettings from "../components/Settings/ChangeSettings/ChangeSettings";
import {useSelector} from "react-redux";

const Settings = () => {
    const userIsLoggedIn = useSelector(state => state.auth.isLoggedIn);

    return (
        <div>
            <ChangeSettings
                title='Interfața utilizatorului'
                span='Dark mode'
                toggle={true}
            />
            {userIsLoggedIn && (<ChangeSettings
                title='Date personale'
                link='Schimare parolă'
                toggle={false}
            />)}
        </div>
    );
};

export default Settings;