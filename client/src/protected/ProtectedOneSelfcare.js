import WithAuth from "../utils/WithAuth";
import OneSelfcare from "../components/OneSelfcare";

const ProtectedOneSelfcare = WithAuth(OneSelfcare);

export default ProtectedOneSelfcare;
