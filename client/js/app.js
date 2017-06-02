var app = new Vue({
  el:'#app',
  data: {
          items:[],
          near: '',
          query: '',
          token: false,
          identity : []
        },
  methods: {
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
    }
    search: function() {
      let self=this
      axios.post('http://localhost:3000/api/venue', {
        near: self.near,
        query: self.query,
        token: localStorage.getItem('token')
      })
      .then(response =>{
        self.items = response.data.venues;
      })
      .catch(err =>{
        console.log(err);
      })
    },
    validation: function(){
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

