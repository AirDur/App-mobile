var todoApp = angular.module('todoApp', []);
todoApp.controller('ctrlTodo', ['$scope', function($scope) {

    //initialisation
    $scope.init = function() {
        $scope.tabOfTasks = [];
        $scope.checked = [];
    }

    $scope.styleChecked = {
        "text-decoration" : "line-through"
    }

    //Ajout d'une task. Affiche une erreur si déjà en double.
    $scope.addTask = function() {
        if($scope.tabOfTasks.indexOf($scope.taskName) == -1) {
            $scope.tabOfTasks.push($scope.taskName);  
            var index = $scope.tabOfTasks.indexOf($scope.taskName); 
            $scope.checked[index] = false;
            $scope.taskName = "";
            $scope.addTaskError = "";
        } else {
            $scope.addTaskError = "Erreur : tâche déjà existante.";
        }
    };

    //Supprime une tâche en particulier  
    $scope.delTask = function(index) {
        $scope.tabOfTasks.splice(index,1);
        $scope.checked.splice(index,1);
    }

    //Supprime les tâches "finies"
    $scope.delCheckedTask = function() {
        for(var i = 0; i <= $scope.checked.length; i++) {
            if($scope.checked[i]) {
                $scope.delTask(i);
                i = $scope.checked.length+1;
                $scope.delCheckedTask();
            }
        }
    }

    //barre une tache faite.
    $scope.taskDone = function(aTask) {
        var index = $scope.tabOfTasks.indexOf(aTask);
        if($scope.checked[index]) {
            return $scope.styleChecked;
        }         
        else {
            return "";
        }
    }

    $scope.init();
}]);

  