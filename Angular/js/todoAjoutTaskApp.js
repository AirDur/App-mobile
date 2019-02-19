var todoAjoutTaskApp = angular.module('todoAjoutTaskApp', []);
todoAjoutTaskApp.controller('TestCtrl1', ['$scope', function($scope) {

    $scope.init = function() {
        $scope.TaskSet = [];
    }

    $scope.addTask = function() {
        $scope.TaskSet.push($scope.taskName);
        $scope.taskName = "";
    };

    $scope.init();
}]);