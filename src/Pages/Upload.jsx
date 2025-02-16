import React from 'react';
import { useState } from 'react';
import './Upload.css';
import PageLayout from '../Components/PageLayout';

function Upload() {

    const [fileName, setFileName] = useState("No file chosen");

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file)
        setFileName(file ? file.name : "No file chosen");
    };


    return (
        <PageLayout>
            <h1 className="title form-title">Upload Your Notes</h1>
            <form action="" className="form">
                <label htmlFor="note-title">Title</label>
                <input type="text" id='note-title' placeholder='Enter a title for your notes'/>

                <label htmlFor="notes">Notes</label>
                <textarea name="notes" id="notes" placeholder='Paste or type your notes here'></textarea>

                <label htmlFor="upload">Or upload a file</label>
                <div className="file-input-wrapper">
                    <label htmlFor="upload" className="file-input-label">
                        <span>Choose File</span>
                        <span id="file-name">{fileName}</span>
                    </label>
                    <input type="file" id="upload" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
                </div>


                <button className='submit-btn'>Generate Summary</button>
            </form>
        </PageLayout>
    )
}

export default Upload;
