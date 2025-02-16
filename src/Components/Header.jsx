import React from 'react'
import "./Header.css";

function Header() {
    return (
        <>
            <nav className='nav-bar'>
                <h1>Note Summarizer</h1>
                <ul>
                    <li>
                        <a href="">Home</a>
                    </li>
                    <li>
                        <a href="">Upload</a>
                    </li>
                    <li>
                        <a href="">View Summary</a>
                    </li>
                </ul>
            </nav>
        </>
    )

}

export default Header