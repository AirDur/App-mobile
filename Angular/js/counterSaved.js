var CounterApp = angular.module('counterApp', []);
CounterApp.controller('CounterSavedCtrl', ['$scope', function($scope) {
    $scope.load = function() {
        $scope.counter = localStorage.getItem("counter");
    };

    $scope.incrementer = function() {
        $scope.counter++;
        localStorage.setItem("counter", $scope.counter);
    };

    $scope.load();
}]);