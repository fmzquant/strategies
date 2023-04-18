
> 策略名称

TypeScript-演示

> 策略作者

发明者量化

> 策略描述

平台加入原生TypeScript支持, 只需要在源码开头加入 (策略语言类型还是先JavaScript)

```
// @ts-check
```

就可以自动识别为TypeScript




> 源码 (javascript)

``` javascript
// @ts-check

class Greeter {
    greeting: string;

    constructor(message: string) {
        this.greeting = message;
    }

    greet() {
        return "Hello, " + this.greeting;
    }
}


function peopleName(firstName: string, ...restOfname: string[]) {
    return firstName + " " + restOfname.join(" ");
}


function main() {
    let greeter = new Greeter("world");
    Log(greeter.greet());

    
    Log(peopleName('xiaochuan', 'xiaoming', 'xiaohong'))
}


```

> 策略出处

https://www.fmz.com/strategy/405326

> 更新时间

2023-03-23 16:09:47
