import React, { useState, useEffect } from "react";
import "./Summaries.css";

const Summaries = () => {
    const [summaries, setSummaries] = useState([]);
    const [isPreviewMode, setIsPreviewMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const hasPreviewCookie = document.cookie.includes("__prerender_bypass");
        setIsPreviewMode(hasPreviewCookie);

        async function fetchSummaries() {
            try {
                const response = await fetch("http://127.0.0.1:5000/summaries");
                if (!response.ok) {
                    throw new Error("Failed to fetch summaries");
                }
                const data = await response.json();

                if (data.length === 0) {
                    setSummaries(null);
                } else {
                    setSummaries(data);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSummaries();
    }, []);

    // 🔥 Handle Deleting a Summary

    useEffect( () => {
        
    }, [])
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this summary?");
        if (!confirmDelete) return;

        try {
            const response = await fetch(`http://127.0.0.1:5000/summary/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to delete summary (status: ${response.status})`);
            }

            // Remove deleted summary from state
            setSummaries((prevSummaries) => {
                const updatedSummaries = prevSummaries.filter(summary => summary.id !== id);
                return updatedSummaries.length > 0 ? updatedSummaries : []; // Ensure empty state update
            });


            alert("Summary deleted successfully!");
        } catch (err) {
            console.error(err);
            alert("Error deleting summary. Please try again.");
        }
    };

    if (loading) return <p className="loading">Loading summaries...</p>;
    if (error) return <p className="error">Error: {error}</p>;

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
                {summaries ? (
                    summaries.map((summary) => (
                        <div key={summary.id} className="summary-card">
                            <div className="summary-header">
                                <div>
                                    <h2 className="summary-title">{summary.title}</h2>
                                    <p className="summary-date">{summary.date}</p>
                                </div>
                                <div className="summary-actions">
                                    {/* 🔥 DELETE BUTTON */}
                                    <button
                                        onClick={() => handleDelete(summary.id)}
                                        className="delete-btn"
                                    >
                                        ❌
                                    </button>
                                </div>
                            </div>
                            <p className="summary-preview">{summary.summary}</p>
                        </div>
                    ))
                ) : (
                    <div className="no-summaries-container">
                        <svg className="file-icon">
                            {/* Add your FileText SVG icon here */}
                        </svg>
                        <p className="no-summaries">No summaries found.</p>
                        <p className="no-summaries-text">
                            Start by uploading your notes to generate summaries.
                        </p>
                        <a href="/upload" className="upload-link">
                            <svg className="plus-icon">
                                {/* Add your Plus SVG icon here */}
                            </svg>
                            Upload Notes
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Summaries;
