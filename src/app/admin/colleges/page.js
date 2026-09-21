"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Loader2, MapPin, Building2, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CollegesPage() {
  const [colleges, setColleges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Basic form state
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    type: "Private",
    fees: "",
  });

  useEffect(() => {
    fetchColleges();
  }, []);

  const fetchColleges = async () => {
    try {
      const res = await fetch("/api/admin/colleges");
      if (res.ok) {
        const data = await res.json();
        setColleges(data);
      }
    } catch (error) {
      console.error("Failed to fetch colleges");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveCollege = async (e) => {
    e.preventDefault();
    try {
      const isEditing = !!editingId;
      const url = "/api/admin/colleges";
      const method = isEditing ? "PUT" : "POST";
      const body = isEditing ? { ...formData, id: editingId } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      if (res.ok) {
        const savedCollege = await res.json();
        if (isEditing) {
          setColleges(colleges.map(c => c._id === editingId ? savedCollege : c));
        } else {
          setColleges([savedCollege, ...colleges]);
        }
        closeForm();
      }
    } catch (error) {
      console.error("Failed to save college");
    }
  };

  const openEditForm = (college) => {
    setFormData({
      name: college.name,
      location: college.location,
      type: college.type,
      fees: college.fees,
    });
    setEditingId(college._id);
    setShowAddForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ name: "", location: "", type: "Private", fees: "" });
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this college?")) return;
    
    try {
      const res = await fetch(`/api/admin/colleges?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setColleges(colleges.filter(c => c._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete college");
    }
  };

  const filteredColleges = colleges.filter(college => 
    college.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    college.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-navy tracking-tight">Colleges</h1>
          <p className="text-sm text-slate-500 mt-1">
            Manage your database of colleges and universities.
          </p>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search colleges..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-crimson/20 focus:border-crimson/30 outline-none transition-all"
            />
          </div>
          <Button onClick={() => { closeForm(); setShowAddForm(true); }} className="bg-crimson hover:bg-crimson/90 text-white rounded-xl shadow-lg shadow-crimson/20">
            <Plus className="h-4 w-4 mr-2" />
            Add College
          </Button>
        </div>
      </div>

      {showAddForm && (
        <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-8 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-navy">{editingId ? "Edit College" : "Add New College"}</h2>
          </div>
          <form onSubmit={handleSaveCollege} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">College Name</label>
              <input 
                required 
                type="text" 
                className="w-full rounded-xl border border-slate-200 py-2.5 px-4 focus:ring-2 focus:ring-crimson/20 focus:border-crimson outline-none transition-all bg-slate-50 focus:bg-white" 
                placeholder="e.g. Indian Institute of Technology"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Location</label>
              <input 
                required 
                type="text" 
                className="w-full rounded-xl border border-slate-200 py-2.5 px-4 focus:ring-2 focus:ring-crimson/20 focus:border-crimson outline-none transition-all bg-slate-50 focus:bg-white" 
                placeholder="e.g. Mumbai, Maharashtra"
                value={formData.location}
                onChange={e => setFormData({...formData, location: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Institution Type</label>
              <select 
                className="w-full rounded-xl border border-slate-200 py-2.5 px-4 focus:ring-2 focus:ring-crimson/20 focus:border-crimson outline-none transition-all bg-slate-50 focus:bg-white cursor-pointer"
                value={formData.type}
                onChange={e => setFormData({...formData, type: e.target.value})}
              >
                <option value="Private">Private</option>
                <option value="Public">Public</option>
                <option value="Government">Government</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Fees (per year)</label>
              <input 
                required 
                type="text" 
                className="w-full rounded-xl border border-slate-200 py-2.5 px-4 focus:ring-2 focus:ring-crimson/20 focus:border-crimson outline-none transition-all bg-slate-50 focus:bg-white" 
                placeholder="e.g. ₹ 2,00,000"
                value={formData.fees}
                onChange={e => setFormData({...formData, fees: e.target.value})}
              />
            </div>
            <div className="md:col-span-2 flex justify-end gap-3 mt-4 pt-6 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={closeForm} className="rounded-xl border-slate-200">Cancel</Button>
              <Button type="submit" className="bg-navy hover:bg-navy-light text-white rounded-xl shadow-lg shadow-navy/20">
                {editingId ? "Update College" : "Save College"}
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border border-slate-100 overflow-hidden">
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <Loader2 className="h-8 w-8 text-crimson animate-spin" />
          </div>
        ) : filteredColleges.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-slate-500">
            <div className="h-16 w-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
              <Building2 className="h-8 w-8 text-slate-400" />
            </div>
            <p className="text-lg font-medium text-navy">No colleges found</p>
            <p className="text-sm mt-1">Try adjusting your search or add a new college.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-slate-500 whitespace-nowrap">
              <thead className="text-xs text-slate-500 uppercase bg-slate-50/50 border-b border-slate-100">
                <tr>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Institution</th>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Type</th>
                  <th scope="col" className="px-6 py-4 font-semibold tracking-wider">Avg. Fees</th>
                  <th scope="col" className="px-6 py-4 font-semibold text-right tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredColleges.map((college) => (
                  <tr key={college._id} className="bg-white hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-indigo-50 to-blue-50 flex items-center justify-center border border-blue-100/50 shrink-0">
                          <Building2 className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <div className="font-semibold text-navy text-base">{college.name}</div>
                          <div className="text-xs text-slate-500 flex items-center mt-1">
                            <MapPin className="h-3 w-3 mr-1 text-slate-400" />
                            {college.location}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                        college.type === 'Private' ? 'bg-purple-50 text-purple-700 border border-purple-100/50' :
                        college.type === 'Public' ? 'bg-blue-50 text-blue-700 border border-blue-100/50' :
                        'bg-emerald-50 text-emerald-700 border border-emerald-100/50'
                      }`}>
                        {college.type}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-medium text-slate-700">{college.fees}</div>
                      <div className="text-xs text-slate-400">per year approx.</div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditForm(college)}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(college._id)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
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
