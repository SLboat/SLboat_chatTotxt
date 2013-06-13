"use strict";

var reg = {
    wangwang: function(value) {
        
        return value.match(/(.*?)\s*\((\d{4}\-\d{2}\-\d{2})?\s*\d\d:\d\d:\d\d\):/);
    },
    qq: function(value) {
        var ret = value.match(/(.*?)\s*(<|\().*?(>|\))\s*\d\d:\d\d:\d\d/);
        if(!ret) {
            ret = value.match(/(.*?)\s*\d\d:\d\d:\d\d/);
        }
        return ret;
    }
    
}

function getit (value) {
    var ret=null;
    for(var k in reg){
        ret=reg[k](value);
        if(ret){
            return ret;
        }
    }
}
function lex(input, type) {
    var arr_t = input.split(/\n/);
    var output = [
        [null]
    ];
    arr_t.forEach(function(value) {
        var ret = getit(value);
        if(ret) {
            if(ret[1] !== output[output.length - 1][0]) {
                output.push([ret[1],
                    []
                ]);
            }
        } else if(!value.match(/^\s*$/)&&output[output.length - 1][1]) {

            output[output.length - 1][1].push(value);
        }
    });
    return output;

}

function generate(info) {
    var ret = [];
    info.forEach(function(value) {
        if(value[0] === null) return;
        ret.push(';' + value[0] + '：');
        value[1].forEach(function(n) {
            ret.push(':' + n);
        });
    });
    return ret.join('\n');
}

function chat_fix(str) {
    return generate(lex(str));
}

$(document).ready(function() {
    //开始准备计算
    $("#go").click(function() {
        $("#str2").text(chat_fix($("#str1").val()));
    });
	//变化发生的时候
	$("#str1").change(function(){
		$("#str2").text(chat_fix($("#str1").val()));
	});
    //$("#go").click(); //执行一次，开始的时候
})