
> 策略名称

瀑布线策略|PBX Strategy

> 策略作者

littleDreamXX

> 策略描述

[trans]
- 策略名称：瀑布线PUBU交易策略
- 数据周期：15M
- 支持：商品期货 ， 数字货币
- 官方网站：www.quantinfo.com

![IMG](https://www.fmz.com/upload/asset/3ba2dba0c6b01773b2c296438ff77d25.png)

- 主图
  瀑布线1，公式：PUBU1^^(EMA(C,N1)+EMA(C,N1*2)+EMA(C,N1*4))/3;
  瀑布线2，公式：PUBU2^^(EMA(C,N2)+EMA(C,N2*2)+EMA(C,N2*4))/3;
  瀑布线3，公式：PUBU3^^(EMA(C,N3)+EMA(C,N3*2)+EMA(C,N3*4))/3;

||

- Strategy Name: PBX Strategy
- Data cycle: 15M
- Support: Commodity Futures

  ![IMG](https://www.fmz.com/upload/asset/7a091a85a4f8af0a587ebd533b70145e.png)  
  ![IMG](https://www.fmz.com/upload/asset/151864a4e277271e6e9dce13515a0b4a.png) 

- Main chart:
  PBX1，formula：PUBU1^^(EMA(C,N1)+EMA(C,N12)+EMA(C,N14))/3;
  PBX2，formula：PUBU2^^(EMA(C,N2)+EMA(C,N22)+EMA(C,N24))/3;
  PBX3，formula：PUBU3^^(EMA(C,N3)+EMA(C,N32)+EMA(C,N34))/3;

[/trans]

> 策略参数



|参数|默认值|描述|
|----|----|----|
|N1|20|瀑布线1参数|PBX1 parameter|
|N2|50|瀑布线2参数|PBX2 parameter|
|N3|70|瀑布线3参数|PBX3 parameter|


> 源码 (麦语言)

``` pascal
(*backtest
start: 2018-01-01 00:00:00
end: 2018-01-07 00:00:00
period: 30m
exchanges: [{"eid":"Futures_OKCoin","currency":"BTC_USD"}]
args: [["TradeAmount",10,126961],["ContractType","quarter",126961]]
*)

// 指标
// index
PUBU1^^(EMA(C,N1)+EMA(C,N1*2)+EMA(C,N1*4))/3;
PUBU2^^(EMA(C,N2)+EMA(C,N2*2)+EMA(C,N2*4))/3;
PUBU3^^(EMA(C,N3)+EMA(C,N3*2)+EMA(C,N3*4))/3;

BKVOL=0 AND BARPOS>N3 AND C>PUBU1 AND PUBU1>PUBU2 AND PUBU2>PUBU3,BPK;
SKVOL=0 AND BARPOS>N3 AND C<PUBU1 AND PUBU1<PUBU2 AND PUBU2<PUBU3,SPK;

C<PUBU3,SP(BKVOL);
C>PUBU3,BP(SKVOL);
C<PUBU2 AND PUBU1<PUBU2 AND C>BKPRICE,SP(BKVOL);
C>PUBU2 AND PUBU1>PUBU2 AND C<SKPRICE,BP(SKVOL);
AUTOFILTER;
```

> 策略出处

https://www.fmz.com/strategy/128420

> 更新时间

2019-08-20 10:24:12
