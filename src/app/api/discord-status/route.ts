import { NextResponse } from 'next/server';

// Replace this ID with your own Discord ID
// To get your ID:
// 1. Enable Developer Mode in Discord (User Settings > App Settings > Advanced > Developer Mode)
// 2. Right-click your profile and click "Copy ID"
const DISCORD_ID = '263957712507895808';
const LANYARD_API = 'https://api.lanyard.rest/v1';

interface LanyardResponse {
  success: boolean;
  data: {
    spotify: {
      track_id: string;
      timestamps: {
        start: number;
        end: number;
      };
      song: string;
      artist: string;
      album_art_url: string;
      album: string;
    } | null;
    listening_to_spotify: boolean;
    discord_user: {
      username: string;
      public_flags: number;
      id: string;
      discriminator: string;
      avatar: string;
      global_name?: string;
    };
    discord_status: 'online' | 'idle' | 'dnd' | 'offline';
    activities: Array<{
      type: number;
      state?: string;
      name: string;
      id: string;
      emoji?: {
        name: string;
        id?: string;
      };
      created_at: number;
    }>;
    active_on_discord_web: boolean;
    active_on_discord_mobile: boolean;
    active_on_discord_desktop: boolean;
  };
}

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

export async function GET() {
  try {
    const response = await fetch(`${LANYARD_API}/users/${DISCORD_ID}`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Discord status');
    }

    const data: LanyardResponse = await response.json();

    if (!data.success) {
      throw new Error('Invalid response from Lanyard API');
    }

    return NextResponse.json({
      status: data.data.discord_status,
      user: {
        username: data.data.discord_user.username,
        avatar: data.data.discord_user.avatar
          ? `https://cdn.discordapp.com/avatars/${DISCORD_ID}/${data.data.discord_user.avatar}${data.data.discord_user.avatar.startsWith('a_') ? '.gif' : '.png'}?size=256`
          : 'https://cdn.discordapp.com/embed/avatars/0.png',
        flags: getUserFlags(data.data.discord_user.public_flags),
        custom_status: data.data.activities.find(
          activity => activity.type === 4
        )?.state ? {
          text: data.data.activities.find(activity => activity.type === 4)?.state || '',
          emoji: data.data.activities.find(activity => activity.type === 4)?.emoji
        } : undefined,
        about: "https://sghq.eu\nhttps://discord.gg/sghq\nhttps://raikou.me",
      },
      ...(data.data.listening_to_spotify && data.data.spotify && {
        spotify: {
          track_id: data.data.spotify.track_id,
          song: data.data.spotify.song,
          artist: data.data.spotify.artist,
          album_art_url: data.data.spotify.album_art_url,
          album: data.data.spotify.album,
        },
      }),
    });

  } catch (error) {
    console.error('Lanyard API Error:', error);
    return NextResponse.json(
      {
        status: 'offline',
        error: error instanceof Error ? error.message : 'Failed to fetch Discord status'
      },
      { status: 500 }
    );
  }
} 