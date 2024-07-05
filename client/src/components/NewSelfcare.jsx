import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

import { createSelfcare } from "../services/selfcare_service";
import { useNavigate } from "react-router-dom";

function NewSelfcare() {
  const navigate = useNavigate();
  const { id } = useContext(AuthContext);

  const [selfcare, setSelfcare] = useState({
    title: "",
    description: "",
    location: "",
    user_id: id,
  });
  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfcare((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createSelfcare(selfcare)
      .then(() => navigate("/selfcares"))
      .catch((err) => setErrors(err.response.data));
  };
  return (
    <>
      <h1 className="display-1 mb-3">Add a Selfcare Routine</h1>
      <div className="card shadow">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="title"
                id="title"
                className="form-control"
                value={selfcare.title}
                onChange={handleChange}
                placeholder="Selfcare title:"
              />
              <label htmlFor="title">Selfcare title:</label>
              {errors?.title && (
                <p className="form-text text-danger">{errors.title}</p>
              )}
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                name="description"
                id="description"
                className="form-control"
                value={selfcare.description}
                onChange={handleChange}
                placeholder="Selfcare description:"
              />
              <label htmlFor="description">Selfcare description:</label>
              {errors?.description && (
                <p className="form-text text-danger">{errors.description}</p>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                name="location"
                id="location"
                className="form-control"
                value={selfcare.location}
                onChange={handleChange}
                placeholder="Selfcare location:"
              />
              <label htmlFor="location">Selfcare location:</label>
              {errors?.location && (
                <p className="form-text text-danger">{errors.location}</p>
              )}
            </div>
            <div className="text-end">
              <button type="submit" className="btn btn-primary">
                Add Selfcare
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewSelfcare;
