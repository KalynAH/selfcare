import { useEffect, useState } from "react";
import { getAllSelfcares, deleteSelfcare } from "../services/selfcare_service";
import { Link, useNavigate } from "react-router-dom";

function AllSelfcares() {
  const navigate = useNavigate();
  const [selfcares, setSelfcares] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getAllSelfcares()
      .then((data) => {
        setSelfcares(data);
        setLoaded(true);
      })
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log("Unauthorized.");
          navigate("/login?message=unauthorized");
        }
      });
  }, [loaded]);

  const handleDelete = (selfcareId) => {
    deleteSelfcare(selfcareId)
      .then(() => setLoaded(false))
      .catch((err) => {
        console.log(err);
        if (err.response.status === 401) {
          console.log("Unauthorized.");
        }
      });
  };

  return (
    loaded && (
      <>
        <p>Welcome: {`${users.first_name}`}</p>
        <h1 className="display-1 mb-3">All Selfcare Routines</h1>
        <table className="table">
          <thead>
            <tr>
              <th>Title:</th>
              <th>Description:</th>
              <th>Location:</th>
              <th>Actions:</th>
            </tr>
          </thead>
          <tbody>
            {selfcares.map((selfcare) => (
              <tr key={selfcare.id}>
                <td className="align-middle">
                  <Link to={`/selfcares/${selfcare.id}`}>{selfcare.title}</Link>
                </td>
                <td className="align-middle">{selfcare.description}</td>
                <td className="align-middle">{selfcare.location}</td>
                <td className="align-middle d-flex gap-2">
                  <Link
                    to={`/selfcares/${selfcare.id}`}
                    className="btn btn-sm btn-primary"
                  >
                    view
                  </Link>
                  <Link
                    to={`/selfcares/${selfcare.id}/edit`}
                    className="btn btn-sm btn-warning"
                  >
                    edit
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(selfcare.id)}
                    className="btn btn-sm btn-danger"
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h2 className="display-1 mb-3">My [-Users ]Selfcare Routines</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title:</th>
              </tr>
            </thead>
            <tbody>
              {selfcares.map((selfcare) => (
                <tr key={selfcare.id}>
                  <td className="align-middle d-flex gap-4">
                    <Link to={`/selfcares/${selfcare.id}`}>
                      {selfcare.title}
                    </Link>
                    <Link className="btn btn-sm btn-warning">done</Link>
                    <Link
                      to={`/selfcares/${selfcare.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      view
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    )
  );
}

export default AllSelfcares;
