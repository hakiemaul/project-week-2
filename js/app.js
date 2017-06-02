var app = new Vue({
  el:'#app',
  data: {
          items:[],
          near: '',
          query: '',
          user: ''
        },
  methods: {
    search: function() {
      let self=this
      axios.post('http://localhost:3000/api/venue', {
        near: self.near,
        query: self.query
      })
      .then(response =>{
        console.log(response);
        self.items = response.data.venues;
      })
      .catch(err =>{
        console.log(err);
      })
    }
  }

})
