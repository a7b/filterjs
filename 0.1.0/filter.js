(function(window) {
    'use strict';

    function define_filter() {
        var filter = {};
        filter.name = "Filter.JS";
        filter.verson = "0.1.0";
        // UTILS
        //warns user
        var warn = function(message, type) {
            var t;
            if (type) {
                t = " " + type + " ";
            }
            else {
                t = " ";
            }
            if (console.warn) {
                console.warn("FilterJS" + t + "Warning: " + message);
            }
            else {
                console.log("FilterJS" + t + "Warning: " + message);
            }
        };
        var error = function(message, type) {
            var t;
            if (type) {
                t = " " + type + " ";
            }
            else {
                t = " ";
            }
            var e = new Error(message);

            e.name = "Filter.js" + t + "error";
            throw e;


        };

        //merges the defualt options with the new options.
        //if overwrites defualt with newInfo, but keeps the options in defualt if it dosen't exist in newInfo
        var merge = function(defualt, newInfo) {
            var result = {};
            for (var attrname in defualt) {
                result[attrname] = defualt[attrname];
            }
            for (var attrname in newInfo) {
                result[attrname] = newInfo[attrname];
            }
            return result;
        };

        //get's an object and adds some utils to the wrapper. Sort of like jquery, but a lot fewer functions.
        var getElement = function(selector) {
            var wrapper = document.querySelector(selector);

            // get Dom wrapper.
            //function to add custom functions to the wrapper.
            this.addFunction = function(name, code) {
                // if code is undefined, assume name is an object with name:function pairs
                //enumerate the object name
                if (!code) {

                    for (var key in name) {
                        //check is item is not a prototype
                        if (name.hasOwnProperty(key)) {

                            var value = name[key];
                            //set function name in the wrapper to the value(function code)
                            wrapper[key] = value;

                        }
                    }
                }
                //there is only one function being defined. Set the name to the function(code)
                else {
                    wrapper[name] = code;
                }
            };


            //add utility functions
            this.addFunction({
                //returns or modifies the value of an input or textarea field
                "val": function(val) {
                    //if val is undefined, assume we want to read it and return the value
                    if (val === null) {
                        return this.value;
                    }
                    //else set the value to val
                    else {
                        this.value = val;
                    }
                },
                //returns the html string of an element.
                "html": function(val) {
                    //if html is undefined, assume we want to read it and return the html
                    if (!val) {
                        return this.innerHTML;
                    }
                    //else set the value to html
                    else {
                        this.innerHTML = val;
                    }
                },
                // class functions: adds or removes a class. 
                "addClass": function(className) {
                    if (this.classList)
                        this.classList.add(className);
                    else
                        this.className += ' ' + className;
                },
                "hasClass": function(className) {
                    if (this.classList)
                        return this.classList.contains(className);
                    else
                        return new RegExp('^| ' + className + ' |$', 'gi').test(this.className);
                },
                "removeClass": function(className) {
                    if (this.classList) {
                        this.classList.remove(className);
                    }
                    else {
                        this.className = this.className.replace(new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ');
                    }
                },
                //event handler
                "on": function(event, handler) {
                    if (this.addEventListener) {
                        this.addEventListener(event, handler);
                    }

                    else {
                        this.attachEvent('on' + event, function() {
                            handler.call(this);
                        });
                    }
                },
                //hides an element
                "hide": function() {
                    this.style.display = 'none';

                },
                //shows an element
                "show": function() {
                    this.style.display = 'block';
                }


            });
            return wrapper;

        };
        //returns false if options do not pass. Else returns final options object
        var processRequiredSearchOptions = function(options) {
            var defualtOptions = {
                "keys": false,
                "weights": {
                    "query": 1,
                    "keys": 1
                },
                "parser":filter.parser
            };

            
            if (options.output && options.input && options.data) {
                return merge(defualtOptions, options);
            } else {
                return false;
            }
        };
        // END of UTILS

        filter.search = function(selector, options) {
            if (!(this instanceof filter.search)) {
                // the constructor was called without "new". To avoid changing the global scope, return a new filter.search
                warn("constructor");
                return new filter.search(selector, options);
            }
            var finalOptions;
            if (!options) {
                //assume that selector is in options
                finalOptions = processRequiredSearchOptions(selector);
            } else {
                options.input = selector;
                finalOptions = processRequiredSearchOptions(options);
            }
            var element = getElement(finalOptions.input);
            console.log(element);
            
        };


        return filter;
    }
    //define globally if it doesn't already exist
    if (typeof(filter) === 'undefined') {
        window.filter = define_filter();
    }
    else {
        console.log("Library already defined.");
    }
})(window);
