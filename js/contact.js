$("#contact-form").submit(function(event) {
    event.preventDefault();
    var submitOK = true;
    var nom, prenom, email, phone, objet, message, cguCheck;

    nom = $("#nom").val();
    prenom = $("#prenom").val();
    email = $("#email").val();
    phone = rmSpaces($("#tel").val());
    objet = $("#object").val();
    message = $("#message").val();
    cguCheck = document.getElementById("cguCheck").checked;
    // // --- Control input value

    //Nom
    if (rmSpaces(nom).length < 1) {
        $("#error-nom").html("Le nom est obligatoire");
        submitOK = false;
    }else if (nom.length > 50) {
        $("#error-nom").html("C'est trop long!");
        submitOK = false;
    }else {
        $("#error-nom").html("");
    }

    //Prenom
    if (rmSpaces(prenom).length < 1) {
        $("#error-prenom").html("Le prénom est obligatoire");
        submitOK = false;
    }else if ( prenom.length > 50 ) {
        $("#error-prenom").html("C'est trop long!");
        submitOK = false;
    } else {

        $("#error-prenom").html("");
    }


    // //Email
    var at = email.indexOf("@");
    var pt = email.indexOf(".");
    if (email.length < 1) {
        $("#error-email").html("L'adresse mail est obligatoire");
        submitOK = false;
    } else if ( email.length > 50 ) {
        $("#error-email").html("C'est trop long!");
        submitOK = false;
    } else if (at == -1 || pt == -1) {
        $("#error-email").html("L'adresse mail est incomplète");
        submitOK = false;
    } else {
        $("#error-email").html("");
    }


    // // Téléphone
    if (phone.length < 1) {
        $("#error-phone").html("Le téléphone est obligatoire");
        submitOK = false;
    } else if (!isNumber(phone)) {
        $("#error-phone").html("Le numéro de téléphone est invalide");
        submitOK = false;
    } else if (phone.length < 10 ) {
        $("#error-phone").html("Le numéro de téléphone est invalide");
        submitOK = false;
    } else if ( phone.length > 50 ) {
        $("#error-phone").html("C'est trop long!");
        submitOK = false;
    } else {
        $("#error-phone").html("");
    }


    // //Objet
    if (rmSpaces(objet).length < 1) {
        $("#error-objet").html("L'objet est obligatoire");
        submitOK = false;
    } else if ( objet.length > 20 ) {
        $("#error-objet").html("C'est trop long!");
        submitOK = false;
    } else {
        $("#error-objet").html("");
    }

    // // Message
    if (rmSpaces(message).length < 1) {
        $("#error-message").html("Le message est obligatoire");
        submitOK = false;
    } else {
        $("#error-message").html("");
    }

    //  // cgu
     if (cguCheck==false) {
        $("#error-cguCheck").html("Veuillez accepter les conditions générales d'utilisation.");
        submitOK = false;
    } else {
        $("#error-cguCheck").html("");
    }


    if (submitOK == true) {

        var aDoc = AddAction(null, "1", "NOM_ACTION_P", "PROCEDURE", "Ps_Inserer_Contact_Avocat", "O");
        aDoc = AddParam(aDoc, 1, 0, "_Nom", nom, "O");
        aDoc = AddParam(aDoc, 1, 0, "_Prenom", prenom, "O");
        aDoc = AddParam(aDoc, 1, 0, "_Email", email, "O");
        aDoc = AddParam(aDoc, 1, 0, "_Tel", phone, "O");
        aDoc = AddParam(aDoc, 1, 0, "_Objet", objet, "O");
        aDoc = AddParam(aDoc, 1, 0, "_Message", message, "O");

        var xml = XML2String(aDoc);
       

        ExecuteCommand("P", "AOOA", xml, RetourA_SiOk, RetourA_SiKo, ["", ""], false);
        


        function RetourA_SiOk(obj, data, params) {
            swal("Merci de nous avoir contacté.", "Nous vous répondrons dans les meilleurs délais.", "success");
            $("#contact-form")[0].reset();

           
        }

        function RetourA_SiKo(obj, data, params) {
            swal("Erreur", "", data);
        }

    }


    return false;

});


//remove space from string
function rmSpaces(txt) {
    return txt.replace(/\s/g, '');
}

//check if is number
function isNumber(str) {
    var pattern = /^\d+$/;
    return pattern.test(str);  // returns a boolean
}

