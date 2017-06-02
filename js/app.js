var app = new Vue({
  el:'#app',
  data: {
          items:[]
        },
  created: function(){
    let self=this
    axios.get('http://localhost:3000/items')
    .then(response =>{
      console.log(response.data[0]);
      self.items=response.data;
    })
    .catch(err =>{
      console.log(err);
    })
  }

})
