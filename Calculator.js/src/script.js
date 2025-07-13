// https://codepen.io/Roemerdt/pen/YWRwoG
//#region Funcionalidad calculadora

const AllowedKeys = [
    '0','1','2','3','4','5','6','7','8','9',   // Números
    '+','-','*','/','.',                      // Operadores aritméticos
    'Backspace','Enter','Delete' // Control
  ];

class Calculator {
	
	constructor() {
		this.current = 0;
		this.entered = 0;
		this.answer = 0;

		this.decimal = false;

		this.operator = '';

		this.states = {
			'inv': false,
			'comma': false
		}

		this.options = [
			['equals', this.processEquals.bind(this)],
			['clear', this.processClear.bind(this)],
			['sqrt', this.processSqrt.bind(this)],
			['inv', this.processInv.bind(this)],
			['comma', this.processComma.bind(this)],
			['pi', this.processPi.bind(this)],

			['Enter', this.processEquals.bind(this)],
			['Delete', this.processClear.bind(this)],
			['Backspace', this.processClear.bind(this)]
		];

		this.firstEnteredOutput = document.querySelector('.f_entered');
		this.lastEnteredOutput = document.querySelector('.l_entered');
		this.operatorOutput = document.querySelector('.operator');

		this.currentOutput = document.querySelector('.current > h1');
		this.buttons = document.querySelectorAll('.buttons > div');
		var calc = this;

		for(var i = 0, n = this.buttons.length; i < n; i++) {
			//var calc = this;
			var button = this.buttons[i];

			button.addEventListener('mousedown', function() {
				var _this = this;
				calc.processAction(_this.getAttribute('data-key'));
				_this.classList.add('pressed');
				setTimeout(function() {
					_this.classList.remove('pressed');
				}, 400);
			});

			button.addEventListener('mouseup', function() {
				var _this = this;
				_this.classList.remove('pressed');
			});
		}

		document.addEventListener('keydown', function(event) {
			if (AllowedKeys.includes(event.key))
				calc.processAction(event.key);
			else
				event.preventDefault(); // Bloquea la tecla si no está permitida	
			
		});
	}

	processAction(a) {
		for(var i = 0, n = this.options.length; i < n; i++) {
			var option = this.options[i];
			if(a === option[0]) {
				option[1]();
				return;
			}
		}

		if(a === '+' || a === '-' || a === '/' || a === '*') {
			this.processASDM(a);
			return;
		} else {
			this.processNumber(a);
			return;
		}

	}

	processEquals() {
		if(!!this.operator) {
			this.displayNumber(this.current, this.lastEnteredOutput);
			this.answer = eval(this.entered + this.operator + this.current);
			this.displayNumber(this.answer, this.currentOutput);

			this.current = this.answer;
		}
	}

	processClear() {
		this.current = 0;
		this.displayNumber(this.current, this.currentOutput);
		this.entered = 0;
		this.operator = '';
		this.firstEnteredOutput.innerHTML = '';
		this.lastEnteredOutput.innerHTML = '';
		this.operatorOutput.innerHTML = '';
	}

	processSqrt() {
		this.current = Math.sqrt(this.current);
		this.displayNumber(this.current, this.currentOutput);
	}

	processInv() {
		this.current = this.current * -1;
		this.displayNumber(this.current, this.currentOutput);
	}

	processComma() {
		if(!this.decimal) {
			this.current += '.';
			this.currentOutput.innerHTML = this.current;
		}

		this.decimal = true;
	}

	processPi() {
		this.current = Math.PI;
		this.displayNumber(this.current, this.currentOutput);
	}

	processASDM(a) {
		if(!!this.entered && !!!this.answer) {
			return;
		}

		if(this.answer) {
			this.lastEnteredOutput.innerHTML = '';
		}

		this.decimal = false;
		this.operator = a;
		this.entered = this.current;
		this.displayNumber(this.entered, this.firstEnteredOutput);
		a === '*' ? this.operatorOutput.innerHTML = 'x' : this.operatorOutput.innerHTML = this.operator;
		this.current = 0;
		this.displayNumber(this.current, this.currentOutput);
	}

	processNumber(n) {
		this.current === 0 ? this.current = n : this.current += n;
		this.displayNumber(this.current, this.currentOutput);
	}

	displayNumber(n, location) {
		location.innerHTML = String(n).substring(0, 10);
	}
}

//#endregion

//#region FUNCIONALIDAD VENTANA

/** @type {WebView} */
const WV = window.WebView.Sync;

const WVWin = WV.Window;
const WVBrowser = WV.Browser;
const Rect = WVWin.Rect;

// No permitir snap, ya que es una ventana con tamaño fijo
WVWin.AllowSnap = false;
WVWin.Title = "Calculator.js"

// Abrir DevTools, solo para debugging
//WVBrowser.OpenDevTools();

// Recarga automatica cuando se cambie codigo JS solo debugging
//WVBrowser.HotReload = true;

// No permitir teclas especiales (F5, Ctrl + F5, etc...)
WVBrowser.AcceleratorKeys = false;

Rect.Width = 282;
Rect.Height = 482;

Rect.MinWidth = 282;
Rect.MinHeight = 482;

Rect.MaxWidth = 282;
Rect.MaxHeight = 482;

Rect.X = 100;
Rect.Y = 100;

// Cargar los plugins que estan en la carpeta Calculator.js/plugins
WV.LoadPluginsFromFolder();

const TaskbarController = WV.NewPluginInstance("TaskbarController");
TaskbarController.Icon = "/Calculator.ico"
TaskbarController.IconSmall = "/Calculator.ico"


const SysMenu = WV.NewPluginInstance("SysMenuController");

// Es visible por defecto
//SysMenu.Visible = true;

// Quitar opciones que no se van a utilizar
SysMenu.MaximizeItem = false;
SysMenu.MoveItem = false;
SysMenu.SizeItem = false;

window.onload = function(){

	// Inicializar Calculadora
    new Calculator();

	// Mostrar ventana
    WVWin.Show();

    /** @type {HTMLDivElement} */
    const TitleBar = document.querySelector('.nav');

    TitleBar.onmousedown = e => {
		if(e.button == 0)
			WVWin.Drag();
    }

	TitleBar.onauxclick = e => {
		// Si es click derecho, desplegar el SysMenu
		if(e.button == 2)
			SysMenu.ShowMenu(e.clientX, e.clientY);
	}

    /** @type {HTMLButtonElement} */
    let btnMinimize = document.querySelector(".minify");
    btnMinimize.onclick = e => WVWin.Minimize();

	// Evita que se propague el evento hasta la TitleBar y se haga Drag()
    btnMinimize.onmousedown = e => e.stopPropagation();
	// Evita que se propague el evento hasta la TitleBar y se haga SysMenu.ShowMenu(...)
	btnMinimize.onauxclick = e => e.stopPropagation();

    /** @type {HTMLButtonElement} */
    let btnClose = document.querySelector(".close");
    btnClose.onclick = e => WVWin.Close();

	// Evita que se propague el evento hasta la TitleBar y se haga Drag()
    btnClose.onmousedown = e => e.stopPropagation();
	// Evita que se propague el evento hasta la TitleBar y se haga SysMenu.ShowMenu(...)
	btnClose.onauxclick = e => e.stopPropagation();

	// Evitar desplegar el ContextMenu nativo del WebView
	window.oncontextmenu = e => {
		e.preventDefault();
    	return false;
	}
}

//#endregion