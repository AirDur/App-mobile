var HelloApp = angular.mondule('helloApp', []);
HelloApp.controller('helloCtrl', ['$scope', function($scope) {
    $scope.name = 'TEST123';
}]);