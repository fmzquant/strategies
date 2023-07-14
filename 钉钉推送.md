
> Name

钉钉推送

> Author

一拳男孩

> Strategy Description

- $.ddNotice(title, content)
> title: 字符串类型，推送的标题
> content: 数组类型，markdown格式

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|DING_URI|钉钉URI|钉钉URI|


> Source (javascript)

``` javascript
$.ddNotice = function(title, content) {
    content = content == null ? title : content instanceof Array ? content.join('\n') : content
    HttpQuery(DING_URI, {
        method: 'POST',
        timeout: 3000,
        data: JSON.stringify({
            msgtype: 'markdown',
            markdown: {
                title: title,
                text: content
            }
        })
    }, null, 'Content-Type: application/json')
}
```

> Detail

https://www.fmz.com/strategy/159668

> Last Modified

2019-08-13 22:38:39
