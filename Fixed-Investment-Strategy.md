
> Name

Fixed-Investment-Strategy

> Author

巴啦啦小魔仙

> Strategy Description

## Strategy Description
A common saying on trading desks is that beginners die chasing highs, while veterans die catching falling knives. The real issue is market timing. One careless move can leave a position trapped, so many strategies try to forecast trends and adjust holdings accordingly.

For a fixed-investment strategy, however, the core idea is different: buy low and sell high, keep buying as prices fall, and avoid chasing rallies or panic-selling. From that perspective, a fixed-investment strategy can be considered suitable for entry at almost any time.

A solid fixed-investment plan can greatly improve returns. Before starting, investors should write down their plan, follow it consistently, reduce discretionary interference, and stick with taking profits rather than cutting the strategy short. That is how the value of systematic accumulation is realized.

To control risk, this script restricts the operating range with the following rules:

Invest 1 short-contract lot every minute using 20x leverage.
If the open position loses more than 3%, continue the fixed-investment process. If profit exceeds 3%, close 2 lots every minute.
In the test script, the investment interval, order size, leverage, profit/loss threshold, and position direction are all configurable.

## Contact
If you are interested in this strategy, please add WeChat: Irene11229.
(Click my profile page for more strategy updates and market-analysis data from several major exchanges.)


> Source (python)

``` python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
import json
import time

from kumex.client import Trade


class Aip(object):

    def __init__(self):
        # read configuration from json file
        with open('config.json', 'r') as file:
            config = json.load(file)

        self.api_key = config['api_key']
        self.api_secret = config['api_secret']
        self.api_passphrase = config['api_passphrase']
        self.sandbox = config['is_sandbox']
        self.symbol = config['symbol']
        self.timer = int(config['timer'])
        self.size = int(config['size'])
        self.side = config['side']
        self.leverage = config['leverage']
        self.rate = float(config['rate'])
        self.trade = Trade(self.api_key, self.api_secret, self.api_passphrase, is_sandbox=self.sandbox)
        if self.side == 'sell':
            self.close = 'buy'
        else:
            self.close = 'sell'

    def get_position_pcnt(self):
        position = self.trade.get_position_details(self.symbol)
        return float(position['unrealisedPnlPcnt'])


if __name__ == '__main__':
    aip = Aip()
    market_order = aip.trade.create_market_order(aip.symbol, aip.side, aip.leverage, type='market', size=aip.size)
    print('create a market %s order, order id = %s' % (aip.side, market_order['orderId']))
    while 1:
        time.sleep(aip.timer * 60)
        pcnt = aip.get_position_pcnt()
        if pcnt < 0 and abs(pcnt) > aip.rate:
            market_order = aip.trade.create_market_order(aip.symbol, aip.side, aip.leverage,
                                                         type='market', size=aip.size)
            print('create a market %s order, order id = %s' % (aip.side, market_order['orderId']))
        elif pcnt > 0 and pcnt > aip.rate:
            market_order = aip.trade.create_market_order(aip.symbol, aip.close, aip.leverage,
                                                         type='market', size=(aip.size*2))
            print('create a market %s order, order id = %s' % (aip.close, market_order['orderId']))

```

> Detail

https://www.fmz.com/strategy/207710

> Last Modified

2021-03-04 10:13:37
