/*
Copyright 2016 Jeffrey Meng

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
(function(window) {
    //I recommend this
    "use strict";

    function define_library() {
        var filter = {};
        filter.name = "Filter.JS";
        filter.verson = "0.1.0";
        // UTILS
        //warns user
        var warn = function(message, type) {
            if (console.warn) {
                console.warn("FilterJS Warning" + type + ": " + message);
            }
            else {
                console.log("FilterJS Warning" + type + ": " + message);
            }
        };
        var error = function(message, type) {
            var e = new Error(message); // e.name is 'Error'
            
            if (type) {
                type = " " + type + " ";
            }
            else {
                var type = " ";
            }
            e.name = "FilterJS" + type + "error";
            throw e;
            // e.toString() would return 'ParseError: Malformed input'
        };
        //merges the defualt options with the new options.
        //if overwrites defualt with newInfo, but keeps the options in defualt if it dosen't exist in newInfo
        var merge = function(defualt, newInfo) {
            var result = {};
            for (var attrname in defualt) {
                result[attrname] = defualt[attrname];
            }
            for (attrname in newInfo) {
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
        var defualtSearchOptions = {
            range: {
                "SEARCH": 1,
                "OTHER": 1
            }
        };

        function validateSearchOptions(options) {
            if (options === null) {
                error("You did not provide an options object to filter.search(selector, options)", "options");
                return false;
            }
            if (options.input !== null && options.output !== null && options.keys !== null) {
                
            }
            else {
                error("The options object provided did not contain the required fields input, output, and keys. The option input may have been provided as a parameter in new filter.search(inputSelector, options);, or may not have been included in the options object, if the function was called as new filter.search(optionsContaingInput); Refer to the documentation for more information", "options")
            }
        }

        // END of UTILS

        filter.search = function(selector, options) {
            if (!(this instanceof filter.search)) {
                // the constructor was called without "new". To avoid changing the global scope, return a new filter.searchField.
                warn("You did not use the new constructor for filter.search(). Please call it as: var mySearch = new filter.search(selector, options); This error has been automatically fixed by filter.js, but should be fixed in your code for best results. Refer to the documentation for more information", "constructor");
                return new filter.search(selector, options);
            }

        };


        return filter;
    }
    //define globally if it doesn't already exist
    if (typeof(Library) === 'undefined') {
        window.filter = define_library();
    }
    else {
        console.log("Library already defined.");
    }
})(window);
