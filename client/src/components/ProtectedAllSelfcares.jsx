import WithAuth from "../utils/WithAuth";
import AllSelfcares from "./AllSelfcares";

const ProtectedAllSelfcares = WithAuth(AllSelfcares);

export default ProtectedAllSelfcares;
