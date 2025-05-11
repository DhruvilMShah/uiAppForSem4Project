import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/UserSearch.css"; // Add a CSS file for styling
import { BASE_URL } from "../config.js";

const UserSearch = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (query.length < 3) {
                setSuggestions([]);
                return;
            }
            try {
                const response = await axios.get(`${BASE_URL}/api/users/suggestions?query=${query}`, {
                    headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` }
                    });
                setSuggestions(response.data);
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        const delayDebounce = setTimeout(fetchSuggestions, 300); // Debounce API calls
        return () => clearTimeout(delayDebounce);
    }, [query]);

    // Handle input change
    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    // Navigate to user's achievements when an email is clicked
    const handleSelect = (email) => {
        setQuery(""); // Clear search box
        setSuggestions([]); // Hide suggestions
        navigate(`/achievements/${email}`);
    };

    return (
        <div className="user-search-container">
            <input
                type="text"
                value={query}
                onChange={handleInputChange}
                placeholder="Search by email..."
                className="user-search-input"
            />
            {suggestions.length > 0 && (
                <ul className="user-search-suggestions">
                    {suggestions.map((email, index) => (
                        <li key={index} onClick={() => handleSelect(email)}>
                            {email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default UserSearch;
