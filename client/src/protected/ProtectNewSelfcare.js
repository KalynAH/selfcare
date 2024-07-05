import WithAuth from "../utils/WithAuth";
import NewSelfcare from "../components/NewSelfcare";

const ProtectedNewSelfcare = WithAuth(NewSelfcare);

export default ProtectedNewSelfcare;
