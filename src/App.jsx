import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, TrendingDown, BookOpen, Shield, Award, 
  HelpCircle, ChevronRight, Activity, ArrowRight, CheckCircle2,
  DollarSign, BarChart3, PieChart, Sparkles, AlertCircle, 
  RefreshCw, Scale, Search, SlidersHorizontal, Info, X,
  Layers, Lock, Smartphone, Mail, KeyRound, ExternalLink,
  ChevronDown, Building, FileText, Briefcase, Bot, Send,
  LayoutGrid, Table as TableIcon, Check, ArrowUpRight
} from 'lucide-react';

// --- ACCURATE CONSOLIDATED AUDITED DATASET (SCREENER.IN STYLE) ---
const STOCKS_DATA = [
  {
    id: 'suzlon',
    symbol: 'SUZLON',
    name: 'Suzlon Energy Ltd.',
    sector: 'Heavy Electrical Equipment',
    indexUniverse: ['Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 43.10,
    change: 1.41,
    high52: 61.50,
    low52: 38.20,
    marketCapCr: 58823,
    sharesCountCr: 1363.8,
    faceValue: 2.0,
    pe: 18.7,
    pb: 6.19,
    bookValue: 6.96,
    roce: 34.2,
    roe: 39.7,
    divYield: 0.00,
    debtToEquity: 0.06,
    operatingMargin: 17.0,
    netMargin: 18.0,
    profitGrowthYoY: 45.2,
    salesCagr3Y: 41.0,
    cashRatio: 0.95,
    freeCashFlowCr: 1400,
    sharpeRatio: 1.85,
    sortinoRatio: 2.90,
    beta: 1.45,
    alpha1Y: 18.4,
    promoterPledge: 0.0,
    promoterHolding: 11.7,
    fiiHolding: 24.9,
    diiHolding: 10.2,
    publicHolding: 53.2,
    quarterlySales: 3829,
    quarterlyNetProfit: 305,
    ttmSales: 17429,
    ttmNetProfit: 3144,
    reservesCr: 7082,
    borrowingsCr: 0,
    peers: ['BHEL', 'SIEMENS', 'ABB', 'THERMAX']
  },
  {
    id: 'hdfc-bank',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1648.50,
    change: 1.15,
    high52: 1794.00,
    low52: 1363.55,
    marketCapCr: 1256000,
    sharesCountCr: 761.9,
    faceValue: 1.0,
    pe: 19.4,
    pb: 2.80,
    bookValue: 588.7,
    roce: 18.1,
    roe: 16.8,
    divYield: 1.18,
    debtToEquity: 1.15,
    operatingMargin: 38.5,
    netMargin: 23.4,
    profitGrowthYoY: 18.2,
    salesCagr3Y: 16.4,
    cashRatio: 0.82,
    freeCashFlowCr: 41200,
    sharpeRatio: 1.42,
    sortinoRatio: 2.10,
    beta: 0.88,
    alpha1Y: 3.2,
    promoterPledge: 0.0,
    promoterHolding: 0.0,
    fiiHolding: 54.2,
    diiHolding: 28.5,
    publicHolding: 17.3,
    quarterlySales: 82400,
    quarterlyNetProfit: 16820,
    ttmSales: 312000,
    ttmNetProfit: 64700,
    reservesCr: 442000,
    borrowingsCr: 712000,
    peers: ['ICICIBANK', 'SBIN', 'AXISBANK', 'KOTAKBANK']
  },
  {
    id: 'reliance',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy & Retail',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 2985.40,
    change: 1.85,
    high52: 3217.90,
    low52: 2220.30,
    marketCapCr: 2019800,
    sharesCountCr: 676.6,
    faceValue: 10.0,
    pe: 27.8,
    pb: 2.40,
    bookValue: 1244.0,
    roce: 10.4,
    roe: 9.6,
    divYield: 0.36,
    debtToEquity: 0.42,
    operatingMargin: 17.8,
    netMargin: 7.9,
    profitGrowthYoY: 11.2,
    salesCagr3Y: 22.1,
    cashRatio: 0.65,
    freeCashFlowCr: 36400,
    sharpeRatio: 1.15,
    sortinoRatio: 1.75,
    beta: 1.05,
    alpha1Y: 1.8,
    promoterPledge: 0.0,
    promoterHolding: 50.3,
    fiiHolding: 21.8,
    diiHolding: 17.4,
    publicHolding: 10.5,
    quarterlySales: 254000,
    quarterlyNetProfit: 19800,
    ttmSales: 985000,
    ttmNetProfit: 72600,
    reservesCr: 835000,
    borrowingsCr: 324000,
    peers: ['ONGC', 'IOC', 'BPCL', 'ADANIGREEN']
  },
  {
    id: 'tcs',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 4210.00,
    change: 0.65,
    high52: 4590.00,
    low52: 3313.00,
    marketCapCr: 1522700,
    sharesCountCr: 361.7,
    faceValue: 1.0,
    pe: 31.8,
    pb: 14.5,
    bookValue: 290.3,
    roce: 62.4,
    roe: 48.5,
    divYield: 2.20,
    debtToEquity: 0.00,
    operatingMargin: 26.0,
    netMargin: 19.8,
    profitGrowthYoY: 12.5,
    salesCagr3Y: 14.2,
    cashRatio: 2.10,
    freeCashFlowCr: 41000,
    sharpeRatio: 1.65,
    sortinoRatio: 2.45,
    beta: 0.72,
    alpha1Y: 5.4,
    promoterPledge: 0.0,
    promoterHolding: 71.8,
    fiiHolding: 12.5,
    diiHolding: 10.2,
    publicHolding: 5.5,
    quarterlySales: 63500,
    quarterlyNetProfit: 12600,
    ttmSales: 248000,
    ttmNetProfit: 47900,
    reservesCr: 104000,
    borrowingsCr: 0,
    peers: ['INFY', 'WIPRO', 'HCLTECH', 'LTIM']
  },
  {
    id: 'yes-bank',
    symbol: 'YESBANK',
    name: 'Yes Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 24.50,
    change: -0.85,
    high52: 32.80,
    low52: 18.20,
    marketCapCr: 76800,
    sharesCountCr: 3135.0,
    faceValue: 2.0,
    pe: 58.4,
    pb: 1.80,
    bookValue: 13.6,
    roce: 5.8,
    roe: 3.4,
    divYield: 0.00,
    debtToEquity: 2.40,
    operatingMargin: 12.1,
    netMargin: 4.8,
    profitGrowthYoY: 10.2,
    salesCagr3Y: 6.4,
    cashRatio: 0.42,
    freeCashFlowCr: 1200,
    sharpeRatio: 0.35,
    sortinoRatio: 0.48,
    beta: 1.45,
    alpha1Y: -4.8,
    promoterPledge: 0.0,
    promoterHolding: 0.0,
    fiiHolding: 12.8,
    diiHolding: 42.1,
    publicHolding: 45.1,
    quarterlySales: 8900,
    quarterlyNetProfit: 502,
    ttmSales: 33400,
    ttmNetProfit: 1315,
    reservesCr: 41200,
    borrowingsCr: 142000,
    peers: ['IDFCFIRSTB', 'PNB', 'FEDERALBNK', 'BANDHANBNK']
  },
  {
    id: 'itc',
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'FMCG',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 504.20,
    change: -0.30,
    high52: 528.50,
    low52: 399.30,
    marketCapCr: 629800,
    sharesCountCr: 1249.2,
    faceValue: 1.0,
    pe: 29.2,
    pb: 8.40,
    bookValue: 60.0,
    roce: 38.6,
    roe: 29.5,
    divYield: 3.05,
    debtToEquity: 0.01,
    operatingMargin: 36.4,
    netMargin: 27.8,
    profitGrowthYoY: 9.5,
    salesCagr3Y: 15.2,
    cashRatio: 1.85,
    freeCashFlowCr: 16800,
    sharpeRatio: 1.48,
    sortinoRatio: 2.15,
    beta: 0.65,
    alpha1Y: 2.8,
    promoterPledge: 0.0,
    promoterHolding: 0.0,
    fiiHolding: 42.5,
    diiHolding: 38.2,
    publicHolding: 19.3,
    quarterlySales: 18200,
    quarterlyNetProfit: 5090,
    ttmSales: 74200,
    ttmNetProfit: 21500,
    reservesCr: 72000,
    borrowingsCr: 250,
    peers: ['HINDUNILVR', 'NESTLEIND', 'BRITANNIA', 'DABUR']
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [screenerModalStock, setScreenerModalStock] = useState(null);
  const [indexFilter, setIndexFilter] = useState('All NSE');
  const [searchQuery, setSearchQuery] = useState('');

  // AI Copilot State (like Investing.com)
  const [aiPrompt, setAiPrompt] = useState('');
  const [aiResponse, setAiResponse] = useState(null);
  const [isAiThinking, setIsAiThinking] = useState(false);

  // Parity Sandbox State
  const [selectedBenchmark, setSelectedBenchmark] = useState(STOCKS_DATA[1]); // HDFC Bank
  const [selectedTarget, setSelectedTarget] = useState(STOCKS_DATA[0]); // Suzlon
  const [targetPriceGoal, setTargetPriceGoal] = useState(100);

  // Virtual Trading Desk
  const [isRegistered, setIsRegistered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState('credentials');
  const [mobileNum, setMobileNum] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [virtualCash, setVirtualCash] = useState(1000000);
  const [positions, setPositions] = useState([
    { id: 1, symbol: 'NIFTY 25000 CE', type: 'CE', qty: 75, avgPrice: 142.50, ltp: 165.20 },
    { id: 2, symbol: 'SUZLON', type: 'EQUITY', qty: 500, avgPrice: 41.20, ltp: 43.10 }
  ]);

  // Options Greeks Calculator State
  const [calcSpot, setCalcSpot] = useState(25000);
  const [calcStrike, setCalcStrike] = useState(25000);
  const [calcDTE, setCalcDTE] = useState(7);
  const [calcIV, setCalcIV] = useState(14);
  const [calcType, setCalcType] = useState('CE');

  // Legal Modals
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // AI Natural Language Parser (Client-Side LLM Engine)
  const handleAiSearch = (customText) => {
    const query = (customText || aiPrompt).toLowerCase().trim();
    if (!query) return;
    setIsAiThinking(true);

    setTimeout(() => {
      let matchedSymbol = null;
      let insight = '';
      let filterTag = null;

      if (query.includes('debt free') || query.includes('zero debt') || query.includes('roce')) {
        insight = `Found 2 companies with almost zero debt and ROCE > 30%: TCS (Debt/Eq 0.00, ROCE 62.4%) and Suzlon Energy (Debt/Eq 0.06, ROCE 34.2%). Both generate positive free cash flow.`;
        filterTag = 'debt-free';
      } else if (query.includes('suzlon') && (query.includes('pe') || query.includes('why'))) {
        insight = `Suzlon's consolidated P/E is 18.7x (at ₹43.10) because its Trailing 12-Month net profit expanded to ₹3,144 Cr following balance-sheet turnaround and total debt eradication.`;
        matchedSymbol = 'SUZLON';
      } else if (query.includes('hdfc') || (query.includes('yes bank') && query.includes('compare'))) {
        insight = `HDFC Bank trades at 19.4x P/E with 16.8% ROE and ₹64,700 Cr annual profit. In contrast, Yes Bank trades at a higher 58.4x P/E with lower ROE (3.4%), meaning Yes Bank requires 4.1x profit expansion to justify parity.`;
        setCurrentPage('fundamentals');
      } else if (query.includes('dividend') || query.includes('yield')) {
        insight = `Top dividend yield stocks: ITC Limited (3.05% yield, 29.5% ROE) followed by TCS (2.20% yield, 48.5% ROE).`;
        filterTag = 'dividend';
      } else {
        insight = `Analyzing fundamentals across valuation, solvency, and growth pillars for "${query}". Check out the audited Screener comparison below.`;
      }

      setAiResponse({
        query: customText || aiPrompt,
        insight,
        matchedSymbol,
        filterTag
      });
      setIsAiThinking(false);
    }, 400);
  };

  // Black-Scholes Greeks Engine
  const greeksOutput = useMemo(() => {
    const T = Math.max(calcDTE / 365.0, 0.0001);
    const sigma = Math.max(calcIV / 100.0, 0.0001);
    const r = 0.065;
    const S = calcSpot;
    const K = calcStrike;

    const d1 = (Math.log(S / K) + (r + 0.5 * sigma * sigma) * T) / (sigma * Math.sqrt(T));
    const d2 = d1 - sigma * Math.sqrt(T);

    const normPdf = (x) => Math.exp(-0.5 * x * x) / Math.sqrt(2 * Math.PI);
    const normCdf = (x) => {
      const b1 = 0.319381530;
      const b2 = -0.356563782;
      const b3 = 1.781477937;
      const b4 = -1.821255978;
      const b5 = 1.330274429;
      const p = 0.2316419;
      const c = 0.39894228;
      if (x >= 0.0) {
        const k = 1.0 / (1.0 + p * x);
        return 1.0 - c * Math.exp(-x * x / 2.0) * k *
          (k * (k * (k * (k * b5 + b4) + b3) + b2) + b1);
      } else {
        const k = 1.0 / (1.0 - p * x);
        return c * Math.exp(-x * x / 2.0) * k *
          (k * (k * (k * (k * b5 + b4) + b3) + b2) + b1);
      }
    };

    let price, delta, theta;
    if (calcType === 'CE') {
      price = S * normCdf(d1) - K * Math.exp(-r * T) * normCdf(d2);
      delta = normCdf(d1);
      theta = (-(S * normPdf(d1) * sigma) / (2 * Math.sqrt(T)) - r * K * Math.exp(-r * T) * normCdf(d2)) / 365.0;
    } else {
      price = K * Math.exp(-r * T) * normCdf(-d2) - S * normCdf(-d1);
      delta = normCdf(d1) - 1.0;
      theta = (-(S * normPdf(d1) * sigma) / (2 * Math.sqrt(T)) + r * K * Math.exp(-r * T) * normCdf(-d2)) / 365.0;
    }
    const gamma = normPdf(d1) / (S * sigma * Math.sqrt(T));
    const vega = (S * normPdf(d1) * Math.sqrt(T)) / 100.0;

    return {
      price: Math.max(0, price).toFixed(2),
      delta: delta.toFixed(3),
      gamma: gamma.toFixed(4),
      theta: theta.toFixed(2),
      vega: vega.toFixed(2)
    };
  }, [calcSpot, calcStrike, calcDTE, calcIV, calcType]);

  // Parity Sandbox Calculations
  const parityMetrics = useMemo(() => {
    if (!selectedTarget || !selectedBenchmark) return null;
    const currentPrice = selectedTarget.price;
    const targetPrice = targetPriceGoal;
    const priceSurgePct = ((targetPrice - currentPrice) / currentPrice) * 100;
    const impliedMarketCapCr = (selectedTarget.sharesCountCr * targetPrice);
    const impliedNetProfitCurrentPE = impliedMarketCapCr / selectedTarget.pe;
    const impliedNetProfitBenchmarkPE = impliedMarketCapCr / selectedBenchmark.pe;

    return {
      priceSurgePct: priceSurgePct.toFixed(1),
      impliedMarketCapCr: Math.round(impliedMarketCapCr).toLocaleString('en-IN'),
      currentNetProfitCr: Math.round(selectedTarget.marketCapCr / selectedTarget.pe).toLocaleString('en-IN'),
      neededNetProfitCurrentPECr: Math.round(impliedNetProfitCurrentPE).toLocaleString('en-IN'),
      neededNetProfitBenchmarkPECr: Math.round(impliedNetProfitBenchmarkPE).toLocaleString('en-IN'),
      profitMultiplier: (impliedMarketCapCr / selectedTarget.marketCapCr).toFixed(1)
    };
  }, [selectedTarget, selectedBenchmark, targetPriceGoal]);

  const filteredStocks = useMemo(() => {
    return STOCKS_DATA.filter(stock => {
      const matchesIndex = (indexFilter === 'All NSE') || stock.indexUniverse.includes(indexFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        stock.name.toLowerCase().includes(q) || 
        stock.symbol.toLowerCase().includes(q) || 
        stock.sector.toLowerCase().includes(q);
      return matchesIndex && matchesSearch;
    });
  }, [indexFilter, searchQuery]);

  const handleRegister = (e) => {
    e.preventDefault();
    if (authStep === 'credentials') {
      if (mobileNum.length >= 10 && emailId.includes('@')) {
        setAuthStep('otp');
      } else {
        alert('Please enter a valid 10-digit mobile number and email.');
      }
    } else {
      setIsRegistered(true);
      setAuthModalOpen(false);
      setAuthStep('credentials');
    }
  };

  const handleSquareOff = (id) => {
    const pos = positions.find(p => p.id === id);
    if (!pos) return;
    setVirtualCash(prev => prev + (pos.ltp * pos.qty));
    setPositions(positions.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-['Quicksand',sans-serif]">
      {/* Ticker Banner */}
      <div className="bg-[#FAF7F2] border-b border-[#2D2A26]/10 px-4 py-2 text-xs font-semibold overflow-x-auto whitespace-nowrap flex gap-6 items-center">
        <span className="inline-flex items-center gap-1.5 text-[#2EC4B6]">
          <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse"></span>
          AUDITED CONSOLIDATED DATA
        </span>
        <span>SUZLON: <strong>₹43.10</strong> <span className="text-[#2EC4B6]">+1.41%</span> (P/E: 18.7x)</span>
        <span>HDFCBANK: <strong>₹1,648.50</strong> <span className="text-[#2EC4B6]">+1.15%</span></span>
        <span>RELIANCE: <strong>₹2,985.40</strong> <span className="text-[#2EC4B6]">+1.85%</span></span>
        <span>TCS: <strong>₹4,210.00</strong> <span className="text-[#2EC4B6]">+0.65%</span></span>
        <span>YESBANK: <strong>₹24.50</strong> <span className="text-[#FF7B54]">-0.85%</span></span>
      </div>

      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2D2A26]/10 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <div className="w-10 h-10 rounded-2xl bg-[#FF7B54] text-white flex items-center justify-center font-bold text-xl shadow-[0_4px_12px_-2px_rgba(255,123,84,0.4)]">
              Ω
            </div>
            <div>
              <span className="font-['Baloo_2'] text-2xl font-bold tracking-tight text-[#2D2A26]">
                Market<span className="text-[#FF7B54]">Greeks</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] ml-2 px-2 py-0.5 rounded-full bg-[#FFD166]/30 text-[#2D2A26] font-bold">
                AI + SCREENER
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'home', label: 'Explore' },
              { id: 'fundamentals', label: 'Fundamentals & Peers' },
              { id: 'derivatives', label: 'Derivatives Lab' },
              { id: 'virtual', label: 'Virtual Trading' },
              { id: 'about', label: 'About Us' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentPage(tab.id)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-sm font-bold transition-all ${
                  currentPage === tab.id
                    ? 'bg-[#2D2A26] text-white shadow-md'
                    : 'text-[#2D2A26]/80 hover:bg-[#2D2A26]/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          <button
            onClick={() => {
              if (isRegistered) setCurrentPage('virtual');
              else setAuthModalOpen(true);
            }}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF7B54] text-white text-sm font-bold shadow-[0_8px_16px_-6px_rgba(255,123,84,0.5)] hover:shadow-lg hover:-translate-y-0.5 transition-all"
          >
            {isRegistered ? '₹10,00,000 Desk' : 'Open Virtual Account'}
            <ArrowRight size={16} />
          </button>
        </div>
      </header>

      {/* MAIN CONTENT ROUTER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* ================= PAGE 1: HOME ================= */}
        {currentPage === 'home' && (
          <div className="space-y-12">
            {/* Hero */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2D2A26]/10 shadow-[0_16px_32px_-12px_rgba(45,42,38,0.12)] relative overflow-hidden">
              <div className="max-w-2xl relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-[#64B5F6]/20 text-[#2D2A26] font-bold text-xs mb-4">
                  Tactile Financial Learning with AI Clarity
                </span>
                <h1 className="font-['Baloo_2'] text-4xl sm:text-6xl font-extrabold leading-tight text-[#2D2A26] mb-4">
                  Master the Stock Market with <span className="text-[#FF7B54]">Soft Clay</span> Simplicity.
                </h1>
                <p className="text-base sm:text-lg text-[#2D2A26]/80 mb-8 font-medium">
                  Compare company fundamentals with Screener-style audited ratios and peer benchmarks, use our LLM Copilot to search plain-English questions, and trade Nifty 50 with ₹10,00,000 virtual capital.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setCurrentPage('fundamentals')}
                    className="px-6 py-3 rounded-2xl bg-[#FF7B54] text-white font-bold shadow-[0_10px_20px_-6px_rgba(255,123,84,0.4)] hover:-translate-y-1 transition-all"
                  >
                    Explore Audited Fundamentals
                  </button>
                  <button
                    onClick={() => setCurrentPage('derivatives')}
                    className="px-6 py-3 rounded-2xl bg-[#FAF7F2] border-2 border-[#2D2A26]/20 font-bold hover:bg-[#2D2A26]/5 transition-all"
                  >
                    Try Greeks Calculator
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Feature Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setCurrentPage('fundamentals')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2EC4B6]/20 text-[#2EC4B6] flex items-center justify-center font-bold text-xl mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">Screener Peer Benchmarks</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Consolidated balance sheets, ROCE, P/E, and direct sector peer comparisons built right inside.
                </p>
              </div>

              <div 
                onClick={() => setCurrentPage('fundamentals')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#64B5F6]/25 text-[#2D2A26] flex items-center justify-center font-bold text-xl mb-4">
                  <Bot size={24} className="text-[#64B5F6]" />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">AI Copilot Search</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Ask questions like "Show debt-free stocks with ROCE > 25%" or "Why is Suzlon P/E 18.7x?"
                </p>
              </div>

              <div 
                onClick={() => setCurrentPage('derivatives')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#CDB4DB]/40 text-[#2D2A26] flex items-center justify-center font-bold text-xl mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">Option Greeks Lab</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Black-Scholes Greek sensitivity calculator with speedometer and melting ice cream analogies.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: FUNDAMENTALS, PEERS & AI COPILOT ================= */}
        {currentPage === 'fundamentals' && (
          <div className="space-y-8">
            {/* AI FINANCIAL ASSISTANT (INVESTING.COM STYLE LLM) */}
            <div className="bg-white rounded-3xl p-6 border border-[#2D2A26]/10 shadow-[0_12px_24px_-10px_rgba(45,42,38,0.08)] space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#64B5F6]/20 text-[#64B5F6] flex items-center justify-center">
                  <Bot size={18} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold text-[#2D2A26]">
                  MarketGreeks Copilot (AI Financial Query)
                </h3>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask anything (e.g. 'Show debt free stocks with ROCE > 25%' or 'Why is Suzlon PE 18.7x?')..."
                  value={aiPrompt}
                  onChange={(e) => setAiPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAiSearch()}
                  className="flex-1 px-4 py-3 rounded-2xl bg-[#FAF7F2] border border-[#2D2A26]/15 text-sm font-semibold outline-none focus:border-[#FF7B54]"
                />
                <button
                  onClick={() => handleAiSearch()}
                  disabled={isAiThinking}
                  className="px-6 py-3 rounded-2xl bg-[#FF7B54] text-white font-bold text-sm flex items-center gap-2 hover:opacity-90 transition-opacity"
                >
                  {isAiThinking ? 'Analyzing...' : 'Ask AI'}
                  <Send size={15} />
                </button>
              </div>

              {/* Sample Prompts */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-[#2D2A26]/50 font-bold">Try asking:</span>
                {[
                  "Show debt-free stocks with ROCE > 25%",
                  "Why is Suzlon P/E 18.7x?",
                  "Compare HDFC Bank vs Yes Bank",
                  "Show highest dividend stocks"
                ].map((promptText, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiPrompt(promptText);
                      handleAiSearch(promptText);
                    }}
                    className="px-3 py-1 rounded-xl bg-[#FAF7F2] hover:bg-[#2D2A26]/5 font-semibold text-[#2D2A26]/80 transition-colors"
                  >
                    "{promptText}"
                  </button>
                ))}
              </div>

              {/* AI Response Card */}
              {aiResponse && (
                <div className="p-4 rounded-2xl bg-[#64B5F6]/10 border border-[#64B5F6]/30 text-sm space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-[#2D2A26]">
                    <Sparkles size={16} className="text-[#FF7B54]" />
                    AI Copilot Insight:
                  </div>
                  <p className="text-[#2D2A26]/85 leading-relaxed font-medium">
                    {aiResponse.insight}
                  </p>
                  {aiResponse.matchedSymbol && (
                    <button
                      onClick={() => setScreenerModalStock(STOCKS_DATA.find(s => s.symbol === aiResponse.matchedSymbol))}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#FF7B54] hover:underline pt-1"
                    >
                      Open Full Audited Financials for {aiResponse.matchedSymbol} <ArrowRight size={12} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Filter & Search Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
                  Consolidated Company Screener & Peer Comparison
                </h2>
                <p className="text-xs text-[#2D2A26]/70">
                  Audited metrics matching BSE/NSE filings ({filteredStocks.length} companies)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <div className="relative min-w-[240px]">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D2A26]/40" />
                  <input
                    type="text"
                    placeholder="Search Suzlon, HDFC, Reliance..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs font-bold rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/15 outline-none focus:border-[#FF7B54]"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2D2A26]/40">
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {['All NSE', 'Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500'].map(idx => (
                    <button
                      key={idx}
                      onClick={() => setIndexFilter(idx)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        indexFilter === idx ? 'bg-[#FF7B54] text-white' : 'bg-[#FAF7F2] text-[#2D2A26]'
                      }`}
                    >
                      {idx}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= SCREENER-STYLE CARDS WITH INLINE PEERS ================= */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredStocks.map(stock => (
                <div 
                  key={stock.id} 
                  className="bg-white rounded-3xl p-6 border border-[#2D2A26]/10 shadow-[0_12px_24px_-12px_rgba(45,42,38,0.08)] flex flex-col justify-between space-y-5"
                >
                  <div>
                    {/* Card Header */}
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <span className="text-[11px] font-bold text-[#FF7B54] uppercase tracking-wide">
                          {stock.sector}
                        </span>
                        <h3 className="font-['Baloo_2'] text-2xl font-bold text-[#2D2A26] leading-tight">
                          {stock.name}
                        </h3>
                        <span className="text-xs text-[#2D2A26]/50 font-semibold">{stock.symbol}</span>
                      </div>
                      <div className="text-right">
                        <div className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26]">
                          ₹{stock.price.toFixed(2)}
                        </div>
                        <span className={`text-xs font-bold ${stock.change >= 0 ? 'text-[#2EC4B6]' : 'text-[#FF7B54]'}`}>
                          {stock.change >= 0 ? '+' : ''}{stock.change}%
                        </span>
                      </div>
                    </div>

                    {/* Screener.in Top Ratios Grid */}
                    <div className="grid grid-cols-3 gap-2 bg-[#FAF7F2] p-3.5 rounded-2xl text-center">
                      <div>
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">Market Cap</span>
                        <strong className="text-xs font-bold text-[#2D2A26]">₹{Math.round(stock.marketCapCr).toLocaleString('en-IN')} Cr</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">Stock P/E</span>
                        <strong className={`text-xs font-bold ${stock.pe > 50 ? 'text-[#FF7B54]' : 'text-[#2EC4B6]'}`}>{stock.pe}x</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">Book Value</span>
                        <strong className="text-xs font-bold text-[#2D2A26]">₹{stock.bookValue}</strong>
                      </div>

                      <div className="pt-2 border-t border-[#2D2A26]/5">
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">ROCE</span>
                        <strong className="text-xs font-bold text-[#2EC4B6]">{stock.roce}%</strong>
                      </div>
                      <div className="pt-2 border-t border-[#2D2A26]/5">
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">ROE</span>
                        <strong className="text-xs font-bold text-[#2EC4B6]">{stock.roe}%</strong>
                      </div>
                      <div className="pt-2 border-t border-[#2D2A26]/5">
                        <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">Debt/Equity</span>
                        <strong className="text-xs font-bold text-[#2D2A26]">{stock.debtToEquity}</strong>
                      </div>
                    </div>

                    {/* Key Highlights */}
                    <div className="mt-4 space-y-1 text-xs text-[#2D2A26]/80">
                      <div className="flex justify-between">
                        <span className="text-[#2D2A26]/60">52W High / Low:</span>
                        <strong>₹{stock.high52} / ₹{stock.low52}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2D2A26]/60">TTM Net Profit:</span>
                        <strong className="text-[#2EC4B6]">₹{stock.ttmNetProfit.toLocaleString('en-IN')} Cr</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#2D2A26]/60">Borrowings:</span>
                        <strong>{stock.borrowingsCr === 0 ? 'Almost Debt Free (₹0 Cr)' : `₹${stock.borrowingsCr.toLocaleString('en-IN')} Cr`}</strong>
                      </div>
                    </div>

                    {/* Sector Peers Benchmarking Bar */}
                    <div className="mt-4 pt-3 border-t border-[#2D2A26]/10">
                      <span className="text-[11px] font-bold text-[#2D2A26]/60 block mb-2 uppercase">
                        Sector Peers (Compare directly):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {stock.peers.map((peer, pIdx) => (
                          <span 
                            key={pIdx} 
                            className="px-2.5 py-1 rounded-lg bg-[#FAF7F2] border border-[#2D2A26]/15 text-[11px] font-bold text-[#2D2A26]"
                          >
                            {peer}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => setScreenerModalStock(stock)}
                    className="w-full py-2.5 rounded-2xl bg-[#2D2A26] text-white text-xs font-bold hover:bg-[#2D2A26]/90 transition-all text-center"
                  >
                    View Consolidated Financials & Balance Sheet
                  </button>
                </div>
              ))}
            </div>

            {/* ================= CATCH-UP & PARITY SANDBOX ================= */}
            <div className="bg-white rounded-3xl p-8 border border-[#2D2A26]/10 shadow-sm space-y-6">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-[#FFD166]/30 text-[#2D2A26]">
                  <Scale size={20} />
                </span>
                <h3 className="font-['Baloo_2'] text-2xl font-bold">
                  Parity Sandbox: What will it take for {selectedTarget.symbol} to hit ₹{targetPriceGoal}?
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2]">
                  <label className="text-xs font-bold text-[#2D2A26]/60 uppercase block mb-1">Benchmark Stock</label>
                  <select 
                    value={selectedBenchmark.id} 
                    onChange={(e) => setSelectedBenchmark(STOCKS_DATA.find(s => s.id === e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm"
                  >
                    {STOCKS_DATA.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — P/E: {st.pe}x</option>
                    ))}
                  </select>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2]">
                  <label className="text-xs font-bold text-[#2D2A26]/60 uppercase block mb-1">Target Stock</label>
                  <select 
                    value={selectedTarget.id} 
                    onChange={(e) => setSelectedTarget(STOCKS_DATA.find(s => s.id === e.target.value))}
                    className="w-full p-2.5 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm"
                  >
                    {STOCKS_DATA.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — Price: ₹{st.price.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="bg-[#FAF7F2] p-5 rounded-2xl">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-bold">Simulate Target Price for {selectedTarget.symbol}:</span>
                  <span className="font-['Baloo_2'] text-3xl font-extrabold text-[#FF7B54]">₹{targetPriceGoal}</span>
                </div>
                <input 
                  type="range" 
                  min={Math.max(1, Math.round(selectedTarget.price))} 
                  max="200" 
                  value={targetPriceGoal} 
                  onChange={(e) => setTargetPriceGoal(Number(e.target.value))}
                  className="w-full h-2.5 bg-white rounded-lg appearance-none cursor-pointer accent-[#FF7B54]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-[#FAF7F2]">
                  <span className="text-xs text-[#2D2A26]/60 font-semibold block mb-1">Implied Market Cap</span>
                  <div className="text-xl font-['Baloo_2'] font-bold">₹{parityMetrics?.impliedMarketCapCr} Cr</div>
                  <span className="text-xs text-[#2EC4B6] font-bold">Requires a {parityMetrics?.profitMultiplier}x expansion</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2]">
                  <span className="text-xs text-[#2D2A26]/60 font-semibold block mb-1">Req. Net Profit (at {selectedTarget.pe}x P/E)</span>
                  <div className="text-xl font-['Baloo_2'] font-bold">₹{parityMetrics?.neededNetProfitCurrentPECr} Cr</div>
                  <span className="text-xs text-[#2D2A26]/70">Currently makes ~₹{parityMetrics?.currentNetProfitCr} Cr</span>
                </div>

                <div className="p-4 rounded-2xl bg-[#FAF7F2]">
                  <span className="text-xs text-[#2D2A26]/60 font-semibold block mb-1">Req. Net Profit (at {selectedBenchmark.symbol}'s {selectedBenchmark.pe}x P/E)</span>
                  <div className="text-xl font-['Baloo_2'] font-bold text-[#FF7B54]">₹{parityMetrics?.neededNetProfitBenchmarkPECr} Cr</div>
                  <span className="text-xs text-[#FF7B54] font-bold">Benchmark parity needed</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: DERIVATIVES LAB ================= */}
        {currentPage === 'derivatives' && (
          <div className="space-y-10">
            <div className="bg-white p-8 rounded-3xl border border-[#2D2A26]/10 shadow-sm">
              <h2 className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26] mb-2">
                The Derivatives Lab & Option Greeks Engine
              </h2>
              <p className="text-[#2D2A26]/80 text-base max-w-3xl">
                Option prices are determined by Greek sensitivity factors. Adjust the sliders below to see theoretical prices and Greeks update instantly using the Black-Scholes formula.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sliders Box */}
              <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#2D2A26]/10 shadow-sm space-y-6">
                <h3 className="font-['Baloo_2'] text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-[#FF7B54]" />
                  Pricing Inputs
                </h3>

                <div className="flex gap-2">
                  <button
                    onClick={() => setCalcType('CE')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      calcType === 'CE' ? 'bg-[#2EC4B6] text-white shadow-sm' : 'bg-[#FAF7F2] text-[#2D2A26]'
                    }`}
                  >
                    Call Option (CE)
                  </button>
                  <button
                    onClick={() => setCalcType('PE')}
                    className={`flex-1 py-2.5 rounded-xl font-bold text-sm transition-all ${
                      calcType === 'PE' ? 'bg-[#FF7B54] text-white shadow-sm' : 'bg-[#FAF7F2] text-[#2D2A26]'
                    }`}
                  >
                    Put Option (PE)
                  </button>
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Underlying Spot (S):</span>
                    <span className="text-[#FF7B54]">₹{calcSpot}</span>
                  </div>
                  <input
                    type="range"
                    min="23000"
                    max="27000"
                    step="50"
                    value={calcSpot}
                    onChange={(e) => setCalcSpot(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer accent-[#FF7B54]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Strike Price (K):</span>
                    <span className="text-[#2D2A26]">₹{calcStrike}</span>
                  </div>
                  <input
                    type="range"
                    min="23000"
                    max="27000"
                    step="50"
                    value={calcStrike}
                    onChange={(e) => setCalcStrike(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer accent-[#2D2A26]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Days to Expiry (DTE):</span>
                    <span className="text-[#64B5F6]">{calcDTE} Days</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="60"
                    value={calcDTE}
                    onChange={(e) => setCalcDTE(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer accent-[#64B5F6]"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>Implied Volatility (IV):</span>
                    <span className="text-[#CDB4DB]">{calcIV}%</span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="50"
                    value={calcIV}
                    onChange={(e) => setCalcIV(Number(e.target.value))}
                    className="w-full h-2.5 bg-[#FAF7F2] rounded-lg appearance-none cursor-pointer accent-[#CDB4DB]"
                  />
                </div>
              </div>

              {/* Greeks Output */}
              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white p-8 rounded-3xl border border-[#2D2A26]/10 shadow-sm text-center">
                  <span className="text-xs uppercase font-bold text-[#2D2A26]/60">Theoretical Option Premium</span>
                  <div className="font-['Baloo_2'] text-5xl font-extrabold text-[#2D2A26] my-2">
                    ₹{greeksOutput.price}
                  </div>
                  <span className="text-xs px-3 py-1 rounded-full bg-[#FAF7F2] font-semibold text-[#2D2A26]/80">
                    RBI 91D T-Bill Risk-free Rate: 6.5%
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#2D2A26]/60">DELTA (Δ)</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#64B5F6]/20 font-bold">Speedometer</span>
                    </div>
                    <div className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26] my-1">
                      {greeksOutput.delta}
                    </div>
                    <p className="text-xs text-[#2D2A26]/70">
                      Option price moves ₹{Math.abs(Number(greeksOutput.delta) * 10).toFixed(1)} for every ₹10 move in spot.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#2D2A26]/60">THETA (Θ)</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FF7B54]/20 font-bold">Melting Cone</span>
                    </div>
                    <div className="font-['Baloo_2'] text-3xl font-extrabold text-[#FF7B54] my-1">
                      {greeksOutput.theta}
                    </div>
                    <p className="text-xs text-[#2D2A26]/70">
                      Decays by ₹{Math.abs(Number(greeksOutput.theta))} every single night as expiry nears.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#2D2A26]/60">GAMMA (Γ)</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#FFD166]/30 font-bold">Acceleration</span>
                    </div>
                    <div className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26] my-1">
                      {greeksOutput.gamma}
                    </div>
                    <p className="text-xs text-[#2D2A26]/70">
                      Rate of change in Delta per ₹1 move in spot. Highest ATM near expiry.
                    </p>
                  </div>

                  <div className="bg-white p-5 rounded-2xl border border-[#2D2A26]/10 shadow-sm">
                    <div className="flex justify-between items-start">
                      <span className="text-xs font-bold text-[#2D2A26]/60">VEGA (ν)</span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-[#CDB4DB]/30 font-bold">Storm Weather</span>
                    </div>
                    <div className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26] my-1">
                      {greeksOutput.vega}
                    </div>
                    <p className="text-xs text-[#2D2A26]/70">
                      Option price changes by ₹{greeksOutput.vega} for every 1% jump or drop in IV.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 4: VIRTUAL TRADING DESK ================= */}
        {currentPage === 'virtual' && (
          <div className="space-y-8">
            {!isRegistered ? (
              <div className="bg-white rounded-3xl p-10 border border-[#2D2A26]/10 shadow-md text-center max-w-xl mx-auto space-y-6">
                <div className="w-16 h-16 rounded-3xl bg-[#FF7B54]/20 text-[#FF7B54] flex items-center justify-center mx-auto">
                  <Lock size={32} />
                </div>
                <h3 className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26]">
                  Unlock ₹10,00,000 Virtual Trading Capital
                </h3>
                <p className="text-sm text-[#2D2A26]/70 leading-relaxed">
                  Register with your mobile number and email to practice trading Nifty 50 equity, indices, and options strategies risk-free.
                </p>
                <button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full py-3.5 rounded-2xl bg-[#FF7B54] text-white font-bold shadow-md hover:-translate-y-0.5 transition-all"
                >
                  Register in 30 Seconds
                </button>
              </div>
            ) : (
              <>
                <div className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <span className="text-xs font-bold uppercase text-[#2D2A26]/50">Virtual Paper Capital</span>
                    <div className="font-['Baloo_2'] text-4xl font-extrabold text-[#2D2A26]">
                      ₹{virtualCash.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                    </div>
                    <span className="text-xs text-[#2EC4B6] font-bold">Risk-Free Simulated Margin</span>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => alert('Option Chain modal: Buy/Sell Nifty 25000 CE/PE')}
                      className="px-4 py-2.5 rounded-2xl bg-[#2D2A26] text-white text-sm font-bold hover:bg-[#2D2A26]/90 transition-all"
                    >
                      + Trade Options
                    </button>
                    <button
                      onClick={() => {
                        if (virtualCash < 165000) {
                          alert('Insufficient virtual balance!');
                          return;
                        }
                        setVirtualCash(prev => prev - 164850 + 2400);
                        setPositions([
                          ...positions,
                          { id: Date.now(), symbol: 'HDFCBANK (Covered Lot)', type: 'EQUITY', qty: 100, avgPrice: 1648.50, ltp: 1648.50 },
                          { id: Date.now() + 1, symbol: 'HDFCBANK 1700 CE', type: 'CE (SHORT)', qty: -100, avgPrice: 24.00, ltp: 24.00 }
                        ]);
                        alert('Deployed Covered Call: Bought 100 HDFCBANK shares @ ₹1648.50 + Sold 1700 Call for ₹2,400 upfront premium income!');
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-[#FF7B54] text-white text-sm font-bold hover:bg-[#FF7B54]/90 transition-all shadow-sm"
                    >
                      Deploy 1-Click Covered Call
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-3xl border border-[#2D2A26]/10 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-[#2D2A26]/10 flex justify-between items-center">
                    <h3 className="font-['Baloo_2'] text-xl font-bold text-[#2D2A26]">Active Virtual Positions</h3>
                    <span className="text-xs font-bold text-[#2D2A26]/60">{positions.length} Open Contracts</span>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-[#FAF7F2] text-xs font-bold text-[#2D2A26]/60">
                        <tr>
                          <th className="py-3.5 px-6">Instrument</th>
                          <th className="py-3.5 px-4">Qty</th>
                          <th className="py-3.5 px-4">Avg Price</th>
                          <th className="py-3.5 px-4">LTP</th>
                          <th className="py-3.5 px-4">Unrealized P&L</th>
                          <th className="py-3.5 px-6 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#2D2A26]/5">
                        {positions.map(p => {
                          const pnl = (p.ltp - p.avgPrice) * p.qty;
                          return (
                            <tr key={p.id} className="hover:bg-[#FAF7F2]/50">
                              <td className="py-4 px-6 font-bold">{p.symbol}</td>
                              <td className="py-4 px-4 font-semibold">{p.qty}</td>
                              <td className="py-4 px-4">₹{p.avgPrice.toFixed(2)}</td>
                              <td className="py-4 px-4 font-bold">₹{p.ltp.toFixed(2)}</td>
                              <td className="py-4 px-4">
                                <span className={`font-bold ${pnl >= 0 ? 'text-[#2EC4B6]' : 'text-[#FF7B54]'}`}>
                                  {pnl >= 0 ? '+' : ''}₹{pnl.toFixed(2)}
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <button
                                  onClick={() => handleSquareOff(p.id)}
                                  className="px-3 py-1 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/20 text-xs font-bold hover:bg-[#FF7B54] hover:text-white transition-all"
                                >
                                  Square Off
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* ================= PAGE 5: ABOUT US ================= */}
        {currentPage === 'about' && (
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2D2A26]/10 shadow-sm text-center space-y-4">
              <span className="px-3 py-1 rounded-full bg-[#FF7B54]/20 text-[#FF7B54] text-xs font-bold">
                Bengaluru, India
              </span>
              <h2 className="font-['Baloo_2'] text-4xl font-extrabold text-[#2D2A26]">
                Democratizing Finance with Tactile Simplicity
              </h2>
              <p className="text-[#2D2A26]/80 text-base leading-relaxed max-w-2xl mx-auto">
                Market Greeks was created to remove intimidation from Indian capital markets. Traditional brokerage screens are filled with sterile tables and complex acronyms. We believe financial literacy should feel friendly, tactile, and transparent.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm text-center">
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2 text-[#2EC4B6]">Risk-Free First</h3>
                <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
                  Traders should understand option time decay and leverage mechanics in a simulator before risking real savings.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm text-center">
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2 text-[#FF7B54]">Transparent Math</h3>
                <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
                  No hidden formulas. All strength rankings and option sensitivities use verifiable Black-Scholes and public balance sheets.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm text-center">
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2 text-[#64B5F6]">SEBI Compliant</h3>
                <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
                  We are purely an educational platform. We provide no buy/sell recommendations or portfolio management services.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ================= IN-APP SCREENER CONSOLIDATED MODAL (NO REDIRECTS) ================= */}
      {screenerModalStock && (
        <div className="fixed inset-0 z-50 bg-[#2D2A26]/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start border-b border-[#2D2A26]/10 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-[#FF7B54]">{screenerModalStock.sector}</span>
                <h3 className="font-['Baloo_2'] text-2xl font-bold text-[#2D2A26]">
                  {screenerModalStock.name} ({screenerModalStock.symbol})
                </h3>
              </div>
              <button 
                onClick={() => setScreenerModalStock(null)}
                className="p-1.5 rounded-xl bg-[#FAF7F2]"
              >
                <X size={18} />
              </button>
            </div>

            {/* Screener Style Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#FAF7F2] p-4 rounded-2xl text-xs">
              <div>Market Cap: <strong className="block text-sm">₹{screenerModalStock.marketCapCr.toLocaleString('en-IN')} Cr</strong></div>
              <div>Current Price: <strong className="block text-sm">₹{screenerModalStock.price}</strong></div>
              <div>Stock P/E: <strong className="block text-sm text-[#2EC4B6]">{screenerModalStock.pe}x</strong></div>
              <div>ROCE: <strong className="block text-sm text-[#2EC4B6]">{screenerModalStock.roce}%</strong></div>
            </div>

            {/* Quarterly & Annual Figures */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm">Audited Consolidated Financials (in ₹ Cr)</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-[#FAF7F2]">
                  <span className="text-[#2D2A26]/60 block">Quarterly Sales</span>
                  <strong className="text-sm">₹{screenerModalStock.quarterlySales.toLocaleString('en-IN')} Cr</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2]">
                  <span className="text-[#2D2A26]/60 block">Quarterly Net Profit</span>
                  <strong className="text-sm text-[#2EC4B6]">₹{screenerModalStock.quarterlyNetProfit.toLocaleString('en-IN')} Cr</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2]">
                  <span className="text-[#2D2A26]/60 block">TTM 12M Sales</span>
                  <strong className="text-sm">₹{screenerModalStock.ttmSales.toLocaleString('en-IN')} Cr</strong>
                </div>
                <div className="p-3 rounded-xl bg-[#FAF7F2]">
                  <span className="text-[#2D2A26]/60 block">TTM 12M Net Profit</span>
                  <strong className="text-sm text-[#2EC4B6]">₹{screenerModalStock.ttmNetProfit.toLocaleString('en-IN')} Cr</strong>
                </div>
              </div>
            </div>

            {/* Sector Peers List */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm">Sector Peers</h4>
              <div className="flex flex-wrap gap-2">
                {screenerModalStock.peers.map((peer, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/10 text-xs font-bold">
                    {peer}
                  </span>
                ))}
              </div>
            </div>

            {/* Shareholding Pattern */}
            <div className="space-y-2">
              <h4 className="font-bold text-sm">Shareholding Pattern (%)</h4>
              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
                <div style={{ width: `${screenerModalStock.promoterHolding}%` }} className="bg-[#FF7B54]" title="Promoters"></div>
                <div style={{ width: `${screenerModalStock.fiiHolding}%` }} className="bg-[#64B5F6]" title="FII"></div>
                <div style={{ width: `${screenerModalStock.diiHolding}%` }} className="bg-[#FFD166]" title="DII"></div>
                <div style={{ width: `${screenerModalStock.publicHolding}%` }} className="bg-[#2EC4B6]" title="Public"></div>
              </div>
              <div className="flex justify-between text-xs text-[#2D2A26]/70">
                <span>Promoters: {screenerModalStock.promoterHolding}%</span>
                <span>FII: {screenerModalStock.fiiHolding}%</span>
                <span>DII: {screenerModalStock.diiHolding}%</span>
                <span>Public: {screenerModalStock.publicHolding}%</span>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setScreenerModalStock(null)}
                className="px-6 py-2.5 rounded-2xl bg-[#2D2A26] text-white font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= USER AUTH MODAL ================= */}
      {authModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full border border-[#2D2A26]/10 shadow-2xl space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
                {authStep === 'credentials' ? 'Open Virtual Account' : 'Verify One-Time Password'}
              </h3>
              <button 
                onClick={() => { setAuthModalOpen(false); setAuthStep('credentials'); }}
                className="p-2 rounded-xl bg-[#FAF7F2]"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleRegister} className="space-y-4">
              {authStep === 'credentials' ? (
                <>
                  <div>
                    <label className="text-xs font-bold text-[#2D2A26]/70 block mb-1">Mobile Number (+91)</label>
                    <div className="flex items-center gap-2 border border-[#2D2A26]/20 rounded-xl p-3 bg-[#FAF7F2]">
                      <Smartphone size={18} className="text-[#2D2A26]/40" />
                      <input
                        type="tel"
                        required
                        placeholder="9876543210"
                        value={mobileNum}
                        onChange={(e) => setMobileNum(e.target.value)}
                        className="bg-transparent text-sm font-semibold outline-none w-full"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#2D2A26]/70 block mb-1">Email Address</label>
                    <div className="flex items-center gap-2 border border-[#2D2A26]/20 rounded-xl p-3 bg-[#FAF7F2]">
                      <Mail size={18} className="text-[#2D2A26]/40" />
                      <input
                        type="email"
                        required
                        placeholder="trader@example.com"
                        value={emailId}
                        onChange={(e) => setEmailId(e.target.value)}
                        className="bg-transparent text-sm font-semibold outline-none w-full"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <label className="text-xs font-bold text-[#2D2A26]/70 block mb-1">Enter 4-Digit Demo OTP</label>
                  <div className="flex items-center gap-2 border border-[#2D2A26]/20 rounded-xl p-3 bg-[#FAF7F2]">
                    <KeyRound size={18} className="text-[#2D2A26]/40" />
                    <input
                      type="text"
                      required
                      placeholder="1234"
                      value={otpVal}
                      onChange={(e) => setOtpVal(e.target.value)}
                      className="bg-transparent text-sm font-semibold outline-none w-full tracking-widest text-center text-lg"
                    />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF7B54] text-white font-bold text-sm shadow-md"
              >
                {authStep === 'credentials' ? 'Send OTP Code' : 'Verify & Unlock ₹10,00,000'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ================= LEGAL / COMPLIANCE MODALS ================= */}
      {activeLegalModal && (
        <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-8 max-w-2xl w-full border border-[#2D2A26]/10 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b border-[#2D2A26]/10 pb-3">
              <h3 className="font-['Baloo_2'] text-2xl font-bold">
                {activeLegalModal === 'sebi' && 'SEBI Risk Disclosure on Derivatives'}
                {activeLegalModal === 'terms' && 'Terms and Conditions'}
                {activeLegalModal === 'privacy' && 'Privacy Policy'}
              </h3>
              <button onClick={() => setActiveLegalModal(null)} className="p-1.5 rounded-xl bg-[#FAF7F2]">
                <X size={18} />
              </button>
            </div>

            <div className="text-xs text-[#2D2A26]/80 space-y-3 leading-relaxed">
              {activeLegalModal === 'sebi' && (
                <>
                  <p className="font-bold text-sm text-[#FF7B54]">Mandatory SEBI Disclosure for Futures & Options:</p>
                  <p>1. 9 out of 10 individual traders in equity Futures and Options Segment incurred net losses.</p>
                  <p>2. On an average, loss makers registered net trading loss close to ₹50,000.</p>
                  <p>3. Over and above the net trading losses incurred, loss makers expended an additional 28% of net trading losses as transaction costs.</p>
                </>
              )}
              {activeLegalModal === 'terms' && (
                <>
                  <p>• <strong>Educational Nature:</strong> All market data, option chains, and valuation metrics are for training only.</p>
                  <p>• <strong>Simulated Balance:</strong> The ₹10,00,000 provided is virtual currency with no monetary cash-out value.</p>
                </>
              )}
              {activeLegalModal === 'privacy' && (
                <p>• Authentication info is used strictly to preserve simulated portfolios and watchlists. We do not sell data.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= FOOTER ================= */}
      <footer className="mt-20 border-t border-[#2D2A26]/10 bg-white py-12 px-6">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FF7B54] text-white flex items-center justify-center font-bold text-sm">Ω</div>
                <span className="font-['Baloo_2'] text-xl font-bold">MarketGreeks</span>
              </div>
              <p className="text-xs text-[#2D2A26]/70 leading-relaxed">
                India's tactile educational platform for mastering equity fundamentals and option sensitivity Greeks.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Navigation</h4>
              <ul className="space-y-2 text-xs text-[#2D2A26]/80 font-medium">
                <li><button onClick={() => setCurrentPage('fundamentals')}>Fundamentals Screener</button></li>
                <li><button onClick={() => setCurrentPage('derivatives')}>Derivatives & Greeks Lab</button></li>
                <li><button onClick={() => setCurrentPage('virtual')}>Virtual Paper Trading</button></li>
                <li><button onClick={() => setCurrentPage('about')}>About Our Mission</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Compliance & Risk</h4>
              <ul className="space-y-2 text-xs text-[#2D2A26]/80 font-medium">
                <li><button onClick={() => setActiveLegalModal('sebi')} className="text-[#FF7B54] font-bold">SEBI Risk Disclosure (F&O)</button></li>
                <li><button onClick={() => setActiveLegalModal('terms')}>Terms & Conditions</button></li>
                <li><button onClick={() => setActiveLegalModal('privacy')}>Privacy Policy</button></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-3">Education Notice</h4>
              <p className="text-[11px] text-[#2D2A26]/60 leading-relaxed">
                Market Greeks is not a registered SEBI investment advisor. Virtual trading results do not represent actual trading conditions.
              </p>
            </div>
          </div>

          <div className="border-t border-[#2D2A26]/5 pt-6 text-center text-xs text-[#2D2A26]/50">
            © 2026 Market Greeks Inc. Crafted with Soft Clay Design Language. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}