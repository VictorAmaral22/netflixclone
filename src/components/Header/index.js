import React from "react";
import './style.css';
import UserIcon from "../UserIcon";

export default ({black}) => {
    return (
        <header className={black ? 'black' : ''}>
            <div className="header--logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="" />
                </a>
            </div>
            <UserIcon />
        </header>
    );
}