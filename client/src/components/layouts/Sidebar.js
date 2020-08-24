import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar() {
    const closeSidebar = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

    return (

        <aside className="sidebar">
            <h3>Categories</h3>
            <button className="sidebar-close-button" onClick={closeSidebar}>x</button>
            <ul>
                <li><Link to="">Mobile</Link></li>
                <li><Link to="">Laptops</Link></li>
            </ul>
        </aside>

    )
}

export default Sidebar;
