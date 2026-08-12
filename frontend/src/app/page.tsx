"use client";
import { useState } from "react";

export default function LeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company_size: "1-50",
    industry: "technology",
    isUrgent: false,
    primary_goal: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL;
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
    <div className="min-h-screen bg-slate-50 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] flex items-center justify-center p-6 md:p-12 font-sans text-slate-900">
      
      <div className="max-w-3xl w-full bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-800"></div>
        
        <div className="p-8 md:p-12 lg:px-16 lg:py-14">
          <div className="mb-10 border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-light tracking-tight text-slate-900">
              Agentic CRM <span className="font-semibold">Router</span>
            </h1>
            <p className="mt-3 text-slate-500 text-lg">
              Experience real-time AI lead scoring and automated pipeline routing.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-colors"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Work Email</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-colors"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Company Size</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Industry</label>
                <select
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-colors appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%3E%3Cpath%20d%3D%22M7%207l3%203%203-3%22%20stroke%3D%22%2394a3b8%22%20stroke-width%3D%221.5%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E')] bg-[length:20px_20px] bg-[right_1rem_center] bg-no-repeat cursor-pointer"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                >
                  <option value="technology">Technology</option>
                  <option value="finance">Finance</option>
                  <option value="saas">SaaS</option>
                </select>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-emerald-50/50 p-4 rounded-xl border border-emerald-100/80">
              <input
                type="checkbox"
                id="urgent-checkbox"
                checked={formData.isUrgent}
                onChange={(e) => setFormData({ ...formData, isUrgent: e.target.checked })}
                className="w-5 h-5 text-emerald-600 bg-white border-emerald-200 rounded focus:ring-emerald-500 focus:ring-offset-1 cursor-pointer accent-emerald-600"
              />
              <label htmlFor="urgent-checkbox" className="block text-sm font-medium text-emerald-900 cursor-pointer">
                Urgent Request
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Project Details</label>
              <textarea
                required
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-800 focus:bg-white transition-colors resize-none"
                value={formData.primary_goal}
                onChange={(e) => setFormData({ ...formData, primary_goal: e.target.value })}
              />
            </div>

            <div className="pt-4">
              <button 
                type="submit" 
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-4 px-6 rounded-xl shadow-sm transition-all duration-200 ease-in-out text-lg"
              >
                Submit Details
              </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}