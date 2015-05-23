// JavaScript Document
var _lenovo = {};
_lenovo.loadExtSrc = function() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = arguments[0];
    document.getElementsByTagName('head')[0].appendChild(script);
}
_lenovo.loadExtSrc(unescape((("https:" == document.location.protocol) ? " https://" : " http://") + "hm.baidu.com/h.js%3F04ffe61048b600908188038ff243dec8"));