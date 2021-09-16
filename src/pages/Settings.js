import React from 'react';
import ChangeSettings from "../components/Settings/ChangeSettings/ChangeSettings";

const Settings = () => {
    return (
        <div>
            <ChangeSettings
                title='Interfața utilizatorului'
                span='Dark mode'
                toggle={true}
            />
            <ChangeSettings
                title='Date personale'
                link='Schimare parolă'
                toggle={false}
            />
        </div>
    );
};

export default Settings;