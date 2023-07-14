
> Name

麦语言网格策略

> Author

a8269917



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ktkc|10|空头起始仓位|
|dtkc|false|多头起始仓位|
|y|0.02|盈利减仓距离|
|s|0.02|亏损加仓距离|
|jia|true|亏损加仓数量|
|jian|true|盈利减仓数量|


> Source (MyLanguage)

``` pascal
VARIABLE:V1:1;
IF dtkc>0 AND BKVOL=0 THEN BEGIN 1,BK(dtkc);V1:C;INFO(1,V1);END
IF ktkc>0 AND SKVOL=0 THEN BEGIN 1,SK(ktkc);V1:C;INFO(1,V1);END
IF BKVOL>0 AND C>V1/(1-y) THEN BEGIN 1,SP(jian);V1:C;INFO(1,V1);END
IF BKVOL>0 AND C<V1*(1-s) THEN BEGIN 1,BK(jia);V1:C;INFO(1,V1);END
IF SKVOL>0 AND C<V1/(1+y) THEN BEGIN 1,BP(jian);V1:C;INFO(1,V1);END
IF SKVOL>0 AND C>V1*(1+s) THEN BEGIN 1,SK(jia);V1:C;INFO(1,V1);END
MULTSIG(0,0,60,0);
TRADE_AGAIN(1000);
```

> Detail

https://www.fmz.com/strategy/142701

> Last Modified

2019-06-21 23:07:47
