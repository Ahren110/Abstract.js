/**
 * Model core file
 * @author dorsywang
 */
;(function(){
    var originInfo = console.info;
    var originLog = console.log;

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

        this.type = opt.type || "";
        this.name = opt.name;

        this.target = opt.target;
    };

    Event.prototype = {
        constructor: Event,
        
        stopPropagation: function(){
            this.bubble = false;
        }
    };

    var Model = {
        _config: {
            debug: 0,
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

                    xhr.open(opt.method, opt.url, true);
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
            if(opt.ajax){
                this._config.ajax = opt.ajax;
            }

            this._config.tmpl = opt.tmpl;
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

        trigger: function(eventName){
            if(this.fuseMap[eventName]){
                var event = this.createEvent({
                    target: this.fuseMap[eventName],
                    name: eventName,
                    type: "actived"
                });

                this.fuseMap[eventName].rock(event);
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
