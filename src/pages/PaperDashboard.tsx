import React, { useState, useEffect } from "react";
import api from "../api";
import type { Course, Paper } from "../types/Types";


const PaperDashboard: React.FC = () => {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);

  const [level, setLevel] = useState("");
  const [paperType, setPaperType] = useState("");
  const [part, setPart] = useState("");
  const [subjectOrCourseName, setSubjectOrCourseName] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [medium, setMedium] = useState("");
  const [url, setUrl] = useState("");

  const fetchPapers = async () => {
    try {
      const response = await api.get("/paper/all");
      setPapers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await api.get("/course/all");
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPapers();
    fetchCourses();
  }, []);

  const openModal = (paper?: Paper) => {
    if (paper) {
      setEditingPaper(paper);
      setLevel(paper.level);
      setPaperType(paper.paperType);
      setPart(paper.part);
      setSubjectOrCourseName(paper.subjectOrCourseName);
      setYear(paper.year);
      setMedium(paper.medium);
      setUrl(paper.url);
    } else {
      setEditingPaper(null);
      setLevel("");
      setPaperType("");
      setPart("");
      setSubjectOrCourseName("");
      setYear(new Date().getFullYear());
      setMedium("");
      setUrl("");
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    const payload: Partial<Paper> = {
      level,
      paperType,
      part,
      subjectOrCourseName,
      year,
      medium,
      url,
      uploadID: editingPaper?.uploadID,
    };

    try {
      if (editingPaper) {
        await api.put("/paper/update", payload);
      } else {
        await api.post("/paper/create", payload);
      }
      fetchPapers();
      closeModal();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/paper/delete/${id}`);
      fetchPapers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Past Papers Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Add Paper
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Level</th>
            <th>Paper Type</th>
            <th>Part</th>
            <th>Course Name</th>
            <th>Year</th>
            <th>Medium</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {papers.map((paper) => (
            <tr key={paper.uploadID}>
              <td>{paper.uploadID}</td>
              <td>{paper.level}</td>
              <td>{paper.paperType}</td>
              <td>{paper.part}</td>
              <td>{paper.subjectOrCourseName}</td>
              <td>{paper.year}</td>
              <td>{paper.medium}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(paper)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(paper.uploadID)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingPaper ? "Edit Paper" : "Add Paper"}
                </h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Level</label>
                    <input
                      type="text"
                      className="form-control"
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Paper Type</label>
                    <select
                      className="form-control"
                      value={paperType}
                      onChange={(e) => setPaperType(e.target.value)}
                    >
                      <option value="">Select Paper Type</option>
                      <option value="Marking Scheme">Marking Scheme</option>
                      <option value="Past Paper">Past Paper</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Part</label>
                    <input
                      type="text"
                      className="form-control"
                      value={part}
                      onChange={(e) => setPart(e.target.value)}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Course Name</label>
                    <select
                      className="form-control"
                      value={subjectOrCourseName}
                      onChange={(e) =>
                        setSubjectOrCourseName(e.target.value)
                      }
                    >
                      <option value="">Select Course</option>
                      {courses.map((course) => (
                        <option
                          key={course.subjectID}
                          value={course.subjectOrCourseName}
                        >
                          {course.subjectOrCourseName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Year</label>
                    <input
                      type="number"
                      className="form-control"
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                      min={2000}
                      max={new Date().getFullYear()}
                    />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Medium</label>
                    <select
                      className="form-control"
                      value={medium}
                      onChange={(e) => setMedium(e.target.value)}
                    >
                      <option value="">Select Medium</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="Tamil">Tamil</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">URL</label>
                    <input
                      type="text"
                      className="form-control"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingPaper ? "Update" : "Add"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaperDashboard;
