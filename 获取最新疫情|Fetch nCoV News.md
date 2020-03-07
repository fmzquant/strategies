
> 策略名称

获取最新疫情|Fetch nCoV News

> 策略作者

fmzero

> 策略描述

病毒无情，人间有爱。
FMZ一直有情怀。
丁香园一直做实时发布疫情发展情况，而我想通过FMZ的`HttpQuery`爬取其实时信息。并用Log(...&)推送至微信公众号上，用LogStatus展现信息（有人说可能没卵用）。
这就是温度。
如下代码未能实现正则表达式过滤信息，仅仅是一个半成品。望大神助力

[温度](https://www.fmz.com/strategy/182505)




> 源码 (javascript)

``` javascript
// 有温度的FMZ

var url = 'https://3g.dxy.cn/newh5/view/pneumonia'
var newsRegex = "/<script id=\"getTimelineService\">.+?window.getTimelineService\s=\s({.+?)}catch\(e\){}<\/script>/im"
var provinceRegex = "/<script id=\"getListByCountryTypeService1\">.+?window.getListByCountryTypeService1\s=\s(\[.+?])}catch\(e\){}<\/script>/im"

///////////////////////////////////////////
function get_dxy_data() {
    var ret = HttpQuery(url)
    return ret
}

function get_nCoV_news(content ) {
    var news = content.match(newsRegex)
    Log(news)
}

function get_nCoV_province(content) {
    var ret = HttpQuery(url)
    var province = ret.search(provinceRegex)
    Log(province)

}

function main() {
    while(true) {
        Sleep(10 * 1000)
        var content = get_dxy_data()
        if(content === null) {
            continue
        }
        get_nCoV_news(content)
        get_nCoV_province(content)
    }
}

```

> 策略出处

https://www.fmz.com/strategy/182505

> 更新时间

2020-01-24 14:23:36
