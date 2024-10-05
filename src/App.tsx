import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";
import InactiveEmployees from "./pages/Employees/InactiveEmployees";
import ActiveEmployees from "./pages/Employees/ActiveEmployees";
import AllEmployees from "./pages/Employees/AllEmployees";
import EditEmployee from "./components/edit/Edit Employee/EditEmployee";
import EmployeeDetails from "./components/EmployeeDetails/EmployeeDetails";
import EditEmployeeDetails from "./components/edit/Edit Employee/EditEmployee";
import SignUp from "./pages/SignUp";
import PendingApproval from "./pages/Pending Approvals/PendingApproval";
import ViewAttendance from "./components/ViewAttendance/ViewAttendance";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Projects = React.lazy(() => import("./pages/Project/ProjectTable"));
const Attendance = React.lazy(() => import("./pages/Attendance/Attendance"));
const Holidays = React.lazy(() => import("./pages/Holidays/Holiday"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
    const [token, setToken] = useState<string | null>(sessionStorage.getItem("token"));

    useEffect(() => {
        const handleStorageChange = () => {
            const storedToken = sessionStorage.getItem("token");
            setToken(storedToken);
        };

        // Listen to the storage event
        window.addEventListener("storage", handleStorageChange);

        // Update token when the app is initialized
        handleStorageChange();

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />

                    {token ? (
                        <Route element={<AuthLayout />}>
                            <Route path="/" element={<MainLayout />}>
                                <Route index element={<Dashboard />} />
                                <Route path="employees/all" element={<AllEmployees />} />
                                <Route path="employees/active" element={<ActiveEmployees />} />
                                <Route path="employees/inactive" element={<InactiveEmployees />} />
                                <Route path="employee/:id" element={<EditEmployee />} />
                                <Route path="projects" element={<Projects />} />
                                <Route path="/employee/details" element={<EmployeeDetails />} />
                                <Route path="/employee/attendance/:employeeId" element={<ViewAttendance />} />
                                <Route path="/EMP_EDIT_DETAILS" element={<EditEmployeeDetails />} />
                                <Route path="attendance" element={<Attendance />} />
                                <Route path="holidays" element={<Holidays />} />
                                <Route path="/appr_pending" element={<PendingApproval />} />
                            </Route>
                        </Route>
                    ) : (
                        <Route path="*" element={<Navigate to="/login" />} />
                    )}
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
