import React, { useEffect, useState } from 'react';
import type { Paper } from '../types/Types';
import api from '../api';
import { useLocation } from 'react-router-dom';

const PaperPage = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const location = useLocation();

  // Extract query parameter
  const queryParams = new URLSearchParams(location.search);
  const level = queryParams.get("paper"); // e.g., "OL"

  useEffect(() => {
    let url = "/paper/by-level";
    if (level) {
      url += `?level=${level}`;
    }

    api.get<Paper[]>(url)
      .then((res) => {
        setPapers(res.data);
        console.log("Fetched papers:", res.data);
      })
      .catch((err) => console.error(err));
  }, [level]);

  return (
    <div className="p-6 container">
      <h1 className="fw-bold mb-4">Papers {level ? `- ${level}` : ""}</h1>
      <div className="row g-4">
        {papers.length === 0 ? (
          <p className="text-muted">No papers found.</p>
        ) : (
          papers.map((paper) => (
            <div key={paper.uploadID} className="col-12 col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body">
                  <p className="card-text text-muted">
                    {paper.subjectOrCourseName} | {paper.paperType} | {paper.part} | {paper.year}
                  </p>
                  <p className="card-text">Medium: {paper.medium}</p>
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-sm mt-2"
                  >
                    Download
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PaperPage;
