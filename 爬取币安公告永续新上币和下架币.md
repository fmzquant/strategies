
> Name

爬取币安公告永续新上币和下架币

> Author

小草





> Source (javascript)

``` javascript

function main() {
    var last_news = ''
    while(true){
        var html = HttpQuery('https://www.binance.com/en/support/announcement/c-49?navId=49')
        if(html){
            var news = html.match(/Launch .{0,40} Perpetual|Delist.{0,40}-\d{1,2}/i)
            if(news && last_news != news[0]){
                Log(news[0],'@')
                last_news = news[0]
            }
        }
        Sleep(60*1000)
    }
}

```

> Detail

https://www.fmz.com/strategy/311117

> Last Modified

2023-02-26 21:08:49
