import React from 'react';
import dayjs from 'dayjs';

import Card from '../components/Card';
import PortfolioHeader from '../components/PortfolioHeader';
import { TokenList, Supplements } from '../components/PortfolioDetail';
import { AbstractPortfolio } from 'ui/utils/portfolio/types';

export default React.memo(
  ({ name, data }: { name: string; data: AbstractPortfolio }) => {
    const portfolio = data._originPortfolio;

    const supplements = [
      !!portfolio.detail.unlock_at && {
        label: 'Unlock at',
        content: dayjs(Number(portfolio.detail.unlock_at) * 1000).format(
          'YYYY/MM/DD'
        ),
      },
    ];

    return (
      <Card>
        <PortfolioHeader data={data} name={name} showDescription />
        <Supplements data={supplements} />
        <TokenList
          tokens={portfolio.detail.supply_token_list}
          name="SUPPLIED"
        />
        <TokenList tokens={portfolio.detail.reward_token_list} name="REWARDS" />
      </Card>
    );
  }
);
