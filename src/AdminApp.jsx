import React, { useState, useEffect } from 'react';
import { LayoutDashboard, ShoppingCart, Package, Users, Settings, LogOut, Bell, Search, X, User, Phone, Calendar, Clock, FileText, Cake, Palette, CheckCircle2, MessageCircle, Trash2, Sparkles, TrendingUp, Plus, ChevronLeft, ChevronRight, Edit3, Save, Image as ImageIcon, Upload, Mail } from 'lucide-react';
import { supabase } from './supabase';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import './AdminApp.css';

const WhatsAppIcon = ({ size = 16, ...props }) => (
  <svg 
    viewBox="0 0 24 24" 
    width={size} 
    height={size} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.353-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.446 4.432-9.877 9.881-9.877 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.448-4.435 9.878-9.883 9.878m0-21.867C6.435.056.1.493.1 12.226c0 2.124.549 4.198 1.595 6.037L0 24l5.893-1.547a12.19 12.19 0 005.77 1.468h.005c6.12 0 12.1-5.437 12.1-12.226 0-3.27-1.272-6.342-3.582-8.652A12.134 12.134 0 0012.051.055z"/>
  </svg>
);

// Default featured images
import brownieImg from './assets/brownies_box.png';
import cupcakeImg from './assets/cupcake4.png';
import cakeImg from './assets/roundcake1.png';

const isSupabaseLive = supabase && import.meta.env.VITE_SUPABASE_URL && !import.meta.env.VITE_SUPABASE_URL.includes('xrcypnyewxnsnjwsixot');

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [activeOrderItemIndex, setActiveOrderItemIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [classBookings, setClassBookings] = useState([
    { id: 'CB-001', name: 'Olivia Smith', email: 'olivia.smith@example.com', phone: '+356 7912 3456', date: '2026-05-15', guests: 4, status: 'confirmed' },
    { id: 'CB-002', name: 'James Wilson', email: 'j.wilson@gmail.com', phone: '+356 9988 7766', date: '2026-05-22', guests: 2, status: 'pending' },
    { id: 'CB-003', name: 'Sarah Parker', email: 'sparker@outlook.com', phone: '+356 7700 1122', date: '2026-05-28', guests: 12, status: 'pending' },
  ]);
  const [mailModal, setMailModal] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const formattedDate = currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' });

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingCart },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'classes', label: 'Classes', icon: Calendar },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const recentActivities = [
    { id: 'ACT-001', action: 'New Order Placed', target: 'Emma Thompson', time: '10 mins ago', status: 'pending' },
    { id: 'ACT-002', action: 'Customer Registered', target: 'Liam Davies', time: '1 hour ago', status: 'completed' },
    { id: 'ACT-003', action: 'Product Stock Updated', target: 'Red Velvet Cake', time: '3 hours ago', status: 'processing' },
    { id: 'ACT-004', action: 'Review Submitted', target: 'Sophia Rossi', time: '1 day ago', status: 'completed' },
  ];

  const [allProducts, setAllProducts] = useState([
    { id: 101, name: '2 Layer 6 inch', price: '€45.00', status: 'In Stock', flavours: ['Chocolate', 'Vanilla'], spreads: ['Nutella', 'Caramel'] },
    { id: 102, name: '2 Layer 8 inch', price: '€65.00', status: 'In Stock', flavours: ['Chocolate', 'Vanilla'], spreads: ['Nutella', 'Caramel'] },
    { id: 103, name: '3 Layer', price: '€85.00', status: 'In Stock', flavours: ['Chocolate', 'Vanilla'], spreads: ['Nutella', 'Caramel'] },
    { id: 201, name: 'Box of 6 Cupcakes', price: '€18.00', status: 'In Stock', flavours: ['Chocolate', 'Vanilla'], spreads: ['Nutella', 'Caramel'] },
    { id: 202, name: 'Box of 12 Cupcakes', price: '€31.20', status: 'In Stock', flavours: ['Chocolate', 'Vanilla'], spreads: ['Nutella', 'Caramel'] },
    { id: 3, name: 'Cake Pops', price: '€1.70', status: 'In Stock', flavours: ['Chocolate'], spreads: [] },
    { id: 401, name: 'Box of 5 Cakesicles', price: '€17.00', status: 'In Stock', flavours: ['Chocolate'], spreads: [] },
    { id: 402, name: 'Box of 10 Cakesicles', price: '€29.00', status: 'In Stock', flavours: ['Chocolate'], spreads: [] },
    { id: 5, name: 'Breakable Heart', price: '€37.00', status: 'In Stock', flavours: [], spreads: [] },
    { id: 6, name: 'Brownies', price: '€32.00', status: 'In Stock', flavours: ['Double Choc'], spreads: [] },
    { id: 999, name: 'Custom Creation', price: 'Quote', status: 'In Stock', flavours: [], spreads: [] }
  ]);

  const [editingProduct, setEditingProduct] = useState(null);

  const adminCustomers = [
    { id: 'CUST-008', name: 'Olivia Smith', phone: '+1 555-0198', lastOrderValue: '€112.50', lastEngagement: '2 hrs ago', source: 'Instagram Menu', status: 'High Intent' },
    { id: 'CUST-007', name: 'Noah Johnson', phone: '+1 555-0200', lastOrderValue: '€35.00', lastEngagement: '5 hrs ago', source: 'Direct Search', status: 'First-time' },
    { id: 'CUST-006', name: 'William Brown', phone: '+44 7700 900077', lastOrderValue: '€48.00', lastEngagement: '1 day ago', source: 'WhatsApp Promo', status: 'Repeat Buyer' },
    { id: 'CUST-005', name: 'Emma Thompson', phone: '+1 555-0322', lastOrderValue: '€45.00', lastEngagement: '1 day ago', source: 'Website Link', status: 'Repeat Buyer' },
    { id: 'CUST-004', name: 'Liam Davies', phone: '+1 555-0100', lastOrderValue: '€18.00', lastEngagement: '2 days ago', source: 'Referral', status: 'First-time' },
    { id: 'CUST-003', name: 'Sophia Rossi', phone: '+39 333 444 5555', lastOrderValue: '€65.00', lastEngagement: '3 days ago', source: 'Instagram Menu', status: 'VIP' },
    { id: 'CUST-002', name: 'Lucas Ali', phone: '+1 555-9892', lastOrderValue: '€24.50', lastEngagement: '4 days ago', source: 'Website Link', status: 'First-time' },
    { id: 'CUST-001', name: 'Isabella King', phone: '+1 555-7788', lastOrderValue: '€85.00', lastEngagement: '1 week ago', source: 'WhatsApp Promo', status: 'VIP' }
  ];

  const engagementData = [
    { name: 'Mon', engagements: 40 },
    { name: 'Tue', engagements: 65 },
    { name: 'Wed', engagements: 45 },
    { name: 'Thu', engagements: 80 },
    { name: 'Fri', engagements: 55 },
    { name: 'Sat', engagements: 100 },
    { name: 'Sun', engagements: 85 },
  ];

  const [allOrders, setAllOrders] = useState([
    { id: 'ORD-1045', customer: 'Olivia Smith', date: '2026-04-18', total: '€112.50', status: 'pending', details: { whatsapp: '+1 555-0198', pickupDate: '2026-04-25', pickupPeriod: 'Morning', pickupNotes: 'Will be sending my husband.', itemType: 'Custom Cake', quantity: 1, occasion: 'Birthday', theme: 'Pastel Pink & Gold', guests: '20', flavor: 'Vanilla Bean & Raspberry', referenceImages: ['https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80', 'https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80'] } },
    { 
      id: 'ORD-1046', 
      customer: 'Sxn Coder', 
      date: '2026-04-19', 
      total: '€55.20', 
      status: 'pending', 
      details: { 
        whatsapp: '+1 555-9999', 
        pickupDate: '2026-04-30', 
        pickupPeriod: 'Morning', 
        pickupNotes: 'Multi-item order test.',
        items: [
          { 
            itemType: 'Standard Cake', 
            quantity: 1, 
            flavor: 'Chocolate', 
            price: '€45.00',
            occasion: 'Birthday',
            productImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80',
            referenceImages: ['https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80']
          },
          { 
            itemType: 'Box of 6 Cupcakes', 
            quantity: 2, 
            flavor: 'Vanilla & Oreo', 
            price: '€10.20',
            productImage: 'https://images.unsplash.com/photo-1614707267537-b85af00c4b81?w=500&q=80',
            referenceImages: []
          }
        ]
      } 
    },
    { id: 'ORD-1044', customer: 'Noah Johnson', date: '2026-04-18', total: '€35.00', status: 'pending', details: { whatsapp: '+1 555-0200', pickupDate: '2026-04-20', pickupPeriod: 'Evening', pickupNotes: '', itemType: 'Standard Cake', quantity: 1, flavor: 'Chocolate Fudge', referenceImages: null } },
    { id: 'ORD-1043', customer: 'William Brown', date: '2026-04-18', total: '€48.00', status: 'processing', details: { whatsapp: '+44 7700 900077', pickupDate: '2026-04-21', pickupPeriod: 'Afternoon', pickupNotes: 'Please text when ready.', itemType: 'Standard Cake', quantity: 1, flavor: 'Red Velvet', referenceImages: ['https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&q=80'] } },
    { id: 'ORD-1042', customer: 'Emma Thompson', date: '2026-04-18', total: '€45.00', status: 'processing', details: { whatsapp: '+1 555-0322', pickupDate: '2026-04-19', pickupPeriod: 'Morning', pickupNotes: '', itemType: 'Standard Cake', quantity: 1, flavor: 'Lemon Blueberry', referenceImages: null } },
    { id: 'ORD-1041', customer: 'Liam Davies', date: '2026-04-18', total: '€18.00', status: 'completed', details: { whatsapp: '+1 555-0100', pickupDate: '2026-04-18', pickupPeriod: 'Afternoon', pickupNotes: '', itemType: 'Assortment Box', quantity: 2, flavor: 'Mini Cupcakes Assorted', referenceImages: null } },
    { id: 'ORD-1040', customer: 'Sophia Rossi', date: '2026-04-17', total: '€65.00', status: 'completed', details: { whatsapp: '+39 333 444 5555', pickupDate: '2026-04-17', pickupPeriod: 'Evening', pickupNotes: '', itemType: 'Custom Cake', quantity: 1, occasion: 'Anniversary', theme: 'Coffee Lover', guests: '10', flavor: 'Caramel Macchiato', referenceImages: null } },
    { id: 'ORD-1039', customer: 'Lucas Ali', date: '2026-04-17', total: '€24.50', status: 'completed', details: { whatsapp: '+1 555-9892', pickupDate: '2026-04-17', pickupPeriod: 'Morning', pickupNotes: '', itemType: 'Cupcakes', quantity: 3, flavor: 'Strawberry Shortcake', referenceImages: null } },
    { id: 'ORD-1038', customer: 'Isabella King', date: '2026-04-16', total: '€85.00', status: 'completed', details: { whatsapp: '+1 555-7788', pickupDate: '2026-04-16', pickupPeriod: 'Afternoon', pickupNotes: 'Handle with care!', itemType: 'Custom Cake', quantity: 1, occasion: 'Wedding Shower', theme: 'Modern Vintage', guests: '30', flavor: 'Matcha Green Tea', referenceImages: ['https://images.unsplash.com/photo-1535141192574-5d4897c12636?w=500&q=80', 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80', 'https://images.unsplash.com/photo-1616541823729-00fe0aacd32c?w=500&q=80'] } },
  ]);

  const [bookedDates, setBookedDates] = useState([]);
  const [viewDate, setViewDate] = useState(new Date());

  // Fetch booked dates from Supabase
  useEffect(() => {
    const fetchBookedDates = async () => {
      if (!isSupabaseLive) {
        console.log('Booked dates: Offline Mode');
        setBookedDates(['2026-05-15', '2026-05-22', '2026-05-28']);
        return;
      }
      try {
        const { data, error } = await supabase
          .from('booked_dates')
          .select('date');
        
        if (error) {
           if (error.message?.includes('fetch') || error.code === 'PGRST301') return;
           throw error;
        }
        if (data) {
          setBookedDates(data.map(d => d.date));
        }
      } catch (err) {
        // Silent fail for network issues
        if (!err.message?.includes('fetch')) {
          console.error('Error fetching booked dates:', err);
        }
        // Fallback for demo
        setBookedDates(['2026-05-15', '2026-05-22', '2026-05-28']);
      }
    };

    fetchBookedDates();
  }, []);

  const toggleDate = async (dateStr) => {
    const isBooked = bookedDates.includes(dateStr);
    
    try {
      if (isBooked) {
        // Remove from DB
        const { error } = await supabase
          .from('booked_dates')
          .delete()
          .match({ date: dateStr });
        
        if (error && !error.message?.includes('fetch')) throw error;
        setBookedDates(prev => prev.filter(d => d !== dateStr));
      } else {
        // Add to DB
        const { error } = await supabase
          .from('booked_dates')
          .insert([{ date: dateStr }]);
        
        if (error && !error.message?.includes('fetch')) throw error;
        setBookedDates(prev => [...prev, dateStr]);
      }
    } catch (err) {
      if (!err.message?.includes('fetch')) {
        console.error('Error updating date:', err);
      }
      // Local fallback for demo
      if (isBooked) setBookedDates(prev => prev.filter(d => d !== dateStr));
      else setBookedDates(prev => [...prev, dateStr]);
    }
  };

  const [featuredDesserts, setFeaturedDesserts] = useState([
    { slot: 1, name: 'Brownie Selection', price: 'Starting €xx', description: 'Our most popular brownie assortment, baked fresh daily with premium chocolate.', img: brownieImg, highlights: [], isEmpty: false },
    { slot: 2, name: 'Signature Cupcakes', price: 'Starting €xx', description: 'A curated selection of our most loved cupcake flavors, perfect for any occasion.', img: cupcakeImg, highlights: [], isEmpty: false },
    { slot: 3, name: 'Best Seller cake', price: 'Starting €xx', description: 'Our signature masterpiece cake, loved by everyone for its perfect balance of flavor.', img: cakeImg, highlights: [], isEmpty: false },
  ]);
  const [editingFeatured, setEditingFeatured] = useState(null);
  const [highlightModal, setHighlightModal] = useState(null); // { slot: 1 } or null
  const [imageModal, setImageModal] = useState(null); // { slot: 1 } or null
  const [newHighlight, setNewHighlight] = useState({ title: '', text: '' });
  const [newImageUrl, setNewImageUrl] = useState('');

  // Fetch featured items from Supabase
  useEffect(() => {
    const fetchFeatured = async () => {
      if (!isSupabaseLive) {
        console.log('Featured items: Offline Mode');
        return;
      }
      try {
        const { data, error } = await supabase
          .from('featured_items')
          .select('*')
          .order('slot');
        
        if (error) {
          // If network error (likely missing backend), fail silently and use defaults
          if (error.message?.includes('fetch')) {
             console.log('Using local featured items (Supabase not connected)');
             return;
          }
          throw error;
        }
        if (data && data.length === 3) {
          setFeaturedDesserts(data);
        }
      } catch (err) {
        // Only log serious errors, not network resolution issues
        if (!err.message?.includes('fetch')) {
          console.error('Error fetching featured items:', err);
        }
      }
    };

    fetchFeatured();
  }, []);

  const handleUpdateFeatured = async (slot, updatedItem) => {
    try {
      const { error } = await supabase
        .from('featured_items')
        .upsert({ ...updatedItem, slot });
      
      if (error && !error.message?.includes('fetch')) throw error;
      
      setFeaturedDesserts(prev => prev.map(item => 
        item.slot === slot ? updatedItem : item
      ));
      setEditingFeatured(null);
      if (!error) alert('Featured item updated successfully!');
    } catch (err) {
      if (!err.message?.includes('fetch')) {
        console.error('Error saving featured item:', err);
      }
      // Fallback update local state for demo
      setFeaturedDesserts(prev => prev.map(item => 
        item.slot === slot ? updatedItem : item
      ));
      setEditingFeatured(null);
    }
  };

  const handleUpdateProduct = (id, updatedData) => {
    setAllProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
    setEditingProduct(null);
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    setAllOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSelectedOrder(prev => ({ ...prev, status: newStatus }));
  };

  const filteredOrders = orderStatusFilter === 'all' 
    ? allOrders 
    : allOrders.filter(o => o.status === orderStatusFilter);


  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          minibakes <span style={{fontSize: '12px', color: '#666', fontFamily: 'sans-serif', fontWeight: 'normal', letterSpacing: '1px'}}>ADMIN</span>
        </div>
        <nav className="admin-nav">
          {navItems.map(item => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`admin-nav-item ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <Icon size={20} />
                {item.label}
              </button>
            )
          })}
        </nav>
        <div style={{ marginTop: 'auto', padding: '0 16px' }}>
            <button className="admin-nav-item" style={{ width: '100%', color: '#666' }} onClick={() => window.location.href = '/'}>
              <LogOut size={20} />
              Exit Admin
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Header */}
        <header className="admin-header">
          <div className="admin-header-title">
            {navItems.find(i => i.id === activeTab)?.label}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            {activeTab === 'orders' && (
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center', backgroundColor: '#f1f3f5', borderRadius: '8px', padding: '8px 12px' }}>
                  <Search size={16} color="#888" style={{ marginRight: '8px' }} />
                  <input type="text" placeholder="Search orders..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '14px' }} />
              </div>
            )}
            <button 
              onClick={() => setShowNotifications(true)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#666', position: 'relative' }}
            >
                <Bell size={20} />
                <span style={{ position: 'absolute', top: '-4px', right: '-4px', width: '8px', height: '8px', background: '#ff4d4d', borderRadius: '50%', border: '2px solid #fff' }}></span>
            </button>
            <div className="admin-user-profile">
              <div className="admin-avatar">A</div>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>Admin User</span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="admin-content">
          {activeTab === 'dashboard' && (
            <>
              <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #e9ecef', paddingBottom: '20px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '600', color: '#1a1a1a', margin: '0 0 6px 0' }}>
                    Welcome back, Megan
                  </h1>
                  <p style={{ color: '#666', margin: '0', fontSize: '14px' }}>
                    Here is a comprehensive overview of your store's performance today.
                  </p>
                </div>
                <div style={{ textAlign: 'right', fontSize: '13px', background: '#f8f9fa', padding: '10px 16px', borderRadius: '8px', border: '1px solid #e9ecef' }}>
                  <div style={{ fontWeight: '600', color: '#333', marginBottom: '2px' }}>{formattedDate}</div>
                  <div style={{ color: '#666', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
                    <span style={{ display: 'inline-block', width: '6px', height: '6px', backgroundColor: '#2E7D32', borderRadius: '50%' }}></span>
                    System Time: {formattedTime}
                  </div>
                </div>
              </div>

              <div className="metrics-grid">
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#E3F2FD', color: '#1565C0'}}><ShoppingCart size={24} /></div>
                  <div className="metric-info">
                    <h3>Total Orders</h3>
                    <p>1,284</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#F3E5F5', color: '#7B1FA2'}}><Users size={24} /></div>
                  <div className="metric-info">
                    <h3>Total Visitors</h3>
                    <p>8,402</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#FFF8E1', color: '#F57F17'}}><Package size={24} /></div>
                  <div className="metric-info">
                    <h3>Total Products</h3>
                    <p>42</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#E8F5E9', color: '#2E7D32'}}><LayoutDashboard size={24} /></div>
                  <div className="metric-info">
                    <h3>Total Earnings</h3>
                    <p>€14,520</p>
                  </div>
                </div>
              </div>

              <div className="admin-panel">
                <h2 className="admin-panel-title">Recent Activity</h2>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Activity ID</th>
                      <th>Action</th>
                      <th>Target</th>
                      <th>Time</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentActivities.map(activity => (
                      <tr key={activity.id}>
                        <td style={{fontWeight: '600', color: '#888'}}>{activity.id}</td>
                        <td style={{fontWeight: '500'}}>{activity.action}</td>
                        <td>{activity.target}</td>
                        <td style={{color: '#666'}}>{activity.time}</td>
                        <td>
                          <span className={`status-badge ${activity.status}`}>
                            {activity.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}

          {activeTab === 'orders' && (
            <div className="admin-panel" style={{ minHeight: '600px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
                <h2 className="admin-panel-title" style={{ margin: 0, border: 'none', padding: 0 }}>Orders Management</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {['all', 'pending', 'processing', 'completed'].map(status => (
                    <button 
                      key={status}
                      onClick={() => setOrderStatusFilter(status)}
                      style={{
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: orderStatusFilter === status ? 'var(--color-main, #800000)' : '#e9ecef',
                        backgroundColor: orderStatusFilter === status ? '#FFF0F4' : '#fff',
                        color: orderStatusFilter === status ? 'var(--color-main, #800000)' : '#666',
                        fontWeight: orderStatusFilter === status ? '600' : '500',
                        cursor: 'pointer',
                        textTransform: 'capitalize',
                        transition: '0.2s'
                      }}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Date</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.length > 0 ? filteredOrders.map(order => (
                    <tr key={order.id}>
                      <td style={{fontWeight: '600'}}>{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.date}</td>
                      <td style={{fontWeight: '600'}}>{order.total}</td>
                      <td>
                        <span className={`status-badge ${order.status}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>
                        <button onClick={() => { setSelectedOrder(order); setActiveOrderItemIndex(0); }} style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer', fontSize: '12px' }}>View</button>
                      </td>
                    </tr>
                  )) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#888' }}>No {orderStatusFilter !== 'all' ? orderStatusFilter : ''} orders found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'products' && (
            <div className="admin-panel" style={{ minHeight: '600px' }}>
              {/* Featured Section */}
              <div style={{ marginBottom: '40px', background: '#fff9fa', padding: '24px', borderRadius: '16px', border: '1px solid #ffebee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div>
                    <h2 style={{ margin: 0, fontSize: '20px', color: '#800000', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={20} /> Home Page Featured Desserts
                    </h2>
                    <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0 0' }}>Manage the three main highlight cards on your home page.</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                  {featuredDesserts.map((item) => (
                    <div key={item.slot} className="premium-card" style={{ padding: 0, border: editingFeatured === item.slot ? '2px solid #800000' : '1px solid #eee', position: 'relative', overflow: 'hidden', minHeight: '520px', display: 'flex', flexDirection: 'column' }}>
                      
                      {/* View Mode Layer */}
                      <div style={{ 
                        padding: '16px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '100%',
                        width: '100%',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.4s ease',
                        transform: editingFeatured === item.slot ? 'translateY(-100%)' : 'translateY(0)',
                        opacity: editingFeatured === item.slot ? 0 : 1,
                        position: editingFeatured === item.slot ? 'absolute' : 'relative',
                        zIndex: editingFeatured === item.slot ? 0 : 1,
                        pointerEvents: editingFeatured === item.slot ? 'none' : 'auto'
                      }}>
                        <div style={{ width: '100%', aspectRatio: '1.2', borderRadius: '8px', background: '#f8f9fa', marginBottom: '12px', overflow: 'hidden', position: 'relative' }}>
                          {item.isEmpty ? (
                            <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#ccc', gap: '8px' }}>
                              <Package size={40} opacity={0.3} />
                              <span style={{ fontSize: '12px', fontWeight: 'bold' }}>EMPTY SLOT</span>
                            </div>
                          ) : (
                            <img src={item.img} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          )}
                          <div style={{ position: 'absolute', top: '8px', right: '8px', background: '#800000', color: '#fff', padding: '4px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 'bold' }}>SLOT {item.slot}</div>
                          
                          {!item.isEmpty && (
                            <button 
                              onClick={() => setImageModal({ slot: item.slot, currentImg: item.img })}
                              style={{ position: 'absolute', bottom: '8px', right: '8px', background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                              title="Change Image"
                            >
                              <ImageIcon size={14} color="#666" />
                            </button>
                          )}
                        </div>
                        
                        <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', opacity: item.isEmpty ? 0.3 : 1 }}>{item.isEmpty ? 'New Featured Product' : item.name}</h3>
                        
                        <p style={{ margin: '0 0 8px 0', color: '#800000', fontWeight: 'bold', fontSize: '14px', opacity: item.isEmpty ? 0.3 : 1 }}>{item.isEmpty ? 'Price Label' : item.price}</p>
                        <p style={{ margin: '0 0 16px 0', fontSize: '12px', color: '#666', lineHeight: '1.4', minHeight: '3.2em', opacity: item.isEmpty ? 0.3 : 1 }}>
                          {item.isEmpty ? 'Add a description for your new featured highlight...' : item.description}
                        </p>
                        
                        <div style={{ marginBottom: '16px', opacity: item.isEmpty ? 0.3 : 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                             <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>HIGHLIGHTS</span>
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                             {!item.isEmpty && item.highlights && item.highlights.map((h, i) => (
                               <div key={i} style={{ padding: '8px', background: '#fcfcfc', border: '1px solid #eee', borderRadius: '6px', position: 'relative' }}>
                                 <div style={{ fontSize: '11px', fontWeight: '700', color: '#333', marginBottom: '2px' }}>{h.title}</div>
                                 <div style={{ fontSize: '10px', color: '#666' }}>{h.text}</div>
                                 <button 
                                   onClick={() => {
                                     const updated = { ...item, highlights: item.highlights.filter((_, idx) => idx !== i) };
                                     handleUpdateFeatured(item.slot, updated);
                                   }}
                                   style={{ position: 'absolute', top: '4px', right: '4px', background: 'none', border: 'none', color: '#ccc', cursor: 'pointer' }}
                                 >
                                   <X size={10} />
                                 </button>
                               </div>
                             ))}
                             {(item.isEmpty || !item.highlights || item.highlights.length === 0) && (
                               <p style={{ fontSize: '11px', color: '#aaa', fontStyle: 'italic', margin: 0 }}>No highlights added.</p>
                             )}
                          </div>
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                          <button 
                            onClick={() => {
                              if (item.isEmpty) {
                                handleUpdateFeatured(item.slot, { ...item, isEmpty: false });
                              }
                              setEditingFeatured(item.slot);
                            }}
                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd', background: item.isEmpty ? '#800000' : '#fff', color: item.isEmpty ? '#fff' : '#333', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '13px', fontWeight: item.isEmpty ? 'bold' : '500' }}
                          >
                            {item.isEmpty ? <Plus size={14} /> : <Edit3 size={14} />} {item.isEmpty ? 'Add Product' : 'Edit Basics'}
                          </button>
                          
                          {!item.isEmpty && (
                            <button 
                              onClick={() => {
                                if (confirm('Are you sure you want to clear this featured slot?')) {
                                  handleUpdateFeatured(item.slot, { ...item, isEmpty: true });
                                }
                              }}
                              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ffebee', background: '#fffcfc', color: '#ff4d4d', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                              title="Remove from featured"
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Edit Mode Layer */}
                      <div style={{ 
                        padding: '16px',
                        display: 'flex', 
                        flexDirection: 'column', 
                        height: '100%',
                        width: '100%',
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease',
                        transform: editingFeatured === item.slot ? 'translateY(0)' : 'translateY(100%)',
                        opacity: editingFeatured === item.slot ? 1 : 0,
                        position: editingFeatured === item.slot ? 'relative' : 'absolute',
                        top: 0, left: 0,
                        zIndex: editingFeatured === item.slot ? 1 : 0,
                        pointerEvents: editingFeatured === item.slot ? 'auto' : 'none'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                          <div className="form-group">
                            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>NAME</label>
                            <input 
                              type="text" 
                              defaultValue={item.name} 
                              id={`name-${item.slot}`}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>PRICE TEXT</label>
                            <input 
                              type="text" 
                              defaultValue={item.price} 
                              id={`price-${item.slot}`}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd' }}
                            />
                          </div>
                          <div className="form-group">
                            <label style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>DESCRIPTION</label>
                            <textarea 
                              defaultValue={item.description} 
                              id={`desc-${item.slot}`}
                              style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #ddd', minHeight: '60px' }}
                            />
                          </div>

                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                               <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#888' }}>HIGHLIGHTS</span>
                               <button 
                                 onClick={(e) => {
                                   e.stopPropagation();
                                   setHighlightModal({ slot: item.slot });
                                 }}
                                 style={{ background: '#FFF0F4', border: 'none', color: '#800000', borderRadius: '4px', padding: '2px 6px', fontSize: '10px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                               >
                                 <Plus size={10} /> Add
                               </button>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '100px', overflowY: 'auto' }}>
                               {item.highlights && item.highlights.map((h, i) => (
                                 <div key={i} style={{ fontSize: '10px', color: '#666', background: '#f9f9f9', padding: '4px 8px', borderRadius: '4px', border: '1px solid #eee', display: 'flex', justifyContent: 'space-between' }}>
                                   <span>{h.title}</span>
                                   <button 
                                     onClick={() => {
                                       const updated = { ...item, highlights: item.highlights.filter((_, idx) => idx !== i) };
                                       handleUpdateFeatured(item.slot, updated);
                                     }}
                                     style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', padding: 0 }}
                                   >
                                     <X size={10} />
                                   </button>
                                 </div>
                               ))}
                            </div>
                          </div>
                          
                          <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                            <button 
                              onClick={() => {
                                const updated = {
                                  ...item,
                                  name: document.getElementById(`name-${item.slot}`).value,
                                  price: document.getElementById(`price-${item.slot}`).value,
                                  description: document.getElementById(`desc-${item.slot}`).value,
                                };
                                handleUpdateFeatured(item.slot, updated);
                              }}
                              style={{ flex: 1, padding: '8px', borderRadius: '6px', background: '#800000', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontWeight: '600' }}
                            >
                              <Save size={14} /> Save
                            </button>
                            <button 
                              onClick={() => setEditingFeatured(null)}
                              style={{ padding: '8px 12px', borderRadius: '6px', background: '#f5f5f5', border: '1px solid #ddd', cursor: 'pointer' }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
                <h2 className="admin-panel-title" style={{ margin: 0, border: 'none', padding: 0 }}>All Products</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                {allProducts.map(product => (
                  <div key={product.id} style={{ height: '240px', position: 'relative' }}>
                    <div className="premium-card" style={{ 
                      position: 'absolute',
                      top: 0, left: 0, right: 0,
                      height: editingProduct === product.id ? '450px' : '100%',
                      zIndex: editingProduct === product.id ? 50 : 1,
                      padding: '20px', 
                      border: editingProduct === product.id ? '2px solid #800000' : '1px solid #e9ecef', 
                      borderRadius: '12px', 
                      boxShadow: editingProduct === product.id ? '0 12px 30px rgba(0,0,0,0.15)' : '0 2px 8px rgba(0,0,0,0.02)',
                      background: '#fff',
                      transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      overflow: 'hidden',
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      {/* VIEW STATE LAYER */}
                      <div style={{
                        transition: 'all 0.5s ease-in-out',
                        transform: editingProduct === product.id ? 'translateY(-100%)' : 'translateY(0)',
                        opacity: editingProduct === product.id ? 0 : 1,
                        height: editingProduct === product.id ? 0 : '100%',
                        pointerEvents: editingProduct === product.id ? 'none' : 'auto',
                        display: 'flex',
                        flexDirection: 'column'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                           <h3 style={{ margin: 0, fontSize: '16px', color: '#111', fontWeight: '700' }}>{product.name}</h3>
                           <span className={`status-badge ${product.status === 'In Stock' ? 'completed' : 'cancelled'}`} style={{ fontSize: '10px', padding: '2px 8px', borderRadius: '12px' }}>{product.status}</span>
                        </div>
                        
                        <div style={{ color: 'var(--color-main)', fontWeight: '700', fontSize: '15px', marginBottom: '12px' }}>{product.price}</div>
                        
                        {product.flavours && product.flavours.length > 0 && (
                          <div style={{ marginBottom: '8px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#888', marginBottom: '4px' }}>FLAVOURS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {product.flavours.slice(0, 3).map((f, idx) => (
                                <span key={idx} style={{ fontSize: '10px', padding: '2px 6px', background: '#f5f5f5', borderRadius: '4px', color: '#666' }}>{f}</span>
                              ))}
                              {product.flavours.length > 3 && <span style={{ fontSize: '10px', color: '#999' }}>+{product.flavours.length - 3} more</span>}
                            </div>
                          </div>
                        )}

                        {product.spreads && product.spreads.length > 0 && (
                          <div style={{ marginBottom: '16px' }}>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#888', marginBottom: '4px' }}>SPREADS</div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                              {product.spreads.slice(0, 2).map((s, idx) => (
                                <span key={idx} style={{ fontSize: '10px', padding: '2px 6px', background: '#fff9fa', borderRadius: '4px', color: '#800000', border: '1px solid #ffebee' }}>{s}</span>
                              ))}
                              {product.spreads.length > 2 && <span style={{ fontSize: '10px', color: '#999' }}>+{product.spreads.length - 2} more</span>}
                            </div>
                          </div>
                        )}

                        <div style={{ marginTop: 'auto', display: 'flex', gap: '8px' }}>
                          <button 
                            onClick={() => setEditingProduct(product.id)}
                            style={{ flex: 1, padding: '8px', borderRadius: '6px', border: '1px solid #ddd', background: '#fff', color: '#333', cursor: 'pointer', fontSize: '13px', fontWeight: '500', transition: '0.2s' }}
                          >
                            Edit Item
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm('Delete this product?')) {
                                setAllProducts(prev => prev.filter(p => p.id !== product.id));
                              }
                            }}
                            style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #ffcdd2', background: '#fffcfc', color: '#c62828', cursor: 'pointer', transition: '0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                            title="Delete Product"
                          >
                             <Trash2 size={16} />
                          </button>
                        </div>
                      </div>

                      {/* EDIT STATE LAYER */}
                      <div style={{
                        transition: 'all 0.5s ease-in-out',
                        transform: editingProduct === product.id ? 'translateY(0)' : 'translateY(100px)',
                        opacity: editingProduct === product.id ? 1 : 0,
                        height: editingProduct === product.id ? '100%' : 0,
                        pointerEvents: editingProduct === product.id ? 'auto' : 'none',
                        display: editingProduct === product.id ? 'flex' : 'none',
                        flexDirection: 'column',
                        gap: '12px'
                      }}>
                         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#800000', marginBottom: '4px' }}>
                            <Edit3 size={16} />
                            <span style={{ fontWeight: '700', fontSize: '14px' }}>Edit Product Details</span>
                         </div>
                         
                         <div>
                            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888' }}>NAME</label>
                            <input 
                              type="text" 
                              defaultValue={product.name} 
                              id={`edit-p-name-${product.id}`}
                              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                            />
                         </div>
                         
                         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                           <div>
                              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888' }}>PRICE</label>
                              <input 
                                type="text" 
                                defaultValue={product.price} 
                                id={`edit-p-price-${product.id}`}
                                style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                              />
                           </div>
                           <div>
                              <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888' }}>STATUS</label>
                              <select 
                                defaultValue={product.status} 
                                id={`edit-p-status-${product.id}`}
                                style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd' }}
                              >
                                <option value="In Stock">In Stock</option>
                                <option value="Out of Stock">Out of Stock</option>
                              </select>
                           </div>
                         </div>
                         
                         <div>
                            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888' }}>FLAVOURS (Comma separated)</label>
                            <textarea 
                              defaultValue={product.flavours?.join(', ')} 
                              id={`edit-p-flavours-${product.id}`}
                              placeholder="e.g. Chocolate, Vanilla"
                              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '50px', resize: 'none' }}
                            />
                         </div>

                         <div>
                            <label style={{ fontSize: '10px', fontWeight: 'bold', color: '#888' }}>SPREADS (Comma separated)</label>
                            <textarea 
                              defaultValue={product.spreads?.join(', ')} 
                              id={`edit-p-spreads-${product.id}`}
                              placeholder="e.g. Nutella, Biscoff"
                              style={{ width: '100%', padding: '6px', borderRadius: '4px', border: '1px solid #ddd', minHeight: '50px', resize: 'none' }}
                            />
                         </div>

                         <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                            <button 
                              onClick={() => {
                                handleUpdateProduct(product.id, {
                                  name: document.getElementById(`edit-p-name-${product.id}`).value,
                                  price: document.getElementById(`edit-p-price-${product.id}`).value,
                                  status: document.getElementById(`edit-p-status-${product.id}`).value,
                                  flavours: document.getElementById(`edit-p-flavours-${product.id}`).value.split(',').map(s => s.trim()).filter(s => s),
                                  spreads: document.getElementById(`edit-p-spreads-${product.id}`).value.split(',').map(s => s.trim()).filter(s => s),
                                });
                              }}
                              style={{ flex: 1, padding: '10px', borderRadius: '6px', background: '#800000', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                            >
                              <Save size={16} /> Save Changes
                            </button>
                            <button 
                              onClick={() => setEditingProduct(null)}
                              style={{ padding: '10px 16px', borderRadius: '6px', background: '#f5f5f5', border: '1px solid #ddd', cursor: 'pointer', fontWeight: '500' }}
                            >
                              Cancel
                            </button>
                         </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'customers' && (
            <div className="admin-panel" style={{ minHeight: '600px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
                <h2 className="admin-panel-title" style={{ margin: 0, border: 'none', padding: 0 }}>Customer Engagement Analytics</h2>
              </div>
              
              <div className="metrics-grid" style={{ marginBottom: '32px' }}>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#e3f2fd', color: '#1565c0'}}><Users size={24} /></div>
                  <div className="metric-info">
                    <h3 style={{ fontSize: '13px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: '600' }}>Unique Engagements (30d)</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '0', color: '#111' }}>842</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#e8f5e9', color: '#2e7d32'}}><MessageCircle size={24} /></div>
                  <div className="metric-info">
                    <h3 style={{ fontSize: '13px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: '600' }}>WhatsApp Conversion</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '0', color: '#111' }}>68%</p>
                  </div>
                </div>
                <div className="metric-card">
                  <div className="metric-icon-box" style={{backgroundColor: '#fff8e1', color: '#f57f17'}}><LayoutDashboard size={24} /></div>
                  <div className="metric-info">
                    <h3 style={{ fontSize: '13px', color: '#666', margin: '0 0 4px 0', textTransform: 'uppercase', fontWeight: '600' }}>Returning Audience (Est.)</h3>
                    <p style={{ fontSize: '24px', fontWeight: '700', margin: '0', color: '#111' }}>32%</p>
                  </div>
                </div>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
                {/* Chart Box */}
                <div className="premium-card" style={{ padding: '24px 24px 12px 24px', border: '1px solid #e9ecef', borderRadius: '12px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                     <TrendingUp size={18} color="var(--color-main)" />
                     <h3 style={{ margin: 0, fontSize: '16px', color: '#333', fontWeight: '600' }}>Weekly Engagement Trends</h3>
                  </div>
                  
                  <div style={{ width: '100%', height: '240px', marginTop: '16px', minWidth: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={engagementData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 13, fontWeight: 500 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#aaa', fontSize: 12 }} />
                        <Tooltip 
                          cursor={{ fill: '#f8f9fa' }}
                          contentStyle={{ borderRadius: '8px', border: '1px solid #eee', boxShadow: '0 4px 12px rgba(0,0,0,0.05)', padding: '12px' }}
                          itemStyle={{ color: 'var(--color-main)', fontWeight: 'bold' }}
                          labelStyle={{ color: '#444', marginBottom: '4px', fontWeight: 'bold' }}
                        />
                        <Bar dataKey="engagements" radius={[6, 6, 0, 0]} maxBarSize={48}>
                          {engagementData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.engagements === 100 ? 'var(--color-main)' : '#ffccd5'} style={{ transition: 'all 0.3s' }} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Insights Box */}
                <div className="premium-card" style={{ padding: '24px', border: '1px solid #e9ecef', borderRadius: '12px', background: '#fff', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                    <Sparkles size={18} color="#f57f17" />
                    <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>Growth Insights</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1 }}>
                    <div style={{ background: '#fff8e1', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #fbc02d', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                      <strong style={{ display: 'block', color: '#f57f17', marginBottom: '6px', fontSize: '14px' }}>Boost Returning Customers</strong>
                      WhatsApp Conversion is at 68%. Try running a weekend promo broadcast to the 32% of inactive contacts to trigger impulsive repurchases.
                    </div>
                    <div style={{ background: '#e3f2fd', padding: '16px', borderRadius: '8px', borderLeft: '4px solid #1976d2', fontSize: '13px', color: '#555', lineHeight: '1.6' }}>
                      <strong style={{ display: 'block', color: '#1565c0', marginBottom: '6px', fontSize: '14px' }}>Peak Acquisition Channel</strong>
                      "Instagram Menu" shares led to the highest 'High Intent' leads this week. Pin your latest reel to maximize this profitable channel.
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, fontSize: '16px', color: '#333' }}>Recent Audience Engagements</h3>
              </div>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer Name</th>
                    <th>Contact Info</th>
                    <th>Acquisition Source</th>
                    <th>Last Order Value</th>
                    <th>Last Engagement</th>
                    <th>Analytics Segment</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {adminCustomers.map(customer => (
                    <tr key={customer.id}>
                      <td style={{fontWeight: '600'}}>{customer.name}</td>
                      <td style={{color: '#555', fontFamily: 'monospace'}}>{customer.phone}</td>
                      <td style={{color: '#555'}}>{customer.source}</td>
                      <td style={{fontWeight: '600', color: 'var(--color-main)'}}>{customer.lastOrderValue}</td>
                      <td style={{color: '#666'}}>{customer.lastEngagement}</td>
                      <td>
                        <span className={`status-badge ${customer.status === 'VIP' ? 'processing' : (customer.status.includes('High') ? 'pending' : 'completed')}`}>
                          {customer.status}
                        </span>
                      </td>
                      <td>
                        <div style={{display: 'flex', gap: '8px'}}>
                           <a href={`https://wa.me/${customer.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #c8e6c9', background: '#e8f5e9', color: '#2e7d32', cursor: 'pointer', fontSize: '13px', fontWeight: '500', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px' }}>
                             <MessageCircle size={14} /> Message
                           </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'classes' && (
            <div className="admin-panel" style={{ minHeight: '600px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', borderBottom: '1px solid #e9ecef', paddingBottom: '16px' }}>
                <div>
                  <h2 className="admin-panel-title" style={{ margin: 0, border: 'none', padding: 0 }}>Cupcake Class Calendar</h2>
                  <p style={{ color: '#666', fontSize: '13px', margin: '4px 0 0 0' }}>Manage available dates for decorating experiences.</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="legend-item" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffccd5' }}></span> Available
                  </div>
                  <div className="legend-item" style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#800000' }}></span> Fully Booked
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '32px', marginBottom: '32px' }}>
                {/* Admin Calendar View */}
                <div className="admin-calendar-card" style={{ background: '#fff', borderRadius: '16px', border: '1px solid #eee', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                      {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1))}
                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', cursor: 'pointer' }}
                      >
                        <ChevronLeft size={20} />
                      </button>
                      <button 
                        onClick={() => setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1))}
                        style={{ padding: '8px', borderRadius: '8px', border: '1px solid #eee', background: '#fff', cursor: 'pointer' }}
                      >
                        <ChevronRight size={20} />
                      </button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                      <div key={d} style={{ fontSize: '12px', fontWeight: '700', color: '#999', textTransform: 'uppercase' }}>{d}</div>
                    ))}
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px' }}>
                    {(() => {
                      const year = viewDate.getFullYear();
                      const month = viewDate.getMonth();
                      const daysInMonth = new Date(year, month + 1, 0).getDate();
                      const firstDay = new Date(year, month, 1).getDay();
                      const grid = [];

                      for (let i = 0; i < firstDay; i++) grid.push(<div key={`empty-${i}`}></div>);

                      for (let d = 1; d <= daysInMonth; d++) {
                        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                        const isBooked = bookedDates.includes(dateStr);
                        const isToday = new Date().toISOString().split('T')[0] === dateStr;

                        grid.push(
                          <button
                            key={d}
                            onClick={() => toggleDate(dateStr)}
                            style={{
                              aspectRatio: '1',
                              borderRadius: '12px',
                              border: isToday ? '2px solid #800000' : '1px solid transparent',
                              background: isBooked ? '#800000' : (isToday ? '#f0f0f0' : '#fff9fa'),
                              color: isBooked ? '#fff' : '#333',
                              fontSize: '14px',
                              fontWeight: '600',
                              cursor: 'pointer',
                              position: 'relative',
                              transition: 'all 0.2s ease',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              boxShadow: isBooked ? '0 4px 10px rgba(128,0,0,0.2)' : 'none'
                            }}
                          >
                            {d}
                            {isBooked && (
                              <span style={{ position: 'absolute', bottom: '6px', fontSize: '8px', fontWeight: 'bold' }}>BOOKED</span>
                            )}
                          </button>
                        );
                      }
                      return grid;
                    })()}
                  </div>
                </div>

                {/* Side Panel: Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div className="premium-card" style={{ padding: '20px', background: '#fff', border: '1px solid #eee' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={18} color="#800000" /> Class Statistics
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#666' }}>Active Requests</span>
                        <span style={{ fontWeight: '700' }}>{classBookings.filter(b => b.status === 'pending').length}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px' }}>
                        <span style={{ color: '#666' }}>Fully Booked Dates</span>
                        <span style={{ fontWeight: '700' }}>{bookedDates.length}</span>
                      </div>
                    </div>
                  </div>

                  <div className="premium-card" style={{ padding: '20px', background: '#fff8f9', border: '1px solid #ffebee' }}>
                    <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#800000', marginBottom: '8px' }}>Management Tip</h3>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', margin: 0 }}>
                      Marking a date as "Booked" on the calendar will automatically inform customers on the Classes page that you are unavailable for that day.
                    </p>
                  </div>
                </div>
              </div>

              {/* New Booking Requests Table */}
              <div className="admin-panel">
                <h3 className="admin-panel-title" style={{ fontSize: '18px', border: 'none', padding: 0, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Users size={20} /> New Booking Requests
                </h3>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Customer Name</th>
                      <th>Contact Info</th>
                      <th>Requested Date</th>
                      <th>Guest Count</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classBookings.map(booking => (
                      <tr key={booking.id}>
                        <td>
                          <div style={{ fontWeight: '600' }}>{booking.name}</div>
                          <div style={{ fontSize: '11px', color: '#999' }}>{booking.id}</div>
                        </td>
                        <td>
                          <div style={{ fontSize: '13px' }}>{booking.email}</div>
                          <div style={{ fontSize: '12px', color: '#666', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <WhatsAppIcon size={12} color="#2e7d32" />
                            {booking.phone}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' }}>
                            <Calendar size={14} color="#800000" />
                            {new Date(booking.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </div>
                        </td>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Users size={14} color="#666" />
                            {booking.guests} Guests
                          </div>
                        </td>
                        <td>
                          <span className={`status-badge ${booking.status}`}>
                            {booking.status}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button className="action-btn-sm" title="Confirm Booking" style={{ background: '#e8f5e9', color: '#2e7d32', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}>
                              <CheckCircle2 size={16} />
                            </button>
                            <button 
                              className="action-btn-sm" 
                              title="Contact Customer" 
                              style={{ background: '#e3f2fd', color: '#1565c0', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                              onClick={() => setMailModal(booking)}
                            >
                              <Mail size={16} />
                            </button>
                            <button 
                              className="action-btn-sm" 
                              title="WhatsApp Customer" 
                              style={{ background: '#e8f5e9', color: '#2e7d32', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                              onClick={() => {
                                const cleanPhone = (mailModal?.phone || booking.phone).replace(/\s+/g, '');
                                window.open(`https://wa.me/${cleanPhone}`, '_blank');
                              }}
                            >
                              <WhatsAppIcon size={16} />
                            </button>
                            <button 
                              className="action-btn-sm" 
                              title="Delete Request" 
                              style={{ background: '#fff5f5', color: '#c62828', border: 'none', padding: '6px', borderRadius: '6px', cursor: 'pointer' }}
                              onClick={() => setClassBookings(prev => prev.filter(b => b.id !== booking.id))}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {classBookings.length === 0 && (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '40px', color: '#999' }}>
                          No new booking requests at this time.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab !== 'dashboard' && activeTab !== 'orders' && activeTab !== 'products' && activeTab !== 'customers' && activeTab !== 'classes' && (
            <div className="admin-panel" style={{ height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <p style={{ color: '#666', fontSize: '18px' }}>
                {navItems.find(i => i.id === activeTab)?.label} Module - Under Construction
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Premium Order Details Modal */}
      {selectedOrder && (
        <div className="admin-modal-overlay premium" onClick={() => setSelectedOrder(null)}>
          <div className="admin-modal premium-modal" onClick={e => e.stopPropagation()}>
            <div className="premium-modal-header">
              <div className="premium-modal-header-content">
                 <span className={`premium-status-pill ${selectedOrder.status}`}>
                    {selectedOrder.status}
                 </span>
                 <h2>Order <span>{selectedOrder.id}</span></h2>
                 <p className="premium-modal-date">Submitted on {selectedOrder.date}</p>
              </div>
              <button className="premium-modal-close" onClick={() => setSelectedOrder(null)}>
                <X size={20} />
              </button>
            </div>
            
            <div className="premium-modal-body">
              <div className="premium-modal-grid">
                
                {/* Left Column: Specifications */}
                <div className="premium-modal-col">
                  {selectedOrder.details?.items ? (
                    <>
                      {/* Item Navigation Tabs */}
                      {selectedOrder.details.items.length >= 2 && (
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
                          {selectedOrder.details.items.map((_, idx) => (
                            <button 
                              key={idx}
                              onClick={() => setActiveOrderItemIndex(idx)}
                              style={{ 
                                padding: '8px 16px', 
                                borderRadius: '8px', 
                                border: activeOrderItemIndex === idx ? 'none' : '1px solid #eee', 
                                background: activeOrderItemIndex === idx ? '#800000' : '#fff',
                                color: activeOrderItemIndex === idx ? '#fff' : '#666',
                                fontSize: '13px',
                                fontWeight: '600',
                                cursor: 'pointer',
                                whiteSpace: 'nowrap',
                                transition: '0.2s'
                              }}
                            >
                              Product {idx + 1}
                            </button>
                          ))}
                        </div>
                      )}

                      {/* Active Item View */}
                      {(() => {
                        const item = selectedOrder.details.items[activeOrderItemIndex];
                        return (
                          <div className="premium-card">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid #f0f0f0', paddingBottom: '12px' }}>
                              <h3 className="premium-card-title" style={{ margin: 0 }}>Product Specifications</h3>
                              <span style={{ color: 'var(--color-main)', fontWeight: '700', fontSize: '15px' }}>{item.price}</span>
                            </div>
                            <div className="premium-info-list">
                              <div className="premium-info-row">
                                <div className="premium-info-label"><Package size={16}/> Item Name</div>
                                <div className="premium-info-value">{item.itemType}</div>
                              </div>
                              <div className="premium-info-row">
                                <div className="premium-info-label"><ShoppingCart size={16}/> Quantity</div>
                                <div className="premium-info-value">{item.quantity}</div>
                              </div>
                              {item.flavor && (
                                <div className="premium-info-row">
                                  <div className="premium-info-label"><Palette size={16}/> Flavor</div>
                                  <div className="premium-info-value">{item.flavor}</div>
                                </div>
                              )}
                              {item.occasion && (
                                <div className="premium-info-row">
                                  <div className="premium-info-label"><Calendar size={16}/> Occasion</div>
                                  <div className="premium-info-value">{item.occasion}</div>
                                </div>
                              )}
                            </div>

                            {/* Images for this specific item */}
                            {(item.referenceImages?.length > 0 || item.productImage) && (
                              <div style={{ marginTop: '24px' }}>
                                {item.referenceImages?.length > 0 && (
                                  <div style={{ marginBottom: '16px' }}>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>Inspiration Images</div>
                                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                      {item.referenceImages.map((img, i) => (
                                        <div key={i} className="premium-image-container clickable" style={{ width: '80px', height: '80px' }} onClick={() => setFullscreenImage(img)}>
                                          <img src={img} alt="Ref" />
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                                {item.productImage && (
                                  <div>
                                    <div style={{ fontSize: '12px', fontWeight: '700', color: '#888', marginBottom: '8px', textTransform: 'uppercase' }}>Ordered Product</div>
                                    <div className="premium-image-container clickable" style={{ width: '100%', height: '180px' }} onClick={() => setFullscreenImage(item.productImage)}>
                                      <img src={item.productImage} alt="Product" style={{ objectFit: 'cover' }} />
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </>
                  ) : (
                    selectedOrder.details && (
                      <>
                        <div className="premium-card">
                        <h3 className="premium-card-title">Order Specifications</h3>
                        <div className="premium-info-list">
                          <div className="premium-info-row">
                            <div className="premium-info-label"><Package size={16}/> Item Type</div>
                            <div className="premium-info-value">{selectedOrder.details.itemType}</div>
                          </div>
                          {selectedOrder.details.quantity && (
                            <div className="premium-info-row">
                              <div className="premium-info-label"><ShoppingCart size={16}/> Quantity</div>
                              <div className="premium-info-value">{selectedOrder.details.quantity}</div>
                            </div>
                          )}
                          {selectedOrder.details.flavor && (
                            <div className="premium-info-row">
                              <div className="premium-info-label"><Palette size={16}/> Flavor</div>
                              <div className="premium-info-value">{selectedOrder.details.flavor}</div>
                            </div>
                          )}
                          {selectedOrder.details.occasion && (
                            <div className="premium-info-row">
                              <div className="premium-info-label"><Calendar size={16}/> Occasion</div>
                              <div className="premium-info-value">{selectedOrder.details.occasion}</div>
                            </div>
                          )}
                          {selectedOrder.details.theme && (
                            <div className="premium-info-row">
                              <div className="premium-info-label"><Palette size={16}/> Theme</div>
                              <div className="premium-info-value">{selectedOrder.details.theme}</div>
                            </div>
                          )}
                          {selectedOrder.details.guests && (
                            <div className="premium-info-row">
                              <div className="premium-info-label"><Users size={16}/> Guest Count</div>
                              <div className="premium-info-value">{selectedOrder.details.guests}</div>
                            </div>
                          )}
                        </div>
                        
                        {selectedOrder.details.layers && selectedOrder.details.layers.length > 0 && (
                          <div className="premium-custom-layers-box">
                            <h4 className="layers-box-title">3D DESIGN LAYERS</h4>
                            {selectedOrder.details.layers.map((layer, idx) => (
                              <div key={idx} className="admin-layer-row">
                                <span className="admin-layer-dot" style={{ backgroundColor: layer.color }}></span>
                                <span className="admin-layer-label">
                                  <strong>Layer {idx + 1}:</strong> {layer.type.includes('6') ? '6"' : '8"'} {layer.type.includes('heart') ? 'Heart' : 'Round'}
                                  {(layer.topBorder || layer.bottomBorder || layer.pearlBottom || layer.flowerCluster) && (
                                    <span className="layer-design-tags">
                                      {layer.topBorder && <span className="design-tag">Shell Top</span>}
                                      {layer.bottomBorder && <span className="design-tag">Shell Bottom</span>}
                                      {layer.pearlBottom && <span className="design-tag">Pearl</span>}
                                      {layer.flowerCluster && <span className="design-tag">Flowers</span>}
                                    </span>
                                  )}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    

                        {/* Images for single item */}
                        {(selectedOrder.details?.referenceImg || (selectedOrder.details?.referenceImages && selectedOrder.details.referenceImages.length > 0)) && (
                          <div className="premium-card">
                            <h3 className="premium-card-title">Inspiration Images</h3>
                      <div className="premium-image-grid">
                        {selectedOrder.details.referenceImages && selectedOrder.details.referenceImages.length > 0 ? (
                          selectedOrder.details.referenceImages.map((imgUrl, idx) => (
                            <div key={idx} className="premium-image-container clickable" onClick={() => setFullscreenImage(imgUrl)}>
                              <img src={imgUrl} alt={`Customer Reference ${idx + 1}`} />
                            </div>
                          ))
                        ) : selectedOrder.details.referenceImg ? (
                          <div className="premium-image-container clickable" onClick={() => setFullscreenImage(selectedOrder.details.referenceImg)}>
                            <img src={selectedOrder.details.referenceImg} alt="Reference" />
                          </div>
                        ) : null}
                      </div>
                          </div>
                        )}
                      </>
                    )
                  )}
                </div>

                {/* Right Column: Customer & Pickup */}
                <div className="premium-modal-col">
                  <div className="premium-card">
                    <h3 className="premium-card-title">Customer Details</h3>
                    <div className="premium-info-list">
                      <div className="premium-info-row">
                        <div className="premium-info-label"><User size={16}/> Full Name</div>
                        <div className="premium-info-value">{selectedOrder.customer}</div>
                      </div>
                      {selectedOrder.details?.whatsapp && (
                        <div className="premium-info-row">
                          <div className="premium-info-label"><Phone size={16}/> Contact</div>
                          <div className="premium-info-value" style={{display: 'flex', gap: '12px', alignItems: 'center'}}>
                            <span style={{fontWeight: 600}}>{selectedOrder.details.whatsapp}</span>
                            <div style={{display: 'flex', gap: '6px'}}>
                              <a href={`tel:${selectedOrder.details.whatsapp.replace(/[^0-9+]/g, '')}`} className="action-icon-link tel" title="Call Customer">
                                <Phone size={14} />
                              </a>
                              <a href={`https://wa.me/${selectedOrder.details.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="action-icon-link wa" title="WhatsApp Message">
                                <MessageCircle size={14} />
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="premium-info-row highlight">
                        <div className="premium-info-label">Total Payment</div>
                        <div className="premium-info-value price">{selectedOrder.total}</div>
                      </div>
                    </div>
                  </div>

                  {selectedOrder.details && (
                    <div className="premium-card">
                      <h3 className="premium-card-title">Pickup Schedule</h3>
                      <div className="premium-info-list">
                        <div className="premium-info-row">
                          <div className="premium-info-label"><Calendar size={16}/> Date</div>
                          <div className="premium-info-value">{selectedOrder.details.pickupDate}</div>
                        </div>
                        <div className="premium-info-row">
                          <div className="premium-info-label"><Clock size={16}/> Period</div>
                          <div className="premium-info-value">{selectedOrder.details.pickupPeriod}</div>
                        </div>
                      </div>
                      
                      {selectedOrder.details.pickupNotes && (
                         <div className="premium-notes-box">
                           <div className="notes-header"><FileText size={14}/> Notes from Customer</div>
                           <p>{selectedOrder.details.pickupNotes}</p>
                         </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </div>
            
            <div className="premium-modal-footer">
               <div className="premium-status-controller">
                  <span className="status-label">Change Status</span>
                  <div className="status-button-group">
                    <button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'pending')}
                      className={`status-action-btn pending ${selectedOrder.status === 'pending' ? 'active' : ''}`}
                    >
                      {selectedOrder.status === 'pending' && <CheckCircle2 size={16}/>} Pending
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'processing')}
                      className={`status-action-btn processing ${selectedOrder.status === 'processing' ? 'active' : ''}`}
                    >
                      {selectedOrder.status === 'processing' && <CheckCircle2 size={16}/>} Processing
                    </button>
                    <button 
                      onClick={() => handleUpdateStatus(selectedOrder.id, 'completed')}
                      className={`status-action-btn completed ${selectedOrder.status === 'completed' ? 'active' : ''}`}
                    >
                      {selectedOrder.status === 'completed' && <CheckCircle2 size={16}/>} Completed
                    </button>
                  </div>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {fullscreenImage && (
        <div className="lightbox-overlay" onClick={() => setFullscreenImage(null)}>
          <button className="lightbox-close" onClick={() => setFullscreenImage(null)}>
            <X size={32} />
          </button>
          <img src={fullscreenImage} alt="Fullscreen Reference" className="lightbox-image" onClick={e => e.stopPropagation()} />
        </div>
      )}

      {/* Add Highlight Modal */}
      {highlightModal && (
        <div className="admin-modal-overlay" onClick={() => setHighlightModal(null)} style={{ zIndex: 3000 }}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '400px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#800000' }}>Add Highlight Item</h3>
              <button onClick={() => setHighlightModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>HIGHLIGHT TITLE (TAG)</label>
                <input 
                  type="text" 
                  placeholder="e.g. Flavor" 
                  value={newHighlight.title}
                  onChange={(e) => setNewHighlight({ ...newHighlight, title: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>
              <div className="form-group">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>HIGHLIGHT TEXT</label>
                <textarea 
                  placeholder="e.g. Rich Belgian chocolate Ganache" 
                  value={newHighlight.text}
                  onChange={(e) => setNewHighlight({ ...newHighlight, text: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', minHeight: '80px' }}
                />
              </div>
              <button 
                onClick={() => {
                  if (!newHighlight.title || !newHighlight.text) return;
                  const slot = highlightModal.slot;
                  const item = featuredDesserts.find(d => d.slot === slot);
                  const updated = {
                    ...item,
                    highlights: [...(item.highlights || []), newHighlight]
                  };
                  handleUpdateFeatured(slot, updated);
                  setNewHighlight({ title: '', text: '' });
                  setHighlightModal(null);
                }}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#800000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Plus size={18} /> Add to Dessert
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Image Modal */}
      {imageModal && (
        <div className="admin-modal-overlay" onClick={() => setImageModal(null)} style={{ zIndex: 3000 }}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px', padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ margin: 0, color: '#800000' }}>Change Product Image</h3>
              <button onClick={() => setImageModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ width: '100%', aspectRatio: '1.5', borderRadius: '12px', background: '#f8f9fa', overflow: 'hidden', border: '1px solid #eee' }}>
                <img src={newImageUrl || imageModal.currentImg} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>UPLOAD NEW IMAGE</label>
                <div style={{ position: 'relative' }}>
                  <input 
                    type="file" 
                    id="featured-upload" 
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (e) => setNewImageUrl(e.target.result);
                        reader.readAsDataURL(file);
                      }
                    }}
                    style={{ display: 'none' }}
                  />
                  <label 
                    htmlFor="featured-upload"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px', borderRadius: '8px', background: '#f5f5f5', border: '1px dashed #ccc', cursor: 'pointer', color: '#666', fontSize: '14px', fontWeight: '500' }}
                  >
                    <Upload size={18} /> Choose Image File
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 'bold', color: '#666', marginBottom: '6px' }}>OR USE URL / PATH</label>
                <input 
                  type="text" 
                  placeholder="e.g. ./assets/cupcakes/new.png" 
                  value={newImageUrl.startsWith('data:') ? '' : newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
                />
              </div>

              <button 
                onClick={() => {
                  const slot = imageModal.slot;
                  const item = featuredDesserts.find(d => d.slot === slot);
                  handleUpdateFeatured(slot, { ...item, img: newImageUrl || imageModal.currentImg });
                  setNewImageUrl('');
                  setImageModal(null);
                }}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: '#800000', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <Save size={18} /> Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
      {/* Notification Full Screen */}
      {showNotifications && (
        <div className="notifications-fullscreen-overlay">
          <header className="notifications-header">
            <h2><Bell size={28} /> Notifications</h2>
            <button className="close-notifications-btn" onClick={() => setShowNotifications(false)}>
              <X size={24} />
            </button>
          </header>
          
          <div className="notifications-content">
            <div className="notification-group">
              <div className="notification-group-title">Today</div>
              {recentActivities.map(activity => (
                <div key={activity.id} className="notification-card-item">
                  <div className="notification-icon-box" style={{ 
                    backgroundColor: activity.status === 'pending' ? '#fff3e0' : activity.status === 'completed' ? '#e8f5e9' : '#e3f2fd',
                    color: activity.status === 'pending' ? '#ef6c00' : activity.status === 'completed' ? '#2e7d32' : '#1565c0'
                  }}>
                    {activity.action.includes('Order') ? <ShoppingCart size={24} /> : 
                     activity.action.includes('Product') ? <Package size={24} /> : <User size={24} />}
                  </div>
                  <div className="notification-info">
                    <div className="notification-action">
                      {activity.action}: <span className="notification-target">{activity.target}</span>
                    </div>
                    <div className="notification-time">
                      <Clock size={12} /> {activity.time}
                      <span style={{ margin: '0 8px', opacity: 0.3 }}>•</span>
                      <span className={`notification-status-dot ${activity.status}`}></span>
                      <span style={{ fontSize: '12px', textTransform: 'capitalize' }}>{activity.status}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="notification-group">
              <div className="notification-group-title">Yesterday</div>
              <div className="notification-card-item">
                <div className="notification-icon-box" style={{ backgroundColor: '#f3e5f5', color: '#7b1fa2' }}>
                  <MessageCircle size={24} />
                </div>
                <div className="notification-info">
                  <div className="notification-action">New Message: <span className="notification-target">Alice Cooper</span></div>
                  <div className="notification-time"><Clock size={12} /> 1 day ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* Email Template Modal */}
      {mailModal && (
        <div className="admin-modal-overlay" onClick={() => setMailModal(null)} style={{ zIndex: 4000 }}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '450px', padding: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{ margin: 0, color: '#800000', fontSize: '20px' }}>Email Templates</h3>
                <p style={{ margin: '4px 0 0 0', color: '#666', fontSize: '13px' }}>Choose a response for <strong>{mailModal.name}</strong></p>
              </div>
              <button onClick={() => setMailModal(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999' }}><X size={24} /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <button 
                className="template-btn"
                onClick={() => {
                  const subject = `Booking Confirmation - Mini Bakes Classes`;
                  const body = `Hi ${mailModal.name},\n\nWe are delighted to confirm your cupcake decorating experience for ${new Date(mailModal.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} with ${mailModal.guests} guests.\n\nWe look forward to seeing you soon!\n\nBest regards,\nMegan Briffa\nMini Bakes`;
                  window.location.href = `mailto:${mailModal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setMailModal(null);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '12px', border: '1px solid #e8f5e9', background: '#f1fbf3', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#2e7d32', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#2e7d32', marginBottom: '2px' }}>Accept Booking</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Send confirmation and guest details</div>
                </div>
              </button>

              <button 
                className="template-btn"
                onClick={() => {
                  const subject = `Update regarding your Mini Bakes Booking`;
                  const body = `Hi ${mailModal.name},\n\nThank you for your interest in our cupcake decorating experience! Unfortunately, ${new Date(mailModal.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} is no longer available due to a scheduling conflict.\n\nWould you like to explore other available dates from our calendar?\n\nBest regards,\nMegan Briffa\nMini Bakes`;
                  window.location.href = `mailto:${mailModal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setMailModal(null);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '12px', border: '1px solid #fff3e0', background: '#fffaf0', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#ef6c00', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Calendar size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#ef6c00', marginBottom: '2px' }}>Change Date</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Request customer to pick another slot</div>
                </div>
              </button>

              <button 
                className="template-btn"
                onClick={() => {
                  const subject = `Booking Request Update - Mini Bakes`;
                  const body = `Hi ${mailModal.name},\n\nThank you for reaching out to Mini Bakes. We appreciate your interest in our decorating experiences.\n\nUnfortunately, we are unable to fulfill your booking request for ${new Date(mailModal.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })} at this time. We apologize for any disappointment caused.\n\nBest regards,\nMegan Briffa\nMini Bakes`;
                  window.location.href = `mailto:${mailModal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                  setMailModal(null);
                }}
                style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '20px', borderRadius: '12px', border: '1px solid #ffebee', background: '#fff5f5', cursor: 'pointer', textAlign: 'left', transition: '0.2s' }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c62828', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <X size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: '700', color: '#c62828', marginBottom: '2px' }}>Reject Request</div>
                  <div style={{ fontSize: '12px', color: '#666' }}>Politely decline the booking request</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
