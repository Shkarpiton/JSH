ymaps.ready(init);
function init() {
var myMap;

/*var placemarks = [];*/
var placemarks = localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')) : [];
var coords = [];
var test= [];


document.addEventListener('click', function (e) {
    if (e.target.classList.contains("btn") ) {
        
        console.log(coords);
        var name = document.querySelector(
            '.ima'
        );
        var place = document.querySelector(
            '.mets'
        );
        var reviews = document.querySelector(
            '.revs'
        );
        console.log(placemarks)
        placemarks.push({
            lat: coords[0],
            lang: coords[1],
            name: name.value,
            place: place.value,
            reviews: reviews.value,
            });
            localStorage.setItem('data',JSON.stringify(placemarks));
            myMap.balloon.close();
            
            for(var i = 0;  i < placemarks.length; i++) {
                let placemark = new ymaps.Placemark([placemarks[i].lat, placemarks[i].lang],{
                    
                });
                
                test.push(placemark);
                clusterer.add(test);
            myMap.geoObjects.add(clusterer)
        
            }

            
    }
  });

  
  console.log(placemarks);

    var myMap = new ymaps.Map('map', {
        center: [55.75554290, 37.62483958],
        zoom: 12,
    });
    
    var customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>' 
    );
      var clusterer = new ymaps.Clusterer({
        preset: 'islands#invertedBlueClusterIcons',
        gridSize: 80,
        clusterDisableClickZoom: true,
        groupByCoordinates: false,
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterDisableClickZoom: true,
        clusterHideIconOnBalloonOpen: false,
        geoObjectHideIconOnBalloonOpen: false,
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 300,
        clusterBalloonContentLayoutHeight: 300,
        clusterBalloonPagerSize: 5,
    });
    
    for(var i = 0;  i < placemarks.length; i++) {
        let placemark = new ymaps.Placemark([placemarks[i].lat, placemarks[i].lang],{
            balloonContentBody: getContentBody(i),
        });
        
        test.push(placemark);
        clusterer.add(test);
    myMap.geoObjects.add(clusterer)

    }
    myMap.geoObjects.events.add('click',function(e){
        coords = e.get('coords')
        myMap.balloon.open(coords)
        
    })
    
    
    myMap.events.add('click', function (e) {
        if (!myMap.balloon.isOpen()) {
             coords = e.get('coords');
            myMap.balloon.open(coords, {
                contentHeader:'',
                contentBody:[
                '<div class=coment> </div>'+
                '<div class="form" data-role="review-form">'+
                '<h3>Отзыв:</h3>'+
                '<div  id="inp">'+
                '<input class="ima" data-role="review-name" type="text" placeholder="Укажите ваше имя">'+
                '</div>'+
                '<div  id="inp">'+
                '<input class="mets" data-role="review-name" type="text" placeholder="Укажите место">'+
                '</div>'+
                '<div  id="inp">'+
                '<textarea class="revs" data-role="review-name" type="text" placeholder="Оставьте отзыв" rows="5"></textarea>'+
                '</div>'+
                '<button class="btn" data-role="review-add">Добавить</button>'+
                '<span class="form-error"></span>'] 
            });
        }});
   
    function getContentBody(num) {
        
        return [
            '<br>' +
            `<h3>Имя:</h3>` +
            `${placemarks[num].name}` +
            '<h3>Место:</h3>' +
            `${placemarks[num].place}` +
            '<h3>Отзыв:</h3>' +
            `${placemarks[num].reviews}`+
            '<div class=coment> </div>'+
                '<div class="form" data-role="review-form">'+
                '<h3>Отзыв:</h3>'+
                '<div  id="inp">'+
                '<input class="ima" data-role="review-name" type="text" placeholder="Укажите ваше имя">'+
                '</div>'+
                '<div  id="inp">'+
                '<input class="mets" data-role="review-name" type="text" placeholder="Укажите место">'+
                '</div>'+
                '<div  id="inp">'+
                '<textarea class="revs" data-role="review-name" type="text" placeholder="Оставьте отзыв" rows="5"></textarea>'+
                '</div>'+
                '<button class="btn" data-role="review-add">Добавить</button>'+
                '<span class="form-error"></span>'
        ]
        
    }
    myMap.balloon.close();

}

    
    

