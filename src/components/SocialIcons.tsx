import { SocialPlatform } from '../types/profile';

interface SocialIconProps {
  platform: SocialPlatform;
}

export function SocialIcon({ platform }: SocialIconProps) {
  switch (platform) {
    case 'tiktok':
      return (
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full rounded-full"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="20" fill="#000000" />
          <path
            d="M27.3 15.8a5.4 5.4 0 0 1-3.3-1.1v5.9a5.8 5.8 0 1 1-5-5.7v3a2.9 2.9 0 1 0 2 2.7V9.8h3a5.4 5.4 0 0 0 3.3 3.4v2.6Z"
            fill="#25F4EE"
            transform="translate(-0.7, -0.5)"
          />
          <path
            d="M27.3 15.8a5.4 5.4 0 0 1-3.3-1.1v5.9a5.8 5.8 0 1 1-5-5.7v3a2.9 2.9 0 1 0 2 2.7V9.8h3a5.4 5.4 0 0 0 3.3 3.4v2.6Z"
            fill="#FE2C55"
            transform="translate(0.7, 0.5)"
          />
          <path
            d="M27.3 15.8a5.4 5.4 0 0 1-3.3-1.1v5.9a5.8 5.8 0 1 1-5-5.7v3a2.9 2.9 0 1 0 2 2.7V9.8h3a5.4 5.4 0 0 0 3.3 3.4v2.6Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'instagram':
      return (
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full rounded-full"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="ig-grad" cx="30%" cy="107%" r="150%">
              <stop offset="0%" stopColor="#fdf497" />
              <stop offset="5%" stopColor="#fdf497" />
              <stop offset="45%" stopColor="#fd5949" />
              <stop offset="60%" stopColor="#d6249f" />
              <stop offset="90%" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <circle cx="20" cy="20" r="20" fill="url(#ig-grad)" />
          <rect
            x="11.2"
            y="11.2"
            width="17.6"
            height="17.6"
            rx="5.2"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle
            cx="20"
            cy="20"
            r="4.1"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <circle cx="25.3" cy="14.7" r="1.25" fill="#FFFFFF" />
        </svg>
      );
    case 'facebook':
      return (
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full rounded-full"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="20" fill="#1877F2" />
          <path
            d="M25.4 20.9 26 16.9h-3.8v-2.6c0-1.1.5-2.2 2.3-2.2H26.3V8.7s-1.6-.3-3.1-.3c-3.2 0-5.3 1.9-5.3 5.5v3h-3.5v4h3.5V31h4.3V20.9h3.2Z"
            fill="#FFFFFF"
          />
        </svg>
      );
    case 'whatsapp':
      return (
        <svg
          viewBox="0 0 40 40"
          className="w-full h-full rounded-full"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="20" fill="#25D366" />
          <path
            d="M20.1 10.2a9.7 9.7 0 0 0-8.3 14.7l-1.1 4.1 4.2-1.1a9.7 9.7 0 1 0 5.2-17.7Zm0 17.8a8 8 0 0 1-4.1-1.1l-.3-.2-2.5.6.7-2.4-.2-.3a8.1 8.1 0 1 1 6.4 3.4Zm4.4-6c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-2-1.2 7.4 7.4 0 0 1-1.4-1.7c-.1-.2 0-.4.1-.5l.4-.5.2-.5c.1-.2 0-.3 0-.4l-.7-1.7c-.2-.4-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 2.9 2.9 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.5.6.2 1.2.2 1.6.1.5-.1 1.4-.6 1.6-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3Z"
            fill="#FFFFFF"
          />
        </svg>
      );
  }
}
