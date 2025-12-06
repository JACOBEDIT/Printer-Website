import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

// --- TYPES ---
interface Product {
  id: string;
  name: string;
  category: 'Scanner' | 'Printer' | 'Mobility' | 'POS' | 'Fixed Scanner';
  description: string;
  specs: string[];
  price: number;
  image: string;
  rating: number;
  reviewCount: number;
}

interface CartItem extends Product {
  quantity: number;
}

// --- DATA EXTRACTED FROM PDF ---
const PRODUCTS: Product[] = [
  // --- Mobility Devices ---
  {
    id: 'hs65',
    name: 'HS65 Mobility Device',
    category: 'Mobility',
    description: 'High performance octa-core 2.0GHz processor with Android 14. 6.5" large display with 450 nits brightness. IP67 & 1.8m drop resistance.',
    specs: [
      'Processor: Octa-core 2.0GHz',
      'OS: Android 14 (Upgradeable to 16)',
      'Display: 6.5" (720*1600)',
      'Memory: 6GB RAM / 64GB Storage',
      'Battery: 5050mAh',
      'Connectivity: BT 5.2, 4G, Wi-Fi',
      'Scanner: High performance 2D'
    ],
    price: 24999,
    image: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=500&q=80',
    rating: 4.5,
    reviewCount: 12
  },
  {
    id: 'ht1pro',
    name: 'HT1 Pro Mobility Device',
    category: 'Mobility',
    description: 'Rugged mobility device with IP65/IP67 rating and 1.5m drop resistance. Works immediately in tough environments.',
    specs: [
      'OS: Android 14',
      'Durability: IP65/IP67, 1.5m drop',
      'Working Temp: -20° to 60°',
      'Memory: 6GB RAM / 64GB Storage',
      'Scanner: 2D with >=3.3mil accuracy',
      'Battery: 5000mAh'
    ],
    price: 22499,
    image: 'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=500&q=80',
    rating: 4.2,
    reviewCount: 8
  },
  {
    id: 'k8',
    name: 'K8 Rugged Handheld',
    category: 'Mobility',
    description: 'Sturdy device with 38-key keypad and One key PTT (push to talk). Includes dual front-back noise canceling microphones.',
    specs: [
      'OS: Android 12.0',
      'Keypad: 38 Keys',
      'Battery: 6700mAh',
      'Durability: IP68 & 1.8m drop',
      'Audio: 2W high power speaker',
      'Network: Wi-Fi 5G PA amplifier'
    ],
    price: 28999,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewCount: 24
  },
  {
    id: 'p1',
    name: 'P1 Industrial Tablet',
    category: 'Mobility',
    description: '10" HD Display tablet with Gorilla Glass protection. Built for retail, logistics, and field service applications.',
    specs: [
      'Display: 10" HD (1920*1200)',
      'Protection: Gorilla Glass, IP65',
      'OS: Android 13.0',
      'Battery: 10000mAh',
      'Memory: 4GB RAM / 64GB Storage'
    ],
    price: 35999,
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewCount: 5
  },

  // --- Scanners ---
  {
    id: 'bs513',
    name: 'BS513 Series Scanner',
    category: 'Scanner',
    description: 'Ultra Rugged Design IP68 & 3m Drop tested. Advanced illumination technology for capturing blurred or damaged codes.',
    specs: [
      'Rating: IP68',
      'Drop Test: 3m',
      'Tech: Quad core decoding',
      'Features: DPM code reading (dot peen, laser etch)',
      'Connectivity: BT, Wired (RS232/USB)'
    ],
    price: 8999,
    image: 'https://images.unsplash.com/photo-1591462393223-9c878e121287?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewCount: 42
  },
  {
    id: 'bs512',
    name: 'BS512 Series Scanner',
    category: 'Scanner',
    description: 'Quad-core decoding chip enabled with AI algorithm. White point light with red+blue surface light.',
    specs: [
      'AI Algorithm: Yes',
      'Contrast: Minimum reading 6%',
      'Motion Tolerance: 2m/s (up to 8m/s)',
      'Rating: IP67',
      'Options: HD/XD Scan Engines'
    ],
    price: 7499,
    image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    reviewCount: 15
  },
  {
    id: 'bs510',
    name: 'BS510 Series Scanner',
    category: 'Scanner',
    description: 'Advanced SmartLight 3.0 technology. Lightweight ergonomic design reducing operator fatigue.',
    specs: [
      'Weight: 158g-211g',
      'Rating: IP52',
      'Battery: 12+ hours',
      'Range: 2.5cm to 46cm',
      'Compatibility: Windows, Android, Linux'
    ],
    price: 4999,
    image: 'https://images.unsplash.com/photo-1556740753-82ff43d5885f?auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    reviewCount: 102
  },

  // --- Fixed Scanners ---
  {
    id: 'ifs610',
    name: 'IFS610 Fixed Scanner',
    category: 'Fixed Scanner',
    description: 'Ultra compact size with proprietary deep learning algorithm. Ideal for hands-free operation in retail and logistics.',
    specs: [
      'Size: Ultra compact',
      'Sensor: 0.4MP & 1.6MP options',
      'Light Source: Default white, Red/Blue optional'
    ],
    price: 12999,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=500&q=80',
    rating: 4.0,
    reviewCount: 3
  },
  {
    id: 'ifs640',
    name: 'IFS640 Industrial Scanner',
    category: 'Fixed Scanner',
    description: 'Ultra large FOV with 6MP & 20MP image sensor options. Wide depth of field (60mm-800mm) with autofocus.',
    specs: [
      'Resolution: 6MP / 20MP',
      'FOV: Large',
      'Focus: Autofocus lens',
      'Protocols: TCP, Serial, FTP, Profinet, ModBus',
      'Rating: IP67'
    ],
    price: 45000,
    image: 'https://images.unsplash.com/photo-1516131206008-dd041a9764fd?auto=format&fit=crop&w=500&q=80',
    rating: 5.0,
    reviewCount: 1
  },

  // --- Printers ---
  {
    id: 'ilp5210',
    name: 'ILP5210 Industrial Label Printer',
    category: 'Printer',
    description: 'Strong Build. Fast Labels. Bigger Impact. Engineered for real-world demands with metal construction.',
    specs: [
      'Resolution: 203 DPI',
      'Print Speed: 10 ips',
      'Ribbon Capacity: 450m',
      'Memory: 256MB RAM / 256MB Flash',
      'Display: 2.5" LCD'
    ],
    price: 32000,
    image: 'https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=500&q=80',
    rating: 4.7,
    reviewCount: 18
  },
  {
    id: 'ilp5308',
    name: 'ILP5308 Industrial Label Printer',
    category: 'Printer',
    description: 'High resolution 300 DPI printing for precision. Supports ZPL, ZPL-II, TSPL, EPL2, DPL emulations.',
    specs: [
      'Resolution: 300 DPI',
      'Print Speed: 8 ips',
      'Max Width: 104mm',
      'Connectivity: USB, Ethernet, Serial, BT',
      'Optional: Wi-Fi, GPIO'
    ],
    price: 36000,
    image: 'https://images.unsplash.com/photo-1616400619175-5beda3a17896?auto=format&fit=crop&w=500&q=80',
    rating: 4.8,
    reviewCount: 11
  },
  {
    id: 'lp2640',
    name: 'LP2640 Label Printer',
    category: 'Printer',
    description: 'Mechanism structure design for easy maintenance. 1.1GHz 32-bit RISC processor.',
    specs: [
      'Processor: 1.1GHz',
      'Software: Free Seagull Windows driver & Bartender',
      'Emulation: ZPL-II, DPL, TSPL',
      'Ribbon: 300m capacity'
    ],
    price: 18500,
    image: 'https://images.unsplash.com/photo-1617575521317-d2971f48efb4?auto=format&fit=crop&w=500&q=80',
    rating: 4.4,
    reviewCount: 9
  },
  {
    id: 'dt48',
    name: 'DT48 Desktop Printer',
    category: 'Printer',
    description: 'Compact size and lightweight design. Printing speed up to 8 ips (200 mm/s).',
    specs: [
      'Speed: 8 ips',
      'Type: Direct Thermal',
      'Design: Compact',
      'Connectivity: USB, Ethernet (Optional BT/WiFi)'
    ],
    price: 11000,
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=500&q=80',
    rating: 4.3,
    reviewCount: 20
  },
  {
    id: 'mlp3120',
    name: 'MLP3120 Mobile Printer',
    category: 'Printer',
    description: 'Blazing print speed with OLED Display. Compact & Lightweight design with IP54 rating.',
    specs: [
      'Speed: 120mm/sec',
      'Protection: IP54',
      'Feature: NFC bump pairing',
      'Connectivity: USB, Wi-Fi, BT',
      'Paper Roll: 50mm dia'
    ],
    price: 14500,
    image: 'https://images.unsplash.com/photo-1588612502809-913364234027?auto=format&fit=crop&w=500&q=80',
    rating: 4.6,
    reviewCount: 30
  },

  // --- POS ---
  {
    id: 'tp616ca',
    name: 'TP616CA Touch POS',
    category: 'POS',
    description: 'Slim, VESA-Mountable, Scalable. 21.5" Full HD True-Flat Touch Screen.',
    specs: [
      'Screen: 21.5" Full HD PCAP Touch',
      'Processor: MediaTek Genio700 (MT8390)',
      'Memory: 4GB/8GB DDR4',
      'Storage: 64GB eMMC',
      'Mount: VESA'
    ],
    price: 42000,
    image: 'https://images.unsplash.com/photo-1556742031-c6961e8560b0?auto=format&fit=crop&w=500&q=80',
    rating: 4.9,
    reviewCount: 4
  }
];

// --- COMPONENTS ---

const Header = ({ 
  cartCount, 
  onNavigate, 
  onSearch 
}: { 
  cartCount: number, 
  onNavigate: (view: string, category?: string) => void,
  onSearch: (term: string) => void
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <header className="sticky-top">
      {/* Top Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-tvse-blue py-2">
        <div className="container-fluid">
          <a className="navbar-brand text-white d-flex align-items-center" href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <span className="bg-white text-primary px-2 py-0 rounded me-1 fst-normal">TVSE</span>
            <span className="fs-5">ELECTRONICS</span>
          </a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarContent">
            {/* Search Bar */}
            <form className="d-flex flex-grow-1 mx-lg-4 my-2 my-lg-0" onSubmit={handleSearch}>
              <div className="input-group">
                <button className="btn btn-light dropdown-toggle bg-light border-0" type="button">All</button>
                <input 
                  className="form-control" 
                  type="search" 
                  placeholder="Search TVSE products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-tvse-yellow" type="submit">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </form>

            {/* Right Side Icons */}
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="#" onClick={(e) => {e.preventDefault(); onNavigate('help');}}>
                  <div className="small">Hello, Sign in</div>
                  <div className="fw-bold">Account & Lists</div>
                </a>
              </li>
              <li className="nav-item me-3">
                <a className="nav-link text-white" href="#" onClick={(e) => {e.preventDefault(); onNavigate('help');}}>
                  <div className="small">Returns</div>
                  <div className="fw-bold">& Orders</div>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white position-relative" href="#" onClick={(e) => { e.preventDefault(); onNavigate('cart'); }}>
                  <i className="fas fa-shopping-cart fa-lg"></i>
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-tvse-orange">
                    {cartCount}
                  </span>
                  <span className="fw-bold ms-1">Cart</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Sub Menu */}
      <div className="bg-dark py-1">
        <div className="container-fluid">
          <ul className="nav">
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('home');}}><i className="fas fa-bars me-1"></i> All</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('list', 'Printer');}}>Printers</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('list', 'Scanner');}}>Barcode Scanners</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('list', 'Fixed Scanner');}}>Fixed Scanners</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('list', 'Mobility');}}>Mobility Devices</a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('list', 'POS');}}>POS Systems</a>
            </li>
            <li className="nav-item ms-auto">
              <a className="nav-link text-white py-1 px-2" href="#" onClick={(e) => {e.preventDefault(); onNavigate('deploy');}}>How to Deploy</a>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
};

const Footer = () => (
  <footer className="bg-dark text-white pt-5 mt-5">
    <div className="container">
      <div className="row g-4">
        <div className="col-md-3">
          <h5 className="mb-3">Get to Know Us</h5>
          <ul className="list-unstyled text-secondary">
            <li><a href="#" className="text-secondary text-decoration-none">About TVSE</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Careers</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Press Releases</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">TVSE Science</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-3">Connect with Us</h5>
          <ul className="list-unstyled text-secondary">
            <li><a href="#" className="text-secondary text-decoration-none">Facebook</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Twitter</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Instagram</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">LinkedIn</a></li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-3">Contact Us</h5>
          <ul className="list-unstyled text-secondary small">
            <li className="mb-2"><i className="fas fa-map-marker-alt me-2"></i>Arihant E - Park, 7th & 9th Floor, No. 117/1, LB Road, Adyar, Chennai 600 020</li>
            <li className="mb-2"><i className="fas fa-phone me-2"></i>+7550009339 / 9840460675</li>
            <li className="mb-2"><i className="fas fa-envelope me-2"></i>sales-support@tvs-e.in</li>
          </ul>
        </div>
        <div className="col-md-3">
          <h5 className="mb-3">Make Money with Us</h5>
          <ul className="list-unstyled text-secondary">
            <li><a href="#" className="text-secondary text-decoration-none">Sell on TVSE</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Protect and Build Your Brand</a></li>
            <li><a href="#" className="text-secondary text-decoration-none">Become an Affiliate</a></li>
          </ul>
        </div>
      </div>
      <hr className="border-secondary my-4" />
      <div className="text-center pb-4 text-secondary small">
        <p className="mb-0">&copy; 2024 TVS Electronics. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

const Hero = ({ onShopNow }: { onShopNow: () => void }) => (
  <div className="position-relative bg-light mb-4">
    <div className="container-fluid p-0">
      <div className="bg-tvse-blue text-white p-5 text-center" style={{ minHeight: '350px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #004481 0%, #002a50 100%)' }}>
        <h1 className="display-4 fw-bold mb-3">EMPOWERING BUSINESSES</h1>
        <h2 className="h3 mb-4 text-warning">WITH PRECISION, RUGGED, SCALABLE AIDC SOLUTIONS</h2>
        <p className="lead mb-4">Printer, Scanner, and Tablet Integration for On-The-Go Professionals.</p>
        <div>
          <button className="btn btn-tvse-yellow btn-lg text-dark px-5 fw-bold" onClick={onShopNow}>Shop Now</button>
        </div>
      </div>
    </div>
  </div>
);

const ProductCard: React.FC<{ product: Product; onSelect: (p: Product) => void; onAdd: (p: Product) => void }> = ({ product, onSelect, onAdd }) => (
  <div className="col-6 col-md-4 col-lg-3 mb-4">
    <div className="product-card d-flex flex-column p-3 h-100 cursor-pointer" onClick={() => onSelect(product)} style={{cursor: 'pointer'}}>
      <div className="product-img-container mb-3">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="flex-grow-1">
        <h6 className="card-title text-truncate mb-1 text-primary">{product.name}</h6>
        <div className="rating mb-1">
           {[...Array(5)].map((_, i) => (
             <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-muted'}`}></i>
           ))}
           <span className="text-muted ms-1 small">({product.reviewCount})</span>
        </div>
        <div className="price mb-2">₹{product.price.toLocaleString()}</div>
        <p className="small text-muted mb-2" style={{display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
          {product.description}
        </p>
      </div>
      <button 
        className="btn btn-tvse-yellow w-100 rounded-pill mt-2 btn-sm"
        onClick={(e) => {
          e.stopPropagation();
          onAdd(product);
        }}
      >
        Add to Cart
      </button>
    </div>
  </div>
);

const ProductDetail = ({ product, onAdd, onBack }: { product: Product, onAdd: (p: Product) => void, onBack: () => void }) => (
  <div className="container py-4 bg-white rounded shadow-sm my-4">
    <button className="btn btn-link text-decoration-none mb-3" onClick={onBack}>
      <i className="fas fa-arrow-left me-2"></i>Back to results
    </button>
    <div className="row">
      <div className="col-md-5 mb-4">
        <div className="border p-5 d-flex justify-content-center align-items-center" style={{minHeight: '400px'}}>
          <img src={product.image} alt={product.name} className="img-fluid" style={{maxHeight: '350px'}} />
        </div>
      </div>
      <div className="col-md-4">
        <h2 className="mb-2">{product.name}</h2>
        <div className="mb-2">
          <span className="badge bg-tvse-blue me-2">{product.category}</span>
          <span className="text-warning">
             {[...Array(5)].map((_, i) => (
               <i key={i} className={`fas fa-star ${i < Math.floor(product.rating) ? '' : 'text-muted'}`}></i>
             ))}
          </span>
          <span className="ms-2 text-primary">{product.reviewCount} ratings</span>
        </div>
        <hr />
        <div className="mb-3">
          <span className="h3">₹{product.price.toLocaleString()}</span>
          <span className="text-muted small d-block">Inclusive of all taxes</span>
        </div>
        <div className="mb-4">
          <h5>About this item</h5>
          <ul className="list-group list-group-flush">
            {product.specs.map((spec, idx) => (
              <li key={idx} className="list-group-item px-0 py-1 border-0 d-flex">
                <i className="fas fa-check text-success me-2 mt-1"></i>
                <span>{spec}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-3">
          <strong>Description:</strong>
          <p className="text-muted mt-1">{product.description}</p>
        </div>
      </div>
      <div className="col-md-3">
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title text-danger mb-3">₹{product.price.toLocaleString()}</h5>
            <div className="text-success mb-3 fw-bold">In Stock.</div>
            <div className="mb-3 small">
               Sold by <a href="#" className="text-decoration-none">TVS Electronics</a> and fulfilled by TVSE.
            </div>
            <div className="d-grid gap-2">
              <button className="btn btn-tvse-yellow rounded-pill" onClick={() => onAdd(product)}>Add to Cart</button>
              <button className="btn btn-tvse-orange rounded-pill">Buy Now</button>
            </div>
            <hr />
            <div className="small text-muted">
              <div className="mb-1"><i className="fas fa-lock me-2"></i>Secure transaction</div>
              <div className="mb-1"><i className="fas fa-shipping-fast me-2"></i>Fast Delivery</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Cart = ({ items, onUpdate, onCheckout, onContinue }: { items: CartItem[], onUpdate: (id: string, qty: number) => void, onCheckout: () => void, onContinue: () => void }) => {
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="container py-5 my-4 bg-white rounded shadow-sm text-center">
        <h2 className="mb-4">Your Cart is Empty</h2>
        <p className="text-muted mb-4">Looks like you haven't added any TVSE products yet.</p>
        <button className="btn btn-tvse-yellow" onClick={onContinue}>Shop TVSE Products</button>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="row">
        <div className="col-lg-9">
          <div className="bg-white p-4 rounded shadow-sm mb-4">
            <h3 className="mb-3">Shopping Cart</h3>
            <div className="text-end border-bottom pb-1 mb-3">Price</div>
            {items.map(item => (
              <div key={item.id} className="row border-bottom py-3">
                <div className="col-md-2">
                  <img src={item.image} alt={item.name} className="img-fluid" />
                </div>
                <div className="col-md-8">
                  <h5 className="text-primary cursor-pointer">{item.name}</h5>
                  <div className="text-success small mb-2">In Stock</div>
                  <div className="d-flex align-items-center">
                    <select 
                      className="form-select form-select-sm w-auto me-3" 
                      value={item.quantity}
                      onChange={(e) => onUpdate(item.id, parseInt(e.target.value))}
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i+1} value={i+1}>Qty: {i+1}</option>
                      ))}
                    </select>
                    <button className="btn btn-link btn-sm text-decoration-none" onClick={() => onUpdate(item.id, 0)}>Delete</button>
                  </div>
                </div>
                <div className="col-md-2 text-end fw-bold">
                  ₹{item.price.toLocaleString()}
                </div>
              </div>
            ))}
            <div className="text-end pt-3">
              <span className="h5">Subtotal ({totalItems} items): <strong>₹{subtotal.toLocaleString()}</strong></span>
            </div>
          </div>
        </div>
        <div className="col-lg-3">
          <div className="bg-white p-3 rounded shadow-sm">
            <div className="mb-3">
              <i className="fas fa-check-circle text-success me-2"></i>
              <span className="small text-success">Part of your order qualifies for FREE Delivery.</span>
            </div>
            <h5 className="mb-3">Subtotal ({totalItems} items): <strong>₹{subtotal.toLocaleString()}</strong></h5>
            <button className="btn btn-tvse-yellow w-100 rounded-pill" onClick={onCheckout}>Proceed to Buy</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DeploymentGuide = () => (
  <div className="container py-5 bg-white my-4 rounded shadow-sm">
    <h2 className="mb-4 text-primary">Deployment Guide</h2>
    <p>Follow these steps to deploy this TVSE E-commerce application.</p>
    
    <div className="accordion" id="deployAccordion">
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#step1">
            1. Prerequisites
          </button>
        </h2>
        <div id="step1" className="accordion-collapse collapse show">
          <div className="accordion-body">
            You need <strong>Node.js</strong> installed on your system. This project uses <strong>React</strong> and <strong>Bootstrap</strong>.
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step2">
            2. File Structure
          </button>
        </h2>
        <div id="step2" className="accordion-collapse collapse">
          <div className="accordion-body">
            Ensure you have the following files in your folder:
            <ul>
              <li><code>index.html</code> (The entry point)</li>
              <li><code>index.tsx</code> (The React application code)</li>
            </ul>
            <div className="alert alert-info">Note: In a standard React environment, <code>index.tsx</code> would be in a <code>src</code> folder, but for this simplified environment, they are in the root.</div>
          </div>
        </div>
      </div>
      <div className="accordion-item">
        <h2 className="accordion-header">
          <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#step3">
            3. Hosting Options
          </button>
        </h2>
        <div id="step3" className="accordion-collapse collapse">
          <div className="accordion-body">
            <strong>Static Hosting (Netlify/Vercel):</strong>
            <ol>
              <li>Create a production build using <code>npm run build</code> (if using Create React App).</li>
              <li>Upload the <code>build</code> folder to Netlify Drop or connect your GitHub repository to Vercel.</li>
            </ol>
            <strong>Simple Server:</strong>
            <p>You can serve the <code>index.html</code> file using any static file server like <code>serve</code> or Python's http.server.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---

const App = () => {
  const [view, setView] = useState('home'); // home, list, detail, cart, deploy
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  // Cart Logic
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert(`Added ${product.name} to cart`);
  };

  const updateCart = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCart(prev => prev.filter(item => item.id !== id));
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  // Navigation Logic
  const handleNavigate = (newView: string, category?: string) => {
    setView(newView);
    setActiveCategory(category);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setView('detail');
    window.scrollTo(0, 0);
  };

  const handleSearch = (term: string) => {
    setSearchQuery(term);
    setView('list');
    setActiveCategory(undefined);
  };

  // Filtering Logic
  let filteredProducts = PRODUCTS;
  if (activeCategory) {
    filteredProducts = PRODUCTS.filter(p => p.category === activeCategory);
  }
  if (searchQuery) {
    filteredProducts = PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // View Routing
  let content;
  if (view === 'home') {
    content = (
      <>
        <Hero onShopNow={() => handleNavigate('list')} />
        <div className="container mb-5">
          <h3 className="mb-4">Featured Categories</h3>
          <div className="row g-4 mb-5">
             <div className="col-md-3">
               <div className="card h-100 p-3 text-center cursor-pointer" onClick={() => handleNavigate('list', 'Scanner')}>
                 <h4>Scanners</h4>
                 <img src="https://images.unsplash.com/photo-1595303526913-c7037797be77?auto=format&fit=crop&w=200&q=80" className="img-fluid my-2" alt="Scanners"/>
                 <span className="text-primary">Shop now</span>
               </div>
             </div>
             <div className="col-md-3">
               <div className="card h-100 p-3 text-center cursor-pointer" onClick={() => handleNavigate('list', 'Printer')}>
                 <h4>Printers</h4>
                 <img src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=200&q=80" className="img-fluid my-2" alt="Printers"/>
                 <span className="text-primary">Shop now</span>
               </div>
             </div>
             <div className="col-md-3">
               <div className="card h-100 p-3 text-center cursor-pointer" onClick={() => handleNavigate('list', 'Mobility')}>
                 <h4>Mobility</h4>
                 <img src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=200&q=80" className="img-fluid my-2" alt="Mobility"/>
                 <span className="text-primary">Shop now</span>
               </div>
             </div>
             <div className="col-md-3">
               <div className="card h-100 p-3 text-center cursor-pointer" onClick={() => handleNavigate('list', 'POS')}>
                 <h4>POS Systems</h4>
                 <img src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&w=200&q=80" className="img-fluid my-2" alt="POS"/>
                 <span className="text-primary">Shop now</span>
               </div>
             </div>
          </div>

          <h3 className="mb-4">Top Sellers</h3>
          <div className="row">
            {PRODUCTS.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} onSelect={handleProductSelect} onAdd={addToCart} />
            ))}
          </div>
        </div>
      </>
    );
  } else if (view === 'list') {
    content = (
      <div className="container py-4">
        <h3 className="mb-4">{searchQuery ? `Search Results for "${searchQuery}"` : (activeCategory ? `${activeCategory}s` : 'All Products')}</h3>
        <div className="row">
          {filteredProducts.length > 0 ? (
            filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onSelect={handleProductSelect} onAdd={addToCart} />
            ))
          ) : (
            <div className="col-12 text-center py-5">
              <h4>No products found.</h4>
              <button className="btn btn-primary mt-3" onClick={() => handleNavigate('home')}>Go Home</button>
            </div>
          )}
        </div>
      </div>
    );
  } else if (view === 'detail' && selectedProduct) {
    content = (
      <ProductDetail 
        product={selectedProduct} 
        onAdd={addToCart} 
        onBack={() => setView('list')} 
      />
    );
  } else if (view === 'cart') {
    content = (
      <Cart 
        items={cart} 
        onUpdate={updateCart} 
        onCheckout={() => alert('Proceeding to Checkout mock!')} 
        onContinue={() => handleNavigate('home')}
      />
    );
  } else if (view === 'deploy') {
    content = <DeploymentGuide />;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header 
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)} 
        onNavigate={handleNavigate} 
        onSearch={handleSearch}
      />
      <main className="flex-grow-1">
        {content}
      </main>
      <Footer />
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);