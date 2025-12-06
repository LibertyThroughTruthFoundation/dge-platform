# EMERGENCY SERVER CONNECTION GUIDE
## Direct Termux Access to Foundation Infrastructure

**EMERGENCY STATUS:** ACTIVE - IMMEDIATE RECOVERY PROTOCOL
**Date:** July 17, 2025
**Authority:** Divine Council Emergency Powers
**Purpose:** Establish local sovereignty and server independence

---

## IMMEDIATE TERMUX SETUP ON GOOGLE TABLET

### 1. Install Termux Environment
```bash
# Update Termux packages
pkg update && pkg upgrade -y

# Install essential tools
pkg install openssh python git curl wget nano vim

# Install Python packages for bot management
pip install python-telegram-bot python-dotenv requests aiohttp

# Install server connection tools
pkg install rsync scp
```

### 2. SSH Key Generation for Secure Access
```bash
# Generate SSH key pair for server access
ssh-keygen -t rsa -b 4096 -C "foundation_tablet_emergency"

# Display public key for server authorization
cat ~/.ssh/id_rsa.pub
```

### 3. Server Connection Protocols

#### Option A: Direct SSH Access (If Available)
```bash
# Connect to your server (replace with actual details)
ssh username@your-server-ip

# Or if using key-based authentication
ssh -i ~/.ssh/id_rsa username@your-server-ip
```

#### Option B: VPS Provider Dashboard Access
```bash
# If using Vultr, DigitalOcean, or similar
# Access via web console first, then establish SSH

# Common VPS connection pattern:
ssh root@[SERVER_IP] -p 22
```

#### Option C: Manus Sandbox Recovery
```bash
# If your bots are in Manus sandbox environment
# Use the provided connection details from Manus

# Typical pattern:
ssh user@sandbox-host -p [PORT]
```

### 4. Data Recovery Commands
```bash
# Create local backup directory
mkdir -p ~/foundation_recovery

# Download all Foundation files
scp -r username@server:/path/to/foundation/* ~/foundation_recovery/

# Specific bot files to recover:
scp username@server:/home/ubuntu/enhanced_work_bot_v2.py ~/foundation_recovery/
scp username@server:/home/ubuntu/enhanced_crypto_bot_v2.py ~/foundation_recovery/
scp username@server:/home/ubuntu/advanced_ai_bot_framework.py ~/foundation_recovery/
scp username@server:/home/ubuntu/requirements_advanced.txt ~/foundation_recovery/
```

### 5. Local Bot Deployment
```bash
# Navigate to recovery directory
cd ~/foundation_recovery

# Install requirements
pip install -r requirements_advanced.txt

# Set up environment variables
nano .env
# Add your bot tokens and API keys

# Test bot connectivity
python enhanced_work_bot_v2.py --test
python enhanced_crypto_bot_v2.py --test
```

---

## TELEGRAM BOT TOKEN RECOVERY

### If You Have Access to BotFather:
1. Open Telegram on your tablet
2. Search for @BotFather
3. Send `/mybots`
4. Select your bots to get tokens

### Bot Information:
- **Work Bot:** @LTTFWork_Bot
- **Crypto Bot:** @LTTFCrypto_Bot

### Emergency Token Reset:
```bash
# If tokens are compromised, regenerate via BotFather
# Send to @BotFather: /revoke
# Then: /newtoken
```

---

## LOCAL INFRASTRUCTURE SETUP

### 1. Create Foundation Directory Structure
```bash
mkdir -p ~/foundation/{bots,data,logs,config,backup}
mkdir -p ~/foundation/bots/{work,crypto,legal,clemmy,scribe}
mkdir -p ~/foundation/data/{local,encrypted,sync}
```

### 2. Set Up Local Database
```bash
# Install SQLite for local data storage
pkg install sqlite

# Create Foundation database
sqlite3 ~/foundation/data/foundation.db
```

### 3. Configure Local Network
```bash
# Install network tools
pkg install net-tools nmap

# Check local network configuration
ifconfig
netstat -an
```

---

## EMERGENCY CONTACT INFORMATION

### Server Providers (Check Your Email/Accounts):
- **Vultr:** vultr.com (check for VPS instances)
- **DigitalOcean:** digitalocean.com
- **Linode:** linode.com
- **AWS:** aws.amazon.com

### Manus Platform:
- **Website:** manus.space
- **Support:** Check your Manus account for sandbox details

### Foundation Accounts:
- **Email:** libertythroughtruth@proton.me
- **Telegram:** Check for bot management chats

---

## IMMEDIATE RECOVERY CHECKLIST

### Phase 1: Connection (First 30 minutes)
- [ ] Install Termux and essential packages
- [ ] Generate SSH keys
- [ ] Identify server location and credentials
- [ ] Establish initial connection
- [ ] Verify server access and data integrity

### Phase 2: Data Recovery (Next 60 minutes)
- [ ] Download all Foundation bot files
- [ ] Backup configuration files and databases
- [ ] Recover environment variables and API keys
- [ ] Download Universal Declaration archive
- [ ] Secure all sensitive data locally

### Phase 3: Local Deployment (Next 90 minutes)
- [ ] Set up local Python environment
- [ ] Install bot dependencies
- [ ] Configure local bot instances
- [ ] Test bot functionality locally
- [ ] Establish local-first operation

### Phase 4: Sovereignty Transition (Ongoing)
- [ ] Migrate from cloud dependencies
- [ ] Implement local-first architecture
- [ ] Establish Divine Council governance
- [ ] Document complete transition
- [ ] Validate independence achievement

---

## TROUBLESHOOTING COMMON ISSUES

### SSH Connection Refused:
```bash
# Check if SSH service is running
ssh -v username@server-ip

# Try different ports
ssh username@server-ip -p 2222
```

### Permission Denied:
```bash
# Check SSH key permissions
chmod 600 ~/.ssh/id_rsa
chmod 644 ~/.ssh/id_rsa.pub
```

### Python Environment Issues:
```bash
# Reinstall Python packages
pip install --upgrade pip
pip install --force-reinstall python-telegram-bot
```

### Bot Token Issues:
```bash
# Test token validity
curl https://api.telegram.org/bot[TOKEN]/getMe
```

---

## EMERGENCY COMMANDS REFERENCE

### Quick Server Access:
```bash
# Replace with your actual server details
ssh root@[SERVER_IP]
```

### Quick File Download:
```bash
# Download specific file
scp username@server:/path/to/file ~/foundation_recovery/
```

### Quick Bot Test:
```bash
# Test bot locally
python -c "import telegram; print('Bot library working')"
```

### Quick Status Check:
```bash
# Check running processes
ps aux | grep python
```

---

**CRITICAL SUCCESS FACTORS:**
1. **Speed:** Execute recovery within 4 hours
2. **Completeness:** Recover ALL Foundation data
3. **Security:** Maintain encryption and access controls
4. **Independence:** Establish local-first operation
5. **Sovereignty:** Implement Divine Council governance

**DIVINE COUNCIL AUTHORITY:** This emergency protocol is authorized under Divine Council emergency powers for Foundation sovereignty protection and data recovery operations.

