const link = "http://api.weatherstack.com/current?access_key=67c17d95e9f276f12cb27c1a6d44b0db";

const imgWeather = document.querySelector("#imgWeather");
const temp = document.querySelector("#temperature");
const weather = document.querySelector("#weather");
const countryCity = document.querySelector("#country-city");
const input = document.querySelector("#input");

let store = {
  name: "",
  country: "",
  temperature: 0,
  weatherDescription: "",
};

    const getData = async () => {
      const request = await fetch(`${link}&query=${input.value}`);
      const response = await request.json();
      console.log(response.current)
      const {
        current: {temperature, weather_descriptions: weatherDescription},
        location: {country, name, localtime},
      } = response;
    store = {
          ...store,
          name,
          country,
          temperature,
          localtime,
          weatherDescription: weatherDescription[0],
      };
      console.log(response)
      console.log(store);
      renderComponent(store.name, store.country, store.temperature, store.weatherDescription,store.localtime);
    };

    const getImage = (weatherDescription) => {
      const overLowProfile = weatherDescription.toLowerCase();
      switch(overLowProfile){
        case "cloud":
          return `./cloud.png`
        case "clear":
          return `./clear.png`
        case "fog":
          return `./fog.png`
        case "sunny":
          return `./sunny.png`
        case "partly":
          return `./partly.png`
        default:
          return "./the.png";
      }
    }

    const markUp = (name,country,temperature,weatherDescription,localtime) => {
      return `
        <div id="card">
          <header class="bx-left-name-alt"><i style="font-style: normal;">Weather App</i></header>
              <div id="main-card">
              <img src="./source/image/${getImage(weatherDescription)}" alt="clear" id="imgWeather">
              <div class="main-info">
                <span id="temperature">${temperature}°С</span>
                <span id="weather">${weatherDescription}</span>
                <span id="country-city">${country} | ${name}</span>
                <span id="localtime">${localtime}</span>
              </div>
            </div>
        </div>
      `;
    }

    const renderComponent = () => {
      root.innerHTML = markUp(store.name, store.country,store.temperature, store.weatherDescription,store.localtime);
    };

    input.addEventListener("keydown", (e) => {
      if(e.key === "Enter"){
        getData();
        input.value = ' ';
      }else{
        return new Error();
      }
    });
