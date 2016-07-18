(function(window){
    //I recommend this
    'use strict';
    function define_library(){
        var filter = {};
        var name = "Filter.JS";
        var verson = "0.1.0";
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
