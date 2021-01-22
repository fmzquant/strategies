
> 策略名称

python_cta_test

> 策略作者

Hukybo





> 源码 (python)

``` python

'''backtest
start: 2015-02-22 00:00:00
end: 2020-10-21 00:00:00
period: 1h
basePeriod: 1h
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
'''


def CTA(st):
    records = st["records"]  # 获取K线数组
    Log(records)
    if len(records) < 100:  # 如果K线数量不足100根就返回
        return
    amount = st["position"]["amount"]  # 获取真实持仓数量，正数为多头，负数为空头
    close = records[-2]['Close']  # 获取上根K线收盘价
    records.pop()  # 删除K线数组最新的数据，因为最新的K线是未完成的
    on_line = TA.Highest(records, 55, 'High') * 0.999  # 计算前55天最高价
    under_line = TA.Lowest(records, 55, 'Low') * 1.001  # 计算前55天最低价
    middle_line = (on_line + under_line) / 2  # 计算前55天最高价和前55天最低价的中间值
    if amount > 0 and close < middle_line:  # 如果当前持有多头，并且价格小于中间值
        Log('平多')
        return -5  # 平5手多单
    if amount < 0 and close > middle_line:  # 如果当前持有空头，并且价格大于中间值
        Log('平空')
        return 5  # 平5手空单
    if amount == 0:  # 如果当前无持仓
        if close > on_line:  # 如果价格大于前55天最高价
            Log('开多')
            return 5  # 开5手多单
        if close < under_line:  # 如果价格小于前55天最低价
            Log('开空')
            return -5  # 开5手空单


def main():
    ext.CTA("MA000/MA888,rb000/rb888,i000/i888", CTA)  # 设置数据品种和交易品种
```

> 策略出处

https://www.fmz.com/strategy/233060

> 更新时间

2020-12-17 14:25:55
