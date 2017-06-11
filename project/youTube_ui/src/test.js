/**
 * Created by donghyunkim on 2017. 4. 28..
 */
console.log(this.document === document);
console.log(this === window);
this.a = 37;
console.log(window.a);