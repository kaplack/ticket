import React from 'react'
import { useState } from 'react';
import EmpHeaderSection from './EmpHeader';
import EmpSidebarSection from './EmpSidebar';

import EmpRoutes from './EmpRoutes';

function EmpLayout() {
    const [sidebarActive, setSidebarActive] = useState(true);

    const handleSidebarCollapse = () => {
        setSidebarActive(!sidebarActive);
    }

    return (
        <>
            <div className="page-wraper">

                <EmpHeaderSection onClick={handleSidebarCollapse} sidebarActive={sidebarActive} />
                <EmpSidebarSection sidebarActive={sidebarActive} />

                <div id="content" className={sidebarActive ? "" : "active"}>
                    <div className="content-admin-main">
                        <EmpRoutes />
                    </div>
                </div>

                {/* <YesNoPopup id="delete-dash-profile" type={popupType.DELETE} msg={"Do you want to delete your profile?"} />
                <YesNoPopup id="logout-dash-profile" type={popupType.LOGOUT} msg={"Do you want to Logout your profile?"} /> */}

            </div>
        </>
    )
}

export default EmpLayout
