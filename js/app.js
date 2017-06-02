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
      self.items = [];
      axios.post('http://localhost:3000/api/venue', {
        near: self.near,
        query: self.query
      })
      .then(response =>{
        response.data.venues.forEach(item => {
          self.getImage(item)
        })
      })
      .catch(err =>{
        console.log(err);
      })
    },
    getImage: function(venue) {
      let self = this;
      axios.post('http://localhost:3000/api/image', {
        venueId: venue.id
      })
      .then(response => {
        venue.gambar = `${response.data[0].prefix}300x300${response.data[0].suffix}`
        self.items.push(venue)
      })
      .catch(err =>{
        console.log(err);
      })
    }
  }

})
