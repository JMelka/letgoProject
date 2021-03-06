// Register `login` component, along with its associated controller and template
angular.
  module('login').
  component('login', {  
      //** template
      templateUrl: '/static/login/login.template.html',
      //** controller
      controller: function loginController($scope, $http, $location, $cookies) {
        var self = this;
        $scope.data;
        //** check if userid is in cookie, redirect to /forSale page, otherwise, continue on /login page.
        var cUserid = $cookies.get('userid');
        console.log("Userid from cookies jar: "+ cUserid);
        if (cUserid) {
          $location.url('/forSale');
        }

        
        //** click submit 
        self.redirect = function() {
         // console.log('User clicked submit with ', self.userName);

          //$http.get('/getUser/'+self.userName)
          $http.get('/getLogin/' + self.userName + '/' + self.password)

            .then(function (res) {    //** Function handles success
                $cookies.put('userid', res.data.userid);
                $cookies.put('email', res.data.email);
                $cookies.put('name', res.data.name);
                $cookies.put('location', res.data.location);
                reloadBG();           //** reload background image *optional*
                $location.url('/forSale');

                // var email = encodeURIComponent(self.userName);
                // $location.url('/forSale/' + email);

            }, function(res){         //** Function handles error
              console.log("Invalid username or password, try again!");
              self.errorMessage = "Invalid username or password, try again!";
            })
        }
        //** click register
        self.register = function() {
          reloadBG();   //** reload background image *optional*
          $location.url('/newUser');
        }            
      }

  });

