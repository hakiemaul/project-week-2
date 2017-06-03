var app = new Vue({
  el:'#app',
  data: {
          items:[],
          near: '',
          query: '',
          token: false,
          identity: [],
          timeline: []
        },
  methods: {
    search: function() {
      let self=this
      self.items = [];
      axios.post('http://localhost:3000/api/venue', {
        near: self.near,
        query: self.query,
        token: localStorage.getItem('token')
      })
      .then(response =>{
        console.log(response)
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
    },
    getTimeline: function(venuename) {
      let self = this;
      self.timeline = [];
      console.log(venuename)
      axios.post('http://localhost:3000/api/timeline', {
        search: venuename
      })
      .then(response => {
        self.timeline = response.data.statuses;
        console.log(response.data.statuses)
        $('.ui.basic.modal')
          .modal('show')
        ;
      })
      .catch(err =>{
        console.log(err);
      })
    },
    signout: function(){
      window.localStorage.clear()
      localStorage.removeItem('token')
      localStorage.removeItem('responseFb')
      location.reload()
    },
    signin : function(){
      var self = this
      axios.post('http://localhost:3000/api/signin',{
        username : self.username,
        password : self.password
      })
      .then((response)=>{
        console.log(response)
        if(response.data.token===undefined){
        location.reload()
        }else{
          localStorage.setItem("token", response.data.token);
          location.reload()
        }
      })
    },validation: function(){
      var self = this
      axios.post('http://localhost:3000/api/validation',{
        token : localStorage.getItem('token')
      })
      .then(result=>{
        if(!result.data.name)
        {
          localStorage.clear()
          self.token = false
        }else{
          self.identity = JSON.parse(localStorage.getItem('responseFb'))
          self.token = true
          console.log(self.identity.name)
        }
      })
      .catch(err=>{
        console.log(err)
      })
    }
  },
  created(){
    this.validation()
  }
})