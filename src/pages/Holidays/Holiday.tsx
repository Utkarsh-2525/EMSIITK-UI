// src/components/HolidayTable.tsx
import React, {useContext, useEffect, useState} from 'react';
import './DataTable.css';
import LoadingSpinner from "../../components/UI/loadingSpinner/LoadingSpinner";
import ThemeContext from "../../store/themeContext"; // Ensure this path is correct

const HolidayTable: React.FC = () => {
    // @ts-ignore
    const [holidays, setHolidays] = useState<Holiday[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Adjust the path to where your JSON file or API URL is located
        fetch('https://date.nager.at/Api/v2/PublicHolidays/2024/US')
            .then(response => response.json())
            .then(data => {
                setHolidays(data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error fetching data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <LoadingSpinner/>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className={`container ${theme}`}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}/>
            <table className="holiday-table">
                <caption className="table-title">Holidays</caption>
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Name</th>
                </tr>
                </thead>
                <tbody>
                {holidays.length === 0 ? (
                    <tr>
                        <td colSpan={2} className="no-data">No holidays available</td>
                    </tr>
                ) : (
                    holidays.map((holiday, index) => (
                        <tr key={index}>
                            <td>{holiday.date}</td>
                            <td>{holiday.name}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </div>
    );
};

export default HolidayTable;