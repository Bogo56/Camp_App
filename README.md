<h1 align="center">
  <br>
  <a href="https://bulcamp.bogoapps.site/"><img src="https://res.cloudinary.com/dawb3psft/image/upload/v1647926681/Portfolio/campapp.png" alt="CampAPP" width="300"></a>
</h1>

<h4 align="center">Personal Project - Creating a NodeJS Project </h4>

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
* I'm using the **MapBox API** to visualize destinations on the map.

I have **deployed the Project on my own Ubuntu 18.04 server**. You can find the link to the project in the next section.

#### !NB MapBox does a pretty shitty job at locating bulgarian locations, so don't get frustrated if some of the destinations end up in Ethiopia😂

## Check out the Project
As I mentioned, I have deployed the Project - so you can play around with it. Here is the link:
https://bulcamp.bogoapps.site/

## Note from my future self 😁
Since the time I'm creating the readme file for this repository is a lot of months and projects 😇 away from the time when I first created it, I wanted to note that now after going trough it, with all the knowledge and new things I have learned after that, there are a lot of stuff I would change if I was to redo the project all over again. Like for example restructuring - creating a better separation between routes and controllers - right now it's all over place😅. I would also work more on security - creating different user roles, restricting some routes, validating the ligitimacy of the user session etc. Anyways, I do think that this is a good opportunity to reflect on my previous mistakes, see how I improved and learned from them and also see how I could have done it better if I had the knowledge back then.

## Project Structure

* The scraping script, and the seed data it generated are placed in `./seeds` folder

```
📦 Camp_App
├─ .prettierrc
├─ 3rd_party_APIs
|  ├─ cloudinary
│  │  └─ configuration.js
|  ├─ mapBox
│  │  └─ maps.js
│  └─ no.txt
├─ README.md
├─ app.js
├─ auth
│  └─ passport-config.js
├─model
|  ├─destinationModel.js
|  ├─reviewsModel.js
│  └─ userModel.js
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ home.css
│  │  ├─ maps.css
│  │  └─ stars.css
│  └─ js
│     ├─ clusterMap.js
│     ├─ formValidate.js
│     └─ mapBox.js
├─ routes
│  ├─ destinations.js
│  ├─ reviews.js
│  └─ users.js
├─ schemas.js
├─ seeds
│  ├─ bg_destinations.json
│  ├─ bg_seed.js
│  ├─ scraper.py
│  └─ seed.js
├─ sources
│  └─ images
│     ├─ Lake District .jpg
│     ├─ Lake-District-.jpg
│     └─ lake-tahoe-california-USLAKES0920.jpg
├─ utils
│  ├─ AsyncCatch.js
│  ├─ ExpressError.js
│  └─ middlewares.js
└─ views
   ├─ 404.ejs
   ├─ destination.ejs
   ├─ destinations.ejs
   ├─ errors.ejs
   ├─ home.ejs
   ├─ layouts
   │  └─ boilerplate.ejs
   ├─ login.ejs
   ├─ new.ejs
   ├─ partials
   │  ├─ footer.ejs
   │  ├─ header.ejs
   │  ├─ messages.ejs
   │  └─ stars.ejs
   ├─ register.ejs
   └─ update.ejs
```
©generated by [Project Tree Generator](https://woochanleee.github.io/project-tree-generator)
