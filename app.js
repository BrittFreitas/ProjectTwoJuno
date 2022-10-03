const app = {};

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

app.modeContainer = document.querySelector(".modeContainer");
app.modeContainer.addEventListener("click", (event) => {
  console.log(event)
})


app.startQuiz = () => {
  app.counter = 0;
  app.numOfNextClicks = 0;
  app.getQuestion();
  app.startButton.addEventListener("click", () => {
    app.selectMode();
    // template literals allow us to target IDs on the page using modeId from app.selectMode();
    console.log(`${app.modeId}Game`)
    document
      .getElementById(`${app.modeId}Game`)
      .scrollIntoView({ behavior: "smooth" });
  });
};

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
app.nextQuestionEasy = () => {
  app.nextButton = document.querySelector(".next");
  app.finishButton = document.querySelector(".finish");
  app.nextButton.addEventListener("click", () => {
    app.questionTracker();
  });
};

app.nextQuestionHard = () => {
  app.nextButton = document.querySelector(".nextHard");
  app.finishButton = document.querySelector(".finishHard");
  app.nextButton.addEventListener("click", () => {
    app.getHardPoem();
    app.questionTracker();
  });
};


//function that tracks the number of questions answered
app.questionTracker = () => {
  app.numOfNextClicks = app.numOfNextClicks + 1;
  if (app.numOfNextClicks >= app.totalQuestions) {
    console.log(app.numOfNextClicks);
    app.finalScore = document.querySelector(".finalScore");
    app.finalScore.innerHTML = `Your final score is ${app.counter}/${app.totalQuestions}`;
  } else if (app.numOfNextClicks === app.totalQuestions - 1) {
    app.getQuestion();
    app.finishButton.classList.remove("hidden");
    app.nextButton.classList.add("hidden");
    console.log(app.numOfNextClicks);
  } else if (app.numOfNextClicks < app.totalQuestions) {
    app.getQuestion();
    console.log(app.numOfNextClicks);
  }
};


// brings 
app.restartQuiz = () => {
  const restart = document.querySelector(".restart");
  restart.addEventListener("click", () => {
    app.startQuiz();
    app.finishButton.classList.add("hidden");
    app.nextButton.classList.remove("hidden");
    document
      .getElementById("landingPage")
      .scrollIntoView({ behavior: "smooth" });
  });
};


//HARD MODE BEGINS HERE
app.getHardPoem = () => {
  fetch("https://poetrydb.org/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      app.randomHardPoem = data[0];
      app.randomHardPoemTitle = app.randomHardPoem.title;
      app.displayRandomPoemHard();
    });
};

//function that appends a random poem title from the API
app.displayRandomPoemHard = () => {
  app.titleContainer = document.querySelector(".titleContainer");
  app.titleContainer.innerHTML = `<h2>${app.randomHardPoemTitle}</h2>`;
};


//function to track and display score in hard mode
const formInput = document.querySelector("form");
formInput.addEventListener("submit", (event) => {
  event.preventDefault();
  app.currentScoreHard = document.querySelector(".currentScoreHard");
 // app.userAnswer = event.target[0].value; 
  app.userAnswer = document.getElementById("textBox").value;
  if (app.userAnswer.toLowerCase() === app.randomHardPoem.author.toLowerCase()) {
    app.counter = app.counter + 1;
  } 
  app.currentScoreHard.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;

  document.getElementById("textBox").value = "";
});




// TO-DO:
//BUGS: use should be able skip Q, and user should not be able to select next if they havent chosen an option
// TO-DO:need to use .map() / .filter() to make sure none of the three randomly selected poems have same authors
// TO-DO: if app.modeId is empty, prompt users to select a dificulty


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
  app.totalQuestions = 5;
  app.nextQuestionEasy();
  app.nextQuestionHard();
  app.getHardPoem();
  app.restartQuiz();
  app.selectMode();
  app.startQuiz();

  // app.nextQuestion();
};

app.init();
