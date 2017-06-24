/*
策略出处: https://www.botvs.com/strategy/8487
策略名称: 【Demo】速度测试 websocket vs rest (复制)5560
策略作者: 总值约: 23938.37 元
策略描述:

websocket 测试，支持添加多个交易所测试，注意会短时增加你的api调用频率，请在确保不影响其他机器人运行的情况下运行。如果出现”Futures_OP 4: argument error“的错误，请更新到最新的托管者程序

*/



var Interval=1000;

function _N(v, precision) {



    if (typeof (precision) != 'number') {



        precision = 4;



    }



    var d = parseFloat(v.toFixed(Math.max(10, precision + 5)));



    s = d.toString().split(".");



    if (s.length < 2 || s[1].length <= precision) {



        return	d;



    }


    var b = Math.pow(10, precision);



    return	Math.floor(d * b) / b;



}




function onexit() {
   
    Log("【【【系统退出】】】");
} 


function main() {

   

	var start=Date.now();
   
    

 for (var i = 0; i < exchanges.length; i++) {


    var ecg=exchanges[i];
    //Log(ecg);
   
    ecg.IO("rest");//rest 模式
    var iii=0;
    var sum=0;
    while (iii<=10) {  //连续调用10次，取平均值
       
        var account = null;
        start=Date.now();       
        account = ecg.GetAccount();  //测试执行的API函数，可根据需要自己修改，如 GetTick
        iii=iii+1;
        if(account){
            var delay=(Date.now()-start);
            sum=sum+delay;            
             
        }




        Sleep(1000);
    
    }
     Log("平均毫秒数【"+_N(sum/iii,2)+"】"+ecg.GetName()+" rest"); 
     
     ecg.IO("websocket"); //websocket 模式
    sum=0;
    iii=0;
    while (iii<=10) {  //连续调用10次，取平均值
       
        var account = null;
        start=Date.now();       
        account = ecg.GetAccount();  //测试执行的API函数，可根据需要自己修改，如 GetTick
        iii=iii+1;
        if(account){
            var delay=(Date.now()-start);
            sum=sum+delay;            
             
        }




        Sleep(1000); 
    
    }
     Log("平均毫秒数【"+_N(sum/iii,2)+"】"+ecg.GetName()+" websocket"); 
 }
}





