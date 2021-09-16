import React from 'react';
import Contacts from "../components/Chat/Contacts/Contacts";
import Messages from "../components/Chat/Messages/Messages";
import ContactInfo from "../components/Chat/ContactInfo/ContactInfo";
import ChatLayout from "../components/layout/ChatLayout";

const Chat = () => {
    return (
        <ChatLayout>
          <Contacts/>
          <Messages/>
          <ContactInfo/>
        </ChatLayout>
    );
};

export default Chat;