import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const BASE_URL = "http://localhost:8080";

function TemplateDetail() {
    const [template, setTemplate] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTemplate = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/templates/${id}`);
                setTemplate(response.data);
            } catch (error) {
                console.error("Failed to fetch template:", error);
                navigate('/');
            }
        };

        fetchTemplate();
    }, [id, navigate]);

    if (!template) {
        return <div className="p-8 text-center">Loading...</div>;
    }

    return (
        <div className="container mx-auto p-8">
            <button 
                onClick={() => navigate('/')}
                className="mb-6 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
            >
                ← Back to Templates
            </button>

            <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Logo Container */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="h-32 flex items-center justify-center bg-white rounded-lg m-4">
                        {template.imageFileName && (
                            <img 
                                src={`${BASE_URL}/api/images/${template.imageFileName}`}
                                alt="Template Logo"
                                className="max-h-full object-contain rounded-lg"
                            />
                        )}
                    </div>
                </div>
                
                {/* Title Container */}
                <div className="p-6 border-b border-gray-200 bg-white">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div 
                            className="text-2xl font-semibold text-center text-gray-800"
                            dangerouslySetInnerHTML={{ __html: template.title }}
                        />
                    </div>
                </div>
                
                {/* Content Container */}
                <div className="p-6 bg-white">
                    <div className="bg-gray-50 rounded-lg p-4">
                        <div 
                            className="prose max-w-none text-gray-700"
                            dangerouslySetInnerHTML={{ __html: template.content }}
                        />
                    </div>
                </div>
                
                {/* Footer Container */}
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50">
                    <div className="bg-white rounded-lg p-4">
                        <div 
                            className="text-sm text-gray-600 text-center"
                            dangerouslySetInnerHTML={{ __html: template.footer }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default TemplateDetail;