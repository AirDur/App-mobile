var Inscription = angular.module('Inscription', []);

function mainController($scope, $http) {
    $scope.insData = {};
    $scope.response = {};

    // fonction créer un nouveau utilisateur
    $scope.createUser = function() {
        if(validateForm($scope.insData) ) {
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
            $scope.response.text = "Erreur : vous n'avez pas renseigné les informations nécessaires.";
        }   
    };

    
}

//Ajout de document listener : 
document.addEventListener("DOMContentLoaded", function(event) {

    var username = document.getElementById("username");
    username.addEventListener("focus", function () {
        document.getElementById("usernameHelp").textContent = "Longueur : 6 à 24 caractères";
    });
    username.addEventListener("input", function () {
        checkUsername(username);
    });
    username.addEventListener("blur", function () {
        if(checkUsername(username)) { 
            username.style.backgroundColor = "";
            document.getElementById("usernameHelp").textContent = "";
        }
    });

    var password = document.getElementById("password");
    var passwordconf = document.getElementById("passwordconf");
    password.addEventListener("focus", function () {
        document.getElementById("passwordHelp").textContent = "Longueur : 7 et 22 caractères";
    });
    password.addEventListener("input", function () {
        checkPassword(password, passwordconf);
    });
    password.addEventListener("blur", function () {
        resetPassword(password, passwordconf);
    });
    
    passwordconf.addEventListener("focus", function () {
        document.getElementById("passwordconfHelp").textContent = "Doit être identique";
    });
    passwordconf.addEventListener("input", function () {
        checkPassword(password, passwordconf);
    });
    passwordconf.addEventListener("blur", function () {
        resetPassword(password, passwordconf);
        
    });
});

// Vérifie si le formulaire est bon :
function validateForm(event) {
    // event.preventDefault();
    var erreur = document.getElementById("erreur");
    if(checkUsername(username) && checkPassword(password,passwordconf)) {
        erreur.color = "green";
        erreur.textContent = "Formulaire valdié, envoi ...";
        return true;
    } else {
        erreur.textContent = "Erreur ! vérifier votre formulaire !";
        return false;
    }
}

// Verifie si le champ username est correct.
function checkUsername(champ) {
    if(champ.value.length < 6 || champ.value.length > 24){
        affiche_erreur(champ, true);
        return false;
    } else {
        affiche_erreur(champ, false);
        return true;
    }
}

function checkPassword(champ, champ2){
    if(champ.value.length < 7 || champ.value.length > 22 || champ.value != champ2.value){
        affiche_erreur(champ, true);
        affiche_erreur(champ2, true);
        return false;
    } else {
        affiche_erreur(champ, false);
        affiche_erreur(champ2, false);
        return true;
    }
}
 
// réinitialise le CSS des mots de passe.
function resetPassword(password, passwordconf) {
    if(checkPassword(password, passwordconf)) { 
        password.style.backgroundColor = "";
        passwordconf.style.backgroundColor = "";
        document.getElementById("passwordHelp").textContent = "";
        document.getElementById("passwordconfHelp").textContent = "";
    }
}

function affiche_erreur(champ, erreur){
    if(erreur)
       champ.style.backgroundColor = "#fba";
    else
       champ.style.backgroundColor = "#afb";
}  
