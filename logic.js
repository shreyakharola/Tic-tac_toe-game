let boxes=document.querySelectorAll(".box");
let resetbtn=document.querySelector("#reset");
let newGameBtn =document.querySelector("#new-btn");
let msgContainer =document.querySelector(".msg-container");
let msg =document.querySelector("#msg");


let turn0 = true; //playerX, player0

const winpattern =[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];
const resetGame =() =>{
    turn0=true;
    enableBoxes();
    msgContainer.classList.add("hide");
    // Remove color classes from all boxes
    boxes.forEach((box) => {
        box.classList.remove("green-text", "blue-text");
    });
};


boxes.forEach((box) =>{
    box.addEventListener("click", () => {
        console.log("box was clicked");
       if (turn0){//player0
        box.innerText="0";
        box.classList.add("green-text");
        turn0 =false;
       }else{//playerX
        box.innerText="X";
        box.classList.add("blue-text");
        turn0=true;
       }
       box.disabled=true;//you can't change your move

       checkWinner();
    });
});

const disableBoxes =()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}
const enableBoxes =()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner = (winner) =>{
    let color;
    if (winner === 'X') {
        color = 'blue';
    } else if (winner === 'green') {
        color = 'green';
    } else {
        return; // Invalid winner, do nothing
    }
    msg.innerHTML = `Congratulations!! Winner is <span style="color: ${color};">${winner}</span>!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};
const checkWinner = () => {
    let count = 0;

    for (let pattern of winpattern) {
        let post1Val = boxes[pattern[0]].innerText;
        let post2Val = boxes[pattern[1]].innerText;
        let post3Val = boxes[pattern[2]].innerText;

        if (post1Val !== "" && post2Val !== "" && post3Val !== "") {
            if (post1Val === post2Val && post2Val === post3Val) {
                console.log("winner", post1Val);
                showWinner(post1Val);
                return; // Exit early if a winner is found
            }
        }
    }

    for (let box of boxes) {
        if (box.innerText !== "") {
            count++; // Increment count for each filled box
        }
    }

    if (count === boxes.length) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};
newGameBtn.addEventListener("click", resetGame);

resetbtn.addEventListener("click", resetGame);