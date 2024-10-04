import React, {useState} from 'react';
import axios from 'axios';
import '../Employees/DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import {Icon} from "@iconify/react";

interface Attendance {
    id: number;
    name: string;
    email: string;
    in_date: string;
    out_date: string;
    present: string;
    location: string;
}

const AttendanceTable: React.FC = () => {
    const [date, setDate] = useState<string>('');
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // Reset error on new submission

        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time portion of today's date for accurate comparison
        selectedDate.setHours(0, 0, 0, 0); // Reset time portion of selected date

        // Check if the selected date is in the future
        if (selectedDate > today) {
            setError('Selected date cannot be in the future.');
            return; // Prevent submission if the date is invalid
        }

        setLoading(true);

        try {
            let API_URL = process.env.REACT_APP_API_URL;
            const response = await axios.post(
                `${API_URL}/Employee/Atdc/GET_ON_DATE`,
                {date},
                {
                    headers: {
                        Authorization: 'Bearer ' + sessionStorage.getItem('token'), // Authorization if needed
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.data.error === '0') {
                setAttendanceData(response.data.msg); // Set the attendance data
            } else {
                setError(response.data.msg); // Set error if no data found or other issues
            }
        } catch (err) {
            setError('An error occurred while fetching attendance data.');
        } finally {
            setLoading(false);
        }
    };

    function handleEditClick() {}

    return (
        <div>
            <h1>Attendance Module</h1>

            {/* Date Input Form */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="attendance-date">Select Date:&nbsp;</label>
                <input
                    type="date"
                    id="attendance-date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                &nbsp;
                <button type="submit">Get Attendance</button>
            </form>

            {error && <p style={{color: 'red'}}>{error}</p>}

            {loading && <LoadingSpinner />}

            {attendanceData.length > 0 && (
                <div className="container">
                    <table className="data-table">
                        <caption className="table-title">Attendance on {date}</caption>
                        <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>In Date</th>
                            <th>Status</th>
                            <th>Location</th>
                            <th>Complete Attendance</th>
                        </tr>
                        </thead>
                        <tbody>
                        {attendanceData.map((entry) => (
                            <tr key={entry.id}>
                                <td>{entry.name}</td>
                                <td>{entry.email}</td>
                                <td>{new Date(entry.in_date).toLocaleDateString()}</td>
                                <td>
                                    {entry.present ? (
                                        <Icon
                                            icon="dashicons:yes"
                                            width="30px"
                                            height="30px"
                                            style={{color: 'green'}}
                                        />
                                    ) : (
                                        <Icon
                                            icon="charm:cross"
                                            width="30px"
                                            height="30px"
                                            style={{color: 'red'}}
                                        />
                                    )}
                                </td>
                                <td>{entry.location}</td>
                                <td>
                                    <button type="button" onClick={handleEditClick}>
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AttendanceTable;