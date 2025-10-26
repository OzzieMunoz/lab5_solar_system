import fetch from 'node-fetch';
import express from 'express';
const solarSystem = (await import('npm-solarsystem')).default;

const app = express();
app.set("view engine", "ejs");
app.use(express.static("public"));

//root route
app.get('/', async (req, res) => {
   let url = "https://pixabay.com/api/?key=20426927-497d14db9c234faf7d0df8317&per_page=50&orientation=horizontal&q=solar system";
   let response = await fetch(url);
   let data = await response.json();
   console.log(data);
   let r = Math.floor(Math.random() * 50);
   let randomImage = data.hits[r].webformatURL;
   res.render('home.ejs', {randomImage})
});

app.get('/planet', (req, res) => {
   let planet_name = req.query.planetName;
   let planetInfo = solarSystem[`get${planet_name}`]();
   res.render('planetInfo.ejs', {planetInfo, planet_name});
});

app.get('/NASAPOD',async(req,res)=> {
   // Website down -- Creates unresponsive page

   // let url="https://api.nasa.gov/planetary/apod?api_key=9mUzIkhlZCZaOoMfspg7jMmwZCZ4LiRHtkgkambD&date";
   // let response = await fetch(url);
   // let data = await response.json();
   // console.log(data);
   // let Nasapod = data.hits[0].webformatURL;

   res.render('nasaPod.ejs')
});

app.get('/comets',async(req,res)=>
{
   let comet_name=req.query.cometName;
   let planetInfo = solarSystem[`getComets`]();
   res.render('planetInfo.ejs', {planetInfo, comet_name});
});


app.listen(3000, () => {
   console.log('server started');
});