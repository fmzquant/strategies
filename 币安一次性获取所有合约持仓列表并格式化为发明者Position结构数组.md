
> Name

币安一次性获取所有合约持仓列表并格式化为发明者Position结构数组

> Author

夏天不打你





> Source (javascript)

``` javascript
// 从持仓列表中获取特定币种的持仓
function getPositionBySymbol(positions, symbol) {
    var index = -1;

    if (positions && positions.length > 0) {
        for (var i = 0; i < positions.length; i++) {
            if (positions[i][0].Symbol == symbol) {
                index = i;
                break;
            }
        }
    }

    return index == -1 ? null : positions[index];
}

// 获取所有持仓列表
function getAllPositionInBinance() {
    var ret = exchange.IO("api", "GET", "/fapi/v2/account");
    var positions = [];
    var i = 0;

    if (!ret || !ret.positions) {
        return null;
    }
    // 获取所有持仓
    for (i = 0; i < ret.positions.length; i++) {
        if (ret.positions[i].positionAmt != 0 && ret.positions[i].symbol.endsWith("USDT")) {
            positions.push([{
                Symbol: ret.positions[i].symbol.substring(0, ret.positions[i].symbol.lastIndexOf("USDT")) + "_USDT",
                Amount: Number(Math.abs(ret.positions[i].positionAmt)),
                FrozenAmount: 0,
                Price: Number(ret.positions[i].entryPrice),
                Profit: Number(ret.positions[i].unrealizedProfit),
                Type: ret.positions[i].positionAmt < 0 ? PD_SHORT : PD_LONG,
                ContractType: "swap",
                Margin: Number(ret.positions[i].positionInitialMargin),
                LevelRate: Number(ret.positions[i].leverage)
            }]);
        }
    }
    // 合并相同币种的持仓(同一币种，多空双向持仓)
    if (positions.length >= 2) {
        for (i = 0; i < positions.length; i++) {
            for (var j = i + 1; j < positions.length; j++) {
                if (positions[i][0].Symbol == positions[j][0].Symbol) {
                    positions[i].push(JSON.parse(JSON.stringify(positions[j][0])));
                    positions.splice(j, 1);                     // 删除相同币种
                    break;
                }
            }
        }
    }

    return positions;
}
```

> Detail

https://www.fmz.com/strategy/315410

> Last Modified

2021-09-26 00:08:35
