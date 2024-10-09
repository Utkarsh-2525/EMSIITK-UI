import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../store/themeContext";

interface Employee {
    id: number;
    name: string;
    email: string;
    designation: string;
}

const DataTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    // Function to fetch employees
    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/Admin/Fetch/EMP_HIRED`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                },
            });
            setEmployees(response.data.msg);
            setLoading(false);
        } catch (error) {
            console.error('There was an error!', error);
            setLoading(false);
        }
    };

    // Fetch employees when component mounts
    useEffect(() => {
        fetchEmployees();
    }, []);

    // Handle edit click
    const handleEditClick = async (employeeId: number) => {
        try {
            const response = await axios.post(
                `${API_URL}/Admin/Fetch/EMP_DETAILS`,
                { id: employeeId },
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response.data);
            navigate('/employee/details', { state: { employeeId } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // Revoke access and refresh employee list
    const RevokeAccess = async (id: number) => {
        try {
            const response = await axios.post(`${API_URL}/Admin/Auth/REVOKE_ACCESS`,
                { id },
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log(response.data);
            fetchEmployees();
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // Pagination logic
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (loading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className={`container ${theme}`}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}/>
            <table className="data-table">
                <caption className="table-title">Active Employees</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                    <th className="column-id">Action</th>
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
                            <button
                                onClick={() => handleEditClick(employee.id)}
                                style={{background: 'transparent', border: 'none', cursor: 'pointer', marginRight: '10px'}}
                                title="Edit">
                                <Icon icon="bitcoin-icons:edit-outline" width="27px" height="27px"
                                      style={{color : theme === 'dark' ? "yellow" : "black"}}/>
                            </button>
                            <button
                                onClick={() => RevokeAccess(employee.id)}
                                style={{background: 'transparent', border: 'none', cursor: 'pointer'}}
                                title="Revoke Access">
                                <Icon icon="lets-icons:remove-fill" width="27px" height="27px" style={{color: 'red'}}/>
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    );
};

export default DataTable;