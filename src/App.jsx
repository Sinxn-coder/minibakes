import React, { useState, useEffect, useRef, Suspense, lazy } from 'react';
import { Search, Menu, X, Star, MapPin, Phone, ShoppingBag, Mail, Heart, Cake } from 'lucide-react';

const InstagramIcon = ({ size = 24, color, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color || "url(#instaGradient)"}
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <defs>
      <linearGradient id="instaGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" style={{ stopColor: '#f09433' }} />
        <stop offset="25%" style={{ stopColor: '#e6683c' }} />
        <stop offset="50%" style={{ stopColor: '#dc2743' }} />
        <stop offset="75%" style={{ stopColor: '#cc2366' }} />
        <stop offset="100%" style={{ stopColor: '#bc1888' }} />
      </linearGradient>
    </defs>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

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
import './App.css';
import { menuData } from './data/menuData';
import SafeImage from './components/SafeImage';
import { supabase } from './supabase';
import logo from './assets/mini_logo.png';
import bg1 from './assets/headerbg3.png';
import brownieImg from './assets/brownies_box.png';
import brownie2 from './assets/brownies/brownie (2).png';
import brownie3 from './assets/brownies/brownie (3).png';
import cupcakeImg from './assets/cupcake4.png';
import cupcake1 from './assets/cupcakes/butter1.png';
import cupcake2 from './assets/cupcakes/butter2.jpeg';
import cakeImg from './assets/roundcake1.png';
import founderImg from './assets/founder.jpg';
import style1 from './assets/style1.png';
import style2 from './assets/style2.png';
import style3 from './assets/stlye3.png';
import style4 from './assets/style4.png';
import style5 from './assets/style5.png';
import style6 from './assets/style6.png';
import style7 from './assets/style7.png';
import style8 from './assets/style8.png';
import orbitCupcake from './assets/cupcakes/butter1.png';
import orbitRoundCake from './assets/cakes/round/round (1).png';
import orbitPop from './assets/cake pops/pops (1).png';
import orbitBrownie from './assets/brownies/brownie (1).png';
import orbitSicle from './assets/cake sicles/cakesicles (1).png';
import orbitBreakableHeart from './assets/1.jpg';
import orbitHeartCake from './assets/cakes/heart/heart (1).png';
import orbitBento from './assets/minicakes/1.png';
import MenuPage from './MenuPage';
import OrderPage from './OrderPage';
import ProductDetailsPage from './ProductDetailsPage';
import StudioPage from './StudioPage';
import CakeCarePage from './CakeCarePage';
import ContactPage from './ContactPage';
import review1 from './assets/reviews/one.jpg';
import review2 from './assets/reviews/two.jpg';
import review3 from './assets/reviews/three.jpg';
import review4 from './assets/reviews/four.jpg';
import review5 from './assets/reviews/5th.jpg';
import review6 from './assets/reviews/6th.jpg';
import ig1 from './assets/instgram/ig1.png';
import ig2 from './assets/instgram/ig2.png';
import ig3 from './assets/instgram/ig3.png';
import ig4 from './assets/instgram/ig4.png';
import ig5 from './assets/instgram/ig5.png';
import ig6 from './assets/instgram/ig6.png';

const instaPosts = [
  { 
    img: ig1, 
    link: 'https://www.instagram.com/p/DXyoQo_jn2t/?utm_source=ig_web_button_share_sheet&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    img: ig2, 
    link: 'https://www.instagram.com/p/DLFxTWjoR1p/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    img: ig3, 
    link: 'https://www.instagram.com/reel/DX1pOqsRkRB/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    img: ig4, 
    link: 'https://www.instagram.com/p/DU8xauIEe7_/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' 
  },
  { 
    img: ig5, 
    link: 'https://www.instagram.com/reel/DYMG3CloNfE/?utm_source=ig_web_copy_link' 
  },
  { 
    img: ig6, 
    link: 'https://instagram.com/minibakes2021' 
  }
];

const patternCoords = [
  // Row 1 (Top)
  { img: style1, top: '5%', left: '5%', rot: 15 },
  { img: style2, top: '8%', left: '20%', rot: -15, hideOnMobile: true },
  { img: style3, top: '4%', left: '35%', rot: 25 },
  { img: style4, top: '10%', left: '50%', rot: -5, hideOnMobile: true },
  { img: style5, top: '6%', left: '65%', rot: 45 },
  { img: style6, top: '12%', left: '80%', rot: -25, hideOnMobile: true },
  { img: style7, top: '5%', left: '95%', rot: 10 },

  // Row 2
  { img: style8, top: '25%', left: '10%', rot: -30, hideOnMobile: true },
  { img: style1, top: '20%', left: '28%', rot: 20 },
  { img: style2, top: '28%', left: '45%', rot: -10, hideOnMobile: true },
  { img: style3, top: '22%', left: '60%', rot: 35 },
  { img: style4, top: '30%', left: '78%', rot: -20, hideOnMobile: true },
  { img: style5, top: '25%', left: '92%', rot: 15 },

  // Row 3 (Middle-ish)
  { img: style6, top: '45%', left: '5%', rot: 5 },
  { img: style7, top: '50%', left: '22%', rot: -15, hideOnMobile: true },
  { img: style8, top: '42%', left: '38%', rot: 25 },
  { img: style1, top: '48%', left: '55%', rot: -5, hideOnMobile: true },
  { img: style2, top: '45%', left: '72%', rot: -25 },
  { img: style3, top: '52%', left: '88%', rot: 10, hideOnMobile: true },

  // Row 4
  { img: style4, top: '70%', left: '12%', rot: -30, hideOnMobile: true },
  { img: style5, top: '65%', left: '30%', rot: 20 },
  { img: style6, top: '75%', left: '48%', rot: -10, hideOnMobile: true },
  { img: style7, top: '68%', left: '65%', rot: 35 },
  { img: style8, top: '72%', left: '82%', rot: -20, hideOnMobile: true },
  { img: style1, top: '65%', left: '95%', rot: 15 },

  // Row 5 (Bottom)
  { img: style2, top: '90%', left: '8%', rot: 45 },
  { img: style3, top: '85%', left: '25%', rot: -10, hideOnMobile: true },
  { img: style4, top: '95%', left: '40%', rot: 25 },
  { img: style5, top: '88%', left: '58%', rot: -25, hideOnMobile: true },
  { img: style6, top: '92%', left: '75%', rot: 5 },
  { img: style7, top: '85%', left: '90%', rot: -15, hideOnMobile: true },
];

const clientReviews = [
  {
    text: "I ordered a cake for my 21st. Everyone loved it. Very pleased with the service. Thank you",
    author: "Ella Marney.",
    img: review1,
    fbLink: "https://www.facebook.com/share/p/17JxKm3mw8/"
  },
  {
    text: "We ordered a cake on very short notice (just two days!), and Mini Bakes absolutely delivered! The design was exactly what we wanted — beautifully done and perfectly matched our request. Not only did it look amazing, but it also tasted incredible. Everyone loved it! Highly recommend for both creativity and great service.",
    author: "Audrey Abela",
    img: review2,
    fbLink: "https://www.facebook.com/share/p/1BUob1V3v7/"
  },
  {
    text: "The birthday cake I ordered from Mini Bakes was both stunning and delicious. Beautifully decorated and full of flavour! Highly recommend 🎂💕",
    author: "Chiara Scerri",
    img: review3,
    fbLink: "https://www.facebook.com/share/p/1DpYoESAoy/"
  },
  {
    text: "Went in with a vision and minibakes exceeded all my expectations. The cake was stunning, and the taste was to die for. Would recommend 1000% !",
    author: "Sheridianne Sammut",
    img: review4,
    fbLink: "https://www.facebook.com/share/p/1E537jwHW3/"
  },
  {
    text: "Second time ordering from Mini Bakes and always amazing service, beautiful cakes with the best flavours! Impeccable customer service too! Cannot recommend her enough!",
    author: "Tamara Farrugia Drakard",
    img: review5,
    fbLink: "https://www.facebook.com/share/p/1AoSsYKJNE/"
  },
  {
    text: "High Recommended!! Had a last minute order and they were kind enough to accept it 🩷 Amazing Taste and very presentable ⭐️⭐️⭐️⭐️⭐️",
    author: "Maxine Mifsud",
    img: review6,
    fbLink: "https://www.facebook.com/share/p/18jeuyMgC9/"
  }
];

const InstaPost = ({ post, index }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <div className="insta-card-placeholder">
      <a href={post?.link} target="_blank" rel="noopener noreferrer" className="insta-card-link-wrapper">
        <div className="insta-card-icon-container">
          <InstagramIcon size={20} className="insta-card-icon" />
        </div>
        {(!loaded || !post) && (
          <div className="insta-img-shimmer">
            <InstagramIcon size={32} opacity={0.2} />
          </div>
        )}
        {post && (
          <img 
            src={post.img} 
            alt={`Instagram Reel ${index + 1}`} 
            className={`insta-real-img ${loaded ? 'image-loaded' : 'image-loading'}`}
            onLoad={() => setLoaded(true)}
          />
        )}
      </a>
    </div>
  );
};

const FeaturedCard = ({ item, onClick, className = "" }) => {
  const [imgIndex, setImgIndex] = useState(0);

  useEffect(() => {
    if (item.images && item.images.length > 1) {
      const interval = setInterval(() => {
        setImgIndex(prev => (prev + 1) % item.images.length);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [item.images]);

  const displayImg = item.images ? item.images[imgIndex] : item.img;

  return (
    <div className={`featured-card ${className}`}>
      <div className="card-image-wrapper">
        <SafeImage src={displayImg} alt={item.name} key={displayImg} />
      </div>
      <div className="card-info">
        <h3>{item.name}</h3>
        <p>{item.price}</p>
        <button className="view-details-btn" onClick={onClick}>View Details</button>
      </div>
    </div>
  );
};

/* ── Mobile-only Horizontal Scroll Carousel ── */
function FeaturedCarousel({ items, onViewDetails }) {
  const [active, setActive] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActive(index);
    }
  };

  return (
    <div className="mobile-featured-container mobile-only">
      <div
        className="mobile-featured-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
      >
        {items.map((item, i) => (
          <FeaturedCard 
            key={i} 
            item={item} 
            className="mobile-scroll-card" 
            onClick={() => onViewDetails(i)} 
          />
        ))}
      </div>
      <div className="carousel-dots">
        {items.map((_, i) => (
          <div
            key={i}
            className={`carousel-dot ${active === i ? 'active' : ''}`}
            onClick={() => {
              if (scrollRef.current) {
                scrollRef.current.scrollTo({
                  left: i * scrollRef.current.offsetWidth,
                  behavior: 'smooth'
                });
              }
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Premium Page Loader Component
const PageLoader = () => (
  <div className="page-transition-loader">
    <div className="loader-content">
      <div className="loader-shimmer"></div>
      <p>Crafting Sweetness...</p>
    </div>
  </div>
);

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [customizingProduct, setCustomizingProduct] = useState(null);
  // Preload critical Home Page assets with prioritization
  useEffect(() => {
    const priorityImages = [bg1, logo];
    const secondaryImages = [
      ...featuredItems.map(item => item.img)
    ];

    // Function to load a set of images
    const loadImages = (list) => {
      return Promise.all(list.map(src => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = resolve; // Continue even if one fails
        });
      }));
    };

    // Staggered loading: Priority first, then secondary
    loadImages(priorityImages).then(() => {
      loadImages(secondaryImages);
    });
  }, []);

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('minibakes_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('minibakes_cart', JSON.stringify(cart));
  }, [cart]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedDesktopCard, setExpandedDesktopCard] = useState(null);
  const [expandedMobileCard, setExpandedMobileCard] = useState(null);
  const [selectedSearchProduct, setSelectedSearchProduct] = useState(null);
  const [expandedContactId, setExpandedContactId] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [isOverDark, setIsOverDark] = useState(false);

  // Scroll observer for floating cart color change
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOverDark(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        rootMargin: '-130px 0px 0px 0px' // Offset to match the cart button's top position
      }
    );

    const darkSections = document.querySelectorAll('.footer, .booking-form-wrapper, .studio-schedule, .reviews-section');
    darkSections.forEach(section => observer.observe(section));

    return () => darkSections.forEach(section => observer.unobserve(section));
  }, [currentView]); // Re-run when view changes to find new elements

  const navigateTo = (view) => {
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const contactFooterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contactFooterRef.current && !contactFooterRef.current.contains(event.target)) {
        setExpandedContactId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll to top when switching views
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const handleContactClick = (id, link) => {
    if (expandedContactId === id || window.innerWidth > 768) {
      window.open(link, id === 'phone' ? '_self' : '_blank');
    } else {
      setExpandedContactId(id);
    }
  };

  const addToCart = (item) => {
    setCart(prev => [...prev, { ...item, cartId: Date.now() }]);
  };

  const removeFromCart = (cartId) => {
    setCart(prev => prev.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQty) => {
    if (newQty < 1) return;
    setCart(prev => prev.map(item =>
      item.cartId === cartId ? { ...item, quantity: newQty } : item
    ));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return acc + (priceNum * item.quantity);
    }, 0);
  };

  const [featuredItems, setFeaturedItems] = useState([
    { id: 't-featured', img: brownieImg, images: [brownieImg, brownie2, brownie3], name: 'Brownie Selection', price: 'Starting €xx', description: 'Our most popular brownie assortment, baked fresh daily with premium chocolate.' },
    { id: 'cu-featured', img: cupcakeImg, name: 'Signature Cupcakes', price: 'Starting €xx', description: 'A curated selection of our most loved cupcake flavors, perfect for any occasion.' },
    { id: 'c-featured', img: cakeImg, name: 'Best Seller cake', price: 'Starting €xx', description: 'Our signature masterpiece cake, loved by everyone for its perfect balance of flavor.' },
  ]);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data, error } = await supabase
          .from('featured_items')
          .select('*')
          .order('slot');
        
        if (error) throw error;
        if (data && data.length === 3) {
          // Merge with static images for now if paths match or use data.img
          const merged = data.map((item, idx) => ({
            ...item,
            id: ['t-featured', 'cu-featured', 'c-featured'][idx],
            img: item.img || [brownieImg, cupcakeImg, cakeImg][idx],
            images: idx === 0 ? [brownieImg, brownie2, brownie3] : undefined
          }));
          setFeaturedItems(merged);
        }
      } catch (err) {
        console.error('Error fetching featured items:', err);
      }
    };

    fetchFeatured();
  }, []);

  const featuredRef = useRef(null);
  const [featuredInView, setFeaturedInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFeaturedInView(true);
        }
      },
      { threshold: 0.05, rootMargin: '50px' } // Added rootMargin for earlier trigger
    );

    if (featuredRef.current) {
      observer.observe(featuredRef.current);
      // Immediate check in case it's already in view
      const rect = featuredRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setFeaturedInView(true);
      }
    }

    return () => {
      if (featuredRef.current) {
        observer.unobserve(featuredRef.current);
      }
    };
  }, []);

  const reviewsRef = useRef(null);
  const [reviewsInView, setReviewsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReviewsInView(true);
        }
      },
      { threshold: 0.05, rootMargin: '50px' }
    );

    if (reviewsRef.current) {
      observer.observe(reviewsRef.current);
      // Immediate check
      const rect = reviewsRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setReviewsInView(true);
      }
    }

    return () => {
      if (reviewsRef.current) {
        observer.unobserve(reviewsRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-layout">
      <header className={`header ${isScrolled ? 'scrolled' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
        <div className="logo-container">
          <img src={logo} alt="Mini Bakes Logo" />
        </div>

        <div className="header-right">
          <div className={`search-wrapper ${isSearchOpen ? 'open' : ''}`}>
            <input
              type="text"
              className="search-input"
              placeholder="Search desserts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchOpen(true)}
            />
            {isSearchOpen ? (
              <X size={28} strokeWidth={1.5} className="search-icon" onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }} />
            ) : (
              <Search size={28} strokeWidth={1.5} className="search-icon" onClick={() => setIsSearchOpen(true)} />
            )}

            {/* Dropdown Search Results */}
            {isSearchOpen && searchQuery.trim() !== '' && (
              <div className="search-results-dropdown">
                {(() => {
                  const q = searchQuery.toLowerCase();
                  
                  // Helper to get all items from any category structure
                  const getCategoryItems = (cat) => {
                    if (cat.items) return cat.items;
                    if (cat.sections) return cat.sections.flatMap(s => s.items || []);
                    return [];
                  };

                  const categoryMatches = menuData
                    .filter(cat => cat.category.toLowerCase().includes(q))
                    .flatMap(getCategoryItems);

                  const nameMatches = menuData
                    .flatMap(getCategoryItems)
                    .filter(item =>
                      item && item.name && item.name.toLowerCase().includes(q) &&
                      !categoryMatches.some(cm => cm && cm.id === item.id)
                    );

                  const allResults = [...categoryMatches, ...nameMatches].filter(Boolean);

                  if (allResults.length === 0) {
                    return (
                      <div className="search-no-results">
                        No desserts found for "{searchQuery}"
                      </div>
                    );
                  }

                  return allResults.map(item => (
                    <div
                      key={item.id}
                      className="search-result-item"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSearchProduct(item);
                        setIsSearchOpen(false);
                      }}
                    >
                      <img src={item.img} alt={item.name} className="search-result-img" />
                      <div className="search-result-info">
                        <h4>{item.name}</h4>
                        <p>{item.price}</p>
                      </div>
                    </div>
                  ));
                })()}
              </div>
            )}
          </div>
          <nav className="nav-links">
            <a href="#home" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
            <span className="nav-divider">|</span>
            <a href="#menu" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('menu'); }}>Menu</a>
            <span className="nav-divider">|</span>
            <a href="#studio" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('studio'); }}>Classes</a>
            <span className="nav-divider">|</span>
            <a href="#order" className="nav-link" onClick={(e) => {
              e.preventDefault();
              if (window.innerWidth > 768) setIsCartOpen(true);
              else navigateTo('order');
            }}>
              Order
              {cart.length > 0 && <span className="nav-cart-badge">{cart.length}</span>}
            </a>
            <span className="nav-divider">|</span>
            <a href="#contact" className="nav-link" onClick={(e) => {
              e.preventDefault();
              navigateTo('contact');
            }}>Contact</a>
          </nav>

          <div className="menu-icon" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={28} strokeWidth={1.5} />
          </div>
        </div>
      </header>


      {/* Floating Cart Button (Visible when cart has items and NOT on order page) */}
      {cart.length > 0 && currentView !== 'order' && !isCartOpen && (
        <div
          className={`floating-cart-btn ${isOverDark ? 'white' : ''}`}
          onClick={() => {
            if (window.innerWidth > 768) setIsCartOpen(true);
            else setCurrentView('order');
          }}
        >
          <ShoppingBag size={28} />
          <span className="floating-cart-count">{cart.length}</span>
        </div>
      )}

      {/* Unique Full-screen Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`}>
        <button className="menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
          <X size={36} strokeWidth={1.5} />
        </button>

        <div className="menu-content">
          <nav className="mobile-nav">
            <div className="nav-item-wrapper">
              <a href="#home" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('home'); }}>Home</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#menu" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('menu'); }}>Menu</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#studio" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('studio'); }}>Classes</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#care" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('care'); }}>Cake Care</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#order" className="mobile-nav-link" onClick={() => { navigateTo('order'); }}>
                Order {cart.length > 0 && `(${cart.length})`}
              </a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#contact" className="mobile-nav-link" onClick={(e) => {
                e.preventDefault();
                navigateTo('contact');
              }}>Contact</a>
            </div>
          </nav>

          <div className="menu-footer">
            <p>Handcrafted with love by Mini Bakes</p>
          </div>
        </div>
      </div>

      {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-bg-container">
              <div
                className="hero-bg-image active"
                style={{ backgroundImage: `url("${bg1}")` }}
              />
              <div className="hero-overlay"></div>
            </div>

            <div className="hero-top-left-content">
              <p className="hero-celebration-text">
                <span className="hero-sans">Freshly baked for every</span><br />
                <span className="hero-serif-accent">celebration</span>
              </p>
            </div>
          </section>

          {/* Featured Dessert Section */}
          <section
            className={`featured-section ${featuredInView ? 'reveal' : ''}`}
            ref={featuredRef}
          >
            <h2 className="section-title">FEATURED DESSERT</h2>

            {/* Desktop Grid / Expanded Card */}
            <div className="desktop-only">
              {expandedDesktopCard !== null ? (
                <div className="expanded-card">
                  <button className="close-expanded-btn" onClick={() => setExpandedDesktopCard(null)}>
                    <X size={30} strokeWidth={1.5} />
                  </button>
                  <div className="expanded-card-content">
                    <div className="expanded-image-wrapper">
                      <SafeImage src={featuredItems[expandedDesktopCard].img} alt={featuredItems[expandedDesktopCard].name} />
                    </div>
                    <div className="expanded-info">
                      <h3>{featuredItems[expandedDesktopCard].name}</h3>
                      <p className="expanded-price">{featuredItems[expandedDesktopCard].price}</p>
                      <p className="expanded-description">
                        Delicious and freshly baked just for you. Customize your order with our various options, premium ingredients, and boundless love.
                      </p>
                      <button className="add-to-cart-btn" onClick={() => {
                        setCustomizingProduct(featuredItems[expandedDesktopCard]);
                        setExpandedDesktopCard(null);
                        setCurrentView('product-details');
                      }}>Add to Order</button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="featured-grid">
                  {featuredItems.map((item, idx) => (
                    <FeaturedCard 
                      key={idx} 
                      item={item} 
                      onClick={() => setExpandedDesktopCard(idx)} 
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Carousel */}
            <FeaturedCarousel
              items={featuredItems}
              onViewDetails={(idx) => setExpandedMobileCard(idx)}
            />
          </section>

          {/* Instagram Feed Section */}
          <section className="instagram-section">
            <div className="insta-header">
              <h2 className="insta-title">FOLLOW OUR JOURNEY</h2>
              <a href="https://instagram.com/minibakes2021" target="_blank" rel="noopener noreferrer" className="insta-handle">
                @minibakes2021
              </a>
            </div>

            <div className="insta-feed-container">
              {/* This is a wrapper for the Instagram Widget. 
              To make it live, you can use a free service like Behold.so 
              and paste their embed code below. */}
              <div className="insta-row">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InstaPost key={i} post={instaPosts[i]} index={i} />
                ))}
              </div>

              <div className="insta-footer">
                <a href="https://instagram.com/minibakes2021" target="_blank" rel="noopener noreferrer" className="insta-btn">
                  View on Instagram
                </a>
              </div>
            </div>
          </section>

          {/* Meet the Founder Section */}
          <section className="founder-section">
            {/* Decorative Top-Left Waves */}
            <div className="founder-decoration">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,150 Q100,0 200,100 T450,-50" fill="none" stroke="#fff" strokeWidth="4" opacity="0.9" />
                <path d="M-50,50 Q150,150 250,50 T450,150" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.6" />
              </svg>
            </div>

            <h2 className="founder-title">MEET THE FOUNDER</h2>

            <div className="founder-content">
              <div className="founder-image-wrapper">
                <img src={founderImg} alt="Megan Briffa - Founder of Mini Bakes" />
              </div>

              <div className="founder-text-box">
                <p>
                  Hi, I'm Megan Briffa - the baker behind Mini Bakes. What started as a love for baking turned into creating homemade treats that are fresh, simple, and made with love.
                </p>
              </div>
            </div>
          </section>

          {/* Explore Menu Section */}
          <section className="explore-section">
            <div className="explore-pattern">
              {patternCoords.map((item, idx) => (
                <img
                  key={idx}
                  src={item.img}
                  className={`pattern-icon ${item.hideOnMobile ? 'hide-on-mobile' : ''}`}
                  style={{ top: item.top, left: item.left, transform: `rotate(${item.rot}deg)` }}
                  alt=""
                />
              ))}
            </div>
            <div className="explore-content">
              <h2 className="explore-title">EXPLORE OUR MENU</h2>
              <button className="explore-btn" onClick={() => setCurrentView('menu')}>View Full Menu</button>
            </div>
          </section>

          {/* Client Reviews Section */}
          <section
            className={`reviews-section ${reviewsInView ? 'reveal' : ''}`}
            ref={reviewsRef}
          >
            <h2 className="reviews-title">CLIENT REVIEWS</h2>
            <div className="reviews-grid">
              {clientReviews.map((review, idx) => (
                <div key={idx} className="review-card">
                  {review.fbLink ? (
                    <a href={review.fbLink} target="_blank" rel="noopener noreferrer" className="review-fb-link">
                      <FacebookIcon size={22} className="review-fb-icon" />
                    </a>
                  ) : (
                    <FacebookIcon size={22} className="review-fb-icon" />
                  )}
                  <div className="review-client-photo">
                    <img src={review.img} alt={review.author} />
                  </div>
                  <div className="review-stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={24} fill="currentColor" strokeWidth={0} />
                    ))}
                  </div>
                  <p className="review-text">"{review.text}"</p>
                  <p className="review-author">— {review.author}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="contact-section">
            <div className="contact-main">
              <h2 className="contact-title">CONTACT US</h2>
              <p className="contact-subtitle">
                Have a custom order or question? We'd love to hear from you.
              </p>
              <button className="contact-order-btn">Order now</button>
            </div>

            <div className="contact-footer" ref={contactFooterRef}>
              <div
                className={`contact-item ${expandedContactId === 'location' ? 'expanded' : ''}`}
                onClick={() => handleContactClick('location', 'https://maps.google.com?q=Together%20Turnkey%20Contractors%20Ltd,%20The%20Cottage,%2046%20Triq%20%C4%A6al%20Dwin,%20%C5%BBebbu%C4%A1&ftid=0x130e512c90f392f7:0xc38e40f6185a3f54&entry=gps&shh=CAE&lucs=,94297699,94284475,94231188,94280568,47071704,94218641,94282134,94286869&g_st=ic')}
              >
                <MapPin size={24} className="contact-icon" />
                <span className="contact-label">Ħaż-Żebbuġ, Malta</span>
              </div>
              <div
                className={`contact-item ${expandedContactId === 'instagram' ? 'expanded' : ''}`}
                onClick={() => handleContactClick('instagram', 'https://instagram.com/minibakes2021')}
              >
                <InstagramIcon size={24} className="contact-icon" />
                <span className="contact-label">Mini Bakes</span>
              </div>
              <div
                className={`contact-item ${expandedContactId === 'email' ? 'expanded' : ''}`}
                onClick={() => handleContactClick('email', 'mailto:meganbriffa2001@gmail.com')}
              >
                <Mail size={24} className="contact-icon" />
                <span className="contact-label">meganbriffa2001@gmail.com</span>
              </div>
              <div
                className={`contact-item ${expandedContactId === 'facebook' ? 'expanded' : ''}`}
                onClick={() => handleContactClick('facebook', 'https://www.facebook.com/minibakes2021')}
              >
                <FacebookIcon size={24} className="contact-icon" />
                <span className="contact-label">Mini Bakes</span>
              </div>
            </div>
          </section>

          {/* Mobile Popup Modal */}
          {expandedMobileCard !== null && (
            <div className="mobile-popup-overlay">
              <div className="mobile-popup-content">
                <button className="close-popup-btn" onClick={() => setExpandedMobileCard(null)}>
                  <X size={28} strokeWidth={1.5} />
                </button>
                <div className="popup-image-wrapper">
                  <SafeImage src={featuredItems[expandedMobileCard].img} alt={featuredItems[expandedMobileCard].name} />
                </div>
                <div className="popup-info">
                  <h3>{featuredItems[expandedMobileCard].name}</h3>
                  <p className="popup-price">{featuredItems[expandedMobileCard].price}</p>
                  <p className="popup-description">
                    Delicious and freshly baked just for you. Customize your order with our various options, premium ingredients, and boundless love.
                  </p>
                  <button className="add-to-cart-btn" onClick={() => {
                    setCustomizingProduct(featuredItems[expandedMobileCard]);
                    setExpandedMobileCard(null);
                    setCurrentView('product-details');
                  }}>Add to Order</button>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Search Product Popup Modal */}
      {selectedSearchProduct && (
        <div className="mobile-popup-overlay">
          <div className="mobile-popup-content">
            <button className="close-popup-btn" onClick={() => setSelectedSearchProduct(null)}>
              <X size={28} strokeWidth={1.5} />
            </button>
            <div className="popup-image-wrapper">
              <SafeImage src={selectedSearchProduct.img} alt={selectedSearchProduct.name} />
            </div>
            <div className="popup-info">
              <h3>{selectedSearchProduct.name}</h3>
              <p className="popup-price">{selectedSearchProduct.price}</p>
              <p className="popup-description">
                {selectedSearchProduct.description || "Delicious and freshly baked just for you. Customize your order with our various options, premium ingredients, and boundless love."}
              </p>
              <button className="add-to-cart-btn" onClick={() => {
                setCustomizingProduct(selectedSearchProduct);
                setSelectedSearchProduct(null);
                setCurrentView('product-details');
              }}>Add to Order</button>
            </div>
          </div>
        </div>
      )}

      {currentView === 'menu' && <MenuPage onSelectProduct={(item) => {
        setCustomizingProduct(item);
        setCurrentView('product-details');
      }} />}
      {currentView === 'studio' && <StudioPage />}
      {currentView === 'order' && <OrderPage
        cart={cart}
        onBack={() => setCurrentView('home')}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />}
      {currentView === 'product-details' && (
        <ProductDetailsPage
          product={customizingProduct}
          onBack={() => setCurrentView('menu')}
          cartCount={cart.length}
          onOpenCart={() => {
            if (window.innerWidth > 768) {
              setIsCartOpen(true);
            } else {
              setCurrentView('order');
            }
          }}
          onConfirm={(orderData) => {
            addToCart(orderData);
            if (window.innerWidth > 768) {
              setIsCartOpen(true);
            }
          }}
        />
      )}
      {currentView === 'care' && (
        <CakeCarePage onBack={() => setCurrentView('home')} />
      )}
      {currentView === 'contact' && (
        <ContactPage onBack={() => setCurrentView('home')} />
      )}

      {/* Desktop Cart Drawer */}
      <div className={`cart-drawer-overlay ${isCartOpen ? 'open' : ''}`} onClick={() => setIsCartOpen(false)}>
        <div className="cart-drawer" onClick={e => e.stopPropagation()}>
          <div className="cart-drawer-header">
            <h3>Your Order</h3>
            <button className="close-cart-btn" onClick={() => setIsCartOpen(false)}>
              <X size={28} />
            </button>
          </div>

          <div className="cart-drawer-content">
            {cart.length === 0 ? (
              <div className="empty-cart-state">
                <ShoppingBag size={48} opacity={0.2} />
                <p>Your order is empty</p>
                <button className="start-order-btn" onClick={() => { setIsCartOpen(false); setCurrentView('menu'); }}>Start Ordering</button>
              </div>
            ) : (
              <div className="cart-items-list">
                {cart.map((item, i) => (
                  <div key={item.cartId || i} className="cart-item-row">
                    {item.img ? (
                      <img src={item.img} alt={item.name} />
                    ) : (
                      <div className="cart-item-icon-fallback">
                        <Cake size={24} color="var(--secondary)" />
                      </div>
                    )}
                    <div className="cart-item-info">
                      <div className="cart-item-header">
                        <h4>{item.name}</h4>
                        <button className="remove-item-btn" onClick={() => removeFromCart(item.cartId)}><X size={14} /></button>
                      </div>
                      <p className="cart-item-meta">
                        {item.options.flavor && <span>{item.options.flavor}</span>}
                        {item.options.spread && <span> • {item.options.spread}</span>}
                      </p>
                      <div className="cart-item-price-qty">
                        <span>
                          {item.price === 'WA' ? (
                            <span 
                              className="price-wa-tag tooltip-trigger" 
                              data-tooltip="We will provide the final quote for this custom design via WhatsApp once your order is received."
                            >
                              <WhatsAppIcon size={14} />
                              <span>WA</span>
                            </span>
                          ) : item.price}
                        </span>
                        <span className="cart-qty">x{item.quantity}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="cart-drawer-footer">
            <div className="cart-total-row">
              <span>Total</span>
              <span>€{calculateTotal().toFixed(2)}</span>
            </div>
            <button
              className="buy-now-btn"
              disabled={cart.length === 0}
              onClick={() => {
                setCurrentView('order');
                setIsCartOpen(false);
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}

export default App;
