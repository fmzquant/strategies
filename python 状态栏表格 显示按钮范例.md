
> 策略名称

python 状态栏表格 显示按钮范例

> 策略作者

小小梦





> 源码 (python)

``` python
import json

def main():
    tab = {
        "type" : "table", 
        "title" : "demo", 
        "cols" : ["a", "b", "c"], 
        "rows" : [["1", "2", {"type" : "button", "cmd" : "coverAll", "name" : "平仓"}]]    # 在状态栏表格 第一行，第三列上配置一个按钮 名字是平仓
    }
    
    LogStatus("`" + json.dumps(tab) + "`")

```

> 策略出处

https://www.fmz.com/strategy/147155

> 更新时间

2019-05-10 11:35:13
