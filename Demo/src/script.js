/// <reference path="./WebView_TypeDefinition.js" /> <!-- Referencia al archivo original -->
'use strict';

/** @type {IWebView} */
const WV = window.WebView.Sync;

/** @type {IWebView} */
const AWV = window.WebView.Async;

// Load all plugins Demo/plugins
/** @type {string[]} */
const plugins = WV.LoadPluginsFromFolder();

//WV.Browser.OpenDevTools();

WV.Window.AddEventListener("StateChanged", (n, t) => {
    console.log("StateChanged: " + WV.Window.StateText);
});

WV.Window.AddEventListener("Visible", e => {
    console.log("visible: " + e);
});

WV.Window.Rect.Width = 869;
WV.Window.Rect.Height = 610;

WV.Window.Title = "WV.js"

// Plugins instances
const TaskbarManager  = WV.NewPluginInstance("TaskbarController");
const SysMenu = WV.NewPluginInstance("SysMenuController");


TaskbarManager.Icon = "Bombilla.ico" // .../src/Ver.js.ico
TaskbarManager.IconSmall = "iconoo.ico"
TaskbarManager.Tooltip = "Ver.js";

for (let index = 0; index < 7; index++) {
    SysMenu.AddItem("Item " + index, function(title, id){
        console.log(title, id);
    }, true);
}
    

//#region HELPERS

const MINIMIZED = 0;
const RESTORED = 1;
const MAXIMIZED = 2;

// Ancho de las esquinas de la ventana para detectar Resize por Raton
const CORNER_SIZE = 6;

// Ancho de los bordes de la ventana para detectar Resize por Raton
const BORDER_SIZE = 2;

function GetElementById(id){
    return window.document.getElementById(id);
}


/**
 * Función para comprobar colisión del raton con los bordes de la ventana
 * @param {*} x 
 * @param {*} y 
 * @returns 
 */
function hitTest(x, y){
    const InnerWidth = window.innerWidth;
    const InnerHeight = window.innerHeight;

    // Cuando se esté Maximizado, NO detectar colisión con bordes
    if(WV.Window.State === MAXIMIZED)
        return 1;

    // TOP-LEFT
    if (x <= CORNER_SIZE && y <= CORNER_SIZE) 
        return 13; 

    // BOTTOM-LEFT
    if (x <= CORNER_SIZE && y >= InnerHeight - CORNER_SIZE - 1) 
        return 16; 

    // TOP-RIGHT
    if (x >= InnerWidth - CORNER_SIZE - 1 && y <= CORNER_SIZE) 
        return 14; 

    // BOTTOM-RIGHT
    if (x >= InnerWidth - CORNER_SIZE - 1 && y >= InnerHeight - CORNER_SIZE - 1) 
        return 17; 

    // LEFT
    if (x <= BORDER_SIZE) 
        return 10;

    // RIGHT
    if (x >= InnerWidth - BORDER_SIZE - 1) 
        return 11;

    // TOP
    if (y <= BORDER_SIZE) 
        return 12; 

    // BOTTOM
    if (y >= InnerHeight - BORDER_SIZE - 1) 
        return 15; 

    // CLIENT
    return 1; 
}

//#endregion

//#region WEBVIEW

function FireWV(WV){
    /** @type {HTMLSpanElement} */
    let UID = GetElementById("UID");
    /** @type {HTMLSpanElement} */
    let Name = GetElementById("Name");
    /** @type {HTMLSpanElement} */
    let IsMain = GetElementById("IsMain");
    /** @type {HTMLSpanElement} */
    let PluginsName = GetElementById("PluginsName");

    UID.textContent = WV.UID;
    Name.textContent = WV.Name;
    IsMain.textContent = WV.IsMain;
    PluginsName.textContent = WV.PluginsName;
}

//#endregion

//#region WINDOW

/**
 * @param {IWindow} WVWin 
 */
function FireWVWin(WVWin){
    /** @type {HTMLDivElement} */
    let titleWindow = GetElementById("titleWindow");
    /** @type {HTMLInputElement} */
    let wvtitle = GetElementById("wvtitle");

    titleWindow.textContent = WVWin.Title;
    wvtitle.value = WVWin.Title;

    wvtitle.oninput = e => {
        titleWindow.textContent = wvtitle.value;
        WVWin.Title = wvtitle.value;
    }

    /** @type {HTMLInputElement} */
    let TopMost = GetElementById("TopMost");
    
    TopMost.checked = WVWin.TopMost;
    TopMost.onchange = e => {
        WVWin.TopMost = e.target.checked;
    }

    /** @type {HTMLInputElement} */
    let Enabled = GetElementById("Enabled");
    
    Enabled.checked = WVWin.Enabled;
    Enabled.onchange = e => {
        WVWin.Enabled = e.target.checked;
    }

    WVWin.OnEnabled = isEnable => {
        if(isEnable)
            return;

        setTimeout(x =>{
            Enabled.checked = true;
            WVWin.Enabled = true;
        }, 3000);
    }

    /** @type {HTMLSpanElement} */
    let IsVisible = GetElementById("IsVisible");

    WVWin.OnVisible = visible => {
        IsVisible.textContent = visible;
    }

    WVWin.OnVisible(WVWin.IsVisible);

    /** @type {HTMLInputElement} */
    let PreventClose = GetElementById("PreventClose");
    
    PreventClose.checked = WVWin.PreventClose;
    PreventClose.onchange = e => {
        WVWin.PreventClose = e.target.checked;
    }

    // Si PreventClose == true, se dispara el evento OnClose
    WVWin.OnClose = function(){
    
        let exit = window.confirm("¿Do you want to exit?");
    
        if(!exit)
            return;
    
        WVWin.PreventClose = false;
        PreventClose.checked = false;
        WVWin.Close();
    }

    /** @type {HTMLInputElement} */
    let AllowSnap = GetElementById("AllowSnap");

    AllowSnap.checked = WVWin.AllowSnap;

    AllowSnap.onchange = e => {
        WVWin.AllowSnap = e.target.checked;
    }

    /** @type {HTMLSpanElement} */
    let IsActive = GetElementById("IsActive");
    /** @type {HTMLSpanElement} */
    let IsActiveFoot = GetElementById("IsActiveFoot");

    
    // Evento de WebView, para disparar cuando se active/desactive la mentana
    // Enfocada/Desenfocada la ventana
    /*
    WVWin.OnActivated = function(isActive){
        document.documentElement.style.opacity = isActive? 1 : 0.85;
        IsActive.textContent = isActive;
        IsActiveFoot.textContent = isActive;
    }
    
    WVWin.OnActivated(WVWin.IsActive);

    */
    let fn = function(isActive){
        document.documentElement.style.opacity = isActive? 1 : 0.85;
        IsActive.textContent = isActive;
        IsActiveFoot.textContent = isActive;
    }

    WVWin.AddEventListener("Activated", fn);

    fn(WVWin.IsActive);

    /** @type {HTMLSpanElement} */
    let State = GetElementById("State");
    /** @type {HTMLSpanElement} */
    let StateFoot = GetElementById("StateFoot");

    /** @type {HTMLButtonElement} */
    let btnMinimize = GetElementById("btnMinimize");
    /** @type {HTMLButtonElement} */
    let btnMaximize = GetElementById("btnMaximize");
    /** @type {HTMLButtonElement} */
    let btnRestore = GetElementById("btnRestore");
    /** @type {HTMLButtonElement} */
    let btnClose = GetElementById("btnClose");

    WVWin.OnStateChanged = function(value, text){
        switch (value) {
            case MINIMIZED:
                //text = "Minimized"
                break;
        
            case RESTORED:
                //text = "Restored"
                btnRestore.style.display = 'none';
                btnMaximize.style.display = '';
                break;
    
            case MAXIMIZED:
                //text = "Maximized"
                btnRestore.style.display = '';
                btnMaximize.style.display = 'none';
                break;
    
            default:
                break;
        }
    
        State.textContent = text;
        StateFoot.textContent = text;
    }
    
    WVWin.OnStateChanged(WV.Window.State, WV.Window.StateText);

    btnMinimize.onclick = e => WV.Window.Minimize();
    btnMaximize.onclick = e => WV.Window.Maximize();
    btnRestore.onclick = e => WV.Window.Restore();
    btnClose.onclick = e => WV.Window.Close();

    // NO permitir el Drag() con los botones de Minimizar, Maximizar, etc
    // Evita que se propague el evento al contenedor padre <div class="title-bar">
    btnMinimize.onmousedown = e => e.stopPropagation();
    btnMaximize.onmousedown = e => e.stopPropagation();
    btnRestore.onmousedown = e => e.stopPropagation();
    btnClose.onmousedown = e => e.stopPropagation();
}

/**
 * @param {IWindow} WVWin 
 */
function FireRect(WVWin){
    /** @type {IRect} */
    const Rect = WVWin.Rect;

    /** @type {HTMLInputElement} */
    let X = GetElementById("X");
    /** @type {HTMLInputElement} */
    let Y = GetElementById("Y");
    /** @type {HTMLSpanElement} */
    let PositionFoot = GetElementById("PositionFoot");

    X.value = Rect.X;
    Y.value = Rect.Y;

    X.oninput = e => {
        Rect.X = e.target.value;
    }

    Y.oninput = e => {
        Rect.Y = e.target.value;
    }

    /*
    WVWin.OnPositionChanged = function(x, y){
        PositionFoot.textContent = x + "x" + y
        X.value = x;
        Y.value = y;
    }
    
    WVWin.OnPositionChanged(Rect.X, Rect.Y);
*/
    const pfn = function(x, y){
        PositionFoot.textContent = x + "x" + y
        X.value = x;
        Y.value = y;
    };

    WVWin.AddEventListener("PositionChanged", pfn);

    pfn(Rect.X, Rect.Y);

    /** @type {HTMLInputElement} */
    let MinWidth = GetElementById("MinWidth");
    /** @type {HTMLInputElement} */
    let MinHeight = GetElementById("MinHeight");
    /** @type {HTMLInputElement} */
    let Width = GetElementById("Width");
    /** @type {HTMLInputElement} */
    let Height = GetElementById("Height");
    /** @type {HTMLInputElement} */
    let MaxWidth = GetElementById("MaxWidth");
    /** @type {HTMLInputElement} */
    let MaxHeight = GetElementById("MaxHeight");

    MinWidth.value = Rect.MinWidth;
    MinHeight.value = Rect.MinHeight;
    Width.value = Rect.Width;
    Height.value = Rect.Height;
    MaxWidth.value = Rect.MaxWidth;
    MaxHeight.value = Rect.MaxHeight;

    MinWidth.oninput = e => {
        Rect.MinWidth = e.target.value;
        let value = Rect.MinWidth;
        e.target.value = value;
        Width.min = value;

        if(value > Width.value)
            Width.value = value;

        if(value > MaxWidth.value)
            MaxWidth.value = value;
    }

    MinHeight.oninput = e => {
        Rect.MinHeight = e.target.value;
        let value = Rect.MinHeight;
        e.target.value = value;
        Height.min = value;
        if(value > Height.value)
            Height.value = value;

        if(value > MaxHeight.value)
            MaxHeight.value = value;
    }

    Width.oninput = e => {
        Rect.Width = e.target.value;
        e.target.value = Rect.Width;
    }

    Height.oninput = e => {
        Rect.Height = e.target.value;
        e.target.value = Rect.Height;
    }

    MaxWidth.oninput = e => {
        Rect.MaxWidth = e.target.value;
        let value = Rect.MaxWidth;
        e.target.value = value;
        Width.max = value;
        if(value < Width.value)
            Width.value = value;
    }

    MaxHeight.oninput = e => {
        Rect.MaxHeight = e.target.value;
        let value = Rect.MaxHeight;
        e.target.value = value;
        Height.max = value;
        if(value < Height.value)
            Height.value = value;
    }

    
    /** @type {HTMLSpanElement} */
    let SizeFoot = GetElementById("SizeFoot");

    /*
    window.onresize = function(){
        SizeFoot.textContent = window.innerWidth + 'x' + window.innerHeight;
        Width.value = window.innerWidth;
        Height.value = window.innerHeight;
    }
    
    window.onresize();
    */
   /*
    WVWin.OnSizeChanged = function(width, height){
        SizeFoot.textContent = width + 'x' + height;
        Width.value = width;
        Height.value = height;
    }

    WVWin.OnSizeChanged(window.innerWidth, window.innerHeight);
    */

    const sfn = function(width, height){
        SizeFoot.textContent = width + 'x' + height;
        Width.value = width;
        Height.value = height;
    };

    WVWin.AddEventListener("SizeChanged", sfn);

    sfn(window.innerWidth, window.innerHeight);
}

//#endregion 

//#region Browser

/**
 * @param {IBrowser} Browser 
 */
function FireBrowser(Browser){
    /** @type {HTMLAnchorElement} */
    let Uri = GetElementById("Uri");
    /** @type {HTMLSpanElement} */
    let CanGoBack = GetElementById("CanGoBack");
    /** @type {HTMLSpanElement} */
    let CanGoForward = GetElementById("CanGoForward");

    Uri.textContent = Browser.Uri;
    Uri.href = Browser.Uri;
    CanGoBack.textContent = Browser.CanGoBack;
    CanGoForward.textContent = Browser.CanGoForward;

    /** @type {HTMLSpanElement} */
    let IsPlayingAudio = GetElementById("IsPlayingAudio");
    /** @type {HTMLSpanElement} */
    let IsPlayingAudioFoot = GetElementById("IsPlayingAudioFoot");

    WV.Browser.OnPlayingAudio = function(isPlayingAudio){
        IsPlayingAudio.textContent = isPlayingAudio;
        IsPlayingAudioFoot.textContent = isPlayingAudio;
    }
    
    Browser.OnPlayingAudio(Browser.IsPlayingAudio)

    /** @type {HTMLInputElement} */
    let HotReload = GetElementById("HotReload");

    HotReload.checked = Browser.HotReload;

    HotReload.onchange = e => {
        Browser.HotReload = e.target.checked;
    }

    /** @type {HTMLInputElement} */
    let AcceleratorKeys = GetElementById("AcceleratorKeys");

    AcceleratorKeys.checked = Browser.AcceleratorKeys;

    AcceleratorKeys.onchange = e => {
        Browser.AcceleratorKeys = e.target.checked;
    }

    /** @type {HTMLInputElement} */
    let SwipeNavigation = GetElementById("SwipeNavigation");

    SwipeNavigation.checked = Browser.SwipeNavigation;

    SwipeNavigation.onchange = e => {
        Browser.SwipeNavigation = e.target.checked;
    }

    /** @type {HTMLInputElement} */
    let ResetWebViewOnReload = GetElementById("ResetWebViewOnReload");

    ResetWebViewOnReload.checked = Browser.ResetWebViewOnReload;

    ResetWebViewOnReload.onchange = e => {
        Browser.ResetWebViewOnReload = e.target.checked;
    }

    /** @type {HTMLInputElement} */
    let Muted = GetElementById("Muted");
    /** @type {HTMLSpanElement} */
    let MutedFoot = GetElementById("MutedFoot");

    Muted.onchange = e => {
        Browser.Muted = e.target.checked;
        MutedFoot.textContent = e.target.checked;
    }

    Browser.OnMuted = function(isMuted){
        Muted.checked = isMuted;
        MutedFoot.textContent = isMuted
    }
    
    Browser.OnMuted(Browser.Muted);

    /** @type {HTMLInputElement} */
    let ZoomFactor = GetElementById("ZoomFactor");
    let minZoom = Browser.MinZoomFactor;
    let maxZoom = Browser.MaxZoomFactor;

    ZoomFactor.min = minZoom;
    ZoomFactor.max = maxZoom;
    ZoomFactor.step = 0.1;

    document.getElementById("minZoomFactor").innerText = minZoom;
    document.getElementById("maxZoomFactor").innerText = maxZoom;

    ZoomFactor.oninput = e => {
        Browser.ZoomFactor = parseFloat(e.target.value);
    }

    Browser.OnZoomFactorChanged = function(factor){
        ZoomFactor.value = factor;
    }

    Browser.OnZoomFactorChanged(Browser.ZoomFactor);

    /** @type {HTMLInputElement} */
    let OpenDevTools = GetElementById("OpenDevTools");
    OpenDevTools.onclick = e => {
        Browser.OpenDevTools();
    }

    /** @type {HTMLInputElement} */
    let Reload = GetElementById("Reload");
    Reload.onclick = e => {
        Browser.HardReload();
    }
}

/**
 * 
 * @param {IBrowser} Browser 
 */
function FireContextMenu(Browser){

    const ContextMenu = Browser.ContextMenu;

    // No motrar los items nativos
    ContextMenu.ShowNativeItems =  false;

    let item1 = ContextMenu.CreateContextItem("Command 1", "Command", "iconoo.ico", function(kind, checked){
        console.log("Command 1 clickeado")
        alert("Command 1 clicked")
    });

    let item2 = ContextMenu.CreateContextItem("CheckBox 1", "CheckBox", null, function(kind, checked){
        console.log("CheckBox 1 checked " + checked);
    });

    let separator = ContextMenu.CreateContextItemSeparator();

    let submenu = ContextMenu.CreateContextItem("Submenu 1", "Submenu");

    let radio1 = ContextMenu.CreateContextItem("Radio 1", "Radio", null, function(kind, checked){
        if(!checked)
            radio1.Checked = true;

        radio2.Checked = false;
        radio3.Checked = false;
    });

    let radio2 = ContextMenu.CreateContextItem("Radio 2", "Radio", null, function(kind, checked){
        if(!checked)
            radio2.Checked = true;

        radio1.Checked = false;
        radio3.Checked = false;
    });

    let radio3 = ContextMenu.CreateContextItem("Radio 3", "Radio", null, function(kind, checked){
        if(!checked)
            radio3.Checked = true;
        
        radio1.Checked = false;
        radio2.Checked = false;
    });

    submenu.AddItem(radio1);
    submenu.AddItem(radio2);
    submenu.AddItem(radio3);

    ContextMenu.AddItem(item1);
    ContextMenu.AddItem(item2);
    ContextMenu.AddItem(separator);
    ContextMenu.AddItem(submenu);
}

//#endregion 


// Cuando se termina de cargar todo (scripts, imagenes, etc) se dispara este evento
window.onload = function(){

    FireWV(WV);
    FireWVWin(WV.Window);
    FireRect(WV.Window);
    FireBrowser(WV.Browser);
    FireContextMenu(WV.Browser);

    WV.Window.Show();

    /** @type {HTMLDivElement} */
    const TitleBar = document.querySelector('.title-bar');

    // Evento para controlar el redimensionamiento de la pantalla mediante los bordes de la misma
    // Resizing handler
    window.onmousedown = e => {

        if(WV.Window.State == 2)
            return;

        if(e.button !== 0)
            return;

        const x = e.clientX;
        const y = e.clientY;
        const hit = hitTest(x, y);

        switch (hit) {
            case 13:
                WV.Window.ResizeTopLeft();
                break;
            case 16:
                WV.Window.ResizeBottomLeft();
                break;
            case 14:
                WV.Window.ResizeTopRight();
                break;
            case 17:
                WV.Window.ResizeBottomRight();
                break;

            case 10:
                WV.Window.ResizeLeft();
                break;      
            case 11:
                WV.Window.ResizeRight();
                break;
            case 12:
                WV.Window.ResizeTop();
                break;
            case 15:
                WV.Window.ResizeBottom();
                break;
        
            default:
                break;
        }
    }

    // Evento para controlar el arrastre de la ventana
    // Drag handler
    TitleBar.onmousedown = e => {
     
        if(e.button == 2)
            return SysMenu.ShowMenu(e.clientX, e.clientY)

        // Si es diferente del click izquierdo
        if (e.button !== 0)
            return true;

        // Doble click barra de arrastre
        if (e.detail == 2) {

            switch (WV.Window.State) {

                case MAXIMIZED:
                    WV.Window.Restore();
                    break;
                case RESTORED:
                    WV.Window.Maximize();
                    break;
                default:
                    return;
            }   

            e.preventDefault();
            e.stopImmediatePropagation();
            return;
        }

        // Comprobar las esquinas de la barra de arrastre, y que se
        // Redimensione la ventana en lugar de arrastrar
        if(hitTest(e.clientX, e.clientY) > 9)
            return;

        WV.Window.Drag();
    }

    //Para cambiar icono del cursor segun la colisión del cursor con los bordes de la ventana
    // Change cursor icon
    window.onmousemove = e => {
        const HTML = document.documentElement;
        const x = e.clientX;
        const y = e.clientY;
        const hit = hitTest(x, y);

        switch (hit) {
            case 13:
                HTML.style.cursor = 'nw-resize';
                break;
            case 16:
                HTML.style.cursor = 'sw-resize';
                break;
            case 14:
                HTML.style.cursor = 'ne-resize';
                break;
            case 17:
                HTML.style.cursor = 'se-resize';
                break;

            case 10:
                HTML.style.cursor = 'w-resize';
                break;
            case 11:
                HTML.style.cursor = 'e-resize';
                break;
            case 12:
                HTML.style.cursor = 'n-resize';
                break;
            case 15:
                HTML.style.cursor = 's-resize';
                break;
        
            default:
                HTML.style.cursor = '';
                break;
        }
    }

    //#region Pinch Zoom

    let ctrlPulsado = false;

    document.addEventListener('keydown', function(event) {
        // Si se presiona Ctrl justo después de una rueda, bloquearla temporalmente
        if (event.key === 'Control') {
            ctrlPulsado = true;
            return;
        }

        ctrlPulsado = false;
    });

    document.addEventListener('keyup', function(event) {
        // Si se presiona Ctrl justo después de una rueda, bloquearla temporalmente
        if (event.key === 'Control') {
            ctrlPulsado = false;
            return;
        }

        ctrlPulsado = false;
    });

    // Bloquear zoom con Ctrl + Rueda (gesto común de touchpad)
    document.addEventListener('wheel', function(event) {
        if (event.ctrlKey && !ctrlPulsado) {
            event.preventDefault();
        }
    }, { passive: false });



    // Prevent pinch-zoom -- Touch Screen
    document.addEventListener('touchmove', function(event) {
        if (event.scale !== 1) {
        event.preventDefault();
        }
    }, { passive: false });

    // Prevent pinch zoom via gesturestart (iOS)
    document.addEventListener('gesturestart', function(event) {
    event.preventDefault();
    }, { passive: false });

    //#endregion

}