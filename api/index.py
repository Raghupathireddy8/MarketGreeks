from fastapi import FastAPI, Query, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import numpy as np
from scipy.stats import norm
import yfinance as yf
from cachetools import TTLCache

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

cache = TTLCache(maxsize=100, ttl=300)

@app.get("/api/greeks")
def get_greeks(spot: float, strike: float, dte: float, iv: float, r: float = 0.065, type: str = "CE"):
    T = max(dte / 365.0, 0.0001)
    sigma = max(iv / 100.0, 0.0001)
    d1 = (np.log(spot / strike) + (r + 0.5 * sigma ** 2) * T) / (sigma * np.sqrt(T))
    d2 = d1 - sigma * np.sqrt(T)

    pdf_d1 = norm.pdf(d1)
    cdf_d1 = norm.cdf(d1)
    cdf_d2 = norm.cdf(d2)

    if type.upper() == "CE":
        price = (spot * cdf_d1) - (strike * np.exp(-r * T) * cdf_d2)
        delta = cdf_d1
        theta = (-(spot * pdf_d1 * sigma) / (2 * np.sqrt(T)) - (r * strike * np.exp(-r * T) * cdf_d2)) / 365.0
    else:
        price = (strike * np.exp(-r * T) * norm.cdf(-d2)) - (spot * norm.cdf(-d1))
        delta = cdf_d1 - 1.0
        theta = (-(spot * pdf_d1 * sigma) / (2 * np.sqrt(T)) + (r * strike * np.exp(-r * T) * norm.cdf(-d2))) / 365.0

    gamma = pdf_d1 / (spot * sigma * np.sqrt(T))
    vega = (spot * pdf_d1 * np.sqrt(T)) / 100.0

    return {
        "theoreticalPrice": round(float(max(0.0, price)), 2),
        "delta": round(float(delta), 4),
        "gamma": round(float(gamma), 5),
        "theta": round(float(theta), 2),
        "vega": round(float(vega), 2)
    }

@app.get("/api/fundamentals/{ticker}")
def get_fundamentals(ticker: str):
    sym = ticker.upper()
    if sym in cache:
        return cache[sym]
    try:
        t = yf.Ticker(f"{sym}.NS")
        info = t.info
        res = {
            "symbol": sym,
            "name": info.get("longName", sym),
            "price": info.get("currentPrice", info.get("regularMarketPrice", 0.0)),
            "pe": round(info.get("trailingPE", 0) or 0, 2),
            "pb": round(info.get("priceToBook", 0) or 0, 2),
            "roe": round((info.get("returnOnEquity", 0) or 0) * 100, 2),
            "debtToEquity": round((info.get("debtToEquity", 0) or 0) / 100.0, 2),
            "profitGrowthYoY": round((info.get("earningsGrowth", 0) or 0) * 100, 2)
        }
        cache[sym] = res
        return res
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))