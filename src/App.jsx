import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, BookOpen, Shield, Award, 
  HelpCircle, ChevronRight, Activity, ArrowRight, CheckCircle2,
  DollarSign, BarChart3, PieChart, Sparkles, AlertCircle, 
  RefreshCw, Scale, Search, SlidersHorizontal, Info, X,
  Layers, Lock, Smartphone, Mail, KeyRound, ExternalLink,
  ChevronDown, Building, FileText, Briefcase, Loader2
} from 'lucide-react';

// --- BASELINE NSE 5-PILLAR DATASET (TOP 10 NIFTY HEAVYWEIGHTS + POPULAR STOCKS) ---
const INITIAL_STOCKS_DATA = [
  {
    id: 'hdfc-bank',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1648.50,
    change: 1.15,
    marketCapCr: 1256000,
    sharesCountCr: 761.9,
    pe: 19.4,
    pb: 2.8,
    evToEbitda: 14.2,
    divYield: 1.18,
    roe: 16.8,
    netMargin: 23.4,
    operatingMargin: 38.5,
    debtToEquity: 1.15,
    interestCoverage: 11.8,
    currentRatio: 1.35,
    profitGrowthYoY: 18.2,
    salesCagr3Y: 16.4,
    cashRatio: 0.82,
    freeCashFlowCr: 41200,
    sharpeRatio: 1.42,
    sortinoRatio: 2.10,
    beta: 0.88,
    alpha1Y: 3.2,
    promoterPledge: 0.0,
    fiiHolding: 54.2,
    diiHolding: 28.5,
    publicHolding: 17.3
  },
  {
    id: 'reliance',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy & Conglomerate',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 2985.40,
    change: 1.85,
    marketCapCr: 2019800,
    sharesCountCr: 676.6,
    pe: 27.8,
    pb: 2.4,
    evToEbitda: 15.8,
    divYield: 0.36,
    roe: 9.6,
    netMargin: 7.9,
    operatingMargin: 17.8,
    debtToEquity: 0.42,
    interestCoverage: 8.5,
    currentRatio: 1.18,
    profitGrowthYoY: 11.2,
    salesCagr3Y: 22.1,
    cashRatio: 0.65,
    freeCashFlowCr: 36400,
    sharpeRatio: 1.15,
    sortinoRatio: 1.75,
    beta: 1.05,
    alpha1Y: 1.8,
    promoterPledge: 0.0,
    fiiHolding: 21.8,
    diiHolding: 17.4,
    publicHolding: 10.6
  },
  {
    id: 'icici-bank',
    symbol: 'ICICIBANK',
    name: 'ICICI Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1238.20,
    change: 1.45,
    marketCapCr: 871000,
    sharesCountCr: 703.4,
    pe: 18.2,
    pb: 3.1,
    evToEbitda: 13.8,
    divYield: 0.85,
    roe: 18.5,
    netMargin: 24.8,
    operatingMargin: 42.1,
    debtToEquity: 1.10,
    interestCoverage: 12.8,
    currentRatio: 1.30,
    profitGrowthYoY: 19.4,
    salesCagr3Y: 24.6,
    cashRatio: 0.90,
    freeCashFlowCr: 32000,
    sharpeRatio: 1.78,
    sortinoRatio: 2.65,
    beta: 0.92,
    alpha1Y: 8.4,
    promoterPledge: 0.0,
    fiiHolding: 44.8,
    diiHolding: 35.6,
    publicHolding: 19.6
  },
  {
    id: 'bharti-airtel',
    symbol: 'BHARTIARTL',
    name: 'Bharti Airtel Ltd.',
    sector: 'Telecommunication',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1565.30,
    change: 2.10,
    marketCapCr: 914000,
    sharesCountCr: 583.9,
    pe: 62.4,
    pb: 8.2,
    evToEbitda: 13.2,
    divYield: 0.52,
    roe: 17.8,
    netMargin: 10.8,
    operatingMargin: 52.6,
    debtToEquity: 1.75,
    interestCoverage: 3.8,
    currentRatio: 0.85,
    profitGrowthYoY: 48.5,
    salesCagr3Y: 18.2,
    cashRatio: 0.45,
    freeCashFlowCr: 24000,
    sharpeRatio: 1.95,
    sortinoRatio: 2.85,
    beta: 0.82,
    alpha1Y: 21.4,
    promoterPledge: 0.0,
    fiiHolding: 25.1,
    diiHolding: 21.2,
    publicHolding: 53.7
  },
  {
    id: 'infosys',
    symbol: 'INFY',
    name: 'Infosys Ltd.',
    sector: 'Information Technology',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1892.50,
    change: -0.45,
    marketCapCr: 785600,
    sharesCountCr: 415.1,
    pe: 29.8,
    pb: 8.9,
    evToEbitda: 20.2,
    divYield: 2.45,
    roe: 32.1,
    netMargin: 17.2,
    operatingMargin: 21.8,
    debtToEquity: 0.08,
    interestCoverage: 52.0,
    currentRatio: 2.25,
    profitGrowthYoY: 7.2,
    salesCagr3Y: 12.4,
    cashRatio: 1.75,
    freeCashFlowCr: 23100,
    sharpeRatio: 1.35,
    sortinoRatio: 1.95,
    beta: 0.94,
    alpha1Y: 4.8,
    promoterPledge: 0.0,
    fiiHolding: 34.5,
    diiHolding: 35.8,
    publicHolding: 14.9
  },
  {
    id: 'larsen-toubro',
    symbol: 'LT',
    name: 'Larsen & Toubro Ltd.',
    sector: 'Construction & Capital Goods',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 3620.00,
    change: 0.85,
    marketCapCr: 498000,
    sharesCountCr: 137.5,
    pe: 36.2,
    pb: 5.4,
    evToEbitda: 19.5,
    divYield: 0.95,
    roe: 15.6,
    netMargin: 6.2,
    operatingMargin: 11.2,
    debtToEquity: 1.25,
    interestCoverage: 4.6,
    currentRatio: 1.28,
    profitGrowthYoY: 14.8,
    salesCagr3Y: 19.5,
    cashRatio: 0.55,
    freeCashFlowCr: 14500,
    sharpeRatio: 1.55,
    sortinoRatio: 2.20,
    beta: 1.08,
    alpha1Y: 9.6,
    promoterPledge: 0.0,
    fiiHolding: 25.2,
    diiHolding: 37.8,
    publicHolding: 37.0
  },
  {
    id: 'sbi',
    symbol: 'SBIN',
    name: 'State Bank of India',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 792.40,
    change: 1.20,
    marketCapCr: 707100,
    sharesCountCr: 892.4,
    pe: 10.4,
    pb: 1.8,
    evToEbitda: 9.2,
    divYield: 1.72,
    roe: 17.6,
    netMargin: 15.2,
    operatingMargin: 34.2,
    debtToEquity: 1.45,
    interestCoverage: 6.8,
    currentRatio: 1.15,
    profitGrowthYoY: 21.5,
    salesCagr3Y: 18.6,
    cashRatio: 0.65,
    freeCashFlowCr: 28500,
    sharpeRatio: 1.62,
    sortinoRatio: 2.45,
    beta: 1.18,
    alpha1Y: 12.8,
    promoterPledge: 0.0,
    fiiHolding: 11.2,
    diiHolding: 24.8,
    publicHolding: 7.2
  },
  {
    id: 'axis-bank',
    symbol: 'AXISBANK',
    name: 'Axis Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1184.60,
    change: 0.40,
    marketCapCr: 366200,
    sharesCountCr: 309.1,
    pe: 14.5,
    pb: 2.2,
    evToEbitda: 11.6,
    divYield: 0.08,
    roe: 17.8,
    netMargin: 20.5,
    operatingMargin: 39.4,
    debtToEquity: 1.22,
    interestCoverage: 9.4,
    currentRatio: 1.25,
    profitGrowthYoY: 16.4,
    salesCagr3Y: 22.8,
    cashRatio: 0.85,
    freeCashFlowCr: 18400,
    sharpeRatio: 1.45,
    sortinoRatio: 2.05,
    beta: 1.12,
    alpha1Y: 6.2,
    promoterPledge: 0.0,
    fiiHolding: 52.8,
    diiHolding: 29.4,
    publicHolding: 17.8
  },
  {
    id: 'itc',
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'FMCG',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 504.20,
    change: -0.30,
    marketCapCr: 629800,
    sharesCountCr: 1249.2,
    pe: 29.2,
    pb: 8.4,
    evToEbitda: 20.8,
    divYield: 3.05,
    roe: 29.5,
    netMargin: 27.8,
    operatingMargin: 36.4,
    debtToEquity: 0.01,
    interestCoverage: 110.0,
    currentRatio: 2.80,
    profitGrowthYoY: 9.5,
    salesCagr3Y: 15.2,
    cashRatio: 1.85,
    freeCashFlowCr: 16800,
    sharpeRatio: 1.48,
    sortinoRatio: 2.15,
    beta: 0.65,
    alpha1Y: 2.8,
    promoterPledge: 0.0,
    fiiHolding: 42.5,
    diiHolding: 38.2,
    publicHolding: 19.3
  },
  {
    id: 'tcs',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 4210.00,
    change: 0.65,
    marketCapCr: 1522700,
    sharesCountCr: 361.7,
    pe: 31.8,
    pb: 14.5,
    evToEbitda: 22.4,
    divYield: 2.20,
    roe: 48.5,
    netMargin: 19.8,
    operatingMargin: 26.0,
    debtToEquity: 0.00,
    interestCoverage: 65.0,
    currentRatio: 2.60,
    profitGrowthYoY: 12.5,
    salesCagr3Y: 14.2,
    cashRatio: 2.10,
    freeCashFlowCr: 41000,
    sharpeRatio: 1.65,
    sortinoRatio: 2.45,
    beta: 0.72,
    alpha1Y: 5.4,
    promoterPledge: 0.0,
    fiiHolding: 12.5,
    diiHolding: 10.2,
    publicHolding: 5.3
  },
  {
    id: 'tata-motors',
    symbol: 'TATAMOTORS',
    name: 'Tata Motors Ltd.',
    sector: 'Automobile',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 978.40,
    change: 2.45,
    marketCapCr: 359800,
    sharesCountCr: 367.8,
    pe: 14.8,
    pb: 3.8,
    evToEbitda: 7.5,
    divYield: 0.60,
    roe: 28.4,
    netMargin: 7.2,
    operatingMargin: 14.5,
    debtToEquity: 0.65,
    interestCoverage: 7.5,
    currentRatio: 1.05,
    profitGrowthYoY: 74.2,
    salesCagr3Y: 26.5,
    cashRatio: 0.72,
    freeCashFlowCr: 21500,
    sharpeRatio: 1.95,
    sortinoRatio: 3.10,
    beta: 1.32,
    alpha1Y: 14.6,
    promoterPledge: 1.8,
    fiiHolding: 19.2,
    diiHolding: 16.8,
    publicHolding: 17.6
  },
  {
    id: 'yes-bank',
    symbol: 'YESBANK',
    name: 'Yes Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 24.50,
    change: -0.85,
    marketCapCr: 76800,
    sharesCountCr: 3135.0,
    pe: 58.4,
    pb: 1.8,
    evToEbitda: 28.6,
    divYield: 0.00,
    roe: 3.4,
    netMargin: 4.8,
    operatingMargin: 12.1,
    debtToEquity: 2.40,
    interestCoverage: 2.8,
    currentRatio: 1.05,
    profitGrowthYoY: 10.2,
    salesCagr3Y: 6.4,
    cashRatio: 0.42,
    freeCashFlowCr: 1200,
    sharpeRatio: 0.35,
    sortinoRatio: 0.48,
    beta: 1.45,
    alpha1Y: -4.8,
    promoterPledge: 0.0,
    fiiHolding: 12.8,
    diiHolding: 42.1,
    publicHolding: 45.1
  },
  {
    id: 'suzlon',
    symbol: 'SUZLON',
    name: 'Suzlon Energy Ltd.',
    sector: 'Energy',
    indexUniverse: ['Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 74.20,
    change: 4.80,
    marketCapCr: 101200,
    sharesCountCr: 1363.8,
    pe: 95.2,
    pb: 22.4,
    evToEbitda: 48.5,
    divYield: 0.00,
    roe: 24.5,
    netMargin: 9.2,
    operatingMargin: 15.6,
    debtToEquity: 0.08,
    interestCoverage: 18.5,
    currentRatio: 1.45,
    profitGrowthYoY: 180.0,
    salesCagr3Y: 24.1,
    cashRatio: 0.95,
    freeCashFlowCr: 1400,
    sharpeRatio: 2.10,
    sortinoRatio: 3.40,
    beta: 1.85,
    alpha1Y: 42.5,
    promoterPledge: 0.0,
    fiiHolding: 22.4,
    diiHolding: 10.2,
    publicHolding: 54.1
  },
  {
    id: 'zomato',
    symbol: 'ZOMATO',
    name: 'Zomato Ltd.',
    sector: 'Consumer Tech',
    indexUniverse: ['Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 268.40,
    change: 3.10,
    marketCapCr: 237100,
    sharesCountCr: 883.5,
    pe: 112.5,
    pb: 11.2,
    evToEbitda: 78.2,
    divYield: 0.00,
    roe: 4.8,
    netMargin: 3.2,
    operatingMargin: 5.4,
    debtToEquity: 0.02,
    interestCoverage: 45.0,
    currentRatio: 4.50,
    profitGrowthYoY: 240.0,
    salesCagr3Y: 65.2,
    cashRatio: 3.80,
    freeCashFlowCr: 1850,
    sharpeRatio: 1.82,
    sortinoRatio: 2.95,
    beta: 1.62,
    alpha1Y: 28.5,
    promoterPledge: 0.0,
    fiiHolding: 54.1,
    diiHolding: 21.8,
    publicHolding: 24.1
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [stocksList, setStocksList] = useState(INITIAL_STOCKS_DATA);
  const [isLoadingLive, setIsLoadingLive] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(null);

  const [selectedStockDrawer, setSelectedStockDrawer] = useState(null);
  const [selectedBenchmark, setSelectedBenchmark] = useState(INITIAL_STOCKS_DATA[0]); // HDFC Bank
  const [selectedTarget, setSelectedTarget] = useState(INITIAL_STOCKS_DATA[11]); // Yes Bank
  const [targetPriceGoal, setTargetPriceGoal] = useState(100);
  const [indexFilter, setIndexFilter] = useState('All NSE');
  const [searchQuery, setSearchQuery] = useState('');

  // Virtual Trading State
  const [isRegistered, setIsRegistered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authStep, setAuthStep] = useState('credentials');
  const [mobileNum, setMobileNum] = useState('');
  const [emailId, setEmailId] = useState('');
  const [otpVal, setOtpVal] = useState('');
  const [virtualCash, setVirtualCash] = useState(1000000);
  const [positions, setPositions] = useState([
    { id: 1, symbol: 'NIFTY 25000 CE', type: 'CE', qty: 75, avgPrice: 142.50, ltp: 165.20 },
    { id: 2, symbol: 'HDFCBANK', type: 'EQUITY', qty: 100, avgPrice: 1610.00, ltp: 1648.50 }
  ]);

  // Option Calculator State
  const [calcSpot, setCalcSpot] = useState(25000);
  const [calcStrike, setCalcStrike] = useState(25000);
  const [calcDTE, setCalcDTE] = useState(7);
  const [calcIV, setCalcIV] = useState(14);
  const [calcType, setCalcType] = useState('CE');

  // Legal Modals
  const [activeLegalModal, setActiveLegalModal] = useState(null);

  // --- LIVE DATA FETCH FUNCTION ---
  const fetchLiveMarketData = async () => {
    setIsLoadingLive(true);
    try {
      const updatedList = await Promise.all(
        stocksList.map(async (stock) => {
          try {
            const res = await fetch(`/api/fundamentals/${stock.symbol}`);
            if (!res.ok) return stock;
            const data = await res.json();
            return {
              ...stock,
              price: data.price ? Number(data.price) : stock.price,
              pe: data.pe ? Number(data.pe) : stock.pe,
              pb: data.pb ? Number(data.pb) : stock.pb,
              roe: data.roe ? Number(data.roe) : stock.roe,
              debtToEquity: data.debtToEquity !== undefined ? Number(data.debtToEquity) : stock.debtToEquity,
              profitGrowthYoY: data.profitGrowthYoY !== undefined ? Number(data.profitGrowthYoY) : stock.profitGrowthYoY
            };
          } catch (err) {
            return stock;
          }
        })
      );
      setStocksList(updatedList);
      setLastUpdated(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    } catch (e) {
      console.warn("Could not load live values, using baseline fallback:", e);
    } finally {
      setIsLoadingLive(false);
    }
  };

  // Automatically fetch live prices on initial page load
  useEffect(() => {
    fetchLiveMarketData();
  }, []);

  // Compute Fundamental Strength Score (0-100)
  const rankedStocks = useMemo(() => {
    return stocksList.map(st => {
      let score = 50;
      // Valuation
      if (st.pe > 0 && st.pe < 25) score += 12;
      else if (st.pe >= 25 && st.pe < 40) score += 6;
      else if (st.pe > 60) score -= 8;
      // Profitability
      if (st.roe > 20) score += 15;
      else if (st.roe > 12) score += 8;
      else score -= 5;
      if (st.netMargin > 15) score += 8;
      // Solvency
      if (st.debtToEquity < 0.5) score += 15;
      else if (st.debtToEquity <= 1.2) score += 5;
      else score -= 10;
      // Growth
      if (st.profitGrowthYoY > 20) score += 15;
      else if (st.profitGrowthYoY > 10) score += 8;

      return {
        ...st,
        strengthScore: Math.min(Math.max(score, 10), 98)
      };
    }).sort((a, b) => b.strengthScore - a.strengthScore);
  }, [stocksList]);

  // Filter stocks by Universe + Real-Time Search Query
  const filteredStocks = useMemo(() => {
    return rankedStocks.filter(stock => {
      const matchesIndex = (indexFilter === 'All NSE') || stock.indexUniverse.includes(indexFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        stock.name.toLowerCase().includes(q) || 
        stock.symbol.toLowerCase().includes(q) || 
        stock.sector.toLowerCase().includes(q);
      return matchesIndex && matchesSearch;
    });
  }, [rankedStocks, indexFilter, searchQuery]);

  // Black-Scholes Formula
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

  // Catch-Up / Parity calculations
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
          NSE LIVE SIM
        </span>
        <span>NIFTY 50: <strong>25,385.40</strong> <span className="text-[#2EC4B6]">+124.50 (+0.49%)</span></span>
        <span>BANK NIFTY: <strong>52,140.80</strong> <span className="text-[#2EC4B6]">+280.20 (+0.54%)</span></span>
        <span>INDIA VIX: <strong>13.42</strong> <span className="text-[#FF7B54]">-0.45 (-3.2%)</span></span>
        <span>HDFCBANK: <strong>₹{stocksList.find(s=>s.symbol==='HDFCBANK')?.price.toFixed(2) || '1648.50'}</strong> <span className="text-[#2EC4B6]">+1.15%</span></span>
        <span>RELIANCE: <strong>₹{stocksList.find(s=>s.symbol==='RELIANCE')?.price.toFixed(2) || '2985.40'}</strong> <span className="text-[#2EC4B6]">+1.85%</span></span>
        <span>YESBANK: <strong>₹{stocksList.find(s=>s.symbol==='YESBANK')?.price.toFixed(2) || '24.50'}</strong> <span className="text-[#FF7B54]">-0.85%</span></span>
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
                EDU BETA
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-1 sm:gap-2">
            {[
              { id: 'home', label: 'Explore' },
              { id: 'fundamentals', label: 'Fundamentals & Parity' },
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
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF7B54] text-white text-sm font-bold shadow-[0_8px_16px_-6px_rgba(255,123,84,0.5)] hover:shadow-lg hover:-translate-y-0.5 transition-all active:translate-y-0"
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
                  Tactile Financial Learning for India
                </span>
                <h1 className="font-['Baloo_2'] text-4xl sm:text-6xl font-extrabold leading-tight text-[#2D2A26] mb-4">
                  Master the Stock Market with <span className="text-[#FF7B54]">Soft Clay</span> Clarity.
                </h1>
                <p className="text-base sm:text-lg text-[#2D2A26]/80 mb-8 font-medium">
                  Compare company fundamentals without financial jargon, demystify Option Greeks with intuitive visualizers, and paper-trade Nifty 50 with ₹10,00,000 risk-free capital.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setCurrentPage('fundamentals')}
                    className="px-6 py-3 rounded-2xl bg-[#FF7B54] text-white font-bold shadow-[0_10px_20px_-6px_rgba(255,123,84,0.4)] hover:-translate-y-1 transition-all"
                  >
                    Compare NSE Fundamentals
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

            {/* Quick-Jump Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div 
                onClick={() => setCurrentPage('fundamentals')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#2EC4B6]/20 text-[#2EC4B6] flex items-center justify-center font-bold text-xl mb-4">
                  <BarChart3 size={24} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">5-Pillar Fundamentals</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Search & filter across top 10 heavyweights and smallcaps. Rank stocks by Valuation, Profitability, Solvency, and Growth.
                </p>
              </div>

              <div 
                onClick={() => setCurrentPage('fundamentals')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FFD166]/30 text-[#2D2A26] flex items-center justify-center font-bold text-xl mb-4">
                  <Scale size={24} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">Parity Growth Sandbox</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Can Yes Bank hit ₹100? See the exact net profit and market cap required compared to stalwarts like HDFC Bank.
                </p>
              </div>

              <div 
                onClick={() => setCurrentPage('derivatives')}
                className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm hover:-translate-y-1 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#CDB4DB]/40 text-[#2D2A26] flex items-center justify-center font-bold text-xl mb-4">
                  <Activity size={24} />
                </div>
                <h3 className="font-['Baloo_2'] text-xl font-bold mb-2">The Option Greeks Lab</h3>
                <p className="text-sm text-[#2D2A26]/70">
                  Delta, Gamma, Theta decay, and Vega explained with real-world analogies like melting ice cream and speedometers.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 2: FUNDAMENTALS & PARITY ================= */}
        {currentPage === 'fundamentals' && (
          <div className="space-y-8">
            {/* Search, Filter & Live Refresh Controls */}
            <div className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
                    NSE Fundamental Strength Screener
                  </h2>
                  {lastUpdated && (
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#2EC4B6]/15 text-[#2EC4B6] font-bold">
                      Live synced {lastUpdated}
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#2D2A26]/70">
                  Showing top liquid leaders & popular movers ({filteredStocks.length} of {stocksList.length} stocks)
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {/* Instant Search Bar */}
                <div className="relative min-w-[240px]">
                  <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D2A26]/40" />
                  <input
                    type="text"
                    placeholder="Search stock (e.g. HDFC, TCS, Yes Bank)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-8 py-2 text-xs font-bold rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/15 outline-none focus:border-[#FF7B54] transition-colors"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#2D2A26]/40 hover:text-[#2D2A26]"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                {/* Manual Live Refresh Button */}
                <button
                  onClick={fetchLiveMarketData}
                  disabled={isLoadingLive}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/20 text-xs font-bold hover:bg-[#2D2A26] hover:text-white transition-all disabled:opacity-50"
                  title="Query Python /api/fundamentals for real-time prices"
                >
                  <RefreshCw size={13} className={isLoadingLive ? "animate-spin text-[#FF7B54]" : ""} />
                  <span>{isLoadingLive ? 'Syncing...' : 'Refresh Live'}</span>
                </button>
              </div>

              {/* Index Universe Pills */}
              <div className="flex flex-wrap gap-1.5">
                {['All NSE', 'Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'].map(idx => (
                  <button
                    key={idx}
                    onClick={() => setIndexFilter(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      indexFilter === idx
                        ? 'bg-[#FF7B54] text-white shadow-sm'
                        : 'bg-[#FAF7F2] text-[#2D2A26] hover:bg-[#2D2A26]/5'
                    }`}
                  >
                    {idx}
                  </button>
                ))}
              </div>
            </div>

            {/* Core 5-Pillar Table */}
            <div className="bg-white rounded-3xl border border-[#2D2A26]/10 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#FAF7F2] border-b border-[#2D2A26]/10 text-xs font-bold text-[#2D2A26]/70">
                    <tr>
                      <th className="py-4 px-6">Rank & Company</th>
                      <th className="py-4 px-4">Market Cap</th>
                      <th className="py-4 px-4">Price</th>
                      <th className="py-4 px-4">P/E (Valuation)</th>
                      <th className="py-4 px-4">ROE % (Profitability)</th>
                      <th className="py-4 px-4">Debt/Eq (Solvency)</th>
                      <th className="py-4 px-4">Profit YoY (Growth)</th>
                      <th className="py-4 px-4 text-center">Strength Score</th>
                      <th className="py-4 px-6 text-right">In-Depth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2D2A26]/5">
                    {filteredStocks.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="py-12 text-center text-[#2D2A26]/60 font-semibold">
                          No stocks found matching "{searchQuery}". Try searching by another ticker or clear the search.
                        </td>
                      </tr>
                    ) : (
                      filteredStocks.map((stock, index) => (
                        <tr key={stock.id} className="hover:bg-[#FAF7F2]/60 transition-colors">
                          <td className="py-4 px-6">
                            <div className="flex items-center gap-3">
                              <span className="w-6 h-6 rounded-lg bg-[#2D2A26]/5 text-[#2D2A26] font-bold text-xs flex items-center justify-center">
                                #{index + 1}
                              </span>
                              <div>
                                <div className="font-bold text-[#2D2A26]">{stock.name}</div>
                                <div className="text-xs text-[#2D2A26]/50">{stock.symbol} • {stock.sector}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-xs font-semibold text-[#2D2A26]/80">
                            ₹{(stock.marketCapCr / 1000).toFixed(1)}k Cr
                          </td>
                          <td className="py-4 px-4 font-bold">₹{stock.price.toFixed(2)}</td>
                          <td className="py-4 px-4">
                            <span className={`font-semibold ${stock.pe > 60 ? 'text-[#FF7B54]' : 'text-[#2D2A26]'}`}>
                              {stock.pe}x
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-semibold ${stock.roe > 15 ? 'text-[#2EC4B6]' : 'text-[#2D2A26]'}`}>
                              {stock.roe}%
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-semibold ${stock.debtToEquity > 1.5 ? 'text-[#FF7B54]' : 'text-[#2EC4B6]'}`}>
                              {stock.debtToEquity}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`font-semibold ${stock.profitGrowthYoY > 0 ? 'text-[#2EC4B6]' : 'text-[#FF7B54]'}`}>
                              {stock.profitGrowthYoY > 0 ? '+' : ''}{stock.profitGrowthYoY}%
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            <span className={`inline-block px-3 py-1 rounded-full text-xs font-extrabold ${
                              stock.strengthScore >= 80 ? 'bg-[#2EC4B6]/20 text-[#2EC4B6]' :
                              stock.strengthScore >= 60 ? 'bg-[#64B5F6]/20 text-[#2D2A26]' :
                              'bg-[#FF7B54]/20 text-[#FF7B54]'
                            }`}>
                              {stock.strengthScore}/100
                            </span>
                          </td>
                          <td className="py-4 px-6 text-right">
                            <button
                              onClick={() => setSelectedStockDrawer(stock)}
                              className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/20 text-xs font-bold hover:bg-[#2D2A26] hover:text-white transition-all"
                            >
                              Ratios & Alpha
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* ================= CATCH-UP & PARITY SANDBOX ================= */}
            <div className="bg-white rounded-3xl p-8 border border-[#2D2A26]/10 shadow-[0_12px_24px_-10px_rgba(45,42,38,0.08)]">
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 rounded-xl bg-[#FFD166]/30 text-[#2D2A26]">
                  <Scale size={20} />
                </span>
                <h3 className="font-['Baloo_2'] text-2xl font-bold">
                  Catch-up & Parity Sandbox: "Can Underdogs Reach ₹100?"
                </h3>
              </div>
              <p className="text-sm text-[#2D2A26]/70 mb-6">
                Understand why share price is an illusion without looking at total shares and required net profit.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Benchmark Selector */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#2D2A26]/10">
                  <label className="text-xs font-bold uppercase text-[#2D2A26]/60 block mb-2">
                    Established Benchmark Stock
                  </label>
                  <select 
                    value={selectedBenchmark.id} 
                    onChange={(e) => setSelectedBenchmark(stocksList.find(s => s.id === e.target.value))}
                    className="w-full p-3 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm outline-none"
                  >
                    {stocksList.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — P/E: {st.pe}x</option>
                    ))}
                  </select>
                </div>

                {/* Target Underdog Selector */}
                <div className="p-5 rounded-2xl bg-[#FAF7F2] border border-[#2D2A26]/10">
                  <label className="text-xs font-bold uppercase text-[#2D2A26]/60 block mb-2">
                    Target Stock to Simulate
                  </label>
                  <select 
                    value={selectedTarget.id} 
                    onChange={(e) => setSelectedTarget(stocksList.find(s => s.id === e.target.value))}
                    className="w-full p-3 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm outline-none"
                  >
                    {stocksList.map(st => (
                      <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — Price: ₹{st.price.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Slider for Target Price */}
              <div className="bg-[#FAF7F2] p-6 rounded-2xl mb-8">
                <div className="flex justify-between items-center mb-3">
                  <span className="font-bold text-sm">
                    Simulate Target Share Price for {selectedTarget.symbol}:
                  </span>
                  <span className="font-['Baloo_2'] text-3xl font-extrabold text-[#FF7B54]">
                    ₹{targetPriceGoal}
                  </span>
                </div>
                <input 
                  type="range" 
                  min={Math.max(1, Math.round(selectedTarget.price))} 
                  max={Math.round(selectedTarget.price * 8)} 
                  value={targetPriceGoal} 
                  onChange={(e) => setTargetPriceGoal(Number(e.target.value))}
                  className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer accent-[#FF7B54]"
                />
                <div className="flex justify-between text-xs text-[#2D2A26]/60 mt-2 font-semibold">
                  <span>Current: ₹{selectedTarget.price.toFixed(2)}</span>
                  <span>Target: ₹{targetPriceGoal} (+{parityMetrics?.priceSurgePct}%)</span>
                </div>
              </div>

              {/* Calculated Reality Check */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#2D2A26]/10 shadow-sm">
                  <span className="text-xs text-[#2D2A26]/60 block font-semibold mb-1">Implied Market Cap</span>
                  <div className="text-2xl font-['Baloo_2'] font-extrabold text-[#2D2A26]">
                    ₹{parityMetrics?.impliedMarketCapCr} Cr
                  </div>
                  <span className="text-xs text-[#2EC4B6] font-bold">
                    Requires a {parityMetrics?.profitMultiplier}x total expansion
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#2D2A26]/10 shadow-sm">
                  <span className="text-xs text-[#2D2A26]/60 block font-semibold mb-1">
                    Required Annual Net Profit (at Current {selectedTarget.pe}x P/E)
                  </span>
                  <div className="text-2xl font-['Baloo_2'] font-extrabold text-[#2D2A26]">
                    ₹{parityMetrics?.neededNetProfitCurrentPECr} Cr
                  </div>
                  <span className="text-xs text-[#2D2A26]/70">
                    Currently makes ~₹{parityMetrics?.currentNetProfitCr} Cr/yr
                  </span>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#2D2A26]/10 shadow-sm">
                  <span className="text-xs text-[#2D2A26]/60 block font-semibold mb-1">
                    Required Net Profit (if P/E matches {selectedBenchmark.symbol}'s {selectedBenchmark.pe}x)
                  </span>
                  <div className="text-2xl font-['Baloo_2'] font-extrabold text-[#FF7B54]">
                    ₹{parityMetrics?.neededNetProfitBenchmarkPECr} Cr
                  </div>
                  <span className="text-xs text-[#FF7B54] font-bold">
                    Needs substantial profit jump
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= PAGE 3: DERIVATIVES LAB ================= */}
        {currentPage === 'derivatives' && (
          <div className="space-y-10">
            {/* Header */}
            <div className="bg-white p-8 rounded-3xl border border-[#2D2A26]/10 shadow-sm">
              <h2 className="font-['Baloo_2'] text-3xl font-extrabold text-[#2D2A26] mb-2">
                The Derivatives Lab & Option Greeks Engine
              </h2>
              <p className="text-[#2D2A26]/80 text-base max-w-3xl">
                Option prices are determined by Greek sensitivity factors. Adjust the sliders below to see theoretical prices and Greeks update instantly using the Black-Scholes formula.
              </p>
            </div>

            {/* Interactive Calculator */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Sliders Box */}
              <div className="lg:col-span-6 bg-white p-8 rounded-3xl border border-[#2D2A26]/10 shadow-sm space-y-6">
                <h3 className="font-['Baloo_2'] text-xl font-bold flex items-center gap-2">
                  <SlidersHorizontal size={20} className="text-[#FF7B54]" />
                  Pricing Inputs
                </h3>

                {/* CE / PE Toggle */}
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

                {/* Spot Slider */}
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

                {/* Strike Slider */}
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

                {/* DTE Slider */}
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

                {/* IV Slider */}
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

              {/* Output Greeks Board */}
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

            {/* Beginner-Friendly Explanations */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm">
                <h4 className="font-['Baloo_2'] text-lg font-bold mb-2 text-[#64B5F6]">Delta: The Speed</h4>
                <p className="text-xs leading-relaxed text-[#2D2A26]/80">
                  Like a car speedometer: if Delta is 0.50, the option travels at half the speed of the stock. At 1.00, it mimics the stock point-for-point.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm">
                <h4 className="font-['Baloo_2'] text-lg font-bold mb-2 text-[#FF7B54]">Theta: Melting Ice Cream</h4>
                <p className="text-xs leading-relaxed text-[#2D2A26]/80">
                  Time decay never pauses. Holding an option is like holding an ice cream on a warm day: you lose value every passing day unless the stock moves swiftly.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm">
                <h4 className="font-['Baloo_2'] text-lg font-bold mb-2 text-[#2EC4B6]">Vega: The Monsoon Storm</h4>
                <p className="text-xs leading-relaxed text-[#2D2A26]/80">
                  Before election results or budget days, uncertainty (IV) spikes. Umbrella sellers raise prices even without rain. That is Vega in action.
                </p>
              </div>
              <div className="p-6 rounded-3xl bg-white border border-[#2D2A26]/10 shadow-sm">
                <h4 className="font-['Baloo_2'] text-lg font-bold mb-2 text-[#CDB4DB]">Gamma: The Nitro Boost</h4>
                <p className="text-xs leading-relaxed text-[#2D2A26]/80">
                  Gamma pushes Delta faster into the money. It turns sluggish Out-Of-The-Money options into explosive instruments near expiry.
                </p>
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
                {/* Account Dashboard Bar */}
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
                        const hdfc = stocksList.find(s=>s.symbol==='HDFCBANK');
                        const hdfcPrice = hdfc ? hdfc.price : 1648.50;
                        setVirtualCash(prev => prev - (hdfcPrice * 100) + 2400);
                        setPositions([
                          ...positions,
                          { id: Date.now(), symbol: 'HDFCBANK (Covered Lot)', type: 'EQUITY', qty: 100, avgPrice: hdfcPrice, ltp: hdfcPrice },
                          { id: Date.now() + 1, symbol: 'HDFCBANK 1700 CE', type: 'CE (SHORT)', qty: -100, avgPrice: 24.00, ltp: 24.00 }
                        ]);
                        alert(`Deployed Covered Call: Bought 100 HDFCBANK shares @ ₹${hdfcPrice.toFixed(2)} + Sold 1700 Call for ₹2,400 upfront premium income!`);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-[#FF7B54] text-white text-sm font-bold hover:bg-[#FF7B54]/90 transition-all shadow-sm"
                    >
                      Deploy 1-Click Covered Call
                    </button>
                  </div>
                </div>

                {/* Open Positions Table */}
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

      {/* ================= IN-DEPTH STOCK DRAWER ================= */}
      {selectedStockDrawer && (
        <div className="fixed inset-0 z-50 bg-[#2D2A26]/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 sm:p-8 overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-[#FF7B54] uppercase">{selectedStockDrawer.sector}</span>
                <h3 className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
                  {selectedStockDrawer.name}
                </h3>
                <span className="text-xs text-[#2D2A26]/60 font-semibold">{selectedStockDrawer.symbol}</span>
              </div>
              <button 
                onClick={() => setSelectedStockDrawer(null)}
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#2D2A26]/10 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cash Ratios */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] space-y-3">
              <h4 className="font-bold text-sm text-[#2D2A26] flex items-center gap-2">
                <DollarSign size={16} className="text-[#2EC4B6]" />
                Cash & Liquidity Ratios
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>Cash Ratio: <strong className="text-sm block">{selectedStockDrawer.cashRatio}</strong></div>
                <div>Current Ratio: <strong className="text-sm block">{selectedStockDrawer.currentRatio}</strong></div>
                <div>Free Cash Flow: <strong className="text-sm block">₹{selectedStockDrawer.freeCashFlowCr.toLocaleString('en-IN')} Cr</strong></div>
                <div>Promoter Pledge: <strong className={`text-sm block ${selectedStockDrawer.promoterPledge > 0 ? 'text-[#FF7B54]' : 'text-[#2EC4B6]'}`}>{selectedStockDrawer.promoterPledge}%</strong></div>
              </div>
            </div>

            {/* Risk-Adjusted & Benchmark Ratios */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] space-y-3">
              <h4 className="font-bold text-sm text-[#2D2A26] flex items-center gap-2">
                <Activity size={16} className="text-[#64B5F6]" />
                Risk & Benchmark Ratios
              </h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>Sharpe Ratio: <strong className="text-sm block">{selectedStockDrawer.sharpeRatio}</strong></div>
                <div>Sortino Ratio: <strong className="text-sm block">{selectedStockDrawer.sortinoRatio}</strong></div>
                <div>Beta vs Nifty: <strong className="text-sm block">{selectedStockDrawer.beta}</strong></div>
                <div>1Y Alpha: <strong className={`text-sm block ${selectedStockDrawer.alpha1Y >= 0 ? 'text-[#2EC4B6]' : 'text-[#FF7B54]'}`}>{selectedStockDrawer.alpha1Y}%</strong></div>
              </div>
            </div>

            {/* Shareholding Breakdown */}
            <div className="p-5 rounded-2xl bg-[#FAF7F2] space-y-3">
              <h4 className="font-bold text-sm text-[#2D2A26]">Ownership Structure</h4>
              <div className="w-full h-3 rounded-full bg-gray-200 overflow-hidden flex">
                <div style={{ width: `${selectedStockDrawer.fiiHolding}%` }} className="bg-[#64B5F6]" title="FII"></div>
                <div style={{ width: `${selectedStockDrawer.diiHolding}%` }} className="bg-[#FFD166]" title="DII"></div>
                <div style={{ width: `${selectedStockDrawer.publicHolding}%` }} className="bg-[#FF7B54]" title="Public"></div>
              </div>
              <div className="flex justify-between text-xs text-[#2D2A26]/70">
                <span>FII: {selectedStockDrawer.fiiHolding}%</span>
                <span>DII: {selectedStockDrawer.diiHolding}%</span>
                <span>Public: {selectedStockDrawer.publicHolding}%</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedStockDrawer(null)}
              className="w-full py-3 rounded-2xl bg-[#2D2A26] text-white font-bold text-sm"
            >
              Close Drawer
            </button>
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
                className="p-2 rounded-xl bg-[#FAF7F2] hover:bg-[#2D2A26]/10 transition-colors"
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
                  <span className="text-[11px] text-[#2D2A26]/60 block mt-1">Tip: Enter any 4 numbers (e.g. 1234)</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-[#FF7B54] text-white font-bold text-sm shadow-md hover:opacity-90 transition-opacity"
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
              <button 
                onClick={() => setActiveLegalModal(null)}
                className="p-1.5 rounded-xl bg-[#FAF7F2]"
              >
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
                  <p>4. Market Greeks is purely a simulated educational tool designed to impart risk-awareness. It does not solicit orders or provide investment advice.</p>
                </>
              )}
              {activeLegalModal === 'terms' && (
                <>
                  <p>Welcome to Market Greeks. By accessing this platform, you agree to these Terms:</p>
                  <p>• <strong>Educational Nature:</strong> All market data, option chains, and valuation metrics are for training and research purposes only.</p>
                  <p>• <strong>Simulated Balance:</strong> The ₹10,00,000 provided is virtual currency with no monetary cash-out value.</p>
                  <p>• <strong>No Advisory:</strong> We do not offer registered SEBI investment advice or tip services.</p>
                </>
              )}
              {activeLegalModal === 'privacy' && (
                <>
                  <p>Your privacy is important to us:</p>
                  <p>• We do not sell your email address or mobile numbers to 3rd-party telecallers or brokers.</p>
                  <p>• Authentication information is used exclusively to track simulated trading records and persist personal watchlists.</p>
                </>
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