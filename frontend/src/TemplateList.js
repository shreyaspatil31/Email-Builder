import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const BASE_URL = "http://localhost:8080";

function TemplateList() {
    const [templates, setTemplates] = useState([]);

    const fetchTemplates = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/templates`);
            setTemplates(response.data);
        } catch (error) {
            console.error("Failed to fetch templates:", error);
        }
    };

    const handleDownloadImage = async (id) => {
        const element = document.getElementById(`template-${id}`);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                useCORS: true, // Enable CORS for external images
                allowTaint: false, // Prevent tainting the canvas
            });
            const link = document.createElement('a');
            link.download = `template-${id}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();
        } catch (error) {
            console.error("Failed to download as image:", error);
        }
    };

    const handleDownloadPDF = async (id) => {
        const element = document.getElementById(`template-${id}`);
        if (!element) return;

        try {
            const canvas = await html2canvas(element, {
                useCORS: true, // Enable CORS for external images
                allowTaint: false, // Prevent tainting the canvas
            });
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`template-${id}.pdf`);
        } catch (error) {
            console.error("Failed to download as PDF:", error);
        }
    };

    useEffect(() => {
        fetchTemplates();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Email Templates</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map(template => (
                    <div 
                        key={template.id} 
                        id={`template-${template.id}`}
                        className="flex flex-col border rounded-xl shadow-lg bg-gradient-to-br from-gray-50 via-white to-blue-50 hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 h-[650px]"
                    >
                        {/* Avatar Container - 20% */}
                        <div className="h-[20%] flex items-center justify-center bg-blue-100 m-2 rounded-full p-1">
                            {template.imageFileName && (
                                <img 
                                    src={`${BASE_URL}/api/images/${template.imageFileName}`}
                                    alt="Template Logo"
                                    className="w-24 h-24 rounded-full object-cover shadow-lg"
                                    crossOrigin="anonymous" // Allow cross-origin access
                                />
                            )}
                        </div>

                        {/* Title Container - 15% */}
                        <div className="h-[15%] p-4 bg-blue-100 text-center border-b m-2 rounded-full">
                            <h2 className="text-xl font-bold text-blue-800">
                                <div dangerouslySetInnerHTML={{ __html: template.title }} />
                            </h2>
                        </div>

                        {/* Content Container - 55% */}
                        <div className="h-[55%] p-4 overflow-y-auto  bg-blue-100 text-gray-700 m-2 rounded-xl">
                            <div 
                                className="prose max-w-none"
                                dangerouslySetInnerHTML={{ __html: template.content }}
                            />
                        </div>

                        {/* Footer Container - 10% */}
                        <div className="h-[10%] p-2 bg-blue-100 text-center text-gray-600 m-2 rounded-full">
                            <div dangerouslySetInnerHTML={{ __html: template.footer }} />
                        </div>

                        {/* Download Buttons */}
                        <div className="flex justify-center gap-4 p-4 bg-gray-200 m-2 rounded-full">
                            <button 
                                onClick={() => handleDownloadImage(template.id)} 
                                className="bg-blue-500 text-white py-2 px-4 rounded-xl hover:bg-blue-600"
                            >
                                Download as Image
                            </button>
                            <button 
                                onClick={() => handleDownloadPDF(template.id)} 
                                className="bg-green-500 text-white py-2 px-4 rounded-xl hover:bg-green-600"
                            >
                                Download as PDF
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TemplateList;
