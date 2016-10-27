XT.statistics = function(){
// 环形图
 +function($){
	'use strict';
 	var  DrawRing = function(el,options){
 		this.$element = $(el);
 		this.options = options;
 		this.init();
 	};
	DrawRing.defaults={
		maxWidth:160,
		maxHeight:160,
		outerRadius:80,
		innerRadius:60,
		ringWidth:20,
		duration:1000,
        colors:["#ff8463","#798996"],
        textColor:"#17becf"

	};
	DrawRing.prototype.init=function(){
		this.drawAnimatedRingChart(this.options);
	};
	DrawRing.prototype.checkEndAll = function (transition,callback) {
		var n = 0;
		transition.each(function() { ++n; })
			.each("end", function() {
			if (!--n) callback.apply(this, arguments);
		});
	};
	DrawRing.prototype.drawAnimatedRingChart = function () {
		var self =this;
		var pie = d3.layout.pie().value(function (d) {
			return d.count;
		});
		var arc = d3.svg.arc();
		function tweenPie(finish) {
			var start = {
					startAngle: 0,
					endAngle: 0
				};
			var i = d3.interpolate(start, finish);
			return function(d) { return arc(i(d)); };
		}
		arc.outerRadius(self.options.outerRadius )
			.innerRadius(self.options.innerRadius);
		d3.select(self.options.el).selectAll('g').remove();

		var svg = d3.select(self.options.el)
			.attr({
				width : self.options.maxWidth,
				height: self.options.maxHeight
			})
			.append("text")
			.attr({'text-anchor': 'middle',"color":"#eee","font-weight":700,"font-size":30})
			.attr("dy", "55%")
			.attr("dx", "50%")
			.attr("fill",self.options.textColor)
            .text(function(){
                return (self.options.data[0].count*100/(self.options.data[0].count+self.options.data[1].count)).toFixed(1)+'%';
            });

		var groups = d3.select(self.options.el).selectAll('g.arc')
		.data(pie(self.options.data))
		.enter()
		.append('g')
		.attr({
			'class': 'arc',
			'transform': 'translate(' + self.options.outerRadius + ', ' + self.options.outerRadius + ')'
		});

		groups.append('path')
		.attr({
			'fill': function (d, i) {
                console.log(self.options.colors[i])
				return self.options.colors[i];
			}
		})
		.transition()
		.duration(self.options.duration)
		.attrTween('d', tweenPie)
		.call(self.checkEndAll, function () {

			groups.append('text')
			.attr({
				'text-anchor': 'middle',
				'transform': function (d) {
					return 'translate(' + arc.centroid(d) + ')';
				}
			})
		});
	};
	var old = $.fn.DrawRing;
	$.fn.DrawRing             = Plugin;
	$.fn.DrawRing.Constructor = DrawRing;
	function Plugin(option) {
		return this.each(function () {
		  var $this   = $(this);
		  var data    = $this.data('drawring');
		  var options = $.extend({}, DrawRing.defaults, $this.data(), typeof option == 'object' && option);
		  $this.data('ring', (data = new DrawRing(this, options)));
		});
	}
}(jQuery);
var init = function(){
 var date = new Date();

 var Events = function(){
     this.listeners={}
 }
 Events.prototype = {
     constructor:this,
     addEvent:function(type,fn){
         if(typeof type ==='string'&&typeof fn ==='function'){
             if(typeof this.listeners[type]==='undefined'){
                 this.listeners[type]=[fn];
             }else {
                 this.listeners[type].push(fn);
             }
         }
         return this;

     },
     addEvents:function(obj){
         obj = typeof obj ==='object'?obj:{};
         var type;
         for(type in obj){
             if(type&&typeof obj[type]==='function'){
                 this.addEvent(type,obj[type])
             }
         }
         return this;
     },
     fireEvent:function(type){
         if(type&&this.listeners[type]){
             var events = {
                 type:type,
                 target:this
             };
             for(var length = this.listeners[type].length,start = 0;start<length;start++){
                 this.listeners [type][start].call(this,events);
             }
         }
         return this;
     },
     fireEvents:function(array){
         if(array instanceof Array){
             for(var i=0,length=array.length;i<length;i++){
                 this.fireEvent(array[i]);
             }
         }
         return this;
     },
     removeEvent:function(type,key){
         var listeners = this.listeners[type];
         if(listeners instanceof Array){
             if(typeof key === 'function'){
                 for (var i = 0 ,length=listeners.length;i<length;i++){
                     if(listeners[i]===key){
                         listeners.splice(i,1);
                         break;
                     }
                 }
             }else if(key instanceof Array){
                 for (var lis = 0 ,lenkey = key.length;lis<lenkey;lis+=1){
                     this.removeEvent(type, key[lenkey]);
                 }
             }else{
                 delete this.listeners[type];
             }
         }
         return this;
     },
     removeEvents:function(params){
         if(params instanceof Array){
             for (var i= 0,length = params.length;i<length;i++){
                 this.removeEvent(params[i])
             }
         }else if(typeof params === 'object'){
             for (var type in params){
                 this.removeEvent(type,params[type]);
             }
         }
         return this;
     }
 }
//  var myEvents = new Events();
// myEvents.addEvents({
//     "once": function() {
//         alert("该弹框只会出现一次！");
//         this.removeEvent("once");
//     },
//     "infinity": function() {
//         alert("每次点击页面，该弹框都会出现！");
//     }
// });
//
// document.onclick = function(e) {
//     e = e || window.event;
//     var target = e.target || e.srcElement;
//     if (!target || !/input|pre/i.test(target.tagName)) {
//         myEvents.fireEvents(["once", "infinity"]);
//     }
// };

var endDate=date.getFullYear()+'/'+(date.getMonth()+1)+'/'+date.getDate()
    $('#reservation').daterangepicker({
        "startDate": "2016/9/02",
       "endDate": endDate
   })

   $('#reservation').on('hide.daterangepicker', function(ev, picker) {
      var timePicker = $('#reservation').val().replace(/[\/\s+]/g, "").split("-")

    });
//     var parent1 = document.getElementById('parentdiv1');
// var child1 = document.getElementById('childdiv1');
// parent.addEventListener('click',function(){alert('父亲被点击了');},true);//第三个参数为true
// child.addEventListener('click',function(){alert('孩子被点击了');},false);
//     $('#reservation').trigger("hide.daterangepicker");
// $('#reservation').val();
    var employees = [
    {dept: 'A', count : 10},
    {dept: 'B', count : 2}
    ];

    $(".animated-ring").DrawRing({
    el: '.animated-ring svg',
    data: employees,
    colors:["#f88169","#ddd"],
    textColor:"#f88169"
    });
    $(".animated-ring1").DrawRing({
    el: '.animated-ring1 svg',
    data: employees,
    colors:["#2cd6b0","#ddd"],
    textColor:"#f88169"
    });
    $(".animated-ring2").DrawRing({
    el: '.animated-ring2 svg',
    data: employees,
    colors:["#69bb61","#ddd"],
    textColor:"#f88169"
    });
    function request1(options,async){
          var defaults ={
            service:"",
              data:{
                  Page:{
                      pageNo: "1",
                      pageSize:"-1"
                  }
              }
          };
          var option = $.extend(true,defaults,options),
                pdata =JSON.stringify(option),
                params = "pdata=" + pdata; //URL参数
                async = async||0;
             return  $.ajax({
                  url: option.service,
                  type: 'get',
                  data: params,
                  async: async,
                  dataType: "json",
                  beforeSend:function(){
                  console.log("beforeSend")

                  },
                  success:function(ret){

                  }
              });
          }


var url1 ='http://localhost:3005/scripts/json/treeroot.json';
var url2 = 'http://localhost:3005/scripts/json/treechild.json';
var orgTree = {};
orgTree.flag=0;//默认加载数据
orgTree.id="";
orgTree.selectedItem=null;//存储选择的数据
orgTree.init = function(treeid){
    var $myTree = $(treeid);
    var selectedItems;
    // 编辑，是内容可编辑
     $(document).off("click.js-icon-edit").on("click.js-icon-edit",".js-icon-edit",function(){
        $(".contentedit").prop("contenteditable",true).addClass("contentedit-style");
        $(document).off("click.js-icon-undo").on("click.js-icon-undo",".js-icon-undo",function(){
            orgTree.populateText([
                {"text":"撤销操作",
                "field":"组织等级"
                },{"group":"",
                "field":"组织等级"
                },{"text3":"",
                "field":"组织等级"
                },{"text4":"",
                "field":"组织等级"
                },
                {"text5":"",
                "field":"组织等级"
                },
                {"value":"",
                "field":"组织角色"
            }],true)
        })
    })
    //保存修改或新建的内容，修改必须要选择一个节点，成功后先删除，在增加。新建是选择父节点，所以这两个操作不能放在一起。
    $(document).off("click.js-icon-save").on("click",".js-icon-save",function(){
        $(".contentedit").prop("contenteditable",false).removeClass('contentedit-style');

       console.log(orgTree.getTemplateValue('.main-content span.contentedit'));
       console.log(orgTree.flag)
    //    保存发送服务，获取数据，将返回的数据传给callback，触发增加操作
       if(orgTree.flag===1){
           $myTree.tree("appendNode",selectedItems,$(selectedItems).data().type);
       }else if(orgTree.flag===2){
        //    修改操作，先删除后增加
          // $myTree.tree("deleteNode",selected.ele)
          // 要在其父元素下增加
          // $myTree.tree("appendNode",selectedItems,$(selectedItems).data().type);
       }
    })
    // 删除
    $(document).off("click.js-icon-trash").on("click.js-icon-trash",".js-icon-trash",function(){
        $myTree.tree("deleteNode",orgTree.selectedItem)
    })
    // ‘+’号，显示或消失
    $(document).on("mouseover mouseout",".js-tree-branch-header" ,function(){
        $(this).find("span.js-icon-plus").eq(0).toggle()
    })
    $myTree.off("beforedisclosedFolder.tree.amui").on('beforedisclosedFolder.tree.amui', function(e, selected) {
        alert("展开前获取ID")
        orgTree.id = selected.attr.id;
        console.log(orgTree.id)
    })

    $myTree.off("appendbefore.tree.amui").on("appendbefore.tree.amui",function(e,selected){
        orgTree.flag=1;
        orgTree.selectedItem = $(selected);
        console.log(orgTree.selectedItem)
        selectedItems=selected;
        orgTree.populateText([
            {"text":"",
            "field":"组织等级"
            },{"group":"",
            "field":"组织等级"
            },{"text3":"",
            "field":"组织等级"
            },{"text4":"",
            "field":"组织等级"
            },
            {"text5":"",
            "field":"组织等级"
            },
            {"value":"",
            "field":"组织角色"
        }],true)



    })
    $myTree.off("selected.tree.amui").on('selected.tree.amui', function(e, selected) {
        orgTree.flag=2
        orgTree.selectedItem = selected.ele;
        console.log(orgTree.selectedItem)
        var curNodeAttr = selected.selected[0].attr,
            obj=[];

                orgTree.populateText([
                    {"text":curNodeAttr.text,
                    "field":"组织等级"
                    },{"group":"",
                    "field":"组织等级"
                    },{"text3":"",
                    "field":"组织等级"
                    },{"text4":"",
                    "field":"组织等级"
                    },
                    {"text5":"",
                    "field":"组织等级"
                    },
                    {"value":"",
                    "field":"组织角色"
                }],false)






    })
    $myTree.tree({
        dataSource: function(options, callback) {
            // 用一个参数来判断增加，删除，修改，加载,选择不同的参数
            var queryString;
            /**
             *
             * @param 1 add,queryString:id
             * @param 2 modify,queryString:id
             * @param default loaddata,queryString:id
             *
             */
            switch(orgTree.flag){
                case 1://增加
                    break;
                case 2://修改
                    break;
                default:
            }
            if(orgTree.flag){
                var queryString={
                operatorID:selectedItems,
                operateName:"2",
                groupShortName:"金鑫",
                groupName:"赵三",
                city:"日本东京"
                }
                request1({
                    service:url2,
                    data:queryString
                },0).done(function(ret){
                    alert("进入增加，返回了数据")

                    callback({data:ret})//添加失败，回调函数传非对象值
                })
            }else if(!selectedItems){
                // alert("默认加载项")
                var queryString={
                operatorID:"1",
                operateName:"2",
                groupShortName:"金鑫",
                groupName:"赵三",
                city:"日本东京"
                }
                request1({
                    service:url1,
                    data:queryString
                },0).done(function(ret){

                    // 封装数据

                    callback({data:ret})
                })
            }
        },
        multiSelect: false,
        cacheItems: true,
        folderSelect: true,
        add:true
    }).on('loaded.tree.amui', function(e) {
            console.log('Loaded');
    }).on('updated.tree.amui', function(e, selected) {
            console.log('Updated Event: ', selected);
            console.log($myTree.tree('selectedItems'));
    }).on('closed.tree.amui', function(e, info) {
            console.log('Close Event: ', info);
    });
}
/**
 * @param array [{},{}]
 * @param addflag if add a node ,this value must be true
 */
orgTree.populateText = function (array,addflag){
    var container = $(".main-content");
    console.time("计时器")
    container.html("");
    array.forEach(function(item,index){
        var Div = $('<div class="m-15"></div>');
        var field,
            text;
        for(var key in item){
            // 动态创建
            if(key==="field"){
                field=$('<span>'+item[key]+'：</span >')
            }else{
                text = $('<span class="contentedit  " data-'+key +'='+item[key]+'>'+item[key]+'</span>')
            }
            // container.append($('<div class="m-15"><span>'+组织名称+'：</span ><span class="contentedit" data-'+key +'='+item[key]+'>'+item[key]+'</span></div>'))
        }
        container.append(Div.append(field).append(text))
    })
    container.append('<div style="float:right"><span class="js-icon-edit" title="编辑"></span><span class="js-icon-trash" title="删除"></span><span class="js-icon-undo" title="撤销"></span><span class="js-icon-save " title="保存"></span></div>')
    if(addflag){
        $(".contentedit").prop("contenteditable",true).addClass("contentedit-style")
        }
    console.timeEnd('计时器');
}

/**
 * @param selector, in the right side ,every contentedit span,eg:'.main-content span.contentedit'
 */
orgTree.getTemplateValue = function(selector){
    // 取更改后的值
        var spans,
            length,
            array=[];
        spans = $(selector);
        length = spans.length;
        spans.each(function(index,item){
            var attr={};
            for(var key in item.dataset){
                attr[key]=item.textContent
            }
            array.push(attr)
        })
    return array;
}

/**
 * @param curDeepth ,the current node's deepth ,number
 * @param curDeepth ,the target node's deepth,number
 */
orgTree.modifyNodeDeepth = function (curDeepth,targetDeepth){
    var copyNode = $("li[deepth="+curDeepth+"]").clone();
    var targetNode = $("li[deepth="+targetDeepth+"]");
    $("li[deepth="+curDeepth+"]").remove();
    targetNode.append(copyNode);
}

orgTree.init("#myTree");


}





return {
    init:init
}
}(jQuery)
