const app = {};
//poetry quiz app
//minimum viable product:
//utilizing poetrydb API fetch a random poem title and display it to page
//1. create a landing page with app title, description, and a button to start the quiz
//attach the event lsiter to the parent element of the li's, on click it we will save the event.target
//event listener on button click that links to quiz page
// const modes = document.querySelector(".modes");
// console.log(modes)

app.modes = document.querySelectorAll(".modes");

app.selectMode = () => {
  app.modes.forEach((mode) => {
    mode.addEventListener("click", (event) => {
      app.modeId = event.target.id;
    });
  });
};

app.startButton = document.querySelector(".start");

app.startQuiz = () => {
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
  app.poemTitleContainer = document.querySelector(".poemTitleContainer");
  app.poemTitleContainer.innerHTML = "";
  array.forEach((poemInfo) => {
    const listItem = document.createElement("li");
    listItem.className = "options";
    listItem.textContent = `${poemInfo.title}`;
    app.poemTitleContainer.appendChild(listItem);
  });
};

//function to check answer against the poem names displayed to locate correct answer
app.checkAnswer = () => {
  const poetName = app.poetContainer.textContent;
  const options = document.querySelectorAll(".options");
  options.forEach((option) => {
    option.addEventListener("click", (event) => {
      app.rightAnswer = event.target.innerText;
      if (app.rightAnswer === )
    });
  });
  //   array.forEach((poemInfo) => {
  //       if (poetName === poemInfo.author) {
  //           const correctAnswer =
  //       } else {
  //           console.log("wrong answer loser");
  //       }
  //   })
  //   app.poemTitleContainer.forEach((option) => {
  //     option.addEventListener("click", (event) => {
  //         console.log(event);
  //     });
  //   });
};

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

app.randomIndex = (array) => {
  const randomIndex = Math.floor(Math.random() * array.length);
  return randomIndex;
};

app.init = () => {
  app.selectMode();
  app.startQuiz();

  fetch("https://poetrydb.org/random/3")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      app.poemArray = data;
      app.poetName = data[app.randomIndex(app.poemArray)].author;
      app.displayPoet();
      app.displayPoem(app.poemArray);
      app.checkAnswer();
    });
};

app.init();
