"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface SpotifyData {
  track_id: string;
  song: string;
  artist: string;
  album_art_url: string;
  album: string;
}

interface DiscordStatus {
  status: 'online' | 'idle' | 'dnd' | 'offline';
  user?: {
    username: string;
    avatar: string;
    flags: Record<string, boolean>;
    custom_status?: {
      text: string;
      emoji?: {
        name: string;
        id?: string;
      };
    };
    about?: string;
  };
  spotify?: SpotifyData;
  error?: string;
}

const STATUS_COLORS = {
  online: '#3ba55c',
  idle: '#faa81a',
  dnd: '#ed4245',
  offline: '#747f8d',
};

const STATUS_TEXT = {
  online: 'Online',
  idle: 'Idle',
  dnd: 'Do Not Disturb',
  offline: 'Offline',
};

const SOCIAL_LINKS = [
  {
    name: 'GitHub',
    url: 'https://github.com/devraikou',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/ardagulez',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/ard4gulez',
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
      </svg>
    ),
  },
];

const BADGE_ICONS = {
  DISCORD_EMPLOYEE: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/discordstaff.svg',
  PARTNERED_SERVER_OWNER: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/discordpartner.svg',
  HYPESQUAD_EVENTS: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/hypesquadevents.svg',
  BUGHUNTER_LEVEL_1: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/bughunterlevel1.svg',
  HOUSE_BRAVERY: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/hypesquadbravery.svg',
  HOUSE_BRILLIANCE: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/hypesquadbrilliance.svg',
  HOUSE_BALANCE: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/hypesquadbalance.svg',
  EARLY_SUPPORTER: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/earlysupporter.svg',
  BUGHUNTER_LEVEL_2: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/bughunterlevel2.svg',
  VERIFIED_BOT_DEVELOPER: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/earlyverifiedbotdev.svg',
  ACTIVE_DEVELOPER: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/activedeveloper.svg',
  DISCORD_CERTIFIED_MODERATOR: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/certifiedmod.svg',
  NITRO: 'https://raw.githubusercontent.com/efeeozc/discord-badges/main/svg/nitro.svg'
};

export default function DiscordCard() {
  const [status, setStatus] = useState<DiscordStatus>({ status: 'offline' });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch('/api/discord-status');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (data.error) {
          throw new Error(data.error);
        }
        
        setStatus(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching Discord status:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch status');
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, 30000); // Poll every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000"></div>
        <div className="relative rounded-lg bg-card-bg/95 backdrop-blur-xl p-4 text-red-400">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span>{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Gradient Background with pointer-events-none */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-gradient-shift group-hover:animate-gradient-rotate pointer-events-none"></div>
      
      {/* Card Content with pointer-events-auto */}
      <div className="relative rounded-lg bg-card-bg/95 backdrop-blur-xl p-4">
        <div className="flex flex-col h-[180px]">
          <div className="flex items-start space-x-4">
            {/* Avatar and Status */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-full bg-gradient-to-r from-neon-pink to-neon-purple p-[2px]">
                <div className="w-full h-full rounded-full overflow-hidden bg-card-bg">
                  <Image
                    src={status.user?.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt="Discord Avatar"
                    width={56}
                    height={56}
                    className="rounded-full"
                    priority
                  />
                </div>
              </div>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-[3px] border-card-bg"
                style={{ backgroundColor: STATUS_COLORS[status.status] }}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent">
                    {status.user?.username || 'Discord User'}
                  </h3>
                  <p className="text-sm text-gray-400">{STATUS_TEXT[status.status]}</p>
                </div>

                {/* Social Links moved to top right */}
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-center w-7 h-7 rounded-lg bg-card-bg hover:bg-neon-purple/10 transition-all duration-300 relative z-10"
                      title={link.name}
                    >
                      <span className="text-gray-400 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                        {link.icon}
                      </span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Custom Status */}
              {status.user?.custom_status && (
                <div className="mt-2 flex items-center space-x-2 text-gray-300">
                  {status.user.custom_status.emoji?.id ? (
                    <img
                      src={`https://cdn.discordapp.com/emojis/${status.user.custom_status.emoji.id}.png`}
                      alt={status.user.custom_status.emoji.name}
                      className="w-4 h-4"
                    />
                  ) : status.user.custom_status.emoji?.name && (
                    <span className="text-lg">{status.user.custom_status.emoji.name}</span>
                  )}
                  <span className="text-sm">{status.user.custom_status.text}</span>
                </div>
              )}

              {/* About Me */}
              {status.user?.about && (
                <div className="mt-2 space-y-1 text-sm border-l-2 border-neon-purple/30 pl-3">
                  {status.user.about.split('\n').map((line, index) => {
                    if (line.startsWith('http')) {
                      return (
                      <Link
                        key={index}
                        href={line}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block text-neon-purple hover:text-neon-pink transition-colors duration-300"
                      >
                        {line.replace('https://', '@')}
                      </Link>
                    );
                    }
                    return <p key={index} className="text-gray-400">{line}</p>;
                  })}
                </div>
              )}

              {/* Badges */}
              {status.user?.flags && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {Object.entries(status.user.flags).map(([flag, hasFlag]) => {
                    if (!hasFlag || !BADGE_ICONS[flag as keyof typeof BADGE_ICONS]) return null;
                    return (
                      <div
                        key={flag}
                        className="relative w-6 h-6 group/badge"
                        title={flag.split('_').map(word => 
                          word.charAt(0) + word.slice(1).toLowerCase()
                        ).join(' ')}
                      >
                        <Image
                          src={BADGE_ICONS[flag as keyof typeof BADGE_ICONS]}
                          alt={flag}
                          width={24}
                          height={24}
                          className="transition-all duration-200 group-hover/badge:scale-125"
                          priority
                        />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 