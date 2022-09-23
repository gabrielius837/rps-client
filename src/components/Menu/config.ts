import type { MenuItemsType } from '../MenuItems';
import {
    GithubIcon,
    MediumIcon,
    TelegramIcon,
    DiscordIcon,
    TwitterIcon
} from '../Svg'

export const links: MenuItemsType[] = [
    {
        label: 'Play',
        href: '/newgame',
        items: [
            {
                label: 'Create game',
                href: '/newgame'
            },
            {
                label: 'Find game',
                href: '/findgames'
            }
        ]
    },
    {
        label: 'Manage',
        href: '/redeem',
        items: [
            {
                label: 'Referral',
                href: '/referral'
            },
            {
                label: 'Redeem',
                href: '/redeem'
            }
        ]
    }
];

export const socials = [
    {
        label: 'Telegram',
        icon: TelegramIcon,
        href: 'https://t.me/pancakeswap'

    },
    {
        label: 'Discord',
        icon: DiscordIcon,
        href: 'https://discord.gg/GcrkbtWFj9'
    },
    {
        label: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/fruitymike76',
    },
    {
        label: 'Github',
        icon: GithubIcon,
        href: 'https://www.github.com/fruitymike76/'
    },
    {
        label: 'Medium',
        icon: MediumIcon,
        href: 'https://www.medium.com/fuckingarticle'
    }
];

export const MENU_HEIGHT = 56;
export const MENU_ENTRY_HEIGHT = 48;
