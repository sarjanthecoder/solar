import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LogOut, Plus, Trash2, Edit3, Eye, EyeOff, X, Upload, Save,
  Image as ImageIcon, AlertTriangle, CheckCircle, Building2, Home,
  Factory, LayoutDashboard, FolderOpen, MapPin, Zap, Leaf,
  RefreshCw, ArrowLeft, Sun, Shield, Star, ChevronRight
} from 'lucide-react';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ADMIN_PASSWORD = 'kathir@123';
const STORAGE_KEY = 'solar_admin_projects';

const CATEGORY_OPTIONS = [
  { value: 'residential', label: 'Residential', Icon: Home,      color: '#239B35', bg: '#EAF8EE' },
  { value: 'commercial',  label: 'Commercial',  Icon: Building2,  color: '#0866C6', bg: '#EBF2FF' },
  { value: 'industrial',  label: 'Industrial',  Icon: Factory,    color: '#E85D04', bg: '#FFF0E8' },
];

const EMPTY_FORM = {
  title: '', description: '', location: '', category: 'residential',
  capacity: '', annualSavings: '', panels: '', co2Offset: '',
  completionDate: '', imageBase64: '',
};

const LIMITS = {
  title: 60, description: 150, location: 50,
  capacity: 20, annualSavings: 30, panels: 60,
  co2Offset: 30, completionDate: 30,
};

/* ─────────────────────────────────────────────
   HELPERS
───────────────────────────────────────────── */
export function getAdminProjects() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveAdminProjects(projects) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
}

/* ─────────────────────────────────────────────
   SUB-COMPONENTS
───────────────────────────────────────────── */
function CharCounter({ value = '', max }) {
  const pct = value.length / max;
  const color = pct > 0.9 ? 'text-red-500' : pct > 0.7 ? 'text-amber-500' : 'text-slate-400';
  return <span className={`text-[10px] font-black ml-auto ${color}`}>{value.length}/{max}</span>;
}

function Field({ label, name, value = '', onChange, type = 'text', rows, required, placeholder }) {
  const max = LIMITS[name];
  const handleChange = (e) => {
    if (max && e.target.value.length > max) return;
    onChange(name, e.target.value);
  };
  const inputClass = "w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#0866C6] focus:ring-4 focus:ring-[#0866C6]/10 outline-none text-sm font-semibold text-[#071B49] bg-white transition-all placeholder:text-slate-300 resize-none";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <label className="text-[11px] font-black text-[#071B49] uppercase tracking-wider">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {max && <CharCounter value={value} max={max} />}
      </div>
      {rows
        ? <textarea rows={rows} value={value} onChange={handleChange} placeholder={placeholder} className={inputClass} />
        : <input type={type} value={value} onChange={handleChange} placeholder={placeholder} className={inputClass} />
      }
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST (always fixed, centered top)
───────────────────────────────────────────── */
function Toast({ toast }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key="toast"
          initial={{ opacity: 0, y: -50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -50, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-black text-white border-2 border-white/20 backdrop-blur-xl ${toast.type === 'error' ? 'bg-red-500' : 'bg-[#239B35]'}`}
          style={{ minWidth: '260px', maxWidth: '90vw' }}
        >
          {toast.type === 'error'
            ? <AlertTriangle className="w-5 h-5 shrink-0" />
            : <CheckCircle className="w-5 h-5 shrink-0" />}
          <span className="flex-1 text-center">{toast.msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   MAIN ADMIN PANEL
───────────────────────────────────────────── */
export default function AdminPanel({ isOpen, onClose }) {
  const [authed, setAuthed]               = useState(false);
  const [pwInput, setPwInput]             = useState('');
  const [pwError, setPwError]             = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [projects, setProjects]           = useState([]);
  const [editId, setEditId]               = useState(null);
  const [form, setForm]                   = useState(EMPTY_FORM);
  const [previewImg, setPreviewImg]       = useState(null);
  const [toast, setToast]                 = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [tab, setTab]                     = useState('projects');
  const fileRef                           = useRef(null);

  /* Load projects after login */
  useEffect(() => {
    if (authed) setProjects(getAdminProjects());
  }, [authed]);

  /* Prevent background scroll */
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* ── Login ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
      setPwInput('');
    } else {
      setPwError('Incorrect password. Please try again.');
      setPwInput('');
    }
  };

  /* ── Logout & back to site ── */
  const handleLogout = () => {
    setAuthed(false);
    setPwInput('');
    onClose();
  };

  /* ── Back to Main Site (refresh) ── */
  const handleBackToSite = () => {
    setAuthed(false);
    setPwInput('');
    onClose();
    window.location.reload();
  };

  /* ── Image Upload ── */
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

  /* ── Field handler ── */
  const handleField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  /* ── Validate ── */
  const getMissingFields = () => {
    const m = [];
    if (!form.title.trim())        m.push('Title');
    if (!form.description.trim())  m.push('Description');
    if (!form.location.trim())     m.push('Location');
    if (!form.capacity.trim())     m.push('Capacity');
    if (!form.annualSavings.trim()) m.push('Annual Savings');
    if (!form.imageBase64 && !editId) m.push('Project Image');
    return m;
  };

  /* ── Save ── */
  const handleSave = () => {
    const missing = getMissingFields();
    if (missing.length > 0) {
      showToast(`Missing: ${missing.join(', ')}`, 'error');
      return;
    }
    const catInfo = CATEGORY_OPTIONS.find((c) => c.value === form.category);
    let updated;
    if (editId) {
      updated = projects.map((p) =>
        p.id === editId
          ? { ...p, ...form, categoryLabel: catInfo?.label ?? form.category, image: form.imageBase64 || p.image }
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
      showToast('Project published to website!');
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
    showToast('Project removed from website.');
  };

  /* ── Edit ── */
  const handleEdit = (proj) => {
    setForm({
      title: proj.title, description: proj.description, location: proj.location,
      category: proj.category, capacity: proj.capacity, annualSavings: proj.annualSavings,
      panels: proj.panels || '', co2Offset: proj.co2Offset || '',
      completionDate: proj.completionDate || '', imageBase64: proj.image || '',
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

  const missing = getMissingFields();
  const isReady = missing.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex flex-col bg-[#0A0F2E] overflow-hidden"
        >
          <Toast toast={toast} />

          {/* ══════════════════════════════════════════
              LOGIN SCREEN
          ══════════════════════════════════════════ */}
          {!authed ? (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 relative overflow-hidden">
              {/* Animated background grid */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(8,102,198,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(8,102,198,0.08) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />
              {/* Glowing orbs */}
              <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#0866C6]/20 blur-3xl pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#239B35]/20 blur-3xl pointer-events-none" />

              {/* Close button top-right */}
              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
              >
                {/* Logo badge */}
                <div className="flex flex-col items-center mb-10">
                  <div className="relative mb-6">
                    <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#0866C6] via-[#0A4FA8] to-[#239B35] flex items-center justify-center shadow-2xl shadow-[#0866C6]/40 rotate-3">
                      <Sun className="w-12 h-12 text-white" />
                    </div>
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#239B35] rounded-xl flex items-center justify-center shadow-lg">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-black text-white tracking-tight">Admin Panel</h1>
                  <p className="text-white/50 font-semibold text-sm mt-1.5">Solar Arise • Project Management</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 shadow-2xl">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="text-xs font-black text-white/60 uppercase tracking-widest block mb-2">Admin Password</label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-white/30" style={{ width: '18px', height: '18px' }} />
                        <input
                          type={showPw ? 'text' : 'password'}
                          value={pwInput}
                          onChange={(e) => { setPwInput(e.target.value); setPwError(''); }}
                          placeholder="Enter password..."
                          autoComplete="current-password"
                          className="w-full bg-white/8 border-2 border-white/10 focus:border-[#0866C6] focus:ring-4 focus:ring-[#0866C6]/20 rounded-2xl pl-12 pr-12 py-4 text-white font-bold text-base outline-none placeholder:text-white/20 transition-all"
                          style={{ background: 'rgba(255,255,255,0.05)' }}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                        >
                          {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {pwError && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-500/20 border border-red-500/40 rounded-xl text-red-300 text-sm font-bold"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {pwError}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-base shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Access Admin Panel
                    </button>
                  </form>

                  <div className="flex items-center gap-3 mt-6 pt-5 border-t border-white/10">
                    <div className="flex gap-1.5 items-center">
                      {[1,2,3].map(i => <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />)}
                    </div>
                    <p className="text-white/30 text-xs font-semibold">Authorized personnel only</p>
                  </div>
                </div>
              </motion.div>
            </div>

          ) : (
            /* ══════════════════════════════════════════
                DASHBOARD
            ══════════════════════════════════════════ */
            <div className="flex flex-col h-full">

              {/* ── TOP HEADER BAR ── */}
              <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-[#0866C6] via-[#071B49] to-[#239B35] border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                    <Sun className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h1 className="text-white font-black text-sm sm:text-base leading-none">Solar Arise Admin</h1>
                    <p className="text-white/60 text-[10px] sm:text-xs font-semibold mt-0.5 hidden xs:block">Project Management</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Logged in badge */}
                  <span className="hidden md:flex items-center gap-1.5 text-xs font-black text-white/80 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10">
                    <span className="w-2 h-2 rounded-full bg-[#70D943] animate-pulse" />
                    Admin
                  </span>

                  {/* Back to Main Site */}
                  <button
                    onClick={handleBackToSite}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-black transition-all border border-white/10"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Main Site</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-500/80 hover:bg-red-500 text-white text-xs font-black transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* ── TAB BAR ── */}
              <div className="shrink-0 flex items-center gap-1 px-4 sm:px-6 bg-[#0D1535] border-b border-white/10">
                {[
                  { id: 'projects', label: `Projects (${projects.length})`, Icon: FolderOpen },
                  { id: 'add',      label: editId ? 'Edit Project' : '+ Add Project', Icon: Plus },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setTab(id); if (id === 'projects') resetForm(); }}
                    className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-black border-b-2 transition-all whitespace-nowrap ${
                      tab === id
                        ? 'border-[#0866C6] text-white bg-[#0866C6]/10'
                        : 'border-transparent text-white/40 hover:text-white/70'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── BODY (scrollable) ── */}
              <div className="flex-1 overflow-y-auto bg-[#0A0F2E]">

                {/* ══════ PROJECTS TAB ══════ */}
                {tab === 'projects' && (
                  <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">Admin Projects</h2>
                        <p className="text-white/40 text-xs sm:text-sm font-semibold mt-0.5">
                          {projects.length} project{projects.length !== 1 ? 's' : ''} published to website
                        </p>
                      </div>
                      <button
                        onClick={() => { resetForm(); setTab('add'); }}
                        className="flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-xs sm:text-sm shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span className="hidden sm:inline">Add New Project</span>
                        <span className="sm:hidden">Add</span>
                      </button>
                    </div>

                    {projects.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-24 text-center">
                        <div className="w-20 h-20 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center mb-5">
                          <FolderOpen className="w-10 h-10 text-white/20" />
                        </div>
                        <h3 className="text-xl font-black text-white/60 mb-2">No projects yet</h3>
                        <p className="text-white/30 font-semibold text-sm mb-6">Add your first project to display it on the website</p>
                        <button
                          onClick={() => { resetForm(); setTab('add'); }}
                          className="px-6 py-3 rounded-2xl bg-[#0866C6] text-white font-black text-sm flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" /> Add First Project
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {projects.map((proj) => {
                          const cat = CATEGORY_OPTIONS.find((c) => c.value === proj.category);
                          return (
                            <motion.div
                              key={proj.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 overflow-hidden hover:border-[#0866C6]/50 transition-all group hover:shadow-xl hover:shadow-[#0866C6]/10"
                            >
                              {/* Image */}
                              <div className="relative h-44 sm:h-48 bg-white/5">
                                {proj.image ? (
                                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-white/20" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                {/* Category + Capacity badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                  <span
                                    className="px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase"
                                    style={{ backgroundColor: cat?.color ?? '#555' }}
                                  >
                                    {proj.categoryLabel}
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-black backdrop-blur-sm">
                                    {proj.capacity}
                                  </span>
                                </div>
                                {/* Hover action overlay */}
                                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={() => handleEdit(proj)}
                                    className="p-2 rounded-xl bg-white/90 shadow text-[#0866C6] hover:bg-[#0866C6] hover:text-white transition-all"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(proj.id)}
                                    className="p-2 rounded-xl bg-white/90 shadow text-red-500 hover:bg-red-500 hover:text-white transition-all"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[10px] font-bold">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate max-w-[140px]">{proj.location}</span>
                                </div>
                              </div>

                              {/* Body */}
                              <div className="p-4">
                                <h3 className="font-black text-white text-sm leading-snug mb-1 line-clamp-1">{proj.title}</h3>
                                <p className="text-white/50 text-xs font-semibold line-clamp-2 mb-3">{proj.description}</p>
                                <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/5 mb-3">
                                  <span className="text-[10px] text-white/40 font-bold uppercase">Annual Savings</span>
                                  <span className="text-sm font-black text-[#70D943]">{proj.annualSavings}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEdit(proj)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#0866C6]/15 text-[#60A5FA] font-bold text-xs hover:bg-[#0866C6] hover:text-white transition-all border border-[#0866C6]/20"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" /> Edit
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(proj.id)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-500/15 text-red-400 font-bold text-xs hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete
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

                {/* ══════ ADD / EDIT TAB ══════ */}
                {tab === 'add' && (
                  <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-12">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          {editId ? '✏️ Edit Project' : '🚀 Add New Project'}
                        </h2>
                        <p className="text-white/40 text-xs sm:text-sm font-semibold mt-0.5">
                          Fill all starred fields. Published projects appear on the main website instantly.
                        </p>
                      </div>
                      {editId && (
                        <button
                          onClick={resetForm}
                          className="flex items-center gap-1.5 text-xs font-bold text-white/40 hover:text-red-400 transition-colors"
                        >
                          <RefreshCw className="w-3.5 h-3.5" /> Reset
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* ── LEFT COLUMN ── */}
                      <div className="space-y-5">

                        {/* Image Upload */}
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <label className="text-[11px] font-black text-white/60 uppercase tracking-wider">
                              Project Image <span className="text-red-400">*</span>
                            </label>
                            <span className="text-[10px] text-white/30 font-semibold">Max 5 MB · JPG/PNG/WEBP</span>
                          </div>
                          <div
                            onClick={() => fileRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-3xl overflow-hidden cursor-pointer transition-all group ${
                              previewImg
                                ? 'border-[#239B35] shadow-lg shadow-[#239B35]/20'
                                : 'border-white/10 hover:border-[#0866C6]/60 bg-white/3'
                            }`}
                            style={{ height: '200px', background: previewImg ? undefined : 'rgba(255,255,255,0.03)' }}
                          >
                            {previewImg ? (
                              <>
                                <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <div className="bg-white/90 rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm font-black text-[#071B49]">
                                    <Upload className="w-4 h-4" /> Change Image
                                  </div>
                                </div>
                                <div className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-[#239B35] flex items-center justify-center shadow-lg">
                                  <CheckCircle className="w-4 h-4 text-white" />
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full gap-3 text-white/30">
                                <div className="w-14 h-14 rounded-2xl bg-white/5 border-2 border-white/10 flex items-center justify-center group-hover:border-[#0866C6]/40 transition-all">
                                  <Upload className="w-7 h-7" />
                                </div>
                                <div className="text-center">
                                  <p className="font-black text-sm text-white/50">Click to Upload Image</p>
                                  <p className="text-xs text-white/25 font-semibold mt-0.5">Best: 800×600 px landscape</p>
                                </div>
                              </div>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                          </div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="text-[11px] font-black text-white/60 uppercase tracking-wider block mb-2">
                            Category <span className="text-red-400">*</span>
                          </label>
                          <div className="flex gap-2">
                            {CATEGORY_OPTIONS.map(({ value, label, Icon, color, bg }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => handleField('category', value)}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 text-xs font-black transition-all ${
                                  form.category === value
                                    ? 'text-white border-transparent shadow-lg'
                                    : 'border-white/10 text-white/40 hover:border-white/20 bg-white/3'
                                }`}
                                style={form.category === value ? { backgroundColor: color, borderColor: color } : { background: 'rgba(255,255,255,0.03)' }}
                              >
                                <Icon className="w-5 h-5" />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Title, Description, Location */}
                        <div className="space-y-4">
                          {[
                            { label: 'Project Title', name: 'title', required: true, placeholder: 'e.g., Residential Rooftop Solar' },
                            { label: 'Description', name: 'description', rows: 3, required: true, placeholder: 'Brief project description...' },
                            { label: 'Location', name: 'location', required: true, placeholder: 'e.g., Coimbatore, Tamil Nadu' },
                          ].map((f) => (
                            <div key={f.name} className="[&_label]:text-white/60 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder-white/20 [&_input:focus]:border-[#0866C6] [&_textarea]:bg-white/5 [&_textarea]:border-white/10 [&_textarea]:text-white [&_textarea]:placeholder-white/20 [&_textarea:focus]:border-[#0866C6]">
                              <Field {...f} value={form[f.name]} onChange={handleField} />
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* ── RIGHT COLUMN ── */}
                      <div className="space-y-4">
                        {[
                          { label: 'System Capacity', name: 'capacity', required: true, placeholder: 'e.g., 5 kW or 100 kW or 1 MW' },
                          { label: 'Annual Savings', name: 'annualSavings', required: true, placeholder: 'e.g., ₹72,000 / year' },
                          { label: 'Panel Technology', name: 'panels', placeholder: 'e.g., Mono PERC Bifacial (550W)' },
                          { label: 'CO₂ Offset', name: 'co2Offset', placeholder: 'e.g., 6.2 Tons / Year' },
                          { label: 'Completion Date', name: 'completionDate', placeholder: 'e.g., March 2026' },
                        ].map((f) => (
                          <div key={f.name} className="[&_label]:text-white/60 [&_input]:bg-white/5 [&_input]:border-white/10 [&_input]:text-white [&_input]:placeholder-white/20 [&_input:focus]:border-[#0866C6]">
                            <Field {...f} value={form[f.name]} onChange={handleField} />
                          </div>
                        ))}

                        {/* Live Preview Card */}
                        {(form.title || form.annualSavings) && (
                          <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5">
                            <div className="px-4 py-2.5 bg-white/5 border-b border-white/10">
                              <p className="text-[10px] uppercase font-black tracking-wider text-white/40 flex items-center gap-1.5">
                                <Zap className="w-3 h-3" /> Live Preview
                              </p>
                            </div>
                            <div className="p-4 space-y-2.5">
                              {previewImg && (
                                <img src={previewImg} alt="preview" className="w-full h-28 object-cover rounded-2xl" />
                              )}
                              <p className="font-black text-white text-sm">{form.title || 'Project Title'}</p>
                              <p className="text-[11px] text-white/50 font-medium line-clamp-2">{form.description || 'Description...'}</p>
                              {form.annualSavings && (
                                <div className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                                  <span className="text-[10px] text-white/40 font-bold">Annual Savings</span>
                                  <span className="text-sm font-black text-[#70D943]">{form.annualSavings}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* ── PUBLISH BUTTON AREA ── */}
                    <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                      {/* Validation status */}
                      {!isReady ? (
                        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/20 text-amber-300">
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-black">Fill required fields to publish:</p>
                            <p className="text-xs font-semibold mt-1 text-amber-300/80">{missing.join(' · ')}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-green-500/10 border-2 border-green-500/20 text-green-300">
                          <CheckCircle className="w-5 h-5 shrink-0" />
                          <p className="text-xs font-black">All required fields filled — ready to publish!</p>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={!isReady}
                          className={`flex-1 sm:flex-initial py-4 px-10 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2.5 transition-all ${
                            isReady
                              ? 'bg-gradient-to-r from-[#239B35] to-[#0866C6] text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                              : 'bg-white/5 text-white/20 border border-white/10 cursor-not-allowed'
                          }`}
                        >
                          <Save className="w-5 h-5" />
                          {editId ? 'Update Project' : 'Publish Project'}
                          {isReady && <ChevronRight className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => { resetForm(); setTab('projects'); }}
                          className="px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white/50 hover:text-white font-bold text-sm transition-all border border-white/10"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>{/* end scrollable body */}
            </div>
          )}

          {/* ══════════════════════════════════════════
              DELETE CONFIRM MODAL
          ══════════════════════════════════════════ */}
          <AnimatePresence>
            {confirmDelete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/70 backdrop-blur-sm"
                onClick={() => setConfirmDelete(null)}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-[#0D1535] rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-white/10 text-center"
                >
                  <div className="w-16 h-16 bg-red-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-500/30">
                    <Trash2 className="w-8 h-8 text-red-400" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-2">Delete Project?</h3>
                  <p className="text-white/40 font-semibold text-sm mb-7">
                    This project will be permanently removed from the website. This cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="flex-1 py-3.5 rounded-2xl bg-white/5 hover:bg-white/10 text-white/70 font-bold border border-white/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(confirmDelete)}
                      className="flex-1 py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black transition-all shadow-lg shadow-red-500/30"
                    >
                      Delete
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}
