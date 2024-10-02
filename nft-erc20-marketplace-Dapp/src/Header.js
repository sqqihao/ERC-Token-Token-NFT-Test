import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import App from './App';
import Admin from './Admin';
import "./headercss.css"

function Header() {

	return (
		<Router>
			<div>
			 <ul>
	            <li>
	              <Link to="/App">index</Link>
	            </li>
	            <li>
	              <Link to="/Admin">Admin</Link>
	            </li>
	          </ul>

	        <Routes>
	          <Route path="/App" element={<App />} />
	          <Route path="/Admin" element={<Admin />} />
	        </Routes>
			</div>
		</Router>
	);
}

export default Header;
