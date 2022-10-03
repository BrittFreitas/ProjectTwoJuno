const app = {};

app.getRandomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

// get information from a random poem and add it to app.poemArray if app.poemArray does not already have a poem with the same author 



// app.getPoemInfo = () => {
//     fetch("https://poetrydb.org/random")
//     .then((response) => {
//       return response.json();
//     })
//     .then((data) => {
//       if (app.poemArray.indexOf(data[0].author) === -1) {
//         app.poemArray.push(data[0]);
//       }
//     });
// };

// app.getEasyQuestions = () => {
//   for (let i = 0; i < 3; i = i + 1) {
//     app.getPoemInfo();
//   };
// }
// app.modeSelectionForm = document.querySelector(".modeSelection");
// app.modeSelectionForm.addEventListener("submit", (event) => {
//   event.preventDefault();
//   app.modeSelected = document.querySelector("input:checked").value;
//   if (app.modeSelected === "easy") {
//     console.log("Easy")
//     app.getEasyQuestions();
//   } else if (app.modeSelected === "hard") {
//     console.log("hard")
//   }
//     app.poemInfo = app.poemArray[app.getRandomIndex(app.poemArray)];
//     app.poetName = app.poemInfo.author;
// });

app.getPoemInfo = () => {
  fetch("https://poetrydb.org/random/3")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      app.poemArray = data;
      app.poemInfo = data[app.getRandomIndex(app.poemArray)];
      app.poetName = app.poemInfo.author;
      app.displayEasyQuestion();
      app.displayEasyAnswerOptions(app.poemArray);
      app.showEasyCurrentScore();
      
    });
};

// brings user to selected game mode and displays questions
app.startQuiz = () => {
  app.counter = 0;
  app.numOfNextClicks = 0;
  
  app.modeSelectionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    app.getPoemInfo;
    app.modeSelected = document.querySelector("input:checked").value;
    if (app.modeSelected === "easy") {
      console.log("Easy")
      //call functions for easy mode
    } else if (app.modeSelected === "hard") {
      console.log("hard")
      // call functions for hard mode;
    }
    document
        .getElementById(`${app.modeSelected}Game`)
        .scrollIntoView({ behavior: "smooth" });
  });
};

// displays poet name in easy mode
app.displayEasyQuestion = () => {
  app.poetContainer = document.querySelector(".poetContainer");
  app.poetContainer.innerHTML = `<h3>${app.poetName}</h3>`;
};

// displays 3 poem titles as answer options in easy mode
app.displayEasyAnswerOptions = (array) => {
  app.poemTitleContainer.innerHTML = "";
  array.forEach((poemInfo) => {
    const listItem = document.createElement("li");
    listItem.className = "options";
    listItem.textContent = `${poemInfo.title}`;
    app.poemTitleContainer.appendChild(listItem);
  });
};

// updates and display current score after completion of each question in easy mode
app.showEasyCurrentScore = () => {
  app.poemTitleContainer.addEventListener("click", (event) => {
    app.userChoice = event.target;
    console.log(app.userChoice);
    app.rightAnswer = event.target.innerText;
    app.userChoice.classList.remove("correct", "incorrect");
    app.checkEasyAnswer();
    app.currentScore.innerHTML = `Current score: ${app.counter}/${app.totalQuestions}`;
  }, app.once);
};

// checks if user selection is correct/incorrect in easy mode 
app.checkEasyAnswer = () => {
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
};

// displays next question in easy mode 
app.nextQuestionEasy = () => {
  app.nextButton = document.querySelector(".next");
  app.finishButton = document.querySelector(".finish");
  app.nextButton.addEventListener("click", () => {
    app.questionTracker();
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
  app.modeSelectionForm = document.querySelector(".modeSelection");
  // app.poemArray = [];
  app.poemTitleContainer = document.querySelector(".poemTitleContainer");
  app.currentScore = document.querySelector(".currentScore");
  app.totalQuestions = 5;
  app.once = {once: true,};
  app.getPoemInfo();
  app.startQuiz();
  app.nextQuestionEasy();
  app.restartQuiz();
};

app.init();


// TO-DO:
//BUGS: use should be able skip Q, and user should not be able to select next if they havent chosen an option
// TO-DO:need to use .map() / .filter() to make sure none of the three randomly selected poems have same authors
// TO-DO: if app.modeId is empty, prompt users to select a dificulty
//need to remove correct/incorrect classes when user restarts quiz 