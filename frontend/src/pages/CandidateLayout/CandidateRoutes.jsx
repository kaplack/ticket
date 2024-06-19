import { Route, Routes } from "react-router-dom";

import CanProfilePage from "./CanProfilePage";
import CanResumePage from "./CanResumePage";

function CandidateRoutes() {
    return (
        <Routes>
            
            <Route path={"/detail"} element={<CanProfilePage />} />
            <Route path={"/resume"} element={<CanResumePage />} />
            
            {/* <Route path="*" element={<Error404Page />} /> */}
        </Routes>
    )
}

export default CandidateRoutes;