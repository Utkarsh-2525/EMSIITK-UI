import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import ThemeContext from "../../store/themeContext";

interface Employee {
    id: number;
    name: string;
    email: string;
    designation: string;
    hire_status: number;
}

const DataTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const sendToken = async () => {
            axios.get(`${API_URL}/Admin/Fetch/ALL_EMP`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            }).then(response => {
                const employeeData = Array.isArray(response.data.msg) ? response.data.msg : [];
                setEmployees(employeeData);
                setLoading(false);
            }).catch(err => {
                setError(err.message || 'An error occurred');
                setLoading(false);
            });
        };
        sendToken();
    }, [API_URL]);

    // Get current items for the page
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return (<LoadingSpinner />);
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className={`container ${theme}`}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}></button>
            <table className="data-table">
                <caption className='table-title'>Employees List</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th>Hire Status</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.designation}</td>
                        <td>
                                <span style={{ color: employee.hire_status === 1 ? 'green' : employee.hire_status === 3 ? 'red' : 'black' }}>
                                    {employee.hire_status === 1 ? "Active" : employee.hire_status === 3 ? "Inactive" : "Unknown"}
                                </span>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
};

export default DataTable;
