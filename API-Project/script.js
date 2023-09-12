let bitCoinChartURL = 'https://rest.coinapi.io/v1/exchangerate/BTC/USD/history?period_id=1MIN&time_start=2023-07-01T00:00:00&time_end=2023-07-14T00:00:00'

let config = {
    headers: {
    'Accept': 'application/json',
    'X-CoinAPI-Key': '5DA14D1A-2D03-470A-9556-70F99E9935D2'
  }}

axios.get(bitCoinChartURL, config)
.then(function (response) {
  let datas = {
    "rate_open": response.data.map(day =>{return day.rate_low}),
    "rate_close": response.data.map(day =>{return day.rate_close}),
    "rate_high": response.data.map(day =>{return day.rate_high}),
    "dates": response.data.map(day=>{
        let date = day.time_period_start.split('T')[0];
        return date 
        })
    };
    buildChart(datas);
})
.catch(function (error) {
    // handle error
    console.log(error);
});

const buildChart = (datas) => {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: datas.dates,
            datasets: [{
            label: 'Rate Open',
            borderColor: 'rgba(0, 67, 255, 0.8)',
            data: datas.rate_open,
            },
            {
            label: 'Rate Close',
            borderColor: 'rgba(255, 0, 132, 0.8)',
            data: datas.rate_close,
            },
            {
            label: 'Rate High',
            borderColor: 'rgba(0, 255, 132, 0.8)',
            data: datas.rate_high,
            }]
            }
    });
};