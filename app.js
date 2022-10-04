const app = {};

app.getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

//add catch error
app.getPoemInfo = () => {
  fetch("https://poetrydb.org/random/10")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
        let poemArray = [];
        data.forEach((poem) => {
          if (poemArray.indexOf(poem.author) === -1 && poemArray.length < 3) {
            poemArray.push(poem);
          }
        });
      app.poemInfo = data[app.getRandomIndex(poemArray)];
      app.poetName = app.poemInfo.author;
      app.displayEasyQuestion();
      app.displayEasyAnswerOptions(poemArray);
      app.updateCurrentScoreEasy();
    });
};

// brings user to selected game mode and displays questions
app.startQuiz = () => {
  app.counter = 0;
  app.numOfNextClicks = 0;
  const modeSelectionForm = document.querySelector(".modeSelection");
  modeSelectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    // app.getPoemInfo();
    const modeSelected = document.querySelector("input[name='gameMode']:checked").value;
    if (modeSelected === "easy") {
      console.log("Easy")
      //call functions for easy mode
    } else if (modeSelected === "hard") {
      console.log("hard")
      // app.nextQuestionHard();
      // call functions for hard mode;
    }
    document
        .getElementById(`${modeSelected}Game`)
        .scrollIntoView({ behavior: "smooth" });
  });
};

// displays poet name in easy mode
app.displayEasyQuestion = () => {
  const poetContainer = document.querySelector(".poetContainer");
  poetContainer.innerHTML = `<h3>${app.poetName}</h3>`;
};

// displays 3 poem titles as answer options in easy mode
app.displayEasyAnswerOptions = (array) => {
  // app.poemTitleContainer = document.querySelector(".poemTitleContainer");
  document.querySelector(".easySubmit").disabled = false;
  let optionNumber = 0;
  array.forEach((poemInfo) => {
    optionNumber = optionNumber + 1;
    const poemTitle = poemInfo.title;
    const poemTitleLabel = document.querySelector(`label[for="option${optionNumber}"]`)
    poemTitleLabel.textContent = poemTitle;
  });
};

// updates and display current score after completion of each question in easy mode
app.updateCurrentScoreEasy = () => {
  const easyResponse = document.querySelector(".easyQuestion");
  easyResponse.addEventListener("submit", (event) => {
    event.preventDefault();
    app.selectedAnswer = document.querySelector("input[name='option']:checked");
    app.selectedPoemTitle = document.querySelector(`label[for="${app.selectedAnswer.id}"]`); 
    
    app.checkEasyAnswer();
    document.querySelector(".easySubmit").disabled = true;
    app.currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
  });
};

// checks if user selection is correct/incorrect in easy mode 
app.checkEasyAnswer = () => {
  if (app.selectedPoemTitle.innerText === app.poemInfo.title) {
    console.log("very nice");
    app.counter = app.counter + 1;
    console.log(app.counter);
    app.selectedPoemTitle.classList.add("correct");
  } else {
    console.log("wrong answer LOSER");
    console.log(app.counter);
    app.selectedPoemTitle.classList.add("incorrect");
  }
};

// displays next question in easy mode 
app.nextQuestionEasy = () => {
  app.nextButton = document.querySelector(".next");
  app.finishButton = document.querySelector(".finish");
  app.nextButton.addEventListener("click", () => {
    app.questionTracker();
    const poemTitleOptions = document.querySelectorAll("label[name='option']");
    poemTitleOptions.forEach((option) => {
      console.log(option)
      option.classList.remove("correct", "incorrect")
    });
  });
};

// get random poem for hard mode
app.getHardPoem = () => {
  fetch("https://poetrydb.org/random")
    .then((response) => {
      return response.json();
    })
    .then((data) => {

      app.randomHardPoem = data[0];
      app.randomHardPoemTitle = app.randomHardPoem.title;
      app.displayRandomPoemHard();
    });
};

// displays random poem title in hard mode 
app.displayRandomPoemHard = () => {
  app.titleContainer = document.querySelector(".titleContainer");
  app.titleContainer.innerHTML = `<h2>${app.randomHardPoemTitle}</h2>`;
};

// track and display score in hard mode
const hardAnswer = document.querySelector(".hardQuestion");
hardAnswer.addEventListener("submit", (event) => {
  event.preventDefault();
  app.currentScoreHard = document.querySelector(".currentScoreHard");
  app.userAnswer = document.getElementById("textBox").value;
  if (app.userAnswer.toLowerCase() === app.randomHardPoem.author.toLowerCase()) {
    app.counter = app.counter + 1;
  } 
  app.currentScoreHard.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
  document.getElementById("textBox").value = "";
});

app.nextQuestionHard = () => {
  app.nextButton = document.querySelector(".nextHard");
  app.finishButton = document.querySelector(".finishHard");
  app.nextButton.addEventListener("click", () => {
    app.questionTracker();
    app.getHardPoem();
  });
};

// tracks the number of questions answered
app.questionTracker = () => {
  app.numOfNextClicks = app.numOfNextClicks + 1;
  if (app.numOfNextClicks >= app.totalQuestions) {
    console.log(app.numOfNextClicks);
    app.finalScore = document.querySelector(".finalScore");
    app.finalScore.innerHTML = `Your final score is ${app.counter}/${app.totalQuestions}`;
  } else if (app.numOfNextClicks === app.totalQuestions - 1) {
    app.getPoemInfo();
    app.finishButton.classList.remove("hidden");
    app.nextButton.classList.add("hidden");
    console.log(app.numOfNextClicks);
  } else if (app.numOfNextClicks < app.totalQuestions) {
    app.getPoemInfo();
    console.log(app.numOfNextClicks);
  }
};

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

app.init = () => {
  
  
  app.currentScore = document.querySelector(".currentScore");
  app.totalQuestions = 5;
  app.once = {once: true,};
  app.getPoemInfo();
  app.startQuiz();
  app.nextQuestionEasy();
  // app.getHardPoem();
  app.restartQuiz();
};

app.init();


// TO-DO:
//BUGS: use should be able skip Q, and user should not be able to select next if they havent chosen an option
// TO-DO:need to use .map() / .filter() to make sure none of the three randomly selected poems have same authors
// TO-DO: if app.modeId is empty, prompt users to select a dificulty
//need to remove correct/incorrect classes when user restarts quiz 