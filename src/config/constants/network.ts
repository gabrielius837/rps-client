export const chainIdsArr = [ 56, 97, 31337 ] as const;
export type ChainId = typeof chainIdsArr[number];

const parseChainId = () => {
    return parseInt((process.env.REACT_APP_CHAIN_ID ?? '31337') as string, 10) as ChainId;
}

export const CHAIN_ID: ChainId = parseChainId();

interface NetworkConfig {
    http: string;
    ws: string;
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string;
        decimals: number;
    }
    explorerUrl: string;
}

type NetworkConfigMap = {
    [key in ChainId]: NetworkConfig;
}

const networkConfigMap: NetworkConfigMap = {
    56: {
        http: 'https://bsc-dataseed.binance.org/',
        ws: 'wss://bsc-ws-node.nariox.org:443/',
        chainName: 'Binance Smart Chain',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        explorerUrl: 'https://bscscan.com/'
    },
    97: {
        http: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        ws: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        chainName: 'Binance Smart Chain Testnet',
        nativeCurrency: {
            name: 'BNB',
            symbol: 'BNB',
            decimals: 18,
        },
        explorerUrl: 'https://testnet.bscscan.com/'
    },
    31337: {
        http: 'http://localhost:8545/',
        ws: 'ws://localhost:8545/',
        chainName: 'Localhost 8545',
        nativeCurrency: {
            name: 'Ether',
            symbol: 'ETH',
            decimals: 18,
        },
        explorerUrl: ''
    }
}

export default networkConfigMap[CHAIN_ID];
