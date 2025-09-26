import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api";
import type { Course } from "../types/Types";

export default function Category() {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    api
      .get<Course[]>("/course/all")
      .then((res) => {
        // Extract unique levels
        const levels = Array.from(new Set(res.data.map((c) => c.level)));
        setCategories(levels);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="p-6 container-fluid">
      <h1 className="fw-bold my-4">Categories</h1>
      <div className="row g-4">
        {categories.map((level) => (
          <div key={level} className="col-12 col-md-6 col-lg-4">
            <Link to={`/paper?paper=${level}`} className="text-decoration-none">
              <div className="card h-100 shadow-sm border-0">
                <div className="card-body text-center">
                  <h5 className="card-title fw-semibold">{level}</h5>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
