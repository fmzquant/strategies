
> Name

OKEX-V5-Simulated-Trading-Terminal-Switch-Plugin

> Author

发明者量化-小小梦

> Strategy Description

## OKEX V5 Simulated Trading Terminal Switch Plugin

When an OKEX V5 exchange object is configured with an OKEX V5 simulated-trading API key, the following error appears if the simulated environment has not been switched on:

```
{"msg":"Broker id of APIKey does not match current environment.","code":"50101"}
```

You can use this plugin to switch environments, as shown below:

- #### Click the Add button:

  ![IMG](https://www.fmz.com/upload/asset/1789d89b0004425112f5.png) 

- #### Select the plugin:

  ![IMG](https://www.fmz.com/upload/asset/1714b6edacde6828eba2.png) 

- #### Run the plugin:

  ![IMG](https://www.fmz.com/upload/asset/169ace291c5d0da6e210.png) 

- #### Run immediately:

  ![IMG](https://www.fmz.com/upload/asset/170bac2eacc494c2eba3.png)  

- #### The simulated-trading assets can now be read:

  ![IMG](https://www.fmz.com/upload/asset/168a45cf491f249d7189.png) 

If you want to switch back to the live-trading environment, uncheck the option and run it again.

> Source (javascript)

``` javascript
function main() {    
    exchange.IO("simulate", true)
    return "已经切换为OKEX V5模拟盘"
}
```

> Detail

https://www.fmz.com/strategy/288769

> Last Modified

2021-06-08 15:08:47
