import React from 'react';
import Contacts from "../components/Chat/Contacts/Contacts";
import Messages from "../components/Chat/Messages/Messages";
import ContactInfo from "../components/Chat/ContactInfo/ContactInfo";
import ChatLayout from "../components/layout/ChatLayout";
import {useSelector} from "react-redux";

const Chat = () => {
    const showContactInfo = useSelector(state => state.ui.showContactInfo);
    return (
        <ChatLayout>
          <Contacts/>
          <Messages/>
            {showContactInfo && <ContactInfo/>}
        </ChatLayout>
    );
};

export default Chat;