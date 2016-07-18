(function(window){
    //I recommend this
    'use strict';
    function define_library(){
        var filter = {};
        var name = "Filter.JS";
        var verson = "0.1.0";
        var merge = /**
 * Overwrites obj1's values with obj2's and adds obj2's if non existent in obj1
 * @param obj1
 * @param obj2
 * @returns obj3 a new object based on obj1 and obj2
 */
function (obj1,obj2){
    var obj3 = {};
    for (var attrname in obj1) { obj3[attrname] = obj1[attrname]; }
    for (var attrname in obj2) { obj3[attrname] = obj2[attrname]; }
    return obj3;
}
        var options = {
            "allow-not":true,
            "allow-and":true,
            "allow-and-not":true,
            "allow"
        }
        filter.initalise = filter.init = function(options) {
            

        }
        
        
        return filter;
    }
    //define globally if it doesn't already exist
    if(typeof(Library) === 'undefined'){
        window.filter = define_library();
    }
    else{
        console.log("Library already defined.");
    }
})(window);
