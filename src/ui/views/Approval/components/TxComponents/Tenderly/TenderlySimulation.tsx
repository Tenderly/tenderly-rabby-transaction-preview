import React from 'react';
import { useTranslation } from 'react-i18next';
import { ActionWrapper } from 'ui/views/Approval/components/Actions';
import PillsSwitch from 'ui/component/PillsSwitch';
import { Tabs } from 'antd';
import clsx from 'clsx';
import TenderlyAssetChanges from 'ui/views/Approval/components/TxComponents/Tenderly/AssetChanges/TenderlyAssetChanges';

const TenderlySimulation = ({ data }: { data: Record<string, any> | null }) => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = React.useState<
    | 'tenderly_simulation'
    | 'tenderly_transaction'
    | 'tenderly_contracts'
    | 'tenderly_generated_access_list'
  >('tenderly_simulation');

  return (
    <div className="tenderly-simulation">
      <ActionWrapper>
        <div className="action-header">
          <div className="left">Tenderly Simulation</div>
        </div>
        {!data && (
          <div className="bg-[#f5f6fa] sticky top-[64px] z-10">
            Something went wrong.
          </div>
        )}
        {data && (
          <>
            <div className="bg-[#f5f6fa] sticky top-[64px] z-10">
              <PillsSwitch
                value={selectedTab}
                onTabChange={(v) => setSelectedTab(v)}
                className="flex bg-[#e2e6ec] w-full mx-[auto] my-[0] h-[32px] p-[2px] mb-[14px]"
                itemClassname={clsx('w-full py-[7px] text-[12px]')}
                itemClassnameInActive={clsx('text-[#4B4d59]')}
                options={
                  [
                    {
                      key: 'tenderly_simulation',
                      label: 'Simulation',
                    },
                    {
                      key: 'tenderly_transaction',
                      label: 'Transaction',
                    },
                    {
                      key: 'tenderly_contracts',
                      label: 'Contracts',
                    },
                    {
                      key: 'tenderly_generated_access_list',
                      label: 'Generated Access List',
                    },
                  ] as const
                }
              />
            </div>
            <Tabs
              centered
              className="tenderly_simulation_tabs"
              activeKey={selectedTab}
              animated={{ inkBar: false, tabPane: false }}
              renderTabBar={() => <></>}
            >
              <Tabs.TabPane
                tab={
                  <span className="text-13 tab-title">{t('Simulation')}</span>
                }
                key="tenderly_simulation"
              >
                <pre>{JSON.stringify(data.simulation, null, 2)}</pre>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="text-13 tab-title">{t('Transaction')}</span>
                }
                key="tenderly_transaction"
              >
                <TenderlyAssetChanges
                  assetChanges={data.transaction.transaction_info.asset_changes}
                  contracts={data.contracts}
                />
                {/*<pre>{JSON.stringify(data.transaction, null, 2)}</pre>*/}
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="text-13 tab-title">{t('Contracts')}</span>
                }
                key="tenderly_contracts"
              >
                <pre>{JSON.stringify(data.contracts, null, 2)}</pre>
              </Tabs.TabPane>
              <Tabs.TabPane
                tab={
                  <span className="text-13 tab-title">
                    {t('Generated Access List')}
                  </span>
                }
                key="tenderly_generated_access_list"
              >
                <pre>{JSON.stringify(data.generated_access_list, null, 2)}</pre>
              </Tabs.TabPane>
            </Tabs>
          </>
        )}
      </ActionWrapper>
    </div>
  );
};

export default TenderlySimulation;
