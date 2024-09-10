import React, {Suspense} from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import MainLayout from "./layout/MainLayout";
import AuthLayout from "./layout/AuthLayout";
import LoadingSpinner from "./components/UI/loadingSpinner/LoadingSpinner";
import "./scss/App.scss";

const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Employees = React.lazy(() => import("./pages/Employees/Employees"));
const CustomerEdit = React.lazy(() => import("./pages/CustomerEdit"));
const Projects = React.lazy(() => import("./pages/Project/ProjectTable"));
const Attendance = React.lazy(() => import("./pages/Attendance"));
const ProductEdit = React.lazy(() => import("./pages/ProductEdit"));
const Holidays = React.lazy(() => import("./pages/Holidays/Holiday"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const BlankPage = React.lazy(() => import("./pages/BlankPage"));
const Login = React.lazy(() => import("./pages/Login"));

function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<LoadingSpinner/>}>
                <Routes>
                    <Route element={<AuthLayout/>}>
                        <Route path="/" element={<MainLayout/>}>
                            <Route index element={<Dashboard/>}/>
                            <Route path="/employees" element={<Employees/>}/>
                            <Route path="/employees/:customerId" element={<CustomerEdit/>}/>
                            <Route path="/projects" element={<Projects />} />
                            <Route path="/attendance" element={<Attendance/>}/>
                            <Route path="/products/:productId" element={<ProductEdit/>}/>
                            <Route path="/orders" element={<BlankPage/>}/>
                            {/*<Route path="/analytics" element={<ToDoComponent/>}/>*/}
                            <Route path="/holidays" element={<Holidays/>}/>
                            <Route path="/app_pending" element={<BlankPage/>}/>
                        </Route>
                    </Route>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;
