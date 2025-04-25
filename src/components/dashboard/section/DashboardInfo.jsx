// //src/components/dashboard/section/DashboardInfo.jsx
// 'use client';

// import { useAuth } from '@/context/AuthContext';
// import ProtectedRoute from '@/components/auth/ProtectedRoute';
// import React from "react";
// import DashboardNavigation from "../header/DashboardNavigation";
// import MyLessonInfo from "../section/MyLessonInfo";


// export default function DashboardInfo() {
//   const { user, logout } = useAuth();

//   return (
//     <ProtectedRoute>

//       <div className="dashboard__content hover-bgc-color">
//         <div className="row pb40">
//           <div className="col-lg-12">
//             <DashboardNavigation />
//           </div>
//           <div className="col-lg-12">
//             <div className="dashboard_title_area">
//               <h2>My Lessons</h2>
//               <p className="text">You can see your upcoming lessons and previous lessons here</p>

//             </div>
            
            
        
            
//             <MyLessonInfo />
//           </div>
//         </div>
//        </div>
//        </ProtectedRoute>
//   );
// }
//src/components/dashboard/section/DashboardInfo.jsx
'use client';

import { useAuth } from '@/context/AuthContext_backup';
import React from "react";
import DashboardNavigation from "../header/DashboardNavigation";
import MyLessonInfo from "../section/MyLessonInfo";

export default function DashboardInfo() {
  const { user } = useAuth();

  return (
    <div className="dashboard__content hover-bgc-color">
      <div className="row pb40">
        <div className="col-lg-12">
          <DashboardNavigation />
        </div>
        <div className="col-lg-12">
          <div className="dashboard_title_area">
            <h2>My Lessons</h2>
            <p className="text">You can see your upcoming lessons and previous lessons here</p>
          </div>
          
          <MyLessonInfo />
        </div>
      </div>
    </div>
  );
}