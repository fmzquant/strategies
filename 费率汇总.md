
> Name

费率汇总

> Author

yulong

> Strategy Description

选择任意交易所，启动即可。



> Source (javascript)

``` javascript


function main() {
    const binanceFundingRate = {
        type: 'table',
        title: '币安费率',
        cols: ['交易对', '指数价', '标记价', '基差', '资金费率', '费率时间'],
        rows: []
    };

    const gateFundingRate = {
        type: 'table',
        title: 'GateIO费率',
        cols: ['交易对', '指数价', '标记价', '基差', '资金费率', '费率时间'],
        rows: []
    };

    const okexFundingRate = {
        type: 'table',
        title: 'OKEX费率',
        cols: ['交易对', '指数价', '标记价', '基差', '资金费率', '费率时间'],
        rows: []
    };

    while (true) {
        const data = JSON.parse(HttpQuery('https://fapi.binance.com/fapi/v1/premiumIndex'));
        binanceFundingRate.rows = data.map(({ symbol, lastFundingRate, markPrice, indexPrice, nextFundingTime }) => [
            symbol,
            indexPrice,
            markPrice,
            _N((+markPrice - indexPrice) / +indexPrice * 100, 4) + '%',
            _N(lastFundingRate * 100, 4) + '%',
            _D(nextFundingTime)]);

        const dataGate = JSON.parse(HttpQuery('https://api.gateio.ws/api/v4/futures/usdt/contracts'));
        gateFundingRate.rows = dataGate.map(({ name, funding_rate, mark_price, index_price, funding_next_apply }) => [
            name,
            index_price,
            mark_price,
            _N((+mark_price - index_price) / +index_price * 100, 4) + '%',
            _N(funding_rate * 100, 4) + '%',
            _D(funding_next_apply * 1000)]);

        const instruments = JSON.parse(HttpQuery('https://www.okex.com/api/swap/v3/instruments'));
        okexFundingRate.rows = [];
        instruments.map(a => a.instrument_id).forEach(instrument_id => {
            const item = JSON.parse(HttpQuery(`https://www.okex.com/api/swap/v3/instruments/${instrument_id}/funding_time`))
            okexFundingRate.rows.push([instrument_id, '-', '-', '-', _N(item.funding_rate * 100, 4) + '%', _D(new Date(item.funding_time))]);
        });

        LogStatus('\n`' + JSON.stringify([binanceFundingRate, gateFundingRate, okexFundingRate]) + '`\n');
        Sleep(60000);
    }
}
```

> Detail

https://www.fmz.com/strategy/229619

> Last Modified

2021-02-06 07:54:07
