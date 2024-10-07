import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";

interface Employee {
    id: number;
    name: string;
    email: string;
    dob: number;
    designation: string;
}

const DataTable: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;

    useEffect(() => {
        const sendToken = async () => {
            let API_URL = process.env.REACT_APP_API_URL;
            axios.get(`${API_URL}/Admin/Fetch/EMP_INACTIVE`, {
                headers: {
                    Authorization: 'Bearer ' + sessionStorage.getItem('token')
                },
            }).then(response => {
                setEmployees(response.data.msg);
                setLoading(false);
            }).
            catch(err => {
                setError(err);
                setLoading(false);
            })
        }
        sendToken();
    }, []);

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
                <caption className='table-title'>Inactive Employees</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Designation</th>
                </tr>
                </thead>
                <tbody>
                {employees.map((employee) => (
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.name}</td>
                        <td>{employee.email}</td>
                        <td>{employee.designation}</td>
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
