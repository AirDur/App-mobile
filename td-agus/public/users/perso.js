var ListeGestion = angular.module('ListeGestion', []);

function mainController($scope, $http, $location) {

  $scope.listData = {};
  $scope.collabData = {};
  var identifiant = document.getElementById('id').innerHTML;
  var collab_list;

  $scope.createList = function() {
    $http.post('Liste/api/create/'+identifiant, $scope.listData)
    .success(function(data) {
        console.log(data);
        window.location.replace("/"+identifiant);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };

  // Supprimer une liste : 
  $scope.deleteList = function(param) {
    $http.delete('Liste/api/delete/'+identifiant+'/'+param)
    .success(function(data) {
      window.location.replace("/"+identifiant);
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };

  // Ajouter un collaborateur : 
  $scope.addCollab = function(list_id,longueur) {
    for (pas = 1; pas <= longueur; pas++) {
      document.getElementById("add-collab-"+pas).disabled = true;
    }
    document.getElementById('collab-tab').style.display = "block";
    $scope.collabData.list_id = list_id;
  };

  // Créer une collaboration
  $scope.createCollab = function() {
    $http.post('Collaboration/create', $scope.collabData)
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
          console.log('Error: ' + data);
      });
  };

  $scope.fermerCollab = function(longueur) {
    for (pas = 1; pas <= longueur; pas++) {
      document.getElementById("add-collab-"+pas).disabled =false;
    }
    document.getElementById('collab-tab').style.display = "none";
    document.getElementById('result').innerHTML="";
  };

}