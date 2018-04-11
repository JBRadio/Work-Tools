
// ------ Sorting an array of objects ------


function sortObjectArrayByNumber(arr, property, dir) {
    // http://www.javascriptkit.com/javatutors/arraysort2.shtml
    
    dir = dir || "";
    
    arr.sort(function(a, b){
        if ( dir.toUpperCase() == "DESC" )
            return b[property]-a[property];
        else
            return a[property]-b[property];
    });    
    
    return arr;
}

function sortObjectArrayByString(arr, property, dir) {
    // http://www.javascriptkit.com/javatutors/arraysort2.shtml
    
    dir = dir || "";
    
    arr.sort(function(a, b){
        var nameA=a[property].toLowerCase(), nameB=b[property].toLowerCase();
        
        if ( dir.toUpperCase() == "DESC" ) {
            if (nameA > nameB) return -1;
            if (nameA < nameB) return 1;
            return 0;
            
        } else {
            if (nameA < nameB) //sort string ascending
            return -1 
            if (nameA > nameB)
            return 1
            return 0 //default return value (no sorting)
        }
    });
    
    return arr;
}

function sortObjectArrayByDate(arr, property, dir) {
    // http://www.javascriptkit.com/javatutors/arraysort2.shtml
    
    dir = dir || "";
    
    arr.sort(function(a, b){
        var dateA=new Date(a[property]), dateB=new Date(b[property])
        
        if ( dir.toUpperCase() == "DESC" )
            return dateA-dateB; //sort by date ascending
        else
            return dataB-dataA;
    })
}