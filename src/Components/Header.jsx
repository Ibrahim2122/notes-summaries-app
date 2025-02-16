import React from 'react'
import "./Header.css";
import { useNavigate } from 'react-router';

function Header() {
    const nav = useNavigate();

    return (
        <>
            <nav className='nav-bar'>
                <h1 onClick={() => nav("/")}>Note Summarizer</h1>
                <ul>
                    <li>
                        <a onClick={() => nav("/")}>Home</a>
                    </li>
                    <li>
                        <a onClick={() => nav("/upload")}>Upload</a>
                    </li>
                    <li>
                        <a onClick={() => nav("/summaries")}>View Summary</a>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default Header