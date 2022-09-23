import { Text } from '../../components/Text';
import { Box, Flex } from '../../components/Box';
import StyledBackground from '../StyledBackground';
import AnimatedLogo from './AnimatedLogo';
import { socials } from '../../components/Menu/config';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <Flex flexDirection='column' alignItems='center' margin='16px'>
            <Box margin='0 0 16px'>
                <Text as='h2' fontSize='28px' bold textAlign='center'>Welcome to Crypto-rps</Text>
            </Box>
            <AnimatedLogo />
            <Box maxHeight='656px' maxWidth='656px' margin='16px 0'>
                <StyledBackground>
                    <Box padding='16px'>
                        <Text as='p' fontSize='18px' lineHeight={1.5}>
                            First of it's kind rock paper scissors game that runs on the blockchain.
                            Game logic is resolved on-chain.
                            Thus no off-chain shenanigans.
                            Simple cryptography ensures that the opposing player cannot cheat by looking at transaction data and playing accordingly.
                            The main focus is the game itself, so there are no assets or tokenomics.
                            Anyone can <Link style={{fontSize: '18px', textDecoration: 'none'}}to='/referral'>earn</Link> by promoting this project.
                        </Text>
                        <Text as='p' fontSize='18px' margin='16px 0' textAlign='center'>
                            Have any questions? Check the links below!
                        </Text>
                        <Flex justifyContent='center'>
                            {socials.map(({icon: Icon, label, href})=> {
                                return (
                                    <Box key={label} margin='4px'>
                                        <a href={href}>
                                            <Icon height='32px' color='#3e4544'/>
                                        </a>
                                    </Box>
                                )
                            })}
                        </Flex>
                    </Box>
                </StyledBackground>
            </Box>
        </Flex>
    );
}

export default Home;
