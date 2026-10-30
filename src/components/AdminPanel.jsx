import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LogOut, Plus, Trash2, Edit3, Eye, X, Upload, Save,
  Image as ImageIcon, AlertTriangle, CheckCircle, Building2, Home,
  Factory, LayoutDashboard, Settings, FolderOpen, TrendingUp,
  ChevronDown, RefreshCw, ZoomIn, MapPin, Zap, Leaf
} from 'lucide-react';

const ADMIN_PASSWORD = 'kathir@123';
const STORAGE_KEY = 'solar_admin_projects';

const CATEGORY_OPTIONS = [
  { value: 'residential', label: 'Residential', Icon: Home, color: '#239B35' },
  { value: 'commercial', label: 'Commercial', Icon: Building2, color: '#0866C6' },
  { value: 'industrial', label: 'Industrial', Icon: Factory, color: '#E85D04' },
];

const EMPTY_FORM = {
  title: '',
  description: '',
  location: '',
  category: 'residential',
  capacity: '',
  annualSavings: '',
  panels: '',
  co2Offset: '',
  completionDate: '',
  imageBase64: '',
  imageFile: null,
};

const LIMITS = {
  title: 60,
  description: 150,
  location: 50,
  capacity: 20,
  annualSavings: 30,
  panels: 60,
  co2Offset: 30,
  completionDate: 30,
};

function CharCounter({ value, max }) {
  const pct = value.length / max;
  const color = pct > 0.9 ? 'text-red-500' : pct > 0.7 ? 'text-amber-500' : 'text-slate-400';
  return (
    <span className={`text-[10px] font-bold ml-auto ${color}`}>
      {value.length}/{max}
    </span>
  );
}

function Field({ label, name, value, onChange, type = 'text', rows, required, placeholder, hint }) {
  const max = LIMITS[name];
  const handleChange = (e) => {
    if (max && e.target.value.length > max) return;
    onChange(name, e.target.value);
  };
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <label className="text-xs font-black text-[#071B49] uppercase tracking-wider">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {max && <CharCounter value={value} max={max} />}
      </div>
      {hint && <p className="text-[10px] text-slate-400 font-medium -mt-0.5">{hint}</p>}
      {rows ? (
        <textarea
          rows={rows}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#239B35] focus:ring-2 focus:ring-[#239B35]/20 outline-none text-sm font-semibold text-[#071B49] bg-white resize-none transition-all placeholder:text-slate-300"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className="w-full px-3 py-2.5 rounded-xl border-2 border-slate-200 focus:border-[#239B35] focus:ring-2 focus:ring-[#239B35]/20 outline-none text-sm font-semibold text-[#071B49] bg-white transition-all placeholder:text-slate-300"
        />
      )}
    </div>
  );
}

export function getAdminProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveAdminProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

export default function AdminPanel({ isOpen, onClose }) {
  /* ── Auth ── */
  const [authed, setAuthed] = useState(false);
  const [pwInput, setPwInput] = useState('');
  const [pwError, setPwError] = useState('');
  const [showPw, setShowPw] = useState(false);

  /* ── Projects ── */
  const [projects, setProjects] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [showForm, setShowForm] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);
  const [toast, setToast] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [tab, setTab] = useState('projects'); // 'projects' | 'add'
  const fileRef = useRef(null);

  /* load from storage */
  useEffect(() => {
    if (authed) setProjects(getAdminProjects());
  }, [authed]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4500);
  };

  /* ── Login ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('Incorrect password. Try again.');
    }
  };

  /* ── Image Upload → base64 ── */
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      showToast('Image must be under 5 MB.', 'error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setForm((f) => ({ ...f, imageBase64: ev.target.result }));
      setPreviewImg(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  /* ── Form Field ── */
  const handleField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  /* ── Save Project ── */
  const handleSave = () => {
    // Gather missing fields
    const missing = [];
    if (!form.title.trim()) missing.push('Project Title');
    if (!form.description.trim()) missing.push('Description');
    if (!form.location.trim()) missing.push('Location');
    if (!form.capacity.trim()) missing.push('System Capacity');
    if (!form.annualSavings.trim()) missing.push('Annual Savings');
    if (!form.imageBase64 && !editId) missing.push('Project Image');

    if (missing.length > 0) {
      showToast(`Missing: ${missing.join(', ')}`, 'error');
      return;
    }
    const catInfo = CATEGORY_OPTIONS.find((c) => c.value === form.category);
    let updated;
    if (editId) {
      updated = projects.map((p) =>
        p.id === editId
          ? {
            ...p,
            ...form,
            categoryLabel: catInfo?.label ?? form.category,
            image: form.imageBase64 || p.image,
          }
          : p
      );
      showToast('Project updated successfully!');
    } else {
      const newProj = {
        ...form,
        id: `admin_${Date.now()}`,
        categoryLabel: catInfo?.label ?? form.category,
        image: form.imageBase64,
        alt: form.title,
        isAdmin: true,
      };
      updated = [...projects, newProj];
      showToast('Project added successfully!');
    }
    saveAdminProjects(updated);
    setProjects(updated);
    resetForm();
    setTab('projects');
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    saveAdminProjects(updated);
    setProjects(updated);
    setConfirmDelete(null);
    showToast('Project deleted.');
  };

  /* ── Edit ── */
  const handleEdit = (proj) => {
    setForm({
      title: proj.title,
      description: proj.description,
      location: proj.location,
      category: proj.category,
      capacity: proj.capacity,
      annualSavings: proj.annualSavings,
      panels: proj.panels || '',
      co2Offset: proj.co2Offset || '',
      completionDate: proj.completionDate || '',
      imageBase64: proj.image || '',
    });
    setPreviewImg(proj.image || null);
    setEditId(proj.id);
    setTab('add');
  };

  const resetForm = () => {
    setForm(EMPTY_FORM);
    setPreviewImg(null);
    setEditId(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[999] flex items-start justify-center p-0 sm:p-4 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={authed ? undefined : onClose}
            className="fixed inset-0 bg-[#071B49]/80 backdrop-blur-md"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 30 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-5xl bg-[#F0F4FF] rounded-none sm:rounded-3xl shadow-2xl border-0 sm:border-2 sm:border-white/60 min-h-screen sm:min-h-0 my-0 sm:my-6 overflow-hidden"
          >
            {/* ── Toast — fixed so always visible even when scrolled ── */}
            <AnimatePresence>
              {toast && (
                <motion.div
                  initial={{ opacity: 0, y: -40, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -40, scale: 0.95 }}
                  className={`fixed top-5 left-1/2 -translate-x-1/2 z-[1100] flex items-center gap-2.5 px-5 py-3.5 rounded-2xl shadow-2xl text-sm font-black text-white border-2 border-white/30 ${toast.type === 'error' ? 'bg-red-500' : 'bg-[#239B35]'}`}
                  style={{ minWidth: '240px', maxWidth: '90vw' }}
                >
                  {toast.type === 'error'
                    ? <AlertTriangle className="w-5 h-5 shrink-0" />
                    : <CheckCircle className="w-5 h-5 shrink-0" />}
                  <span className="flex-1 text-center">{toast.msg}</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ══════════════════════════ LOGIN ══════════════════════════ */}
            {!authed ? (
              <div className="flex flex-col items-center justify-center min-h-[500px] p-8">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 transition-colors shadow"
                >
                  <X className="w-5 h-5" />
                </button>

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-center mb-8"
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-[#0866C6] to-[#239B35] rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-2xl rotate-6">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-black text-[#071B49] mb-1">Admin Panel</h2>
                  <p className="text-slate-500 font-semibold">Solar Arise Project Management</p>
                </motion.div>

                <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={pwInput}
                      onChange={(e) => setPwInput(e.target.value)}
                      placeholder="Enter admin password"
                      className="w-full px-4 py-4 pr-12 rounded-2xl border-2 border-slate-200 focus:border-[#0866C6] focus:ring-4 focus:ring-[#0866C6]/20 outline-none text-base font-bold text-[#071B49] bg-white shadow-sm transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((v) => !v)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                  {pwError && (
                    <p className="text-red-500 font-bold text-sm flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4" />{pwError}
                    </p>
                  )}
                  <button
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-base rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Login to Admin Panel
                  </button>
                </form>
              </div>
            ) : (
              /* ══════════════════════════ DASHBOARD ══════════════════════════ */
              <div className="flex flex-col min-h-screen sm:min-h-[700px]">

                {/* Header */}
                <div className="bg-gradient-to-r from-[#071B49] via-[#0866C6] to-[#239B35] px-6 py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                      <LayoutDashboard className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h1 className="text-white font-black text-lg leading-none">Solar Arise Admin</h1>
                      <p className="text-white/70 text-xs font-semibold mt-0.5">Project Management Dashboard</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="hidden sm:flex items-center gap-1.5 text-xs font-black text-white/80 bg-white/10 px-3 py-1.5 rounded-full">
                      <div className="w-2 h-2 rounded-full bg-[#70D943] animate-pulse" />
                      Logged in as Admin
                    </span>
                    <button
                      onClick={() => { setAuthed(false); setPwInput(''); onClose(); }}
                      className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-bold transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="hidden sm:inline">Logout</span>
                    </button>
                    <button
                      onClick={onClose}
                      className="p-2 rounded-full bg-white/15 hover:bg-red-500 text-white transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Tab Bar */}
                <div className="bg-white border-b-2 border-slate-100 px-6 flex items-center gap-1">
                  {[
                    { id: 'projects', label: `Projects (${projects.length})`, Icon: FolderOpen },
                    { id: 'add', label: editId ? 'Edit Project' : 'Add Project', Icon: Plus },
                  ].map(({ id, label, Icon }) => (
                    <button
                      key={id}
                      onClick={() => { setTab(id); if (id === 'projects') resetForm(); }}
                      className={`flex items-center gap-2 px-4 py-3.5 text-sm font-black border-b-2 transition-colors ${
                        tab === id
                          ? 'border-[#0866C6] text-[#0866C6]'
                          : 'border-transparent text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {label}
                    </button>
                  ))}
                </div>

                {/* Body */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">

                  {/* ─── PROJECTS TAB ─── */}
                  {tab === 'projects' && (
                    <div className="space-y-4">
                      {/* Action row */}
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-black text-[#071B49]">Admin Added Projects</h2>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            {projects.length} project{projects.length !== 1 ? 's' : ''} added via admin
                          </p>
                        </div>
                        <button
                          onClick={() => { resetForm(); setTab('add'); }}
                          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-sm shadow-md hover:shadow-lg hover:scale-105 active:scale-95 transition-all"
                        >
                          <Plus className="w-4 h-4" />
                          Add New Project
                        </button>
                      </div>

                      {projects.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                          <FolderOpen className="w-14 h-14 text-slate-300 mx-auto mb-3" />
                          <p className="text-slate-500 font-black text-lg">No projects added yet</p>
                          <p className="text-slate-400 font-semibold text-sm mt-1">Click "Add New Project" to get started</p>
                          <button
                            onClick={() => { resetForm(); setTab('add'); }}
                            className="mt-5 px-5 py-2.5 rounded-2xl bg-[#0866C6] text-white font-bold text-sm inline-flex items-center gap-2"
                          >
                            <Plus className="w-4 h-4" /> Add Project
                          </button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {projects.map((proj) => {
                            const cat = CATEGORY_OPTIONS.find((c) => c.value === proj.category);
                            return (
                              <motion.div
                                key={proj.id}
                                layout
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
                              >
                                {/* image */}
                                <div className="relative h-44 bg-slate-100">
                                  {proj.image ? (
                                    <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-slate-100">
                                      <ImageIcon className="w-12 h-12 text-slate-300" />
                                    </div>
                                  )}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none" />
                                  <div className="absolute top-3 left-3 flex gap-2">
                                    <span
                                      className="px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase"
                                      style={{ backgroundColor: cat?.color ?? '#555' }}
                                    >
                                      {proj.categoryLabel}
                                    </span>
                                    <span className="px-2.5 py-1 rounded-full bg-[#071B49]/80 text-white text-[10px] font-black">
                                      {proj.capacity}
                                    </span>
                                  </div>
                                  {/* Action overlay */}
                                  <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                      onClick={() => handleEdit(proj)}
                                      className="p-2 rounded-full bg-white shadow text-[#0866C6] hover:bg-[#0866C6] hover:text-white transition-colors"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                      onClick={() => setConfirmDelete(proj.id)}
                                      className="p-2 rounded-full bg-white shadow text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[10px] font-bold">
                                    <MapPin className="w-3 h-3" />{proj.location}
                                  </div>
                                </div>

                                {/* body */}
                                <div className="p-4">
                                  <h3 className="font-black text-[#071B49] text-base leading-snug mb-1">{proj.title}</h3>
                                  <p className="text-xs text-slate-600 font-semibold line-clamp-2 mb-3">{proj.description}</p>
                                  <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-100 mb-3">
                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Annual Savings</span>
                                    <span className="text-sm font-black text-[#239B35]">{proj.annualSavings}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => handleEdit(proj)}
                                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-[#0866C6]/10 text-[#0866C6] font-bold text-xs hover:bg-[#0866C6] hover:text-white transition-colors"
                                    >
                                      <Edit3 className="w-3.5 h-3.5" />Edit
                                    </button>
                                    <button
                                      onClick={() => setConfirmDelete(proj.id)}
                                      className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-red-50 text-red-500 font-bold text-xs hover:bg-red-500 hover:text-white transition-colors"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />Delete
                                    </button>
                                  </div>
                                </div>
                              </motion.div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  )}

                  {/* ─── ADD / EDIT TAB ─── */}
                  {tab === 'add' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h2 className="text-xl font-black text-[#071B49]">
                            {editId ? '✏️ Edit Project' : '➕ Add New Project'}
                          </h2>
                          <p className="text-xs text-slate-500 font-semibold mt-0.5">
                            All starred fields are required. Projects appear on the main website.
                          </p>
                        </div>
                        {editId && (
                          <button onClick={resetForm} className="text-xs font-bold text-slate-500 hover:text-red-500 flex items-center gap-1">
                            <RefreshCw className="w-3.5 h-3.5" />Reset
                          </button>
                        )}
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* LEFT COL */}
                        <div className="space-y-4">

                          {/* Image Upload */}
                          <div>
                            <label className="text-xs font-black text-[#071B49] uppercase tracking-wider block mb-1">
                              Project Image<span className="text-red-500 ml-0.5">*</span>
                              <span className="ml-2 text-[10px] font-semibold text-slate-400 normal-case">Max 5 MB · JPG / PNG / WEBP</span>
                            </label>
                            <div
                              onClick={() => fileRef.current?.click()}
                              className={`relative border-2 border-dashed rounded-2xl overflow-hidden cursor-pointer transition-all hover:border-[#0866C6] hover:bg-blue-50/30 ${
                                previewImg ? 'border-[#239B35]' : 'border-slate-300 bg-slate-50'
                              }`}
                              style={{ height: '200px' }}
                            >
                              {previewImg ? (
                                <>
                                  <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
                                  <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <div className="bg-white/90 rounded-xl px-3 py-2 flex items-center gap-2 text-sm font-bold text-[#071B49]">
                                      <Upload className="w-4 h-4" />Change Image
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                                  <div className="w-14 h-14 rounded-2xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center">
                                    <Upload className="w-7 h-7" />
                                  </div>
                                  <div className="text-center">
                                    <p className="font-black text-sm text-slate-600">Click to Upload Project Image</p>
                                    <p className="text-xs text-slate-400 font-semibold mt-0.5">Best: 800×600 px landscape</p>
                                  </div>
                                </div>
                              )}
                              <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </div>
                          </div>

                          {/* Category */}
                          <div>
                            <label className="text-xs font-black text-[#071B49] uppercase tracking-wider block mb-1.5">
                              Category<span className="text-red-500 ml-0.5">*</span>
                            </label>
                            <div className="flex gap-2">
                              {CATEGORY_OPTIONS.map(({ value, label, Icon, color }) => (
                                <button
                                  key={value}
                                  type="button"
                                  onClick={() => handleField('category', value)}
                                  className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 text-xs font-black transition-all ${
                                    form.category === value
                                      ? 'text-white border-transparent shadow-md'
                                      : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                  }`}
                                  style={form.category === value ? { backgroundColor: color, borderColor: color } : {}}
                                >
                                  <Icon className="w-5 h-5" />
                                  {label}
                                </button>
                              ))}
                            </div>
                          </div>

                          {/* Title */}
                          <Field
                            label="Project Title"
                            name="title"
                            value={form.title}
                            onChange={handleField}
                            required
                            placeholder="e.g., Residential Rooftop Solar"
                          />

                          {/* Description */}
                          <Field
                            label="Description"
                            name="description"
                            value={form.description}
                            onChange={handleField}
                            rows={3}
                            required
                            placeholder="Brief project description (max 150 chars)"
                          />

                          {/* Location */}
                          <Field
                            label="Location"
                            name="location"
                            value={form.location}
                            onChange={handleField}
                            required
                            placeholder="e.g., Coimbatore, Tamil Nadu"
                          />
                        </div>

                        {/* RIGHT COL */}
                        <div className="space-y-4">

                          {/* Capacity */}
                          <Field
                            label="System Capacity"
                            name="capacity"
                            value={form.capacity}
                            onChange={handleField}
                            required
                            placeholder="e.g., 5 kW or 100 kW or 1 MW"
                          />

                          {/* Annual Savings */}
                          <Field
                            label="Annual Savings"
                            name="annualSavings"
                            value={form.annualSavings}
                            onChange={handleField}
                            required
                            placeholder="e.g., ₹72,000 / year"
                          />

                          {/* Panels */}
                          <Field
                            label="Panel Technology"
                            name="panels"
                            value={form.panels}
                            onChange={handleField}
                            placeholder="e.g., Mono PERC Bifacial (550W)"
                            hint="Describe the solar panel technology used"
                          />

                          {/* CO2 Offset */}
                          <Field
                            label="CO₂ Offset"
                            name="co2Offset"
                            value={form.co2Offset}
                            onChange={handleField}
                            placeholder="e.g., 6.2 Tons / Year"
                          />

                          {/* Completion Date */}
                          <Field
                            label="Completion Date"
                            name="completionDate"
                            value={form.completionDate}
                            onChange={handleField}
                            placeholder="e.g., March 2026"
                          />

                          {/* Live Preview */}
                          {(form.title || form.annualSavings) && (
                            <div className="bg-gradient-to-br from-[#071B49] to-[#0866C6] rounded-2xl p-4 text-white">
                              <p className="text-[10px] uppercase font-black tracking-wider text-white/60 mb-2">Live Card Preview</p>
                              <div className="bg-white/10 rounded-xl p-3 space-y-2">
                                {previewImg && (
                                  <img src={previewImg} alt="preview" className="w-full h-24 object-cover rounded-lg" />
                                )}
                                <p className="font-black text-sm">{form.title || 'Project Title'}</p>
                                <p className="text-[11px] text-white/70 font-medium line-clamp-2">
                                  {form.description || 'Project description will appear here...'}
                                </p>
                                {form.annualSavings && (
                                  <div className="flex items-center justify-between bg-white/10 rounded-lg px-2.5 py-1.5">
                                    <span className="text-[10px] text-white/60 font-bold">Annual Savings</span>
                                    <span className="text-sm font-black text-[#70D943]">{form.annualSavings}</span>
                                  </div>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Save Button */}
                      <div className="flex flex-col gap-3 pt-2 border-t-2 border-slate-100">
                        {/* Inline validation hint */}
                        {(() => {
                          const missing = [];
                          if (!form.title.trim()) missing.push('Title');
                          if (!form.description.trim()) missing.push('Description');
                          if (!form.location.trim()) missing.push('Location');
                          if (!form.capacity.trim()) missing.push('Capacity');
                          if (!form.annualSavings.trim()) missing.push('Annual Savings');
                          if (!form.imageBase64 && !editId) missing.push('Image');
                          return missing.length > 0 ? (
                            <div className="flex items-start gap-2 px-4 py-3 rounded-xl bg-amber-50 border-2 border-amber-200 text-amber-700">
                              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                              <div>
                                <p className="text-xs font-black">Required fields missing:</p>
                                <p className="text-xs font-semibold mt-0.5">{missing.join(' · ')}</p>
                              </div>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-green-50 border-2 border-green-200 text-green-700">
                              <CheckCircle className="w-4 h-4 shrink-0" />
                              <p className="text-xs font-black">All required fields filled — ready to publish!</p>
                            </div>
                          );
                        })()}
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={handleSave}
                            className="flex-1 sm:flex-initial py-3.5 px-8 rounded-2xl bg-gradient-to-r from-[#239B35] to-[#0866C6] text-white font-black text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                          >
                            <Save className="w-5 h-5" />
                            {editId ? 'Update Project' : 'Publish Project'}
                          </button>
                          <button
                            type="button"
                            onClick={() => { resetForm(); setTab('projects'); }}
                            className="px-5 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm transition-colors"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            )}
          </motion.div>

          {/* Delete Confirm Modal */}
          <AnimatePresence>
            {confirmDelete && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 z-[1000] flex items-center justify-center p-6"
              >
                <div
                  className="fixed inset-0 bg-black/60 backdrop-blur-sm"
                  onClick={() => setConfirmDelete(null)}
                />
                <div className="relative z-10 bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-slate-100 text-center">
                  <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#071B49] mb-2">Delete Project?</h3>
                  <p className="text-slate-500 font-semibold text-sm mb-6">
                    This project will be permanently removed from the website. This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(confirmDelete)}
                      className="flex-1 py-3 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </AnimatePresence>
  );
}

