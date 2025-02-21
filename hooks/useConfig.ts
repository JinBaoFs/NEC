import { useMemo } from 'react';
import { IconName } from '@/components/IconSvg';
import {
  DISCORD_URL,
  GITHUB_URL,
  MEDIUM_URL,
  TWITTER_URL,
  DOCS_URL,
  WHITE_PAPER_URL,
  MEDAL_URL
} from '@/constants';

export const useHeaderConfig = () => {
  const list = useMemo(
    () => [
      {
        name: 'HOME',
        path: '/'
      },
      {
        name: 'AIRDROP',
        path: '/airdrop'
      },
      {
        name: 'DEVELOPER',
        children: [
          {
            name: 'Why Boundary?',
            path: '/bcc'
          },
          {
            name: 'Documentation',
            path: DOCS_URL
          },
          {
            name: 'Developer Airdrop',
            path: ''
          },
          {
            name: 'White Paper',
            path: WHITE_PAPER_URL
          }
        ]
      },
      {
        name: 'BRIDGE',
        path: '/bridge'
      },
      {
        name: '创世勋章',
        path: MEDAL_URL
      }
    ],
    []
  );

  return list;
};

export const useFooterConfig = () => {
  const iconList = useMemo<Array<{ link: string; icon: IconName }>>(() => {
    return [
      {
        icon: 'twitter',
        link: TWITTER_URL
      },
      {
        icon: 'medium',
        link: MEDIUM_URL
      },
      {
        icon: 'discord',
        link: DISCORD_URL
      },
      {
        icon: 'github',
        link: GITHUB_URL
      }
    ];
  }, []);

  return {
    iconList
  };
};
