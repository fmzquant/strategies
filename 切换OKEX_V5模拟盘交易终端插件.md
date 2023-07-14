
> Name

切换OKEX_V5模拟盘交易终端插件

> Author

小小梦

> Strategy Description

## 交易终端OKEX_V5模拟盘切换插件

当配置好OKEX V5交易所对象时(使用OKEX V5的模拟盘API KEY配置)，由于没有切换模拟盘环境，会有如下报错：

```
{"msg":"Broker id of APIKey does not match current environment.","code":"50101"}
```

可以使用该插件切换，如图：

- #### 点击添加按钮：

  ![IMG](https://www.fmz.com/upload/asset/1789d89b0004425112f5.png) 

- #### 选择插件：

  ![IMG](https://www.fmz.com/upload/asset/1714b6edacde6828eba2.png) 

- #### 执行插件

  ![IMG](https://www.fmz.com/upload/asset/169ace291c5d0da6e210.png) 

- #### 立即执行

  ![IMG](https://www.fmz.com/upload/asset/170bac2eacc494c2eba3.png)  

- #### 模拟盘资产就读取出来了

  ![IMG](https://www.fmz.com/upload/asset/168a45cf491f249d7189.png) 

如果要切换回实盘环境，勾掉选项再次执行即可。



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
