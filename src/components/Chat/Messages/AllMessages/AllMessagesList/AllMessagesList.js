import React from 'react';
import MyMessage from "./MyMessage/MyMessage";
import YourMessage from "./YourMessage/YourMessage";

const AllMessagesList = (props) => {

    const listOfMessage = props.list.map((item) => {
        let time = new Date( Date.parse(item.date) );
        const hour = time.getHours();
        const min = time.getMinutes();

        if(item.name === 'Tu'){
            return (
                <MyMessage
                    key={hour+min}
                    name={item.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        } else {
            return (
                <YourMessage
                    name={item.name}
                    text={item.message}
                    hour={hour}
                    min={min}
                />
            )
        }
    });
    return (
        <ul>
            {listOfMessage}
        </ul>
    );
};

export default AllMessagesList;