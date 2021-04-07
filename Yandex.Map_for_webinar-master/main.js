ymaps.ready(init);
var myMap;
var myCordinats =[]
var placemarks = []

    geoObjects= [];

function init() {
    var myMap = new ymaps.Map('map', {
        center: [55.75554290, 37.62483958],
        zoom: 12,
    });
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
            var coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'',
                contentBody:[
                '<div class=coment> </div>'+
                '<div class="review-list"></div>'+
                '<div class="form" data-role="review-form">'+
                '<h3>Отзыв:</h3>'+
                '<div class="field" id="inp">'+
                '<input data-role="review-name" type="text" placeholder="Укажите ваше имя">'+
                '</div>'+
                '<div class="field" id="inp">'+
                '<input data-role="review-name" type="text" placeholder="Укажите место">'+
                '</div>'+
                '<div class="field" id="inp">'+
                '<textarea data-role="review-name" type="text" placeholder="Оставьте отзыв" rows="5"></textarea>'+
                '</div>'+

                '<button class="btn" data-role="review-add">Добавить</button>'+
                '<span class="form-error"></span>'] 
            });
        }
        else {
            function getCordinats(){
                var coords = e.get('coords');
                return coords;
                [
                    {coodinate:4325, name:'author name', review:'text review'},
                    {coodinate:789, name:'author name 2', review:'text review 2'},
                    {coodinate:789, name:'author name 3', review:'text review 3'},
                   ]
            }
            return coords
        };
        console.log(getCordinats())
        myMap.balloon.close();
            /*var inp = document.getElementById("inp");
            var btn = document.querySelector(".btn");
            var arr = [];

            btn.addEventListener('click', function() {
                var valInp = inp.value;
                arr.push(valInp);
                console.log(arr);
                inp.value = "";
              })*/


        
        function getCordinats(){
            var coords = e.get('coords');
            [
                {coodinate:4325, name:'author name', review:'text review'},
                {coodinate:789, name:'author name 2', review:'text review 2'},
                {coodinate:789, name:'author name 3', review:'text review 3'},
               ]
        }
    });
    for (var i = 0; i < placemarks.length; i++) {
            geoObjects[i] = new ymaps.Placemark([placemarks[i].latitude, placemarks[i].longitude],
            {
                hintContent: placemarks[i].hintContent,
                balloonContent: placemarks[i].balloonContent.join('')
            });
            
    }

    var clusterer = new ymaps.Clusterer({
        
    });

    map.geoObjects.add(clusterer);
    clusterer.add(geoObjects);
}