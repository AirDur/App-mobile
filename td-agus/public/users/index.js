var Connexion = angular.module('Connexion', []);

function mainController($scope, $http) {
    $scope.coData = {};
    $scope.response = {};

    // Fonction de connexion.
    $scope.connectUser = function() {
        //On vérifie si l'utilisateur a bien rempli les champs : 
        if(typeof $scope.coData.username != "undefined" && typeof $scope.coData.password != "undefined" ) {
            $http.post('/User/connect', $scope.coData)
                .success(function(data) {
                    $scope.coData = {}; // On reset les champs
                    if (data[1] == 0)  {
                        setCookie('username', $scope.coData.username, 0.01);
                        $scope.response.color = 'green';
                        $scope.response.text = "Bienvenue ! Redirection sur votre espace en cours...";
                        setTimeout(function(){
                            
                            console.log('/'+data[0].replace(/^"(.*)"$/, '$1'));
                            window.location.replace('/'+data[0].replace(/^"(.*)"$/, '$1'));
                        }, 2000);
                    } else {
                        $scope.response.color = 'red';
                        $scope.response.text = "erreur : " + data[0];   
                    };
                    
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

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}