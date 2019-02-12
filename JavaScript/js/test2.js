var global_clic = false;

function afficheErreur(champ, erreur){
    if(erreur) {
      champ.style.backgroundColor = "#fba";
      champ.style.boxShadow = " 0 0 5px 1px red";
    }
    else {
      champ.style.backgroundColor = "";
      champ.style.boxShadow = "0 0 5px 1px green";
    }
 
 }
 
 function verifNom() {
   var champ = document.getElementById("nom");
   var erreur = document.getElementById("erreur_nom");
   if(!(champ.value.length < 4 || champ.value.length > 25))
     {  
        afficheErreur(champ, false);
        erreur.innerHTML = "";
        return true;
      }
      else
      {
         afficheErreur(champ, true);
         erreur.innerHTML = "Le Nom doit comporter entre 5 et 24 caractères.";
         return false;
      }
 }
 
 function verifAge() {
   var champ =  document.getElementById("age");
   var erreur = document.getElementById("erreur_age");
   var regex = /^(100|[1-9][0-9]|[5-9]?)$/;
   if(!(regex.test(champ.value) && champ.value.length>0))
     {
         afficheErreur(champ, true);
         erreur.innerHTML = "L'age doit etre compris entre 5 et 100";
         return false;
      }
      else
      {
         afficheErreur(champ, false);
         erreur.innerHTML = "";
         return true;
      }
 }

 function verifPassword() {
  var champ =  document.getElementById("password");
  var erreur = document.getElementById("erreur_mdp");
  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,255}$/;
  if(!regex.test(champ.value))
    {
        afficheErreur(champ, true);
        erreur.innerHTML = "Le mot de passe doit une minuscule, une majuscule, un chiffre et faire 6 de long au minimum.";
         return false;
     }
     else
     {
        afficheErreur(champ, false);
        erreur.innerHTML = "";
        return true;
     }
}

function verifPassword2() {
  var champ = document.getElementById("password");
  var champ2 = document.getElementById("password_verif");
  var erreur = document.getElementById("erreur_mdp_verif");
  if((champ.value!=champ2.value || !verifPassword()))
    {
        afficheErreur(champ2, true);
        erreur.innerHTML = "Les mots de passe ne correspondent pas";
        return false;
     }
     else
     {
        afficheErreur(champ2, false);
        erreur.innerHTML = "";
        return true;
     }
}
 
 function verifMail() {
   var champ =  document.getElementById("mail");
   var erreur = document.getElementById("erreur_mail");
   var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
   if(!regex.test(champ.value)) {
     afficheErreur(champ, true);
     erreur.innerHTML = "Ce n'est pas un mail";
     return false;
   } else {
     afficheErreur(champ, false);
     erreur.innerHTML = "";
     return true;
   }
 }
 
 function verifUrl() {
   var champ =  document.getElementById("website");
   var regex = /^(?:(http[s]?|ftp[s]):\/\/)?([^:\/\s]+)(:[0-9]+)?((?:\/\w+)*\/)([\w\-\.]+[^#?\s]+)([^#\s]*)?(#[\w\-]+)?$/;
   if(!regex.test(champ.value) && champ.value!="") {
    afficheErreur(champ, false);
    return true;
   } else {
    afficheErreur(champ, true);
    return false;  
   }
 }

 function verifGender() {
   var boutons = document.getElementsByClassName("radio");
   var erreur = document.getElementById("erreur_gender");
   var retour = false;
   for(var i = 0; i < boutons.length; i++) {
     var b = boutons[i];
     if(b.checked) {
       retour = true;
     }
   }
   if(!retour) {
      erreur.innerHTML = "Veuillez selectionner un gender INCLUSIF svp";
   } else {
     erreur.innerHTML = "";
   }
   return retour;
 }
 
 function reset_form() {
   document.getElementById("contact").reset;
   document.getElementById("mail").style.backgroundColor = "";
   document.getElementById("mail").style.boxShadow = "";
   document.getElementById("erreur_mail").innerHTML = "";

   document.getElementById("nom").style.backgroundColor = "";
   document.getElementById("nom").style.boxShadow = "n";
   document.getElementById("erreur_nom").innerHTML = "";
   
   document.getElementById("age").style.backgroundColor = "";
   document.getElementById("age").style.boxShadow = "";
   document.getElementById("erreur_age").innerHTML = "";

   document.getElementById("password").style.backgroundColor = "";
   document.getElementById("password").style.boxShadow = "";
   document.getElementById("erreur_mdp").innerHTML = "";

   document.getElementById("password_verif").style.backgroundColor = "";
   document.getElementById("password_verif").style.boxShadow = "";
   document.getElementById("erreur_mdp_verif").innerHTML = "";
 }
 
 function f_submit() {
   console.log("eijzejfz");
   global_clic = true;
   var test = verifAge();
   var test2 = verifMail();
   var test3 = verifNom();
   var test4 = verifPassword();
   var test5 = verifPassword2();
   var test6 = verifGender();
   if(test && test2 && test3 && test4 && test5 && test6) {
     alert("MAIS !");
   }
 }
 
function initialisation() {
    var nom =  document.getElementById("nom");
    var age =  document.getElementById("age");
    var password =  document.getElementById("password");
    var password_verif =  document.getElementById("password_verif");
    var mail =  document.getElementById("mail");

    var reset =  document.getElementById("reset");
    var submit = document.getElementById("submit");

    nom.addEventListener("input", verifNom, true);
    age.addEventListener("input", verifAge);
    mail.addEventListener("input", verifMail);
    password.addEventListener("input", verifPassword);
    password_verif.addEventListener("input", verifPassword2);
    reset.addEventListener("click", reset_form);
    submit.addEventListener("click", f_submit);
}
 
document.addEventListener("DOMContentLoaded", function(event) {
    initialisation();
});
 