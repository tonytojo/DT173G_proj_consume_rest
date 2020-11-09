"use strict"

//Define some variable and const
let experiencesEL = $("#experiences")[0];
let educationsEl = $("#educations")[0];
let webbsitesEl = $("#webbsites")[0];
let devMode = false;
let API;

if (devMode)
   API = "http://localhost:8080/DT173G_PRJ_RESTAPI"; //address to server REST-API
else
   API = "https://studenter.miun.se/~tojo8500/dt173g/projekt/restapi"; //address to server REST-API

//This function getEducation will consume a REST-API by using the fetch API function with the default
//method GET. It will fill some divs with the data received from the REST-API.
function getExperiences()
{
   fetch(API +"/experience.php")
   .then(response => response.json())
   .then(data =>
   {         
      if (data.message !== "No educations found")
      {
         data.forEach(item =>
         {                    
            experiencesEL.innerHTML += `<div>
                                           <div class="tooltip"><b>${item.workplace} - ${item.title}</b>
                                             <span class="tooltiptext">${item.description}</span>
                                          </div>
                                          <p>${item.start} - ${item.end}</p>
                                       </div>`;
         });
      }
    
   })  .catch(error =>
   {
      console.log('Error:', error);
      //alert("An error occured with getCourses: " + error);
   })
}
function getEducations()
{
    fetch(API + "/education.php")
      .then(response => response.json())
      .then(data =>
      {       
         console.log(data);      
          if (data.message !== "No educations found")
         {                     
             data.forEach(item =>
            {    
               educationsEl.innerHTML += `<div>
               <p><b>${item.course_name}</b><br>
               ${item.higher_education_instution} - ${item.start}</p></div>`;
            });
         } 
      }).catch(error =>
      {
         console.log('Error:', error);
         //alert("An error occured with getCourses: " + error);
      })
}

function getWebbsites()
{
   fetch(API + "/webbsite.php")
   .then(response => response.json())
   .then(data =>
   {         
      if (data.message !== "No educations found")
      {                               
         data.forEach(item =>
         {              
            webbsitesEl.innerHTML += `<div class="webbsite"><h3>${item.title}</h3>
                                        <p><a target="_blank" href="${item.url}">Till webbsidan</a></p>
                                        <p>${item.description}</p></div>`;
         });
      }
    
   })  .catch(error =>
   {
      console.log('Error:', error);
      //alert("An error occured with getCourses: " + error);
   })
}

//Is called when the DOM is loaded
$(function ()
{
   getExperiences(); //Erfarenhet
   getEducations(); //Utbildning
   getWebbsites(); //Webbplatser
});