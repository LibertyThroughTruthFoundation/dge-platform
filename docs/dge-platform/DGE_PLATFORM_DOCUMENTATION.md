# DGE Platform Documentation

**Divine Gospel Economy - Technical & Content Documentation**

---

## **Project Overview**

The DGE (Divine Gospel Economy) platform is a full-stack web application that teaches covenant economics through ancient wisdom, rewards users with tokens for learning, and connects them to a marketplace (GodManMarkets) for purchasing resources.

**Live URL:** [To be bound to LibertyThroughTruthFoundation.pls]  
**GitHub:** https://github.com/LibertyThroughTruthFoundation/dge-platform  
**Tech Stack:** React 19, Tailwind 4, Express 4, tRPC 11, Drizzle ORM, MySQL/TiDB

---

## **Core Features**

### **1. Bible Reader**
- **Content:** 1 Enoch chapters 60-61
- **Token Reward:** 1 token per minute of reading
- **Tracking:** Reading progress saved per user
- **Future:** Expand to full 1 Enoch + other Ethiopian Canon texts

**Implementation:**
- `/client/src/pages/BibleReader.tsx` - UI component
- `/server/routers.ts` - `bible.getChapters` procedure
- `/server/data/bible-chapters.ts` - Chapter content
- `/server/db.ts` - `recordReadingActivity` function

### **2. Module 7: Leadership in the Unfolding**
- **Content:** 4 sub-modules on rest, flexibility, and kingdom stewardship
- **Scholarly Footnotes:** Citations from Heiser, Beale, Wright, Brueggemann, Heschel, Keller, etc.
- **Token Reward:** 15 tokens per sub-module completion
- **Hyperlinked Footnotes:** Link directly to GodManMarkets product pages

**Sub-Modules:**
1. Fixed Foundation, Flexible Form
2. Rest as an Act of Authority
3. The Fourfold Kingdom Organism
4. Piloting the Permanent

**Implementation:**
- `/client/src/pages/Module7.tsx` - Main page
- `/client/src/pages/SubModule.tsx` - Individual sub-module view
- `/server/routers.ts` - `module.getModule`, `module.getSubModule` procedures
- `/server/data/module7.ts` - All content with footnotes
- `/server/db.ts` - `recordModuleCompletion` function

### **3. Covenant Economics Lexicon**
- **Content:** 15 essential terms (Angel Ledgers, Covenant Economics, Divine Council, etc.)
- **Scholarly Citations:** Each term includes biblical references and academic sources
- **"Building Upon" Framing:** Original contributions properly contextualized

**Implementation:**
- `/client/src/pages/Lexicon.tsx` - Main page
- `/client/src/pages/LexiconTerm.tsx` - Individual term view
- `/server/routers.ts` - `lexicon.getTerms`, `lexicon.getTerm` procedures
- `/server/data/lexicon.ts` - All 15 terms
- `/server/db.ts` - `seedLexiconTerms` function (upserts on server start)

### **4. Key Scholars**
- **Content:** 15 scholars whose work supports the DGE framework
- **Info:** Biographical details, key works, relevance to DGE
- **Purpose:** Academic grounding and transparency

**Scholars Included:**
- Michael Heiser (*The Unseen Realm*)
- G.K. Beale (*The Temple and the Church's Mission*)
- N.T. Wright (*Surprised by Hope*)
- Walter Brueggemann (*Sabbath as Resistance*)
- Abraham Joshua Heschel (*The Sabbath*)
- Timothy Keller (*Every Good Endeavor*)
- And 9 more...

**Implementation:**
- `/client/src/pages/Scholars.tsx` - Main page
- Content is hardcoded in the component (no database)

### **5. GodManMarkets**
- **Content:** 20 book products (all from Module 7 and Lexicon footnotes)
- **Status:** "Coming Soon" - ready for affiliate links
- **Vision:** Covenant commerce where truth creates demand for tools
- **Future:** Vendor onboarding, product categories, checkout system

**Implementation:**
- `/client/src/pages/GodManMarkets.tsx` - Main page
- `/server/data/godmanmarkets-products.ts` - Product catalog
- Products are currently hardcoded (no database yet)

### **6. Token System**
- **Earning:** Users earn tokens for reading Bible chapters and completing modules
- **Display:** Token balance shown on Dashboard
- **History:** Recent activity log with token amounts
- **Future:** Token redemption (discounts, premium content, etc.)

**Implementation:**
- `/server/routers.ts` - `tokens.getBalance`, `tokens.getHistory` procedures
- `/server/db.ts` - `awardTokens`, `getTokenBalance`, `getTokenHistory` functions
- `/drizzle/schema.ts` - `tokens` table

### **7. User Authentication**
- **Provider:** Manus OAuth (built-in)
- **Flow:** Click "Get Started" → Manus login → Redirect back to Dashboard
- **Session:** JWT cookie managed by Manus
- **User Data:** Name, email, open_id stored in database

**Implementation:**
- `/server/_core/auth.ts` - OAuth flow
- `/server/_core/context.ts` - User context for tRPC
- `/server/routers.ts` - `auth.me`, `auth.logout` procedures
- `/client/src/hooks/useAuth.ts` - React hook for auth state

### **8. Exodus Messaging**
- **Purpose:** Subtle, Spirit-led call to "come out of Babylon"
- **Locations:** Home page, Dashboard, GodManMarkets, Module 7
- **Tone:** Gentle whisper, not loud alarm
- **Framing:** "Prophetic shout translated into shepherd's invitation"

**Messages:**
- **Home:** "The call is going out: Come out of Babylon and build in the Kingdom"
- **Dashboard:** "You're not just learning—you're preparing to leave Babylon and build in the Kingdom"
- **GodManMarkets:** "The Exodus is beginning... bring your economic life into alignment"
- **Module 7:** "This is not just theology—this is preparation for the Exodus"

---

## **Database Schema**

### **Tables:**

**users**
- `id` (primary key)
- `open_id` (Manus OAuth ID)
- `name`
- `email`
- `role` (admin | user)
- `created_at`

**tokens**
- `id` (primary key)
- `user_id` (foreign key)
- `amount`
- `reason` (e.g., "Reading enoch-60")
- `created_at`

**lexicon_terms**
- `id` (primary key)
- `slug` (unique)
- `term`
- `category`
- `definition` (long text with markdown)
- `created_at`
- `updated_at`

**reading_progress**
- `id` (primary key)
- `user_id` (foreign key)
- `chapter_id`
- `completed` (boolean)
- `created_at`

**module_progress**
- `id` (primary key)
- `user_id` (foreign key)
- `module_id`
- `sub_module_id`
- `completed` (boolean)
- `created_at`

---

## **Content Structure**

### **Module 7 Content Format**

```typescript
{
  id: "module-7",
  title: "Module 7: Leadership in the Unfolding",
  subtitle: "Rest, Flexibility, and Kingdom Stewardship",
  description: "...",
  subModules: [
    {
      id: "fixed-foundation-flexible-form",
      title: "Sub-module 1: Fixed Foundation, Flexible Form",
      content: `
        # Main Content (Markdown)
        
        ...paragraphs with inline footnote references[^1]...
        
        ## Footnotes
        
        [^1]: Citation text with [hyperlink to GodManMarkets](/godmanmarkets#product-id)
      `,
      tokenReward: 15
    },
    // ... 3 more sub-modules
  ]
}
```

### **Lexicon Term Format**

```typescript
{
  slug: "angel-ledgers",
  term: "Angel Ledgers",
  category: "Covenant Economics",
  definition: `
    # Definition (Markdown)
    
    ...paragraphs with scholarly citations...
    
    **Building upon** the biblical teaching of angelic record-keeping...
    
    ## Biblical Foundation
    - Malachi 3:16
    - Revelation 20:12
    
    ## Scholarly Support
    - Michael Heiser, *The Unseen Realm*
  `
}
```

### **GodManMarkets Product Format**

```typescript
{
  id: "unseen-realm-heiser",
  title: "The Unseen Realm",
  author: "Michael S. Heiser",
  category: "book",
  description: "...",
  price: 19.99,
  inStock: false,  // Change to true when affiliate link added
  purchaseUrl: "", // Add Amazon affiliate link here
  relevance: "Foundational for understanding Divine Council theology"
}
```

---

## **Testing**

### **Run All Tests**
```bash
cd /home/ubuntu/dge-platform
pnpm test
```

### **Test Coverage**

**File:** `/server/dge.test.ts`

**Tests:**
1. Module 7 retrieval
2. Module 7 footnotes present
3. Module 7 "Building upon" framing
4. Sub-module retrieval
5. Sub-module footnotes
6. Lexicon term retrieval
7. Lexicon citations present
8. Lexicon scholar names present
9. Token balance retrieval
10. Token history retrieval
11. Reading progress tracking
12. Module completion tracking
13. User creation
14. Auth flow

**Expected:** 14/14 passing

---

## **Deployment**

### **Development**
```bash
cd /home/ubuntu/dge-platform
pnpm install
pnpm run dev
```

**Dev Server:** http://localhost:3000

### **Production**

**Via Manus:**
1. Make changes
2. Test locally
3. Commit to git
4. Push to GitHub
5. Save checkpoint (`webdev_save_checkpoint`)
6. Click "Publish" in Manus UI

**Manual (if needed):**
```bash
cd /home/ubuntu/dge-platform
pnpm run build
pnpm run start
```

---

## **Environment Variables**

**Pre-configured by Manus:**
- `DATABASE_URL` - MySQL/TiDB connection
- `JWT_SECRET` - Session signing
- `VITE_APP_ID` - Manus OAuth app ID
- `OAUTH_SERVER_URL` - Manus OAuth backend
- `VITE_OAUTH_PORTAL_URL` - Manus login portal
- `OWNER_OPEN_ID`, `OWNER_NAME` - Owner info
- `VITE_APP_TITLE` - "Divine Gospel Economy"
- `VITE_APP_LOGO` - Favicon URL
- `BUILT_IN_FORGE_API_URL` - Manus APIs
- `BUILT_IN_FORGE_API_KEY` - API key (server-side)
- `VITE_FRONTEND_FORGE_API_KEY` - API key (frontend)

**Do not edit these directly.** They are managed by Manus.

---

## **API Integrations**

### **Gemini API (via MCP)**
- **Connected:** Yes (through nationos-n8n MCP server)
- **Use for:** Bulk content generation, module creation
- **How to use:** `manus-mcp-cli tool call --server nationos-n8n --input '{...}'`

### **Built-in Manus APIs**
- **LLM:** `invokeLLM()` in `/server/_core/llm.ts`
- **Storage:** `storagePut()`, `storageGet()` in `/server/storage.ts`
- **Notifications:** `notifyOwner()` in `/server/_core/notification.ts`
- **Voice Transcription:** `transcribeAudio()` in `/server/_core/voiceTranscription.ts`
- **Image Generation:** `generateImage()` in `/server/_core/imageGeneration.ts`

---

## **Future Enhancements**

### **Priority 1: GodManMarkets Activation**
1. Add Amazon affiliate links to all 20 products
2. Create vendor onboarding form
3. Build product approval workflow
4. Launch vendor program

### **Priority 2: Modules 1-6**
1. Define module topics
2. Use Gemini API for content generation
3. Add scholarly footnotes
4. Test and deploy

### **Priority 3: Bible Reader Expansion**
1. Add full 1 Enoch (108 chapters)
2. Add Jubilees, 2 Enoch, etc.
3. Create reading plans
4. Add commentary/study notes

### **Priority 4: Token Redemption**
1. Design redemption UI
2. Create redemption procedures
3. Integrate with GodManMarkets
4. Launch redemption system

### **Priority 5: NationOS Website**
1. Create new Manus project
2. Design landing page
3. Add Tabernacle Blueprint visualization
4. Link to DGE platform
5. Deploy to NationOS.pls

---

## **Troubleshooting**

### **Common Issues**

**Issue:** Dev server won't start  
**Solution:** `pnpm install && pnpm run dev`

**Issue:** Tests failing  
**Solution:** `pnpm test --verbose` to see detailed errors

**Issue:** Database out of sync  
**Solution:** `pnpm db:push` to re-sync schema

**Issue:** Hot reload not working  
**Solution:** Restart dev server

**Issue:** Exodus messaging not showing  
**Solution:** Clear browser cache, check published version vs. dev version

---

## **Contact & Support**

**Manus Support:** https://help.manus.im  
**GitHub Issues:** https://github.com/LibertyThroughTruthFoundation/dge-platform/issues

---

**END OF DOCUMENTATION**
