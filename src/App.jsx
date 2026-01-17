import React, { useState, useEffect, useMemo } from 'react';
import { 
  ShoppingBag, Target, ArrowUpRight, Linkedin, Mail, 
  Trash2, Sparkles, Menu, X, PlusCircle, Zap, User, Tags, 
  Image as ImageIcon, Save, Loader2, Monitor, PenTool, MessageCircle,
  Palette, Component, MousePointer2, Layers
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getFirestore, collection, addDoc, deleteDoc, doc, 
  onSnapshot, query, setDoc 
} from 'firebase/firestore';
import { 
  getAuth, signInAnonymously, onAuthStateChanged, signInWithCustomToken 
} from 'firebase/auth';

// --- Final Firebase Configuration ---
const firebaseConfig = {
  apiKey: "AIzaSyB8qrmuUk7VWyhv1qN1BqTbQ1X6pZGvIWw",
  authDomain: "prashantdesign-b09d3.firebaseapp.com",
  projectId: "prashantdesign-b09d3",
  storageBucket: "prashantdesign-b09d3.firebasestorage.app",
  messagingSenderId: "733759526222",
  appId: "1:733759526222:web:af654cefcdf5d28caaba1f",
  measurementId: "G-ZMM8TJ6E8R"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const appId = 'prashant-graphic-pro-final';

// --- Software Icons (Refined SVGs) ---
const SoftwareIcons = {
  Photoshop: () => (
    <svg viewBox="0 0 256 256" className="w-10 h-10">
      <path d="M256 39.4c0-21.8-17.6-39.4-39.4-39.4h-177.2c-21.8 0-39.4 17.6-39.4 39.4v177.2c0 21.8 17.6 39.4 39.4 39.4h177.2c21.8 0 39.4-17.6 39.4-39.4v-177.2z" fill="#001e36"/>
      <path d="M78.6 172.9c-2.7 0-4.8-.5-6.5-1.5-1.7-1-3.2-2.5-4.4-4.5l8.6-11c2.1 3.5 5.5 5.2 10.3 5.2 2.6 0 4.6-.5 6-1.5 1.4-1 2.1-2.3 2.1-4s-1-3.1-2.9-4c-1.9-.9-5.1-1.8-9.6-2.8-5.3-1.1-9.4-2.8-12.2-4.9-2.8-2.1-4.2-5.4-4.2-9.7 0-4.8 1.9-8.6 5.6-11.3 3.8-2.7 8.8-4 15.2-4 3.7 0 7 .6 9.8 1.8 2.8 1.2 5.1 3 6.9 5.3l-8.3 10.7c-2-2.8-4.9-4.2-8.7-4.2-2.3 0-4.1.5-5.3 1.4s-1.8 2.2-1.8 3.8 1 3 3 3.9c2 .9 5.2 1.8 9.7 2.8 5.4 1.2 9.6 2.8 12.5 5 2.9 2.1 4.4 5.3 4.4 9.6 0 5-1.9 8.9-5.8 11.6-3.8 2.8-9.1 4.2-15.8 4.2zm64.8-1.5c-4.4 0-8.2-.8-11.4-2.4l3.1-12c2.5 1.5 5.2 2.3 8 2.3 4.6 0 7.8-2.7 7.8-8.2V99.5h16v50.4c0 7.6-2.1 13.2-6.2 16.9-4.2 3.8-9.9 4.6-17.3 4.6z" fill="#31a8ff"/>
    </svg>
  ),
  Figma: () => (
    <svg viewBox="0 0 38 57" className="w-8 h-10">
      <path d="M19 0H9.5C4.2533 0 0 4.2533 0 9.5C0 14.7467 4.2533 19 9.5 19H19V0Z" fill="#F24E1E"/>
      <path d="M38 9.5C38 4.2533 33.7467 0 28.5 0H19V19H28.5C33.7467 19 38 14.7467 38 9.5Z" fill="#FF7262"/>
      <path d="M19 19H9.5C4.2533 19 0 23.2533 0 28.5C0 33.7467 4.2533 38 9.5 38H19V19Z" fill="#A259FF"/>
      <path d="M38 28.5C38 23.2533 33.7467 19 28.5 19H19V38H28.5C33.7467 38 38 33.7467 38 28.5Z" fill="#1ABCFE"/>
      <path d="M19 38H9.5C4.2533 38 0 42.2533 0 47.5C0 52.7467 4.2533 57 9.5 57C14.7467 57 19 52.7467 19 47.5V38Z" fill="#0ACF83"/>
    </svg>
  ),
  Canva: () => (
    <svg viewBox="0 0 256 256" className="w-10 h-10">
      <circle cx="128" cy="128" r="128" fill="url(#canva-bg)"/>
      <defs>
        <linearGradient id="canva-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#00C4CC"}}/>
          <stop offset="100%" style={{stopColor:"#7D2AE8"}}/>
        </linearGradient>
      </defs>
      <path d="M102.5 147.1c-8.9 0-14.8-5.3-14.8-13.8 0-8.9 6.2-14.2 15.3-14.2 4.4 0 8.5 1.1 11.8 3.1l3.5-8.5c-4.4-2.4-10.2-3.8-16.5-3.8-15.6 0-26.8 9.2-26.8 24.3 0 14.8 10.9 23.2 25.4 23.2 7 0 12.9-1.4 17.6-4.1l-3.2-8.2c-4.1 2.2-7.8 3-12.3 3.z" fill="white"/>
    </svg>
  ),
  InDesign: () => (
    <svg viewBox="0 0 256 256" className="w-10 h-10">
      <path d="M256 39.4c0-21.8-17.6-39.4-39.4-39.4h-177.2c-21.8 0-39.4 17.6-39.4 39.4v177.2c0 21.8 17.6 39.4 39.4 39.4h177.2c21.8 0 39.4-17.6 39.4-39.4v-177.2z" fill="#49021f"/>
      <path d="M96.4 171.1V84.9h16v86.2h-16zm63.4-38.6c0-6.1-2.4-9.8-6.9-9.8-4.6 0-7.8 4.2-7.8 9.5v38.9h-16v-86.2h16v28.8c3.2-4.1 8-6.9 14.2-6.9 10.9 0 16.5 7.6 16.5 18.2v46.1h-16v-38.6z" fill="#ff3366"/>
    </svg>
  )
};

const AdminDashboard = ({ items, categories, profile, onAdd, onDelete, onUpdateProfile, onAddCategory, onDeleteCategory, onExit }) => {
  const [activeTab, setActiveTab] = useState('gallery');
  const [bulkIds, setBulkIds] = useState('');
  const [imgCat, setImgCat] = useState(categories[0] || '');
  const [isUploading, setIsUploading] = useState(false);
  const [newCat, setNewCat] = useState('');
  const [profData, setProfData] = useState(profile || {});

  const handleBulkUpload = async () => {
    if (!bulkIds.trim()) return;
    setIsUploading(true);
    const ids = bulkIds.split(/[\n,]+/).map(id => id.trim()).filter(id => id.length > 0);
    for (const driveId of ids) {
      await onAdd({ driveId, category: imgCat || categories[0] || 'Uncategorized' });
    }
    setBulkIds('');
    setIsUploading(false);
  };

  return (
    <div className="fixed inset-0 z-[2000] bg-[#02050A] text-white overflow-y-auto font-sans p-4 md:p-10 selection:bg-[#6366F1]">
      <div className="max-w-6xl mx-auto bg-[#0F1218] border border-white/10 rounded-[3rem] p-6 md:p-14 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-white uppercase leading-none font-heading">PK Admin Panel</h2>
            <p className="text-gray-500 text-xs mt-3 uppercase tracking-widest font-bold">Identity Orchestration</p>
          </div>
          <button onClick={onExit} className="bg-white text-black px-8 py-3 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm shadow-xl">Close terminal</button>
        </div>

        <div className="flex gap-2 mb-12 overflow-x-auto no-scrollbar pb-2">
          {['gallery', 'categories', 'profile'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-8 py-3 rounded-2xl text-[10px] font-bold uppercase tracking-widest transition-all border shrink-0 ${activeTab === tab ? 'bg-[#6366F1] text-white border-[#6366F1]' : 'bg-white/5 text-gray-500 border-white/5 hover:bg-white/10'}`}>
              {tab === 'gallery' ? 'Portfolio Archive' : tab === 'categories' ? 'Market Segments' : 'Core Identity'}
            </button>
          ))}
        </div>

        {activeTab === 'gallery' && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem]">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3 font-heading"><PlusCircle size={20} className="text-[#6366F1]" /> Import Ad Designs</h3>
              <textarea 
                className="w-full bg-black/40 border border-white/10 p-6 rounded-3xl outline-none focus:border-[#6366F1] transition-all min-h-[180px] font-mono text-sm mb-8 placeholder:text-gray-800"
                placeholder="Paste IDs separated by new lines..."
                value={bulkIds}
                onChange={(e) => setBulkIds(e.target.value)}
              />
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest">Select Target Segment</label>
                  <select className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none text-sm" value={imgCat} onChange={(e) => setImgCat(e.target.value)}>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="flex items-end">
                  <button onClick={handleBulkUpload} disabled={isUploading || !bulkIds.trim()} className="w-full bg-[#6366F1] text-white font-bold py-5 rounded-2xl hover:bg-[#4F46E5] disabled:opacity-30 transition-all flex justify-center items-center gap-3 shadow-xl">
                    {isUploading ? <Loader2 size={20} className="animate-spin" /> : 'Sync to Gallery'}
                  </button>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3">
              {items.map(item => (
                <div key={item.id} className="relative aspect-square rounded-2xl overflow-hidden group border border-white/5 bg-white/5">
                  <img src={`https://lh3.googleusercontent.com/d/${item.driveId}`} className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" alt="" />
                  <div className="absolute inset-0 bg-red-600/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => onDelete(item.id)} className="p-2 text-white hover:scale-110 transition-transform"><Trash2 size={22} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="max-w-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/[0.02] border border-white/5 p-10 rounded-[2.5rem] mb-10">
              <h3 className="text-xl font-bold mb-8 text-white flex items-center gap-3 font-heading"><Tags size={20} className="text-[#6366F1]" /> Identify Niches</h3>
              <div className="flex gap-4">
                <input className="flex-1 bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1] text-sm" placeholder="e.g. Social Media Ads" value={newCat} onChange={(e) => setNewCat(e.target.value)} />
                <button onClick={() => { if(newCat) onAddCategory(newCat); setNewCat(''); }} className="bg-white text-black px-10 rounded-2xl font-bold hover:bg-gray-200 transition-all text-sm">Add</button>
              </div>
            </div>
            <div className="space-y-3">
              {categories.map(cat => (
                <div key={cat} className="flex justify-between items-center p-6 bg-black/40 border border-white/5 rounded-3xl hover:border-white/10 transition-all">
                  <span className="font-bold text-xs uppercase tracking-widest">{cat}</span>
                  <button onClick={() => onDeleteCategory(cat)} className="text-red-500 hover:scale-125 transition-transform"><Trash2 size={18} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="bg-white/[0.02] border border-white/5 p-12 rounded-[3rem] space-y-10">
              <h3 className="text-2xl font-bold text-white flex items-center gap-4 uppercase tracking-tighter font-heading"><User size={24} className="text-[#6366F1]" /> Profile Synthesis</h3>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Full Name</label>
                  <input className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1] text-sm" value={profData.name || ''} onChange={(e) => setProfData({...profData, name: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Portrait PNG ID</label>
                  <input className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none focus:border-[#6366F1] text-sm" value={profData.heroId || ''} onChange={(e) => setProfData({...profData, heroId: e.target.value})} />
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Business Headline</label>
                <textarea className="w-full bg-black border border-white/10 p-5 rounded-3xl h-32 outline-none focus:border-[#6366F1] text-sm" value={profData.headline || ''} onChange={(e) => setProfData({...profData, headline: e.target.value})} />
              </div>
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">WhatsApp</label>
                  <input className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none text-sm" value={profData.whatsapp || ''} onChange={(e) => setProfData({...profData, whatsapp: e.target.value})} />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Email</label>
                  <input className="w-full bg-black border border-white/10 p-4 rounded-2xl outline-none text-sm" value={profData.email || ''} onChange={(e) => setProfData({...profData, email: e.target.value})} />
                </div>
              </div>
              <button onClick={() => onUpdateProfile(profData)} className="w-full bg-[#6366F1] text-white py-6 rounded-3xl font-bold text-lg flex justify-center items-center gap-4 hover:bg-[#4F46E5] shadow-2xl transition-all">
                <Save size={22} /> Deploy All Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default function App() {
  const [view, setView] = useState('public');
  const [user, setUser] = useState(null);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeFilter, setActiveFilter] = useState('All');
  const [authModal, setAuthModal] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const [profile, setProfile] = useState({
    name: "PRASHANT KUMAR",
    headline: "Creative Graphic Designer specializing in high-impact visual ad creatives and brand identity. Expert in Photoshop, Figma, Canva, and InDesign.",
    heroId: "19v9WPjhyC4FyvmMsvJ51jWmaJZDF2YjI",
    email: "Prashantkumar7425@yahoo.com",
    whatsapp: "917425081270"
  });
  
  // --- Secret Admin Access Logic ---
  useEffect(() => {
    const handleUrl = () => { if (window.location.hash.includes('pkadmin')) setAuthModal(true); };
    window.addEventListener('hashchange', handleUrl);
    handleUrl();

    const handleKeys = (e) => { if (e.shiftKey && e.key === 'A') setAuthModal(true); };
    window.addEventListener('keydown', handleKeys);

    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) { console.error("Identity Verification Failed:", err); }
    };
    initAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
        setUser(u);
        if (u) setIsLoading(false);
    });
    return () => { unsub(); window.removeEventListener('keydown', handleKeys); window.removeEventListener('hashchange', handleUrl); };
  }, []);

  // --- Real-time Data Listeners ---
  useEffect(() => {
    if (!user) return;
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('reveal'); });
    }, { threshold: 0.1 });

    const unsubGallery = onSnapshot(query(collection(db, 'artifacts', appId, 'public', 'data', 'gallery')), (snap) => {
      setItems(snap.docs.map(d => ({ id: d.id, ...d.data() })).sort((a,b) => (b.timestamp || 0) - (a.timestamp || 0)));
      setTimeout(() => document.querySelectorAll('.animate-box').forEach(el => observer.observe(el)), 500);
    });

    const unsubCats = onSnapshot(query(collection(db, 'artifacts', appId, 'public', 'data', 'categories')), (snap) => {
      setCategories(snap.docs.map(d => d.data().name));
    });

    const unsubProfile = onSnapshot(doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'main'), (snap) => {
      if (snap.exists()) setProfile(snap.data());
    });

    return () => { unsubGallery(); unsubCats(); unsubProfile(); };
  }, [user]);

  const filteredItems = useMemo(() => activeFilter === 'All' ? items : items.filter(i => i.category === activeFilter), [items, activeFilter]);

  if (isLoading && !window.location.hash.includes('pkadmin')) {
    return (
        <div className="min-h-screen bg-[#02050A] flex flex-col items-center justify-center text-white space-y-6">
            <Loader2 className="animate-spin text-[#6366F1]" size={64} />
            <p className="text-[10px] uppercase tracking-[0.6em] font-bold opacity-40">Synchronizing Identity</p>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#02050A] text-[#F1F5F9] font-sans selection:bg-[#6366F1] selection:text-white overflow-x-hidden">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Plus+Jakarta+Sans:wght@300;400;600;700&display=swap');
        :root { font-family: 'Plus Jakarta Sans', sans-serif; }
        h1, h2, h3, h4, .font-heading { font-family: 'Outfit', sans-serif; }
        .hero-title { letter-spacing: -0.06em; line-height: 0.82; }
        
        .animate-box { opacity: 0; transform: translateY(40px); transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-box.reveal { opacity: 1; transform: translateY(0); }
        
        .nav-glass { background: rgba(2, 5, 10, 0.7); backdrop-filter: blur(25px); border-bottom: 1px solid rgba(255,255,255,0.04); }
        
        /* Interactive Hero Effects */
        .hero-portrait {
            filter: grayscale(100%);
            transition: all 0.7s cubic-bezier(0.16, 1, 0.3, 1);
            position: relative;
            z-index: 2;
        }
        .hero-container:hover .hero-portrait {
            filter: grayscale(0%);
            transform: translateY(-25px);
        }
        .hero-glow {
            position: absolute;
            width: 350px;
            height: 350px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.5) 0%, transparent 70%);
            border-radius: 50%;
            filter: blur(50px);
            z-index: 1;
            opacity: 0;
            transition: all 0.7s ease;
            pointer-events: none;
            left: 50%; top: 50%; transform: translate(-50%, -50%);
        }
        .hero-container:hover .hero-glow {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.8);
        }

        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .float-subtle { animation: float 8s ease-in-out infinite; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-[100] nav-glass px-6 py-6 md:px-12 transition-all flex justify-between items-center">
        <div className="flex flex-col group cursor-default">
          <span className="text-2xl font-heading font-black tracking-tighter uppercase leading-none text-white group-hover:text-[#6366F1] transition-colors">{profile.name}</span>
          <span className="text-[9px] uppercase tracking-[0.6em] text-gray-600 font-bold mt-2 ml-0.5">Design Professional</span>
        </div>

        <div className="hidden md:flex items-center gap-12 text-shadow-sm">
          {['Expertise', 'Work', 'Connect'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-[10px] uppercase font-bold tracking-[0.2em] text-gray-400 hover:text-white transition-colors">{link}</a>
          ))}
          <a href="#contact" className="bg-white text-black px-10 py-3 text-[10px] font-bold uppercase tracking-[0.2em] rounded-xl hover:bg-[#6366F1] hover:text-white transition-all shadow-xl shadow-white/5">Start Project</a>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[150] bg-[#02050A] flex flex-col p-12 space-y-12 animate-in fade-in duration-500">
          <button onClick={() => setIsMenuOpen(false)} className="self-end p-2 text-white"><X size={36}/></button>
          {['Expertise', 'Work', 'Connect'].map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setIsMenuOpen(false)} className="text-6xl font-heading font-black text-white uppercase tracking-tighter">{link}</a>
          ))}
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-28 px-6 md:px-12 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none" 
             style={{backgroundImage: 'radial-gradient(circle at 75% 40%, rgba(99, 102, 241, 0.08) 0%, transparent 60%)'}} />
        
        <div className="max-w-screen-2xl mx-auto w-full z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="animate-box reveal">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[2px] w-12 bg-[#6366F1]" />
              <span className="text-[11px] uppercase font-bold tracking-[0.4em] text-[#6366F1]">Visual Identity Specialist</span>
            </div>
            <h1 className="text-[clamp(4.5rem,10.5vw,13.5rem)] font-heading font-black text-white mb-12 uppercase leading-[0.82] tracking-tighter">
              Performance <br />
              Creative <br />
              <span className="text-[#6366F1] italic font-light">Graphic Designer.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-2xl max-w-xl leading-relaxed mb-16 font-light">
              {profile.headline} Crafting global narratives using the world's most powerful creative suites.
            </p>
            <div className="flex flex-wrap gap-8 items-center">
              <a href="#work" className="bg-white text-black px-14 py-7 rounded-[2rem] font-bold flex items-center gap-4 hover:bg-[#6366F1] hover:text-white transition-all shadow-2xl shadow-white/5">
                View Archive <ArrowUpRight size={24} />
              </a>
              <div className="flex items-center gap-6 px-4">
                <a href="#" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-[#6366F1] hover:border-[#6366F1] transition-all"><Linkedin size={20}/></a>
                <a href="#" className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center hover:bg-[#6366F1] hover:border-[#6366F1] transition-all"><Instagram size={20}/></a>
              </div>
            </div>
          </div>
          
          <div className="relative group flex justify-center items-center animate-box reveal hero-container cursor-default">
            {/* Dynamic Interactive Glow */}
            <div className="hero-glow" />
            <div className="relative w-full max-w-[550px] float-subtle transition-all duration-[1s]">
              <img 
                src={`https://lh3.googleusercontent.com/d/${profile.heroId}`} 
                className="w-full h-auto hero-portrait drop-shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
                alt="Portrait"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="py-48 px-6 md:px-12 bg-[#060810] border-y border-white/5">
        <div className="max-w-screen-2xl mx-auto grid lg:grid-cols-3 gap-24 items-start">
          <div className="animate-box">
            <span className="text-[10px] uppercase font-bold tracking-[0.5em] text-[#6366F1] mb-8 block uppercase font-bold">Tool Arsenal</span>
            <h2 className="text-5xl md:text-8xl font-heading font-black mb-10 text-white tracking-tighter uppercase leading-[0.9]">Design <br/>Mastery.</h2>
            <p className="text-gray-500 leading-relaxed text-xl font-light mb-20">
              Leveraging the world's most powerful software to define the visual identities for premium international brands.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Photoshop', Icon: SoftwareIcons.Photoshop },
                { name: 'Figma', Icon: SoftwareIcons.Figma },
                { name: 'Canva', Icon: SoftwareIcons.Canva },
                { name: 'InDesign', Icon: SoftwareIcons.InDesign }
              ].map(tool => (
                <div key={tool.name} className="bg-white/5 p-6 rounded-3xl border border-white/5 flex items-center gap-5 group hover:bg-white/10 hover:border-[#6366F1]/30 transition-all">
                  <div className="shrink-0"><tool.Icon /></div>
                  <span className="text-[10px] font-bold uppercase tracking-[0.1em] text-gray-500 group-hover:text-white">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2 grid md:grid-cols-2 gap-10">
            {[
              { icon: ShoppingBag, title: 'Ad Creative', desc: 'Performance-led visual ad imagery engineered for peak engagement and conversion on digital platforms.' },
              { icon: Monitor, title: 'Social Systems', desc: 'Consistent brand narratives across Instagram, Facebook, and LinkedIn globally.' },
              { icon: PenTool, title: 'Brand Identity', desc: 'Cohesive visual languages through advanced typography and color direction.' },
              { icon: Zap, title: 'Scaling Efficiency', desc: 'Producing massive asset variations at the speed of the modern global market.' }
            ].map((card, i) => (
              <div key={i} className="animate-box p-12 rounded-[4rem] bg-white/[0.01] border border-white/5 hover:bg-white hover:text-black transition-all group">
                <div className="mb-12 text-[#6366F1] group-hover:text-black transition-colors"><card.icon size={40} /></div>
                <h3 className="text-4xl font-heading font-bold mb-8">{card.title}</h3>
                <p className="opacity-40 group-hover:opacity-100 font-light text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Work Grid */}
      <section id="work" className="py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-28 gap-12 animate-box">
          <h2 className="text-7xl md:text-[11rem] font-heading font-black text-white tracking-tighter uppercase leading-[0.8]">Work.</h2>
          <div className="flex flex-wrap gap-2.5">
            <button onClick={() => setActiveFilter('All')} className={`px-12 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeFilter === 'All' ? 'bg-[#6366F1] text-white shadow-2xl shadow-[#6366F1]/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5'}`}>All Archive</button>
            {categories.map(cat => (
              <button key={cat} onClick={() => setActiveFilter(cat)} className={`px-12 py-4 rounded-xl text-[10px] font-bold uppercase tracking-[0.3em] transition-all ${activeFilter === cat ? 'bg-[#6366F1] text-white shadow-2xl shadow-[#6366F1]/20' : 'bg-white/5 text-gray-500 hover:text-white border border-white/5'}`}>{String(cat)}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-14">
          {filteredItems.map(item => (
            <div key={item.id} className="animate-box relative group aspect-square rounded-[2.5rem] md:rounded-[4rem] overflow-hidden bg-white/5 border border-white/5 shadow-2xl">
              <img src={`https://lh3.googleusercontent.com/d/${item.driveId}`} className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02050A] via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 md:p-14 flex flex-col justify-end">
                <p className="text-[9px] md:text-[11px] uppercase font-bold text-[#6366F1] mb-5">{String(item.category || '')}</p>
                <h4 className="text-sm md:text-3xl font-heading font-bold text-white flex items-center gap-2 md:gap-6 italic tracking-tighter leading-none uppercase">Details <ArrowUpRight size={28} className="hidden md:inline" /></h4>
              </div>
            </div>
          ))}
          {filteredItems.length === 0 && (
            <div className="col-span-full py-64 text-center border-2 border-dashed border-white/5 rounded-[6rem] opacity-20">
              <Sparkles size={100} className="mx-auto mb-10" />
              <p className="font-heading italic text-4xl tracking-tighter uppercase font-bold">Synchronizing Portfolio...</p>
            </div>
          )}
        </div>
      </section>

      {/* Connect Section */}
      <section id="contact" className="py-48 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="animate-box bg-white text-black rounded-[5rem] md:rounded-[9rem] py-48 md:py-64 px-12 text-center relative overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.6)]">
          <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, #6366F1 2px, transparent 0)', backgroundSize: '40px 40px'}} />
          <span className="text-[11px] uppercase font-bold tracking-[1em] text-gray-400 mb-14 block uppercase">Available Worldwide</span>
          <h2 className="text-[clamp(4.5rem,11.5vw,18rem)] font-heading font-black mb-24 tracking-tighter uppercase leading-[0.8] text-[#02050A]">Connect.</h2>
          <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
            <a href={`mailto:${profile.email}`} className="bg-[#02050A] text-white px-20 py-8 rounded-[2.5rem] font-bold text-xl flex items-center gap-8 hover:scale-105 transition-all shadow-2xl shadow-black/20">
              <Mail size={28} /> EMail
            </a>
            <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" className="bg-[#6366F1] text-white px-20 py-8 rounded-[2.5rem] font-bold text-xl flex items-center gap-8 hover:bg-[#4F46E5] transition-all shadow-2xl shadow-[#6366F1]/20">
              <MessageCircle size={28} /> whstapp
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-36 px-6 md:px-12 border-t border-white/5 text-center">
        <span className="text-5xl font-heading font-black uppercase tracking-tighter text-white mb-8 block leading-none">{profile.name}</span>
        <div className="flex justify-center gap-14 text-[11px] font-bold uppercase tracking-[0.4em] text-gray-600 uppercase">
          <a href="#" className="hover:text-[#6366F1] transition-colors">LinkedIn</a>
          <a href="#" className="hover:text-[#6366F1] transition-colors">Instagram</a>
          <a href="#" className="hover:text-[#6366F1] transition-colors">WhatsApp</a>
        </div>
      </footer>

      {/* Secret Auth Modal */}
      {authModal && (
        <div className="fixed inset-0 z-[1000] bg-black/98 backdrop-blur-3xl flex items-center justify-center p-6 text-center">
          <div className="bg-[#0F1218] p-16 md:p-28 rounded-[5rem] border border-white/10 max-w-lg w-full shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center mb-14">
              <h3 className="text-3xl font-heading font-bold uppercase tracking-tight text-white">Access Key</h3>
              <button onClick={() => setAuthModal(false)} className="text-white hover:rotate-90 transition-transform"><X size={40}/></button>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); if (passcode === 'DESIGN2026') { setView('admin'); setAuthModal(false); setPasscode(''); } }}>
              <input autoFocus type="password" placeholder="••••" className="w-full bg-black border border-white/10 p-10 rounded-3xl text-center text-6xl tracking-[0.8em] text-white outline-none focus:border-[#6366F1] transition-all" value={passcode} onChange={e => setPasscode(e.target.value)} />
              <button type="submit" className="w-full bg-[#6366F1] text-white py-8 rounded-3xl font-bold text-3xl mt-14 shadow-xl">Authorize Identity</button>
            </form>
          </div>
        </div>
      )}

      {/* Admin Dashboard */}
      {view === 'admin' && user && (
        <AdminDashboard 
          items={items} categories={categories} profile={profile}
          onAdd={async (p) => await addDoc(collection(db, 'artifacts', appId, 'public', 'data', 'gallery'), { ...p, timestamp: Date.now() })}
          onDelete={async (id) => await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'gallery', id))}
          onAddCategory={async (n) => await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'categories', n.toLowerCase()), { name: n })}
          onDeleteCategory={async (n) => await deleteDoc(doc(db, 'artifacts', appId, 'public', 'data', 'categories', n.toLowerCase()))}
          onUpdateProfile={async (d) => await setDoc(doc(db, 'artifacts', appId, 'public', 'data', 'profile', 'main'), d)}
          onExit={() => setView('public')}
        />
      )}
    </div>
  );
}
