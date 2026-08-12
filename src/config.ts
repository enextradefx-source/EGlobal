const env = import.meta.env as Record<string, string | undefined>

const read = (key: string, fallback: string): string =>
  env[key]?.trim() || fallback

export type SocialKey =
  | 'telegram'
  | 'tiktok'
  | 'instagram'
  | 'facebook'
  | 'twitter'
  | 'youtube'

export interface SocialLink {
  key: SocialKey
  label: string
  href: string
}

export const HERO_IMAGE = read('VITE_HERO_IMAGE', '/images/hero-bg.png')

export const FOREX_IMAGE = read(
  'VITE_FOREX_IMAGE',
  '/images/pin-forex-background.png',
)

export const GET_STARTED_LINK = read('VITE_GET_STARTED_LINK', '#get-started')

export const LOGIN_LINK = read('VITE_LOGIN_LINK', '#/login')

export const SIGNUP_LINK = read('VITE_SIGNUP_LINK', '#/signup')

export const PAYSTACK_PUBLIC_KEY = read(
  'VITE_PAYSTACK_PUBLIC_KEY',
  'pk_test_xxxxxxxxxxxxxxxxxxxxx',
)

export const TERMS_LINK = read('VITE_TERMS_LINK', '#terms')

export const PRIVACY_LINK = read('VITE_PRIVACY_LINK', '#privacy')

export const CONTACT_LINK = read('VITE_CONTACT_LINK', '#contact')

export const SOCIAL_LINKS: SocialLink[] = [
  {
    key: 'telegram',
    label: 'Telegram',
    href: read('VITE_SOCIAL_TELEGRAM', 'https://t.me/'),
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    href: read('VITE_SOCIAL_TIKTOK', 'https://www.tiktok.com/@'),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    href: read('VITE_SOCIAL_INSTAGRAM', 'https://instagram.com/'),
  },
  {
    key: 'facebook',
    label: 'Facebook',
    href: read('VITE_SOCIAL_FACEBOOK', 'https://facebook.com/'),
  },
  {
    key: 'twitter',
    label: 'Twitter (X)',
    href: read('VITE_SOCIAL_TWITTER', 'https://x.com/'),
  },
  {
    key: 'youtube',
    label: 'YouTube',
    href: read('VITE_SOCIAL_YOUTUBE', 'https://youtube.com/@'),
  },
]

export interface FacilitatorSocialLinks {
  telegram: string
  tiktok: string
  instagram: string
  facebook: string
  twitter: string
}

const SOCIAL_KEYS: (keyof FacilitatorSocialLinks)[] = [
  'telegram',
  'tiktok',
  'instagram',
  'facebook',
  'twitter',
]

export function facilitatorSocials(
  prefix: string,
): FacilitatorSocialLinks {
  const result = {} as FacilitatorSocialLinks
  for (const key of SOCIAL_KEYS) {
    result[key] = read(`${prefix}_${key.toUpperCase()}`, '#')
  }
  return result
}
