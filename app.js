
//poetry quiz app
//minimum viable product:  
//utilizing poetrydb API fetch a random poem title and display it to page
    //1. create a landing page with app title, description, and a button to start the quiz 
        //event listener on button click that links to quiz page
    //2. display a random poem title 
        // make a fetch to the random endpoint of the api and grab the title of the poem
        //using .textContent property to get the title into the .titleContainer div 
        
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
    //creating an easy, hard, panic mode; hard mode simply has a textbox for user to input poet name and user must answer 20 questions to finish quiz, easy mode has hints and a selection of poets to choose from, one 10 questions. Panic mode has a countdown that user must select answer within, no limit to questions.