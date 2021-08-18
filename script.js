document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        clearInfo();
        showWarning('Carregando...');
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=5f5d43f8a10dfc5c8477f71114254aab&units=metric&lang=pt_br`;
        //Api Key = d06cdb298fafc83c520d5ab677fc477e
        // 5f5d43f8a10dfc5c8477f71114254aab
        let result =  await fetch(url);
        let json = await result.json();
        console.log(json)

        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                icon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg
            });
        }else{
            clearInfo()
            showWarning('Não foi possível encontrar a cidade.')
        }
    }else{
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');
    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`;
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.icon}@2x.png`);
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`;

    document.querySelector('.resultado').style.display = 'block';

}

function clearInfo(){
    showWarning();
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}