import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock, LogOut, Plus, Trash2, Edit3, Eye, EyeOff, X, Upload, Save,
  Image as ImageIcon, AlertTriangle, CheckCircle, Building2, Home,
  Factory, FolderOpen, MapPin, RefreshCw, ArrowLeft, ChevronRight,
  Cloud, Loader2
} from 'lucide-react';
import SolarAriseLogo from './SolarAriseLogo';
import { uploadToCloudinary, isCloudinaryConfigured } from '../lib/cloudinary';

/* ─────────────────────────────────────────────
   CONSTANTS
───────────────────────────────────────────── */
const ADMIN_PASSWORD = 'kathir@123';
const STORAGE_KEY = 'solar_admin_projects';

const CATEGORY_OPTIONS = [
  { value: 'residential', label: 'Residential', Icon: Home,     color: '#239B35', lightBg: '#EAF8EE' },
  { value: 'commercial',  label: 'Commercial',  Icon: Building2, color: '#0866C6', lightBg: '#EBF2FF' },
  { value: 'industrial',  label: 'Industrial',  Icon: Factory,   color: '#E85D04', lightBg: '#FFF0E8' },
];

const EMPTY_FORM = {
  title: '', description: '', location: '', category: 'residential',
  capacity: '', annualSavings: '', panels: '', co2Offset: '',
  completionDate: '', image: '',
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
  try {
    window.dispatchEvent(new StorageEvent('storage', {
      key: STORAGE_KEY,
      newValue: JSON.stringify(projects),
      storageArea: localStorage,
    }));
  } catch (_) {}
}

/* ─────────────────────────────────────────────
   CHAR COUNTER & FIELD
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
  const base = "w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-[#0866C6] focus:ring-4 focus:ring-[#0866C6]/10 outline-none text-sm font-bold text-[#071B49] bg-white transition-all placeholder:text-slate-300 resize-none";
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center gap-1">
        <label className="text-[11px] font-black text-[#071B49] uppercase tracking-wider">
          {label}{required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
        {max && <CharCounter value={value} max={max} />}
      </div>
      {rows
        ? <textarea rows={rows} value={value} onChange={handleChange} placeholder={placeholder} className={base} />
        : <input type={type} value={value} onChange={handleChange} placeholder={placeholder} className={base} />
      }
    </div>
  );
}

/* ─────────────────────────────────────────────
   TOAST
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
          className={`fixed top-6 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl text-sm font-black text-white ${
            toast.type === 'error' ? 'bg-red-500' : 'bg-[#239B35]'
          }`}
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
  const [authed, setAuthed]               = useState(() => sessionStorage.getItem('solar_admin_authed') === '1');
  const [pwInput, setPwInput]             = useState('');
  const [pwError, setPwError]             = useState('');
  const [showPw, setShowPw]               = useState(false);
  const [projects, setProjects]           = useState(() => getAdminProjects());
  const [editId, setEditId]               = useState(null);
  const [form, setForm]                   = useState(EMPTY_FORM);
  const [previewImg, setPreviewImg]       = useState(null);
  const [isUploading, setIsUploading]     = useState(false);
  const [isSaving, setIsSaving]           = useState(false);
  const [toast, setToast]                 = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [tab, setTab]                     = useState('projects'); // 'projects' | 'add'
  const fileRef                           = useRef(null);

  const hasCloudinaryEnv = isCloudinaryConfigured();

  useEffect(() => {
    if (isOpen) setProjects(getAdminProjects());
  }, [isOpen]);

  useEffect(() => {
    if (authed) setProjects(getAdminProjects());
  }, [authed]);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 4000);
  };

  /* ── Auth ── */
  const handleLogin = (e) => {
    e.preventDefault();
    if (pwInput === ADMIN_PASSWORD) {
      setAuthed(true);
      sessionStorage.setItem('solar_admin_authed', '1');
      setPwError(''); setPwInput('');
    } else {
      setPwError('Incorrect password. Please try again.'); setPwInput('');
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    sessionStorage.removeItem('solar_admin_authed');
    setPwInput(''); onClose();
  };

  const handleBackToSite = () => {
    setAuthed(false);
    sessionStorage.removeItem('solar_admin_authed');
    setPwInput(''); onClose();
    window.location.reload();
  };

  /* ── Direct Image Upload via Cloudinary API (from .env) ── */
  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      showToast('Image must be under 10 MB.', 'error');
      return;
    }

    // Immediate local preview so the admin sees the selected photo right away
    const localUrl = URL.createObjectURL(file);
    setPreviewImg(localUrl);

    // If Cloudinary is configured via .env / Vercel env, upload to Cloudinary CDN
    if (hasCloudinaryEnv) {
      setIsUploading(true);
      try {
        const cloudUrl = await uploadToCloudinary(file);
        setForm((f) => ({ ...f, image: cloudUrl }));
        setPreviewImg(cloudUrl);
        showToast('Image uploaded to Cloudinary CDN! ☁️', 'success');
      } catch (err) {
        showToast(`Cloudinary upload failed: ${err.message}`, 'error');
        // Fallback to base64
        const reader = new FileReader();
        reader.onload = (ev) => {
          setForm((f) => ({ ...f, image: ev.target.result }));
        };
        reader.readAsDataURL(file);
      } finally {
        setIsUploading(false);
      }
    } else {
      // Local dev / no env set: read as base64
      const reader = new FileReader();
      reader.onload = (ev) => {
        setForm((f) => ({ ...f, image: ev.target.result }));
        setPreviewImg(ev.target.result);
      };
      reader.readAsDataURL(file);
      showToast('Image selected locally. (Add VITE_CLOUDINARY_* in .env / Vercel for CDN)', 'success');
    }
  };

  const handleField = (name, value) => setForm((f) => ({ ...f, [name]: value }));

  /* ── Validate ── */
  const getMissing = () => {
    const m = [];
    if (!form.title.trim())         m.push('Title');
    if (!form.description.trim())   m.push('Description');
    if (!form.location.trim())      m.push('Location');
    if (!form.capacity.trim())      m.push('Capacity');
    if (!form.annualSavings.trim()) m.push('Annual Savings');
    if (!form.image && !previewImg && !editId) m.push('Project Image');
    return m;
  };

  /* ── Save Project ── */
  const handleSave = () => {
    const missing = getMissing();
    if (missing.length > 0) { showToast(`Missing: ${missing.join(', ')}`, 'error'); return; }

    setIsSaving(true);
    const catInfo = CATEGORY_OPTIONS.find((c) => c.value === form.category);
    let updated;

    if (editId) {
      updated = projects.map((p) =>
        p.id === editId
          ? { ...p, ...form, categoryLabel: catInfo?.label ?? form.category, image: form.image || p.image }
          : p
      );
      showToast('Project updated successfully!');
    } else {
      updated = [...projects, {
        ...form,
        id: `admin_${Date.now()}`,
        categoryLabel: catInfo?.label ?? form.category,
        image: form.image || previewImg,
        alt: form.title,
        isAdmin: true,
      }];
      showToast('Project published to website!');
    }

    saveAdminProjects(updated);
    setProjects(updated);

    setIsSaving(false);
    resetForm();
    setTab('projects');
  };

  /* ── Delete ── */
  const handleDelete = (id) => {
    const updated = projects.filter((p) => p.id !== id);
    saveAdminProjects(updated);
    setProjects(updated);
    setConfirmDelete(null);
    showToast('Project removed.');
  };

  /* ── Edit ── */
  const handleEdit = (proj) => {
    setForm({
      title: proj.title, description: proj.description, location: proj.location,
      category: proj.category, capacity: proj.capacity, annualSavings: proj.annualSavings,
      panels: proj.panels || '', co2Offset: proj.co2Offset || '',
      completionDate: proj.completionDate || '', image: proj.image || '',
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

  const missing = getMissing();
  const isReady = missing.length === 0 && !isUploading;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="admin-panel"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          className="fixed inset-0 z-[9998] flex flex-col bg-[#F4F7FF] overflow-hidden"
        >
          <Toast toast={toast} />

          {/* ════════════════════════════════════════
              LOGIN SCREEN
          ════════════════════════════════════════ */}
          {!authed ? (
            <div className="flex flex-col items-center justify-center min-h-screen px-4 relative"
              style={{ background: 'linear-gradient(135deg, #EAF2FF 0%, #F0F7FF 40%, #EAF8EE 100%)' }}
            >
              <div className="absolute inset-0 pointer-events-none opacity-30" style={{
                backgroundImage: 'linear-gradient(rgba(8,102,198,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(8,102,198,0.06) 1px, transparent 1px)',
                backgroundSize: '48px 48px'
              }} />

              <button
                onClick={onClose}
                className="absolute top-5 right-5 p-2.5 rounded-2xl bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 transition-all shadow-sm"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 w-full max-w-md"
              >
                <div className="flex flex-col items-center mb-8">
                  <div className="mb-4 p-3 bg-white rounded-3xl shadow-xl border border-slate-200/60">
                    <SolarAriseLogo imgClassName="h-16 w-16" showText={false} />
                  </div>
                  <h1 className="text-3xl font-black text-[#071B49] tracking-tight">Admin Panel</h1>
                  <p className="text-slate-500 font-bold text-sm mt-1">
                    <span className="text-[#0866C6]">Solar</span>
                    <span className="text-[#239B35] ml-1">Arise</span>
                    <span className="ml-1 text-slate-400">• Project Management</span>
                  </p>
                </div>

                <div className="bg-white rounded-3xl border-2 border-slate-200 shadow-2xl p-8">
                  <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                      <label className="text-[11px] font-black text-[#071B49] uppercase tracking-widest block mb-2">
                        Admin Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-300" style={{ width: '18px', height: '18px' }} />
                        <input
                          type={showPw ? 'text' : 'password'}
                          value={pwInput}
                          onChange={(e) => { setPwInput(e.target.value); setPwError(''); }}
                          placeholder="Enter password..."
                          autoComplete="current-password"
                          className="w-full border-2 border-slate-200 focus:border-[#0866C6] focus:ring-4 focus:ring-[#0866C6]/10 rounded-2xl pl-12 pr-12 py-4 text-[#071B49] font-bold text-base outline-none placeholder:text-slate-300 bg-slate-50 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPw((v) => !v)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 transition-colors"
                        >
                          {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {pwError && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 px-4 py-3 bg-red-50 border-2 border-red-200 rounded-2xl text-red-600 text-sm font-bold"
                      >
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        {pwError}
                      </motion.div>
                    )}

                    <button
                      type="submit"
                      className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-base shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
                    >
                      <Lock className="w-5 h-5" />
                      Access Admin Panel
                    </button>
                  </form>

                  <div className="mt-6 pt-5 border-t border-slate-100 text-center">
                    <p className="text-slate-400 text-xs font-bold">🔒 Authorized personnel only</p>
                  </div>
                </div>
              </motion.div>
            </div>

          ) : (
            /* ════════════════════════════════════════
                DASHBOARD
            ════════════════════════════════════════ */
            <div className="flex flex-col h-full">

              {/* ── TOP HEADER ── */}
              <div className="shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 bg-white border-b-2 border-slate-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <SolarAriseLogo imgClassName="h-9 w-9 sm:h-10 sm:w-10" showText={true} />
                  <div className="hidden sm:block w-px h-8 bg-slate-200" />
                  <div className="hidden sm:block">
                    <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest">Admin Dashboard</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Cloudinary CDN Indicator badge (reads automatically from env) */}
                  <div className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-black border ${
                    hasCloudinaryEnv
                      ? 'bg-[#EBF2FF] text-[#0866C6] border-[#0866C6]/30'
                      : 'bg-slate-50 text-slate-500 border-slate-200'
                  }`}>
                    <Cloud className="w-3.5 h-3.5" />
                    <span>{hasCloudinaryEnv ? 'Cloudinary CDN: Active' : 'Local Storage Mode'}</span>
                  </div>

                  {/* Back to Main Site */}
                  <button
                    onClick={handleBackToSite}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-[#EBF2FF] text-[#0866C6] text-xs font-black hover:bg-[#0866C6] hover:text-white transition-all border border-[#0866C6]/20"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Main Site</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-red-50 text-red-500 text-xs font-black hover:bg-red-500 hover:text-white transition-all border border-red-200"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              </div>

              {/* ── TAB BAR ── */}
              <div className="shrink-0 flex items-center gap-1 px-4 sm:px-6 bg-white border-b-2 border-slate-200">
                {[
                  { id: 'projects', label: `Projects (${projects.length})`, Icon: FolderOpen },
                  { id: 'add',      label: editId ? '✏ Edit Project' : '+ Add Project', Icon: Plus },
                ].map(({ id, label, Icon }) => (
                  <button
                    key={id}
                    onClick={() => { setTab(id); if (id === 'projects') resetForm(); }}
                    className={`flex items-center gap-2 px-4 py-3.5 text-xs sm:text-sm font-black border-b-2 transition-all whitespace-nowrap ${
                      tab === id
                        ? 'border-[#0866C6] text-[#0866C6]'
                        : 'border-transparent text-slate-400 hover:text-[#071B49]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    {label}
                  </button>
                ))}
              </div>

              {/* ── SCROLLABLE BODY ── */}
              <div className="flex-1 overflow-y-auto bg-[#F4F7FF]">

                {/* ══ 1. PROJECTS TAB ══ */}
                {tab === 'projects' && (
                  <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#071B49]">Admin Projects</h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-bold mt-0.5">
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
                      <div className="flex flex-col items-center justify-center py-24 text-center bg-white rounded-3xl border-2 border-dashed border-slate-300">
                        <div className="w-20 h-20 rounded-3xl bg-slate-100 border-2 border-slate-200 flex items-center justify-center mb-5">
                          <FolderOpen className="w-10 h-10 text-slate-300" />
                        </div>
                        <h3 className="text-xl font-black text-slate-500 mb-2">No projects yet</h3>
                        <p className="text-slate-400 font-bold text-sm mb-6">Add your first project to display it on the website</p>
                        <button
                          onClick={() => { resetForm(); setTab('add'); }}
                          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#0866C6] to-[#239B35] text-white font-black text-sm flex items-center gap-2 shadow-md"
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
                              className="bg-white rounded-3xl border-2 border-slate-200 shadow-md overflow-hidden hover:border-[#0866C6] hover:shadow-xl transition-all group"
                            >
                              <div className="relative h-44 sm:h-48 bg-slate-100">
                                {proj.image ? (
                                  <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <ImageIcon className="w-12 h-12 text-slate-300" />
                                  </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                                <div className="absolute top-3 left-3 flex gap-1.5">
                                  <span className="px-2.5 py-1 rounded-full text-white text-[10px] font-black uppercase" style={{ backgroundColor: cat?.color ?? '#555' }}>
                                    {proj.categoryLabel}
                                  </span>
                                  <span className="px-2.5 py-1 rounded-full bg-black/60 text-white text-[10px] font-black backdrop-blur-sm">
                                    {proj.capacity}
                                  </span>
                                </div>
                                <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button onClick={() => handleEdit(proj)} className="p-2 rounded-xl bg-white shadow text-[#0866C6] hover:bg-[#0866C6] hover:text-white transition-all">
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button onClick={() => setConfirmDelete(proj.id)} className="p-2 rounded-xl bg-white shadow text-red-500 hover:bg-red-500 hover:text-white transition-all">
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white text-[10px] font-bold">
                                  <MapPin className="w-3 h-3" />
                                  <span className="truncate max-w-[140px]">{proj.location}</span>
                                </div>
                              </div>

                              <div className="p-4">
                                <h3 className="font-black text-[#071B49] text-sm leading-snug mb-1 line-clamp-1">{proj.title}</h3>
                                <p className="text-slate-500 text-xs font-bold line-clamp-2 mb-3">{proj.description}</p>
                                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border-2 border-slate-100 mb-3">
                                  <span className="text-[10px] text-slate-500 font-black uppercase">Annual Savings</span>
                                  <span className="text-sm font-black text-[#239B35]">{proj.annualSavings}</span>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleEdit(proj)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-[#EBF2FF] text-[#0866C6] font-black text-xs hover:bg-[#0866C6] hover:text-white transition-all border-2 border-[#0866C6]/20"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" /> Edit
                                  </button>
                                  <button
                                    onClick={() => setConfirmDelete(proj.id)}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-red-50 text-red-500 font-black text-xs hover:bg-red-500 hover:text-white transition-all border-2 border-red-100"
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

                {/* ══ 2. ADD / EDIT TAB ══ */}
                {tab === 'add' && (
                  <div className="p-4 sm:p-6 max-w-5xl mx-auto pb-16">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-[#071B49]">
                          {editId ? '✏️ Edit Project' : '🚀 Add New Project'}
                        </h2>
                        <p className="text-slate-500 text-xs sm:text-sm font-bold mt-0.5">
                          {hasCloudinaryEnv
                            ? 'Images are automatically converted & hosted on Cloudinary CDN.'
                            : 'Upload your project image and details below.'}
                        </p>
                      </div>
                      {editId && (
                        <button onClick={resetForm} className="flex items-center gap-1.5 text-xs font-black text-slate-400 hover:text-red-500 transition-colors">
                          <RefreshCw className="w-3.5 h-3.5" /> Reset
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                      {/* LEFT COLUMN */}
                      <div className="space-y-5">

                        {/* Image Upload box */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-[11px] font-black text-[#071B49] uppercase tracking-wider">
                              Project Image <span className="text-red-500">*</span>
                            </label>
                            {hasCloudinaryEnv && (
                              <span className="text-[10px] font-bold text-[#0866C6] bg-[#EBF2FF] px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Cloud className="w-3 h-3" /> Cloudinary CDN Active
                              </span>
                            )}
                          </div>

                          <div
                            onClick={() => !isUploading && fileRef.current?.click()}
                            className={`relative border-2 border-dashed rounded-3xl overflow-hidden cursor-pointer transition-all group ${
                              previewImg ? 'border-[#239B35] shadow-md shadow-[#239B35]/10' : 'border-slate-300 bg-slate-50 hover:border-[#0866C6] hover:bg-blue-50/30'
                            }`}
                            style={{ height: '220px' }}
                          >
                            {isUploading ? (
                              <div className="flex flex-col items-center justify-center h-full gap-3 bg-white/90">
                                <Loader2 className="w-8 h-8 text-[#0866C6] animate-spin" />
                                <p className="font-black text-sm text-[#071B49]">Uploading to Cloudinary CDN...</p>
                                <p className="text-xs text-slate-400 font-semibold">Generating permanent image URL</p>
                              </div>
                            ) : previewImg ? (
                              <>
                                <img src={previewImg} alt="Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                  <div className="bg-white rounded-2xl px-4 py-2.5 flex items-center gap-2 text-sm font-black text-[#071B49]">
                                    <Upload className="w-4 h-4" /> Change Image
                                  </div>
                                </div>
                                <div className="absolute top-3 right-3 px-3 py-1 rounded-xl bg-[#239B35] text-white text-xs font-black flex items-center gap-1 shadow-lg">
                                  <CheckCircle className="w-3.5 h-3.5" />
                                  <span>{form.image && form.image.includes('cloudinary') ? 'CDN Hosted' : 'Ready'}</span>
                                </div>
                              </>
                            ) : (
                              <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                                <div className="w-14 h-14 rounded-2xl bg-white border-2 border-slate-200 flex items-center justify-center shadow-sm">
                                  <Upload className="w-7 h-7" />
                                </div>
                                <div className="text-center">
                                  <p className="font-black text-sm text-slate-600">Click to Upload Image</p>
                                  <p className="text-xs text-slate-400 font-bold mt-0.5">JPG, PNG, WEBP</p>
                                </div>
                              </div>
                            )}
                            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFileChange} />
                          </div>
                        </div>

                        {/* Category */}
                        <div>
                          <label className="text-[11px] font-black text-[#071B49] uppercase tracking-wider block mb-2">
                            Category <span className="text-red-500">*</span>
                          </label>
                          <div className="flex gap-2">
                            {CATEGORY_OPTIONS.map(({ value, label, Icon, color }) => (
                              <button
                                key={value}
                                type="button"
                                onClick={() => handleField('category', value)}
                                className={`flex-1 flex flex-col items-center gap-1.5 py-3 rounded-2xl border-2 text-xs font-black transition-all ${
                                  form.category === value
                                    ? 'text-white border-transparent shadow-lg'
                                    : 'border-slate-200 text-slate-500 bg-white hover:border-slate-300'
                                }`}
                                style={form.category === value ? { backgroundColor: color, borderColor: color } : {}}
                              >
                                <Icon className="w-5 h-5" />
                                {label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Title, Desc, Location */}
                        <Field label="Project Title"   name="title"       value={form.title}       onChange={handleField} required placeholder="e.g., Residential Rooftop Solar" />
                        <Field label="Description"     name="description" value={form.description} onChange={handleField} required rows={3} placeholder="Brief description..." />
                        <Field label="Location"        name="location"    value={form.location}    onChange={handleField} required placeholder="e.g., Coimbatore, Tamil Nadu" />
                      </div>

                      {/* RIGHT COLUMN */}
                      <div className="space-y-4">
                        <Field label="System Capacity" name="capacity"       value={form.capacity}       onChange={handleField} required placeholder="e.g., 5 kW or 100 kW or 1 MW" />
                        <Field label="Annual Savings"  name="annualSavings"  value={form.annualSavings}  onChange={handleField} required placeholder="e.g., ₹72,000 / year" />
                        <Field label="Panel Technology" name="panels"        value={form.panels}         onChange={handleField} placeholder="e.g., Mono PERC Bifacial (550W)" />
                        <Field label="CO₂ Offset"      name="co2Offset"     value={form.co2Offset}      onChange={handleField} placeholder="e.g., 6.2 Tons / Year" />
                        <Field label="Completion Date" name="completionDate" value={form.completionDate} onChange={handleField} placeholder="e.g., March 2026" />

                        {/* Live Preview */}
                        {(form.title || form.annualSavings) && (
                          <div className="rounded-3xl overflow-hidden border-2 border-slate-200 bg-white shadow-sm">
                            <div className="px-4 py-2.5 bg-gradient-to-r from-[#071B49] to-[#0866C6]">
                              <p className="text-[10px] uppercase font-black tracking-wider text-white/70">⚡ Live Card Preview</p>
                            </div>
                            <div className="p-4 space-y-2.5">
                              {previewImg && <img src={previewImg} alt="preview" className="w-full h-28 object-cover rounded-2xl" />}
                              <p className="font-black text-[#071B49] text-sm">{form.title || 'Project Title'}</p>
                              <p className="text-[11px] text-slate-500 font-bold line-clamp-2">{form.description || 'Description...'}</p>
                              {form.annualSavings && (
                                <div className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                                  <span className="text-[10px] text-slate-500 font-black">Annual Savings</span>
                                  <span className="text-sm font-black text-[#239B35]">{form.annualSavings}</span>
                                </div>
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PUBLISH BUTTON AREA */}
                    <div className="mt-8 pt-6 border-t-2 border-slate-200 space-y-4">
                      {!isReady ? (
                        <div className="flex items-start gap-3 px-5 py-4 rounded-2xl bg-amber-50 border-2 border-amber-200 text-amber-700">
                          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-xs font-black">Fill required fields to publish:</p>
                            <p className="text-xs font-bold mt-1 text-amber-600">{missing.join(' · ')}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-[#EAF8EE] border-2 border-[#239B35]/30 text-[#239B35]">
                          <CheckCircle className="w-5 h-5 shrink-0" />
                          <p className="text-xs font-black">
                            All required fields filled — ready to publish!
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-3">
                        <button
                          type="button"
                          onClick={handleSave}
                          disabled={!isReady || isSaving}
                          className={`flex-1 sm:flex-initial py-4 px-10 rounded-2xl font-black text-base shadow-xl flex items-center justify-center gap-2.5 transition-all ${
                            isReady && !isSaving
                              ? 'bg-gradient-to-r from-[#239B35] to-[#0866C6] text-white hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer'
                              : 'bg-slate-100 text-slate-300 border-2 border-slate-200 cursor-not-allowed'
                          }`}
                        >
                          {isSaving ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              <span>Publishing...</span>
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              <span>{editId ? 'Update Project' : 'Publish Project'}</span>
                              <ChevronRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={() => { resetForm(); setTab('projects'); }}
                          className="px-6 py-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-500 font-black text-sm transition-all border-2 border-slate-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>{/* end body */}
            </div>
          )}

          {/* ════════════════════════════════════════
              DELETE CONFIRM MODAL
          ════════════════════════════════════════ */}
          <AnimatePresence>
            {confirmDelete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/50 backdrop-blur-sm"
                onClick={() => setConfirmDelete(null)}
              >
                <motion.div
                  initial={{ scale: 0.85, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.85, opacity: 0 }}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border-2 border-slate-200 text-center"
                >
                  <div className="w-16 h-16 bg-red-50 rounded-2xl border-2 border-red-100 flex items-center justify-center mx-auto mb-4">
                    <Trash2 className="w-8 h-8 text-red-500" />
                  </div>
                  <h3 className="text-xl font-black text-[#071B49] mb-2">Delete Project?</h3>
                  <p className="text-slate-500 font-bold text-sm mb-7">
                    This project will be permanently removed from the website. This cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setConfirmDelete(null)}
                      className="flex-1 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-[#071B49] font-black border-2 border-slate-200 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDelete(confirmDelete)}
                      className="flex-1 py-3.5 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-black transition-all shadow-lg"
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
