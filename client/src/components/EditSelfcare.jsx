import { useEffect, useState } from "react";
import { editSelfcare } from "../services/selfcare_service";
import { useNavigate, useParams } from "react-router-dom";
import { getOneSelfcare } from "../services/selfcare_service";

function EditSelfcare() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selfcare, setSelfcare] = useState({
    title: "",
    description: "",
    location: "",
  });
  const [errors, setErrors] = useState(null);

  useEffect(() => {
    getOneSelfcare(id)
      .then((data) => {
        setSelfcare(data);
        return data;
      })
      .then((data) =>
        setSelfcare((prev) => ({
          ...prev,
          title: data.title,
          description: data.description,
          location: data.location,
        }))
      )
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelfcare((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    editSelfcare(id, selfcare)
      .then(() => navigate(`/selfcares/${id}`))
      .catch((err) => setErrors(err.response.data));
  };

  return (
    <>
      <h1 className="display-1 mb-3">Edit Your Selfcare Routine Here!</h1>
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
              <label htmlFor="title">Selfcare Title:</label>
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
                placeholder="Selfcare Description:"
              />
              <label htmlFor="description">Selfcare Description:</label>
              {errors?.description && (
                <p className="form-text text-danger">{errors.dscription}</p>
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
                placeholder=" Selcare Location:"
              />
              <label htmlFor="location">Selfcare Location:</label>
              {errors?.location && (
                <p className="form-text text-danger">{errors.location}</p>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              Edit Selfcare
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditSelfcare;
