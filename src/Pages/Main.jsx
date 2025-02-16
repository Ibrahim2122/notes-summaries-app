import React from 'react'
import './Main.css';
import PageLayout from '../Components/PageLayout';

function Main() {
    return (
        <PageLayout>
            <h1 className="title">Welcome to Note Summarizer!</h1>
            <h4 className='sub-title'>Simplify your study process with our advanced note summarization tool.</h4>
            <div className="btns">
                <button id="one">Upload Notes</button>
                <button id="two">View Summary</button>
            </div>
        </PageLayout>
    )
}

export default Main