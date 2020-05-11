const upVoteBtn = document.querySelectorAll(".upVote");
const downVoteBtn = document.querySelectorAll(".downVote");

function upClick(event){
    var count = event.target.parentElement.parentElement.getElementsByClassName("count")[0];
    countVal = count.innerHTML;
    countVal++;
    count.innerHTML= countVal;
    
}
function downClick(event){
    var count = event.target.parentElement.parentElement.getElementsByClassName("count")[0];
    countVal = count.innerHTML;
    countVal--;
    count.innerHTML= countVal;
    
}

function switchUp(event){
    
}

console.log(upVoteBtn);

upVoteBtn.forEach(element=>{
    element.addEventListener("click", upClick);
})

downVoteBtn.forEach(element=>{
    element.addEventListener("click", downClick);
})