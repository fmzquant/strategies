
> 策略名称

回测保存K线到本地CSV

> 策略作者

小草





> 源码 (python)

``` python
'''
/*backtest
start: 2017-10-01        
end: 2017-11-16          
period: 1440
periodBase: 15
mode: 0                 
*/
'''

#需要用的pandas库，并且用自己的托管回测才能保存到本地
#import numpy as np
import pandas as pd

#保存路径
path = 'C:\\Users\\Public\\Documents\\'

def main():
    df=pd.DataFrame()
    while True:
        records = _C(exchange.GetRecords)
        df_new = pd.DataFrame(records)  #把records转为dataframe
        df_new['Time'] = pd.to_datetime(df_new['Time'],unit='ms')+pd.Timedelta('8 h')
        df_new.index = df_new['Time']
        if df.empty or df_new['Time'].min() >= df['Time'].max():
            df=df.combine_first(df_new)
            Log(df['Time'].max())
        #确定最后一次时间，用于保存数据
        if df_new['Time'].max() == pd.Timestamp('2017-11-15 23:45:00'):
            Log('保存数据')
            df=df.combine_first(df_new)
            df.to_csv(path+'records15.csv',index=False)
            break
        #休眠时间是选择周期
        Sleep(15*60*1000)

```

> 策略出处

https://www.fmz.com/strategy/61867

> 更新时间

2017-12-15 13:31:31
