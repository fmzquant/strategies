
> Name

深度快照

> Author

发明者量化





> Source (javascript)

``` javascript
function main() {
    var tbl = { 
        type: 'table', 
        title: '深度快照 @ ' + _D(), 
        cols: ['#', 'Amount', 'Ask', 'Bid', 'Amount'], 
        rows: []
    };
    var d = exchange.GetDepth();
    for (var i = 0; i < Math.min(Math.min(d.Asks.length, d.Bids.length), 15); i++) {
        tbl.rows.push([i, d.Asks[i].Amount, d.Asks[i].Price+'#ff0000', d.Bids[i].Price+'#0000ff', d.Bids[i].Amount]);
    }
    return tbl;
}
```

> Detail

https://www.fmz.com/strategy/187969

> Last Modified

2020-03-01 23:49:04
