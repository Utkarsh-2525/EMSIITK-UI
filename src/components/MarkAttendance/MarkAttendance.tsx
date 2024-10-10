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
        <div className={`attendance-card ${theme}`}>
            <button onClick={toggleTheme} style={{background: 'transparent', border: 'none', cursor: 'none'}}> </button>
            <div className="attendance-card-header">
                <h2 style={{color:'black',marginBottom:'10px'}}>Mark Attendance</h2>
                <h2 style={{color:'black'}}>Employee ID: {id}</h2>
            </div>
            <div className="attendance-card-body">
                <p><strong>Address:</strong> {address || "Fetching address..."}</p>

                <div className="form-group">
                    <label htmlFor="attendance-date" style={{color:'black'}}>Select Date:</label>
                    <input type="date" id="attendance-date" className="form-control" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} style={{color:'black'}}/>
                </div>

                {location && <MapComponent latitude={location.latitude} longitude={location.longitude}/>}

                <button style={{backgroundColor: status === 'present' ? 'green': 'red'}} type="button" className="btn-submit" onClick={HandleMarkAttendance} disabled={!location}>
                    Mark {status === 'present' ? 'Present' : 'Absent'}
                </button>
                {successMessage && (
                    <div style={{ color: 'green' }}>
                        {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div style={{ color: 'red' }}>
                        {errorMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MarkAttendance;