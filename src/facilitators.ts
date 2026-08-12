import { facilitatorSocials, type FacilitatorSocialLinks } from './config'

export interface FacilitatorSection {
  title: string
  body: string
  points?: string[]
}

export interface Facilitator {
  id: string
  name: string
  initials: string
  role: string
  bio: string
  socials: FacilitatorSocialLinks
  sections: FacilitatorSection[]
}

export const FACILITATORS: Facilitator[] = [
  {
    id: 'simon',
    name: 'Simon Shedrach',
    initials: 'SS',
    role: 'Lead Mentor · Price Action',
    bio: 'Leads the mentorship program and breaks down market structure so beginners grasp price action fast.',
    socials: facilitatorSocials('VITE_TEAM_SIMON'),
    sections: [
      {
        title: 'Who he is',
        body: 'Simon is the lead mentor at EnexTrade Global Markets and the head of the Price Action desk. With years of hands-on experience across forex and indices, he has mentored hundreds of traders — from complete beginners to those preparing for funded-account challenges.',
        points: ['Lead facilitator of the mentorship program', 'Specialist in raw price action and market structure'],
      },
      {
        title: 'What he does',
        body: 'Simon designs the mentorship curriculum, runs live charting sessions, and personally reviews student trades. He focuses on teaching structure-based trading — support and resistance, liquidity, and market phases — so students stop guessing and start reading the chart.',
        points: ['Live market-structure breakdowns', 'Weekly chart reviews with actionable feedback'],
      },
      {
        title: 'Who he is best for',
        body: 'If you are new and find candlesticks intimidating, or if you trade by signals but cannot read a chart yet, Simon will give you a repeatable framework. His sessions suit beginners building their foundation and traders who want cleaner entries on their own.',
        points: ['Beginners going from zero to first strategy', 'Traders who want to understand the why behind entries'],
      },
    ],
  },
  {
    id: 'gloria',
    name: 'Gloria Jonah',
    initials: 'GJ',
    role: 'Mentor · Risk & Psychology',
    bio: 'Trains traders in discipline, position sizing, and emotional control under pressure.',
    socials: facilitatorSocials('VITE_TEAM_GLORIA'),
    sections: [
      {
        title: 'Who she is',
        body: 'Gloria is the risk and trading-psychology mentor at EnexTrade. She works with traders on the invisible side of performance — discipline, position sizing, and the emotional habits that decide whether a good strategy survives the drawdown.',
        points: ['Lead on risk and trading psychology', 'Background in disciplined risk frameworks'],
      },
      {
        title: 'What she does',
        body: 'Gloria runs risk bootcamps, reviews every plan through a risk-first lens, and coaches traders through losing streaks and overtrading. Her sessions cover position sizing, drawdown limits, and the routines that keep you consistent when the market moves against you.',
        points: ['Position sizing and drawdown planning', 'One-on-one psychology coaching under pressure'],
      },
      {
        title: 'Who she is best for',
        body: 'Traders who win sometimes but give it back, or who struggle to follow their own rules, will benefit most. Gloria is ideal for anyone with a strategy that technically works but needs discipline and risk structure to become profitable.',
        points: ['Traders battling overtrading and revenge trading', 'Anyone who wants their edge to survive drawdowns'],
      },
    ],
  },
  {
    id: 'sonia',
    name: 'Sonia Ali',
    initials: 'SA',
    role: 'Signal Analyst · Swing',
    bio: 'Curates the signal room, reviewing every setup against strict entry, SL, and TP rules.',
    socials: facilitatorSocials('VITE_TEAM_SONIA'),
    sections: [
      {
        title: 'Who she is',
        body: 'Sonia is the signal analyst for the EnexTrade Signal Room, specialising in swing trading on major pairs. She reviews every setup against a strict rulebook before it ever reaches the channel, so members follow quality entries rather than noise.',
        points: ['Curator of the premium signal room', 'Swing-trade specialist across major pairs'],
      },
      {
        title: 'What she does',
        body: 'Sonia scans the markets daily, filters candidates, and publishes clear signals with entry, stop-loss, and take-profit on each call. She also posts market commentary and holds weekly reviews explaining the reasoning behind each signal.',
        points: ['Daily curated swing setups', 'Clear entry, SL, and TP on every call'],
      },
      {
        title: 'Who she is best for',
        body: 'Sonia suits traders who prefer a slower, more deliberate style and members who want to follow high-quality signals while learning the reasoning behind them. Perfect if you lack time to sit on charts all day.',
        points: ['Busy traders who want curated setups', 'Members learning swing-trade reasoning'],
      },
    ],
  },
  {
    id: 'daniel',
    name: 'Daniel David',
    initials: 'DD',
    role: 'Mentor · Prop & Scaling',
    bio: 'Guides advanced traders through funded-account challenges and account scaling.',
    socials: facilitatorSocials('VITE_TEAM_DANIEL'),
    sections: [
      {
        title: 'Who he is',
        body: 'Daniel is the prop-trading mentor at EnexTrade, guiding advanced traders through funded-account challenges and the discipline needed to scale a small account into serious capital.',
        points: ['Lead on prop challenges and scaling', 'Advanced strategy and account management'],
      },
      {
        title: 'What he does',
        body: 'Daniel breaks down prop-firm rules, builds evaluation plans, and coaches traders through the psychology of trading other people’s capital. His work covers advanced strategy, journaling, and the risk rules that pass challenges and keep accounts funded.',
        points: ['Prop-firm evaluation planning', 'Advanced scaling and risk rules'],
      },
      {
        title: 'Who he is best for',
        body: 'Daniel is for experienced traders who have a working strategy and want to go further — passing funded challenges, managing a larger book, or moving from part-time consistency to serious scaling.',
        points: ['Traders preparing for funded-account evaluations', 'Consistent traders ready to scale'],
      },
    ],
  },
]

export function findFacilitator(id: string): Facilitator | undefined {
  return FACILITATORS.find((f) => f.id === id)
}
