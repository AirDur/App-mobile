var ListeaFaire = angular.module('ListeaFaire', []);

function mainController($scope, $http, $location) {

    var url = $location.search().list;
    $scope.formData = {};
    $scope.formModify = {};
    $scope.laliste = {};

    $scope.styleDone = {
        "background-color" : "lightgray"
    }
    console.log("URL ::::" + url);
    //Obtenir la liste (appel à la fonction get dans server.js)
    $http.get('/Liste/api/'+url)
        .success(function(data) {
            $scope.laliste = data;
        })
        .error(function(data) {
            console.log('Error index.js : ' + data);
        });

    //rajout d'une tâche (appel à la fonction post dans server.js)
    $scope.createTodo = function() {
        $http.post('/Tache/api', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error index.js     : ' + data);
            }); 
    };

    //Modification d'une tâche : 
    $scope.modifyTodo = function(task, index) {
        if (document.getElementById('btn-modify-'+index).innerHTML=='Modifier') {
            for(var i = 0; i < $scope.laliste.length; i++) {
                affichageNormal_Modify(i);
            }
            document.getElementById('xtextmodify-'+index).style.display = "block";
            document.getElementById('xtext-'+index).style.display = "none";
            document.getElementById('btn-modify-'+index).innerHTML='✔';
            $scope.formModify.text = task.text;
        }
        else {
            affichageNormal_Modify(index);
            $http.post('/Tache/api/modify/' + task._id + "/" + $scope.formModify.text)
            .success(function(data) {
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        };
};

    //suppression d'une tâche (appel à la fonction delete dans server.js)
    $scope.deleteTodo = function(id) {
        $http.delete('/Liste/api/delete/' + id)
            .success(function(data) {
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    };

    // Permet de déclarer une tâche "effectuée" : 
    $scope.checkTodo = function(id, done, index) {
        $http.post('/Liste/api/' + id + "/" + done)
            .success(function(data) {
                $scope.formData = {};
                $scope.laliste = data;
            })
            .error(function(data) {
                console.log('Error : ' + data);
            }); 
    }

    $scope.taskDone = function(done) {
        if(done)
            return $scope.styleDone;
    }

    //Supprime les tâches "finies" : 
    $scope.delCheckedTask = function() {
        for(i in $scope.laliste) {
            if($scope.laliste[i].done) {
                $http.delete('/Liste/api/delete/' + $scope.laliste[i]._id)
                    .success(function(data) {
                        $scope.laliste = data;
                    })
                    .error(function(data) {
                        console.log('Error : ' + data);
                    }); 
            }
        }
    }

    function affichageNormal_Modify(index) {
        document.getElementById('xtextmodify-'+index).style.display = "none";
        document.getElementById('xtext-'+index).style.display = "block";
        document.getElementById('btn-modify-'+index).innerHTML = 'Modifier';
    }
}