import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import LoadingSpinner from "../UI/loadingSpinner/LoadingSpinner";
import Pagination from "../Pagination/Pagination"; // Assuming you have a Pagination component
import './ViewAttendance.css'; // Import your CSS file

interface Attendance {
    [key: number]: number;
    id: string;
    sno: number;
    year: number;
    month: number;
}

const AttendanceTable: React.FC = () => {
    const { employeeId } = useParams<{ employeeId: string }>();  // Get employeeId from URL params
    const location = useLocation(); // Access location to get passed state
    const [attendanceData, setAttendanceData] = useState<Attendance[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentMonthIndex, setCurrentMonthIndex] = useState<number>(0);

    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];

    useEffect(() => {
        if (location.state && location.state.attendanceData) {
            setAttendanceData(location.state.attendanceData); // Use the passed attendance data
            setLoading(false);
        }
    }, [location.state]);

    if (loading) {
        return <LoadingSpinner />; // Show loading if data is not available
    }

    if (!attendanceData.length) {
        return <div>No attendance data available.</div>;
    }

    // Extract the current month's data
    const currentMonthData = attendanceData[currentMonthIndex];

    // Extract the month and year from the current month's data
    const { month, year } = currentMonthData;
    const monthName = monthNames[month - 1];  // Convert month number to month name

    // Get the total days in the month
    const daysInMonth = new Date(year, month, 0).getDate();
    const firstDayOfMonth = new Date(year, month - 1, 1).getDay();  // Get the first day of the month starting from Sunday

    // Array for number of days
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Create calendarDays array with correct types
    // @ts-ignore
    const calendarDays: (number | null)[] = Array.from({ length: firstDayOfMonth }, () => null).concat(daysArray);

    // Calculate total number of weeks needed
    const totalWeeks = Math.ceil(calendarDays.length / 7);

    // Calculate totals
    const totalPresent = daysArray.reduce((count, day) => currentMonthData[day] === 1 ? count + 1 : count, 0);
    const totalAbsent = daysArray.reduce((count, day) => currentMonthData[day] === 0 ? count + 1 : count, 0);
    const totalLeaves = daysArray.reduce((count, day) => currentMonthData[day] === -1 ? count + 1 : count, 0);

    // Handle month change
    const handlePageChange = (page: number) => {
        setCurrentMonthIndex(page - 1);
    };

    return (
        <div className="container">
            <h2 className="table-title">Attendance for {monthName} {year}</h2>
            <p>Employee ID: {employeeId}</p>
            <table className="data-table">
                <thead>
                <tr>
                    <th>Sunday</th>
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({ length: totalWeeks }).map((_, weekIndex) => (
                    <tr key={weekIndex}>
                        {calendarDays.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => {
                            const dayOfMonth = day !== null ? day : '';
                            const attendanceStatus = day !== null ? currentMonthData[day] : ' ';
                            return (
                                <td key={dayIndex} style={{ verticalAlign: 'bottom', position: 'relative' }}>
                                    {/*<div>{dayOfMonth}</div>*/}
                                    <div>{attendanceStatus !== undefined ? attendanceStatus : 'N/A'}</div>
                                    {/* Display date at the bottom right */}
                                    <div style={{ position: 'absolute', bottom: '5px', right: '5px', fontSize: '0.8em', color: '#888' }}>
                                        {dayOfMonth}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                ))}
                </tbody>
            </table>

            {/* Pagination Component */}
            <Pagination
                currentPage={currentMonthIndex + 1}
                totalPages={attendanceData.length}
                onPageChange={handlePageChange}
            />

            {/* Display Totals */}
            <div>
                <h3>Attendance Summary</h3>
                <p><strong>Total Present:</strong> {totalPresent}</p>
                <p><strong>Total Absent:</strong> {totalAbsent}</p>
                <p><strong>Total Leaves:</strong> {totalLeaves}</p>
            </div>
        </div>
    );
};

export default AttendanceTable;
