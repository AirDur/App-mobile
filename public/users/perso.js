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
          document.getElementById('liste_de_tache').style.display = "block";
      })
      .error(function(data) {
        document.getElementById('pop-up').innerHTML =
          "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">Erreur: Ouverture de la liste échouée. Erreur non identifiée.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";   
          console.log('Error openList : ' + data);
      });
  }

  //fermer une liste de tache : 
  $scope.closeList = function(){
    document.getElementById('gestion').style.display = "block";
    document.getElementById('liste_de_tache').style.display = "none";
  }

  //Créer une liste : 
  $scope.createList = function() {
    $http.post('/Liste/api/create/' + $scope.user.id, $scope.listData)
    .success(function(data) {
        window.location.replace("/User/espace/" + $scope.user.id);
    })
    .error(function(data) {
        console.log('Error createList : ' + data);
    });
  };

  //Modifier une liste :
  $scope.editList = function() {
    if($scope.isCreator()) {
      if (document.getElementById('modify-list').innerHTML != '✔') {
        document.getElementById('listname').style.display = "none";
        document.getElementById('listname_modify').style.display = "block";
        document.getElementById('listdesc').style.display = "none";
        document.getElementById('listdesc_modify').style.display = "block";
        document.getElementById('modify-list').innerHTML='✔';
    }
    else {
        document.getElementById('listname').style.display = "block";
        document.getElementById('listname_modify').style.display = "none";
        document.getElementById('listdesc').style.display = "block";
        document.getElementById('listdesc_modify').style.display = "none";
        document.getElementById('modify-list').innerHTML='Modifier la liste';
        console.log(url);
        $http.post('/Liste/api/modify/'+url, $scope.listData)
        .success(function(data) {
            $scope.listData.tasks = data.tasks;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
    }
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
  $scope.stockIdcreateCollab = function(list_id) {
    $scope.collabData.list_id = list_id;
  };

  // Créer une collaboration
  $scope.createCollab = function() {
    $http.post('/Collaboration/create', $scope.collabData)
      .success(function(result) {
        // Résultat via notification Bootstrap : 
        if (result=='false'){
          document.getElementById('pop-up').innerHTML =
          "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">Erreur: Collaboration échouée, pas d'utilisateur "+$scope.collabData.name+" trouvé. <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";
        } else {
          document.getElementById('pop-up').innerHTML =
          "<div class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">Collaboration créee avec "+$scope.collabData.name+".<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";
        }
      })
      .error(function(data) {
        document.getElementById('pop-up').innerHTML =
          "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">Erreur: Collaboration échouée. Erreur non identifiée.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";      
          console.log('Error createCollab: ' + data);
      });
  };

  $scope.createTask = function() {
    $http.post('/Tache/api/'+url, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.listData.tasks = data.tasks;
        console.log(data.tasks);
      })
      .error(function(data) {
          console.log('Error index.js     : ' + data);
      }); 
  }

  $scope.editTask = function() {

  }


  $scope.checkTask = function() {

  }


  $scope.deleteTask = function() {

  }

  //supprime le cookie et force à se reconnecter
  $scope.deconnexion = function() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace('/');
  };

  $scope.isCreator = function() {
    /*
    $http.get('');
    */
    return true;
  };

  //Vérifie si une tâche est bien checké
  $scope.isChecked = function(index, x) {
    $scope.modifyData.checked = document.getElementById('done-'+index).checked;
    $http.post('/Tache/api/modify_done/' + url + '/' + x._id, $scope.modifyData)
    .success(function(data) {
        $scope.listData.tasks = data;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };
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