import React, { useState } from 'react';
import './Upload.css';
import PageLayout from '../Components/PageLayout';

function Upload() {
    const [formData, setFormData] = useState({
        title: "",
        notes: ""
    });
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file chosen");
    const [message, setMessage] = useState("");

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        setFileName(selectedFile ? selectedFile.name : "No file chosen");
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append("title", formData.title);
        formDataToSend.append("notes", formData.notes);
        if (file) {
            formDataToSend.append("file", file);
        }

        try {
            const response = await fetch("http://127.0.0.1:5000/upload", {
                method: "POST",
                body: formDataToSend, // Don't set Content-Type manually
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            setMessage(`Summary Generated: ${data.summary}`);
            setFormData({ title: "", notes: "" });
            setFile(null);
            setFileName("No file chosen");
        } catch (error) {
            setMessage(`Failed to generate summary: ${error.message}`);
        }
    };

    return (
        <PageLayout>
            <h1 className="title form-title">Upload Your Notes</h1>
            {message && <p className="response-message">{message}</p>}
            <form className="form" onSubmit={submitHandler}>
                <label htmlFor="note-title">Title</label>
                <input
                    type="text"
                    id="note-title"
                    name="title"
                    placeholder="Enter a title for your notes"
                    onChange={handleInputChange}
                    value={formData.title}
                    required
                />

                <label htmlFor="notes">Notes</label>
                <textarea
                    name="notes"
                    id="notes"
                    placeholder="Paste or type your notes here"
                    onChange={handleInputChange}
                    value={formData.notes}
                ></textarea>

                <label htmlFor="upload">Or upload a file</label>
                <div className="file-input-wrapper">
                    <label htmlFor="upload" className="file-input-label">
                        <span>Choose File</span>
                        <span id="file-name">{fileName}</span>
                    </label>
                    <input type="file" id="upload" accept=".txt,.doc,.docx,.pdf" onChange={handleFileChange} />
                </div>

                <button className="submit-btn" type="submit">Generate Summary</button>
            </form>
        </PageLayout>
    );
}

export default Upload;
