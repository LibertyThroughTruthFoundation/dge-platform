/**
 * GodManMarkets Product Catalog
 * 
 * This is the foundation of the GodManMarkets marketplace.
 * Products are organized by category and linked from DGE footnotes.
 */

export interface Product {
  id: string;
  title: string;
  author: string;
  category: "book" | "ebook" | "audiobook" | "course" | "tool";
  description: string;
  price?: number; // USD, undefined = coming soon
  affiliateLink?: string; // Amazon affiliate or direct purchase link
  coverImage?: string;
  inStock: boolean;
}

export const godManMarketsProducts: Product[] = [
  // Divine Council & Old Testament
  {
    id: "heiser-unseen-realm",
    title: "The Unseen Realm",
    author: "Michael Heiser",
    category: "book",
    description: "Recovering the supernatural worldview of the Bible. Essential reading for understanding Divine Council theology and the heavenly realms.",
    inStock: false, // Placeholder - will add affiliate link
  },
  {
    id: "beale-temple-mission",
    title: "The Temple and the Church's Mission",
    author: "G.K. Beale",
    category: "book",
    description: "A biblical theology of the dwelling place of God, tracing the temple theme from Eden to the New Jerusalem.",
    inStock: false,
  },
  {
    id: "nickelsburg-1-enoch",
    title: "1 Enoch 1: A Commentary on the Book of 1 Enoch",
    author: "George Nickelsburg",
    category: "book",
    description: "The definitive scholarly commentary on the Book of Enoch, covering chapters 1-36 and 81-108.",
    inStock: false,
  },
  {
    id: "goldingay-ot-theology-2",
    title: "Old Testament Theology, Vol. 2",
    author: "John Goldingay",
    category: "book",
    description: "Israel's Faith - comprehensive Old Testament theology covering covenant, temple, and generational stewardship.",
    inStock: false,
  },
  
  // Covenant Theology
  {
    id: "hahn-kinship-covenant",
    title: "Kinship by Covenant",
    author: "Scott Hahn",
    category: "book",
    description: "A canonical approach to the fulfillment of God's saving promises. Essential for understanding covenant as kinship.",
    inStock: false,
  },
  {
    id: "kline-kingdom-prologue",
    title: "Kingdom Prologue",
    author: "Meredith Kline",
    category: "book",
    description: "Genesis foundations for a covenantal worldview, exploring creation, covenant, and divine measurement.",
    inStock: false,
  },
  
  // Sabbath & Rest Theology
  {
    id: "heschel-sabbath",
    title: "The Sabbath",
    author: "Abraham Joshua Heschel",
    category: "book",
    description: "A sanctuary in time - the classic work on Sabbath as spiritual practice and resistance to anxiety.",
    inStock: false,
  },
  {
    id: "brueggemann-sabbath-resistance",
    title: "Sabbath as Resistance",
    author: "Walter Brueggemann",
    category: "book",
    description: "Saying no to the culture of now. Sabbath as counter-cultural act of faith and liberation from Pharaoh's economy.",
    inStock: false,
  },
  {
    id: "dawn-keeping-sabbath",
    title: "Keeping the Sabbath Wholly",
    author: "Marva Dawn",
    category: "book",
    description: "Ceasing, resting, embracing, feasting - a comprehensive guide to Sabbath practice in the modern world.",
    inStock: false,
  },
  
  // Kingdom & Eschatology
  {
    id: "wright-surprised-by-hope",
    title: "Surprised by Hope",
    author: "N.T. Wright",
    category: "book",
    description: "Rethinking heaven, the resurrection, and the mission of the church. Essential for 'already but not yet' eschatology.",
    inStock: false,
  },
  {
    id: "ladd-presence-future",
    title: "The Presence of the Future",
    author: "George Eldon Ladd",
    category: "book",
    description: "The eschatology of biblical realism. The classic work on inaugurated eschatology and the kingdom of God.",
    inStock: false,
  },
  
  // Practical Theology & Contextualization
  {
    id: "keller-center-church",
    title: "Center Church",
    author: "Timothy Keller",
    category: "book",
    description: "Doing balanced, gospel-centered ministry in your city. Essential for understanding contextualization and theological vision.",
    inStock: false,
  },
  {
    id: "keller-every-good-endeavor",
    title: "Every Good Endeavor",
    author: "Timothy Keller",
    category: "book",
    description: "Connecting your work to God's work. Biblical theology of work, rest, and vocation.",
    inStock: false,
  },
  {
    id: "carson-gagging-of-god",
    title: "The Gagging of God",
    author: "D.A. Carson",
    category: "book",
    description: "Christianity confronts pluralism. Essential for understanding absolute truth and cultural application.",
    inStock: false,
  },
  {
    id: "willard-divine-conspiracy",
    title: "The Divine Conspiracy",
    author: "Dallas Willard",
    category: "book",
    description: "Rediscovering our hidden life in God. Kingdom living, spiritual disciplines, and releasing control.",
    inStock: false,
  },
  {
    id: "willard-hearing-god",
    title: "Hearing God",
    author: "Dallas Willard",
    category: "book",
    description: "Developing a conversational relationship with God. Obedience often precedes understanding.",
    inStock: false,
  },
  
  // Ecclesiology
  {
    id: "snyder-community-king",
    title: "The Community of the King",
    author: "Howard Snyder",
    category: "book",
    description: "The church as organism vs. institution. Essential for understanding organic kingdom structures.",
    inStock: false,
  },
  {
    id: "clowney-the-church",
    title: "The Church",
    author: "Edmund Clowney",
    category: "book",
    description: "Contours of Christian theology - biblical ecclesiology and the organic nature of the body of Christ.",
    inStock: false,
  },
  {
    id: "hirsch-forgotten-ways",
    title: "The Forgotten Ways",
    author: "Alan Hirsch",
    category: "book",
    description: "Reactivating apostolic movements. Organic, missional church structures vs. institutional rigidity.",
    inStock: false,
  },
  
  // Trust & Spiritual Formation
  {
    id: "bridges-trusting-god",
    title: "Trusting God",
    author: "Jerry Bridges",
    category: "book",
    description: "Even when life hurts. The sovereignty of God as the foundation for trust and releasing control.",
    inStock: false,
  },
];

export type GodManMarketsProduct = typeof godManMarketsProducts[number];
