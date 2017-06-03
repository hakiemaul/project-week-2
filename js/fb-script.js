function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  if (response.status === 'connected') {
    testAPI();
  } else {
    document.getElementById('status').innerHTML = 'Please log ' +
      'into this app.';
  }
}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

window.fbAsyncInit = function() {
FB.init({
  appId      : 469306980082723,
  cookie     : true,  // enable cookies to allow the server to access
                      // the session
  xfbml      : true,  // parse social plugins on this page
  version    : 'v2.8' // use graph api version 2.8
});

FB.getLoginStatus(function(response) {
  statusChangeCallback(response);
});

};

(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
  var userID;
  console.log('Welcome!  Fetching your information.... ');

  FB.api('/me',{fields: 'name, email'}, function(response) {
    console.log('Successful login for: ' + JSON.stringify(response));
    localStorage.setItem('responseFb', JSON.stringify(response))
    var identity = JSON.parse(localStorage.getItem('responseFb'))
    axios.post('http://localhost:3000/api/signfb',{
      email : identity.email,
      name : identity.name
    })
    .then((result)=>{
      localStorage.setItem('token', result.data.token)
    })
    .catch((err)=>{
      console.log(err)
    })
  });
}