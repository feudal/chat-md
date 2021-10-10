import React, {useEffect, useState} from 'react';
import classes from './ProfileImage.module.css';
import {setImgUrlOnServer, userAction} from "../../../store/user";
import {useDispatch, useSelector} from "react-redux";
import firebase from "../../../firebase";

const ProfileImage = (props) => {
    const dispatch = useDispatch();
    const imgUrl = useSelector(state => state.user.userInformation.imgUrl);
    const [image, setImage] = useState(null);

    useEffect(() => {
        fetch('https://chat-6f549-default-rtdb.europe-west1.firebasedatabase.app/' + 'users-info/' + localStorage.id + '.json')
            .then (response => {
                if (!response.ok) {
                    throw new Error('Server error');
                }
                return response.json();
            })
            .then(data => {
                dispatch(userAction.setImgUrl(data.imgUrl));
            });
    }, [dispatch])

    const onChangeHandler = event => {
        if (event.target.files[0]) {
            const img = event.target.files[0];
            setImage(img);
        }
    }

    const uploadImageHandler = () => {
        const storage = firebase.storage();
        const storageRef = storage.ref();
        const newFileName = localStorage.id + '.' + image.name.split('.')[1];
        const uploadTask = storageRef.child('users-images/' + newFileName).put(image);

        uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
                console.log(Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100);
            }, (error) => {
                throw error
            }, () => {
                firebase.storage().ref('users-images/').child(newFileName).getDownloadURL()
                    .then((url) => {
                        dispatch(setImgUrlOnServer(url));
                    })
            }
        )
    }

    return (
        <div className={classes.frame}>
            <div className={classes['img']}>
                {imgUrl && <img src={imgUrl} alt="user"/>}
                {props.upload && (
                    <input
                        onChange={onChangeHandler}
                        type='file'/>
                )}
                <span className={classes.span}>Imaginea de profil</span>
            </div>
            {props.upload && (
                <button
                    onClick={uploadImageHandler}
                    className={classes.button}>
                    Adaugă imagine
                </button>
            )}
        </div>
    );
};

export default ProfileImage;