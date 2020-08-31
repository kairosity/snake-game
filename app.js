document.addEventListener('DOMContentLoaded', () => {
    const squares = document.querySelectorAll('.grid div')
    const scoreDisplay = document.querySelector('span')
    const startBtn = document.querySelector('.start')
  
    const width = 10
    let currentIndex = 0 //so first div in our grid
    let appleIndex = 0 //so first div in our grid
    let currentSnake = [2,1,0] 
    let direction = 1
    let score = 0
    let speed = 0.9
    let intervalTime = 0
    let interval = 0
  

    //to start and restart the game
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'))
        squares[appleIndex].classList.remove('apple')
        clearInterval(interval)
        score = 0
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentSnake.forEach(index => squares[index].classList.add('snake')); //goes through the current snake array and adds the class of snake to each to place on grid
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that deals with all the move outcomes of the snake
    function moveOutcomes() {
        //deals with snake hitting border or itself / 
        //direction moves right 1 div each move, so direction = 1 is a move right. direction = -1 is a move left. 
        //direction === width is a move down +10 since width = 10. 
        //direction === -width is -10 which is 1 up. since the grid is 10 wide.

        if(
            (currentSnake[0] + width >= (width * width) && direction === width ) || //if snake hits bottom it's head's grid number say 2+10 = 12 - is that greater than 100? if it is then the snake's head has passed the last grid point thus hit the bottom.
            (currentSnake[0] % width === width -1 && direction === 1 ) || //if snake hits right wall - if it's already at the last grid place on the line and it keeps going forward by 1, then it hits right wall.
            (currentSnake[0] % width === 0 && direction === -1 ) || //if snake hits left wall.
            (currentSnake[0] - width < 0 && direction === -width) ||
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
           return clearInterval(interval); 

        }

        const tail = currentSnake.pop(); //removes last item in the snake array and shows it (tail)
        squares[tail].classList.remove('snake'); //removes the class of tail from that item.
        currentSnake.unshift(currentSnake[0]+ direction); // adds the direction to the head of the array. moves the snake forward etc.. so if currentSnake[0] was 2 and it is moved forward direction 1 then currentSnake[0] would now be 3? 

        console.log(currentSnake[0]);

        //deals with the snake getting the apple.
        if(squares[currentSnake[0]].classList.contains('apple')){
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake'); // adds length to the tail? 
            currentSnake.push(tail); //adds the tail to the end of the snake array.
            randomApple(); //generate a random apple.
            score++; //adds 1 to the score
            scoreDisplay.textContent = score; //updates score on the page.
            clearInterval(interval); //clear the interval time.
            intervalTime = intervalTime * speed; //our speed is 0.9 so this will decrease the interval time each time it's updated and make the snake move faster.
            interval = setInterval(moveOutcomes, intervalTime);
        }

        squares[currentSnake[0]].classList.add('snake'); //adds the snake class to where the snake now is so we can see it.
    };
    
    //generate a new apple once apple is eaten

    function randomApple(){
        do{
            appleIndex = Math.floor(Math.random() * squares.length) //generate a random placement for the apple
        } while(squares[appleIndex].classList.contains('snake'))//squares[appleIndex] is just the square where the new apple is going to be. when it contains snake that means the snake has eaten the apple. So it needs to generate a new apple.
        squares[appleIndex].classList.add('apple');
    };


    //assigns functions to keycodes
    function control(e){
        squares[currentIndex].classList.remove('snake');

        if(e.keyCode === 39){
            direction = 1; //if we press the right arrow the snake will go right one square.
        } else if(e.keyCode === 38){
            direction = -width; //if we press the up arrow the snake will go back 10 divs, appearing to go up one.
        } else if(e.keyCode === 37){
            direction = -1; //if we press left, the snake will go left one div.
        } else if(e.keyCode === 40){
            direction = +width; //if we press down the snake will go forward 10 divs appearing to go down one.
        }
    }
    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

    
    
});