import React, { useState, useEffect } from "react";
import api from "../api";
import type { Course, Paper } from "../types/Types";

const Dashboard: React.FC = () => {
  // -------- Courses state --------
  const [courses, setCourses] = useState<Course[]>([]);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [courseLevel, setCourseLevel] = useState("");
  const [courseName, setCourseName] = useState("");

  // -------- Papers state --------
  const [papers, setPapers] = useState<Paper[]>([]);
  const [showPaperModal, setShowPaperModal] = useState(false);
  const [editingPaper, setEditingPaper] = useState<Paper | null>(null);
  const [paperCourseName, setPaperCourseName] = useState("");
  const [level, setLevel] = useState(""); // auto-set from course
  const [paperType, setPaperType] = useState("");
  const [part, setPart] = useState("");
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [medium, setMedium] = useState("");
  const [url, setUrl] = useState("");

  // ----------------- Fetch Data -----------------
  const fetchCourses = async () => {
    try {
      const response = await api.get("/course/all");
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPapers = async () => {
    try {
      const response = await api.get("/paper/all");
      setPapers(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCourses();
    fetchPapers();
  }, []);

  // ----------------- Course Handlers -----------------
  const openCourseModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setCourseLevel(course.level);
      setCourseName(course.subjectOrCourseName);
    } else {
      setEditingCourse(null);
      setCourseLevel("");
      setCourseName("");
    }
    setShowCourseModal(true);
  };

  const closeCourseModal = () => setShowCourseModal(false);

  const saveCourse = async () => {
    if (!courseLevel || !courseName) {
      alert("All fields are required!");
      return;
    }
    const payload = {
      level: courseLevel,
      subjectOrCourseName: courseName,
      subjectID: editingCourse?.subjectID,
    };
    try {
      if (editingCourse) {
        await api.put("/course/update", payload);
      } else {
        await api.post("/course/create", payload);
      }
      fetchCourses();
      closeCourseModal();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCourse = async (id?: number) => {
    if (!id) return;
    try {
      await api.delete(`/course/delete/${id}`);
      fetchCourses();
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Paper Handlers -----------------
  const openPaperModal = (paper?: Paper) => {
    if (paper) {
      setEditingPaper(paper);
      setPaperCourseName(paper.subjectOrCourseName);
      setLevel(paper.level);
      setPaperType(paper.paperType);
      setPart(paper.part);
      setYear(paper.year);
      setMedium(paper.medium);
      setUrl(paper.url);
    } else {
      setEditingPaper(null);
      setPaperCourseName("");
      setLevel("");
      setPaperType("");
      setPart("");
      setYear(new Date().getFullYear());
      setMedium("");
      setUrl("");
    }
    setShowPaperModal(true);
  };

  const closePaperModal = () => setShowPaperModal(false);

  const savePaper = async () => {
    if (!paperCourseName || !paperType || !part || !year || !medium || !url) {
      alert("All fields are required!");
      return;
    }
    const payload: Partial<Paper> = {
      level,
      paperType,
      part,
      year,
      medium,
      url,
      subjectOrCourseName: paperCourseName,
      uploadID: editingPaper?.uploadID,
    };
    try {
      if (editingPaper) {
        await api.put("/paper/update", payload);
      } else {
        await api.post("/paper/create", payload);
      }
      fetchPapers();
      closePaperModal();
    } catch (err) {
      console.error(err);
    }
  };

  const deletePaper = async (id: number) => {
    try {
      await api.delete(`/paper/delete/${id}`);
      fetchPapers();
    } catch (err) {
      console.error(err);
    }
  };

  // ----------------- Render -----------------
  return (
    <div className="container mt-4">
      {/* ------------- Course Dashboard ------------- */}
      <h2>Course Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => openCourseModal()}>Create Course</button>
      <table className="table table-bordered mb-5">
        <thead>
          <tr>
            <th>ID</th>
            <th>Level</th>
            <th>Course Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.subjectID}>
              <td>{course.subjectID}</td>
              <td>{course.level}</td>
              <td>{course.subjectOrCourseName}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openCourseModal(course)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteCourse(course.subjectID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ------------- Paper Dashboard ------------- */}
      <h2>Paper Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => openPaperModal()}>Add Paper</button>
      <table className="table table-bordered mb-5">
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
          {papers.map(paper => (
            <tr key={paper.uploadID}>
              <td>{paper.uploadID}</td>
              <td>{paper.level}</td>
              <td>{paper.paperType}</td>
              <td>{paper.part}</td>
              <td>{paper.subjectOrCourseName}</td>
              <td>{paper.year}</td>
              <td>{paper.medium}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => openPaperModal(paper)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => deletePaper(paper.uploadID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ---------- Course Modal ---------- */}
      {showCourseModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingCourse ? "Edit Course" : "Create Course"}</h5>
                <button type="button" className="btn-close" onClick={closeCourseModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <input className="form-control" value={courseLevel} onChange={e => setCourseLevel(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input className="form-control" value={courseName} onChange={e => setCourseName(e.target.value)} required />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeCourseModal}>Cancel</button>
                <button className="btn btn-primary" onClick={saveCourse}>{editingCourse ? "Update" : "Create"}</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ---------- Paper Modal ---------- */}
      {showPaperModal && (
        <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{editingPaper ? "Edit Paper" : "Add Paper"}</h5>
                <button className="btn-close" onClick={closePaperModal}></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <label className="form-label">Course Name</label>
                    <select className="form-control" value={paperCourseName} onChange={e => {
                      const selected = courses.find(c => c.subjectOrCourseName === e.target.value);
                      setPaperCourseName(e.target.value);
                      setLevel(selected?.level || "");
                    }} required>
                      <option value="">Select Course</option>
                      {courses.map(c => (
                        <option key={c.subjectID} value={c.subjectOrCourseName}>{c.subjectOrCourseName}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Paper Type</label>
                    <select className="form-control" value={paperType} onChange={e => setPaperType(e.target.value)} required>
                      <option value="">Select Paper Type</option>
                      <option value="Marking Scheme">Marking Scheme</option>
                      <option value="Past Paper">Past Paper</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Part</label>
                    <input className="form-control" value={part} onChange={e => setPart(e.target.value)} required />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Year</label>
                    <input type="number" className="form-control" value={year} onChange={e => setYear(Number(e.target.value))} min={2000} max={new Date().getFullYear()} required />
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">Medium</label>
                    <select className="form-control" value={medium} onChange={e => setMedium(e.target.value)} required>
                      <option value="">Select Medium</option>
                      <option value="Sinhala">Sinhala</option>
                      <option value="Tamil">Tamil</option>
                      <option value="English">English</option>
                    </select>
                  </div>

                  <div className="col-md-4 mb-3">
                    <label className="form-label">URL</label>
                    <input className="form-control" value={url} onChange={e => setUrl(e.target.value)} required />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePaperModal}>Cancel</button>
                <button className="btn btn-primary" onClick={savePaper}>{editingPaper ? "Update" : "Add"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
