import React, { useState, useEffect } from "react";
import "./Summaries.css"

async function fetchSummaries(isDraft) {
    return [
        {
            id: 1,
            title: isDraft
                ? "[DRAFT] Chapter 1 - Introduction to Biology"
                : "Chapter 1 - Introduction to Biology",
            date: "2024-02-15",
            preview: "Key concepts covered include cell structure, metabolism...",
        },
        {
            id: 2,
            title: isDraft
                ? "[DRAFT] Detailed analysis of World War II causes and major events..."
                : "Analysis of World War II causes and major events...",
            date: "2024-02-14",
            preview: "Analysis of World War II causes and major events...",
        },
    ];
}

const Summaries = () => {
    const [summaries, setSummaries] = useState([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);

    useEffect(() => {
        const hasPreviewCookie = document.cookie.includes("__prerender_bypass");
        setIsPreviewMode(hasPreviewCookie);

        fetchSummaries(hasPreviewCookie).then(setSummaries);
    }, []);

    return (
        <div className="container">
            {isPreviewMode && (
                <div className="preview-banner">
                    Preview Mode Enabled -{" "}
                    <a href="/api/disable-preview" className="exit-preview">
                        Exit Preview Mode
                    </a>
                </div>
            )}
            <h1 className="page-title">
                {isPreviewMode ? "[DRAFT] Your Summaries" : "Your Summaries"}
            </h1>
            <div className="summary-list">
                {summaries.map((summary) => (
                    <div key={summary.id} className="summary-card">
                        <div className="summary-header">
                            <div>
                                <h2 className="summary-title">{summary.title}</h2>
                                <p className="summary-date">{summary.date}</p>
                            </div>
                            <button className="summary-button">View Full Summary</button>
                        </div>
                        <p className="summary-preview">{summary.preview}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Summaries;