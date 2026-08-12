/// <reference types="vite/client" />

import type { SocialKey } from './config'
import {
  FacebookIcon,
  InstagramIcon,
  TelegramIcon,
  TikTokIcon,
  XIcon,
  YouTubeIcon,
} from './components/icons'

export const SOCIAL_ICONS: Record<SocialKey, JSX.Element> = {
  telegram: <TelegramIcon />,
  tiktok: <TikTokIcon />,
  instagram: <InstagramIcon />,
  facebook: <FacebookIcon />,
  twitter: <XIcon />,
  youtube: <YouTubeIcon />,
}
