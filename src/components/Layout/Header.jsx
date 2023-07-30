import classes from './Header.module.css';
import dinner from '../../assets/dinner.jpg';
import { useState } from 'react';


const Header = (props) => {

    return (
        <>
        <header className={classes.header}>
            <h1>Tears of The Kingdom Cook Book</h1>
            <button className={classes.button} onClick={props.onShowForm}>New Recipe</button>
        </header>
        <div className={classes['main-image']}>
            <img src={dinner} alt="Tears of the kingdom cast eating together" />
        </div>
        </>
    );
};

export default Header;