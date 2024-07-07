import { useEffect, useState } from "react";
import { getAllSelfcares, deleteSelfcare } from "../services/selfcare_service";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function AllSelfcares() {
  const navigate = useNavigate();
  const [selfcares, setSelfcares] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [loggedInUserSelfcare, setLoggedInUserSelfcare] = useState([]);
  const { id } = useContext(AuthContext);

  useEffect(() => {
    getAllSelfcares()
      .then((data) => {
        setSelfcares(data);
        grabUserSelfcare(data);
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

  const grabUserSelfcare = (data) => {
    const userData = data.filter((routine) => routine.user_id == id);
    setLoggedInUserSelfcare(userData);
  };

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
                  {id === selfcare.user_id && (
                    <>
                      <Link
                        to={`/selfcares/${selfcare.id}/edit`}
                        className="btn btn-sm btn-warning"
                      >
                        edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDelete(selfcare.id)}
                        className="btn btn-sm btn-danger "
                      >
                        delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div>
          <h2 className="display-1 mb-3">My Selfcare Routines</h2>
          <table className="table">
            <thead>
              <tr>
                <th>Title:</th>
              </tr>
            </thead>
            <tbody>
              {loggedInUserSelfcare.map((selfcare) => (
                <tr key={selfcare.id}>
                  <td className="align-middle d-flex gap-4">
                    <Link to={`/selfcares/${selfcare.id}`}>
                      {selfcare.title}
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleDelete(selfcare.id)}
                      className="btn btn-sm btn-danger"
                    >
                      delete
                    </button>

                    <Link
                      to={`/selfcares/${selfcare.id}`}
                      className="btn btn-sm btn-primary "
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
