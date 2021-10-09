import React, {useState} from 'react';
import classes from './ProfileImage.module.css';
import firebase from '../../../firebase/index';

const ProfileImage = (props) => {
    const [url, setUrl] = useState(null);
    const [progress, setProgress] = useState(0);
    const [image, setImage] = useState(null);
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
                setProgress(Math.round((snapshot.bytesTransferred / snapshot.totalBytes)) * 100);
            }, (error) => {
                throw error
            }, () => {
                uploadTask.snapshot.ref.getDownloadURL().then((url) => {
                    setUrl(url);
                })
            }
        )
    }

    console.log(image);
    console.log(progress);
    console.log(url);

    return (
        <div className={classes.frame}>
            <div className={classes['img']}>
                {url && <img src={url} alt="user"/>}
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