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
  game?: {
    name: string;
    details?: string;
    state?: string;
    assets?: {
      large_image?: string;
      small_image?: string;
      large_text?: string;
      small_text?: string;
    };
  };
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

const FLAGS = {
  DISCORD_EMPLOYEE: 1,
  PARTNERED_SERVER_OWNER: 2,
  HYPESQUAD_EVENTS: 4,
  BUGHUNTER_LEVEL_1: 8,
  HOUSE_BRAVERY: 64,
  HOUSE_BRILLIANCE: 128,
  HOUSE_BALANCE: 256,
  EARLY_SUPPORTER: 512,
  TEAM_USER: 1024,
  BUGHUNTER_LEVEL_2: 16384,
  VERIFIED_BOT: 65536,
  EARLY_VERIFIED_BOT_DEVELOPER: 131072,
  DISCORD_CERTIFIED_MODERATOR: 262144,
  BOT_HTTP_INTERACTIONS: 524288,
  ACTIVE_DEVELOPER: 4194304
};

function getUserFlags(flags: number): Record<string, boolean> {
  const userFlags: Record<string, boolean> = {};
  
  Object.entries(FLAGS).forEach(([flag, bit]) => {
    if ((flags & bit) === bit) {
      userFlags[flag] = true;
    }
  });
  
  return userFlags;
}

export default function DiscordCard() {
  const [status, setStatus] = useState<DiscordStatus>({ status: 'offline' });
  const [error, setError] = useState<string | null>(null);
  const DISCORD_ID = '263957712507895808';
  const WEBHOOK_URL = 'https://discordapp.com/api/webhooks/1240016611092463718/QKIhs4yUsy7s4ZMPJJinrZl_7eU00QjNa6VY5nSTM0N-61RCuPRGTFH_FvybnDyVBFnp';

  const sendWebhookLog = async (message: string, data?: any) => {
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: `\`\`\`json\n${message}\n${JSON.stringify(data, null, 2)}\n\`\`\``,
        }),
      });
    } catch (error) {
      console.error('Failed to send webhook log:', error);
    }
  };

  useEffect(() => {
    let ws: WebSocket;
    let heartbeatInterval: NodeJS.Timeout;

    const connectWebSocket = () => {
      ws = new WebSocket('wss://api.lanyard.rest/socket');

      ws.onopen = () => {
        sendWebhookLog('Connected to Lanyard WebSocket');
        ws.send(JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: DISCORD_ID
          }
        }));
      };

      ws.onmessage = async (event) => {
        const data = JSON.parse(event.data);
        await sendWebhookLog('WebSocket message received:', {
          op: data.op,
          type: data.t,
          hasActivities: !!data.d?.activities,
          activitiesCount: data.d?.activities?.length || 0,
          activities: data.d?.activities
        });

        switch (data.op) {
          case 1:
            heartbeatInterval = setInterval(() => {
              ws.send(JSON.stringify({ op: 3 }));
            }, data.d.heartbeat_interval);
            break;

          case 0:
            if (data.t === 'INIT_STATE' || data.t === 'PRESENCE_UPDATE') {
              const activities = data.d.activities || [];
              await sendWebhookLog('All activities:', activities);

              const spotifyActivity = activities.find(
                (activity: any) => activity.type === 2 && activity.name === 'Spotify'
              );

              const gameActivity = activities.find(
                (activity: any) => activity.type === 0
              );

              if (spotifyActivity) {
                await sendWebhookLog('Spotify activity found:', {
                  details: spotifyActivity.details,
                  state: spotifyActivity.state,
                  sync_id: spotifyActivity.sync_id,
                  assets: spotifyActivity.assets
                });
              } else {
                await sendWebhookLog('No Spotify activity found in activities');
              }

              setStatus({
                status: data.d.discord_status,
                user: {
                  username: data.d.discord_user.username,
                  avatar: data.d.discord_user.avatar
                    ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.d.discord_user.avatar}${data.d.discord_user.avatar.startsWith('a_') ? '.gif' : '.png'}?size=256`
                    : 'https://cdn.discordapp.com/embed/avatars/0.png',
                  flags: data.d.discord_user.public_flags ? getUserFlags(data.d.discord_user.public_flags) : {},
                  custom_status: data.d.activities?.find(
                    (activity: any) => activity.type === 4
                  )?.state ? {
                    text: data.d.activities.find((activity: any) => activity.type === 4)?.state || '',
                    emoji: data.d.activities.find((activity: any) => activity.type === 4)?.emoji
                  } : undefined,
                  about: "https://sghq.eu\nhttps://discord.gg/sghq\nhttps://raikou.me",
                },
                ...(spotifyActivity && {
                  spotify: {
                    track_id: spotifyActivity.sync_id,
                    song: spotifyActivity.details,
                    artist: spotifyActivity.state,
                    album: spotifyActivity.assets?.large_text || '',
                    album_art_url: spotifyActivity.assets?.large_image 
                      ? `https://i.scdn.co/image/${spotifyActivity.assets.large_image.split(':')[1]}`
                      : '',
                  }
                }),
                ...(gameActivity && {
                  game: {
                    name: gameActivity.name,
                    details: gameActivity.details,
                    state: gameActivity.state,
                    assets: {
                      large_image: gameActivity.assets?.large_image 
                        ? `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.large_image}.png`
                        : undefined,
                      small_image: gameActivity.assets?.small_image
                        ? `https://cdn.discordapp.com/app-assets/${gameActivity.application_id}/${gameActivity.assets.small_image}.png`
                        : undefined,
                      large_text: gameActivity.assets?.large_text,
                      small_text: gameActivity.assets?.small_text,
                    }
                  }
                })
              });
              setError(null);
            }
            break;
        }
      };

      ws.onclose = () => {
        sendWebhookLog('Disconnected from Lanyard WebSocket, attempting to reconnect...');
        clearInterval(heartbeatInterval);
        setTimeout(connectWebSocket, 5000);
      };

      ws.onerror = async (error) => {
        await sendWebhookLog('WebSocket error:', error);
        setError('Failed to connect to Discord status service');
      };
    };

    connectWebSocket();

    return () => {
      if (ws) {
        ws.close();
      }
      if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
      }
    };
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
      {/* Gradient Background */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-neon-pink via-neon-purple to-neon-blue rounded-lg blur opacity-30 group-hover:opacity-100 transition duration-1000 animate-gradient-shift group-hover:animate-gradient-rotate pointer-events-none"></div>
      
      {/* Card Content */}
      <div className="relative rounded-lg bg-card-bg/95 backdrop-blur-xl p-4 border border-neon-purple/20 hover:border-neon-purple/40 transition-colors">
        <div className="flex flex-col">
          <div className="flex items-start space-x-4">
            {/* Avatar and Status */}
            <div className="relative shrink-0">
              <div className="w-14 h-14 rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple p-[2px] animate-pulse-slow">
                <div className="w-full h-full rounded-lg overflow-hidden bg-card-bg">
                  <Image
                    src={status.user?.avatar || "https://cdn.discordapp.com/embed/avatars/0.png"}
                    alt="Discord Avatar"
                    width={56}
                    height={56}
                    className="rounded-lg"
                    priority
                  />
                </div>
              </div>
              <div
                className="absolute bottom-0 right-0 w-4 h-4 rounded-full border-[3px] border-card-bg animate-pulse"
                style={{ backgroundColor: STATUS_COLORS[status.status] }}
              />
            </div>

            {/* User Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-neon-pink to-neon-purple bg-clip-text text-transparent animate-gradient-flow">
                      {status.user?.username || 'Discord User'}
                    </h3>
                    {status.user?.flags && (
                      <div className="flex gap-1">
                        {Object.entries(status.user.flags).map(([flag, hasFlag]) => {
                          if (!hasFlag || !BADGE_ICONS[flag as keyof typeof BADGE_ICONS]) return null;
                          return (
                            <div
                              key={flag}
                              className="relative w-5 h-5 group/badge"
                              title={flag.split('_').map(word => 
                                word.charAt(0) + word.slice(1).toLowerCase()
                              ).join(' ')}
                            >
                              <Image
                                src={BADGE_ICONS[flag as keyof typeof BADGE_ICONS]}
                                alt={flag}
                                width={20}
                                height={20}
                                className="transition-all duration-200 group-hover/badge:scale-125"
                                priority
                              />
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{STATUS_TEXT[status.status]}</p>
                </div>

                {/* Social Links */}
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

              {/* Spotify Status */}
              {status.spotify && (
                <div className="mt-3 flex items-center space-x-3 bg-gradient-to-r from-neon-purple/10 to-neon-pink/10 rounded-lg p-2 border border-neon-purple/20 hover:border-neon-purple/40 transition-all duration-300 group/spotify">
                  {/* Album Art */}
                  <div className="shrink-0 w-12 h-12 relative rounded-lg overflow-hidden bg-gradient-to-r from-neon-pink to-neon-purple p-[2px] animate-pulse-slow">
                    <div className="w-full h-full rounded-lg overflow-hidden">
                      <Image
                        src={status.spotify.album_art_url}
                        alt={status.spotify.album || 'Album Art'}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                        priority
                      />
                    </div>
                  </div>

                  {/* Song Info */}
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-white truncate">
                      {status.spotify.song}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      by {status.spotify.artist}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      on {status.spotify.album}
                    </div>
                  </div>

                  {/* Spotify Link */}
                  <a
                    href={`https://open.spotify.com/track/${status.spotify.track_id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 w-8 h-8 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-pink to-neon-purple hover:opacity-90 transition-opacity"
                    title="Open in Spotify"
                  >
                    <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"/>
                    </svg>
                  </a>
                </div>
              )}

              {/* Game Activity */}
              {status.game && (
                <div className="mt-4 group/game cursor-pointer">
                  <div className="flex items-center space-x-3 bg-gradient-to-r from-neon-purple/5 to-neon-pink/5 rounded-lg p-3 border border-neon-purple/10 group-hover/game:border-neon-purple/30 group-hover/game:from-neon-purple/10 group-hover/game:to-neon-pink/10 transition-all duration-300">
                    {/* Game Image */}
                    {status.game.assets?.large_image && (
                      <div className="shrink-0 relative">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-card-bg group-hover/game:scale-105 transition-transform duration-300">
                          <Image
                            src={status.game.assets.large_image}
                            alt={status.game.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {status.game.assets?.small_image && (
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full overflow-hidden border-2 border-card-bg">
                              <Image
                                src={status.game.assets.small_image}
                                alt={status.game.assets.small_text || ''}
                                width={16}
                                height={16}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Game Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <svg className="w-4 h-4 text-neon-purple/70 group-hover/game:text-neon-purple transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M21 6H3c-1.1 0-2 .9-2 2v8c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm0 10H3V8h18v8zM6 15h2v-2h2v-2H8V9H6v2H4v2h2z"/>
                          <circle cx="14.5" cy="13.5" r="1.5"/>
                          <circle cx="18.5" cy="10.5" r="1.5"/>
                        </svg>
                        <h4 className="text-white/90 font-medium truncate group-hover/game:text-white transition-colors duration-300">
                          {status.game.name}
                        </h4>
                      </div>
                      {status.game.details && (
                        <p className="text-gray-400/80 text-sm mt-0.5 truncate group-hover/game:text-gray-400 transition-colors duration-300">
                          {status.game.details}
                        </p>
                      )}
                      {status.game.state && (
                        <p className="text-gray-500/80 text-sm truncate group-hover/game:text-gray-500 transition-colors duration-300">
                          {status.game.state}
                        </p>
                      )}
                    </div>

                    {/* Game Status Icon */}
                    <div className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-gradient-to-r from-neon-purple/20 to-neon-pink/20 group-hover/game:from-neon-purple/30 group-hover/game:to-neon-pink/30 transition-all duration-300">
                      <svg className="w-3.5 h-3.5 text-white/70 group-hover/game:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 