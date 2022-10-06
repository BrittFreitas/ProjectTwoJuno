const app = {};

app.getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

//add catch error
app.getPoemInfo = () => {
  fetch(`https://poetrydb.org/random/${app.totalQuestions * 3 * 2}`)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let poemArray = [[]];
      let poemArrayIndex = 0;
      let authorArray = [];
      app.questionNumber = 0; //increase question number when you click next
      data.forEach((poem) => {
        if (poemArray.length <= app.totalQuestions) {
          if (
            poemArray[poemArrayIndex].length < 3 &&
            authorArray.indexOf(poem.author) === -1
          ) {
            poemArray[poemArrayIndex].push(poem);
            authorArray.push(poem.author);
          } else if (poemArray[poemArrayIndex].length === 3) {
            poemArrayIndex = poemArrayIndex + 1;
            poemArray.push([]);
            authorArray = [];
          }
        }
      });
      poemArray.pop();

      app.poemPool = poemArray[app.questionNumber];
      app.poemInfo = app.poemPool[app.getRandomIndex(app.poemPool)];
      console.log(app.poemInfo);

      app.poetName = app.poemInfo.author;
      //app.displayEasyQuestion();
      // app.displayEasyAnswerOptions(poemArray);
      // app.updateCurrentScoreEasy();
    });
};

// make an array with 5 objects
// within each object, there will be 3 poems
//for each object, append only if author does not already exist

// brings user to selected game mode and displays questions
app.events = () => {
  //startQuiz begins here
  const modeSelectionForm = document.querySelector(".modeSelection");
  modeSelectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    app.counter = 0;
    app.numOfNextClicks = 0;
    app.questionNumber = 0;

    const modeSelected = document.querySelector(
      "input[name='gameMode']:checked"
    ).value;

    if (modeSelected === "easy") {
      console.log("Easy");
      app.displayEasyQuestion();
      app.displayEasyAnswerOptions(app.poemPool);
      
      //hide hard mode and end page for now
    } else if (modeSelected === "hard") {
      console.log("hard");
      // app.nextQuestionHard();
      // call functions for hard mode;
    }
  });

  //Code below updates the current score on easy mode
  const easyResponse = document.querySelector(".easyQuestion");
  easyResponse.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedAnswer = document.querySelector("input[name='option']:checked");
    const selectedPoemTitle = document.querySelector(
      `label[for="${selectedAnswer.id}"]`
    );
    app.checkEasyAnswer(selectedPoemTitle);
    document.querySelector(".easySubmit").disabled = true;
    app.currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
  });

  //this code below displays next question in easy mode
  app.nextButton = document.querySelector(".next");
  app.finishButton = document.querySelector(".finish");
  app.nextButton.addEventListener("click", () => {
    app.questionNumber = app.questionNumber + 1
    app.questionTracker();
    const poemTitleOptions = document.querySelectorAll("label[name='option']");
    poemTitleOptions.forEach((option) => {
      console.log(option);
      option.classList.remove("correct", "incorrect");
    });
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
    const poemTitleLabel = document.querySelector(
      `label[for="option${optionNumber}"]`
    );
    poemTitleLabel.textContent = poemTitle;
  });
};



// checks if user selection is correct/incorrect in easy mode
app.checkEasyAnswer = (selectedPoemTitle) => {
  if (selectedPoemTitle.innerText === app.poemInfo.title) {
    console.log("very nice");
    app.counter = app.counter + 1;
    console.log(app.counter);
    selectedPoemTitle.classList.add("correct");
  } else {
    console.log("wrong answer LOSER");
    console.log(app.counter);
    selectedPoemTitle.classList.add("incorrect");
  }
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
  if (
    app.userAnswer.toLowerCase() === app.randomHardPoem.author.toLowerCase()
  ) {
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
    app.displayEasyQuestion();
      app.displayEasyAnswerOptions(app.poemPool);
    app.finishButton.classList.remove("hidden");
    app.nextButton.classList.add("hidden");
    console.log(app.numOfNextClicks);
  } else if (app.numOfNextClicks < app.totalQuestions) {
    app.displayEasyQuestion();
    app.displayEasyAnswerOptions(app.poemPool);
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
  app.once = { once: true };
  app.events();

  app.getPoemInfo();
  // app.startQuiz();
  // app.nextQuestionEasy();
  // // app.getHardPoem();
  // app.restartQuiz();
};

app.init();

// TO-DO:
//BUGS: use should be able skip Q, and user should not be able to select next if they havent chosen an option
// TO-DO:need to use .map() / .filter() to make sure none of the three randomly selected poems have same authors
// TO-DO: if app.modeId is empty, prompt users to select a dificulty
//need to remove correct/incorrect classes when user restarts quiz

//go through an reconnect variable names to match our new fetch
// deconstructing thing on some pathways
//styling
