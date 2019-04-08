'use strict';

var queryUrl = 'https://api.forismatic.com/api/1.0/?method=getQuote&format=jsonp&lang=en&jsonp=appendCanvas'; // API цитаток

var unsplashApi = 'https://api.unsplash.com/photos/random/?client_id=0de53870185c5f8edd7a7ba024309a13297014a568200e8a937005497890e848&count=4'; // API картиночек

var testQuote = ''; // переменная для цитаток

var getQuote = document.createElement('script');  // создаём скрипт-элемент и помещаем его в head
getQuote.src = queryUrl;
document.getElementsByTagName("head")[0].appendChild(getQuote);

var getCanvas = document.createElement('canvas'); //создаём холст
getCanvas.id = 'collageCanvas';
getCanvas.style.display = 'block';
getCanvas.style.margin = '0 auto';
document.body.appendChild(getCanvas);

var button = document.createElement('a'); // создаём кнопку
button.id = 'downloadButton';
button.style.display = 'block';
button.style.cursor = 'pointer';
button.style.width = '200px';
button.style.padding = '20px';
button.style.margin = '20px auto';
button.style.border = '6px double black'
button.innerHTML = 'Download collage';
button.textDecoration = 'none';

var appendCanvas = function renderQuote(response) {
    testQuote = response.quoteText;

    var collageCanvas = document.getElementById("collageCanvas");
    var ctx = collageCanvas.getContext('2d'); // Контекст
    collageCanvas.height = 1400; //задаём размеры и стили, а так же фильтр, уменьшающий яркость холста на 50%
    collageCanvas.width = 1400;
    ctx.font = "30px Arial";
    ctx.fillStyle = 'white';
    ctx.textAlign = "center";
    ctx.filter = 'brightness(50%)';
    var lineHeight = 45; //высота строки для цитаток

    var pic1 = new Image(); // Создаём изображения
    var pic2 = new Image();
    var pic3 = new Image();
    var pic4 = new Image();
    pic1.crossOrigin = 'Anonymous';
pic2.crossOrigin = 'Anonymous';
pic3.crossOrigin = 'Anonymous';
pic4.crossOrigin = 'Anonymous';
    var slicedQuote = testQuote.split(" "); //Шинкуем цитату по словам

    var counter = 4; //Счётчик для переноса строки
    var i = 0;

    $.ajax({ //jQuery AJAX-запрос, он нам даёт json, в котором по ключу urls.regular лежат ссылки на пикчи.
        type: 'GET',
        url: unsplashApi,
        dataType: 'json',
        success: function (data) {
            var img = data;
            pic1.src = img[0].urls.regular;
            pic2.src = img[1].urls.regular;
            pic3.src = img[2].urls.regular;
            pic4.src = img[3].urls.regular;
        }
    });

    //Ловим момент, когда прогрузятся все четыре пикчи и только потом их рисовать вместе с текстом. Для этого есть счётчик.
    pic1.addEventListener('load', function () {
        var line = 0;
        var quoteLine = ""; //создаём новую строку
        i++;
        if (i === counter) { //если все четыре изображения загружены
            ctx.drawImage(pic1, 0, 0); // ровно рисуем картинки
            ctx.drawImage(pic2, 700, 0);
            ctx.drawImage(pic3, 0, 700);
            ctx.drawImage(pic4, 700, 700);
            ctx.filter = 'brightness(100%)'; //чтобы текст не терялся на фоне, возвращаем ему былую яркость, перед тем, как напечатать
            for (var j = 0; j < slicedQuote.length; j += 4) {
                quoteLine = "";
                for (var k = j; k < j + 4; k++) {
                    if (slicedQuote[k] !== undefined) { //чтобы не печатать undefined, когда перепрыгиваем через конец массива
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width / 2, collageCanvas.height * 2 / 3 + lineHeight * line); //сложная математика для печатания строк
                line++;
            }
            document.body.appendChild(button); //прикрепляем кнопку снизу, когда всё прорисовалось
            getCanvas.style.border = '5px solid black';
        }
    }, false);

    pic2.addEventListener('load', function () {
        var line = 0;
        var quoteLine = "";
        i++;
        if (i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 700, 0);
            ctx.drawImage(pic3, 0, 700);
            ctx.drawImage(pic4, 700, 700);
            ctx.filter = 'brightness(100%)';
            for (var j = 0; j < slicedQuote.length; j += 4) {
                quoteLine = "";
                for (var k = j; k < j + 4; k++) {
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width / 2, collageCanvas.height * 2 / 3 + lineHeight * line);
                line++;
            }
            document.body.appendChild(button);
            getCanvas.style.border = '5px solid black';
        }
    }, false);

    pic3.addEventListener('load', function () {
        var line = 0;
        var quoteLine = "";
        i++;
        if (i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 700, 0);
            ctx.drawImage(pic3, 0, 700);
            ctx.drawImage(pic4, 700, 700);
            ctx.filter = 'brightness(100%)';
            for (var j = 0; j < slicedQuote.length; j += 4) {
                quoteLine = "";
                for (var k = j; k < j + 4; k++) {
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width / 2, collageCanvas.height * 2 / 3 + lineHeight * line);
                line++;
            }
            document.body.appendChild(button);
            getCanvas.style.border = '5px solid black';
        }
    }, false);

    pic4.addEventListener('load', function () {
        var line = 0;
        var quoteLine = "";
        i++;
        if (i === counter) {
            ctx.drawImage(pic1, 0, 0);
            ctx.drawImage(pic2, 700, 0);
            ctx.drawImage(pic3, 0, 700);
            ctx.drawImage(pic4, 700, 700);
            ctx.filter = 'brightness(100%)';
            for (var j = 0; j < slicedQuote.length; j += 4) {
                quoteLine = "";
                for (var k = j; k < j + 4; k++) {
                    if (slicedQuote[k] !== undefined) {
                        quoteLine = quoteLine + " " + slicedQuote[k];
                    }
                }
                ctx.fillText(quoteLine, collageCanvas.width / 2, collageCanvas.height * 2 / 3 + lineHeight * line);
                line++;
            }
            document.body.appendChild(button);
            getCanvas.style.border = '5px solid black';
        }
    }, false);

    button.addEventListener('click', function (event) {
        button.href = collageCanvas.toDataURL("image/jpeg",1.0);
        button.download = "Collage.png";
    }, false);
};
