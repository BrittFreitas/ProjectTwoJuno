const app = {};

app.getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

//add catch error
app.getPoemInfo = () => {
  fetch(`https://poetrydb.org/random/${app.totalQuestions * 3 * 2}`)
    .then((response) => {
      if (response.ok === true) {
        return response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .then((data) => {
      app.poemArray = [[]];
      let poemArrayIndex = 0;
      let authorArray = [];
      app.questionNumber = 0; //increase question number when you click next
      data.forEach((poem) => {
        if (app.poemArray.length <= app.totalQuestions) {
          if (
            app.poemArray[poemArrayIndex].length < 3 &&
            authorArray.indexOf(poem.author) === -1
          ) {
            app.poemArray[poemArrayIndex].push(poem);
            authorArray.push(poem.author);
          } else if (app.poemArray[poemArrayIndex].length === 3) {
            poemArrayIndex = poemArrayIndex + 1;
            app.poemArray.push([]);
            authorArray = [];
          }
        }
      });
      app.poemArray.pop();
    })
    .catch((error) => {
      if (error.message === "Not Found") {
        alert("We're uninspired, no poems today");
      } else {
        alert("Hmmm..we have to fix something. Come back later");
      }
    });
};

// brings user to selected game mode and displays questions
app.events = () => {
  //startQuiz begins here
  const modeSelectionForm = document.querySelector(".modeSelection");
  modeSelectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    app.counter = 0;
    app.numOfNextClicks = 0;
    app.questionNumber = 0;
    app.removeClassFromOptions();
    document.querySelector(".currentScore").innerHTML = "";
    document.querySelector(".currentScoreHard").innerHTML = "";
    app.landingPage.classList.add("invisible");

    const modeSelected = document.querySelector(
      "input[name='gameMode']:checked"
    ).value;

    if (modeSelected === "easy") {
      app.displayEasyQuestion();
      app.displayEasyAnswerOptions(app.poemPool);
      app.nextButton = document.querySelector(".next");
      app.finishButton = document.querySelector(".finish");
      app.finishQuiz(app.easyGame);
      app.easyNext();
      app.easyGame.classList.remove("invisible");
    } else if (modeSelected === "hard") {
      app.displayHardPoem();
      app.nextButton = document.querySelector(".nextHard");
      app.finishButton = document.querySelector(".finishHard");
      app.hardNext();
      app.finishQuiz(app.hardGame);
      app.hardGame.classList.remove("invisible");
    }
  });

  app.hardNext = () => {
    app.nextButton.addEventListener("click", () => {
      app.questionTracker();
      app.displayHardPoem();
      document.querySelector(".hardSubmit").disabled = false;
    });
  };

  app.easyNext = () => {
    app.nextButton.addEventListener("click", () => {
      app.questionNumber = app.questionNumber + 1;
      app.questionTracker();
      app.removeClassFromOptions();
    });
  };

  //Code below updates the current score on easy mode
  const easyResponse = document.querySelector(".easyQuestion");
  easyResponse.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedAnswer = document.querySelector(
      "input[name='option']:checked"
    );
    const selectedPoemTitle = document.querySelector(
      `label[for="${selectedAnswer.id}"]`
    );
    app.checkEasyAnswer(selectedPoemTitle);
    document.querySelector(".easySubmit").disabled = true;
    const currentScore = document.querySelector(".currentScore");
    currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
  });

  //this code below displays next question in easy mode

  // remove correct / incorrect styling from easy options
  app.removeClassFromOptions = () => {
    const poemTitleOptions = document.querySelectorAll("label[name='option']");
    poemTitleOptions.forEach((option) => {
      option.classList.remove("correct", "incorrect");
    });
  };

  // displays poet name in easy mode
  app.displayEasyQuestion = () => {
    app.poemPool = app.poemArray[app.questionNumber];
    app.poemInfo = app.poemPool[app.getRandomIndex(app.poemPool)];

    app.poetName = app.poemInfo.author;
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

  // track and display score in hard mode
  const hardAnswer = document.querySelector(".hardQuestion");

  hardAnswer.addEventListener("submit", (event) => {
    event.preventDefault();

    document.querySelector(".hardSubmit").disabled = true;
    const currentScore = document.querySelector(".currentScoreHard");
    const userAnswer = document.getElementById("textBox").value;
    if (userAnswer.toLowerCase() === app.poemInfo.author.toLowerCase()) {
      app.counter = app.counter + 1;
    }
    currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
    document.getElementById("textBox").value = "";
  });

  // finish quiz
  app.finishQuiz = (gameMode) => {
    app.finishButton.addEventListener("click", () => {
      const finalScore = document.querySelector(".finalScore");
      finalScore.innerHTML = `Your final score is ${app.counter}/${app.totalQuestions}`;
      gameMode.classList.add("invisible");
      app.endPage.classList.remove("invisible");
    });
  };

  // restart quiz
  const restart = document.querySelector(".restart");
  restart.addEventListener("click", () => {
    app.getPoemInfo();
    app.finishButton.classList.add("hidden");
    app.nextButton.classList.remove("hidden");
    app.landingPage.classList.remove("invisible");
    app.easyGame.classList.add("invisible");
    app.hardGame.classList.add("invisible");
    app.endPage.classList.add("invisible");
  });
};

// checks if user selection is correct/incorrect in easy mode
app.checkEasyAnswer = (selectedPoemTitle) => {
  if (selectedPoemTitle.innerText === app.poemInfo.title) {
    app.counter = app.counter + 1;
    selectedPoemTitle.classList.add("correct");
  } else {
    selectedPoemTitle.classList.add("incorrect");
  }
};

// displays random poem title in hard mode
app.displayHardPoem = () => {
  app.poemPool = app.poemArray[app.questionNumber];
  app.poemInfo = app.poemPool[app.getRandomIndex(app.poemPool)];
  const titleContainer = document.querySelector(".titleContainer");
  titleContainer.innerHTML = `<h2>${app.poemInfo.title}</h2>`;
};

// tracks the number of questions answered
app.questionTracker = () => {
  app.numOfNextClicks = app.numOfNextClicks + 1;
  if (app.numOfNextClicks === app.totalQuestions - 1) {
    app.displayEasyQuestion();
    app.displayEasyAnswerOptions(app.poemPool);
    app.finishButton.classList.remove("hidden");
    app.nextButton.classList.add("hidden");
  } else if (app.numOfNextClicks < app.totalQuestions) {
    app.displayEasyQuestion();
    app.displayEasyAnswerOptions(app.poemPool);
  }
};

app.init = () => {
  app.landingPage = document.querySelector(".landingPage");
  app.easyGame = document.querySelector(".easyGame");
  app.hardGame = document.querySelector(".hardGame");
  app.endPage = document.querySelector(".endPage");

  app.totalQuestions = 5;
  app.once = { once: true };
  app.events();
  app.getPoemInfo();
};

app.init();

// TO-DO: if app.modeId is empty, prompt users to select a dificulty
//need to remove correct/incorrect classes when user restarts quiz

// deconstructing thing on some pathways
