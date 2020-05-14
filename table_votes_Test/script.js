const upVoteBtn = document.querySelectorAll(".upVote");
const downVoteBtn = document.querySelectorAll(".downVote");

// Increments the count when the Upvote button is clicked
function upClick(event){
    var count = event.target.parentElement.parentElement.getElementsByClassName("count")[0];
    countVal = count.innerHTML;
    countVal++;
    count.innerHTML= countVal;
    
}
// Decrements the count when the Upvote button is clicked
function downClick(event){
    var count = event.target.parentElement.parentElement.getElementsByClassName("count")[0];
    countVal = count.innerHTML;
    countVal--;
    count.innerHTML= countVal;
    
}
// Sorts the rows according to the count
function switchUp(event){
    let table = document.querySelector(".myTable");
    let row = table.querySelectorAll("tr");
    for(i = 0; i < row.length-1; i++){

        var countU =row[i].getElementsByClassName("count")[0];
        var countD =row[i+1].getElementsByClassName("count")[0];
        var objU =row[i].getElementsByClassName("name")[0];
        var objD =row[i+1].getElementsByClassName("name")[0];

        

        if(parseInt(countU.innerHTML) < parseInt(countD.innerHTML)){ // SWITCH ROWS
            console.log("SWITCH");
            console.log(countU.innerHTML+" is smaller than" +countD.innerHTML);
            temp  = objU.innerHTML;
            objU.innerHTML = objD.innerHTML;
            objD.innerHTML = temp;

            temp = countU.innerHTML;
            countU.innerHTML = countD.innerHTML;
            countD.innerHTML = temp;
        }
    }

}

console.log(upVoteBtn);


upVoteBtn.forEach(element=>{
    element.addEventListener("click", ()=> {
        upClick(event);
        switchUp(event);
    });
})

downVoteBtn.forEach(element=>{
    element.addEventListener("click", ()=>{
        downClick(event);
        switchUp(event);
    })
})