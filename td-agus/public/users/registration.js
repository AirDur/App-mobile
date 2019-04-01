var Inscription = angular.module('Inscription', []);

function mainController($scope, $http) {
    $scope.insData = {};
    $scope.response = {};

    $scope.createUser = function() {
        if( //typeof $scope.insData.username != "undefined" 
         typeof $scope.insData.password != "undefined" 
        && typeof $scope.insData.passwordconf != "undefined") {
            if($scope.insData.password == $scope.insData.passwordconf) {
                $http.post('/User/add', $scope.insData)
                    .success(function(data) {
                        $scope.insData = {};
                        window.location.replace("/confirmation");
                    })
                    .error(function(data) {
                        $scope.response.text = "Erreur lors de l'inscription. Vérifiez vos données.";
                        console.log('Error: ' + data);
                    });
            } else {
                $scope.response.text = "Erreur : Les mots de passe ne correspondent pas.";
            }
        } else {
            $scope.response.text = "Erreur : vous n'avez pas renseigné les informations nécessaires.";
        }   
    };
}