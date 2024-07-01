import { useEffect, useState } from "react";
import { getOneSelfcare } from "../services/selfcare_service";
import { useParams } from "react-router-dom";

function OneSelfcare() {
  const { id } = useParams();
  const [selfcare, setSelfcare] = useState(null);

  useEffect(() => {
    getOneSelfcare(id)
      .then((data) => setSelfcare(data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    selfcare && (
      <>
        <h1 className="display-1 mb-3">{selfcare.title}</h1>
        <div className="card shadow">
          <div className="card-body">
            <p className="card-text">{selfcare.title}</p>
            <p className="card-text2">{selfcare.description} </p>
            <p className="card-text3">{selfcare.location}</p>
          </div>
        </div>
      </>
    )
  );
}

export default OneSelfcare;
