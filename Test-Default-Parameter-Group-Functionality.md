
> Name

Test-Default-Parameter-Group-Functionality

> Author

发明者量化-小小梦

> Strategy Description

### How to Precisely Adjust the Backtest System Default Settings with Code

> When testing strategy parameters, running backtests across different time periods, or testing multiple instruments, parameters often need to be adjusted repeatedly and cannot be recorded, so they must be reset the next time. To make parameter tuning more convenient, the platform added a new feature: using code to precisely adjust the "Backtest System Default Settings".

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|number|9999|Number type|
|bool|true|Boolean type|
|string|Hello World!|String type|
|comboBox|0|Dropdown: combo1 / combo2 / combo3|


> Source (javascript)

``` javascript
/*backtest
start: 2017-03-01        
end: 2017-03-02           
period: 15              
mode: 1                 
*/

/*defaults
number : 0
bool: false
string: Hello BotVS！
comboBox : 2
*/

function main(){
    while(true){
        LogStatus("测试默认参数！");
        Sleep(1000);
    }
}
```

> Detail

https://www.fmz.com/strategy/40155

> Last Modified

2021-07-02 16:33:15
