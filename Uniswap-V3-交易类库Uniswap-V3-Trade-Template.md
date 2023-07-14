
> Name

Uniswap-V3-交易类库Uniswap-V3-Trade-Template

> Author

发明者量化

> Strategy Description

发明者平台正式接入web3链上合约交互调用, 这个模板是以uniswap v3为例的一个交易类库, 有动手能力的可以轻松接入其它defi交易所

概要的函数调用如下, 详细的文档书写完整以后将合并到平台API文档, 这里先放一些例子


调用合约如果是标准ERC20方法不需要注册，直接调用，第三个参数有很强兼容性可以写方法名,methodId比如"0x571ac8b0"，也可以写完整标准方法名
constant属性的方法直接返回函数结果, 非constant的方法比如approve直接返回广播后的txid
```
exchange.IO("api", tokenAddress, "decimals")
exchange.IO("api", tokenAddress, "approve", 0x......., "0xfffffffffffff")
exchange.IO("api", tokenAddress, "approve(address,uint256)", 0x......., "0xfffffffffffff")
```

调用标准合约以外的方法需要注册ABI内容，详细见此模板代码例子, 注册以后可以调用合约的其它方法
```
exchange.IO("abi", tokenAddress, abiContent)
```

获取合约的ABI内容可以通过下面URL获取, 只取result字段

```
https://api.etherscan.io/api?module=contract&action=getabi&address=0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45
```

如果调用方法是payable, 需要在方法名后加一个转账ETH的值(第四个值)，如下面函数中的参数值为123,当然也可以传字符串的数字

```
exchange.IO("api", ContractV3SwapRouterV2, "multicall(uint256,bytes[])", 123, (new Date().getTime() / 1000) + 3600, "")
```

也可以传入多余的参数指定 gasLimit/gasPrice/nonce

```
exchange.IO("api", ContractV3SwapRouterV2, "multicall(uint256,bytes[])", ..., {gasPrice: 123456, gasLimit: 21000})
```

如果IO第二个参数为`eth`则直接调用节点服务器所有可用的RPC方法, 如

```
exchange.IO("api", "eth",  "eth_getBalance", self.walletAddress, "latest")
```

> 为了方便转账, 额外增加send函数发送ETH

```
exchange.IO("api", "eth",  "send", toAddress, toAmount)
```

> 提供了encode/encodePacked与decode方法, 可以把函数调用编码返回为hex字符串格式, 可以阅读本模板代码里对uniswap v3的multicall调用

```
// can encode with tuple
let types = "tuple(a uint256,b uint8,c address),bytes"
let ret = exchange.IO("encode", types, {
    a: 30,
    b: 20,
    c: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
}, "0011")
Log("encode: ", ret)
// decode tuple
Log("decode:", exchange.IO("decode", types, ret))

// join packed types
let path = exchange.IO("encodePacked", "address,uint24,address", tokenAddressMap['1INCH'], 3000, tokenAddressMap['USDT'])
// pack method call
let rawData = exchange.IO("encode", ContractV3SwapRouterV2, "checkOracleSlippage(bytes,uint24,uint32)", path, 10000, 600)
// parse abi raw data
Log("method hash:", rawData.slice(0, 8))
```

> 可以随时切换私钥, 操作多个地址, 如

```
exchange.IO("key", "219103fb1e058720b8431580cdc61ed77a270bac1f87503145b9e9b5cd8a92ce")
```


> ABI内部变量转换规则

address: 0x开头的字符串
bytes: 十六进制编码的字符串，如"008395"
uint256: 可以是字符串也可以是数字 "0x12345" 或 123 
tuple: 直接传结构体，如{path: "", amountIn: 0x123}
其它类型直接传递



> uniswap 模板调用例子如下, 添加交易所Web3, 填写节点地址与私钥, 私钥可以保存在本地(私钥写为文件路径), 详见API文档

节点地址可以使用infura的免费节点申请后替换为自己的key进行配置 https://mainnet.infura.io/v3/{apikey}

```
$.testUniswap = function() {
    let ex = $.NewUniswapV3()
    Log("walletAddress: ", ex.walletAddress)
    let tokenAddressMap = {
        "ETH": "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
        "USDT": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "1INCH": "0x111111111117dC0aa78b770fA6A738034120C302",
    }
    for (let name in tokenAddressMap) {
        ex.addToken(name, tokenAddressMap[name])
    }

    Log(ex.getPrice('ETH_USDT'))
    Log(ex.getPrice('1INCH_USDT'))
    // swap 0.01 ETH to USDT
    Log(ex.swapToken('ETH', 0.01, 'USDT'))
    let usdtBalance = ex.balanceOf('USDT')
    Log("balance of USDT", usdtBalance)
    // swap USDT to DAI then to ETH
    Log(ex.swapToken('USDT', usdtBalance, 'DAI,ETH'))
    
    Log("balance of ETH", ex.getETHBalance())
    
    // Log(ex.sendETH('0x11111', 0.02))
}

```

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|ChainType|0|ChainType: Default|Ethereum|Arbitrum|Optimism|Avalanche|Polygon|Celo|
|AutoFetchTokens|false|AutoFetchTokens|


> Source (javascript)

``` javascript
/* jshint esversion: 7 */

const ABI_Route = '[{"inputs":[{"internalType":"address","name":"_factoryV2","type":"address"},{"internalType":"address","name":"factoryV3","type":"address"},{"internalType":"address","name":"_positionManager","type":"address"},{"internalType":"address","name":"_WETH9","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"WETH9","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveMax","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveMaxMinusOne","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveZeroThenMax","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"}],"name":"approveZeroThenMaxMinusOne","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes","name":"data","type":"bytes"}],"name":"callPositionManager","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"paths","type":"bytes[]"},{"internalType":"uint128[]","name":"amounts","type":"uint128[]"},{"internalType":"uint24","name":"maximumTickDivergence","type":"uint24"},{"internalType":"uint32","name":"secondsAgo","type":"uint32"}],"name":"checkOracleSlippage","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"uint24","name":"maximumTickDivergence","type":"uint24"},{"internalType":"uint32","name":"secondsAgo","type":"uint32"}],"name":"checkOracleSlippage","outputs":[],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"}],"internalType":"struct IV3SwapRouter.ExactInputParams","name":"params","type":"tuple"}],"name":"exactInput","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMinimum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IV3SwapRouter.ExactInputSingleParams","name":"params","type":"tuple"}],"name":"exactInputSingle","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"bytes","name":"path","type":"bytes"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"}],"internalType":"struct IV3SwapRouter.ExactOutputParams","name":"params","type":"tuple"}],"name":"exactOutput","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"tokenIn","type":"address"},{"internalType":"address","name":"tokenOut","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMaximum","type":"uint256"},{"internalType":"uint160","name":"sqrtPriceLimitX96","type":"uint160"}],"internalType":"struct IV3SwapRouter.ExactOutputSingleParams","name":"params","type":"tuple"}],"name":"exactOutputSingle","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"factory","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"factoryV2","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"getApprovalType","outputs":[{"internalType":"enum IApproveAndCall.ApprovalType","name":"","type":"uint8"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint256","name":"tokenId","type":"uint256"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"}],"internalType":"struct IApproveAndCall.IncreaseLiquidityParams","name":"params","type":"tuple"}],"name":"increaseLiquidity","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"token0","type":"address"},{"internalType":"address","name":"token1","type":"address"},{"internalType":"uint24","name":"fee","type":"uint24"},{"internalType":"int24","name":"tickLower","type":"int24"},{"internalType":"int24","name":"tickUpper","type":"int24"},{"internalType":"uint256","name":"amount0Min","type":"uint256"},{"internalType":"uint256","name":"amount1Min","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"internalType":"struct IApproveAndCall.MintParams","name":"params","type":"tuple"}],"name":"mint","outputs":[{"internalType":"bytes","name":"result","type":"bytes"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes32","name":"previousBlockhash","type":"bytes32"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"bytes[]","name":"data","type":"bytes[]"}],"name":"multicall","outputs":[{"internalType":"bytes[]","name":"results","type":"bytes[]"}],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"positionManager","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"pull","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[],"name":"refundETH","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermit","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowed","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitAllowedIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"deadline","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"selfPermitIfNecessary","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"},{"internalType":"uint256","name":"amountOutMin","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapExactTokensForTokens","outputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountOut","type":"uint256"},{"internalType":"uint256","name":"amountInMax","type":"uint256"},{"internalType":"address[]","name":"path","type":"address[]"},{"internalType":"address","name":"to","type":"address"}],"name":"swapTokensForExactTokens","outputs":[{"internalType":"uint256","name":"amountIn","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"}],"name":"sweepToken","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"token","type":"address"},{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"sweepTokenWithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"int256","name":"amount0Delta","type":"int256"},{"internalType":"int256","name":"amount1Delta","type":"int256"},{"internalType":"bytes","name":"_data","type":"bytes"}],"name":"uniswapV3SwapCallback","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"}],"name":"unwrapWETH9","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amountMinimum","type":"uint256"},{"internalType":"uint256","name":"feeBips","type":"uint256"},{"internalType":"address","name":"feeRecipient","type":"address"}],"name":"unwrapWETH9WithFee","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"uint256","name":"value","type":"uint256"}],"name":"wrapETH","outputs":[],"stateMutability":"payable","type":"function"},{"stateMutability":"payable","type":"receive"}]';
const ABI_Pool = '[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount\",\"type\":\"uint128\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Burn\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount0\",\"type\":\"uint128\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount1\",\"type\":\"uint128\"}],\"name\":\"Collect\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount0\",\"type\":\"uint128\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount1\",\"type\":\"uint128\"}],\"name\":\"CollectProtocol\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"paid0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"paid1\",\"type\":\"uint256\"}],\"name\":\"Flash\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint16\",\"name\":\"observationCardinalityNextOld\",\"type\":\"uint16\"},{\"indexed\":false,\"internalType\":\"uint16\",\"name\":\"observationCardinalityNextNew\",\"type\":\"uint16\"}],\"name\":\"IncreaseObservationCardinalityNext\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint160\",\"name\":\"sqrtPriceX96\",\"type\":\"uint160\"},{\"indexed\":false,\"internalType\":\"int24\",\"name\":\"tick\",\"type\":\"int24\"}],\"name\":\"Initialize\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"owner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"amount\",\"type\":\"uint128\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"name\":\"Mint\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"feeProtocol0Old\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"feeProtocol1Old\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"feeProtocol0New\",\"type\":\"uint8\"},{\"indexed\":false,\"internalType\":\"uint8\",\"name\":\"feeProtocol1New\",\"type\":\"uint8\"}],\"name\":\"SetFeeProtocol\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"sender\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"int256\",\"name\":\"amount0\",\"type\":\"int256\"},{\"indexed\":false,\"internalType\":\"int256\",\"name\":\"amount1\",\"type\":\"int256\"},{\"indexed\":false,\"internalType\":\"uint160\",\"name\":\"sqrtPriceX96\",\"type\":\"uint160\"},{\"indexed\":false,\"internalType\":\"uint128\",\"name\":\"liquidity\",\"type\":\"uint128\"},{\"indexed\":false,\"internalType\":\"int24\",\"name\":\"tick\",\"type\":\"int24\"}],\"name\":\"Swap\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"internalType\":\"uint128\",\"name\":\"amount\",\"type\":\"uint128\"}],\"name\":\"burn\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"internalType\":\"uint128\",\"name\":\"amount0Requested\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"amount1Requested\",\"type\":\"uint128\"}],\"name\":\"collect\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"amount0\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"amount1\",\"type\":\"uint128\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint128\",\"name\":\"amount0Requested\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"amount1Requested\",\"type\":\"uint128\"}],\"name\":\"collectProtocol\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"amount0\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"amount1\",\"type\":\"uint128\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"factory\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"fee\",\"outputs\":[{\"internalType\":\"uint24\",\"name\":\"\",\"type\":\"uint24\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"feeGrowthGlobal0X128\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"feeGrowthGlobal1X128\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"flash\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint16\",\"name\":\"observationCardinalityNext\",\"type\":\"uint16\"}],\"name\":\"increaseObservationCardinalityNext\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint160\",\"name\":\"sqrtPriceX96\",\"type\":\"uint160\"}],\"name\":\"initialize\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"liquidity\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"\",\"type\":\"uint128\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"maxLiquidityPerTick\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"\",\"type\":\"uint128\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"},{\"internalType\":\"uint128\",\"name\":\"amount\",\"type\":\"uint128\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"mint\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"amount0\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"amount1\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"name\":\"observations\",\"outputs\":[{\"internalType\":\"uint32\",\"name\":\"blockTimestamp\",\"type\":\"uint32\"},{\"internalType\":\"int56\",\"name\":\"tickCumulative\",\"type\":\"int56\"},{\"internalType\":\"uint160\",\"name\":\"secondsPerLiquidityCumulativeX128\",\"type\":\"uint160\"},{\"internalType\":\"bool\",\"name\":\"initialized\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint32[]\",\"name\":\"secondsAgos\",\"type\":\"uint32[]\"}],\"name\":\"observe\",\"outputs\":[{\"internalType\":\"int56[]\",\"name\":\"tickCumulatives\",\"type\":\"int56[]\"},{\"internalType\":\"uint160[]\",\"name\":\"secondsPerLiquidityCumulativeX128s\",\"type\":\"uint160[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bytes32\",\"name\":\"\",\"type\":\"bytes32\"}],\"name\":\"positions\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"liquidity\",\"type\":\"uint128\"},{\"internalType\":\"uint256\",\"name\":\"feeGrowthInside0LastX128\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"feeGrowthInside1LastX128\",\"type\":\"uint256\"},{\"internalType\":\"uint128\",\"name\":\"tokensOwed0\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"tokensOwed1\",\"type\":\"uint128\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"protocolFees\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"token0\",\"type\":\"uint128\"},{\"internalType\":\"uint128\",\"name\":\"token1\",\"type\":\"uint128\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint8\",\"name\":\"feeProtocol0\",\"type\":\"uint8\"},{\"internalType\":\"uint8\",\"name\":\"feeProtocol1\",\"type\":\"uint8\"}],\"name\":\"setFeeProtocol\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"slot0\",\"outputs\":[{\"internalType\":\"uint160\",\"name\":\"sqrtPriceX96\",\"type\":\"uint160\"},{\"internalType\":\"int24\",\"name\":\"tick\",\"type\":\"int24\"},{\"internalType\":\"uint16\",\"name\":\"observationIndex\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"observationCardinality\",\"type\":\"uint16\"},{\"internalType\":\"uint16\",\"name\":\"observationCardinalityNext\",\"type\":\"uint16\"},{\"internalType\":\"uint8\",\"name\":\"feeProtocol\",\"type\":\"uint8\"},{\"internalType\":\"bool\",\"name\":\"unlocked\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int24\",\"name\":\"tickLower\",\"type\":\"int24\"},{\"internalType\":\"int24\",\"name\":\"tickUpper\",\"type\":\"int24\"}],\"name\":\"snapshotCumulativesInside\",\"outputs\":[{\"internalType\":\"int56\",\"name\":\"tickCumulativeInside\",\"type\":\"int56\"},{\"internalType\":\"uint160\",\"name\":\"secondsPerLiquidityInsideX128\",\"type\":\"uint160\"},{\"internalType\":\"uint32\",\"name\":\"secondsInside\",\"type\":\"uint32\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"recipient\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"zeroForOne\",\"type\":\"bool\"},{\"internalType\":\"int256\",\"name\":\"amountSpecified\",\"type\":\"int256\"},{\"internalType\":\"uint160\",\"name\":\"sqrtPriceLimitX96\",\"type\":\"uint160\"},{\"internalType\":\"bytes\",\"name\":\"data\",\"type\":\"bytes\"}],\"name\":\"swap\",\"outputs\":[{\"internalType\":\"int256\",\"name\":\"amount0\",\"type\":\"int256\"},{\"internalType\":\"int256\",\"name\":\"amount1\",\"type\":\"int256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int16\",\"name\":\"\",\"type\":\"int16\"}],\"name\":\"tickBitmap\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"tickSpacing\",\"outputs\":[{\"internalType\":\"int24\",\"name\":\"\",\"type\":\"int24\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"int24\",\"name\":\"\",\"type\":\"int24\"}],\"name\":\"ticks\",\"outputs\":[{\"internalType\":\"uint128\",\"name\":\"liquidityGross\",\"type\":\"uint128\"},{\"internalType\":\"int128\",\"name\":\"liquidityNet\",\"type\":\"int128\"},{\"internalType\":\"uint256\",\"name\":\"feeGrowthOutside0X128\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"feeGrowthOutside1X128\",\"type\":\"uint256\"},{\"internalType\":\"int56\",\"name\":\"tickCumulativeOutside\",\"type\":\"int56\"},{\"internalType\":\"uint160\",\"name\":\"secondsPerLiquidityOutsideX128\",\"type\":\"uint160\"},{\"internalType\":\"uint32\",\"name\":\"secondsOutside\",\"type\":\"uint32\"},{\"internalType\":\"bool\",\"name\":\"initialized\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token0\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"token1\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]'
const ABI_Factory = '[{\"inputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"uint24\",\"name\":\"fee\",\"type\":\"uint24\"},{\"indexed\":true,\"internalType\":\"int24\",\"name\":\"tickSpacing\",\"type\":\"int24\"}],\"name\":\"FeeAmountEnabled\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"oldOwner\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"newOwner\",\"type\":\"address\"}],\"name\":\"OwnerChanged\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token0\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"address\",\"name\":\"token1\",\"type\":\"address\"},{\"indexed\":true,\"internalType\":\"uint24\",\"name\":\"fee\",\"type\":\"uint24\"},{\"indexed\":false,\"internalType\":\"int24\",\"name\":\"tickSpacing\",\"type\":\"int24\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"pool\",\"type\":\"address\"}],\"name\":\"PoolCreated\",\"type\":\"event\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"tokenA\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"tokenB\",\"type\":\"address\"},{\"internalType\":\"uint24\",\"name\":\"fee\",\"type\":\"uint24\"}],\"name\":\"createPool\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"pool\",\"type\":\"address\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint24\",\"name\":\"fee\",\"type\":\"uint24\"},{\"internalType\":\"int24\",\"name\":\"tickSpacing\",\"type\":\"int24\"}],\"name\":\"enableFeeAmount\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint24\",\"name\":\"\",\"type\":\"uint24\"}],\"name\":\"feeAmountTickSpacing\",\"outputs\":[{\"internalType\":\"int24\",\"name\":\"\",\"type\":\"int24\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"},{\"internalType\":\"uint24\",\"name\":\"\",\"type\":\"uint24\"}],\"name\":\"getPool\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"owner\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"parameters\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"factory\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token0\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"token1\",\"type\":\"address\"},{\"internalType\":\"uint24\",\"name\":\"fee\",\"type\":\"uint24\"},{\"internalType\":\"int24\",\"name\":\"tickSpacing\",\"type\":\"int24\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_owner\",\"type\":\"address\"}],\"name\":\"setOwner\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"}]'

let ContractV3Factory = "0x1F98431c8aD98523631AE4a59f267346ea31F984"
let ContractV3SwapRouterV2 = "0x68b3465833fb72A70ecDF485E0e4C7bD8665Fc45"


function computePoolPrice(decimals0, decimals1, sqrtPriceX96) {
    // sqrtPriceX96 = sqrt(price) * 2^96
    [decimals0, decimals1, sqrtPriceX96] = [decimals0, decimals1, sqrtPriceX96].map(BigInt);
    const TWO = BigInt(2);
    const TEN = BigInt(10);
    const SIX_TENTH = BigInt(1000000);
    const Q192 = (TWO ** BigInt(96)) ** TWO;
    return (
        Number((sqrtPriceX96 ** TWO * TEN ** decimals0 * SIX_TENTH) / (Q192 * TEN ** decimals1)) /
        Number(SIX_TENTH)
    );
}

function toAmount(s, decimals) {
    return Number((BigDecimal(BigInt(s)) / BigDecimal(Math.pow(10, decimals))).toString())
}

function toInnerAmount(n, decimals) {
    return (BigDecimal(n) * BigDecimal(Math.pow(10, decimals))).toFixed(0)
}

$.NewUniswapV3 = function(e) {
    e = e || exchange
    if (e.GetName() !== 'Web3') {
        panic("only support Web3 exchange")
    }

    let self = {
        tokenInfo: {},
        walletAddress: e.IO("address"),
        pool: {}
    }


    self.init = function() {
        if (typeof(ChainType) === 'number') {
            let chainRpc = [
                '',
                'https://rpc.ankr.com/eth',
                'https://arb1.arbitrum.io/rpc',
                'https://mainnet.optimism.io/',
                'https://rpc.ankr.com/avalanche',
                'https://polygon-rpc.com',
                'https://rpc.ankr.com/celo',
                //'https://mainnet.aurora.dev',
                //'https://bsc-dataseed.binance.org',
                //'https://exchainrpc.okex.org'
            ][ChainType]
            if (chainRpc && chainRpc.length > 0) {
                e.IO("base", chainRpc)
                Log("change base rpc to", chainRpc)
            }
        }

        // https://docs.uniswap.org/contracts/v3/reference/deployments
        let WETHAddress = {
            1: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2", // Ethereum
            3: "0xc778417E063141139Fce010982780140Aa0cD5Ab", // Ropsten
            4: "0xc778417E063141139Fce010982780140Aa0cD5Ab", // Rinkeby
            5: "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6", // Goerli
            42: "0xd0A1E359811322d97991E03f863a0C30C2cF029C", // Kovan
            10: "0x4200000000000000000000000000000000000006", // Optimism
            69: "0x4200000000000000000000000000000000000006", // Optimistic Kovan
            42161: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1", // Arbitrum One
            421611: "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681", // Arbitrum Rinkeby
            137: "0x0d500B1d8E8eF31E21C99d1Db9A6444d3ADf1270", // Polygon
            80001: "0x9c3C9283D3e44854697Cd22D3Faa240Cfb032889", // Polygon Mumbai
        }

        let chainId = e.IO("api", "ETH", "eth_chainId")
        if (chainId) {
            chainId = Number(chainId)
            Log("chainId: ", chainId)
            let addr = WETHAddress[chainId]
            if (addr) {
                Log("Register WETH address", addr)
                self.addToken("ETH", addr)
            }
            if (chainId == 42220) {
                // Celo Address
                ContractV3Factory = '0xAfE208a311B21f13EF87E33A90049fC17A7acDEc'
                ContractV3SwapRouterV2 = '0x5615CDAb10dc425a742d643d949a7F474C01abc4'
                self.addToken('CELO', '0x471ece3750da237f93b8e339c536989b8978a438')
            } else if (chainId == 42161) {
                self.addToken('USDT', '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9')
            }
        } else {
            panic("get chain Id error")
        }

        // register
        e.IO("abi", ContractV3Factory, ABI_Factory)
        e.IO("abi", ContractV3SwapRouterV2, ABI_Route)

        if (AutoFetchTokens) {
            let res = JSON.parse(HttpQuery("https://tokens.coingecko.com/uniswap/all.json"))
            Log("fetch", res.tokens.length, "tokens from", res.name)
            res.tokens.forEach(function(token) {
                if (token.chainId == chainId && token.symbol != "WETH") {
                    self.tokenInfo[token.symbol] = {
                        name: token.symbol,
                        decimals: token.decimals,
                        address: token.address
                    }
                }
            })
        }
    }
    self.addToken = function(name, address) {
        let ret = e.IO("api", address, "decimals")
        if (!ret) {
            throw "get token decimals failed"
        }
        let decimals = Number(ret)
        self.tokenInfo[name] = {
            name: name,
            decimals: decimals,
            address: address
        }
    }
    self.waitMined = function(tx) {
        while (true) {
            Sleep(1000)
            let info = e.IO("api", "eth", "eth_getTransactionReceipt", tx)
            if (info && info.gasUsed) {
                return true
            }
            Log('Transaction not yet mined', tx)
        }
    }

    self.swapToken = function(tokenIn, amountInDecimal, tokenOut, options) {
        // options like {gasPrice: 11, gasLimit: 111, nonce: 111}
        let tokenInInfo = self.tokenInfo[tokenIn]
        if (!tokenInInfo) {
            throw "not found token info " + tokenIn
        }
        let tokenOutInfo = null

        tokenOut.split(',').forEach(function(token) {
            tokenOutInfo = self.tokenInfo[token]
            if (!tokenOutInfo) {
                throw "not found token info " + token
            }
        })

        if (!tokenOutInfo) {
            throw "not found token out info"
        }

        let amountIn = toInnerAmount(amountInDecimal, tokenInInfo.decimals)
        let recipientAddress = self.walletAddress
        if (tokenInInfo.name != 'ETH') {
            let allowanceAmount = e.IO("api", tokenInInfo.address, "allowance", self.walletAddress, ContractV3SwapRouterV2);
            let realAmount = toAmount(allowanceAmount, tokenInInfo.decimals)
            if (realAmount < toAmount(amountIn, tokenInInfo.decimals)) {
                Log("realAmount is", realAmount, "too small, try to approve large amount")
                if (tokenInInfo.name == 'USDT') {
                    // As described in Tether code: To change the approve amount you first have to reduce the addresses allowance to 0 calling approve(spender, 0)
                    let txApprove = e.IO("api", tokenInInfo.address, "approve", ContractV3SwapRouterV2, 0)
                    if (!txApprove) {
                        throw "approve error"
                    }
                    Log("wait reduce approve", txApprove)
                    self.waitMined(txApprove)
                }

                let txApprove = e.IO("api", tokenInInfo.address, "approve", ContractV3SwapRouterV2, '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff');
                if (!txApprove) {
                    throw "approve error"
                }
                Log("wait approve", txApprove)
                self.waitMined(txApprove)
                Log("approve success amountIn", amountIn)
            } else {
                Log("allowance", realAmount, "no need to approve")
            }
        }

        if (tokenOutInfo.name == 'ETH' || tokenOutInfo.address.toLowerCase() == '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2') {
            /*
            ADDRESS_THIS https://degencode.substack.com/p/uniswapv3-multicall
            https://etherscan.io/address/0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45#code
            */
            recipientAddress = '0x0000000000000000000000000000000000000002'
        }
        let fee = e.IO("encodePacked", "uint24", 3000) // 3 bytes
        // https://github.com/Uniswap/v3-periphery/blob/main/contracts/libraries/Path.sol
        let path = tokenInInfo.address.slice(2).toLowerCase()
        tokenOut.split(',').forEach(function(token) {
            // address only use 20 bytes
            path += fee + self.tokenInfo[token].address.slice(2).toLowerCase()
        })
        let minOut = 1
        if (options && typeof(options.minOut) == 'number') {
            minOut = toInnerAmount(options.minOut, tokenOutInfo.decimals)
        }
        let swapToken = e.IO("encode", ContractV3SwapRouterV2, "exactInput", {
            path: path,
            recipient: recipientAddress,
            amountIn: amountIn,
            amountOutMinimum: minOut
        })

        let data = [swapToken]
        if (tokenOutInfo.name == 'ETH') {
            data.push(e.IO("encode", ContractV3SwapRouterV2, "unwrapWETH9(uint256,address)", 1, self.walletAddress))
        }
        let tx = e.IO("api", ContractV3SwapRouterV2, "multicall(uint256,bytes[])", (tokenInInfo.name == 'ETH' ? amountIn : 0), (new Date().getTime() / 1000) + 3600, data, options || {})
        if (tx) {
            Log("tx: ", tx)
            self.waitMined(tx)
            Log("swap", tokenInInfo.name, "to", tokenOutInfo.name, "success")
            return true
        } else {
            Log("trans error")
            return false
        }
    }

    self.getETHBalance = function(address) {
        return toAmount(e.IO("api", "eth", "eth_getBalance", address || self.walletAddress, "latest"), 18)
    }

    self.balanceOf = function(token, address) {
        let tokenInfo = self.tokenInfo[token]
        if (!tokenInfo) {
            throw "not found token info " + token
        }

        return toAmount(e.IO("api", tokenInfo.address, "balanceOf", address || self.walletAddress), tokenInfo.decimals)
    }

    self.sendETH = function(to, amount, options) {
        return e.IO("api", "eth", "send", to, toInnerAmount(amount, 18), options || {})
    }
    
    self.transferToken = function(token, to, amount) {
        let tokenInfo = self.tokenInfo[token]
        if (!tokenInfo) {
            throw "not found token info " + token
        }
        return e.IO("api", tokenInfo.address, "transfer", to, toInnerAmount(amount, tokenInfo.decimals))
    }
    
    // uniswap methods
    self.getPrice = function(pair, fee) {
        // fee can be 100,500,3000,10000
        let arr = pair.split('_')
        let token0 = self.tokenInfo[arr[0]]
        if (!token0) {
            throw "token " + arr[0] + "not found"
        }
        let token1 = self.tokenInfo[arr[1]]
        if (!token1) {
            throw "token " + arr[1] + "not found"
        }
        let reverse = false
        if (BigInt(token0.address) > BigInt(token1.address)) {
            let tmp = token0
            token0 = token1
            token1 = tmp
            reverse = true
        }
        if (typeof(fee) !== 'number') {
            fee = 3000
        }
        let key = token0.address + '/' + token1.address + '/' + fee.toString()
        if (typeof(self.pool[key]) == 'undefined') {
            let pool = e.IO("api", ContractV3Factory, "getPool", token0.address, token1.address, fee)
            if (pool) {
                self.pool[key] = pool
                // register pool address
                e.IO("abi", pool, ABI_Pool)
            }
        }
        if (typeof(self.pool[key]) == 'undefined') {
            throw "pool " + pair + " not found"
        }

        let slot0 = e.IO("api", self.pool[key], "slot0")

        if (!slot0) {
            return null
        }
        //Log(pair, token0.decimals, token1.decimals, slot0.sqrtPriceX96)

        let price = computePoolPrice(token0.decimals, token1.decimals, slot0.sqrtPriceX96)
        if (reverse) {
            price = 1 / price
        }
        return price
    }
    
    
    self.init()
    return self
}

$.testUniswap = function() {
    let ex = $.NewUniswapV3()
    Log("walletAddress: ", ex.walletAddress)
    let tokenAddressMap = {
        "USDT": "0xdac17f958d2ee523a2206206994597c13d831ec7",
        "1INCH": "0x111111111117dC0aa78b770fA6A738034120C302",
        "USDC": "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
        "DAI": "0x6b175474e89094c44da98b954eedeac495271d0f",
    }
    for (let name in tokenAddressMap) {
        ex.addToken(name, tokenAddressMap[name])
    }

    Log(ex.getPrice('ETH_USDT'))
    Log(ex.getPrice('1INCH_USDT'))

    // swap 0.01 ETH to USDT
    Log(ex.swapToken('ETH', 0.01, 'USDT'))
    let usdtBalance = ex.balanceOf('USDT')
    Log("balance of USDT", usdtBalance)

    // swap USDT to DAI then DAI to ETH
    Log(ex.swapToken('USDT', usdtBalance, 'DAI,ETH'))

    Log("balance of ETH", ex.getETHBalance())

    // Log(ex.sendETH('0x11111', 0.02))

    // test pack and unpack
    if (false) {
        // can pack tuple
        let types = "tuple(a uint256,b uint8,c address),bytes"
        let ret = exchange.IO("pack", types, {
            a: 30,
            b: 20,
            c: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2"
        }, "0011")
        Log("encode: ", ret)
        // unpack tuple
        Log("decode:", exchange.IO("decode", types, ret))

        // join packed types
        let path = exchange.IO("encodePacked", "address,uint24,address", tokenAddressMap['1INCH'], 3000, tokenAddressMap['USDT'])
        Log("path:", path)
        // encode method call
        let rawData = exchange.IO("encode", ContractV3SwapRouterV2, "checkOracleSlippage(bytes,uint24,uint32)", path, 10000, 600)
        // parse abi raw data
        Log("method hash:", rawData.slice(0, 8))
    }
}
```

> Detail

https://www.fmz.com/strategy/397260

> Last Modified

2023-03-15 15:35:03
