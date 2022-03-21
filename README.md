<h1 align="center">
  <br>
  <a href="https://recipe-app-2022.herokuapp.com/#467"><img src="https://res.cloudinary.com/dawb3psft/image/upload/v1647878417/Portfolio/logo.png" alt="RecipeAPP" width="300"></a>
</h1>

<h4 align="center">Personal Project - Creating a Frontend JS App </h4>

<p align="center">
  <a href="https://img.shields.io/badge/Made%20with-JavaScript-yellow"><img src="https://img.shields.io/badge/Made%20with-JavaScript-yellow"></a>
  <a href="https://img.shields.io/badge/Made%20with-Python-blue">
    <img src="https://img.shields.io/badge/Made%20with-Python-blue"
         alt="Gitter">
  </a>
  <a href="https://img.shields.io/tokei/lines/github/Bogo56/Camp_App">
      <img src="https://img.shields.io/tokei/lines/github/Bogo56/Camp_App">
  </a>
  <a href="https://img.shields.io/github/languages/count/Bogo56/Camp_App?color=f">
    <img src="https://img.shields.io/github/languages/count/Bogo56/Camp_App?color=f">
  </a>
  <a href="https://badgen.net/github/commits/Bogo56/Camp_App">
    <img src="https://badgen.net/github/commits/Bogo56/Camp_App">
  </a>
</p>

<p align="center">
  <a href="#about-the-project">About The Project</a> •
  <a href="#check-out-the-project">Check out the Project</a> •
  <a href="#project-workflow">Project Workflow</a> •
  <a href="#project-structure">Project Structure</a> 
</p>

## Built With
###  Languages
<p>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white">
<p>
  
### Frameworks
<p>
<img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white">
<img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white">
</p>

### Databases
<p>
<img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white">
</p>

### Additional Libraries and Technologies
<p>
  <img src="https://img.shields.io/badge/ORM-Mongoose-red?style=for-the-badge">
  <img src="https://img.shields.io/badge/OS-Ubuntu-orange?style=for-the-badge">
  <img src="https://img.shields.io/badge/Templating-EJS-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/API-Cloudinary-blueviolet?style=for-the-badge">
  <img src="https://img.shields.io/badge/API-MapBox-blueviolet?style=for-the-badge">
  <img src="https://img.shields.io/badge/Security-Bcrypt-green?style=for-the-badge">
  <img src="https://img.shields.io/badge/Security-Passport-green?style=for-the-badge">
</p>

## About The Project
This is my second Project in NodeJS. As always I wanted to make the project more authentic, so I decided to make a mini-website for showcasing bulgarian destinations.
* I **created the data for the website with python** - I wrote a script to scrape a famous bulgarian travel site and model the data into a MongoDB database
* I used **bootstrap to create a simple and responsive frontend** - since I wanted to focus my attention on the the backend side of things
* **Authentication** and state-management is done **using sessions** - I'm using the **passport library** for this purpouse
* All uploaded images are directly **stored on Cloudinary**
* The whole website is **rendered server-side**, using the **EJS templating engine**.
* I'm using the MapBox API to visualize destinations on the map.

I have **deployed the Project on my own Ubuntu 18.04 server**. You can find the link to the project in the next section.

## Check out the Project
As I mentioned, I have deployed the Project - so you can play around with it. Here is the link:
https://bulcamp.bogoapps.site/

Login with theese credentials. It will ask them from you once you try to search.

You can log with:
**USERNAME**: "Admin"
**PASSWORD**: "Admin"

Searching is made in bulgarian -  intentionally. I could've scraped an international site and do it all in english - BUT where is the fun in that😁


## Project Workflow
Here, I'm outlining very briefly the phases that the project went trough from start to finish.

### Phase 1 - Creating Data
Before creating the app, I needed some data. In this case I needed a lot of recipes - at least a couple of hundred. So where do I get that data? Well, I actually decided to create it myself, or let's use the term "borrow it"😁 from another site (only for the sake of the project). SOO I did a research on the popular cooking websites in Bulgaria, and chose one with proper structure for scraping. Then I wrote a couple of scripts in Python using the Pandas Library that:

  1. Scraped the summary info of the recipes, shown in the "All Recipes Section", while going trough all results pages - inserting the info into a DB.
  2. Visited every individual recipe page and scraped it's full description and ingredients - updating the recipe data in the DB.
  3. Scraping once more - this time downloading the images (that I later upload on Cloudinary) - updating the recipes with the image links in the DB.
  
### Phase 2 - Making Data Accessible
So now that I had the data, I had to make it available to be consumed by another entity - e.g. frontend. So I created a simple API in Flask that delivered the data
to my frontend application.

### Phase 3 - Creating the Frontend
Now that I have laid the foundation, I could start working on the App itself.

### Phase 4 - Deployment
I have deployed the simple Flask API to my own server in the beginning, so I could test the frontend app during development with it.

I deployed the frontend to Heroku - since this would save me some time with server configuration.

## Project Structure

* All scraping scripts are placed in `./api_python/seed` folder
* The actual frontend App in `./javascript` folder follows the MVC architecture.

```
📦 RecipeApp
├─.gitignore
├─.idea
├─ README.md
├─ api_python
│  ├─ api.py
│  ├─ config.py
│  ├─ requirements.txt
│  ├─ resources
│  |  └─ routes.py
│  └─ seed
│     ├─ api_model.py
│     ├─ downloader.py
│     ├─ images
│     ├─ recipes.db
│     └─ scraper.py
├─ img
│  ├─ bookmark.png
│  ├─ bookmark_grad.png
│  ├─ check.png
│  ├─ clock.png
│  ├─ error.svg
│  ├─ favicon.png
│  ├─ icons.svg
│  ├─ logo.png
│  ├─ minus.png
│  ├─ notes_.png
│  ├─ people.png
│  ├─ plus.png
│  ├─ pngegg.png
│  ├─ recipe_4.jpg
│  ├─ sample_food.jpg
│  ├─ spin1.png
│  ├─ spin1.svg
│  ├─ spinner.png
│  └─ spinner.svg
├─ javascript
│  ├─ config.js
│  ├─ controller.js
│  ├─ errors.js
│  ├─ helpers.js
│  ├─ model.js
│  └─ views
│     ├─ bookmarksView.js
│     ├─ errorHandler.js
│     ├─ eventHandlers.js
│     ├─ loginView.js
│     ├─ recipeView.js
│     └─ searchView.js
├─ main.html
└─ style.css
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)

