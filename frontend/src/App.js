import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import EmailEditor from './EmailEditor';
import TemplateList from './TemplateList';

function App() {
    return (
        <Router>
            <div>
                <nav className="bg-blue-600 text-white p-4 shadow-lg">
                    <div className="container mx-auto flex gap-4">
                        <Link to="/" className="hover:text-gray-300 font-semibold">Templates</Link>
                        <Link to="/create" className="hover:text-gray-300 font-semibold">Create New</Link>
                    </div>
                </nav>

                <div className="container mx-auto mt-4">
                    <Routes>
                        <Route path="/" element={<TemplateList />} />
                        <Route path="/create" element={<EmailEditor />} />
                    </Routes>
                </div>
            </div>
        </Router>
    );
}

export default App;
