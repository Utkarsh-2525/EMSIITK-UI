import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import './AttendanceTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import { useNavigate } from "react-router-dom";
import ThemeContext from "../../store/themeContext";

interface Attendance {
    id: number;
    name: string;
    email: string;
}

const Attendance: React.FC = () => {
    const [employees, setEmployees] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get(`${API_URL}/Admin/Fetch/EMP_HIRED`, {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                    },
                });
                setEmployees(response.data.msg);
                setLoading(false);
            } catch (err) {
                setError(err as string);
                setLoading(false);
            }
        };
        fetchEmployees();
    }, [API_URL]);

    const ViewAttendance = async (employeeId: number) => {
        try {
            const response = await axios.post(
                `${API_URL}/Employee/Atdc/GET_ON_DATE`,
                { id: employeeId },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            navigate(`/employee/attendance/${employeeId}`, { state: { attendanceData: response.data.msg } });
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    // Update: Pass employee ID to the MarkAttendance page via route parameter
    const MarkAttendance = (id: number) => {
        navigate(`/Mark_Attendance/${id}`); // Route with employee ID as param
    }

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
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}> </button>
            <table className="data-table">
                <caption className='table-title'>Attendance of Employees</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th className='column-id'>Attendance</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button type="button" onClick={() => ViewAttendance(employee.id)}>View</button>
                            <button onClick={() => MarkAttendance(employee.id)} style={{background: '#08a80f',
                                color: 'white'}}>Mark</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange}/>
        </div>
    );
};

export default Attendance;