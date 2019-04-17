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
                        setCookie('username', data[0], 0.01);
                        document.getElementById('pop-up').innerHTML =
                        "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Bienvenue ! Redirection sur votre espace en cours...</div>";
                      
                        setTimeout(function(){
                            window.location.replace('/User/espace/'+data[0].replace(/^"(.*)"$/, '$1'));
                        }, 2000);
                    } else {
                        document.getElementById('pop-up').innerHTML =
                            "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">erreur : " + data[0] + "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";  
                    };
                })
                .error(function(data) {
                    document.getElementById('pop-up').innerHTML =
                            "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">erreur : Erreur inconnu. <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";  
                    console.log('Error: ' + data);
                });
        } else {
            document.getElementById('pop-up').innerHTML =
                "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">Erreur : vous n'avez pas renseigné les informations nécessaires. <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";          
        }  
    };
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}