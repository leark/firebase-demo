// Create application with dependency 'firebase'
var app = angular.module('myApp', ['firebase']);

// Bind controller, passing in $scope, $firebaseAuth, $firebaseArray, $firebaseObject
app.controller('myCntr', function($scope, $firebaseAuth, $firebaseArray, $firebaseObject) {


    // Create a variable 'ref' to reference your firebase storage
    // currently linked to yota's 
    var ref = new Firebase("https://twitter-demo-youta.firebaseio.com/");
    
    // Create references to store tweets and users
    var tweets = ref.child('tweets');
    var users = ref.child('users');

    // Create a firebaseArray of your tweets, and store this as part of $scope
    $scope.tweets = $firebaseArray(tweets);

    // Create a firebaseObject of your users, and store this as part of $scope
    $scope.users = $firebaseObject(users);

    // Create authorization object that referes to firebase
    $scope.authObj = $firebaseAuth(ref);

    // Test if already logged in
    var authData = $scope.authObj.$getAuth();
    if (authData) {
        $scope.userId = authData.uid;
    } 

    // SignUp function
    $scope.signUp = function() {
        // Create user
        $scope.authObj.$createUser({
            email: $scope.email,
            password: $scope.password,          
        })

        // Once the user is created, call the logIn function
        .then($scope.logIn)

        // Once logged in, set and save the user data
        .then(function(authData) {
            $scope.userId = authData.uid;
            $scope.users[authData.uid] ={
                handle:$scope.handle, 
                userImage:$scope.userImage,
            }
            $scope.users.$save()
        })

        // Catch any errors
        .catch(function(error) {
            console.error("Error: ", error);
        });
    }

    // SignIn function
    $scope.signIn = function() {
        $scope.logIn().then(function(authData){
            $scope.userId = authData.uid;
        })
    }

    // LogIn function
    $scope.logIn = function() {
        return $scope.authObj.$authWithPassword({
            email: $scope.email,
            password: $scope.password
        })
    }

    // LogOut function
    $scope.logOut = function() {
        $scope.authObj.$unauth()
        $scope.userId = false
    }

    $scope.tweet = function() {
        $scope.tweets.$add({
            text: $scope.newTweet,
            userId: $scope.userId,
            likes: 0,
            time: Firebase.ServerValue.TIMESTAMP
        }).then( function() {
            $scope.newTweet = "";
        })
    }

    $scope.liked = function(tweet) {
        tweet.likes += 1;
        $scope.tweets.$save(tweet);
    }
})
