/**
 * SodaRender
 * light Tml render engine
 * copyright @ Tencent AlloyTeam
 * License under MIT License
 * @author dorsywang
 * @email 314416946@qq.com
 * @blog http://www.dorsywang.com
 * @TeamBlog http://www.alloyteam.com
 */
(function(){var e=/\{\{([^\}]*)\}\}/g,t=function(e){return new RegExp("(^|\\s+)"+e+"(\\s+|$)","g")},n=function(e,n){if(!e.className){e.className=n;return}e.className.match(t(n))||(e.className+=" "+n)},r=function(e,n){e.className=e.className.replace(t(n),"")},i=function(e,t){var n=t.indexOf(".");if(n>-1){var r=t.substr(0,n);return t=t.substr(n+1),e[r]?i(e[r],t):""}return typeof e[t]!="undefined"?e[t]:""},s=function(e){},o=/[a-zA-Z_\$]+[\w\$]*/g,u=/"([^"]*)"|'([^']*)'/g,a=/\d+|\d*\.\d+/g,f=/[a-zA-Z_\$]+[\w\$]*(?:\s*\.\s*(?:[a-zA-Z_\$]+[\w\$]*|\d+))*/g,l=/\[([^\[\]]*)\]/g,c=/\.([a-zA-Z_\$]+[\w\$]*)/g,h=/[^\.|]([a-zA-Z_\$]+[\w\$]*)/g,p=/\|\|/g,d="OR_OPERATOR",v=function(){return"$$"+~~(Math.random()*1e6)},m=function(e,t){e=e.replace(p,d).split("|");for(var n=0;n<e.length;n++)e[n]=(e[n].replace(new RegExp(d,"g"),"||")||"").trim();var r=e[0]||"",s=e.slice(1);r=r.replace(u,function(e,n,r){var i=v();return t[i]=n||r,i});while(l.test(r))l.lastIndex=0,r=r.replace(l,function(e,n){return"."+m(n,t)});r=r.replace(f,function(e){return"getValue(scope,'"+e.trim()+"')"});var o=function(){var e=s.shift();if(!e)return;var e=e.split(":"),t=e.slice(1)||[],n=e[0]||"",i=/^'.*'$|^".*"$/;for(var u=0;u<t.length;u++)f.test(t[u])&&(t[u]="getValue(scope,'"+t[u]+"')");b[n]&&(t.unshift(r),t=t.join(","),r="sodaFilterMap['"+n+"']("+t+")"),o()};o();var a=(new Function("getValue","sodaFilterMap","return function sodaExp(scope){ return "+r+"}"))(i,b);return a(t)},g=function(t,n){[].map.call([].slice.call(t.childNodes,[]),function(t){t.nodeType===3&&(t.nodeValue=t.nodeValue.replace(e,function(e,t){return m(t,n)}));if(t.attributes)if(/in/.test(t.getAttribute("soda-repeat")||""))y["soda-repeat"].link(n,t,t.attributes);else{if((t.getAttribute("soda-if")||"").trim()){y["soda-if"].link(n,t,t.attributes);if(t.getAttribute("removed")==="removed")return}var r;[].map.call(t.attributes,function(i){if(i.name!=="soda-if")if(/^soda-/.test(i.name)){if(y[i.name]){var s=y[i.name],o=s.link(n,t,t.attributes);o&&o.command==="childDone"&&(r=1)}}else i.value=i.value.replace(e,function(e,t){return m(t,n)})}),r||g(t,n)}})},y={},b={},w=function(e,t){y["soda-"+e]=t()},E=function(e,t){b[e]=t};E("date",function(e,t){return t}),w("repeat",function(){return{compile:function(e,t,n){},link:function(t,n,r){var s=n.getAttribute("soda-repeat"),o,u,a=/\s+track\s+by\s+([^\s]+)$/,f;s=s.replace(a,function(e,t){return t&&(f=(t||"").trim()),""}),f=f||"$index";var l=/([^\s]+)\s+in\s+([^\s]+)/,c=l.exec(s);if(!c)return;o=(c[1]||"").trim(),u=(c[2]||"").trim();if(!o||!u)return;var h=i(t,u),p=n;for(var d=0;d<h.length;d++){var v=n.cloneNode(),b={};b[f]=d,b[o]=h[d],b.__proto__=t,v.innerHTML=n.innerHTML;if((v.getAttribute("soda-if")||"").trim()){y["soda-if"].link(b,v,v.attributes);if(v.getAttribute("removed")==="removed")continue}[].map.call(v.attributes,function(t){if(v.getAttribute("removed")==="removed")return;if(t.name.trim()!=="soda-repeat"&&t.name.trim()!=="soda-if")if(/^soda-/.test(t.name)){if(y[t.name]){var n=y[t.name];n.link(b,v,v.attributes)}}else t.value=t.value.replace(e,function(e,t){return m(t,b)})}),v.getAttribute("removed")!=="removed"&&(g(v,b),n.parentNode.insertBefore(v,p.nextSibling),p=v)}n.parentNode.removeChild(n)}}}),w("if",function(){return{link:function(e,t,n){var r=t.getAttribute("soda-if"),i=m(r,e);i||(t.setAttribute("removed","removed"),t.parentNode&&t.parentNode.removeChild(t))}}}),w("class",function(){return{link:function(e,t,r){var i=t.getAttribute("soda-class"),s=m(i,e);s&&n(t,s)}}}),w("src",function(){return{link:function(t,n,r){var i=n.getAttribute("soda-src"),s=i.replace(e,function(e,n){return m(n,t)});s&&n.setAttribute("src",s)}}}),w("bind-html",function(){return{link:function(e,t,n){var r=t.getAttribute("soda-bind-html"),i=m(r,e);if(i)return t.innerHTML=i,{command:"childDone"}}}});var S=function(e,t){var n=document.createElement("div");n.innerHTML=e,g(n,t);var r=document.createDocumentFragment();r.innerHTML=n.innerHTML;var i;while(i=n.childNodes[0])r.appendChild(i);return r},x=function(e,t){};window.sodaRender=S,window.sodaFilter=E})()
/**
 * Model core file
 * @author dorsywang
 */
;(function(){
    var originInfo = console.info;
    var originLog = console.log;
    var rnotwhite = /\S+/g;
    var classNameRegExp = function(className) {
        return new RegExp('(^|\\s+)' + className + '(\\s+|$)', 'g');
    };

    var hasClass =  function(el, className) {
        el.className.search(classNameRegExp(className)) !== -1;
    };


    var _lastMsg = [];
    console.log = function(){
        _lastMsg = arguments;

        originLog.apply(console, arguments);
    };

    console.info = function(){
        var container = arguments[1];

        var currMsg;
        var args = Array.prototype.slice.call(arguments, 0);
        var currArgs = arguments;

        if(_lastMsg[0] && _lastMsg[0] === "Model:"){
            //currArgs[0] = currArgs[0].replace(/./g, " ");
            currArgs[0] = "♫";

            if(_lastMsg[1] && _lastMsg[1] === container){
                //currArgs[1] =  currArgs[1].replace(/./g, " ");
                currArgs[1] = " ↗";
            }else{
                //currArgs = Array.prototype.slice.call(arguments, 1);
            }
        }

        originInfo.apply(console, currArgs);
        _lastMsg = args;
    };

    var PrivateVar = function(value){
        this._value = value;
    };

    PrivateVar.prototype = {
        constructor: PrivateVar,
        set: function(value){
            this._value = value;;

            return this;
        },

        get: function(){
            return this.value;
        },
        set value(v){
            console.warn("请使用set方法进行设置值的操作");
        },

        get value(){
            return this._value;
        },
    };

    var Event = function(opt){
        this.bubble = true;
        this.preventDefaulted = 0;

        this.type = opt.type || "";
        this.name = opt.name;

        this.target = opt.target;
    };

    Event.prototype = {
        constructor: Event,
        
        stopPropagation: function(){
            this.bubble = false;
        },

        preventDefault: function(){
            this.preventDefaulted = 1;
        }
    };


    var loadJSContent = function(path, callback){
        var xhr = new XMLHttpRequest();

        xhr.onload = function(){
            var data = this.response;

            callback && callback(data);
        };

        xhr.open("GET", path, true);

        xhr.send();
    };

    var Model = {
        containerCountInfo: {},
        _config: {
            debug: 0,
            multitab_event: "click",
            ajax: function(opt){
                if(window.$ && $.ajax){
                    $.ajax(opt);
                }else{
                    var xhr = new XMLHttpRequest();

                    var data = [];
                    if(opt.data){
                        for(var i in opt.data){
                            data.push(i + "=" + opt.data[i]);
                        }
                    }

                    data = data.join("&");

                    xhr.onload = function(){
                        var data = this.response;

                        var contentType = (this.getResponseHeader("Content-type") || '').toLowerCase();
                        var status = this.status;

                        if(status === 200 || status === 304){

                            if(/json/.test(contentType)){
                                data = JSON.parse(data);
                            }

                            opt.success(data);
                        }else{
                            opt.error(data);
                        }
                    };

                    xhr.open(opt.type || 'POST', opt.url, true);
                    xhr.send(data);
                }
            },

            tmpl: function(opt, data, isReplace){
                var result = sodaRender(opt.tmpl || "", data);
                var el = opt.el;

                if(window.$){
                    el = $(el);
                }else{
                    if(typeof el === "string"){
                        el = document.querySelector(el);
                    }
                }

                if(el[0]){
                    el = el[0];
                }

                if(el instanceof HTMLElement){
                    if(isReplace){
                        el.innerHTML = "";
                    }

                    el && el.appendChild(result);
                }else{
                    console.info("Model: option el is not an HTMLElement");
                }
            },

            localKeyExclude: []
        },
        config: function(opt){
            for(var i in opt){
                if(opt.hasOwnProperty(i) && opt[i]){
                    this._config[i] = opt[i];
                }
            }

            /*
            if(opt.ajax){
                this._config.ajax = opt.ajax;
            }

            this._config.tmpl = opt.tmpl;
            */
        },
        fuseMap: {
        },
        Class: function(parentClass, prototype){
            var parent = parentClass;
            var proto = prototype;

            if(typeof parentClass === "string"){
                parent = window[parentClass];

                if(! parent){
                    console.warn("Model:", parentClass, "not included, Please check your Model files!");

                    return {};
                }
            }


            if(proto && typeof parent !== "function"){
                console.warn("Model:", parentClass, "is not illegal");
            }


            if(! prototype){
                proto = parent;

                parent = null;
            }


            if(parent){
                // 这里会执行父的constructor
                parent = new parent();
                proto.__proto__ = parent;
                proto.super = parent;

                // 调父元素的构造方法
                proto.callSuper = function(){
                    var args = ['constructor'].concat([].slice.call(arguments, 0));
                    this.callSuperMethod.apply(this, args);
                };

                // 调用父类的方法
                proto.callSuperMethod = function(){
                    var method = [].slice.call(arguments, 0, 1);
                    var args = [].slice.call(arguments, 1) || [];

                    var _super = this.super;

                    if(_super){
                        this.super = _super.super;

                        var returnVal = (_super[method] || function(){}).apply(this, args);

                        this.super = _super;

                        return returnVal;
                    }
                };
            }

            var constructor = function Model(){};

            // 如果自己定义了constructor 使用自己的constructor
            if(proto.hasOwnProperty("constructor")){
                constructor = proto.constructor;

            // 否则使用原型链继承的constructor
            }else{
                constructor = function Model(){
                    proto.constructor.apply(this, arguments);
                };

            }

            // 设置对象原型链上的constructor
            constructor.prototype = proto;

            return constructor;

        },

        trigger: function(eventName, data){
            if(this.fuseMap[eventName]){
                this.fuseMap[eventName].rock(eventName, data);
            }
        },

        external: function(name, obj){
            window[name] = obj;
        },

        createEvent: function(opt){
            return new Event(opt);
        },

        addFuse: function(fuse, model){
            this.fuseMap[fuse] = model;
        },

        createPrivate: function(value){
            return new PrivateVar(value);
        },

        // @todo
        defer: function(){
            var d = {
                reject: function(data){
                },

                resolve: function(data){
                }
            };

            d.promise = {
                then: function(succFunc, ErrFunc){
                }
            };

            return d;
        },

        // 异步加载文件配置
        // {
        //      tab1: ['../sdf../sdf.js','../sdf/sd.js']
    //      }
        loadModule: function(config){
            this.loadModuleMap = config;
        },

        load: function(module, callback){
            if(Model._config.loadModule){
                Model._config.loadModule(module, callback);

                return;
            }
            
            if(this.loadModuleMap[module]){
                var fileContentPool = [];;
                var fileList = this.loadModuleMap[module];

                var checkAndRunFile = function(){
                    if(fileContentPool[0]){
                        firstContent = fileContentPool.shift();

                        var script = document.createElement("script");
                        script.innerHTML = firstContent;

                        document.body.appendChild(script);

                        checkAndRunFile();
                    }
                };


                for(var i = 0; i < fileList.length; i ++){
                    var file = fileList[i];

                    loadJSContent(file, function(i){
                        return function(data){
                            fileContentPool[i] = data;

                            checkAndRunFile();
                        };
                    }(i));
                }
                
            }else{
            }
        }
    };

    var $ = window.$ || function(selector){
            if(window.$){
                return window.$(selector);
            }

            if(typeof selector === "object" && selector.show && selector.attr){
                return selector;
            }


            var each = function(arr, func){
                for(var i = 0; i < arr.length; i ++){
                    var item = arr[i];

                    func && func(item, i);
                }
            }

            return function(){
                var el;
                if(typeof selector === "string"){
                    if(selector === "window"){
                        el = [window];
                    }else{
                        el = document.querySelectorAll(selector);
                    }
                }else{
                    if(!('length' in el)){
                        el = [el];
                    }
                }

                var pro = {
                    selector: selector,
                    html: function(str){
                        for(var i = 0; i < el.length; i ++){
                            el[i].innerHTML = str;
                        }
                    },

                    show: function(){
                        for(var i = 0; i < el.length; i ++){
                            var item = el[i];
                            item.style.display == "none" && (item.style.display = '');

                            if(getComputedStyle(item, '').getPropertyValue("display") == "none"){
                                item.style.display = defaultDisplay(item.nodeName)
                             }
                        }
                    },

                    hide: function(){
                        for(var i = 0; i < el.length; i ++){
                            el[i].style.display = "none";
                        }
                    },

                    on: function(name, selector, func){
                        if(typeof func === "undefined"){
                            each(el, function(item){
                                item.addEventListener(name, selector);
                            });
                        }else{
                            each(el, function(item){
                                item.addEventListener(name, function(e){
                                    var target = e.target;
                                    var matchedEl = $(selector);

                                    for(var i = 0; i < matchedEl.length; i ++){
                                        var matchedElitem = matchedEl[i];

                                        if(matchedElitem.contains(target)){
                                            func && func.call(matchedElitem, e);
                                        }
                                    }
                                });
                            });
                        }
                    },

                    attr: function(name, value){
                        if(typeof value === "undefined"){
                            return el && el[0] && el[0].getAttribute(name);
                        }else{
                            each(el, function(item){
                                item.setAttribute(name, value);
                            });
                        }
                    },

        
                   addClass: function(classNames) {
                        each(el, function (ele) {
                            classNames.match(rnotwhite).forEach(function (cn) {
                                if (!hasClass(ele, cn)) {
                                    ele.className += ' ' + cn;
                                }
                            });
                        });

                        return this;
                    },
                    removeClass: function(classNames) {
                        each(el, function (ele) {
                            classNames.match(rnotwhite).forEach(function (cn) {
                                ele.className = ele.className.replace(classNameRegExp(cn), ' ');
                            });
                        });

                        return this;
                    }
                    
                };

                for(var i in pro){
                    if(pro.hasOwnProperty(i)){
                        el[i] = pro[i];
                    }
                }

                return el;
            }();
    };

    $.os = $.os || (function(){
                        var ua = window.navigator.userAgent.toLowerCase();
                        var androidFlag = 0;
                        var iosFlag = 0;

                        if(/android/.test(ua)){
                            androidFlag = 1;
                        }else if(/ios|iphone|ipad|ipod|itouch/.test(ua)){
                            iosFlag = 1;
                        }else{
                        }

                        return {
                            ios: iosFlag,
                            android: androidFlag
                        };
                    })();
    Model.$ = $;

    Model.external("Model", Model);

})();
;(function(){

    /**
     * 如果父类有使用父类的属性 即是继承属性
     * 
     */
    var $ = Model.$;

    var _containerCountInfo = Model.containerCountInfo;

    var acceptOpt = ['tmpl', 'el', 'data', 'fuse', 'myData', 'onreset', 'comment', 'helper', 'name'];
    var BaseModel = Model.Class({
        type: "BaseModel",

        get acceptOpt(){
            return acceptOpt;
        },

        addAcceptOpt: function(arr){
            acceptOpt = acceptOpt.concat(arr);
        },

        set fuse(value){
            Model.addFuse(value, this);

            this._fuse = value;
        },

        get fuse(){
            return this._fuse;
        },

        setData: function(data){
            this.data = data;
        },

        addFuse: function(fuse){
            this.fuse = fuse;
        },
        constructor: function(opt){
            // private method
            // 这些都会被子类重新初始化一遍
            this._fuse = "";

            var getId = function(){
                return "abstract_" + ~~(100000 * Math.random()); 
            };

            if(opt){
                for(var i = 0; i < this.acceptOpt.length; i ++){
                    var item = this.acceptOpt[i];
                    if(opt[item]){
                        this[item] = opt[item];
                    }
                }
            }

            if(opt && opt.el){
                var id = $(opt.el).attr("id");

                if(id){
                }else{
                    id = getId();
                    $(opt.el).attr("id", id);
                }

                if(_containerCountInfo[id]){
                    _containerCountInfo[id] ++;
                }else{
                    _containerCountInfo[id] = 1;
                }
            }


            // 设置初始化参数 private method
            this.eventHandler = {
            };

            this._ = {};

            if(! this.hasOwnProperty('myData')){
                this.myData = {};
            }


            this.children = [];
            this.parent = null;

            var _this = this;
            this.addEventListener("reset", function(e){
                _this.onreset && _this.onreset();
            });
        },

        // 增加model上去
        add: function(model){
            if(typeof model === "string"){
                if(model.indexOf(".")){
                    var pos = model.lastIndexOf(".");

                    var moduleName = model.substr(0, pos);
                    var name = model.substr(pos + 1);

                    var loadModel = new LoadModel({
                        moduleName: moduleName,
                        name: name
                    });

                    // 将这种延时加载的模型增加进去
                    this.children.push(model);
                }else{
                    console.warn("add load model error");
                }
            }else{
                // add parent
                model.parent = this;

                this.children.push(model);
            }
        },

        del: function(model){
            for(var i = 0; i < this.children.length; i ++){
                if(this.children[i] === model){
                    break;
                }
            }

            this.children.splice(i, 1);
        },

        remove: function(){
            if(this.parent){
                this.parent.del(this);
            }
        },

        replaceChild: function(model, newModel){
             for(var i = 0; i < this.children.length; i ++){
                if(this.children[i] === model){
                    this.children[i] = newModel;

                    break;
                }
            }

            newModel.parent = this;

            if(this.currChild === model){
                this.currChild = newModel;
            }
        },

        // 这里写处于激活态的时候动作
        // 用户可自定义 
        // 事件传播不在这里处理保证不受用户处理事件传播
        // 监听用户激活的事件
        active: function(event){
        },

        // onunactive时的动作
        unactive: function(event){
        },

        // rock就是主动使其处于激活态
        // 这里的src始终是自己
        // 并抛出激活事件
        // 这里triggerName
        rock: function(eventName, data){
            var event = Model.createEvent({
                type: "beforeactived",
                target: this,
                name: eventName || 'anonymouse', 
                data: data
            });

            this.dispatchEvent(event);

            if(event.preventDefaulted){
                return;
            }


            var defer = Model.defer();

            console.log(this.el, "rocked");
            this.status = "active";

 

            // active时的动作
            this.active(event);

            var event = Model.createEvent({
                type: "actived",
                target: this,
                name: eventName || 'anonymouse', 
                data: data
            });

            this.dispatchEvent(event);

        },

        stop: function(eventName){
            console.log(this.el, "unrocked");
            this.status = "unactive";

            var event = Model.createEvent({
                type: "unactived",
                target: this,
                name: eventName || 'anonymouse'
            });

            this.unactive(event);

            this.dispatchEvent(event);

        },

        // 事件传播
        // 事件由这里开始传播
        // 这里先只处理向上冒泡的情形
        dispatchEvent: function(event, data){
            var type = event.type;

            var _this = this;
            this.eventHandler[type] && this.eventHandler[type].map(function(item){
                item.call(_this, event, data);
            });

            // 如果可以穿播 继续传播
            if(event.bubble){
                this.parent && this.parent.dispatchEvent(event, data);
            }
        },

        addEventListener: function(type, handler, isCapture){
            if(! this.eventHandler[type]){
                this.eventHandler[type] = [];
            }

            this.eventHandler[type].push(handler);
        },

        info: function(msg){
            var args = [];
            var args = ["Model:", (this.comment || (typeof this.el === "string" ? this.el : this.el && this.el.selector)) + ":"];

            for(var i = 0; i < arguments.length; i ++){
                args.push(arguments[i]);
            }

            console.info.apply(console, args);
        },

        reset: function(){
            this.melt();

            this.onreset && this.onreset();

            var event = Model.createEvent({
                type: "reset",
                target: this,
                name: 'anonymouse'
            });

            this.dispatchEvent(event);
        },
        refresh: function(){
            var event = Model.createEvent({
                type: "refresh",
                target: this,
                name: 'anonymouse'
            });

            this.dispatchEvent(event);
        },

        freeze: function() {
            this.freezed = 1;
        },

        melt: function() {
            this.freezed = 0;
        },

        show: function(){
            if(this.el){
                $(this.el).show();
            }
        },

        hide: function(){
            if(this.el){
                $(this.el).hide();
            }
        },

        _resetPrivateFlag: function(){
        },

        _registerInnerMethod: function(arr, el){
            for(var i = 0; i < arr.length; i ++){
                var item = arr[i];


                if(! this[item] || (this[item] && ! this.hasOwnProperty(item))){
                    Object.defineProperty(this, item, function(item){
                        return {
                            set: function(value){
                                el[item] = value;
                            },

                            get: function(value){
                                if(typeof el[item] === "function"){
                                    return function(){
                                        return el[item].apply(el, arguments);
                                    };
                                }else{
                                    return el[item];
                                }
                            }
                        };
                    }(item));
                    /*
                    this[item] = function(item){
                        if(typeof el[item] === "function"){
                            return function(){
                                return el[item].apply(el, arguments);
                            };
                        }else{
                            return el[item];
                        }
                    }(item);
                    */
                }
            }
        },


        extend: function(opt){
            var func = function(){};

            func.prototype = this;

            var clone = new func();


            this._resetPrivateFlag.call(clone);

            for(var i in opt){
                if(opt[i]){
                    clone[i] = opt[i];
                }
            }

            clone.parent = null;

            clone.children = [];

            // 拷贝子元素
            for(var i = 0; i < this.children.length; i ++){
                clone.add(this.children[i].extend());
            }

            // 把el记下
            var getId = function(){
                return "abstract_" + ~~(100000 * Math.random()); 
            };

            if(clone.el){
                var id = $(clone.el).attr("id");

                if(id){
                }else{
                    id = getId();
                    $(clone.el).attr("id", id);
                }

                if(_containerCountInfo[id]){
                    _containerCountInfo[id] ++;
                }else{
                    _containerCountInfo[id] = 1;
                }
            }


            // @todo
            // 子元素间的feed关系还是要保留的

            return clone;
            
        },

        getPrivate: function(name){
            var _this = this;

            var priKey = "_" + name;

            pri = this._[priKey];
        },

        get: function(name){
            var _this = this;
            var priKey = "_" + name;

            if(! _this._[priKey]){
                _this._[priKey] = Model.createPrivate();
            }

            return _this._[priKey];
        },

        // 外放tab
        exportTab: function(name, onswitch){
             var key = "recieveModel" + name;

            var realizeKey = "realizeModel" + name;
            var _this = this;

            if (window[key] && typeof window[key] === "function") {
                //alert(selector); 
                window[key](name, this, onswitch);
            } else {
                window[realizeKey] = function(cb) {
                    cb(name, _this, onswitch);
                    delete window[realizeKey];
                };
            }
        },

        tell: function(somebody, something, dowhat) {
            var key = ["__", something, "__"].join("");

            // 如相定义了某个属性
            if (typeof this[something] !== "undefined") {
                this[key] = this[something];
            } else {}

            Object.defineProperty(this, something, {
                get: function() {
                    return this[key];
                },

                set: function(val) {
                    this[key] = val;

                    if (dowhat) {
                        dowhat.call(somebody, val);
                    } else {
                        somebody[something] = val;
                    }
                }
            });

        },

        watch: function(somebody, something, dowhat) {
            var key = ["__", something, "__"].join("");

            // 如相定义了某个属性
            if (typeof somebody[something] !== "undefined") {
                somebody[key] = somebody[something];
            } else {}

            var _this = this;

            Object.defineProperty(somebody, something, {
                get: function() {
                    return this[key];
                },

                set: function(val) {
                    this[key] = val;

                    if (dowhat) {
                        dowhat.call(_this, val);
                    } else {
                        _this[something] = val;
                    }
                }
            });

        },

        die: function(){
            this.dead = 1;
        }


    });

    Model.external("BaseModel", BaseModel);
})();
;(function(){
    var RelationModel = Model.Class("BaseModel", {
        type: "RelationModel",

        constructor: function(opt){
            this.callSuper(opt);
        },

        setActive: function(opt){
            this.onactive = opt;
        },

        setUnactive: function(opt){
            this.onactive = opt;
        },

        get models(){
            return this.children;
        }
        
    });

    Model.external("RelationModel", RelationModel);
})();
;(function(){
    var PageModel = Model.Class("RelationModel", {
        type: "PageModel",
        constructor: function(opt){
             this.callSuper(opt);
        },
        // mutex激活 
        // 激活对应的activeChild即可
        active: function(eventName){
            this.children.map(function(item){
                if(! item.feeded){
                    item.rock(eventName);
                }
            });
        },

        show: function(){
            this.children.map(function(item){
                item.show();
            });
        },

        hide: function(){
            this.children.map(function(item){
                item.hide();
            });
        },

        // 如果不激活了 不激活相应当前child即可
        unactive: function(eventName){
            this.children.map(function(item){
                if(item.status === "active" || ! item.status){
                    item.stop(eventName);
                }
            });

            /*
            for(var i = 0; i < this.children.length; i ++){
                var item = this.children[i];
            }

            if(this.currChild){
                this.currChild.stop(eventName);
            }
            */
        },

        refresh: function(){
            this.children.map(function(item){
                item.refresh();
            });

            this.callSuperMethod("refresh");
        },

        reset: function(){
            this.children.map(function(item){
                item.reset();
            });

            this.callSuperMethod("reset");
        }
    });

    Model.external("PageModel", PageModel);
})();
;(function(){
    var MutexModel = Model.Class("RelationModel", {
        type: "MutexModel",
        constructor: function(opt){
             this.callSuper(opt);

            // 监听子元素的激活事件
            this.addEventListener("beforeactived", function(e){
                // 如果子元素是直属子元素 则处理其他子元素关系
                var target = e.target;

                if(! target){
                    return;
                }

                if(target.parent === this){
                    if(this.currChild === this){
                    }else{
                        for(var i = 0; i < this.children.length; i ++){
                            var child = this.children[i];

                            if(child !== target){
                                child.stop();
                            }
                        }

                        this.currChild = target;
                    }
                }
            });
        },
        // mutex激活 
        // 激活对应的activeChild即可
        active: function(event){
            if(this.currChild){
                this.currChild.rock(event);

            // 如果不存currChild
            }else{
                if(this._initChild){
                    if(typeof this._initChild === "number"){
                        this.currChild = this.children[this._initChild];
                    }else{
                        for(var i = 0; i < this.children.length; i ++){
                            if(this.children[i] === this._initChild){
                                this.currChild = this.children[i];
                                break;
                            }
                        }
                    }
                }else{
                    this.currChild = this.children[0];
                }

                this.currChild && this.currChild.rock(event);
            }
        },

        initChild: function(indexOrChildModel){
            this._initChild = indexOrChildModel;
        },

        show: function(){
            this.currChild.show();
        },

        hide: function(){
            this.currChild.hide();
        },

        // 如果不激活了 不激活相应当前child即可
        unactive: function(eventName){
            this.children.map(function(item){
                if(item.status === "active" || ! item.status){
                    item.stop(eventName);
                }
            });

            /*
            for(var i = 0; i < this.children.length; i ++){
                var item = this.children[i];
            }

            if(this.currChild){
                this.currChild.stop(eventName);
            }
            */
        },

        refresh: function(){
            if(this.currChild){
                this.currChild.refresh();
                this.callSuperMethod("refresh");
            }
        },

        reset: function(){
            if(this.currChild){
                this.currChild.reset();
                this.callSuperMethod("resest");
            }
        }
    });

    Model.external("MutexModel", MutexModel);
})();
;(function(){
    var $ = Model.$;
    var containerCountInfo = Model.containerCountInfo;

    var MultitabModel = Model.Class("MutexModel", {
        type: "MultitabModel",
        get currModel(){
            return this.mutexModel.currChild;
        },
        constructor: function(){
            this.mutexModel = new MutexModel();

            this.selectorMap = {};
            this.tabHander = null;

            this.selectorSwitchInMap = {};
                    
            this.mutexModel.addEventListener('beforeactived', function(e){
                var smodel = e.target;

                //if(smodel.parent == this){

                    var id = $(smodel.el).attr("id");

                    if (containerCountInfo[id] > 1) {
                        $(smodel.el).html("");
                        smodel.reset();
                    } else {
                        // 如果请求过了
                        if (smodel.isFirstDataRequestRender > 0) {
                            smodel.show();

                            e.preventDefault();
                        } else {
                        }

                    }

                    // 干涉渲染模型的激活态行为
                    var target = e.target;
                //}
            });

            var _this = this;
            this.addEventListener("beforeswitched", function(e, data){

            console.log(data);
                var model = _this.mutexModel.currChild;

                var switchType = e.name;

                var selector = (data && data.selector) || '';
                /*
                for(var i in _this.selectorMap){
                    if(_this.selectorMap[i] === model){
                        selector = i;

                        break;
                    }

                } 
                */

                
                if(selector){
                    _this.beforeTabHandler && _this.beforeTabHandler.call(_this, selector, switchType);
                }
            });

            this.addEventListener("switched", function(e){
                var model = _this.mutexModel.currChild;

                var switchType = e.name;

                var selector;
                for(var i in _this.selectorMap){
                    if(_this.selectorMap[i] === model){
                        selector = i;

                        $(i).addClass('active')
                            .addClass('selected');
                    }else{
                        $(i).removeClass('active')
                            .removeClass('selected');

                    }

                }

                
                if(selector){
                    _this.selectorSwitchInMap[selector] && _this.selectorSwitchInMap[selector].call(_this, selector, switchType);
                    _this.tabHander && _this.tabHander.call(_this, selector, switchType);
                }
            });

        },

        _resetPrivateFlag: function(){
            this.get("rocked").set(0);
        },
        active: function(e){
            var rocked = this.get("rocked");
            if(! rocked.value){
                this.dispatchEvent(Model.createEvent({
                    type: "beforeswitched",
                    target: this,
                    name: "init"
                }));
            }

            this.mutexModel.rock();

            // 如果当前为一个loadModel则加载回来才触发switch事件
            if(this.mutexModel.currChild.type === "LoadModel"){
                var _this = this;
                this.mutexModel.currChild.addEventListener("completed", function(e, realizeModel){
                    if(! rocked.value){
                        _this.dispatchEvent(Model.createEvent({
                            type: "switched",
                            target: _this,
                            name: "init"
                        }));

                        rocked.set(1);
                    }

                });

            }else{
                if(! rocked.value){
                    this.dispatchEvent(Model.createEvent({
                        type: "switched",
                        target: this,
                        name: "init"
                    }));

                    rocked.set(1);
                }
            }
        },

        add: function(selector, model, onswitchin){
            var fuse = "multitab_" + selector;
            var _this = this;

            if(typeof model === "string"){
                model = new LoadModel({
                    name: selector,
                    moduleName: model
                });

                // loadModel加载完成
                // 对于实现的model控制其显示逻辑
                model.addEventListener("completed", function(e, realizeModel, onswitchin){
                    realizeModel.addFuse(fuse);



                    realizeModel.addEventListener('actived', function(e){
                        this.show();
                    });

                    realizeModel.addEventListener('unactived', function(e){
                        console.log("unactived");
                        this.hide();
                    });

                    _this.selectorMap[selector] = realizeModel;

                    if(onswitchin){
                        _this.selectorSwitchInMap[selector] = onswitchin;
                    }
                    
                });
            }else{
                model.addEventListener('actived', function(e){
                    this.show();
                });

                model.addEventListener('unactived', function(e){
                    console.log("unactived");
                    this.hide();
                });

            }

            model.addFuse(fuse);

            this.mutexModel.add(model);


            this.selectorMap[selector] = model;

            if(onswitchin){
                this.selectorSwitchInMap[selector] = onswitchin;
            }

            this.selector


            this.bindSwitchEvent(selector);
         
        },

        bindSwitchEvent: function(selector){
            var _this = this;
            var fuse = "multitab_" + selector;

            // 切换事件绑定
            $("body").on(Model._config.multitab_event, selector, function(){
                _this.dispatchEvent(Model.createEvent({
                    type: "beforeswitched",
                    target: _this,
                    name: "switch"
                }), {selector: selector});

                Model.trigger(fuse, 'switch');

                _this.dispatchEvent(Model.createEvent({
                    type: "switched",
                    target: _this,
                    name: "switch"
                }));
            });
        },

        init: function(selector){
            
            if(this.selectorMap[selector]){
                this.mutexModel.initChild(this.selectorMap[selector]);
            }
        },

        ontabswitch: function(func){
            this.tabHander = func;
        },

        refresh: function(){
            this.mutexModel.currChild.refresh();
        },

        reset: function(){
            this.mutexModel.currChild.reset();
        },

        beforetabswitch: function(func){
            this.beforeTabHandler = func;
        }
    });

    Model.external("MultitabModel", MultitabModel);
})();
// an implatement for baseModel
;(function(){

    /**
     * 根据cgi和参数生成对应的localStorge
     * 要去除类似随机数的参数
     */
    var elementDisplay = {};
    var defaultDisplay = function(nodeName) {
        var element, display;

        if (!elementDisplay[nodeName]) {
          element = document.createElement(nodeName);
          document.body.appendChild(element);

          display = getComputedStyle(element, '').getPropertyValue("display");
          element.parentNode.removeChild(element);
          display == "none" && (display = "block");
          elementDisplay[nodeName] = display;
        }

        return elementDisplay[nodeName]
    };

    var $ = Model.$;

    var getKey = function(cgiName, param){
        var o = {};

        for(var i in param){
            var localKeyExclude = Model._config.localKeyExclude || [];
            if(localKeyExclude.length){
                if(localKeyExclude.indexOf){
                    if(localKeyExclude.indexOf(i)){
                        continue;
                    }
                }
            }else{
                var flag = 0;
                for(var j = 0; j < localKeyExclude.length; j ++){
                    if(i == localKeyExclude[j]){
                        flag = 1;
                    }
                }

                if(flag){
                    continue;
                }
            }

            o[i] = param[i];
        }

        var key = cgiName + "_" + JSON.stringify(o);

        return key;
    };

    var normaliseEl = function(el){
        if(typeof el === "string"){
            el = window.$ ? $(el) : document.querySelectorAll(el);
        }

    };

    var RenderModel = Model.Class("BaseModel", {
        type: "RenderModel",
        getData: function(callback){
           var _this = this;
            var localData;

            // 如果之前有发过请求，则使用缓存的参数池中对应的参数，否则使用param方法构造参数
            // 这里保留的是cache原型
            var param = _this.paramCache[_this.cgiCount] || (typeof this.param == "object" && this.param) || (typeof this.param === "function" && this.param.call(this)) || {};
            var paramToReal = param;

            if(this._args){
                var paramStr = JSON.stringify(param);

                for(var i = 0; i < this._args.length; i ++){
                    var j = i + 1;
                    paramStr = paramStr.replace(new RegExp("@param" + j, "g"), this._args[i] || "");
                }

                paramStr = paramStr.replace(/@param\d+/g, "");

                paramToReal = JSON.parse(paramStr);
            }


            var success = function(res, isLocalRender){
                   
                    // isLocalRender标记是从localStroage中取到的数据 直接执行回调
                    if(isLocalRender){
                        callback(res);
                        return;
                    }
                    
                    // 更新此次的缓存cgi数据和请求参数数据
                    _this.dataCache[_this.cgiCount] = res;
                    _this.paramCache[_this.cgiCount] = param;

                    // cgi请求参数自增
                    _this.cgiCount ++;

                    // 如果是第一次从cgi请求的数据 则缓存数据到localStrage里面
                    if(_this.cgiCount == 1){
                        var key = (_this.cacheKey || getKey)(_this.url, paramToReal);

                        if(key){
                            try{
                                window.localStorage.setItem(key, JSON.stringify(res));
                            }catch(e){
                                window.localStorage.clear();
                                window.localStorage.setItem(key, JSON.stringify(res));
                            }
                        }
                    }

                    if(localData){
                        // 匹配这次数据
                        
                        /*
                        var checkDif = function(l, r){
                            for(var i in r){
                                if($.isArray(r[i])){
                                    if($.isArray(l[i]){
                                        for(var j = 0; j < r[i].length; j ++){
                                        }
                                    }
                                }
                            }
                        };
                        */

                        /*
                        for(var i = 0; i < res.length; i ++){
                        }
                        */
                    }

                    _this.info("complete request, with res↙");
                    _this.info("   ", res);


                    //执行回调
                    callback(res);
                };

                var opt = {
                    type: this.method || "POST",
                    url: this.url,
                    data: paramToReal,
                    success: function(res){
                        success(res);
                    },

                    error: function(res){
                        _this.info("ㄨerror request, with res↙");
                        _this.info("   ", res);

                        _this.paramCache[_this.cgiCount] = param;
                        _this.cgiCount ++;

                        _this.error && _this.error.call(_this, res, _this.cgiCount);

                         
                        var event = Model.createEvent({
                            type: "errored",
                            target: _this,
                            name: 'anonymouse'
                        });

                        _this.dispatchEvent(event);
                    }
                };


            //使用预加载数据相关逻辑
            if(this.usePreLoad && this.preLoadData){
                this.info("with preload Data");

                //取消预加载模式，方面model后面可以继续使用常规的加载模式
                this.usePreLoad = false;       

                //非正常预加载数据，走原有逻辑发cgi重试
                if(this.preLoadData.type != 'error' && this.preLoadData.retcode == 0){
                    //预加载数据模式的数据保存与渲染
                    opt.succ(this.preLoadData);
                    return;
                } 
                // else{
                    // 出错的话重新先走缓存，再走cgi拉的原有逻辑
                    // this.cgiCount = 0;
                    // this.isFirstRender = 1;
                // }
            }

            if(this.dead){
                return;
            }


            //如果是第一次渲染，且cgi也还没有发送请求 那么 使用缓存中数据
            if(!_this.noCache && _this.cgiCount == 0 && ! _this.isFirstRender){
                // 如果有数据了 就不再走缓存了 直接进行第一次渲染
                // 但是prefreching或者其他provider在请求的时候还是要使用缓存
                var dataCache = this.dataCache[_this.cgiCount];

                if(! dataCache || dataCache === "@prefetching"){
                    var key = (_this.cacheKey || getKey)(this.url, paramToReal);

                    localData = null;
                    try{
                        if((window.localStorage.getItem(key) || '').trim()){
                            localData = JSON.parse(window.localStorage.getItem(key) || "null");
                        }
                    }catch(e){
                        
                    }

                    if(localData){

                        try{
                            this.info("has localData");
                            this.info("    start localData rendering");
                            success(localData, 1);
                        }catch(e){
                        }
                    }

                    _this.isFirstRender = 0;

                    this.localData = localData;
                }

            }

            /*
            if(this.cgiCount === 0 && ! _this.isFirstRender){
                if(this.prefetch && !this._prefetchError){
                    if(this.dataCache[0]){
                        opt.succ(this.dataCache[_this.cgiCount]);
                    }
                }
            }
            */

            // 如果缓存中有数据 使用缓存数据 否则发送请求
            if(this.dataCache[_this.cgiCount]){
                if(this.dataCache[_this.cgiCount] === "@prefetching"){
                    this.dataCache[_this.cgiCount] = function(isError){

                        if(! isError){
                            opt.success(_this.dataCache[_this.cgiCount]);
                        }else{
                            opt.error(_this.dataCache[_this.cgiCount]);
                        }
                    };
                }else{
                    success(this.dataCache[_this.cgiCount]);
                }
            }
            //使用预加载数据模式的话，没有缓存也不发请求了，静待预加载数据返回即可
            else{
                var defer = this.beforeRequest && this.beforeRequest();

                if(typeof defer === "boolean" && ! defer){
                    return;
                }

                this.info("start to request cgi, with request params↙");
                this.info("    cgi: " + opt.url);
                this.info("   ", paramToReal);

                Model._config.ajax(opt);
            }
        },

        render: function(el, isReplace){
            // 模型被冻结了 就不再进行渲染
            if(this.freezed){
                return;
            }

            var _this = this;
            var Tmpl = Model._config.tmpl;

            el = $(el);

            var callback = function(data){
                if(_this.dead) return;

                if(_this.cgiCount === 1) {
                    _this.onreset && _this.onreset();
                    el.html("");
                }

                _this.info("start to process data");

                var returnVal;
                _this.processData && (returnVal = _this.processData.call(_this, data, _this.cgiCount));

                if(typeof returnVal === "undefined"){
                }else{
                    if(typeof returnVal === 'boolean' && ! returnVal){
                    }else{
                        data = returnVal;
                    }
                }

                var opt = {
                    tmpl: _this.tmpl,
                    helper: _this.helper,
                    el: _this.el
                };

                Tmpl(opt, data, isReplace);

                _this.cgiCount > 0 && (_this.scrollEnable = 1);

                if(_this.eventsBinded){
                }else{
                    _this.events && (typeof _this.events === "function" && _this.events());

                    if(_this.hasOwnProperty("eventsBinded")){
                        _this.eventsBinded = 1;
                    }else{
                        _this.__proto__.eventsBinded = 1;
                    }
                }

                _this.feedPool.map(function(item){
                    if (!item.noFeed) {
                        item.setFeedData(data, _this.cgiCount);
                        item.rock();
                    }
                });

                _this.info("start to complete data");

                _this.complete && _this.complete(data, _this.cgiCount);

                _this.isFirstDataRequestRender ++;

                _this.info("complete render");

 
                var event = Model.createEvent({
                    type: "completed",
                    target: _this,
                    name: 'anonymouse'
                });

                _this.dispatchEvent(event);
            };

            if(this.url){
                this.getData(callback);
            }else{
                if(this.cgiCount === 0){
                    this.cgiCount ++;
                }

                if(this.data){
                }else{
                    this.data = {};
                }

                this.info("   data given↙");
                this.info("   ", this.data);

                callback(this.data);
            }
        },
        active: function(e){
            if(! this.freezed){
                this.render(this.el);
            }
        },

       _resetPrivateFlag: function(){
            // 私有标志位
            this.rendered = 0;
            this.feedPool = [];

            this.cgiCount = 0;
            this.dataCache = [];

            this.isFirstRender = 0;

            this.isFirstDataRequestRender = 0;

            this.melt();
       },


       constructor: function(opt){
            this.addAcceptOpt(['complete', 'processData', 'error', 'url', 'param', 'noCache', 'events', 'noRefresh', 'method', 'beforeRequest', 'cacheKey']);
            this.callSuper(opt);

            
            if (this.cacheKey && typeof this.cacheKey !== "function") {
                this.cacheKey = function() {
                    return opt.cacheKey || "";
                };
            }


            this._resetPrivateFlag();

            this.eventsBinded = 0;

            // 可被对象继承的属性
            this.paramCache = [];

            var _this = this;


           // prefetch
           if (this.prefetch) {
                try {
                    // 如果之前有发过请求，则使用缓存的参数池中对应的参数，否则使用param方法构造参数
                    var param = (typeof this.param === "object" && this.param) || this.param.call(this);

                    this.paramCache[0] = param;

                    var _this = this;

                    var ajaxOpt = {
                        url: this.url,
                        param: param,
                        type: this.method || "POST",
                        ssoCmd: this.ssoCmd,
                        success: function(res) {
                            if (typeof _this.dataCache[0] === "function") {
                                var fun = _this.dataCache[0];

                                _this.dataCache[0] = res;
                                fun();
                            } else {
                                _this.dataCache[0] = res;
                            }
                        },

                        error: function(res) {
                            if (typeof _this.dataCache[0] === "function") {
                                var fun = _this.dataCache[0];

                                _this.dataCache[0] = res;
                                fun('error');
                            } else {
                                _this.dataCache[0] = null;
                            }
                        }
                    };

                    var defer = this.beforeRequest && this.beforeRequest();

                    if (typeof defer === "boolean" && !defer) {
                        return;
                    }

                    Model._config.ajax(ajaxOpt);

                    this.dataCache[0] = "@prefetching";
                } catch (e) {
                    this._prefetchError = 1;
                }

           }

        },

        reset: function(){
            this.cgiCount = 0;

            this.callSuperMethod("reset");
        },

        refresh: function(){
            if(this.noRefresh){
            }else{
                this.dataCache = [];
                this.reset();
                this.rock();
            }

            this.callSuperMethod("refresh");
        },

        extend: function(opt){
            var clone = this.callSuperMethod('extend', opt);

            var events = opt && opt.events;
            
            //如果定义了事件 就不使用原来的事件
            if (events) {
                clone.events = function() {
                    events && events.call(this);
                };

                clone.eventsBinded = 0;
            }

            if(opt && opt.param){
                clone.paramCache = [];
            }

            /*
            if (clone.el) {

                if (_containerCountInfo[clone.el]) {
                    _containerCountInfo[clone.el]++;
                } else {
                    _containerCountInfo[clone.el] = 1;
                }
            }
            */


            return clone;
        },

        feed: function(model){
            model.feeded = 1;
            this.feedPool.push(model);
        },

        unfeed: function(){
        },

        setFeedData: function(data, cgiCount) {
            this.data = data;
            this.cgiCount = cgiCount;
        },

        resetData: function(){
            this.dataCache = [];
            this.cgiCount = 0;

            this.onreset && this.onreset();
        },

        update: function(data){
            this.setData(data);

            this.rock();
        },

        setData: function(cgiCount, data){
            this.dataCache[cgiCount] = data;
        },

        getCache: function(cgiCount){
            if (cgiCount === 0) {
                return this.localData;
            } else {
                return this.dataCache[cgiCount - 1];
            }
        }


    });

    Model.external("RenderModel", RenderModel);
})();
;(function(){
    // 逐步代替scrollHandle
    // scrollHelper复制一份 便于model控制
    var preScrollTop = 0;
    var scrollHandlerMap = {};

    var $ = Model.$;

    var scrollHelper = {
        bindEvent: function(container, id, scrollToHalfCallback) {
            var scrollDom = container;
            if ($.os.ios) {
                if ($(scrollDom)[0] == document.body) {
                    scrollDom = window;
                }
            }

            $(scrollDom).on("scroll", function() {
                var preScrollTop = 0,
                    throatTimer;

                return function(e) {
                    window.clearTimeout(throatTimer);
                    throatTimer = window.setTimeout(onScroll, 200);

                    function onScroll() {
                        var self = this;
                        var container = e.target;
                        var scrollTop,
                            scrollHeight,
                            windowHeight,
                            loadStartValue = 300;

                        //android 和 ios 5以下版本
                        if (container == document) {
                            scrollTop = window.scrollY;
                            windowHeight = window.innerHeight;
                            scrollHeight = document.body.scrollHeight;
                        }
                        //ios 5+版本
                        else {
                            var style = window.getComputedStyle(container);
                            scrollTop = container.scrollTop;
                            windowHeight = parseInt(style.height) + parseInt(style.paddingTop) + parseInt(style.paddingBottom) + parseInt(style.marginTop) + parseInt(style.marginBottom);
                            scrollHeight = container.scrollHeight;
                        }

                        //滚动到距离屏幕底部N像素时进行加载，N取决于loadStartValue
                        if (scrollTop + windowHeight + loadStartValue >= scrollHeight) {
                            scrollToHalfCallback && scrollToHalfCallback(e);
                        }

                        preScrollTop = scrollTop;
                    }
                };
            }());

        },
        removeModel: function(model) {
            var scrollEl = model._scrollEl;
            if (scrollEl) {
                var el = scrollEl;
                if (typeof scrollEl == "string") {
                    el = $(scrollEl);
                }

                var id;
                if (el == window || el[0] == window || el.selector === "window") {
                    id = '__window__';
                } else {
                    id = el.attr("id");
                }


                if (el && el.length && id) {
                    for (var i = 0; i < scrollHandlerMap[id].length; i++) {
                        if (scrollHandlerMap[id] === model) {
                            break;
                        }
                    }

                    scrollHandlerMap[id].splice(i, 1);
                }
            }
        },

        addModel: function(model) {
            var scrollEl = model.scrollEl;
            var el = scrollEl;
            if (typeof scrollEl == "string") {
                el = $(scrollEl);
            }


            var id;
            if (el == window || el[0] == window || el.selector === "window") {
                id = '__window__';
            } else {

                id = el.attr("id");
                if (id) {} else {
                    id = "d_" + ~~(100000 * Math.random());
                    el.attr("id", id);
                }
            }


            if (scrollHandlerMap[id]) {
                scrollHandlerMap[id].push(model);
            } else {
                scrollHandlerMap[id] = [model];

                this.bindEvent(
                    el,
                    id,
                    function() {

                        scrollHandlerMap[id].map(function(item) {
                            if (item.type == "ScrollModel") {
                                if (!item.freezed && item.scrollEnable) {
                                    var event = Model.createEvent({
                                        type: "scrollToBottom",
                                        target: item,
                                        name: 'anonymouse'
                                    });

                                    item.dispatchEvent(event);
                                }
                            } else {

                                if (!item.freezed && item.currModel.type == "scrollModel" && !item.currModel.freezed && item.currModel.scrollEnable) {

                                    item.currModel.rock();
                                }
                            }
                        });
                    }
                );
            }

        }
    };

    var ScrollModel = Model.Class("BaseModel", {
        type: "ScrollModel",

        _resetPrivateFlag: function(){
            this.get("rendered").set(0);
        },

        extend: function(opt){
            var clone = this.callSuperMethod('extend', {scrollEl: this.scrollEl});

            clone.renderModel = this.renderModel.extend(opt);

            return clone;
        },
        constructor: function(opt){
            //this.addAcceptOpt(['scrollEl']);
            this.callSuper();
            this.scrollEl = opt.scrollEl || window;

            var scrollLock = this.get("scrollLock");

            this.renderModel = new RenderModel(opt);
            this.renderModel.active = function(){
                this.render(this.el);
            };

            this.renderModel.addEventListener("completed", function(e){
                scrollLock.set(0);
            });

            this.renderModel.addEventListener("errored", function(e){
                scrollLock.set(0);
            });

            this.addEventListener("scrollToBottom", function(e){
                if(! scrollLock.value){
                    scrollLock.set(1);

                    this.renderModel.rock();

                    e.stopPropagation();

                }
            });

            this.addEventListener("beforeactived", function(e){
                this.scrollEnable = 1;
            });

            // 以下方法调用元素方法
            
            this._registerInnerMethod(['hide', 'show', 'feed', 'isFirstDataRequestRender', 'el', 'renderContainer', 'beforeRequest', 'freeze', 'melt', 'onreset',  'reset', 'url', 'data', 'cgiCount'], this.renderModel);


        },

        refresh: function(){
            this.reset();
            this.renderModel.dataCache = [];
            this.renderModel.reset();

            this.rock();
        },

        active: function(e){
            // 如果第一次还要render
            var rendered = this.get("rendered");

            if(! rendered.value){
                // 加上去
                scrollHelper.addModel(this);


                rendered.set(1);
            }

            //this.renderModel.reset();
            this.renderModel.rock();


        },
        
        unactive: function(e){
            this.scrollEnable = 0;
        }
        
    });

    Model.external("ScrollModel", ScrollModel);
})();
;(function(){
    var $ = Model.$;
    // 生命周期只有一次
    // rock之后即脱离父元素
    // 被真正的model替代
    var LoadModel = Model.Class("BaseModel", {
        type: "LoadModel",
        // url name 
        constructor: function(opt){
            this.callSuper();

            this.moduleName = opt.moduleName;
            this.name = opt.name;
        },

        // 预先加载的逻辑
        load: function(callback){
            var name = this.name;
            // 先寻找是否有外放的tab
            var key = "recieveModel" + name;
            var realizeKey = "realizeModel" + name;
            var _this = this;

            var recieveFunc = function(name, model, onswitch) {
                if (name && model) {

                    // 替换自己
                    _this.parent && _this.parent.replaceChild(_this, model);


                    _this.dispatchEvent(Model.createEvent({
                        type: "completed",
                        target: _this,
                        name: "anonymouse"
                    }), model, onswitch);


                    window[key] = null;
                    delete window[key];

                    callback && callback(model);
                }
            };

            if (window[realizeKey]) {
                window[realizeKey](recieveFunc);
            } else {
                window[key] = recieveFunc;

                // 加载模快
                Model.load(this.moduleName, function(e){
                    
                });
            }            
        },
        active: function(e){
            var parent = this.parent;
            var _this = this;

            this.load(function(model){
                model.rock();

                // 检查父亲元素进行预先加载
                if(parent){
                    for(var i = 0; i < parent.children.length; i ++){
                        var item = parent.children[i];

                        if(item !== _this && item.type === "LoadModel"){
                            item.load();
                        }
                    }
                }

            });

            
        },

        unactive: function(e){
        }
    });

    Model.external("LoadModel", LoadModel);
})();

;(function(){
    var LinkModel = Model.Class("BaseModel", {
        type: "LinkModel",
        constructor: function(opt){
            this.addAcceptOpt(['popBack', 'checkBack', 'newWindow']);
            this.callSuper(opt);
        },

        _popBack: function(){
            window.history.back();
        },

        _openUrl: function(url, isNewWindow){
            if(isNewWindow){
                window.open(url, "_blank");
            }else{
                window.location = url;
            }
        },

        active: function(e){
            var query = "";
            var param = this.param;

            if (typeof this.param === "function") {
                param = this.param.call(this);
            }

            if (this.popBack) {
                this._popBack();
            }

            if (param) {
                var tmp = [];

                for (var i in param) {
                    tmp.push(i + '=' + (param[i] || ""));
                }

                query = tmp.join("&");
            }

            var url;

            if (query) {
                url = this.url + "?" + query;
            } else {
                url = this.url;
            }

            if (url) {
                if (this.checkBack) {
                    var referer = document.referrer;

                    if (referer.indexOf(this.url) > -1) {
                        history.back();
                        return;
                    } else {}
                }

                if (this.newWindow) {
                    this._openUrl(url, true);
                } else {
                    this._openUrl(url);
                }
            }
        }
    });

    Model.external("LinkModel", LinkModel);
})();
;(function(){
    var CgiModel = Model.Class("RenderModel", {
        type: "CgiModel",
        constructor: function(opt){
            this.callSuper(opt);
        },

        noCache: 1,

        getData: RenderModel.prototype.getData,

        active: function(){
            var _this = this;

            this._args = arguments;

            this.getData(function(data) {
                _this.processData && _this.processData.call(_this, data, _this.cgiCount);
                _this.complete && _this.complete.call(_this, data, _this.cgiCount);
            });
        }
    });

    Model.external("CgiModel", CgiModel);

})();
