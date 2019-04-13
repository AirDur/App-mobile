var ListeGestion = angular.module('ListeGestion', []);

function mainController($scope, $http, $location) {

  $scope.listData = {}; //liste des données d'un utilisateur
  $scope.newListData = {}; //donnée pour rajouter une liste
  $scope.formData = {}; //donnée pour rajouter une tache
  $scope.collabData = {}; // donnée pour rajouter une collaboration
  $scope.editData = {}; //donnée de modification d'une tache
  $scope.user = {}; //donées de l'utilisateur
  $scope.user.id = getCookie('username');

  //Style done : 
  $scope.styleDone = {
    "background-color" : "lightgray"
  }

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
    $scope.newListData.creator = $scope.user.username;
    $http.post('/Liste/api/create/' + $scope.user.id, $scope.newListData)
    .success(function(data) {
        window.location.replace("/User/espace/" + $scope.user.id);
    })
    .error(function(data) {
        console.log('Error createList : ' + data);
    });
  };

  //Modifier une liste :
  $scope.editList = function() {
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
  };

  // Supprimer une liste : 
  $scope.deleteList = function(param) {
    $http.delete('/Liste/api/delete/' + $scope.user.id + '/' + param)
    .success(function(data) {
        window.location.replace("/User/espace/" + $scope.user.id);
    })
    .error(function(data) {
        console.log('Error deleteList: ' + data);
    });
  };

  // Affchige interface ajout d'un collaborateur et ajoute l'id dans les données
  $scope.stockIdcreateCollab = function(list_id) {
    $scope.collabData.list_id = list_id;
  };

  // Créer une collaboration
  $scope.createCollab = function() {
    $http.post('/Collaboration/create', $scope.collabData)
      .success(function(result) {
        $scope.collabData = {};
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
        $scope.collabData = {};
        document.getElementById('pop-up').innerHTML =
          "<div class=\"alert alert-error alert-dismissible fade show\" role=\"alert\">Erreur: Collaboration échouée. Erreur non identifiée.<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button></div>";      
          console.log('Error createCollab: ' + data);
      });
  };

  // Créer une tâche :
  $scope.createTask = function() {
    $scope.formData.creator = $scope.user.username;
    $http.post('/Tache/api/'+url, $scope.formData)
      .success(function(data) {
        $scope.formData = {};
        $scope.listData.tasks = data.tasks;
      })
      .error(function(data) {
          console.log('Error index.js     : ' + data);
      }); 
  }

  // Modifier une tâche : 
  $scope.editTask = function(index, task) {
    if (document.getElementById('modify-'+index).innerHTML=='Modifier') {
      for(var i = 0; i < $scope.listData.length; i++) {
          affichageNormal_Modify(i);
      }
      document.getElementById('edittasktext-'+index).style.display = "block";
      document.getElementById('tasktext-'+index).style.display = "none";
      document.getElementById('modify-'+index).innerHTML='✔';
      $scope.editData.text = task.text;
    }
    else {
        affichageNormal_Modify(index);
        $http.post('/Tache/api/modify/' + url + '/' + task._id, $scope.editData)
        .success(function(data) {
            console.log(data);
            $scope.listData = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
  }

  // fonction pour CSS.
  $scope.checkTask = function(id, done, index) {
    if(done)
      return $scope.styleDone;
  }

  //Supprime une tache
  $scope.deleteTask = function(id) {
    $http.delete('/Tache/api/' + url + '/' + id)
    .success(function(data) {
        $scope.listData = data;
    })
    .error(function(data) {
        console.log('Error : ' + data);
    }); 
  }

  //Supprime toutes les tâches faites
  $scope.deleteDoneTask = function() {
    console.log("call");
    for(i in $scope.listData.tasks) {
      if($scope.listData.tasks[i].done) {
        $http.delete('/Tache/api/delete/' + $scope.listData.tasks[i]._id)
          .success(function(data) {
            console.log(data);
            $scope.listData.tasks = data.tasks;
          })
          .error(function(data) {
            console.log('Error : ' + data);
          }); 
      }
    }
  }

  //supprime le cookie et force à se reconnecter
  $scope.deconnexion = function() {
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.replace('/');
  };

  // Vérifie si l'utilisateur est bien le créateur.
  $scope.isCreator = function(param) {
    if($scope.user.username == param) {
      return true;
    } else {
      return false;
    }
  };

  //Vérifie si une tâche est bien checké
  $scope.isChecked = function(index, x) {
    $scope.editData.checked = document.getElementById('done-'+index).checked;
    $http.post('/Tache/api/modify_done/' + url + '/' + x._id, $scope.editData)
    .success(function(data) {
        $scope.listData.tasks = data.tasks;
    })
    .error(function(data) {
        console.log('Error: ' + data);
    });
  };
}

// Reset l'affichage de modification des autres tâches
function affichageNormal_Modify(index) {
  document.getElementById('edittasktext-'+index).style.display = "none";
  document.getElementById('tasktext-'+index).style.display = "block";
  document.getElementById('modify-'+index).innerHTML = 'Modifier';
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