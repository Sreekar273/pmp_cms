// import { find } from '../../index';
var User = require('../../index');

var pmpApp = angular.module('pmpApp', []);

pmpApp.controller('myController', ['$scope', function($scope){
    // $scope.users = User.find({});
    $scope.message = "Hey";
}]);