import React, {useContext, useEffect, useState} from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import { Icon } from "@iconify/react";
import ThemeContext from "../../store/themeContext";

interface Employee {
    id: number;
    name: string;
    email: string;
    password: string;
    apply_date: string;
    dob: number;
    designation: string;
}

const DataTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;
    const API_URL = process.env.REACT_APP_API_URL;

    const fetchEmployees = async () => {
        setLoading(false);
        try {
            const response = await axios.get(`${API_URL}/Admin/Fetch/EMP_PENDING`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                },
            });
            setEmployees(response.data.msg);
            setError(null);
        } catch (err) {
            setError('Error fetching employee data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const ChangeStatus = async (id: number) => {
        try {
            const response = await axios.post(`${API_URL}/Admin/Routes/SET_HIRE_STATUS`,
                { id },
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.msg === "Status Updated Successfully" && response.data.error === "0")
                await fetchEmployees();

        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);

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
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}/>
            <table className="data-table">
                <caption className='table-title'>Pending Approvals</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button onClick={() => ChangeStatus(employee.id)}>
                                <Icon icon="dashicons:yes" width="27px" height="27px" style={{color: 'green'}}/>
                            </button>
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