
> 策略名称

抛物线转向SAR与价格高低点策略|SAR and Price High and Low Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：SAR和价格高低点策略
- 数据周期：1H等
- 策略支持：商品期货、数字货币现货，数字货币期货
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/4d9459b9af47702f7c2c6666212927c7.png)

||

- Strategy Name: SAR and Price High and Low Strategy
- Data cycle: 1H, etc.
- Strategic Support: Commodity Futures, Digital Currency Spot, Digital Currency Futures

  ![IMG](https://www.fmz.com/upload/asset/ca979cacba242461b34f320a71c2a1a9.png)  
  ![IMG](https://www.fmz.com/upload/asset/89ed32f65277b4b1dc6d9d420508dfcd.png) 

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|SLOSS|2|止损止盈百分比|stop loss percentage and take profit percentage|
|N|60|收盘价高低点周期|cycle of closing price's high and low point|
|IsCryptoCurrency|0|选择用于商品期货或者数字货币|Choose for commodity futures or digital currency: 商品期货|Commodity Futures||数字货币现货|Digital Currency Spot||数字货币期货|Digital Currency Futures|
|CryptoCurrencyTradeAmount|true|用于数字货币市场时的每次交易下单量|Order quantity per transaction used in the digital currency market|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-12-02 00:00:00
period: 1d
exchanges: [{"eid":"Futures_CTP","currency":"FUTURES"}]
args: [["IsCryptoCurrency",2],["ContractType","rb888",126961]]
*)

LOTS:=IF(IsCryptoCurrency, IF(IsCryptoCurrency=1, CryptoCurrencyTradeAmount, MAX(1, INTPART(CryptoCurrencyTradeAmount))), MAX(1,INTPART(MONEYTOT/(O*UNIT*0.1))));
SARLINE:=SAR(4,2,20);

B1:=SARLINE>0;
S1:=SARLINE<0;
B2:=HIGH>=HHV(CLOSE,N);
S2:=LOW<=LLV(CLOSE,N);

BUYK:=BARPOS>N AND B1 AND B2;
SELLK:=BARPOS>N AND S1 AND S2;
SELLY:=S1 AND S2 AND BKHIGH>BKPRICE*(1+0.01*SLOSS);
BUYY:=B1 AND B2 AND SKLOW<SKPRICE*(1-0.01*SLOSS);
SELLS:=C<BKPRICE*(1-SLOSS*0.01);
BUYS:=C>SKPRICE*(1+SLOSS*0.01);
BUYK,BK(LOTS);
SELLK,SK(LOTS);
SELLY,SP(BKVOL);
BUYY,BP(SKVOL);
SELLS,SP(BKVOL);
BUYS,BP(SKVOL);
```

> 策略出处

https://www.fmz.com/strategy/128251

> 更新时间

2018-12-17 15:40:03
