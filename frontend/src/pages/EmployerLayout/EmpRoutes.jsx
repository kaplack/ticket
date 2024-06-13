import { Route, Routes } from "react-router-dom";

import EmpProfilePage from "./EmpProfilePage";
import EmpDashboard from "./EmpDashboard";
import EmpNewWork from "./EmpNewWork";
import EmpWorks from "./EmpWorks";
import EmpWork from "./EmpWork";


function EmpRoutes() {
    return (
        <Routes>
            
            <Route path={"/"} element={<EmpProfilePage />} />
            <Route path={"/profile"} element={<EmpProfilePage />} />
            <Route path={"/new-work"} element={<EmpNewWork />} />
            <Route path={"/works"} element={<EmpWorks />} />
            <Route path={"/works/:workId"} element={<EmpWork />} />
            
            {/* <Route path="*" element={<Error404Page />} /> */}
        </Routes>
    )
}

export default EmpRoutes;