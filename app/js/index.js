$(document).ready(function(){
    //COSE CHE NON NECESSITANO DI PHONEGAP
    //...

    //COSE CHE NECESSITANO DI PHONEGAP
    var onready = function onDeviceReady() {
        $('#scan').click(function(){
            cordova.plugins.barcodeScanner.scan(
                function (result) {
                    $('#barcode').val(result.text);
                },
                function (error) {
                    alert("Scanning failed: " + error);
                }
            );
        });
        $('#choose-photo').click(function(){
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY,
                destinationType: Camera.DestinationType.DATA_URL
            });

            function onSuccess(imageData) {
                $('#photo').attr("src","data:image/jpeg;base64," + imageData );
            }
            function onFail(message) {
                alert('Failed because: ' + message);
            }
        });





        $('#share').click(function(){
            console.log($('#barcode').html(),$('#photo').attr("src"));

            window.plugins.socialsharing.share(
                $('#barcode').html(),
                null,
                $('#photo').attr("src"),
                null
            );
        });
    };

    document.addEventListener("deviceready", onready, false);


});