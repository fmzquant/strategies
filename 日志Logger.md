
> Name

日志Logger

> Author

fmzero

> Strategy Description

设置不同的level，控制日志输出等级

> Strategy Arguments



|Argument|Default|Description|
|----|----|----|
|level|0|日志级别: 调试|信息|警告|错误|


> Source (javascript)

``` javascript
//var COLOR_ERROR = "#FF0000"
//var COLOR_WARN = "#FF0000"
//var COLOR_INFO = "#0000FF"
//var COLOR_DEBUG = "#000000"
var LEVER_PATTERN = {
  DEBUG: 0,
  INFO: 1,
  WARNING: 2,
  ERROR: 3
}
//var loggerLever = [LEVER_PATTERN.DEBUG, LEVER_PATTERN.INFO, LEVER_PATTERN.WARNING, LEVER_PATTERN.ERROR][level]
$.Error = function(msg) {
  Log('[ERR] ', msg, '#FF0000')
}

$.Warn = function(msg) {
  if(level <= LEVER_PATTERN.WARNING) {
    Log('[WAR] ', msg, '#FF0000')
  }  
}

$.Info = function(msg) {
  if(level <= LEVER_PATTERN.INFO) {
    Log('[INF] ', msg, '#0000FF')
  }
}

$.Debug = function(msg) {
  if(level <= LEVER_PATTERN.DEBUG) {
    Log('[DBG] ', msg, '#000000')
  }
}

function main() {
  $.Error('this is error')
  $.Warn('this is warn')
  $.Info('this is info')
  $.Debug('this is debug')
}

```

> Detail

https://www.fmz.com/strategy/151754

> Last Modified

2020-01-20 10:17:59
