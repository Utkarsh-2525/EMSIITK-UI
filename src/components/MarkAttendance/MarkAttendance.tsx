import React, {useContext, useEffect, useState} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router-dom';
import axios from 'axios';
import MapComponent from './MapComponent';
import './MarkAttendance.css';
import ThemeContext from "../../store/themeContext";

const MarkAttendance: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const locationState = useLocation();
    const API_URL = process.env.REACT_APP_API_URL;
    const { theme, toggleTheme } = useContext(ThemeContext);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [address, setAddress] = useState<string>('');
    const [selectedDate, setSelectedDate] = useState<string>(() => {
        const today = new Date().toISOString().split('T')[0];
        return today;
    });
    const navigate = useNavigate();

    const status = new URLSearchParams(locationState.search).get('status');

    useEffect(() => {
        getLocation();
    }, []);

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                    await fetchAddress(latitude, longitude); // Fetch the address when location is obtained
                },
                (error) => {
                    setError('Failed to get location');
                }
            );
        } else {
            setError('Geolocation is not supported by this browser.');
        }
    };

    const fetchAddress = async (latitude: number, longitude: number) => {
        try {
            const response = await axios.get(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );

            if (response.data && response.data.display_name) {
                setAddress(response.data.display_name);
            } else {
                setError('Unable to get address from location');
            }
        } catch (error) {
            setError('Failed to fetch address');
        }
    };

    const HandleMarkAttendance = async () => {
        if (!location) return;

        try {
            const requestBody = {
                id,
                time: new Date().toLocaleTimeString(),
                day: new Date(selectedDate).getDate(),
                month: new Date(selectedDate).getMonth() + 1,
                year: new Date(selectedDate).getFullYear(),
                location: `${address}`,
            };

            const endpoint = status === 'present'
                ? `${API_URL}/Employee/Atdc/PunchIn`
                : `${API_URL}/Employee/Atdc/PunchOut`;

            const response = await axios.post(endpoint, requestBody, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            setSuccessMessage(`Attendance ${status === 'present' ? 'marked as Present' : 'marked as Absent'} successfully!`);
            setErrorMessage('');

            setTimeout(() => {
                navigate('/attendance');
            }, 1000);

        } catch (error) {
            setErrorMessage(`Failed to mark attendance as ${status === 'present' ? 'Present' : 'Absent'}`);
            setSuccessMessage('');
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className={`attendance-card ${theme}`} style={{ padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
            <button onClick={toggleTheme} style={{ background: 'transparent', border: 'none', cursor: 'none' }}> </button>
            <div className="attendance-card-header" style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h2 style={{ color: 'black', marginBottom: '10px' }}>Mark Attendance</h2>
                <div className="employee-id" style={{ padding: '10px',color: 'black', borderRadius: '8px', display: 'inline-block', fontSize: '18px', fontWeight: 'bold' }}>
                    Employee ID: {id}
                </div>
            </div>
            <div className="attendance-card-body">
                <h2 style={{color: 'black', marginBottom: '10px', textAlign: 'center'}}>Address</h2>
                <div className="employee-address" style={{
                    padding: '10px',
                    color: 'black',
                    borderRadius: '8px',
                    display: 'inline-block',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    marginBottom: '15px'
                }}>
                    {address || "Fetching address..."}
                </div>

                <div className="form-group">
                    <label htmlFor="attendance-date" style={{color: 'black'}}>Select Date:</label>
                    <input type="date" id="attendance-date" className="form-control" value={selectedDate}
                           onChange={(e) => setSelectedDate(e.target.value)} style={{color: 'black'}}/>
                </div>

                {location && <MapComponent latitude={location.latitude} longitude={location.longitude}/>}

                <button
                    style={{
                        backgroundColor: status === 'present' ? 'green' : 'red',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        color: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        marginTop: '20px'
                    }}
                    type="button"
                    className="btn-submit"
                    onClick={HandleMarkAttendance}
                    disabled={!location}
                >
                    Mark {status === 'present' ? 'Present' : 'Absent'}
                </button>
                {successMessage && (
                    <div style={{color: 'green', marginTop: '10px'}}>
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div style={{color: 'red', marginTop: '10px'}}>
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendance;