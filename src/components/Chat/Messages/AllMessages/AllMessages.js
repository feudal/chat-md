import React from 'react';
import classes from './AllMessages.module.css';
import AllMessagesList from "./AllMessagesList/AllMessagesList";

const ALL_MESSAGE = [
    {
        name: 'Tu',
        message: 'Salut Maria! ce mai faci?',
        date: '2021-09-10T13:56:50'
    },
    {
        name: 'Maria Botgros',
        message: 'Bine! Mariana, nu te-am mai vazut de mult. Eram prieteni buni, si inca suntem.',
        date: '2021-09-10T13:55:50'
    },
    {
        name: 'Tu',
        message: 'Da! stiu lucrul acesta ma intristat mult, nu situ ce ia determiant pe parintii mei sa ne mutam. Dar e bine si aici.',
        date: '2021-09-10T13:54:50'
    },
    {
        name: 'Maria Botgros',
        message: 'Daca iti este bine , ma faci fericit. Auzi? Cand mai vi si tu pe aici? M-am plictisit fara tine.',
        date: '2021-09-10T13:53:50'
    },
    {
        name: 'Tu',
        message: 'Am sa vin in vacanta de vara.',
        date: '2021-09-10T13:52:50'
    },
    {
        name: 'Maria Botgros',
        message: 'Bine, eu trebuie sa plec, pa!',
        date: '2021-09-10T13:51:50'
    },
    {
        name: 'Tu',
        message: 'Pa, Vorbim deseara.',
        date: '2021-09-10T13:50:50'
    },
]

const AllMessages = () => {
    return (
        <div className={classes.block}>
            <AllMessagesList list={ALL_MESSAGE}/>
        </div>
    );
};

export default AllMessages;