import React from 'react'
import './Main.css';
import PageLayout from '../Components/PageLayout';
import { useNavigate } from 'react-router';

function Main() {
    const nav = useNavigate();
    
    return (
        <PageLayout>
            <h1 className="title">Welcome to Note Summarizer!</h1>
            <h4 className='sub-title'>Simplify your study process with our advanced note summarization tool.</h4>
            <div className="btns">
                <button id="one" onClick={() => nav("upload")}>Upload Notes</button>
                <button id="two" onClick={() => nav('summaries')}>View Summary</button>
            </div>
        </PageLayout>
    )
}

export default Main