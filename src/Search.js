import {useState} from 'react';

export default function Search(props){

    const [cidade, setCidade] = useState("");

    function searchInput(e){
        e.preventDefault();
        // setCidade("");
        let currentValue = document.querySelector('input[name=searchInput]').value;

        // Request API
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${currentValue}&appid=ec8686046d75b63040bab1bae08c984a&lang=pt_br&units=metric`;
        fetch(url)
        .then(response => response.json())
        .then(data => {
            const {main, name, sys, weather, wind, clouds, coord} = data;
            if(sys != undefined){
                
                if(weather != undefined){
                    const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;
                    setCidade(`
                        <div class="resultTemp">
                            <div class="resultTempImg">
                                <img src="${icon}"/>
                                <div class="temps">
                                    <p class="temp">${Math.round(main.temp)} <span>ºC</span></p>
                                </div>
                            </div>
                            <div class="resultStatus">
                                <p>
                                    <span class="humidity">Umidade: ${main.humidity}% </span>
                                    <span class="wind">Vento: ${Math.round(wind.speed)} km/h</span>
                                </p>
                                <p class="description">
                                    <span class="descript">${weather[0]['description']}</span>
                                    <span class="clouds">Nebulosidade: ${Math.round(clouds.all)}%</span>
                                </p>
                            </div>
                        </div>
                        <div class="resultOther">
                            <p class="city">${name}</p>
                            <p class="coord">${coord.lon}  ${coord.lat}</p>
                        </div>
                    `);
                }
            }else{
                setCidade("");
            }
        })

    }

    return(
        <div className="searchWraper">
            <div className="search">
                <h2>Busca por cidade 🏙️</h2>
                <form onSubmit={(e) => searchInput(e)}>
                    <input type="text" name="searchInput" 
                        placeholder={props.placeholder}/>
                    <input type="submit" value="Buscar" />
                </form>
            </div>
                {
                    (cidade != "")?
                    <div className="searchResult" dangerouslySetInnerHTML={{__html: cidade}} />:
                    <div className="noResult">Nenhum resultado encotrado.</div>
                }
        </div>
    )
}