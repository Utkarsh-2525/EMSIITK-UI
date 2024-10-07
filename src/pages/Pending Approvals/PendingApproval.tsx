import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import { Icon } from "@iconify/react";

interface Employee {
    id: number;
    name: string;
    email: string;
    password: string;
    apply_date: string;
    dob: number;
    designation: string;
    salary: number;
    total_leave: number;
    approved_leave: number;
    bank_name: string;
    bank_acc_no: string;
    ifsc_code: string;
    hire_status: string;
    email_verify: string;
    photo: string;
    aadhar: string;
}

const DataTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;
    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch employee data from API
    const fetchEmployees = async () => {
        setLoading(false);
        try {
            const response = await axios.get(`${API_URL}/Admin/Fetch/EMP_PENDING`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                },
            });
            setEmployees(response.data.msg);
            setError(null);  // Reset the error on success
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

            // If the response contains msg === 0, refresh the data
            if (response.data.msg === "Status Updated Successfully" && response.data.error === "0") {
                // Re-fetch employee data to refresh the table without page reload
                await fetchEmployees();
            }

            console.log('API call response:', response.data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

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
        <div className="container">
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
                                <Icon icon="dashicons:yes" width="27px" height="27px" style={{ color: 'green' }} />
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
