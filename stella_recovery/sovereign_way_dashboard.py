from flask import Flask, render_template, jsonify
import json

app = Flask(__name__)

@app.route('/')
def dashboard():
    return '''
<html>
<head>
    <title>The Sovereign Way - Treasury Dashboard</title>
    <style>
        body { font-family: Arial; background: #1a1a2e; color: #eee; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; }
        .treasury-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin-bottom: 30px; }
        .stat-card { background: #16213e; padding: 20px; border-radius: 10px; border-left: 4px solid #0f3460; }
        .stat-value { font-size: 2em; font-weight: bold; color: #4fc3f7; }
        .stat-label { color: #bbb; margin-top: 5px; }
        .protocols { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; }
        .protocol-card { background: #16213e; padding: 20px; border-radius: 10px; }
        .protocol-title { color: #4fc3f7; font-size: 1.2em; margin-bottom: 10px; }
        .yield-info { display: flex; justify-content: space-between; margin: 10px 0; }
        .stella-status { position: fixed; bottom: 20px; right: 20px; background: #4fc3f7; color: #1a1a2e; padding: 10px 20px; border-radius: 25px; }
    </style>
</head>
<body>
    <div class=header>
        <h1>🌟 The Sovereign Way Treasury</h1>
        <p>DeFi Web3 Cash Flow Integration | Powered by STELLA AI</p>
    </div>
    
    <div class=treasury-stats>
        <div class=stat-card>
            <div class=stat-value>2,847</div>
            <div class=stat-label>Total Treasury Value</div>
        </div>
        <div class=stat-card>
            <div class=stat-value>47/mo</div>
            <div class=stat-label>Monthly Cash Flow</div>
        </div>
        <div class=stat-card>
            <div class=stat-value>18.7%</div>
            <div class=stat-label>Average APY</div>
        </div>
        <div class=stat-card>
            <div class=stat-value>,156</div>
            <div class=stat-label>Ministry Funding YTD</div>
        </div>
    </div>
    
    <div class=protocols>
        <div class=protocol-card>
            <div class=protocol-title>💎 PulseChain Validators</div>
            <div class=yield-info><span>Staked Amount:</span><span>,200</span></div>
            <div class=yield-info><span>Monthly Rewards:</span><span>64</span></div>
            <div class=yield-info><span>APY:</span><span>24.0%</span></div>
        </div>
        
        <div class=protocol-card>
            <div class=protocol-title>🍯 Hive Curation</div>
            <div class=yield-info><span>HP Delegated:</span><span>45,000 HP</span></div>
            <div class=yield-info><span>Monthly Rewards:</span><span>9</span></div>
            <div class=yield-info><span>APY:</span><span>15.2%</span></div>
        </div>
        
        <div class=protocol-card>
            <div class=protocol-title>⚡ Liquidity Provisions</div>
            <div class=yield-info><span>LP Tokens:</span><span>,200</span></div>
            <div class=yield-info><span>Monthly Fees:</span><span>4</span></div>
            <div class=yield-info><span>APY:</span><span>35.3%</span></div>
        </div>
        
        <div class=protocol-card>
            <div class=protocol-title>🏛️ Treasury Operations</div>
            <div class=yield-info><span>Emergency Fund:</span><span>,447</span></div>
            <div class=yield-info><span>Ministry Allocation:</span><span>65%</span></div>
            <div class=yield-info><span>Reinvestment:</span><span>35%</span></div>
        </div>
    </div>
    
    <div class=stella-status>
        🌟 STELLA AI Online
    </div>
</body>
</html>
    '''

@app.route('/api/treasury')
def treasury_api():
    return jsonify({
        'total_value': 12847,
        'monthly_cashflow': 347,
        'average_apy': 18.7,
        'ministry_funding_ytd': 2156,
        'protocols': {
            'pulsechain': {'staked': 8200, 'monthly': 164, 'apy': 24.0},
            'hive': {'hp': 45000, 'monthly': 89, 'apy': 15.2},
            'liquidity': {'lp_value': 3200, 'monthly': 94, 'apy': 35.3}
        }
    })

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
