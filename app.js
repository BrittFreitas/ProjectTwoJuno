const app = {};
//poetry quiz app
//minimum viable product:
//utilizing poetrydb API fetch a random poem title and display it to page
//1. create a landing page with app title, description, and a button to start the quiz
//attach the event lsiter to the parent element of the li's, on click it we will save the event.target
//event listener on button click that links to quiz page
// const modes = document.querySelector(".modes");
// console.log(modes)


app.getQuestion = () => {
  fetch("https://poetrydb.org/random/3")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      app.poemArray = data;
      app.poemInfo = data[app.getRandomIndex(app.poemArray)];
      app.poetName = app.poemInfo.author;
      app.displayPoet();
      app.displayPoem(app.poemArray);
      app.checkAnswer();
    });
};

app.selectMode = () => {
  app.modes.forEach((mode) => {
    mode.addEventListener("click", (event) => {
      app.modeId = event.target.id;
    });
  });
};


app.startQuiz = () => {
  app.counter = 0;
  app.numOfNextClicks = 0;

  app.getQuestion();
  app.startButton.addEventListener("click", () => {
    app.selectMode();
    // template literals allow us to target IDs on the page using modeId from app.selectMode();
    document
      .getElementById(`${app.modeId}Game`)
      .scrollIntoView({ behavior: "smooth" });
  });
};

//2. display a random poem title
// make a fetch to the random endpoint of the api and grab the title of the poem
//using .textContent property to get the title into the .titleContainer div

app.displayPoet = () => {
  app.poetContainer = document.querySelector(".poetContainer");
  app.poetContainer.innerHTML = `<h3>${app.poetName}</h3>`;
};

//display 3 random poem titles into li class options
app.displayPoem = (array) => {
  app.poemTitleContainer.innerHTML = "";
  array.forEach((poemInfo) => {
    const listItem = document.createElement("li");
    listItem.className = "options";
    listItem.textContent = `${poemInfo.title}`;
    app.poemTitleContainer.appendChild(listItem);
  });
};

//function to check answer against the poem names displayed to locate correct answer

app.once = {
  once: true,
};

app.checkAnswer = () => {
  app.poemTitleContainer.addEventListener(
    "click",
    app.selectionCheck,
    app.once
  );
};

//creating a function to compare user choice with the poem written by poet name displayed

app.selectionCheck = (event) => {
  app.userChoice = event.target;
  console.log(app.userChoice);
  app.rightAnswer = event.target.innerText;
  app.userChoice.classList.remove("correct", "incorrect");
  if (app.rightAnswer === app.poemInfo.title) {
    console.log("very nice");
    app.counter = app.counter + 1;
    console.log(app.counter);
    app.userChoice.classList.add("correct");
  } else {
    console.log("wrong answer LOSER");
    console.log(app.counter);
    app.userChoice.classList.add("incorrect");
  }
  app.currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
};

//function to make sure the user clicks something before being able to go to next question
//function that invokes the question tracker when user clicks the next question button
app.nextButton = document.querySelector(".next");
app.nextButton.addEventListener("click", () => {
   app.questionTracker();
});

  
app.finishButton = document.querySelector(".finish");
//function that tracks the number of questions answered
app.questionTracker = () => {
  app.totalQuestions = 5;
  app.numOfNextClicks = app.numOfNextClicks + 1;
  if (app.numOfNextClicks >= app.totalQuestions) {
    console.log(app.numOfNextClicks);
    app.finalScore = document.querySelector(".finalScore");
    app.finalScore.innerHTML = `Your final score is ${app.counter}/${app.totalQuestions}`;
  } else if (app.numOfNextClicks === app.totalQuestions - 1) {
    app.getQuestion();
    //app.nextButton.textContent = "Finish";

    app.finishButton.classList.remove("hidden");
    app.nextButton.classList.add("hidden");
    

    console.log(app.numOfNextClicks);
  } else if (app.numOfNextClicks < app.totalQuestions) {
    app.getQuestion();
    console.log(app.numOfNextClicks);
  }
};

app.restartQuiz = () => {
  const restart = document.querySelector(".restart");
  restart.addEventListener("click", () => {
    console.log("test");
    app.startQuiz();
    app.finishButton.classList.add("hidden");
    app.nextButton.classList.remove("hidden");
   
  });
};

// TO-DO:
//BUGS: use should be able skip Q, and user should not be able to select next if they havent chosen an option
// TO-DO:need to use .map() / .filter() to make sure none of the three randomly selected poems have same authors
// TO-DO: if app.modeId is empty, prompt users to select a dificulty


//HARD MODE BEGINS HERE
app.getHardPoem = () => {
  
  fetch("https://poetrydb.org/random")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data);
    app.randomHardPoem = data[0].title;
    app.displayRandomPoemHard();

  });
}

//function that appends a random poem title from the API
app.displayRandomPoemHard = ()=> {
  app.titleContainer = document.querySelector(".titleContainer");
  app.titleContainer.innerHTML = `<h2>${app.randomHardPoem}</h2>`;
  
} 

// app.checkHardAnswer = () => {
//   const userHardInput = 
// }

const formInput = document.querySelector("form");
formInput.addEventListener('submit', (event)=> {
  event.preventDefault;
  console.log('test');
  //console.log(input[id="textbox"].value)
});


//app.submitAnswer = 
//call a functiont hat appends poem title to the titleContainer class
// functions that checks us input agains the corresponding author of the poem title we displayed
// alot a point if user gets correct, user answers 10 questions



//function to fetch data for random poems


//3. provide options of poets
//correct option to be selected from the poem object
//use the author endpoint on the api to fetch a random poet using a random index number function
//use a conditional to denote that if an index has been chosen, dont choose it again
//4. user to select correct poet
//attach and event listener to the list of poet options
// use the target method to discern which button in our list of buttons was pressed
// use a conditional to check if the button they clicked matches the poet that lives within the poem title object (bubbling thing)
//4. create a counter to display the user's score. Have it increase and decrese based on users answers
//if conditional is true counter = counter + 1, else don't move counter

//stretch goals:
// Hints: display the first few lines of a poem if a user needs a hint
// Skip feature to allow user to move past question
//creating an easy, hard, panic mode; hard mode simply has a textbox for user to input poet name and user must answer 20 questions to finish quiz, easy mode has hints and a selection of poets to choose from, one 10 questions. Panic mode has a countdown that user must select answer within, no limit to questions.\

app.getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

app.init = () => {
  app.modes = document.querySelectorAll(".modes");
  app.startButton = document.querySelector(".start");
  app.poemTitleContainer = document.querySelector(".poemTitleContainer");
  app.currentScore = document.querySelector(".currentScore");
app.getHardPoem();
  app.restartQuiz();

  app.selectMode();
  app.startQuiz();
  // app.nextQuestion();
};

app.init();
