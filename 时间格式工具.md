
> Name

时间格式工具

> Author

huangsibo





> Source (javascript)

``` javascript
/*
 * @Author: sibohuang
 * @Date: 2019-08-10 09:36:03
 * @LastEditors: sibohuang
 * @LastEditTime: 2019-08-10 09:45:11
 * @Description: 
 * @Email: 3570411064@qq.com
 * @Company: igola
 */

/**
 * 将日期格式化成指定格式的字符串
 * @param date 要格式化的日期，不传时默认当前时间，也可以是一个时间戳
 * @param fmt 目标字符串格式，支持的字符有：y,M,d,q,w,H,h,m,S，默认：yyyy-MM-dd HH:mm:ss
 * @returns 返回格式化后的日期字符串
 */
$.formatDate = function (date, fmt) {
    date = !date ? new Date() : date;
    date = typeof date === 'number' ? new Date(date) : date;
    fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
    var obj =
        {
            'y': date.getFullYear(), // 年份，注意必须用getFullYear
            'M': date.getMonth() + 1, // 月份，注意是从0-11
            'd': date.getDate(), // 日期
            'q': Math.floor((date.getMonth() + 3) / 3), // 季度
            'w': date.getDay(), // 星期，注意是0-6
            'H': date.getHours(), // 24小时制
            'h': date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
            'm': date.getMinutes(), // 分钟
            's': date.getSeconds(), // 秒
            'S': date.getMilliseconds() // 毫秒
        };
    var week = ['天', '一', '二', '三', '四', '五', '六'];
    for (var i in obj) {
        fmt = fmt.replace(new RegExp(i + '+', 'g'), function (m) {
            var val = obj[i] + '';
            if (i == 'w') return (m.length > 2 ? '星期' : '周') + week[val];
            for (var j = 0, len = val.length; j < m.length - len; j++) val = '0' + val;
            return m.length == 1 ? val : val.substring(val.length - m.length);
        });
    }
    return fmt;
}
/**
 * 将字符串解析成日期
 * @param str 输入的日期字符串，如'2014-09-13'
 * @param fmt 字符串格式，默认'yyyy-MM-dd'，支持如下：y、M、d、H、m、s、S，不支持w和q
 * @returns 解析后的Date类型日期
 */

$.parseDate = function(str, fmt) {
    fmt = fmt || 'yyyy-MM-dd';
    var obj = {y: 0, M: 1, d: 0, H: 0, h: 0, m: 0, s: 0, S: 0};
    fmt.replace(/([^yMdHmsS]*?)(([yMdHmsS])\3*)([^yMdHmsS]*?)/g, function (m, $1, $2, $3, $4, idx, old) {
        str = str.replace(new RegExp($1 + '(\\d{' + $2.length + '})' + $4), function (_m, _$1) {
            obj[$3] = parseInt(_$1);
            return '';
        });
        return '';
    });
    obj.M--; // 月份是从0开始的，所以要减去1
    var date = new Date(obj.y, obj.M, obj.d, obj.H, obj.m, obj.s);
    if (obj.S !== 0) date.setMilliseconds(obj.S); // 如果设置了毫秒
    return date;
}
/**
 * 将一个日期格式化成友好格式，比如，1分钟以内的返回“刚刚”，
 * 当天的返回时分，当年的返回月日，否则，返回年月日
 * @param {Object} date
 */
$.formatDateToFriendly = function(date) {
    date = date || new Date();
    date = typeof date === 'number' ? new Date(date) : date;
    invariant(date instanceof Date, 'date is not date type');
    var now = new Date();
    if ((now.getTime() - date.getTime()) < 60 * 1000) return '刚刚'; // 1分钟以内视作“刚刚”
    var temp = this.formatDate(date, 'yyyy年M月d');
    if (temp == this.formatDate(now, 'yyyy年M月d')) return this.formatDate(date, 'HH:mm');
    if (date.getFullYear() == now.getFullYear()) return this.formatDate(date, 'M月d日');
    return temp;
}

/**
 * 将一段时长转换成友好格式，如：
 * 147->“2分27秒”
 * 1581->“26分21秒”
 * 15818->“4小时24分”
 * @param {Object} second
 */

$.formatDurationToFriendly = function(second) {
    if (second < 60) return second + '秒';
    else if (second < 60 * 60) return (second - second % 60) / 60 + '分' + second % 60 + '秒';
    else if (second < 60 * 60 * 24) return (second - second % 3600) / 60 / 60 + '小时' + Math.round(second % 3600 / 60) + '分';
    return (second / 60 / 60 / 24).toFixed(1) + '天';
}
/**
 * 将时间转换成MM:SS形式
 */

$.formatTimeToFriendly = function(second) {
    var m = Math.floor(second / 60);
    m = m < 10 ? ( '0' + m ) : m;
    var s = second % 60;
    s = s < 10 ? ( '0' + s ) : s;
    return m + ':' + s;
}
/**
 * 计算2日期之间的天数，用的是比较毫秒数的方法
 * 传进来的日期要么是Date类型，要么是yyyy-MM-dd格式的字符串日期
 * @param date1 日期一
 * @param date2 日期二
 */
$.countDays = function(date1, date2) {
    var fmt = 'yyyy-MM-dd';
    // 将日期转换成字符串，转换的目的是去除“时、分、秒”
    if (date1 instanceof Date && date2 instanceof Date) {
        date1 = this.formatDate(date1, fmt);
        date2 = this.formatDate(date2, fmt);
    }
    if (typeof date1 === 'string' && typeof date2 === 'string') {
        date1 = this.parseDate(date1, fmt);
        date2 = this.parseDate(date2, fmt);
        return (date1.getTime() - date2.getTime()) / (1000 * 60 * 60 * 24);
    }
    else {
        console.error('参数格式无效！');
        return 0;
    }
}
function main() {
    Log($.formatDate(new Date()))
    // Log($.parseDate(new Date()))
    // Log($.formatDateToFriendly(new Date()))
    // Log($.formatTimeToFriendly(new Date()))
    // Log($.formatDurationToFriendly(new Date()))
    // Log($.countDays(new Date()))
}
```

> Detail

https://www.fmz.com/strategy/161505

> Last Modified

2019-08-10 09:45:12
