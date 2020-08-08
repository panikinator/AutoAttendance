var button = document.getElementById("sum");
var lists = document.getElementById("list");
var completed = document.getElementById("complete");
var txt = "";
var present = [];
var i=0;

var output = document.getElementById("output");

function clickHandler(){
    output.innerHTML = "Started";
    var file = document.getElementById("file-selector").files[0];
    Tesseract.recognize(
    "text.jpg",
    'eng',
    { logger: m => completed.innerHTML = m.progress.toFixed(2) * 100 }
    ).then(({ data: { text } }) => {console.log(text); txt = text;lists.innerHTML = txt;var tmp = "";
        for(i =0; i < txt.length;i++)
    {
        txt = txt.replace(" ","");
        tmp ="";
        if (txt.charAt(i) === "C"){
            if (!isNaN (txt.charAt(i+1))){
                tmp = txt.charAt(i+1).toString();
                if(!isNaN(txt.charAt(i+2))){
                    tmp = tmp + txt.charAt(i+2).toString();
                }
            }
        }
        
        if(tmp !== ""){
            present.push(parseInt(tmp));
        }

    }
    console.log(present);
    var out = "";
    present.sort();
    for(var a = 0;a < present.length;a++){
        out = out + present[a] + ", ";
    }
    document.getElementById("Presentees").innerHTML = out;

    var outAbsent = "";
    present.push(6);
    present.push(22);
    for(var b = 1;b < present.length;b++){
        if(!present.includes(b)){
            outAbsent = outAbsent + b + ", ";
        }
    }
    document.getElementById("absent").innerHTML = outAbsent;

    });

    

    
}

button.addEventListener("click",clickHandler);