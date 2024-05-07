import { Route, Routes } from "react-router-dom";

import CanProfilePage from "./CanProfilePage";


function CandidateRoutes({ picture }) {
    return (
        <Routes>
            
            <Route path={"/"} element={<CanProfilePage />} />
            
            {/* <Route path="*" element={<Error404Page />} /> */}
        </Routes>
    )
}

export default CandidateRoutes;