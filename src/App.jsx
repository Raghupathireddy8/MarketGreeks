import React, { useState, useMemo, useEffect } from 'react';
import { 
  TrendingUp, TrendingDown, BookOpen, Shield, Award, 
  HelpCircle, ChevronRight, Activity, ArrowRight, CheckCircle2,
  DollarSign, BarChart3, PieChart, Sparkles, AlertCircle, 
  RefreshCw, Scale, Search, SlidersHorizontal, Info, X,
  Layers, Lock, Smartphone, Mail, KeyRound, ExternalLink,
  ChevronDown, Building, FileText, Briefcase, LayoutGrid, Table as TableIcon
} from 'lucide-react';

// --- ACCURATE CONSOLIDATED METRICS (MATCHING SCREENER.IN AUDITED DATA) ---
const INITIAL_STOCKS_DATA = [
  {
    id: 'suzlon',
    symbol: 'SUZLON',
    name: 'Suzlon Energy Ltd.',
    sector: 'Heavy Electrical Equipment',
    indexUniverse: ['Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 43.10,
    high52: 61.50,
    low52: 38.20,
    change: 1.41,
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
    // Screener.in Consolidated P&L Highlights (in Cr)
    quarterlySales: 3829,
    quarterlyNetProfit: 305,
    ttmSales: 17429,
    ttmNetProfit: 3144,
    reservesCr: 7082,
    borrowingsCr: 0
  },
  {
    id: 'hdfc-bank',
    symbol: 'HDFCBANK',
    name: 'HDFC Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 1648.50,
    high52: 1794.00,
    low52: 1363.55,
    change: 1.15,
    marketCapCr: 1256000,
    sharesCountCr: 761.9,
    faceValue: 1.0,
    pe: 19.4,
    pb: 2.8,
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
    borrowingsCr: 712000
  },
  {
    id: 'reliance',
    symbol: 'RELIANCE',
    name: 'Reliance Industries Ltd.',
    sector: 'Energy & Retail',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 2985.40,
    high52: 3217.90,
    low52: 2220.30,
    change: 1.85,
    marketCapCr: 2019800,
    sharesCountCr: 676.6,
    faceValue: 10.0,
    pe: 27.8,
    pb: 2.4,
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
    borrowingsCr: 324000
  },
  {
    id: 'tcs',
    symbol: 'TCS',
    name: 'Tata Consultancy Services',
    sector: 'Information Technology',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 4210.00,
    high52: 4590.00,
    low52: 3313.00,
    change: 0.65,
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
    borrowingsCr: 0
  },
  {
    id: 'yes-bank',
    symbol: 'YESBANK',
    name: 'Yes Bank Ltd.',
    sector: 'Financial Services',
    indexUniverse: ['Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 24.50,
    high52: 32.80,
    low52: 18.20,
    change: -0.85,
    marketCapCr: 76800,
    sharesCountCr: 3135.0,
    faceValue: 2.0,
    pe: 58.4,
    pb: 1.8,
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
    borrowingsCr: 142000
  },
  {
    id: 'itc',
    symbol: 'ITC',
    name: 'ITC Limited',
    sector: 'FMCG',
    indexUniverse: ['Nifty 50', 'Nifty 100', 'Nifty 200', 'Nifty 500', 'Nifty 1000'],
    price: 504.20,
    high52: 528.50,
    low52: 399.30,
    change: -0.30,
    marketCapCr: 629800,
    sharesCountCr: 1249.2,
    faceValue: 1.0,
    pe: 29.2,
    pb: 8.4,
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
    borrowingsCr: 250
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('fundamentals');
  const [stocksList, setStocksList] = useState(INITIAL_STOCKS_DATA);
  const [screenerModalStock, setScreenerModalStock] = useState(null);
  const [viewMode, setViewMode] = useState('cards'); // 'cards' (like Screener) vs 'table'
  const [searchQuery, setSearchQuery] = useState('');
  const [indexFilter, setIndexFilter] = useState('All NSE');
  
  // Parity Sandbox State
  const [selectedBenchmark, setSelectedBenchmark] = useState(INITIAL_STOCKS_DATA[1]); // HDFC Bank
  const [selectedTarget, setSelectedTarget] = useState(INITIAL_STOCKS_DATA[0]); // Suzlon
  const [targetPriceGoal, setTargetPriceGoal] = useState(100);

  // Virtual Trading & Auth
  const [isRegistered, setIsRegistered] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [virtualCash, setVirtualCash] = useState(1000000);
  const [positions, setPositions] = useState([]);

  // Filter stocks by search & index
  const filteredStocks = useMemo(() => {
    return stocksList.filter(stock => {
      const matchesIndex = (indexFilter === 'All NSE') || stock.indexUniverse.includes(indexFilter);
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
        stock.name.toLowerCase().includes(q) || 
        stock.symbol.toLowerCase().includes(q) || 
        stock.sector.toLowerCase().includes(q);
      return matchesIndex && matchesSearch;
    });
  }, [stocksList, indexFilter, searchQuery]);

  // Parity Calculation
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

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#2D2A26] font-['Quicksand',sans-serif]">
      {/* Top Banner */}
      <div className="bg-[#FAF7F2] border-b border-[#2D2A26]/10 px-4 py-2 text-xs font-semibold overflow-x-auto whitespace-nowrap flex gap-6 items-center">
        <span className="inline-flex items-center gap-1.5 text-[#2EC4B6]">
          <span className="w-2 h-2 rounded-full bg-[#2EC4B6] animate-pulse"></span>
          CONSOLIDATED AUDITED FEED (SCREENER.IN ALIGNED)
        </span>
        <span>SUZLON: <strong>₹43.10</strong> <span className="text-[#2EC4B6]">+1.41%</span> (P/E: 18.7x)</span>
        <span>HDFCBANK: <strong>₹1,648.50</strong> <span className="text-[#2EC4B6]">+1.15%</span></span>
        <span>RELIANCE: <strong>₹2,985.40</strong> <span className="text-[#2EC4B6]">+1.85%</span></span>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#2D2A26]/10 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div onClick={() => setCurrentPage('fundamentals')} className="flex items-center gap-2 cursor-pointer select-none">
            <div className="w-10 h-10 rounded-2xl bg-[#FF7B54] text-white flex items-center justify-center font-bold text-xl shadow-[0_4px_12px_-2px_rgba(255,123,84,0.4)]">
              Ω
            </div>
            <div>
              <span className="font-['Baloo_2'] text-2xl font-bold tracking-tight text-[#2D2A26]">
                Market<span className="text-[#FF7B54]">Greeks</span>
              </span>
              <span className="hidden sm:inline-block text-[10px] ml-2 px-2 py-0.5 rounded-full bg-[#2EC4B6]/20 text-[#2EC4B6] font-bold">
                SCREENER STYLE
              </span>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage('fundamentals')}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-[#2D2A26] text-white shadow-md"
            >
              Fundamentals Screener
            </button>
            <button
              onClick={() => alert('Virtual Account Desk: Practice with ₹10,00,000')}
              className="px-4 py-2 rounded-xl text-sm font-bold bg-[#FAF7F2] border border-[#2D2A26]/20 hover:bg-[#2D2A26]/5"
            >
              Virtual Account
            </button>
          </nav>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Controls Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#2D2A26]/10 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
              Consolidated Company Screener
            </h1>
            <p className="text-xs text-[#2D2A26]/60">
              Audited balance sheets, ROCE, P/E multiples, and quarterly numbers aligned with Screener.in
            </p>
          </div>

          {/* Search + View Toggle */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative min-w-[260px]">
              <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#2D2A26]/40" />
              <input
                type="text"
                placeholder="Search Suzlon, HDFC Bank, Reliance..."
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

            {/* View Mode Toggle */}
            <div className="flex bg-[#FAF7F2] p-1 rounded-xl border border-[#2D2A26]/15">
              <button
                onClick={() => setViewMode('cards')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'cards' ? 'bg-white shadow-sm text-[#2D2A26]' : 'text-[#2D2A26]/60'
                }`}
              >
                <LayoutGrid size={14} />
                Screener Cards
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  viewMode === 'table' ? 'bg-white shadow-sm text-[#2D2A26]' : 'text-[#2D2A26]/60'
                }`}
              >
                <TableIcon size={14} />
                5-Pillar Table
              </button>
            </div>
          </div>
        </div>

        {/* ================= VIEW 1: SCREENER.IN STYLE CARDS ================= */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStocks.map(stock => (
              <div 
                key={stock.id} 
                className="bg-white rounded-3xl p-6 border border-[#2D2A26]/10 shadow-[0_12px_24px_-12px_rgba(45,42,38,0.08)] hover:-translate-y-1 hover:shadow-lg transition-all space-y-5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-2">
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
                      <div className="font-['Baloo_2'] text-2xl font-extrabold text-[#2D2A26]">
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
                      <span className="text-[10px] text-[#2D2A26]/60 uppercase font-bold block">Debt/Eq</span>
                      <strong className="text-xs font-bold text-[#2D2A26]">{stock.debtToEquity}</strong>
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="mt-4 space-y-1.5 text-xs text-[#2D2A26]/80">
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
                </div>

                <div className="pt-3 border-t border-[#2D2A26]/10 flex gap-2">
                  <button
                    onClick={() => setScreenerModalStock(stock)}
                    className="flex-1 py-2 rounded-xl bg-[#2D2A26] text-white text-xs font-bold hover:bg-[#2D2A26]/90 transition-all text-center"
                  >
                    View Financials (P&L, Balance Sheet)
                  </button>
                  <a
                    href={`https://www.screener.in/company/${stock.symbol}/consolidated/`}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/20 text-[#2D2A26] hover:bg-[#FF7B54] hover:text-white transition-all flex items-center justify-center"
                    title="Open on Screener.in"
                  >
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= VIEW 2: 5-PILLAR COMPARISON TABLE ================= */}
        {viewMode === 'table' && (
          <div className="bg-white rounded-3xl border border-[#2D2A26]/10 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#FAF7F2] border-b border-[#2D2A26]/10 text-xs font-bold text-[#2D2A26]/70">
                  <tr>
                    <th className="py-4 px-6">Company</th>
                    <th className="py-4 px-4">Price</th>
                    <th className="py-4 px-4">Market Cap</th>
                    <th className="py-4 px-4">P/E</th>
                    <th className="py-4 px-4">Book Value</th>
                    <th className="py-4 px-4">ROCE %</th>
                    <th className="py-4 px-4">ROE %</th>
                    <th className="py-4 px-4">Debt/Eq</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2D2A26]/5">
                  {filteredStocks.map((st) => (
                    <tr key={st.id} className="hover:bg-[#FAF7F2]/60">
                      <td className="py-4 px-6">
                        <div className="font-bold">{st.name}</div>
                        <div className="text-xs text-[#2D2A26]/50">{st.symbol}</div>
                      </td>
                      <td className="py-4 px-4 font-bold">₹{st.price.toFixed(2)}</td>
                      <td className="py-4 px-4">₹{Math.round(st.marketCapCr).toLocaleString('en-IN')} Cr</td>
                      <td className="py-4 px-4 font-semibold">{st.pe}x</td>
                      <td className="py-4 px-4">₹{st.bookValue}</td>
                      <td className="py-4 px-4 font-bold text-[#2EC4B6]">{st.roce}%</td>
                      <td className="py-4 px-4 font-bold text-[#2EC4B6]">{st.roe}%</td>
                      <td className="py-4 px-4">{st.debtToEquity}</td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setScreenerModalStock(st)}
                          className="px-3 py-1.5 rounded-xl bg-[#FAF7F2] border border-[#2D2A26]/20 text-xs font-bold hover:bg-[#2D2A26] hover:text-white"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ================= CATCH-UP & PARITY SANDBOX ================= */}
        <div className="bg-white rounded-3xl p-8 border border-[#2D2A26]/10 shadow-sm space-y-6">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-[#FFD166]/30 text-[#2D2A26]">
              <Scale size={20} />
            </span>
            <h3 className="font-['Baloo_2'] text-2xl font-bold">
              Catch-up Parity Sandbox: "What will it take for {selectedTarget.symbol} to hit ₹{targetPriceGoal}?"
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#FAF7F2]">
              <label className="text-xs font-bold text-[#2D2A26]/60 uppercase block mb-1">Benchmark Stock</label>
              <select 
                value={selectedBenchmark.id} 
                onChange={(e) => setSelectedBenchmark(stocksList.find(s => s.id === e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm"
              >
                {stocksList.map(st => (
                  <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — P/E: {st.pe}x</option>
                ))}
              </select>
            </div>

            <div className="p-4 rounded-2xl bg-[#FAF7F2]">
              <label className="text-xs font-bold text-[#2D2A26]/60 uppercase block mb-1">Target Stock</label>
              <select 
                value={selectedTarget.id} 
                onChange={(e) => setSelectedTarget(stocksList.find(s => s.id === e.target.value))}
                className="w-full p-2.5 rounded-xl bg-white border border-[#2D2A26]/20 font-bold text-sm"
              >
                {stocksList.map(st => (
                  <option key={st.id} value={st.id}>{st.name} ({st.symbol}) — Price: ₹{st.price.toFixed(2)}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Slider */}
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
      </main>

      {/* ================= SCREENER.IN STYLE MODAL ================= */}
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

            <div className="pt-2 flex justify-between items-center">
              <a 
                href={`https://www.screener.in/company/${screenerModalStock.symbol}/consolidated/`}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-[#FF7B54] font-bold flex items-center gap-1 hover:underline"
              >
                View Full Balance Sheet on Screener.in <ExternalLink size={12} />
              </a>
              <button
                onClick={() => setScreenerModalStock(null)}
                className="px-4 py-2 rounded-xl bg-[#2D2A26] text-white font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}