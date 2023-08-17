import { Tx } from 'background/service/openapi';
import axios from 'axios';

const TokenStandardType = {
  ERC20: 'ERC20',
  ERC721: 'ERC721',
  NativeCurrency: 'NATIVE',
};

const TokenType = {
  Fungible: 'fungible',
  NonFungible: 'nonFungible',
  Native: 'native',
};

// https://docs.tenderly.co/supported-networks-and-languages
export const TenderlyNetwork: Record<
  number,
  { name: string; image: string }
> = {
  1: {
    name: 'Mainnet',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/mainnet-square.png',
  },
  5: {
    name: 'Görli',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/goerli-square.png',
  },
  10: {
    name: 'Optimistic Ethereum',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/optimism-square.png',
  },
  56: {
    name: 'Binance',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/bsc-square.png',
  },
  137: {
    name: 'Polygon',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/polygon-square.png',
  },
  42161: {
    name: 'Arbitrum One',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/arbitrum-square.png',
  },
  43114: {
    name: 'Avalanche',
    image:
      'https://storage.googleapis.com/tenderly-public-assets/networks/c-chain-square.png',
  },

  // TODO: Do the same for the other networks
  // MAINNET = 1,
  // GOERLI = 5,
  // OPTIMISTIC = 10,
  // CRONOS = 25,
  // RSK = 30,
  // RSK_TESTNET = 31,
  // KOVAN = 42,
  // BINANCE = 56,
  // OPTIMISTIC_KOVAN = 69,
  // RIALTO_BINANCE = 97,
  // POA = 99,
  // GNOSIS_CHAIN = 100,
  // POLYGON = 137,
  // FANTOM = 250,
  // BOBA_ETHEREUM = 288,
  // CRONOS_TESTNET = 338,
  // OPTIMISTIC_GOERLI = 420,
  // MOONBEAM = 1284,
  // MOONRIVER = 1285,
  // BOBA_MOONBEAM = 1294,
  // BOBA_MOONBASE = 1297,
  // BOBA_GOERLI = 2888,
  // FANTOM_TESTNET = 4002,
  // BOBA_AVALANCHE_FUJI = 4328,
  // BASE = 8453,
  // BOBA_BINANCE_RIALTO = 9728,
  // ARBITRUM_ONE = 42161,
  // AVALANCHE_FUJI = 43113,
  // AVALANCHE = 43114,
  // BOBA_AVALANCHE = 43288,
  // BOBA_BINANCE = 56288,
  // POLYGON_MUMBAI = 80001,
  // BASE_GOERLI = 84531,
  // ARBITRUM_GOERLI = 421613,
  // SEPOLIA = 11155111,
};

export const simulateTransaction = async (
  tx: Tx
): Promise<Record<string, any> | null> => {
  const TENDERLY_ACCOUNT = process.env.TENDERLY_ACCOUNT;
  const TENDERLY_PROJECT_ID = process.env.TENDERLY_PROJECT_ID;
  const TENDERLY_ACCESS_TOKEN = process.env.TENDERLY_ACCESS_TOKEN;

  if (!TENDERLY_ACCOUNT || !TENDERLY_PROJECT_ID || !TENDERLY_ACCESS_TOKEN) {
    throw new Error('Tenderly credentials are not set up correctly.');
  }

  const txPayload: any = {
    ...tx,
    save: true,
    save_if_fails: true,
    simulation_type: 'full',
    source: 'rabby-wallet',
    network_id: tx.chainId.toString(),
    gas: parseInt(tx.gas as string, 16) || null,
    gas_price: parseInt(tx.gasPrice as string, 16) || null,
    value: parseInt(tx.value, 16) || null,
    input: tx.data,
  };

  try {
    const simulationResponse = await axios.post(
      `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT_ID}/simulate`,
      txPayload,
      {
        headers: {
          'Content-Type': 'application/json',
          'X-Access-Key': TENDERLY_ACCESS_TOKEN as string,
        },
      }
    );

    // Make the simulation publicly accessible
    if (simulationResponse?.data?.simulation?.id) {
      await axios.post(
        `https://api.tenderly.co/api/v1/account/${TENDERLY_ACCOUNT}/project/${TENDERLY_PROJECT_ID}/simulations/${simulationResponse.data.simulation.id}/share`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            'X-Access-Key': TENDERLY_ACCESS_TOKEN as string,
          },
        }
      );
    }

    return simulationResponse?.data;
  } catch (e) {
    console.error({ e });
    return null;
  }
};

export const buildTokenInfo = (response: Record<string, any>) => {
  const {
    contract_address,
    decimals,
    dollar_value,
    logo,
    name,
    standard,
    symbol,
    type,
  } = response;

  return {
    contractAddress: contract_address,
    name,
    logo,
    symbol,
    decimals,
    dollarValue: dollar_value,
    type: TokenType[type],
    standard: TokenStandardType[standard],
  };
};

export const buildAssetChangeFromResponse = (response: Record<string, any>) => {
  const {
    amount,
    dollar_value,
    from,
    raw_amount,
    to,
    type,
    token_info,
    token_id,
  } = response;

  return {
    from,
    to,
    amount,
    rawAmount: raw_amount,
    dollarValue: dollar_value,
    type,
    tokenId: token_id,
    tokenInfo: buildTokenInfo(token_info),
  };
};

export const formatToLocaleString = (
  value: string,
  minimumFractionDigits = 1,
  maximumFractionDigits = 18
) => {
  return (+value).toLocaleString(void 0, {
    minimumFractionDigits,
    maximumFractionDigits,
  });
};

export function generateShortAddress(
  address: string,
  leftOffset = 6,
  rightOffset = 4
) {
  return `${address.slice(0, leftOffset)}...${address.slice(
    address.length - rightOffset
  )}`;
}
