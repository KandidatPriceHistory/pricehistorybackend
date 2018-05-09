import axios from 'axios';

window.setInterval(function(){
  console.log('each second');
}, 1000)

/*
axios.get("https://www.pricerunner.se/public/v1/pl/1-4257585/se?urlName=Mobiltelefoner/Apple-iPhone-X-64GB-priser&offer_sort=pricewithship")
      .then((response) => {

        console.log(response.data);
        // const dataResponse = response.data;
            })
      .catch((err) => {
        console.log('error noooo')
      })

axios({
  method: 'post',
  url: 'http://pricehistorybackend.herokuapp.com/',
  data: {
    product: 'iPhone',
    id: '1',
  }
})

/*
axios.post('/products', { id: '1' })
  .then((response) => {
    console.log('saved');
  })
*/
