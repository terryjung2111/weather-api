import React from 'react';
import InputComponent from '../components/InputComponent';
import { useState } from 'react';
import { InputConstString } from '../../services/const/const';
import { apiAddress, apiKey } from '../../index';

const { CITYSTRING, COUNTRYSTRING} = InputConstString;

const BodyComponent = () => {
  
  const [cityWeather, setCityWeather] = useState(null);

  const [inputData, setInputData] = useState({
    [CITYSTRING]: '',
    [COUNTRYSTRING]: ''
  });

  const onChangeFunc = (e) => {
    setInputData({...inputData, [e.target.name] : e.target.value})
  };

  const getWeatherButton =  async () => {
    if(inputData[CITYSTRING] === "") {
      alert('Please type your city name')
    } else {
      const apiEndpoint = `${apiAddress}?city=${inputData[CITYSTRING]}&country=${inputData[COUNTRYSTRING]}&key=${apiKey}`
    
      const response = await fetch(apiEndpoint)
      .then(res => res.json())
      .then(res => res)
      .catch((err) => console.log(err))
  
      console.log(response);
      setCityWeather(response.data[0])
    }
  };
  
  return(
    <div style={{ width: '100%', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent:'center', alignItems: 'center'}}>
      <div style={{}}>
        <InputComponent
          placeholder='City name'
          name={CITYSTRING}
          value={inputData[CITYSTRING]}
          onChange={onChangeFunc}
        />
      </div>
      <div>
        <InputComponent
          placeholder='Country name'
          name={COUNTRYSTRING}
          value={inputData[COUNTRYSTRING]}
          onChange={onChangeFunc}
        />
      </div>
      <div onClick={getWeatherButton} 
        style={{ 
        marginTop: '10px',
        padding: '7px',
        border: '2px solid skyblue', 
        backgroundColor: 'skyeblue', 
        color: 'skyblue',
        borderRadius: '7px' 
        }}>
        Get Weather
      </div>
      <div style={{width: '100%'}}>
        {(cityWeather !== null)
        ?
        <div style = {{ border: '2px solid red', fontSize: '35px', display: 'flex', justifyContent: 'space-evenly'}}>
          <div style={{border: '1px solid blue'}}>
            {cityWeather.temp}
          </div>
          <div style={{border: '1px solid purple'}}>
            {cityWeather.city_name}
          </div>
          <div style={{border: '1px solid gray'}}>
            {cityWeather.timezone}
          </div>
          <div style={{border: '1px solid green'}}>
            <img src={`https://www.weatherbit.io/static/img/icons/${cityWeather.weather.icon}.png`} alt={'weather picture'} />
          </div>
        </div>
        :
          null
        }
      </div>
      {/* <div style={{border: '2px solid pink', width: '80%', display: 'flex', justifyContent: 'flex-start'}}>
        <div style={{border: '2px solid black', width: '100%'}}>
          a section
        </div>
        <div style={{border: '2px solid red', width: '100%'}}>
          b section
        </div>
      </div> */}
    </div>
  
  )
}

export default BodyComponent;