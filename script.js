// Constituents Data
const constituents = [
    { symbol: "NSE:DLF", name: "DLF Limited", price: "890.50", change: "+1.2%" },
    { symbol: "NSE:LODHA", name: "Macrotech Developers", price: "1,245.00", change: "-0.5%" },
    { symbol: "NSE:GODREJPROP", name: "Godrej Properties", price: "2,450.75", change: "+2.1%" },
    { symbol: "NSE:PHOENIXLTD", name: "The Phoenix Mills", price: "3,100.00", change: "+0.8%" },
    { symbol: "NSE:OBEROIRLTY", name: "Oberoi Realty", price: "1,560.20", change: "-1.1%" },
    { symbol: "NSE:PRESTIGE", name: "Prestige Estates", price: "1,120.00", change: "+0.5%" },
    { symbol: "NSE:BRIGADE", name: "Brigade Enterprises", price: "980.00", change: "+1.5%" },
    { symbol: "NSE:SOBHA", name: "Sobha Limited", price: "1,450.00", change: "-0.2%" }
];

// Initialize TradingView Widget
let widget;

function initWidget(symbol) {
    if (widget) {
        // If widget exists, we might want to remove it or update it. 
        // The library doesn't support easy updates without iframe reload, 
        // so we'll just recreate it for simplicity in this static demo.
        document.getElementById('tradingview_realty').innerHTML = '';
    }

    widget = new TradingView.widget({
        "autosize": true,
        "symbol": symbol,
        "interval": "D",
        "timezone": "Asia/Kolkata",
        "theme": "light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": true,
        "container_id": "tradingview_realty"
    });
}

// Populate Constituents List
function renderConstituents() {
    const listContainer = document.getElementById('constituents-list');
    
    constituents.forEach(stock => {
        const card = document.createElement('div');
        card.className = 'stock-card';
        card.onclick = () => initWidget(stock.symbol);
        
        const isPositive = stock.change.includes('+');
        const changeColor = isPositive ? '#10B981' : '#EF4444'; // Green or Red

        card.innerHTML = `
            <div class="stock-info">
                <h4>${stock.name}</h4>
                <span>${stock.symbol.split(':')[1]}</span>
            </div>
            <div class="stock-price" style="text-align: right;">
                <div style="font-weight: 600;">₹${stock.price}</div>
                <div style="font-size: 12px; color: ${changeColor};">${stock.change}</div>
            </div>
        `;
        
        listContainer.appendChild(card);
    });
}

// Contact Form Handler
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const status = document.getElementById('formStatus');
    
    if (!email) return;

    const subject = encodeURIComponent('Request Access: ' + email);
    const mailto = `mailto:hello@skyguard.capital?subject=${subject}`;
    
    status.textContent = 'Redirecting to email client...';
    
    setTimeout(() => {
        window.location.href = mailto;
        status.textContent = 'Please check your email client to send the request.';
    }, 1000);
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Default to Nifty Realty Index
    initWidget("NSE:CNXREALTY");
    renderConstituents();
});
