// preload.js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld(
  // Namespace inside the `Window` object where you want to extend properties.
  'api',
  // Your properties.
  { hello: 'world' }
)

const { ipcRenderer } = require('electron')
const getName =  require('./appIds.js').getName;

ipcRenderer.on('asynchronous-reply', (event, arg) => {

  let container = document.querySelector('.realms')
  let html = '';

  let x = JSON.parse(arg);

  document.querySelector('.number').innerText =  Object.keys(x).length;


  
  let apps = [];


  if(Object.keys(x).length===0)
  {
    return container.innerHTML='<p class="empty">Nobody is connected :(</p>';
  }
  for(key in x)
  {
    let line = x[key];
    if(apps.indexOf(line.appID)===-1)
    {
      apps.push(line.appID);
    }
  }

  apps.forEach((appID) => {
    let appName = getName(appID);

    html += '<div class="realm"><ul class="list">';
    html += '<div class="name">'+appName+'</div>';

    for(key in x)
    {
      let line = x[key];
      let currentDate = new Date().getTime() / 1000;
      let online = currentDate < line.timeout ? "":"offline";
      let visible = currentDate < line.hide;
      let onlineStr = currentDate < line.timeout ? "":"(Disconnected Recently)";
      if(line.appID == appID && visible)
      {
      html+=`<li class="${online}">
      <div class="icon">
        <div class="image"></div>
        <div class="content">
          <div class="user">${line.name} <span class="onlinestr">${onlineStr}</span></div>
          <div class="realm">${appName}</div>
        </div>
      </div>
      <!--
      <div class="last_online">Last online: ${line.timeout}</div>
      -->
    </li>`;
      }
    }
    html += '</div></ul>';
  });
  container.innerHTML=html;


})

window.setInterval(() => {
  ipcRenderer.send('asynchronous-message', 'update')
}, 20000)

window.setInterval(() => {
  ipcRenderer.send('asynchronous-message', 'get')
}, 2000)


ipcRenderer.send('asynchronous-message', 'update')
