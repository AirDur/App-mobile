var TodoApp = angular.module('todoApp', []);
TodoApp.controller('TestCtrl1', ['$scope', function($scope) {
    $scope.modifyFirstName = function() {
        $scope.firstName = "test";
    };
}]);

TodoApp.controller('TestCtrl2', ['$scope', function($scope) {
    
        $scope.firstName = "NUMEROBIS";
    
}]);