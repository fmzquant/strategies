
> Name

火币U合约资金划转插件

> Author

xunfeng91



> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|typeIndex|0|划转类型: 母子账户划转|同账号不同账户划转|
|subuid||子账户UID|
|asset|USDT|划转币种|
|from_margin_account|USDT|转出的保证金账户|
|to_margin_account|USDT|转入的保证金账户|
|amount|10000|划转数量|
|direct|0|账户划转方向: 母到子|子到母|


> Source (javascript)

``` javascript


/*
1、母子账户划转
2、同账号不同保证金账户的划转
*/ 

var type = [1,2][typeIndex]
function swap_master_sub_transfer( e , cur , amount , direct ){
    try {
        var params = ''
        var 币种 = cur
        var 划转数量 = amount
        var exname = e.GetName()
        var sub_uid = subuid
        if (!sub_uid){
            Log("请正确账户UID")
            return
        }
        var frommarginaccount = from_margin_account=="USDT"?from_margin_account:from_margin_account+"-USDT"
        var tomarginaccount = to_margin_account=="USDT"?to_margin_account:to_margin_account+"-USDT"
        transdirect = ["master_to_sub","sub_to_master"][direct]
        params ={"contract_code":frommarginaccount}
        if (amount == -1){
            if(frommarginaccount=="USDT"){//全仓
                var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_cross_account_info" )
                划转数量 =parseFloat(ret1.data[0].withdraw_available)
            }else{
                var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_account_info" ,"",  JSON.stringify( params ) )
                划转数量 =parseFloat(ret1.data[0].withdraw_available)
            }            
        }
        if( exname == 'Futures_HuobiDM'){
            var 划转类型 = transdirect
            params ={
                "sub_uid": sub_uid , 
                "asset": 币种 , 
                "from_margin_account":frommarginaccount,
                "to_margin_account":tomarginaccount,
                "amount": 划转数量, 
                "type" : 划转类型,
                "timestamp" : new Date().getTime()    
			}
			Log( "划转币种:",币种,"划转数量:",划转数量,"划转类型:",划转类型)
            var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_master_sub_transfer" ,"",  JSON.stringify( params ) )
			Log(ret1)
        }
    } catch (error) { 
        Log( error )
    }  
}

function swap_transfer_inner( e , cur , amount ){
    try {
        var params = ''
        var 币种 = cur
        var 划转数量 = amount
        var exname = e.GetName()
        var frommarginaccount = from_margin_account=="USDT"?from_margin_account:from_margin_account+"-USDT"
        var tomarginaccount = to_margin_account=="USDT"?to_margin_account:to_margin_account+"-USDT"
        params ={"contract_code":frommarginaccount}
        if (amount == -1){
            if(frommarginaccount=="USDT"){//全仓
                var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_cross_account_info" )
                划转数量 =_N(parseFloat(ret1.data[0].withdraw_available),6)
            }else{
                var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_account_info" ,"",  JSON.stringify( params ) )
                划转数量 =_N(parseFloat(ret1.data[0].withdraw_available),6)
            }            
        }
        if( exname == 'Futures_HuobiDM'){
            params ={
                "asset": 币种 , 
                "from_margin_account":frommarginaccount,
                "to_margin_account":tomarginaccount,
                "amount": 划转数量, 
                "timestamp" : new Date().getTime()    
			}
			Log( "划转币种:",币种,"划转数量:",划转数量,)
            var ret1 = e.IO("api", "POST", "/linear-swap-api/v1/swap_transfer_inner" ,"",  JSON.stringify( params ) )
			Log(ret1)
        }
    } catch (error) { 
        Log( error )
    }

}

function main() {
    if (type==1){
        swap_master_sub_transfer( exchange , asset , amount , direct )
    }
    if (type==2){
        swap_transfer_inner( exchange , asset , amount )
    }
    
}
```

> Detail

https://www.fmz.com/strategy/255402

> Last Modified

2021-02-26 14:32:55
