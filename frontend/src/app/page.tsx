"use client";
import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_size: "1-50",
    industry: "technology",
    primary_goal: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL
      console.log("Sending data to:", webhookUrl); 
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Submission successful. The system is processing your request.");
      } else {
        const errorText = await response.text();
        alert(`Server rejected the request. Status: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      alert(`Network Error: ${error.message}. Is n8n running and listening?`);
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-extrabold text-gray-900 mb-6 text-center">
          Project Enquiry
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Name"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Work Email</label>
            <input
              type="email"
              placeholder="name@company.com"
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
                  value={formData.company_size}
                  onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                >
                  <option value="1-50">1-50 Employees</option>
                  <option value="51-200">51-200 Employees</option>
                  <option value="200-500">200-500 Employees</option>
                  <option value="500-1000">500-1000 Employees</option>
                  <option value="1000+">1000+ Employees</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <select
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-gray-700"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="saas">SaaS</option>
                </select>
              </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal or Pain Point</label>
            <textarea
              placeholder="Describe your primary goal or workflow pain point..."
              required
              rows={4}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              value={formData.primary_goal}
              onChange={(e) => setFormData({ ...formData, primary_goal: e.target.value })}
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ease-in-out mt-4"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}