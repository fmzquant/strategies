
> Name

Trade-Hour-V3

> Author

Zer3192



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|v_input_string_1|0|timezone: Europe/London|America/Los_Angeles|America/Chicago|America/Phoenix|America/Toronto|America/Vancouver|America/Argentina|America/El_Salvador|America/Sao_Paulo|America/Bogota|Europe/Moscow|Europe/Athens|Europe/Berlin|America/New_York|Europe/Madrid|Europe/Paris|Europe/Warsaw|Australia/Sydney|Australia/Brisbane|Australia/Adelaide|Australia/ACT|Asia/Almaty|Asia/Ashkhabad|Asia/Tokyo|Asia/Taipei|Asia/Singapore|Asia/Shanghai|Asia/Seoul|Asia/Tehran|Asia/Dubai|Asia/Kolkata|Asia/Hong_Kong|Asia/Bangkok|Pacific/Auckland|Pacific/Chatham|Pacific/Fakaofo|Pacific/Honolulu|
|v_input_source_1_close|0|source: close|high|low|open|hl2|hlc3|hlcc4|ohlc4|
|v_input_int_1|true|ROC Timeperiod|


> Source (PineScript)

``` pinescript
/*backtest
start: 2021-05-08 00:00:00
end: 2022-05-07 23:59:00
period: 4h
basePeriod: 15m
exchanges: [{"eid":"Futures_Binance","currency":"BTC_USDT"}]
*/
// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © mablue (Masoud Azizi)

//@version=5
strategy("Trade Hour V3",overlay=false)
timezone = input.string("Europe/London",options=["America/New_York","America/Los_Angeles","America/Chicago","America/Phoenix","America/Toronto","America/Vancouver","America/Argentina" ,"America/El_Salvador","America/Sao_Paulo","America/Bogota","Europe/Moscow","Europe/Athens","Europe/Berlin","Europe/London","Europe/Madrid","Europe/Paris","Europe/Warsaw","Australia/Sydney","Australia/Brisbane","Australia/Adelaide","Australia/ACT","Asia/Almaty","Asia/Ashkhabad","Asia/Tokyo","Asia/Taipei","Asia/Singapore","Asia/Shanghai","Asia/Seoul","Asia/Tehran","Asia/Dubai","Asia/Kolkata","Asia/Hong_Kong","Asia/Bangkok","Pacific/Auckland","Pacific/Chatham","Pacific/Fakaofo","Pacific/Honolulu"]	)
source = input.source(close)
tp = input.int(1,"ROC Timeperiod")

now_hour = hour(time,timezone)

indicator = ta.roc(source,tp)

buy_hourXindicator_cum = ta.cum(indicator* now_hour)
buy_indicator_cum = ta.cum(indicator)
buy_hour = buy_hourXindicator_cum/buy_indicator_cum

sell_hourXindicator_cum = ta.cum( (1/indicator ) * now_hour)
sell_indicator_cum = ta.cum(1/indicator)
sell_hour = sell_hourXindicator_cum/sell_indicator_cum

plot(buy_hour,color=color.green)
plot(sell_hour,color=color.red)
plot(now_hour,color=color.gray,display=display.none)


bool isLongBestHour = now_hour==math.round(buy_hour)
bool isShortBestHour = now_hour==math.round(sell_hour)

bgcolor(isLongBestHour ? color.new(color.green,80) : na)
bgcolor(isShortBestHour ? color.new(color.red,80) : na)
strategy.order("buy", strategy.long, when =isLongBestHour)
strategy.order("sell", strategy.short, when = isShortBestHour)
```

> Detail

https://www.fmz.com/strategy/380530

> Last Modified

2022-08-29 20:12:40
