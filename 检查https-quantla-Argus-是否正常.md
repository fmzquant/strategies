
> Name

检查https-quantla-Argus-是否正常

> Author

小草





> Source (python)

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

> Detail

https://www.fmz.com/strategy/100344

> Last Modified

2018-06-22 10:29:01
