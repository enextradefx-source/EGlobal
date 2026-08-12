export interface MentorshipLevel {
  name: string
  price: string
}

export interface MentorshipTrack {
  id: string
  title: string
  track: string
  desc: string
  price?: string
  amount?: number
  levels?: MentorshipLevel[]
}

export const TRACKS: MentorshipTrack[] = [
  {
    id: 'one-on-one',
    title: 'One-on-One',
    track: 'Personal Coaching',
    desc: 'Dedicated private sessions tailored to your pace, goals, and schedule.',
    price: '₦500,000',
    amount: 500000,
  },
  {
    id: '3-month',
    title: '3-Month',
    track: 'Foundations Program',
    desc: 'A structured quarter of live lessons, charting drills, and weekly reviews.',
    price: '₦200,000',
    amount: 200000,
  },
  {
    id: 'community',
    title: 'Community',
    track: 'Trading Circle',
    desc: 'Learn alongside a like-minded cohort with shared analysis and support.',
    levels: [
      { name: 'Standard', price: '₦10,000' },
      { name: 'Free', price: '₦0' },
    ],
  },
  {
    id: '6-month',
    title: '6-Month',
    track: 'Pro Development',
    desc: 'The complete path — advanced strategy, risk mastery, and prop-trading prep.',
    price: '₦500,000',
    amount: 500000,
  },
]

export function findTrack(id: string): MentorshipTrack | undefined {
  return TRACKS.find((t) => t.id === id)
}
