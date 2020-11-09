# Kursen Webbutveckling III(DT173G), Moment 5 REST-webbtjänster

## Syfte

Detta program konsumerar ett REST-API. Det enda man behöver är URLen till REST-API
Detta program anropar rest-api för att hämta utbildningsposter, webbplatsposter,
och erfarenhetsposter

### Description

Här en deskrivning hur allt hänger ihop och fungerar.
Jag använder jQuery eftersom jag tycker det ger bättra kod.
När man startar index.html som ska kunsumera REST-API tjänsten händer följande.
1. När DOM i index.html är klar körs funktionen $(function()... som är jQuery
2. I denna ligger   
   getExperiences();
   getEducations();
   getWebbsites(); 

3. I getExperiences() används fetch med GET och får allt som finns i tabellen experience genom json.  
Jag använder template literals och fyller experiencesEL.innerHTML med alla de data som jag fick från REST-API.

4. I getEducations() används fetch med GET och får allt som finns i tabellen education genom json.
Jag använder template literals och fyller educationsEL.innerHTML med alla de data som jag fick från REST-API.

5. I getWebbsites används fetch med GET och får allt som finns i tabellen webbsites genom json.  
Jag använder template literals och fyller webbsitesEL.innerHTML med alla de data som jag fick från REST-API.

6. Jag använder flexbox för att hantera presentationen för att få det snyggt och
enkelt. Jag har tre sektioner med flexbox. De är:
header delen, presentations delen och slutligen main delen med erfarenhet,utbildning och webbplatser

7. Då jag märkte att erfarenhets delen blev lång med alla beskrivningar valde jag
att google lite och hittade bra exampel på tooltip som jag använder. När jag hover över titel visas en beskrivning om denna anställning.

8. Jag använder samma image för både header och body

9. Jag använder fem inkl style.scss
För att hantera presentationshanteringen med sass har jag delat upp i följande filer.
_base.scss => basen där jag har altl annat som t.ex. variabler
_button.scss => hanterar allt som man kan klicka på
_layout.scss => hanterar layouten
_mobile.scss => media queries

10. Mitt REST-API har tre delar beroende på vilken som jag vill ha.
I min client använder jag endast Fetch med metoden GET utan query string
https://studenter.miun.se/~tojo8500/dt173g/projekt/rest/experience
https://studenter.miun.se/~tojo8500/dt173g/projekt/rest/education
https://studenter.miun.se/~tojo8500/dt173g/projekt/rest/webbsite


## Installation

En installation av remote repository går till på följande sätt.

1. git clone https://github.com/tonytojo/DT173G_proj_consume_rest.git  DT173G_proj_consume_rest
2. cd DT173G_proj_consume_rest
3. npm install

