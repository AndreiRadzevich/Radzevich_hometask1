/**
 * Created by Андрей on 26.06.2019.
 */
var ajaxHandlerScript = "http://fe.it-academy.by/AjaxStringStorage2.php";
var updatePassword;
var stringName = 'RADZEVICH_Encyclo1';
let context = null;
let userName = null;
// let words = [{'title': 'Арбуз', 'url': 'watermelon'},{'title': 'Апельсин', 'url': 'orange'},{'title': 'Груша', 'url': 'pear'},{'title': 'Манго', 'url': 'mango'},{'title': 'Виноград', 'url': 'grape'}];
let words = null;

//AJAX
restoreInfo();

function restoreInfo() {
  $.ajax(
    {
      url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'READ', n: stringName },
      success: loadPage, error: errorHandler,
    }
  );
}

function readReady(callresult) {
  if (callresult.error != undefined)
    alert(callresult.error);
  else if (callresult.result != "") {
    words = JSON.parse(callresult.result);
  }
}

function updateAJAX(arr) {
  $.ajax({
      url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'UPDATE', n: stringName, v: JSON.stringify(arr), p: updatePassword },
      success: updateReady, error: errorHandler
    }
  );
}

function storeInfo() {
  updatePassword = Math.random();
  $.ajax({
      url: ajaxHandlerScript, type: 'POST', cache: false, dataType: 'json',
      data: { f: 'LOCKGET', n: stringName, p: updatePassword },
      success: updateReady, error: errorHandler
    }
  );
}

function updateReady(callresult) {
  if (callresult.error != undefined)
    alert(callresult.error);
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + ' ' + errorStr);
}

// storeInfo();
// updateAJAX(words);

// SPA
function loadPage(callresult) {
  if (callresult.error != undefined)
    alert(callresult.error);
  else if (callresult.result != "") {
    words = JSON.parse(callresult.result);
  }
  window.onhashchange = SwitchToStateFromURLHash;//при изменении закладки(якоря,хэша)
  var SPAStateH = {};
  function SwitchToStateFromURLHash() {
    var URLHash = window.location.hash;//закладка(якорь, хэш)
    var StateJSON = decodeURIComponent(URLHash.substr(1));//получаем якорь
    if (StateJSON != "")
      UpdateToState(StateJSON); // если JSON непустой, читаем из него состояние и отображаем
    else
      UpdateToState('main'); // иначе показываем главную страницу
  }
  function UpdateToState(NewStateH) {
    SPAStateH = NewStateH; // устанавливаем - это теперь текущее состояние
    var pageHTML = "";
    switch (SPAStateH) {
      case 'main':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div><h1>Энциклопедия</h1>";
        pageHTML += "<input type='text' value='Перейти к оглавлению' onclick='SwitchToListPage()'>";
        pageHTML += "</div></div>"
        break;
      case 'list':
        pageHTML += "<div class='wrapper'>"
        pageHTML += setList(words);
        pageHTML += "</div>"
        break;
      case 'watermelon':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div class='left'>"
        pageHTML += setInput(words);
        pageHTML += "</div><div class='right'>"
        pageHTML += "<h1>Арбуз</h1><span>Однолетнее растение из сем. тыквенных с большими шарообразными сладкими плодами, а также самый плод.</span>"
        pageHTML += "</div>"
        break;
      case 'orange':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div class='left'>"
        pageHTML += setInput(words);
        pageHTML += "</div><div class='right'>"
        pageHTML += "<h1>Апельсин</h1><span>самая распространённая цитрусовая культура во всех тропических и субтропических областях мира</span>"
        pageHTML += "</div>"
        break;
      case 'pear':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div class='left'>"
        pageHTML += setInput(words);
        pageHTML += "</div><div class='right'>"
        pageHTML += "<h1>Груша</h1><span>род плодовых и декоративных деревьев и кустарников семейства Розовые.</span>"
        pageHTML += "</div>"
        break;
      case 'mango':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div class='left'>"
        pageHTML += setInput(words);
        pageHTML += "</div><div class='right'>"
        pageHTML += "<h1>Манго</h1><span>В 2009 году в сельском хозяйстве по всему миру выращивается больше 300 сортов этого вида.</span>"
        pageHTML += "</div>"
        break;
      case 'grape':
        pageHTML += "<div class='wrapper'>"
        pageHTML += "<div class='left'>"
        pageHTML += setInput(words);
        pageHTML += "</div><div class='right'>"
        pageHTML += "<h1>Виноград</h1><span>На территории Грузии найдены самые ранние археологические свидетельства развитой винодельческой культуры</span>"
        pageHTML += "</div>"
        break;
    }
    document.getElementById('ipage').innerHTML = pageHTML;
  }
  SwitchToStateFromURLHash();
}

function SwitchToMainPage() {
  SwitchToState({ pagename: 'main' });
}

function SwitchToListPage() {
  SwitchToState({ pagename: 'list' });
}

function SwitchToContentPage(url) {
  location.hash = encodeURIComponent(url);
}

function SwitchToState(NewStateH) {
  location.hash = encodeURIComponent(NewStateH.pagename);
}
// сортируем массив и заполняем оглавление
function setList(arrWords) {
  arrWords.sort(function (a, b) {
    if (a['title'] > b['title']) {
      return 1;
    }
    if (a['title'] < b['title']) {
      return -1;
    }
    return 0;
  });
  var pageStr = '';
  for (let i = 0; i < arrWords.length; i++) {
    if (i == 0) {
      pageStr += '<div class="container"><h2>' + arrWords[i]['title'].charAt(0) + '</h2>' + '<br>';
    } else if (arrWords[i]['title'].charAt(0) !== arrWords[i - 1]['title'].charAt(0)) {
      if (i !== 0) { pageStr += '</div>' };
      pageStr += '<div class="container"><h2>' + arrWords[i]['title'].charAt(0) + '</h2>' + '<br>';
    };
    pageStr += '<input type=text value="' + arrWords[i]['title'] +
    '" onclick="SwitchToContentPage(\'' + arrWords[i]['url'] + '\')"> <br>';
  }
  return pageStr;
}
// заполняем левую колонку имеющимися пунктами
function setInput(arrWords) {
  arrWords.sort(function (a, b) {
    if (a['title'] > b['title']) {
      return 1;
    }
    if (a['title'] < b['title']) {
      return -1;
    }
    return 0;
  });
  var pageInp = '';
  for (let i = 0; i < arrWords.length; i++) {
    pageInp += '<input type=text value="' + arrWords[i]['title'] +
    '" onclick="SwitchToContentPage(\'' + arrWords[i]['url'] + '\')"> <br>';
  }
  return pageInp;
}

