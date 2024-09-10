import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../../components/Pagination/Pagination'; // Ensure this path is correct
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner"; // Ensure this path is correct

const ITEMS_PER_PAGE = 15;

const ProjectTable: React.FC = () => {
    // @ts-ignore
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/todos')
            .then(response => {
                setProjects(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    const totalPages = Math.ceil(projects.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentProjects = projects.slice(startIndex, endIndex);

    if (loading)
        return <LoadingSpinner/>;

    if (error)
        return <div className="error">{error}</div>;

    const getStatusClass = (status: boolean) => {
        if (status) {
            return 'status-completed';
        }
        return 'status-in-progress'; // Adjust as needed for other statuses
    };

    return (
        <div className="container">
            <table className="project-table">
                <caption className="table-title">Ongoing Projects</caption>
                <thead>
                <tr>
                    <th>Task ID</th>
                    <th>Title</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                {currentProjects.length === 0 ? (
                    <tr>
                        <td colSpan={3} className="no-data">No data available</td>
                    </tr>
                ) : (
                    currentProjects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.id}</td>
                            <td>{project.title}</td>
                            <td>
                  <span className={`project-status ${getStatusClass(project.completed)}`}>
                    {project.completed ? 'Completed' : 'Incomplete'}
                  </span>
                            </td>
                        </tr>
                    ))
                )}
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

export default ProjectTable;