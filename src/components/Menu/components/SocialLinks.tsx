import { memo, FC } from 'react';
import { SvgProps } from '../../../components/Svg';
import { Flex } from '../../../components/Box';
import { Link } from '../../../components/Link';
import { socials } from '../config';
import { colors } from '../../../theme';

const SocialLinks: React.FC = () => (
    <Flex>
        {socials.map((social, index) => {
            const Icon: FC<SvgProps> = social.icon;
            const iconProps = {
                width: "20px",
                color: colors.textSubtle,
                style: { cursor: "pointer" },
            };
            const mr = index < socials.length - 1 ? '24px' : 0;
            return (
                <Link external key={social.label} href={social.href} aria-label={social.label} mr={mr}>
                    <Icon {...iconProps} />
                </Link>
            );
        })}
    </Flex>
);

export default memo(SocialLinks, () => true);
