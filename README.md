README

Movie Posts App

What the App does and How it Works:
This application is a way for a user to sign up, login, and make a list of movies that’ve seen.
The backend server will be where the movie posts are saved at and retrieved from.
The client will provide the UX.
I used bootstrap for the bare minimum of styling/buttons/tables
I used handlebars to append new post data into the table automatically
I also used handlebars to generate buttons for each table row (associated with each item)

Approach:
My approach was to make the simplest possible list app I could, while livening it up slightly with a recognizable/enjoyable theme (movies). I spent almost zero time on styling, and used bootstrap to implement form fields, color coded buttons, and the bare minimum structure. My goal was to get the most basic functions required to behave and react in an elegant way, and I spent most of my time on that.

Unsolved Problems:
I believe that I solved all the problems that I intended to solve by the first submittal. I have many ideas for additional features and styling, but in terms of a minimum viable product, I think I was successful in solving every issue that arose. I did a much better job pushing through stuck moments on this project than I did on the last one.

Highlights::
I think I had some of my best coding moments so far as a developer while working on this project, and I’d like to point some of them out.
I think the best thing I did was make my moviePosts/ui.js file as modular as possible. It contains a lot of functions, and a lot of these functions have to trigger actions that are very similar to actions necessary in other functions as well. The most common repeated action I noticed was the need to refresh my handlebars table after creating/deleting/updating a post. I ran into many problems with this.

The issue here is that if you run code to refresh the table that depends on an API call, it will often refresh the table with the data that is already stored in memory (depending on how you attempt to code it), instead of using the updated data from the api that reflects your most recent change. The way I chose to handle this is by creating a function that refreshes the table data, and essentially performs a new “get” request that occurs *after* the most recent change is confirmed successful. So on many .then(successes) I run my “refresh table data” function that also refreshes handlebars once it receives the updated data. I also made a funtion that doesn’t grab the new data but simply refreshes handlebars, as there were a few situations where making a new API call was either unnecessary or could be done in another way.
Many people  around me were stuck on this problem or similar problems. I felt confident about my solution and showed many people in my group this technique and made sure that everyone understood what was happening and how to replicate it.  So if other people in my group’s code looks similar to mind in that section, that is probably why.

Some other things I think were worth highlighting:
-refreshMoviePostsTable and refreshMoviePostsData in the moviePosts/ui.js file (mentioned above)
-My showUpdateFields function on line 72 in moviePosts/ui.js
-In that function I figured out how to update the form fields to reflect the particular post associated with the “Edit” button that gets pressed. This involved running a filter on the stored data array of moviePost objects, and iterating through until the array consisted of the object that contained the id associated with the data-id of the event.target. Took a few hours to figure that one out.
-I am also proud of the userMessage function in the userAuth/ui.js file on line 6. This function is used to display confirmation/error messages to the user. I define it once and then am able to call it all over the place in the project on either onSucesss or onFailure functions, passing in different arguments depending on the context.

Planning Section:

Link to my User Stores:
https://docs.google.com/document/d/1K-1OUF_igEPFIp2mNNbkGNAV3JeGInsc7ML6UY-3krI/edit?usp=sharing

Link to some Wireframes/Entity Relationship Diagram:
https://docs.google.com/document/d/1VfEJuqGI-U9FVlLdKbe7YBUaMP64m6Gf_elSwMYO7YU/edit?usp=sharing

Links:

Link to the client repo:
https://github.com/noobiwankenoobi/project-2-movie-list-client

Link to the deployed client:
https://noobiwankenoobi.github.io/project-2-movie-list-client/

Link to the API repo:
https://github.com/noobiwankenoobi/project-2-movie-list-api

Link to the deployed API:
https://project-2-movie-list-ross.herokuapp.com/
