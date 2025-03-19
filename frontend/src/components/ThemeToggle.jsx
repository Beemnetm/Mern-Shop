import React, { useState } from "react";

const ThemeToggle = () => {
    const [darkMode, setDarkMode] = useState(false);

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle("dark-mode");
    };

    return (
        <button className="toggle-btn" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
    );
};

export default ThemeToggle;
