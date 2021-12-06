
> 策略名称

binance_symbols_info_perpetual

> 策略作者

linsilence



> 策略参数



|参数|默认值|描述|
|----|----|----|
|volume_rate_period|300|量比周期|
|volume_rate_rank_length|20|量比榜长度|
|dc_period|14400|唐奇安通道周期|
|volume_rate_times_binance|10|量比倍数binance|
|volume_rate_times_coingecko|3|量比倍数coingecko|
|count_marketcap|20|市值排行位数|


> 源码 (javascript)

``` javascript
           

const retry_delay = 1000;
const time_wait = 1 * 60 * 1000;

var symbols_binance;
var symbols_coingecko;
var init_success = false;

const currency_base = '_USDT';
const precision = 3;
const price_percent_in_depth = 0.001;

function init() {
    _CDelay(retry_delay);
    // exchange.SetProxy("socks5://192.168.1.100:1080");
    exchange.SetContractType('swap');

    symbols_binance = $.Binance_Api_Future_ExchangeInfo_AllSymbol(exchange);
    if (!symbols_binance) {
        Log('symbols_binance error');
        return;
    }
    symbols_binance = symbols_binance.filter(e => $.CurrencyExist(exchange, e + '_USDT'));
    Log('symbols_binance: ', symbols_binance);


    symbols_coingecko = $.Grab_Symbols_Marketcap(count_marketcap);
    if (!symbols_coingecko) {
        Log('symbols_coingecko error');
        return;
    }
    symbols_coingecko = symbols_coingecko.filter(e => $.CurrencyExist(exchange, e + '_USDT'));
    Log('symbols_coingecko: ', symbols_coingecko);

    init_success = true;
}

function do_rank_volume_rate(symbols, multiple, notice, notice_time, label) {
    // volume rate 5m
    let rank_volume_rate = [];
    symbols.forEach(e => {
        e += currency_base;
        exchange.SetCurrency(e);
        const rs = exchange.GetRecords(volume_rate_period);
        if (!rs) {
            Log('do_rank_volume_rate - GetRecords - ', e);
            return;
        }
        const vs = $.GetRecordsVolume(rs);
        if (!vs || vs.length === 0) {
            return;
        }

        const curr = vs.pop();
        const olds = vs;
        if (!olds || olds.length === 0) {
            return;
        }

        const mean = $.AverageSmooth(olds);
        if (!mean) {
            return;
        }

        const rate = curr / mean;

        const volume_rate = {
            symbol: e,
            curr: curr,
            mean: mean,
            rate: rate,
            over: rate >= multiple,
        }

        rank_volume_rate.push(volume_rate);
    });

    // sort by rate desc & limit
    rank_volume_rate.sort((a, b) => b.rate - a.rate);
    rank_volume_rate = rank_volume_rate.slice(0, volume_rate_rank_length);
    // Log(rank_volume_rate);

    // update log status
    const table = {
        type: 'table',
        title: `volume rate rank ${label} ${_D()}`,
        cols: ['symbol', 'rate', 'price', 'price_percent', 'price_amplitude', 'best_quatity(buy|sell)'],
        rows: [],
    }
    rank_volume_rate.forEach(e => {
        exchange.SetCurrency(e.symbol);

        // last_record
        const rs = exchange.GetRecords(volume_rate_period);
        if (!rs) {
            Log('do_rank_volume_rate - GetRecords 2 - ', e);
            return;
        }
        const r = rs[rs.length - 1];
        e.price = r.Close;
        e.price_percent = (r.Close - r.Open) / r.Open;
        e.price_amplitude = math.abs(r.High - r.Low) / r.Open;

        // depth
        const d = exchange.GetDepth();
        e.best_quatity_buy = $.GetDepthTotal(d.Asks, price_percent_in_depth);
        e.best_quote_buy = e.best_quatity_buy * e.price;
        e.best_quatity_sell = $.GetDepthTotal(d.Bids, price_percent_in_depth);
        e.best_quote_sell = e.best_quatity_sell * e.price;

        e.info = [
            e.symbol + (e.over ? '#FF0000' : ''),
            _N(e.rate, precision),
            _N(e.price, precision),
            _N(e.price_percent, precision),
            _N(e.price_amplitude, precision),
            `${_N(e.best_quatity_buy, precision)}(${_N(e.best_quote_buy, precision)}) | ${_N(e.best_quatity_sell, precision)}(${_N(e.best_quote_sell, precision)})`,
        ];
        table.rows.push(e.info);

        e.info_simple = [
            e.symbol,
            'rate: ' + _N(e.rate, precision),
            'price: ' + _N(e.price, precision),
            'price_percent: ' + _N(e.price_percent, precision),
            'buy|sell: ' + `${_N(e.best_quote_buy, precision)} | ${_N(e.best_quote_sell, precision)}` + ' USDT',
        ];
    });

    // notify
    if (notice) {
        for (const e of rank_volume_rate) {
            if (!e.over) {
                break;
            }

            const msg = JSON.stringify(e.info_simple);
            if ($.CountDownEnd('rank_volume_rate_' + e.symbol, time_wait, notice_time, notice_time)) {
                Log(`rank_volume_rate ${label} - `, msg, '@');
            } else {
                // notify next symbol
                continue;
            }
            break;
        }
    }

    return table;
}

function main() {
    if (!init_success) {
        return;
    }

    while (true) {
        const tab_2 = do_rank_volume_rate(symbols_coingecko, volume_rate_times_coingecko, true, 4 * 60 * 60 * 1000, 'coingecko');
        const tab_1 = do_rank_volume_rate(symbols_binance, volume_rate_times_binance, false, 4 * 60 * 60 * 1000, 'binance');

        LogStatus(
            '`' + JSON.stringify(tab_2) + '`\n' +
            '`' + JSON.stringify(tab_1) + '`\n'
        );

        // dc 4h

        Sleep(time_wait);
    }
}
```

> 策略出处

https://www.fmz.com/strategy/248435

> 更新时间

2021-05-12 10:55:47
