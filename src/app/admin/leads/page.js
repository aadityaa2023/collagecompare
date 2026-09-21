"use client";

import { useState, useEffect } from "react";
import { Trash2, Phone, Calendar, Loader2, Search, Filter, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch("/api/admin/leads", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
    } catch (error) {
      console.error("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await fetch("/api/admin/leads", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      
      if (res.ok) {
        setLeads(leads.map(lead => lead._id === id ? { ...lead, status } : lead));
      }
    } catch (error) {
      console.error("Failed to update status");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this lead?")) return;
    
    try {
      const res = await fetch(`/api/admin/leads?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLeads(leads.filter(lead => lead._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete lead");
    }
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    lead.preferredCourse.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Counselling Leads</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage and respond to student counselling requests.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search leads..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-crimson/20 focus:border-crimson/30 outline-none transition-all"
            />
          </div>
          <Button variant="outline" className="bg-white border-slate-200 text-slate-600 rounded-xl px-3 hover:bg-slate-50">
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-8 w-8 text-crimson animate-spin" />
          </div>
        ) : filteredLeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Users className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-navy">No leads found</p>
            <p className="text-sm mt-1">Try adjusting your search or wait for new submissions.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500 whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Student Profile</th>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Contact Info</th>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Course Interest</th>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeads.map((lead) => (
                  <tr key={lead._id} className="bg-white hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center font-semibold text-navy shrink-0">
                          {lead.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-navy">{lead.name}</div>
                          <div className="text-xs text-slate-400 flex items-center mt-0.5">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(lead.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center text-navy font-medium bg-slate-50 px-3 py-1.5 rounded-lg w-fit">
                        <Phone className="h-3.5 w-3.5 mr-2 text-slate-400" />
                        {lead.phone}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-navy font-medium">{lead.preferredCourse}</div>
                      <div className="text-xs text-slate-500 mt-0.5 flex items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-1.5"></span>
                        {lead.state}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={lead.status || 'New'}
                        onChange={(e) => handleStatusChange(lead._id, e.target.value)}
                        className={`text-xs rounded-full px-3 py-1.5 font-medium border-0 cursor-pointer outline-none focus:ring-2 focus:ring-offset-1 transition-all ${
                          lead.status === 'Contacted' ? 'bg-blue-50 text-blue-700 focus:ring-blue-200' :
                          lead.status === 'Closed' ? 'bg-slate-100 text-slate-600 focus:ring-slate-200' :
                          'bg-emerald-50 text-emerald-700 focus:ring-emerald-200'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button 
                        onClick={() => handleDelete(lead._id)}
                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                        title="Delete Lead"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
