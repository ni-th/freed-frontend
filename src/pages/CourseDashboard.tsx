import React, { useState, useEffect } from "react";
import api from "../api";

interface Course {
  subjectID?: number;
  level: string;
  subjectOrCourseName: string;
  subjectOrCourse: string;
}

const CourseDashboard: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [level, setLevel] = useState("");
  const [subjectOrCourseName, setSubjectOrCourseName] = useState("");
  const [subjectOrCourse, setSubjectOrCourse] = useState("");

  // Fetch all courses
  const fetchCourses = async () => {
    try {
      const response = await api.get("/course/all");
      setCourses(response.data);
    } catch (err) {
      console.error("Failed to fetch courses", err);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openModal = (course?: Course) => {
    if (course) {
      setEditingCourse(course);
      setLevel(course.level);
      setSubjectOrCourseName(course.subjectOrCourseName);
      setSubjectOrCourse(course.subjectOrCourse);
    } else {
      setEditingCourse(null);
      setLevel("");
      setSubjectOrCourseName("");
      setSubjectOrCourse("");
    }
    setShowModal(true);
  };

  const closeModal = () => setShowModal(false);

  const handleSave = async () => {
    try {
      const payload = {
        level,
        subjectOrCourseName,
        subjectOrCourse,
        subjectID: editingCourse?.subjectID, // Include ID only when editing
      };
      if (editingCourse) {
        await api.put("/course/update", payload);
      } else {
        await api.post("/course/create", payload);
      }
      fetchCourses();
      closeModal();
    } catch (err) {
      console.error("Failed to save course", err);
    }
  };

  const handleDelete = async (id: number | undefined) => {
    if (!id) return;
    try {
      await api.delete(`/course/delete/${id}`);
      fetchCourses();
    } catch (err) {
      console.error("Failed to delete course", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Course Dashboard</h2>
      <button className="btn btn-primary mb-3" onClick={() => openModal()}>
        Create Course
      </button>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Level</th>
            <th>Course Name</th>
            <th>Subject/Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.subjectID}>
              <td>{course.subjectID}</td>
              <td>{course.level}</td>
              <td>{course.subjectOrCourseName}</td>
              <td>{course.subjectOrCourse}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => openModal(course)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(course.subjectID)}
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
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingCourse ? "Edit Course" : "Create Course"}
                </h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Level</label>
                  <input
                    type="text"
                    className="form-control"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Course Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjectOrCourseName}
                    onChange={(e) => setSubjectOrCourseName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject/Course</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subjectOrCourse}
                    onChange={(e) => setSubjectOrCourse(e.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editingCourse ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDashboard;
