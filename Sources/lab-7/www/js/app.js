// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('app',['ionic', 'app.controllers', 'app.routes','app.directives','app.services',])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})


lab7.controller("SecureController", function($scope, $ionicHistory, $ionicActionSheet, $firebaseObject, $firebaseArray, $firebaseAuth, $cordovaCamera,$state) {

    $ionicHistory.clearHistory();  //for clearing user login history

    $scope.images = [];
    $scope.fb = $firebaseAuth();
    var fbAuth = $scope.fb.$getAuth();
    var ref = firebase.database().ref();
    var obj = $firebaseObject(ref);
    
    
    if(fbAuth) {
        var userReference = ref.child("users/" + fbAuth.uid);   //capture the user reference in data structure ,it navigates to specific user page in freebase
        var syncArray = $firebaseArray(userReference.child("images"));  //binding specific node in firebase to an array object in angularjs
        $scope.images = syncArray;
    } else {
        $state.go("firebase");  //directs to firebase page
    }

    
    
   //Called when button is clicked
	$scope.showActionsheet = function() {
	

        
        
$ionicActionSheet.show({
  titleText: 'what do you want to do with your photo?',
   
	cancelText: 'Cancel',
  destructiveText: 'Delete',
	
  buttons: [
       { text: '<b>Share</b> This' },
       { text: 'Move' }
     ]
        
                       
});
    
      
      $ionicActionSheet.show({
  titleText: 'chose the way to share:',
   
	cancelText: 'Cancel',
  destructiveText: 'Delete',
	
  buttons: [
       { text: '<b>Share</b> with facebook' },
       { text: '<b>Share</b> with twitter' }
     ]
        
                       
});
        

    }
    
    
    
    
    
    
    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert("Image has been uploaded");
            });
        }, function(error) {
            console.error(error);
        });
    }

});

