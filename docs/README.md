# Documentation Repository

**Divine Gospel Economy + NationOS Ecosystem**

This `/docs` folder contains all documentation for the DGE platform, NationOS project, and Sovereign Command Center operations.

---

## **Folder Structure**

```
docs/
├── README.md (this file)
├── handoff/
│   └── ACCOUNT_B_HANDOFF.md          ← START HERE for Account B
├── dge-platform/
│   └── DGE_PLATFORM_DOCUMENTATION.md ← Technical & content docs
├── nationos/
│   ├── Documentation_v1.0.0/         ← NationOS v1.0.0 release
│   └── Knowledge_Base/               ← Holy of Holies, Holy Place, Outer Court
└── sovereign-command-center/
    └── 01_Operations_Manual/         ← Daily operations, architecture, contingency
```

---

## **Quick Start**

### **For Account B (New Account):**
1. **Read:** `/docs/handoff/ACCOUNT_B_HANDOFF.md` (comprehensive handoff document)
2. **Review:** `/docs/dge-platform/DGE_PLATFORM_DOCUMENTATION.md` (technical details)
3. **Explore:** `/docs/nationos/` (NationOS documentation)
4. **Operate:** `/docs/sovereign-command-center/` (daily operations)

### **For Continuing Work:**
1. **Check:** `/docs/handoff/ACCOUNT_B_HANDOFF.md` for priority work queue
2. **Reference:** `/docs/dge-platform/DGE_PLATFORM_DOCUMENTATION.md` for implementation details
3. **Consult:** `/docs/nationos/` for theological/architectural guidance

---

## **Key Documents**

### **Handoff**
- `ACCOUNT_B_HANDOFF.md` - Complete handoff from Account A to Account B

### **DGE Platform**
- `DGE_PLATFORM_DOCUMENTATION.md` - Technical documentation, content structure, testing, deployment

### **NationOS**
- `THE_SOVEREIGN_WAY__A_Manifesto_for_Kingdom_Civiliz_3.pdf` - Core manifesto
- `TABERNACLE_BLUEPRINT_FINAL_ARCHITECTURE.md` - Three-tier structure
- `THE_LIVING_MANUSCRIPT_v2.1_RESTORATION.md` - Living constitution
- `MASTER_WEAVER_CALLING_AND_STRATEGY.md` - Bryan's calling document
- `SOVEREIGN_TECH_STACK_THREE_TIER_ARCHITECTURE_2025-12-02.md` - Technical architecture

### **Sovereign Command Center**
- `SCCC_Master_Index_START_HERE_2025-12-03.md` - Master index
- `SCCC_Master_Architecture_2025-12-03.md` - System architecture
- `Operational_Framework_Covenant_Schedule_2025-12-03.md` - Daily operations
- `SCCC_Infrastructure_Contingency_Plan_2025-12-03.md` - Backup plans

---

## **Version Control**

All documentation is version-controlled in GitHub:
- **Repository:** https://github.com/LibertyThroughTruthFoundation/dge-platform
- **Branch:** `main`
- **Path:** `/docs/`

**To update documentation:**
1. Edit files in `/docs/`
2. Commit: `git add docs/ && git commit -m "Update documentation"`
3. Push: `git push github main`

---

## **Backup Strategy**

**Primary:** GitHub repository (version-controlled)  
**Secondary:** Google Drive (Account B)  
**Tertiary:** Local sandbox (temporary)

**To sync to Google Drive:**
```bash
rclone copy /home/ubuntu/dge-platform/docs/ "manus_google_drive:DGE Platform Docs" --config /home/ubuntu/.gdrive-rclone.ini
```

---

## **Documentation Standards**

### **Format**
- Use Markdown (`.md`) for all text documents
- Use PDF for final deliverables or external sharing
- Use PNG for diagrams and screenshots

### **Naming Convention**
- Use UPPERCASE for major documents (e.g., `README.md`, `HANDOFF.md`)
- Use lowercase_with_underscores for code-related docs (e.g., `api_reference.md`)
- Include date suffix for time-sensitive docs (e.g., `ROADMAP_2025-12-03.md`)

### **Structure**
- Start with a clear title and purpose
- Use hierarchical headings (H1 → H2 → H3)
- Include a table of contents for long documents
- End with contact/support information

---

## **Contact & Support**

**GitHub Issues:** https://github.com/LibertyThroughTruthFoundation/dge-platform/issues  
**Manus Support:** https://help.manus.im

---

**Last Updated:** December 3, 2025  
**Maintained By:** Bryan Pavlovic (LibertyThroughTruth)
