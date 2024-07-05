import WithAuth from "../utils/WithAuth";
import EditSelfcare from "../components/EditSelfcare";

const ProtectedEditSelfcare = WithAuth(EditSelfcare);

export default ProtectedEditSelfcare;
