import React from 'react';
import clsx from 'clsx';
import { formatToLocaleString, generateShortAddress } from 'ui/utils/tenderly';
import EthereumBlockie from '../EthereumBlockie/EthereumBlockie';

import './ChronologicalContent.less';

const TokenStandardLabel = {
  ERC20: 'ERC-20',
  ERC721: 'ERC-721',
  NATIVE: 'Native',
};

enum AssetChangesTabs {
  tokens = 'tokensTransferred',
  nativeCoins = 'nativeCoinsTransferred',
}

enum TokenType {
  FUNGIBLE = 'fungible',
  NON_FUNGIBLE = 'nonFungible',
  NATIVE = 'native',
}

const UTCTimeOptions: Intl.DateTimeFormatOptions = {
  timeZone: 'UTC',
  timeZoneName: 'short',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const MinAssetChangesToDisplay = 10;

const ChronologicalContent = ({
  assetChanges,
  contracts,
  className = '',
  groupAddress = '',
  viewAll = false,
  // onContractClick,
  shouldShowApproximateSign,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onViewAllToggle = () => {},
  activeTabValue = '',
}) => {
  const showViewAll =
    !groupAddress && assetChanges.length > MinAssetChangesToDisplay;
  const showAll = !showViewAll || viewAll;

  let assetChangesToDisplay = assetChanges;
  if (!showAll) {
    assetChangesToDisplay = assetChangesToDisplay.slice(
      0,
      MinAssetChangesToDisplay
    );
  }

  const nonFungibleAssetChangeExist = assetChanges.some(
    (assetChange) => assetChange.tokenInfo.type === TokenType.NON_FUNGIBLE
  );

  const isNativeCoinsTab = activeTabValue === AssetChangesTabs.nativeCoins;

  return (
    <div className={clsx('ChronologicalContent', className)}>
      <div
        className={clsx('ChronologicalContent__Row', className, {
          'ChronologicalContent__Row--WithNonFungibles': nonFungibleAssetChangeExist,
          'ChronologicalContent__Row--NativeCurrency': isNativeCoinsTab,
        })}
      >
        <div className="ChronologicalContent__Row__Header">Token</div>
        <div className="ChronologicalContent__Row__Header">Amount</div>
        <div className="ChronologicalContent__Row__Header">
          {groupAddress ? 'Change' : 'USD'}
        </div>
        <div className="ChronologicalContent__Row__Header">From</div>
        <div className="ChronologicalContent__Row__Header">To</div>
        {nonFungibleAssetChangeExist && (
          <>
            <div className="ChronologicalContent__Row__Header">
              NFT collection
            </div>
            <div className="ChronologicalContent__Row__Header">Token ID</div>
          </>
        )}
        {!isNativeCoinsTab && (
          <div className="ChronologicalContent__Row__Header">Standard</div>
        )}
      </div>
      {assetChangesToDisplay.map((assetChange, index) => {
        const {
          dollarValue,
          from,
          to,
          amount,
          rawAmount,
          tokenId,
          tokenInfo: {
            name,
            standard,
            logo,
            symbol,
            type,
            contractAddress,
            dollarValue: tokenDollarValue,
          },
        } = assetChange;

        const bigLogo = logo?.replace('small', 'large') || logo;
        const isUnknownToken = !symbol;

        const fromContract = contracts.find(
          (contract) => contract.address === assetChange.from
        );
        const toContract = contracts.find(
          (contract) => contract.address === assetChange.to
        );
        // const isNft = type === TokenType.NON_FUNGIBLE;

        return (
          <div
            key={index}
            className={clsx('ChronologicalContent__Row', className, {
              'ChronologicalContent__Row--WithNonFungibles': nonFungibleAssetChangeExist,
              'ChronologicalContent__Row--NativeCurrency': isNativeCoinsTab,
            })}
          >
            <div className="ChronologicalContent__Row__Token">
              {isUnknownToken && (
                <>
                  {/*<Icon*/}
                  {/*  className="MarginRight0 FontSize4 text-gray-comment"*/}
                  {/*  icon="help-circle"*/}
                  {/*/>*/}
                  <div className="TextOverflowEllipsis">{contractAddress}</div>
                </>
              )}
              {!isUnknownToken && (
                <div
                  className="flex items-center"
                  // eslint-disable-next-line react/forbid-dom-props
                  id={`asset-changes-chronological-token-${index}-${contractAddress}`}
                >
                  <img
                    className="mr-4 cursor-pointer"
                    width={16}
                    height={16}
                    src={bigLogo}
                    alt="icon"
                  />
                  <div className="TextOverflowEllipsis">
                    {symbol.toUpperCase()}
                  </div>
                </div>
              )}
            </div>
            <div
              // eslint-disable-next-line react/forbid-dom-props
              id={`asset-changes-chronological-content-amount-${index}-${groupAddress}`}
              className="ChronologicalContent__Row__Amount"
            >
              {isUnknownToken && (
                <div className="TextOverflowEllipsis">
                  {formatToLocaleString(rawAmount, 1, 4)}
                </div>
              )}
              {!isUnknownToken && (
                <>
                  {shouldShowApproximateSign(Number(amount)) && <span>≈</span>}
                  <div className="TextOverflowEllipsis">
                    {formatToLocaleString(amount, 2, 4)}
                  </div>
                </>
              )}
            </div>
            <div
              id={`asset-changes-chronological-content-dollar-value-${index}-${groupAddress}`}
              className="ChronologicalContent__Row__DollarValue"
            >
              {isUnknownToken && <span className="text-gray-comment">N/A</span>}
              {!isUnknownToken && (
                <>
                  {!!Number(dollarValue) && (
                    <>
                      {groupAddress === from && (
                        <span className="mr-2 text-red">-</span>
                      )}
                      {groupAddress === to && (
                        <span className="mr-2 text-green">+</span>
                      )}
                    </>
                  )}
                  {shouldShowApproximateSign(Number(dollarValue)) && (
                    <span>≈</span>
                  )}
                  <span>
                    {type === TokenType.NON_FUNGIBLE && (
                      <span className="text-orange">*</span>
                    )}
                    ${formatToLocaleString(dollarValue, 2, 4)}
                  </span>
                </>
              )}
            </div>
            <div className="ChronologicalContent__Row__From">
              {!from && (
                <div className="flex items-center text-gray-comment">
                  {/*<Icon className="MarginRight0" icon="gavel" />*/}
                  <span>Minted</span>
                </div>
              )}
              {!!from && (
                <>
                  <EthereumBlockie className="mr-4" hex={from} size={16} />
                  <div className="TextOverflowEllipsis">
                    {fromContract?.contract_name ??
                      generateShortAddress(from, 8, 6)}
                  </div>
                </>
              )}
            </div>
            <div className="ChronologicalContent__Row__To">
              {!to && (
                <div className="flex items-center text-gray-comment">
                  {/*<Icon className="MarginRight0" icon="flame" />*/}
                  <span>Burned</span>
                </div>
              )}
              {!!to && (
                <>
                  <EthereumBlockie className="mr-4" hex={to} size={16} />
                  <div className="TextOverflowEllipsis">
                    {toContract?.contract_name ??
                      generateShortAddress(to, 8, 6)}
                  </div>
                </>
              )}
            </div>
            {nonFungibleAssetChangeExist && (
              <>
                <div
                  // eslint-disable-next-line react/forbid-dom-props
                  id={`asset-changes-chronological-content-token-name-${index}-${groupAddress}`}
                  className="ChronologicalContent__Row__Name"
                >
                  <div className="TextOverflowEllipsis">{name || 'N/A'}</div>
                </div>
                <div className="ChronologicalContent__Row__TokenId">
                  {tokenId ? Number(tokenId) : 'N/A'}
                </div>
              </>
            )}
            {!isNativeCoinsTab && (
              <div className="ChronologicalContent__Row__Standard">
                {TokenStandardLabel[standard]}
              </div>
            )}
          </div>
        );
      })}
      {showViewAll && (
        <div className="ChronologicalContent__LinkButton">
          <a onClick={onViewAllToggle}>
            {!viewAll && <span>Show all</span>}
            {viewAll && <span>Show less</span>}
          </a>
        </div>
      )}
    </div>
  );
};

export default ChronologicalContent;
