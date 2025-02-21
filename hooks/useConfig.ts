import { useMemo } from 'react';
import { IconName } from '@/components/IconSvg';
import { DISCORD_URL, GITHUB_URL, MEDIUM_URL, TWITTER_URL } from '@/constants';

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
            path: ''
          },
          {
            name: 'Developer Airdrop',
            path: ''
          }
        ]
      },
      {
        name: 'BRIDGE',
        path: '/bridge'
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
