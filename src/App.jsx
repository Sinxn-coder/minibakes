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

import SafeImage from './components/SafeImage';
import { supabase } from './supabase';
import logo from './assets/mini_logo.webp';
import bg1 from './assets/headerbg3.webp';
const brownieImg = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/brownies/brownie.webp";
const cupcakeImg = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cupcake4.webp";
const cupcake1 = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cupcakes/butter1.webp";
const cupcake2 = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cupcakes/butter2.webp";
const cakeImg = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/roundcake1.webp";
import founderImg from './assets/founder.webp';
import style1 from './assets/style1.webp';
import style2 from './assets/style2.webp';
import style3 from './assets/stlye3.webp';
import style4 from './assets/style4.webp';
import style5 from './assets/style5.webp';
import style6 from './assets/style6.webp';
import style7 from './assets/style7.webp';
import style8 from './assets/style8.webp';
const orbitCupcake = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cupcakes/butter1.webp";
const orbitRoundCake = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cakes/round/round-(1).webp";
const orbitPop = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cake-pops/pops-(1).webp";
const orbitBrownie = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/brownies/brownie.webp";
const orbitSicle = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cake-sicles/cakesicles-(1).webp";
const orbitBreakableHeart = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/1.webp";
const orbitHeartCake = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/cakes/heart/heart-(1).webp";
const orbitBento = "https://xrcypnyewxnsnjwsixot.supabase.co/storage/v1/object/public/product-images/minicakes/1.webp";
import MenuPage from './MenuPage';
import OrderPage from './OrderPage';
import ProductDetailsPage from './ProductDetailsPage';
import StudioPage from './StudioPage';
import CakeCarePage from './CakeCarePage';
import ContactPage from './ContactPage';
import StoreClosedPage from './StoreClosedPage';
import review1 from './assets/reviews/one.webp';
import review2 from './assets/reviews/two.webp';
import review3 from './assets/reviews/three.webp';
import review4 from './assets/reviews/four.webp';
import review5 from './assets/reviews/5th.webp';
import review6 from './assets/reviews/6th.webp';
import ig1 from './assets/instgram/ig1.webp';
import ig2 from './assets/instgram/ig2.webp';
import ig3 from './assets/instgram/ig3.webp';
import ig4 from './assets/instgram/ig4.webp';
import ig5 from './assets/instgram/ig5.webp';
import ig6 from './assets/instgram/ig6.webp';

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

const InstaPost = ({ index, forceStatic }) => {
  const [currentIdx, setCurrentIdx] = useState(index % instaPosts.length);
  const [loaded, setLoaded] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (forceStatic) return;

    // Stagger the intervals so cards don't change at the same time
    // Base 2500ms + variation based on index
    const intervalTime = 2500 + ((index % 7) * 400);
    
    const timeoutId = setTimeout(() => {
      const intervalId = setInterval(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          setCurrentIdx((prev) => (prev + 1) % instaPosts.length);
          setIsTransitioning(false);
        }, 300); // 300ms fade out before changing src
      }, intervalTime);
      return () => clearInterval(intervalId);
    }, (index % 5) * 600);
    
    return () => clearTimeout(timeoutId);
  }, [index, forceStatic]);

  const post = instaPosts[currentIdx];

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
            alt={`Instagram Feed ${currentIdx + 1}`} 
            className={`insta-real-img ${loaded && !isTransitioning ? 'image-loaded' : 'image-loading'}`}
            onLoad={() => setLoaded(true)}
            style={{ 
              transition: 'opacity 0.4s ease-in-out, transform 0.4s ease-in-out',
              opacity: isTransitioning ? 0 : 1,
              transform: isTransitioning ? 'scale(0.95)' : 'scale(1)'
            }}
          />
        )}
      </a>
    </div>
  );
};

const LiveInstagramFeed = () => {
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    let attempts = 0;
    const checkTimer = setInterval(() => {
      attempts++;
      const beholdEl = document.querySelector('behold-widget') || document.querySelector('[data-behold-id="o0M2VzIL6Up3E2HsHNu4"]');
      
      if (beholdEl) {
        let text = beholdEl.textContent || '';
        if (beholdEl.shadowRoot) {
           text += ' ' + beholdEl.shadowRoot.textContent;
        }
        text = text.toLowerCase();
        
        const hasError = text.includes('error') || text.includes('not found') || text.includes('limit');
        
        // An error box is usually small, like < 200px. A real grid is much taller.
        const rect = beholdEl.getBoundingClientRect();
        const isSmallAndLoaded = attempts > 3 && rect.height > 10 && rect.height < 250;
        const isEmpty = attempts > 5 && rect.height === 0;
        
        if (hasError || isSmallAndLoaded || isEmpty) {
           setUseFallback(true);
           clearInterval(checkTimer);
        }
      }
      
      if (attempts > 10) clearInterval(checkTimer);
    }, 1000);

    return () => clearInterval(checkTimer);
  }, []);

  if (useFallback) {
    return (
      <div className="insta-row">
        {instaPosts.slice(0, 6).map((_, i) => (
          <InstaPost key={i} index={i} forceStatic={true} />
        ))}
      </div>
    );
  }

  // Use dangerouslySetInnerHTML so React doesn't track the replaced child node,
  // preventing "Failed to execute 'removeChild' on 'Node'" crashes.
  return (
    <div 
      className="behold-wrapper" 
      style={{ width: '100%' }}
      dangerouslySetInnerHTML={{ __html: '<div data-behold-id="o0M2VzIL6Up3E2HsHNu4"></div>' }}
    />
  );
};

const FeaturedCard = ({ item, onClick, className = "" }) => {
  return (
    <div className={`featured-card ${className}`}>
      <div className="card-image-wrapper">
        <SafeImage src={item.img} alt={item.name} />
      </div>
      <div className="card-info">
        <h3>{item.name}</h3>
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
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [storeSettings, setStoreSettings] = useState({
    whatsapp_number: '35679820529',
    instagram_link: 'https://instagram.com/minibakes2021',
    facebook_link: 'https://facebook.com/minibakes2021'
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { data, error } = await supabase.from('store_settings').select('*').limit(1).single();
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching settings:', error);
          return;
        }
        if (data) {
          setStoreSettings({
            whatsapp_number: data.whatsapp_number || '35679820529',
            instagram_link: data.instagram_link || 'https://instagram.com/minibakes2021',
            facebook_link: data.facebook_link || 'https://facebook.com/minibakes2021'
          });
        }
      } catch (e) {
        console.error('Failed to fetch settings:', e);
      }
    };
    
    const fetchAvailability = async () => {
      try {
        const { data, error } = await supabase.from('store_availability').select('*').limit(1).single();
        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching availability:', error);
          return;
        }
        if (data) {
          setStoreAvailability(data);
        }
      } catch (e) {
        console.error('Failed to fetch availability:', e);
      }
    };
    
    fetchSettings();
    fetchAvailability();
  }, []);

  const [storeAvailability, setStoreAvailability] = useState(null);
  const [isStoreClosed, setIsStoreClosed] = useState(false);

  useEffect(() => {
    if (!storeAvailability) return;
    let closed = false;
    if (storeAvailability.is_taking_orders_today === false) {
      closed = true;
    } else if (storeAvailability.vacation_start_date && storeAvailability.vacation_end_date) {
      const now = new Date();
      now.setHours(0, 0, 0, 0);
      const start = new Date(storeAvailability.vacation_start_date);
      const end = new Date(storeAvailability.vacation_end_date);
      if (now >= start && now <= end) {
        closed = true;
      }
    }
    setIsStoreClosed(closed);
  }, [storeAvailability]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('source') || params.get('utm_source') || params.get('ref');
    if (source) {
      localStorage.setItem('customer_source', source.toLowerCase());
    }
  }, []);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!searchQuery.trim() || !supabase) {
        setSearchResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .ilike('name', `%${searchQuery}%`)
          .not('name', 'ilike', '%3d custom cake%')
          .limit(10);
        
        if (error) throw error;
        setSearchResults(data || []);
      } catch (err) {
        console.error("Search error", err);
      } finally {
        setIsSearching(false);
      }
    };
    
    const timeoutId = setTimeout(fetchSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const [customizingProduct, setCustomizingProduct] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [isSplashFading, setIsSplashFading] = useState(false);

  useEffect(() => {
    // Start fading out after 2.6 seconds (leaving 0.4s for the fade transition)
    const fadeTimer = setTimeout(() => {
      setIsSplashFading(true);
    }, 2600);

    // Completely remove from DOM after 3.0 seconds
    const removeTimer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

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

  useEffect(() => {
    const handleOrderCompleted = () => {
      setCart([]);
    };
    window.addEventListener('minibakes_order_completed', handleOrderCompleted);
    return () => window.removeEventListener('minibakes_order_completed', handleOrderCompleted);
  }, []);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedDesktopCard, setExpandedDesktopCard] = useState(null);
  const [expandedMobileCard, setExpandedMobileCard] = useState(null);

  const [expandedContactId, setExpandedContactId] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [previousView, setPreviousView] = useState('home');
  const [menuActiveCategory, setMenuActiveCategory] = useState('Cakes');
  const [menuActiveSubcategory, setMenuActiveSubcategory] = useState(null);
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
    if (currentView !== 'product-details') {
      setPreviousView(currentView);
    }
    setCurrentView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  const contactFooterRef = useRef(null);
  const reviewsGridRef = useRef(null);

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

  // Auto-scroll reviews carousel
  useEffect(() => {
    const grid = reviewsGridRef.current;
    if (!grid) return;

    let isHovered = false;
    const handleMouseEnter = () => { isHovered = true; };
    const handleMouseLeave = () => { isHovered = false; };

    grid.addEventListener('mouseenter', handleMouseEnter);
    grid.addEventListener('mouseleave', handleMouseLeave);
    grid.addEventListener('touchstart', handleMouseEnter, { passive: true });
    grid.addEventListener('touchend', handleMouseLeave, { passive: true });

    let animationFrameId;
    const scroll = () => {
      if (!isHovered) {
        grid.scrollLeft += 0.8; // Silky speed
      }
      
      const N = grid.children.length / 2;
      if (N > 0 && grid.children[N]) {
        const singleSetWidth = grid.children[N].offsetLeft - grid.children[0].offsetLeft;
        if (grid.scrollLeft >= singleSetWidth) {
          grid.scrollLeft -= singleSetWidth;
        }
      }

      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
      grid.removeEventListener('mouseenter', handleMouseEnter);
      grid.removeEventListener('mouseleave', handleMouseLeave);
      grid.removeEventListener('touchstart', handleMouseEnter);
      grid.removeEventListener('touchend', handleMouseLeave);
    };
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
    setCart(prev => prev.map(item => {
      if (item.cartId === cartId) {
        const isMiniCake = item.id?.startsWith('mc');
        const minQty = isMiniCake ? 4 : 1;
        if (newQty < minQty) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => {
      const priceNum = parseFloat(item.price.replace(/[^\d.]/g, '')) || 0;
      return acc + (priceNum * item.quantity);
    }, 0);
  };

  const [featuredItems, setFeaturedItems] = useState([
    { id: 't-featured', img: brownieImg, name: 'Brownie Selection', price: '', description: 'Our most popular brownie assortment, baked fresh daily with premium chocolate.' },
    { id: 'cu-featured', img: cupcakeImg, name: 'Signature Cupcakes', price: '', description: 'A curated selection of our most loved cupcake flavors, perfect for any occasion.' },
    { id: 'c-featured', img: cakeImg, name: 'Best Seller cake', price: '', description: 'Our signature masterpiece cake, loved by everyone for its perfect balance of flavor.' },
  ]);

  useEffect(() => {
    const fetchFeatured = async () => {
      const isSupabaseLive = !!supabase;
      if (!isSupabaseLive) return;
      
      try {
        const { data, error } = await supabase
          .from('featured_items')
          .select('*')
          .order('slot');
        
        if (error) {
           if (error.message?.includes('fetch')) {
             console.log('Supabase connection skipped (Demo Mode)');
             return;
           }
           throw error;
        }
        if (data && data.length > 0) {
          // Merge with static images and filter empty
          const activeFeatured = data
            .filter(item => !item.isEmpty)
            .map((item, idx) => ({
              ...item,
              id: item.id || `featured-${item.slot}`,
              price: item.price ? item.price.replace(/Starting\s*From\s*/gi, '').replace(/Starting\s*/gi, '') : '',
              img: item.img || null
            }));
          
          if (activeFeatured.length > 0) {
            setFeaturedItems(activeFeatured);
          }
        }
      } catch (err) {
        if (!err.message?.includes('fetch')) {
          console.error('Error fetching featured items:', err);
        }
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

  const staticCategories = [
    { name: 'Custom Cakes', img: cakeImg },
    { name: 'Cupcakes', img: cupcakeImg },
    { name: 'Brownies & Blondies', img: brownieImg },
    { name: 'Cake Pops', img: orbitPop },
    { name: 'Breakable Hearts', img: orbitBreakableHeart }
  ];

  if (isStoreClosed) {
    return (
      <StoreClosedPage 
        storeAvailability={storeAvailability} 
        categories={staticCategories} 
        clientReviews={clientReviews} 
        storeSettings={storeSettings} 
        founderImg={founderImg} 
        FacebookIcon={FacebookIcon}
        bg1={bg1}
      />
    );
  }

  return (
    <div className="main-layout">
      {/* Premium Elegant Splash Screen */}
      {showSplash && (
        <div className={`splash-screen-overlay ${isSplashFading ? 'fade-out' : ''}`}>
          <div className="splash-content">
            <img src={logo} alt="Mini Bakes Logo" className="splash-logo" />
            <div className="splash-loader-bar">
              <div className="splash-loader-progress"></div>
            </div>
            <p className="splash-tagline">Crafting Sweetness for Every Celebration</p>
          </div>
        </div>
      )}

      {/* Fixed Background Layer */}
      <div className={`global-fixed-bg ${currentView === 'home' ? 'visible' : ''}`}>
        <div 
          className="hero-bg-image active" 
          style={{ backgroundImage: `url("${bg1}")` }} 
        />
        <div className="hero-overlay"></div>
      </div>

      {currentView !== 'product-details' && (
        <header className={`header ${isScrolled || currentView !== 'home' ? 'scrolled' : ''} ${isSearchOpen ? 'search-open' : ''}`}>
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
                    if (isSearching) {
                      return <div className="search-no-results">Searching...</div>;
                    }

                    if (searchResults.length === 0) {
                      return (
                        <div className="search-no-results">
                          No desserts found for "{searchQuery}"
                        </div>
                      );
                    }

                    return searchResults.map(item => (
                      <div
                        key={item.id}
                        className="search-result-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsSearchOpen(false);
                          setSearchQuery('');
                          setPreviousView(currentView);
                          setCustomizingProduct(item);
                          setCurrentView('product-details');
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
              <a href="#classes" className="nav-link" onClick={(e) => { e.preventDefault(); navigateTo('classes'); }}>Classes</a>
              <span className="nav-divider">|</span>
              <a href="#order" className="nav-link" onClick={(e) => {
                e.preventDefault();
                if (window.innerWidth > 768) setIsCartOpen(true);
                else navigateTo('order');
              }}>
                Order
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
      )}


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
              <a href="#classes" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('classes'); }}>Classes</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#care" className="mobile-nav-link" onClick={(e) => { e.preventDefault(); navigateTo('care'); }}>Cake Care</a>
            </div>
            <div className="nav-item-wrapper">
              <a href="#order" className="mobile-nav-link" onClick={() => { navigateTo('order'); }}>
                Order
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

      {currentView === 'product-details' ? (
        <ProductDetailsPage
          product={customizingProduct}
          onBack={() => setCurrentView(previousView)}
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
      ) : (
        <div key={currentView} className="page-transition-wrapper">
        {currentView === 'home' && (
        <>
          {/* Hero Section */}
          <section className="hero-section">
            <div className="hero-top-left-content">
              <h1 className="hero-celebration-text">
                <span className="hero-sans">Freshly baked for every</span><br />
                <span className="hero-serif-accent">celebration</span>
              </h1>

              <div className="hero-cta-buttons">
                <button className="hero-cta-btn primary" onClick={() => navigateTo('menu')}>
                  Browse Menu
                </button>
                <button className="hero-cta-btn secondary" onClick={() => navigateTo('classes')}>
                  Book a Class
                </button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="hero-scroll-indicator" onClick={() => featuredRef.current?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="scroll-mouse">
                <span className="scroll-wheel"></span>
              </span>
              <span className="scroll-text">Explore Desserts</span>
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
                        {featuredItems[expandedDesktopCard].description || "Delicious and freshly baked just for you. Customize your order with our various options, premium ingredients, and boundless love."}
                      </p>
                      
                      {featuredItems[expandedDesktopCard].highlights && featuredItems[expandedDesktopCard].highlights.length > 0 && (
                        <div className="featured-highlights-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
                          {featuredItems[expandedDesktopCard].highlights.map((h, i) => (
                            <div key={i} className="featured-highlight-item" style={{ background: '#f8f9fa', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
                              <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#800000', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>{h.title}</div>
                              <div style={{ fontSize: '12px', color: '#444', lineHeight: '1.4' }}>{h.text}</div>
                            </div>
                          ))}
                        </div>
                      )}
                      <button className="add-to-cart-btn" onClick={() => {
                        setPreviousView(currentView);
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
              <a href={storeSettings.instagram_link} target="_blank" rel="noopener noreferrer" className="insta-handle">
                @minibakes2021
              </a>
            </div>
            
            <div className="insta-feed-container" style={{ padding: '0 2rem' }}>
              <LiveInstagramFeed />
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
            <div className="reviews-grid" ref={reviewsGridRef}>
              {[...clientReviews, ...clientReviews].map((review, idx) => (
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
                onClick={() => handleContactClick('instagram', storeSettings.instagram_link)}
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
                onClick={() => handleContactClick('facebook', storeSettings.facebook_link)}
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
                    {featuredItems[expandedMobileCard].description || "Delicious and freshly baked just for you. Customize your order with our various options, premium ingredients, and boundless love."}
                  </p>

                  {featuredItems[expandedMobileCard].highlights && featuredItems[expandedMobileCard].highlights.length > 0 && (
                    <div className="featured-highlights-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
                      {featuredItems[expandedMobileCard].highlights.map((h, i) => (
                        <div key={i} style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', background: '#fcfcfc', padding: '10px', borderRadius: '8px', border: '1px solid #eee' }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '10px', fontWeight: 'bold', color: '#800000', textTransform: 'uppercase', marginBottom: '2px' }}>{h.title}</div>
                            <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.4' }}>{h.text}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                  <button className="add-to-cart-btn" onClick={() => {
                    setPreviousView(currentView);
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

      {currentView === 'menu' && <MenuPage 
        activeCategory={menuActiveCategory}
        setActiveCategory={setMenuActiveCategory}
        activeSubcategory={menuActiveSubcategory}
        setActiveSubcategory={setMenuActiveSubcategory}
        storeSettings={storeSettings}
        onSelectProduct={(item) => {
          setPreviousView(currentView);
          setCustomizingProduct(item);
          setCurrentView('product-details');
        }} 
      />}
      {currentView === 'classes' && <StudioPage />}
      {currentView === 'order' && <OrderPage
        cart={cart}
        onBack={() => setCurrentView('home')}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
        storeSettings={storeSettings}
      />}
          {currentView === 'care' && (
            <CakeCarePage onBack={() => setCurrentView('home')} />
          )}
          {currentView === 'contact' && (
            <div className="view-transition-content">
              <ContactPage onBack={() => setCurrentView('home')} storeSettings={storeSettings} />
            </div>
          )}
        </div>
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
