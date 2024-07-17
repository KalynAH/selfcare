import { useContext } from "react";

import { AuthContext } from "../context/AuthProvider";

function UserBar() {
  const { email, id } = useContext(AuthContext);
  console.log(id);

  return (
    <header className="py-2 bg-body-secondary">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">{email}</p>
      </div>
    </header>
  );
}

export default UserBar;
