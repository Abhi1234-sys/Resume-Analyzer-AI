import { useState } from 'react';
import './App.css';

function App() {
  const [jobDescription, setJobDescription] = useState("");
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    if (!files || files.length === 0) {
      alert("Please select at least one resume!");
      return;
    }

    setLoading(true);
    setResults(null);

    const formData = new FormData();
    formData.append("job_description", jobDescription);
    
    for (let i = 0; i < files.length; i++) {
      formData.append("resumes", files[i]);
    }

    try {
      const response = await fetch("http://localhost:8000/analyze", {
        method: "POST",
        body: formData, 
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data); 

    } catch (error) {
      console.error("Error analyzing resumes:", error);
      alert("Failed to connect to the backend. Is FastAPI running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <div className="app-container">
        
        {/* Header */}
        <header className="header">
          <h1>Resume Analyzer AI</h1>
          <p>Smartly match candidates to your job requirements.</p>
        </header>

        <main className="main-content">
          <form onSubmit={handleAnalyze} className="analyzer-form">
            
            <div className="form-group">
              <label htmlFor="jd">Job Description</label>
              <textarea 
                id="jd"
                placeholder="Paste the detailed job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="resumes">Upload Resumes (PDF/DOCX)</label>
              <div className="file-upload-wrapper">
                <input 
                  type="file" 
                  id="resumes"
                  multiple 
                  accept=".pdf,.docx"
                  onChange={(e) => setFiles(e.target.files)}
                  required
                  className="file-input"
                />
              </div>
              <small>You can select multiple resumes at once.</small>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Analyzing Candidates..." : "Analyze Resumes"}
            </button>

          </form>

          {/* Results Card */}
          {results && (
            <div className="results-card">
              <div className="results-header">
                <h3><span className="status-dot"></span> System Status: Ready for Processing</h3>
              </div>
              
              <div className="results-body">
                <p className="success-msg">✅ Data synced successfully with backend server.</p>
                
                <div className="stats-grid">
                  <div className="stat-box">
                    <span className="stat-label">Job Description Length</span>
                    <span className="stat-value">{results.job_description_length} Chars</span>
                  </div>
                  <div className="stat-box">
                    <span className="stat-label">Resumes Queued</span>
                    <span className="stat-value">{results.received_files.length} Files</span>
                  </div>
                </div>

                <div className="file-list-container">
                  <h4>Verified Documents:</h4>
                  <ul className="file-list">
                    {results.received_files.map((fileName, index) => (
                      <li key={index}>
                        <svg className="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                        {fileName}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ATS Guide & Tips Section */}
          <section className="ats-guide-section">
            <h2>ATS Optimization & Insights Guide</h2>
            <p className="guide-subtitle">Everything you need to know about Applicant Tracking Systems and how to improve your score.</p>
            
            <div className="faq-grid">
              <div className="faq-card">
                <h3>What is an ATS Score?</h3>
                <p>An Applicant Tracking System (ATS) score is a percentage rating given by recruitment software to evaluate how well a resume matches a specific job description based on keywords, skills, and formatting.</p>
              </div>

              <div className="faq-card">
                <h3>What is a Good ATS Score?</h3>
                <p>Generally, a score above <strong>75% to 80%</strong> is considered strong. It indicates that your resume successfully highlights the core technical and soft skills required for the role.</p>
              </div>

              <div className="faq-card">
                <h3>Why Do Checker Scores Differ?</h3>
                <p>Different ATS platforms use unique parsing algorithms, weighing systems, and keyword extraction rules. What scores high on one system might vary slightly on another depending on its underlying logic.</p>
              </div>

              <div className="faq-card">
                <h3>How to Improve Your Resume?</h3>
                <p>Incorporate exact keywords from the job description, avoid complex graphics or multi-column layouts, use standard section headings (Experience, Education, Skills), and save files in PDF format.</p>
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* Professional Footer with Real Social Links & Icons */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-col">
            <h3>ResuMatch AI</h3>
            <p>Empowering job seekers with intelligent tools to beat the ATS and land their dream tech careers.</p>
          </div>
          
          <div className="footer-col">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About Us</a></li>
              <li><a href="#tools">All Tools</a></li>
              <li><a href="#resources">Resources</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect With Us</h4>
            <div className="social-links">
              {/* LinkedIn Link with Logo */}
              <a href="https://www.linkedin.com/in/abhimanyu-mahato-3471a8291" target="_blank" rel="noreferrer" className="social-link-item">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                LinkedIn
              </a>

              {/* Instagram Link with Logo */}
              <a href="https://www.instagram.com/abhimanyu_mahata?igsh=MW01Mm5jdW1nbjloNQ==" target="_blank" rel="noreferrer" className="social-link-item">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                Instagram
              </a>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2026 ResuMatch AI. Developed by Abhimanyu Mahato. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;