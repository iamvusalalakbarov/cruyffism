export interface Quote {
  id: string
  text: string
  context?: string
  year?: string
  category: string
  featured: boolean
}

export const quotes: Quote[] = [
  {
    id: "1",
    text: "Quality without results is pointless. Results without quality is boring.",
    context: "On his philosophy of football",
    year: "1985",
    category: "Philosophy",
    featured: true,
  },
  {
    id: "2",
    text: "Playing football is very simple, but playing simple football is the hardest thing there is.",
    context: "Discussing tactical approach",
    year: "1978",
    category: "Tactics",
    featured: true,
  },
  {
    id: "3",
    text: "In my teams, the goalkeeper is the first attacker, and the striker the first defender.",
    context: "On Total Football",
    year: "1974",
    category: "Total Football",
    featured: false,
  },
  {
    id: "4",
    text: "Every disadvantage has its advantage.",
    context: "Life philosophy",
    year: "1980",
    category: "Philosophy",
    featured: true,
  },
  {
    id: "5",
    text: "Technique is not being able to juggle a ball 1,000 times. Anyone can do that by practicing. Then you can work in the circus. Technique is passing the ball with one touch, with the right speed, at the right foot of your team mate.",
    context: "On technical skills",
    year: "1990",
    category: "Technique",
    featured: false,
  },
  {
    id: "6",
    text: "Why couldn't you beat a richer club? I've never seen a bag of money score a goal.",
    context: "On competition between clubs",
    year: "1995",
    category: "Philosophy",
    featured: true,
  },
  {
    id: "7",
    text: "I'm not religious. In Spain all 22 players make the sign of the cross before they enter the pitch. If it worked all matches would end in a draw.",
    context: "On superstition",
    year: "1973",
    category: "Philosophy",
    featured: false,
  },
  {
    id: "8",
    text: "There is only one ball, so you need to have it.",
    context: "On possession football",
    year: "1975",
    category: "Tactics",
    featured: false,
  },
  {
    id: "9",
    text: "Players that aren't true leaders but try to be, always bash other players after a mistake. True leaders on the pitch already assume others will make mistakes.",
    context: "On leadership",
    year: "1999",
    category: "Leadership",
    featured: true,
  },
  {
    id: "10",
    text: "Before I make a mistake, I don't make that mistake.",
    context: "On anticipation",
    year: "1982",
    category: "Philosophy",
    featured: false,
  },
]
