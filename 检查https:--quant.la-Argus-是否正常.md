
> 策略名称

检查https:--quant.la-Argus-是否正常

> 策略作者

小草





> 源码 (python)

``` python
import urllib2
def main():
    Log("开始检查@")
    while True:
        try:
            urllib2.urlopen("https://quant.la/API/Argus/predict", timeout=15)
            Log("服务正常")
        except:
            Log(_D()," 服务异常@")
        Sleep(10*60*1000)

```

> 策略出处

https://www.fmz.com/strategy/100344

> 更新时间

2018-06-22 10:29:01
