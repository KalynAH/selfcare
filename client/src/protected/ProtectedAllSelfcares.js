import WithAuth from "../utils/WithAuth";
import AllSelfcares from "../components/AllSelfcares";

const ProtectedAllSelfcares = WithAuth(AllSelfcares);

export default ProtectedAllSelfcares;
