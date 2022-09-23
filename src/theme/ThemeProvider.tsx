import { ThemeProvider } from 'styled-components';

import theme from './theme';

interface Props {
    children?: React.ReactNode;
}

const ThemeProviderWrapper: React.FC<Props> = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>
}

export default ThemeProviderWrapper;
