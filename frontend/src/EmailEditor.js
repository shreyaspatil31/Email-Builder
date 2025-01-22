import React, { useState } from "react";
import { uploadEmailConfig, uploadImage } from "./api";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const BASE_URL = "http://localhost:8080";

function EmailPreview({ config }) {
    return (
        <div className="border rounded-lg shadow-lg bg-white h-[600px] mt-4">
            <div className="h-[15%] flex items-center justify-center bg-blue-100">
                {config.imageFileName && (
                    <img 
                        src={`${BASE_URL}/api/images/${config.imageFileName}`}
                        alt="Template Logo"
                        className="w-20 h-20 rounded-full shadow-lg"
                    />
                )}
            </div>

            <div className="h-[10%] p-3 bg-blue-50 border-b text-center">
                <div 
                    className="text-xl font-bold text-blue-800"
                    dangerouslySetInnerHTML={{ __html: config.title }}
                />
            </div>

            <div className="h-[70%] p-4 overflow-y-auto text-gray-700">
                <div 
                    className="prose max-w-none"
                    dangerouslySetInnerHTML={{ __html: config.content }}
                />
            </div>

            <div className="h-[5%] p-2 bg-blue-100 text-gray-600 text-center">
                <div dangerouslySetInnerHTML={{ __html: config.footer }} />
            </div>
        </div>
    );
}

function EmailEditor() {
    const [config, setConfig] = useState({
        title: "",
        content: "",
        footer: "",
        imageFileName: "",
    });

    const handleImageUpload = async (event) => {
        try {
            const file = event.target.files[0];
            if (!file) return;
            
            const imageFileName = await uploadImage(file);
            setConfig({ ...config, imageFileName });
        } catch (error) {
            console.error("Image upload failed:", error);
            alert("Failed to upload image: " + error.message);
        }
    };

    const handleSave = async () => {
        try {
            await uploadEmailConfig(config);
            alert("Template saved successfully!");
        } catch (error) {
            console.error("Failed to save template:", error);
            alert("Failed to save template: " + error.message);
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            ['link', 'clean']
        ]
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h2 className="text-3xl font-bold mb-6 text-blue-800">Email Template Editor</h2>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Upload Logo</h3>
                        <input 
                            type="file" 
                            onChange={handleImageUpload}
                            accept="image/*"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    
                    <div>
                        <h3 className="text-lg font-semibold mb-2">Title</h3>
                        <ReactQuill 
                            value={config.title} 
                            onChange={(value) => setConfig({ ...config, title: value })}
                            modules={modules}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Content</h3>
                        <ReactQuill 
                            value={config.content} 
                            onChange={(value) => setConfig({ ...config, content: value })}
                            modules={modules}
                        />
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-2">Footer</h3>
                        <ReactQuill 
                            value={config.footer} 
                            onChange={(value) => setConfig({ ...config, footer: value })}
                            modules={modules}
                        />
                    </div>

                    <button 
                        onClick={handleSave}
                        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                    >
                        Save Template
                    </button>
                </div>

                <div>
                    <h2 className="text-3xl font-bold mb-6 text-blue-800">Preview</h2>
                    <EmailPreview config={config} />
                </div>
            </div>
        </div>
    );
}

export default EmailEditor;
