import { GraduationCap, BookOpen, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";

const scholars = [
  {
    name: "Michael Heiser",
    field: "Divine Council Theology, Old Testament Studies",
    keyWork: "The Unseen Realm (Lexham, 2015)",
    relevance: "Divine Council theology, angelic intermediaries, heavenly realms",
    bio: "Biblical scholar specializing in the divine council worldview of the ancient Near East and its implications for biblical theology.",
  },
  {
    name: "G.K. Beale",
    field: "Biblical Theology, Temple Studies",
    keyWork: "The Temple and the Church's Mission (IVP Academic, 2004)",
    relevance: "Temple theology, generational stewardship, sacred space",
    bio: "New Testament scholar known for work on biblical theology, Revelation, and the temple theme throughout Scripture.",
  },
  {
    name: "George Nickelsburg",
    field: "Second Temple Judaism, 1 Enoch Studies",
    keyWork: "1 Enoch 1 (Fortress, 2001)",
    relevance: "1 Enoch dating, Parables section, Enochian theology",
    bio: "Leading expert on Second Temple Jewish literature, particularly the Book of Enoch and its theological significance.",
  },
  {
    name: "Scott Hahn",
    field: "Covenant Theology, Biblical Studies",
    keyWork: "Kinship by Covenant (Yale, 2009)",
    relevance: "Covenant as kinship, biblical economics, relational theology",
    bio: "Catholic theologian and biblical scholar specializing in covenant theology and its implications for ecclesiology and ethics.",
  },
  {
    name: "N.T. Wright",
    field: "New Testament, Historical Jesus, Eschatology",
    keyWork: "Surprised by Hope (HarperOne, 2008)",
    relevance: "Already/not yet eschatology, kingdom theology, resurrection",
    bio: "Anglican bishop and New Testament scholar known for work on Paul, Jesus, and Christian eschatology.",
  },
  {
    name: "Walter Brueggemann",
    field: "Old Testament, Prophetic Literature",
    keyWork: "Sabbath as Resistance (Westminster John Knox, 2014)",
    relevance: "Sabbath theology, rest as resistance, prophetic economics",
    bio: "Old Testament scholar emphasizing the prophetic and social justice dimensions of Scripture.",
  },
  {
    name: "Abraham Joshua Heschel",
    field: "Jewish Philosophy, Theology",
    keyWork: "The Sabbath (FSG, 1951)",
    relevance: "Sabbath as sanctuary in time, rest theology, Jewish spirituality",
    bio: "Jewish theologian and philosopher whose work on the Sabbath has profoundly influenced Christian and Jewish thought.",
  },
  {
    name: "George Eldon Ladd",
    field: "New Testament, Eschatology",
    keyWork: "The Presence of the Future (Eerdmans, 1974)",
    relevance: "Already/not yet framework, kingdom theology, inaugurated eschatology",
    bio: "Evangelical New Testament scholar who developed the influential 'already but not yet' eschatological framework.",
  },
  {
    name: "Meredith Kline",
    field: "Covenant Theology, Old Testament",
    keyWork: "Kingdom Prologue (2000)",
    relevance: "Covenant structure, biblical law, divine measurement",
    bio: "Reformed theologian known for covenant theology and the relationship between creation, covenant, and kingdom.",
  },
  {
    name: "Timothy Keller",
    field: "Practical Theology, Contextualization",
    keyWork: "Center Church (Zondervan, 2012)",
    relevance: "Contextualization, work theology, gospel and culture",
    bio: "Pastor and theologian known for applying Reformed theology to contemporary urban contexts and work-life integration.",
  },
  {
    name: "Howard Snyder",
    field: "Ecclesiology, Missiology",
    keyWork: "The Community of the King (IVP, 1977)",
    relevance: "Church as organism vs. organization, kingdom ecclesiology",
    bio: "Theologian and missiologist emphasizing the church as a living organism rather than institutional structure.",
  },
  {
    name: "Edmund Clowney",
    field: "Ecclesiology, Practical Theology",
    keyWork: "The Church (IVP, 1995)",
    relevance: "Church as organism, diverse functions in unity, ecclesial structures",
    bio: "Reformed theologian and pastor known for biblical ecclesiology and the organic nature of the church.",
  },
  {
    name: "Dallas Willard",
    field: "Spiritual Formation, Philosophy",
    keyWork: "The Divine Conspiracy (HarperOne, 1998)",
    relevance: "Kingdom living, spiritual disciplines, trust and control",
    bio: "Philosopher and spiritual formation teacher emphasizing the practical reality of God's kingdom in everyday life.",
  },
  {
    name: "D.A. Carson",
    field: "New Testament, Biblical Theology",
    keyWork: "The Gagging of God (Zondervan, 1996)",
    relevance: "Absolute truth and cultural application, contextualization",
    bio: "New Testament scholar known for rigorous exegesis and engagement with contemporary theological issues.",
  },
  {
    name: "Marva Dawn",
    field: "Theology, Worship, Sabbath Studies",
    keyWork: "Keeping the Sabbath Wholly (Eerdmans, 1989)",
    relevance: "Sabbath practice, rest as counter-cultural, worship theology",
    bio: "Theologian and educator focusing on worship, Sabbath-keeping, and the church's counter-cultural witness.",
  },
];

export default function Scholars() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="container max-w-6xl py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-10 h-10" />
          </div>
          <h1 className="text-5xl font-bold mb-4">Key Scholars</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The DGE framework builds upon the work of recognized scholars across multiple traditions—Reformed, Anglican, Catholic, Messianic Jewish, and secular biblical studies. These scholars provide the academic foundation for the theological claims presented throughout this platform.
          </p>
        </div>

        {/* Introduction */}
        <Card className="p-8 mb-12 bg-white/50 dark:bg-slate-900/50 backdrop-blur">
          <div className="flex items-start gap-4">
            <BookOpen className="w-6 h-6 mt-1 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold mb-4">Academic Grounding</h2>
              <p className="text-muted-foreground mb-4">
                The Divine Gospel Economy is not built on novel theology or fringe interpretations. Rather, it represents a contemporary synthesis of well-established biblical scholarship. The scholars listed below have been cited throughout Module 7, the Lexicon, and other content to demonstrate that our theological framework stands on solid academic ground.
              </p>
              <p className="text-muted-foreground mb-4">
                Where we propose original applications or frameworks (such as "Angel Ledgers," "Piloting the Permanent," or the "Fourfold Kingdom Organism"), we clearly identify them as contemporary syntheses inspired by biblical principles—not as direct biblical mandates. This transparency strengthens academic credibility rather than weakening it.
              </p>
              <p className="text-muted-foreground">
                The result: any scholarly critic who engages this work must contend not merely with our claims, but with the entire academic tradition upon which we stand.
              </p>
            </div>
          </div>
        </Card>

        {/* Scholars Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {scholars.map((scholar) => (
            <Card key={scholar.name} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-2xl font-bold mb-2">{scholar.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{scholar.field}</p>
              
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-sm mb-1">Key Work:</h4>
                  <p className="text-sm text-muted-foreground italic">{scholar.keyWork}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-1">Relevance to DGE:</h4>
                  <p className="text-sm text-muted-foreground">{scholar.relevance}</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-sm mb-1">Background:</h4>
                  <p className="text-sm text-muted-foreground">{scholar.bio}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Footer Note */}
        <Card className="p-6 mt-12 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-900">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> This list represents the most frequently cited scholars in the DGE content. Additional sources are referenced throughout Module 7 and the Lexicon. For complete bibliographic information, see the footnotes in each sub-module and lexicon term.
          </p>
        </Card>
      </div>
    </div>
  );
}
