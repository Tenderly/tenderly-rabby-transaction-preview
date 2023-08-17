import React from 'react';
import { Radio, Tabs } from 'antd';
import type { RadioChangeEvent } from 'antd';
import PillsSwitch from 'ui/component/PillsSwitch';
import clsx from 'clsx';
import { buildAssetChangeFromResponse } from 'ui/utils/tenderly';
import ChronologicalContent from './ChronologicalContent';
import PerAddressContent from './PerAddressContent';
import { TenderlyCredits } from 'ui/views/Approval/components/TxComponents/Tenderly';

export enum TokenStandardType {
  ERC20 = 'ERC20',
  ERC721 = 'ERC721',
  NATIVE = 'NATIVE',
}

export enum TokenType {
  FUNGIBLE = 'fungible',
  NON_FUNGIBLE = 'nonFungible',
  NATIVE = 'native',
}

export type TransactionTokenInfoData = {
  contractAddress: string;
  name: string;
  logo: string;
  symbol: string;
  decimals: number;
  dollarValue: string;
  type: TokenType;
  standard: TokenStandardType;
};

export type TransactionAssetChangeData = {
  from: string;
  to: string;
  amount: string;
  rawAmount: string;
  dollarValue: string;
  type: string;
  tokenId: string;
  tokenInfo: TransactionTokenInfoData;
};

export enum AssetChangesTabs {
  tokens = 'tokensTransferred',
  nativeCoins = 'nativeCoinsTransferred',
}

export enum SortingType {
  CHRONOLOGICALLY = 'chronologically',
  PER_ADDRESS = 'perAddress',
}

export const SortingTypeLabelMap = {
  [SortingType.CHRONOLOGICALLY]: 'Show All',
  [SortingType.PER_ADDRESS]: 'Group By Address',
};

const TenderlyAssetChanges = ({ assetChanges, contracts }) => {
  const [selectedTab, setSelectedTab] = React.useState<
    'tokens_transferred' | 'native_coins_transferred'
  >('tokens_transferred');
  const [sortingValue, setSortingValue] = React.useState<SortingType>(
    SortingType.CHRONOLOGICALLY
  );
  const [viewAll, setViewAll] = React.useState(false);

  function toggleViewAll() {
    setViewAll((prevState) => !prevState);
  }

  const transactionAssetChanges =
    assetChanges?.map((assetChangeResponseItem: any) =>
      buildAssetChangeFromResponse(assetChangeResponseItem)
    ) ?? [];

  const assetChangesMappedByType = React.useMemo<
    Record<AssetChangesTabs, TransactionAssetChangeData[]>
  >(
    () =>
      transactionAssetChanges.reduce(
        (acc, assetChange) => {
          const { type } = assetChange.tokenInfo;
          if (type === TokenType.NATIVE) {
            return {
              ...acc,
              [AssetChangesTabs.nativeCoins]: [
                ...(acc?.nativeCoinsTransferred ?? []),
                assetChange,
              ],
            };
          }
          return {
            ...acc,
            [AssetChangesTabs.tokens]: [
              ...(acc?.tokensTransferred ?? []),
              assetChange,
            ],
          };
        },
        { [AssetChangesTabs.nativeCoins]: [], [AssetChangesTabs.tokens]: [] }
      ),
    [assetChanges]
  );

  function shouldShowApproximateSign(value: number) {
    const roundedValue = Number(value.toFixed(3));

    if (!Number.isInteger(roundedValue)) return false;

    return !!(value - roundedValue);
  }

  return (
    <div className="TenderlyAssetChanges container">
      <div className="bg-[#f5f6fa] sticky top-[32px] z-10">
        <PillsSwitch
          value={selectedTab}
          onTabChange={(v) => setSelectedTab(v)}
          className="flex bg-[#e2e6ec] w-full mx-[auto] my-[0] h-[32px] p-[2px] mb-8"
          itemClassname={clsx('w-full py-[7px] text-[12px]')}
          itemClassnameInActive={clsx('text-[#4B4d59]')}
          options={
            [
              {
                key: 'tokens_transferred',
                label: `Tokens Transferred (${assetChangesMappedByType.tokensTransferred.length})`,
              },
              {
                key: 'native_coins_transferred',
                label: `Native Coins Transferred (${assetChangesMappedByType.nativeCoinsTransferred.length})`,
              },
            ] as const
          }
        />
      </div>

      <Radio.Group
        className="flex items-center justify-center mb-8"
        onChange={(e: RadioChangeEvent) => setSortingValue(e.target.value)}
        value={sortingValue}
      >
        <Radio value={SortingType.CHRONOLOGICALLY}>
          {SortingTypeLabelMap[SortingType.CHRONOLOGICALLY]}
        </Radio>
        <Radio value={SortingType.PER_ADDRESS}>
          {SortingTypeLabelMap[SortingType.PER_ADDRESS]}
        </Radio>
      </Radio.Group>

      <Tabs
        centered
        className="tenderly_simulation_tabs"
        activeKey={selectedTab}
        animated={{ inkBar: false, tabPane: false }}
        renderTabBar={() => <></>}
      >
        <Tabs.TabPane
          tab={
            <span className="text-13 tab-title">
              Tokens Transferred (
              {assetChangesMappedByType.tokensTransferred.length})
            </span>
          }
          key="tokens_transferred"
        >
          {sortingValue === SortingType.CHRONOLOGICALLY && (
            <ChronologicalContent
              assetChanges={assetChangesMappedByType.tokensTransferred}
              contracts={contracts}
              shouldShowApproximateSign={shouldShowApproximateSign}
              viewAll={viewAll}
              onViewAllToggle={toggleViewAll}
              // activeTabValue={activeTabValue}
            />
          )}
          {sortingValue === SortingType.PER_ADDRESS && (
            <PerAddressContent
              assetChanges={assetChangesMappedByType.tokensTransferred}
              contracts={contracts}
              shouldShowApproximateSign={shouldShowApproximateSign}
              viewAll={viewAll}
              onViewAllToggle={toggleViewAll}
              // activeTabValue={activeTabValue}
            />
          )}
        </Tabs.TabPane>
        <Tabs.TabPane
          tab={
            <span className="text-13 tab-title">
              Native Coins Transferred (
              {assetChangesMappedByType.nativeCoinsTransferred.length})
            </span>
          }
          key="native_coins_transferred"
        >
          {sortingValue === SortingType.CHRONOLOGICALLY && (
            <ChronologicalContent
              assetChanges={assetChangesMappedByType.nativeCoinsTransferred}
              contracts={contracts}
              shouldShowApproximateSign={shouldShowApproximateSign}
              viewAll={viewAll}
              onViewAllToggle={toggleViewAll}
              // activeTabValue={activeTabValue}
            />
          )}
          {sortingValue === SortingType.PER_ADDRESS && (
            <PerAddressContent
              assetChanges={assetChangesMappedByType.nativeCoinsTransferred}
              contracts={contracts}
              shouldShowApproximateSign={shouldShowApproximateSign}
              viewAll={viewAll}
              onViewAllToggle={toggleViewAll}
              // activeTabValue={activeTabValue}
            />
          )}
        </Tabs.TabPane>
      </Tabs>

      <TenderlyCredits classname="mt-12" />
    </div>
  );
};

export default TenderlyAssetChanges;
