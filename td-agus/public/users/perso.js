var ListeGestion = angular.module('ListeGestion', []);

function mainController($scope, $http, $location) {

  $scope.listData = {};
  $scope.formData = {};
  $scope.collabData = {};
  $scope.user = {};
  $scope.user.id = getCookie('username');

  //Si cookie vide : pas de connexion : 
  if ($scope.user.id == ''){
    document.getElementById('pas_connecte').style.display ="block";
  } else {
    //Si l'utilisateur est dans la base de donnée on récupère les informations
    $http.post('/User/isExist', $scope.user)
    .success(function(data) {
      if(data != 'false'){
        //console.log(users);
        if($scope.user.id == data._id){
          //on transfert les données intéressantes.
          $scope.user.id = data._id;
          $scope.user.username = data.username;
          $scope.formData.creator = data.username;
          document.getElementById('gestion').style.display ="block";
      //Sinon, erreur.
        } else {
          document.getElementById('pas_connecte').style.display ="block";
        }
      } else {
        document.getElementById('pas_connecte').style.display ="block";
      }
    });
  }

  //Ouvrir une liste de tache : 
  $scope.openList = function(param){
    document.getElementById('gestion').style.display ="none";
    $http.get('/Liste/api/'+param)
      .success(function(res) {
          url = param;
          $scope.listData = res;
      })
      .error(function(data) {
          console.log('Error openList : ' + data);
      });
    document.getElementById('liste_de_tache').style.display ="block";
  }

  //fermer une liste de tache : 
  $scope.closeList = function(){
    document.getElementById('gestion').style.display ="block";
    document.getElementById('liste_de_tache').style.display ="none";
  }

  //Créer une liste : 
  $scope.createList = function() {
    $http.post('/Liste/api/create/' + $scope.user.id, $scope.listData)
    .success(function(data) {
        console.log(data);
        $scope.formData = {}; // clear the form so our user is ready to enter another
        $scope.listData = data;
    })
    .error(function(data) {
        console.log('Error createList : ' + data);
    });
  };

  //Modifier une liste :
  $scope.editList = function() {
    //todo
  };

  // Supprimer une liste : 
  $scope.deleteList = function(param) {
    $http.delete('/Liste/api/delete/' + $scope.user.id +'/'+param)
    .success(function(data) {
      window.location.replace("/User/espace/" + $scope.user.id);
    })
    .error(function(data) {
        console.log('Error deleteList: ' + data);
    });
  };

  // Affchige interface ajout d'un collaborateur : 
  $scope.showAddCollab = function(list_id,longueur) {
    for (pas = 1; pas <= longueur; pas++) {
      document.getElementById("add-collab-"+pas).disabled = true;
    }
    document.getElementById('collab-tab').style.display = "block";
    $scope.collabData.list_id = list_id;
  };

  // Créer une collaboration
  $scope.createCollab = function() {
    $http.post('/Collaboration/create', $scope.collabData)
      .success(function(result) {
        if (result=='false'){
          document.getElementById('result').color='red';
          document.getElementById('result').innerHTML="Collaboration échouée, pas d'utilisateur "+$scope.collabData.name+" trouvé.";
        } else {
          document.getElementById('result').color='green';
          document.getElementById('result').innerHTML="Collaboration créee avec "+$scope.collabData.name+".";
        }
      })
      .error(function(data) {
          console.log('Error createCollab: ' + data);
      });
  };

  $scope.fermerCollab = function(longueur) {
    for (pas = 1; pas <= longueur; pas++) {
      document.getElementById("add-collab-"+pas).disabled =false;
    }
    document.getElementById('collab-tab').style.display = "none";
    document.getElementById('result').innerHTML="";
  };

  //supprime le cookie et force à se reconnecter
  $scope.deconnexion = function() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace('/');
  }

  $scope.isCreator = function() {
    /*
    $http.get('');
    */
    return true;
  }


  $scope.editTask = function() {

  }


  $scope.checkTask = function() {

  }


  $scope.deleteTask = function() {

  }
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}