
> Name

JavaScript版K线数据行情收集器

> Author

小小梦

> Strategy Description

## JavaScript版K线数据行情收集器

相关文章：https://www.fmz.com/bbs-topic/6744

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|tableName|testRecords_min1|储存K线数据的表名称|




|Button|Default|Description|
|----|----|----|
|refreshRecords|__button__|刷新K线图表|
|deleteBDTable|__button__|删除数据库表|
|initCollecter|__button__|初始化收集器|


> Source (javascript)

``` javascript
var collecter = {}
collecter.init = function(tableName) {
	this.preBarTS = 0
	this.tableName = tableName
    this.tableAvaliable = false 
    // 检测tableName表
    if (typeof(tableName) == "undefined" || typeof(tableName) != "string") {
    	Log(tableName)
        throw "tableName error!"
    }

    // SELECT * FROM RECORDS_MIN1 LIMIT 1
    var strSql = "SELECT * FROM " + tableName + " LIMIT 1"
    var ret = DBExec(strSql)    
    if (!ret) {
    	// 表不存在，创建表
        Log("尝试读取表", this.tableName, "的数据，读取失败，开始创建表", this.tableName)
    	var strSql = [
            "CREATE TABLE " + tableName + "(", 
            "TS INT PRIMARY KEY NOT NULL,",
            "HIGH REAL NOT NULL,", 
            "OPEN REAL NOT NULL,", 
            "LOW REAL NOT NULL,", 
            "CLOSE REAL NOT NULL,", 
            "VOLUME REAL NOT NULL)"
        ].join("")
        ret = DBExec(strSql)
        if (!ret) {
        	throw "创建" + tableName + "表失败！"
        }
        Log("创建", tableName, "表", ret)
    }
    Log(this.tableName, ret)
    this.tableAvaliable = true 
}

collecter.run = function(records) {
    if (!this.tableAvaliable) {
        return 
    }
	var len = records.length
	var lastBar = records[len - 1]
	var beginBar = records[0]
	var ret = null 
    if (this.preBarTS == 0) {
        // 初始
        /*
		DELETE FROM table_name WHERE [condition];
        */
        var strSql = "DELETE FROM " + this.tableName + " WHERE TS >= " + beginBar.Time + ";"
        ret = DBExec(strSql)
        Log("删除与当前记录重复部分", ret)

        // 写入
        ret = DBExec("BEGIN")
        Log("BEGIN:", ret)
        for (var i = 0 ; i < len - 1 ; i++) {
        	var strSql = [
                "INSERT INTO " + this.tableName + " (TS, HIGH, OPEN, LOW, CLOSE, VOLUME) ", 
                `VALUES (${records[i].Time}, ${records[i].High}, ${records[i].Open}, ${records[i].Low}, ${records[i].Close}, ${records[i].Volume});`
            ].join("")
            DBExec(strSql)
        }
        ret = DBExec("COMMIT")
        Log("COMMIT:", ret)
        this.preBarTS = lastBar.Time
    } else if(this.preBarTS != lastBar.Time) {
        // 更新
        var strSql = [
            "INSERT INTO " + this.tableName + " (TS, HIGH, OPEN, LOW, CLOSE, VOLUME) ", 
            `VALUES (${records[len-2].Time}, ${records[len-2].High}, ${records[len-2].Open}, ${records[len-2].Low}, ${records[len-2].Close}, ${records[len-2].Volume});`
        ].join("")
        ret = DBExec(strSql)
        Log("INSERT:", ret)
        this.preBarTS = lastBar.Time
    }
}

collecter.getRecords = function() {
	// 读取数据库
    var strSql = "SELECT * FROM " + this.tableName + ";"
    var ret = DBExec(strSql)
    // Log("SELECT * FROM .. :", ret)
    // SELECT * FROM .. : {"columns":["TS","HIGH","OPEN","LOW","CLOSE","VOLUME"],"values":[[1616110200000,58085.9,57716.2,57664.3,57757.6,24.216], ...]}
    var arr = ret.values 
    var r = []
    for (var i = 0 ; i < arr.length ; i++) {
        r.push({
        	Time : arr[i][0],
        	High : arr[i][1],
        	Open : arr[i][2],
        	Low : arr[i][3],
        	Close : arr[i][4],
        	Volume : arr[i][5]
        })
    }
    return r
}

collecter.deleteTable = function() {
    // DROP TABLE database_name.table_name;
    var strSql = "DROP TABLE " + this.tableName
    var ret = DBExec(strSql)
    if (!ret) {
        Log("删除表", this.tableName, "失败：", ret)
    } else {
        Log("删除表", this.tableName, " DROP TABLE:", ret)
        this.tableAvaliable = false 
    }
}

function main() {
	collecter.init(tableName)
    while(true) {    
    	var r = _C(exchange.GetRecords)
        // records tbl
        var rTbl = {
            type : "table", 
            title : "数据",
            cols : ["strTime", "Time", "High", "Open", "Low", "Close", "Volume"], 
            rows : [] 
        }
        var arrR = []
        if (collecter.tableAvaliable) {
            arrR = collecter.getRecords()
        }
        for (var i = arrR.length - 1; (i > arrR.length - 1 - 9) && (i >= 0); i--) {
            var bar = arrR[i]
            rTbl.rows.push([_D(bar.Time), bar.Time, bar.High, bar.Open, bar.Low, bar.Close, bar.Volume])
        }
    	LogStatus(_D(), "获取的K线数据长度：", arrR.length, ", collecter.tableAvaliable:", collecter.tableAvaliable, "\n", 
            "`" + JSON.stringify(rTbl) + "`")
    	collecter.run(r)

    	// 交互测试
    	var cmd = GetCommand()
        if(cmd) {
            // 处理交互
            Log("交互命令：", cmd)
            var arr = cmd.split(":")
            // 从数据库中读取K线数据，刷新图表
            if(arr[0] == "refreshRecords") {
                if (collecter.tableAvaliable) {
                    var records = collecter.getRecords()
                    $.PlotRecords(records, collecter.tableName)   // 使用画线类库画图
                } else {
                    Log("对应的数据库表不存在 collecter.tableAvaliable:", collecter.tableAvaliable)
                }
            } else if (arr[0] == "deleteBDTable") {     // 删除数据库表
                collecter.deleteTable()
            } else if (arr[0] == "initCollecter") {     // 初始化收集器
                Log("初始化收集器")
                collecter.init(tableName)
            }
        }
    	Sleep(5000)
    }
}



```

> Detail

https://www.fmz.com/strategy/267223

> Last Modified

2021-03-30 11:57:49
