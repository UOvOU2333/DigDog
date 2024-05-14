    var IsClear = false;
    function get(key){
        var str = document.getElementById("text").value;
        if(str.length < 20){
        str = (str == "0" ? "" : str);
        if(str == "" && key == '00'){str = "0";}
        else{str += key;}}
        document.getElementById("text").value = str;}
    function goBack(){
        var str = document.getElementById("text").value;
        str = str.substring(0,str.length-1);
        if(str=="") str="0";
        document.getElementById("text").value = str;}
    function clearText(){
        document.getElementById("text").value = "0";}
    function eq(){IsClear = true;
        var str = document.getElementById("text").value;
        var result = eval(str)
        document.getElementById("text").value = result;}
