import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";
import {Icon} from "@iconify/react";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    useEffect(() => {
        const sendToken = async () => {
            axios.get(`${API_URL}/Admin/Fetch/EMP_HIRED`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                },
            }).then(response => {
                setEmployees(response.data.msg);
                setLoading(false);
            }).catch(err => {
                setError(err);
                setLoading(false);
            })
        }
        sendToken();
    }, []);

    const handleEditClick = async (employeeId: number) => {
        try {
            const response = await axios.post(
                `${API_URL}/Admin/Fetch/EMP_DETAILS`,
                {id: employeeId},
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);
            console.log(sessionStorage.getItem('token'));
            // navigate(`/employee/${employeeId}`);
            navigate('/employee/details', {state: {employeeId}});
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    const RevokeAccess = async (id: number) => {
        try {
            const response = await axios.post(`${API_URL}/Admin/Auth/REVOKE_ACCESS`,
                {id},
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log(response.data);
            console.log(sessionStorage.getItem('token'));
        } catch (error) {
            console.error('There was an error!', error);
        }
    };
    // Get current items for the page
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    //@ts-ignore

    const currentItems = employees.slice(indexOfFirstItem, indexOfLastItem);
    // Change page

    const totalPages = Math.ceil(employees.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    if (loading) {
        return (<LoadingSpinner/>);

    }
    if (error) {
        return <div className="error">{error}</div>;

    }

        return (
            <div className="container">
                <table className="data-table">
                    <caption className='table-title'>Active Employees</caption>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Designation</th>
                        <th className='column-id'>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    {employees.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            {/*<td>{new Date(employee.dob).toLocaleDateString()}</td>*/}
                            <td>{employee.designation}</td>
                            <td>
                                <button onClick={() => handleEditClick(employee.id)}>
                                    <Icon icon="bitcoin-icons:edit-outline" width="27px" height="27px"
                                          style={{color: 'black'}}/>
                                </button>
                                <button onClick={() => RevokeAccess(employee.id)}>
                                    <Icon icon="lets-icons:remove-fill" width="27px" height="27px"
                                          style={{color: 'red'}}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                <Pagination currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}/>
            </div>
        );
    };

    export default DataTable;
