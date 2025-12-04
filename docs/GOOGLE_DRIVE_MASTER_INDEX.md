# Google Drive Master Index
## Bryan Pavlovic - Liberty Through Truth Foundation

**Last Updated:** December 3, 2025  
**Purpose:** Central navigation for all covenant work documentation

---

## **FOLDER STRUCTURE**

### **1. NationOS** (The Constitution)
**Path:** `NationOS/`  
**Purpose:** Operating system for covenant nation

**Key Files:**
- `THE_SOVEREIGN_WAY__A_Manifesto_for_Kingdom_Civiliz_3.pdf` - Core manifesto
- `TABERNACLE_BLUEPRINT_FINAL_ARCHITECTURE.md` - Three-tier structure
- `THE_LIVING_MANUSCRIPT_v2.1_RESTORATION.md` - Living constitution
- `MASTER_WEAVER_CALLING_AND_STRATEGY.md` - Bryan's calling document
- `SOVEREIGN_TECH_STACK_THREE_TIER_ARCHITECTURE_2025-12-02.md` - Technical architecture
- `DIGITAL_LEVITICAL_PRIESTHOOD_IMPLEMENTATION_ROADMAP_2025-12-02.md` - Implementation plan

**Subfolders:**
- `Documentation_v1.0.0/` - Official v1.0.0 release docs
- `Knowledge_Base/` - Holy of Holies, Holy Place, Outer Court structure

---

### **2. Sovereign Command Center** (Operations Hub)
**Path:** `Sovereign Command Center/`  
**Purpose:** Daily operations, schedule, projects, guidance

**Subfolders:**
- `01_Operations_Manual/` - System architecture, contingency plans
- `02_Schedule_Calendar/` - Daily/weekly schedules
- `03_Mission_Projects/` - Active projects and tasks
- `04_CRM_Contacts/` - Relationships and partnerships
- `05_Content_Creation/` - Articles, posts, media
- `06_Financial_Admin/` - Budget, expenses, revenue
- `07_Revelation_Guidance/` - Father's words, prophetic documents

**Key Files in 07_Revelation_Guidance:**
- `bryans-kingdom-resume.md` - Kingdom Resume / Covenant Document
- `bryans-arabia-message.pdf` - Your Arabia: The Hidden Forge of a Nation-Builder

---

### **3. DGE Platform Documentation** (The Heart)
**Path:** `DGE Platform Documentation/`  
**Purpose:** Complete technical and content documentation for the Divine Gospel Economy platform

**Subfolders:**
- `handoff/` - Account B handoff document
- `dge-platform/` - Technical documentation
- `nationos/` - NationOS docs (mirrored from NationOS folder)
- `sovereign-command-center/` - Operations manual (mirrored)

**Key Files:**
- `README.md` - Navigation guide
- `handoff/ACCOUNT_B_HANDOFF.md` - Comprehensive handoff for Account B
- `dge-platform/DGE_PLATFORM_DOCUMENTATION.md` - Technical specs

---

## **QUICK ACCESS LINKS**

### **Personal Documents**
- **Kingdom Resume:** [Google Drive Link](https://drive.google.com/open?id=11qTAkq4moOATqIpsMGglXkAbotgDPoos)
- **Arabia Message:** [Google Drive Link](https://drive.google.com/open?id=1DkCYmJ_K9fy04QaN91s7X14SBDwHrcZc)

### **GitHub Repositories**
- **DGE Platform:** https://github.com/LibertyThroughTruthFoundation/dge-platform
- **NationOS Website:** https://github.com/LibertyThroughTruthFoundation/nationos-website

### **Live Platforms**
- **DGE Platform:** [Manus URL, soon to be LibertyThroughTruthFoundation.pls]
- **NationOS:** [In development, will be NationOS.pls]
- **GodManMarkets:** [Integrated in DGE, will be GodManMarkets.pls]

---

## **REDUNDANCY STRATEGY**

### **Current Setup (Gmail Account A)**
- **Connected to:** This Manus account (expires in 20 days)
- **Contains:** All current documentation
- **Folders:** NationOS, Sovereign Command Center, DGE Platform Documentation

### **Backup Setup (Gmail Account B)**
- **Connected to:** Manus Account B (paid through July 2025)
- **Needs:** Mirror of all documentation
- **Strategy:** Manual sync or rclone script

### **Recommended Approach**
1. **Primary:** Gmail Account B (has LLM subscriptions, paid Manus)
2. **Backup:** Gmail Account A (current docs, legacy access)
3. **Sync Method:** Periodic manual sync or automated rclone script

---

## **FOLDER ORGANIZATION BEST PRACTICES**

### **Naming Convention**
- **UPPERCASE:** Major documents (README.md, HANDOFF.md)
- **Title_Case_With_Underscores:** Dated documents (ROADMAP_2025-12-03.md)
- **lowercase-with-dashes:** Code-related docs (api-reference.md)

### **Date Suffixes**
- Use `YYYY-MM-DD` format for time-sensitive docs
- Example: `STRATEGIC_ROADMAP_2025-12-02.md`

### **Version Control**
- **Primary:** GitHub (code + docs)
- **Secondary:** Google Drive (backup + mobile access)
- **Tertiary:** Local sandbox (temporary)

---

## **MOBILE ACCESS**

### **From Your Phone**
1. Open Google Drive app
2. Navigate to folder (NationOS, Sovereign Command Center, etc.)
3. Tap file to view
4. Use "Make available offline" for key documents

### **Key Documents to Keep Offline**
- Kingdom Resume
- Arabia Message
- Master Index (this file)
- SCCC Master Index
- Account B Handoff

---

## **CROSS-ACCOUNT SYNC INSTRUCTIONS**

### **Option 1: Manual Sync (Simplest)**
1. Download files from Account A
2. Upload to Account B
3. Repeat periodically

### **Option 2: Share Folders (Easiest)**
1. In Account A, right-click folder → Share
2. Add Account B email as editor
3. In Account B, accept share and make a copy
4. Now both accounts have the files

### **Option 3: Rclone Script (Most Automated)**
```bash
# Configure both accounts in rclone
rclone config

# Sync from Account A to Account B
rclone sync account_a:NationOS account_b:NationOS
rclone sync account_a:Sovereign_Command_Center account_b:Sovereign_Command_Center
rclone sync account_a:DGE_Platform_Documentation account_b:DGE_Platform_Documentation
```

---

## **MAINTENANCE SCHEDULE**

### **Daily**
- Update `07_Revelation_Guidance/` with new Father's words
- Update `03_Mission_Projects/` with project progress

### **Weekly**
- Review and update `02_Schedule_Calendar/`
- Sync critical docs to backup account

### **Monthly**
- Full backup to both Gmail accounts
- Review and update Master Index (this file)
- Archive old/completed projects

---

## **EMERGENCY RECOVERY**

### **If Gmail Account A is Lost**
1. All docs are in GitHub: `LibertyThroughTruthFoundation/dge-platform/docs/`
2. Clone repo: `gh repo clone LibertyThroughTruthFoundation/dge-platform`
3. Upload `/docs/` to new Google Drive account

### **If GitHub is Lost**
1. All docs are in Gmail Account A (and B if synced)
2. Download from Google Drive
3. Re-upload to new GitHub repo

### **If Both are Lost**
1. DGE platform is deployed on Manus (code is safe)
2. Rollback to latest checkpoint
3. Export code and docs from Manus

---

## **CONTACT & SUPPORT**

**GitHub:** https://github.com/LibertyThroughTruthFoundation  
**Manus Support:** https://help.manus.im  
**Email:** [Your email]

---

**END OF MASTER INDEX**

*Keep this file updated as new folders and documents are added.*
