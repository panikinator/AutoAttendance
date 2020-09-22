var button = document.getElementById("sum");
var lists = document.getElementById("list");
var completed = document.getElementById("complete");
var copyabsentbutton = document.getElementById("copyabsent");
var copypresentbutton = document.getElementById("copypresent");
var txt = "";
var present = [];
var absent = [];
var presentRollInText = "";
var absentRollInText = "";
var i=0;
var result = document.getElementById("accordionExample");
result.style.visibility = "hidden";
var currentStatus = false;

var part = document.getElementById("alert");
var part2 = document.getElementById("alert2");

part.style.visibility = "hidden";
part2.style.visibility = "hidden";



var output = document.getElementById("output");


function getPresentRolls(textIn){
  let tmp;
  let presentTmp = [];
  for(i =0; i < textIn.length;i++)
        {
            textIn = textIn.replace(" ","");
            textIn = textIn.replace("c","C");
            tmp ="";
            if (textIn.charAt(i) === "C"){
                if (!isNaN (textIn.charAt(i+1))){
                    tmp = textIn.charAt(i+1).toString();
                    if(!isNaN(textIn.charAt(i+2))){
                        tmp = tmp + textIn.charAt(i+2).toString();
                    }
                }
            }
            
            if(tmp !== ""){
                presentTmp.push(parseInt(tmp));
            }
        }
  return presentTmp;
}



function getAbsentRolls(presentRolls)
{
  let absentTmp = [];
  for(i = 1; i <= 47; i++)
    {
      if(!presentRolls.includes(i))
        {
          absentTmp.push(i);
        }
    }
  
  return absentTmp;
  
}


function getPresentInText(presentArray)
{
  let presentText = "";
  for(let p in presentArray)
    {
      presentText = presentText + presentArray[p] + " ,";
    }
  presentText = presentText.slice(0, presentText.length-2);
  return presentText;
}

function getAbsentInText(absentArray)
{
  let absentText = "";
  for(let ab in absentArray)
    {
      absentText = absentText + absentArray[ab] + ", ";
    }
  absentText = absentText.slice(0, absentText.length-2);
  return absentText;
}


function clickHandler(){
  if(!currentStatus){
    var file = document.getElementById("file-selector").files[0];
    result.style.visibility = "hidden";
    part.style.visibility = "hidden";
    part2.style.visibility = "hidden";
    output.innerHTML = "";
    currentStatus = true;
    completed.innerHTML = "";
    part2.innerHTML = "";

    if (document.getElementById("file-selector").files.length != 0) {
        output.innerHTML = "";
        completed.innerHTML = "";
        part2.innerHTML = "";
        part.style.visibility = "visible";
        output.innerHTML = "Processing";
        present = [];
        Tesseract.recognize(
        file,
        'eng',
        { logger: m => completed.innerHTML = Math.round(m.progress.toFixed(2) * 100 ) + "%"}
        ).then(({ data: { text } }) => {console.log(text); txt = text;lists.innerHTML = txt;var tmp = "";
        output.innerHTML = "";
        completed.innerHTML = "";
        part.style.visibility = "hidden";
        part2.style.visibility = "visible";
        part2.innerHTML = "<div class='alert alert-success' role='alert'>Completed</div>";
    
          
        present = getPresentRolls(txt);
        present = present.sort();
            
        console.log(present);
        presentRollInText = getPresentInText(present);
        
        document.getElementById("Presentees").innerHTML = presentRollInText;
    
        present.push(6);
        present.push(22);
        absent = getAbsentRolls(present);
        absentRollInText = getAbsentInText(absent);
        document.getElementById("Absentees").innerHTML = absentRollInText;
        result.style.visibility = "visible";
        currentStatus = false;
    
        });
    
    }

    else {
        output.innerHTML = "";
        completed.innerHTML = "";
        part2.style.visibility = "visible";
        part2.innerHTML = '<div class="alert alert-warning" role="alert">A file must be selected!</div>';
    }
    
}}

button.addEventListener("click",clickHandler);
//copypresentbutton.addEventListener("click",CopyPresent);
//copyabsentbutton.addEventListener("click",CopyAbsent);
