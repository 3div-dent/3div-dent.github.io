// 3사단 의무대대 치과 — 카카오톡 안에서 열면 휴대폰 기본 브라우저(사파리, 크롬 등)로 다시 연다.
// 카카오톡 인앱 브라우저에서는 '내 예약 캘린더에 추가' 같은 기능이 막히기 때문이다.
// 한 번만 시도하고, 넘어가지 않으면 화면 위에 '브라우저로 열기' 띠를 보여 준다.
(function () {
  var ua = navigator.userAgent || '';
  if (!/KAKAOTALK/i.test(ua)) return;
  var KEY = 'dental-open-external';
  function openExternal(url) {
    location.href = 'kakaotalk://web/openExternal?url=' + encodeURIComponent(url || location.href);
  }
  window.dentalOpenExternal = openExternal;
  var tried = false;
  try { tried = sessionStorage.getItem(KEY) === '1'; sessionStorage.setItem(KEY, '1'); } catch (e) {}
  if (!tried) openExternal();
  document.addEventListener('DOMContentLoaded', function () {
    var bar = document.createElement('div');
    bar.className = 'kakao-bar';
    bar.setAttribute('role', 'note');
    bar.innerHTML = '<p>카카오톡 안에서는 캘린더 추가가 안 될 수 있어요.</p>'
      + '<button type="button">' + (/iPhone|iPad|iPod/.test(ua) ? '사파리로 열기' : '브라우저로 열기') + '</button>';
    bar.querySelector('button').addEventListener('click', function () { openExternal(); });
    document.body.insertBefore(bar, document.body.firstChild);
  });
})();
