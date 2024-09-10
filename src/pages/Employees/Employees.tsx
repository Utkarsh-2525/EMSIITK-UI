import React, {useEffect, useState} from 'react';
import axios from 'axios';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import Pagination from "../../components/Pagination/Pagination";

interface Data {
    username: string;
    id: number;
    name: string;
    email: string;
    website: string;
    phone: number;
}

const DataTable: React.FC = () => {
    const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const ITEMS_PER_PAGE = 15;

    useEffect(() => {
        // Fetch data from an API
        // axios.get('http://localhost:8000/Admin/Fetch/EMP_HIRED')
        axios.get('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                setData(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    // Get current items for the page
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    //@ts-ignore
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Change page
    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

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
                <caption className='table-title'>Employee List</caption>
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>User Name</th>
                    <th>Phone</th>
                    <th>Website</th>
                </tr>
                </thead>
                <tbody>
                {currentItems.map((item) => (
                    <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.username}</td>
                        <td>{item.phone}</td>
                        <td>{item.website}</td>
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
