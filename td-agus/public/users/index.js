var Connexion = angular.module('Connexion', []);

function mainController($scope, $http) {
    $scope.coData = {};
    $scope.response = {};

    $scope.connectUser = function() {
        //On vérifie si l'utilisateur a bien rempli les champs : 
        if(typeof $scope.coData.username != "undefined" && typeof $scope.coData.password != "undefined" ) {
            $http.post('/User/connect', $scope.coData)
                .success(function(data) {
                    console.log(data);
                    $scope.coData = {}; // On reset les champs
                    if (data == "Connexion réussie") {
                        $scope.response.color = 'green';
                        data =+ ', redirection sur votre espace ...';
                        $scope.response.text = data;
                        setTimeout(function(){
                            window.location.replace("/Liste");
                        }, 2000);
                    } else {
                        $scope.response.color = 'red';
                    };
                    $scope.response.text = data;   
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        } else {
            $scope.response.color = 'red';
            $scope.response.text = "Erreur : vous n'avez pas renseigné les informations nécessaires";
        }  
    };
}