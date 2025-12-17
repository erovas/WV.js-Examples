// @ts-check

//#region ENUMS

/**
 * @readonly
 * @enum {number}
 */
const WindowState = {
    None: -1,
    Minimized: 0,
    Normalized: 1,
    Maximized: 2
}

/**
 * @readonly
 * @enum {number}
 */
const PrintOrientation = {
    Portrait: 0,
    Landscape: 1
}

/**
 * @readonly
 * @enum {number}
 */
const PrintCollation = {
    Default: 0,
    Collated: 1,
    Uncollated: 2
}

/**
 * @readonly
 * @enum {number}
 */
const PrintColorMode = {
    Default: 0,
    Color: 1,
    Grayscale: 2
}

/**
 * @readonly
 * @enum {number}
 */
const PrintDuplex = {
    Default: 0,
    OneSided: 1,
    TwoSidedLongEdge: 2,
    TwoSidedShortEdge: 3
}

/**
 * @readonly
 * @enum {number}
 */
const PrintStatus = {
    Succeeded: 0,
    PrinterUnavailable: 1,
    OtherError: 2
}

//#endregion

/**
 * @class
 */
class IRect {
    /**
     * Window position in X
     * @type {number}
     */
    X;

    /**
     * Window position in Y
     * @type {number}
     */
    Y;

    /**
     * Window width
     * @type {number}
     */
    Width;

    /**
     * Window height
     * @type {number}
     */
    Height;

    /**
     * Maximum window width
     * @type {number}
     */
    MaxWidth;

    /**
     * Maximum window height
     * @type {number}
     */
    MaxHeight;

    /**
     *  Minimun window width
     * @type {number}
     */
    MinWidth;

    /**
     * Minimun window height
     * @type {number}
     */
    MinHeight;
}

/**
 * @class
 */
class IWindow {

    //#region PROPS

    /**
     * Gets a Rect object.
     * @readonly 
     * @type {IRect}
     */
    Rect;

    /**
     * Gets or sets windows state.
     * @type {WindowState}
     */
    State;

    /**
     * Gets or sets windows state as text.
     * @type {string}
     */
    StateText;

    /**
     * Gets or sets a WebView's title
     * @type {string}
     */
    Title;

    /**
     * Gets or sets a value that indicates whether this WebView appears in the topmost z-order.
     * @type {boolean}
     */
    TopMost;

    /**
     * Gets or sets a value indicating whether this WebView is enabled in the user interface (UI)
     * @type {boolean}
     */
    Enabled;

    /**
     * Gets a value that indicates whether this WebView window is visible.
     * @readonly
     * @type {boolean}
     */
    IsVisible;

    /**
     * Prevents the window from closing, and fires the OnClose event
     * @type {boolean}
     */
    PreventClose;

    /**
     * Gets a value that indicates whether this WebView window is active.
     * @readonly
     * @type {boolean}
     */
    IsActive;

    /**
     * Gets a value that indicates wheter this WebView window is a modal window
     * @readonly
     * @type {boolean}
     */
    IsModal;

    /**
     * Get or set the snap window function. Default is true.
     * @type {boolean}
     */
    AllowSnap;

    //#endregion

    //#region METHODS

    /**
     * Close the window
     */
    Close(){}

    /**
     * Shows the window without activating it
     */
    ShowBehind(){}

    /**
     * Shows the window
     */
    Show(){}

    /**
     * Hide the window
     */
    Hide(){}

    /**
     * Drag the window
     */
    Drag(){}

    /**
     * Resize top-left the window
     */
    ResizeTopLeft(){}

    /**
     * Resize top-right the window
     */
    ResizeTopRight(){}

    /**
     * Resize bottom-left the window
     */
    ResizeBottomLeft(){}

    /**
     * Resize bottom-right the window
     */
    ResizeBottomRight(){}

    /**
     * Resize left the window
     */
    ResizeLeft(){}

    /**
     * Resize right the window
     */
    ResizeRight(){}

    /**
     * Resize top the window
     */
    ResizeTop(){}

    /**
     * Resize bottom the window
     */
    ResizeBottom(){}

    /**
     * Minimize the window
     */
    Minimize(){}

    /**
     * Restore the window
     */
    Restore(){}

    /**
     * Maximize the window
     */
    Maximize(){}

    //#endregion

    //#region EVENTS

    /**
     * State changed event.
     * @type {(State: number, StateText: string) => void | null}
     */
    OnStateChanged;

    /**
     * Close event, fired when the PreventClose property is true.
     * @type {() => void | null}
     */
    OnClose;

    /**
     * Position changed event.
     * @type {(X: number, Y: number) => void | null}
     */
    OnPositionChanged;

    /**
     * Activated event.
     * @type {(isActive: boolean) => void | null}
     */
    OnActivated;

    /**
     * Enable event.
     * @type {(isEnable: boolean) => void | null}
     */
    OnEnabled;

    /**
     * Visible event.
     * @type {(isVisible: boolean) => void | null}
     */
    OnVisible;

    /**
     * Size event.
     * @type {(width: number, heigth: number) => void | null}
     */
    OnSizeChanged;

    /**
     * Appends an event listener for events whose type attribute value is type.
     * @param {string} type 
     * @param {function} callback 
     */
    AddEventListener(type, callback){}

    /**
     * Removes the event listener in target's event listener list with the same type and callback.
     * @param {string} type 
     * @param {function} callback 
     */
    RemoveEventListener(type, callback){}

    //#endregion

}

/**
 * @class
 */
class IContextMenuItem {
    
    //#region PROPS

    /**
     *
     * @readonly
     * @type {string}
     */
    Name;

    /**
     * 
     * @readonly
     * @type {string}
     */
    Kind;

    /**
     * 
     * @readonly
     * @type {string}
     */
    Icon;

    /**
     * 
     * @readonly
     * @type {IContextMenuItem | null}
     */
    Parent;

    /**
     * 
     * @readonly
     * @type {IContextMenuItem[]}
     */
    Children;

    /**
     * 
     * @type {boolean}
     */
    Checked;

    /**
     * 
     * @type {boolean}
     */
    Enabled;

    /**
     * 
     * @type {boolean}
     */
    Visible;

    /**
     * 
     * @type {function | null}
     */
    Callback;

    //#endregion

    //#region METHODS

    /**
     * 
     * @param {IContextMenuItem} item 
     */
    AddItem(item){}

    /**
     * 
     * @param {number} index 
     * @param {IContextMenuItem} item 
     */
    InsertItem(index, item){}

    /**
     * 
     * @param {IContextMenuItem} item 
     */
    RemoveItem(item){}

    /**
     * 
     * @param {number} index 
     */
    RemoveItemAt(index){}

    /**
     * 
     */
    Clear(){}

    //#endregion

}

/**
 * @class
 */
class IContexMenu {

    /**
     * Enable Context menu
     * @type {Boolean}
     */
    Enable;

    /**
     * 
     * @readonly
     * @type {IContextMenuItem[]}
     */
    Children;

    //#region PROPS Native Items

    /**
     * 
     * @type {boolean}
     */
    ShowNativeItems;

    /**
     * 
     * @type {boolean}
     */
    EmojiItem;

    /**
     * 
     * @type {boolean}
     */
    UndoItem;

    /**
     * 
     * @type {boolean}
     */
    RedoItem;

    /**
     * 
     * @type {boolean}
     */
    CutItem;

    /**
     * 
     * @type {boolean}
     */
    CopyItem; 

    /**
     * 
     * @type {boolean}
     */
    PasteItem; 

    /**
     * 
     * @type {boolean}
     */
    PasteAndMatchStyleItem;

    /**
     * 
     * @type {boolean}
     */
    SelectAllItem;

    /**
     * 
     * @type {boolean}
     */
    WritingDirectionItem;

    /**
     * 
     * @type {boolean}
     */
    ShareItem;

    /**
     * 
     * @type {boolean}
     */
    WebCaptureItem;

    /**
     * 
     * @type {boolean}
     */
    LoopItem;

    /**
     * 
     * @type {boolean}
     */
    ShowAllControlsItem;

    /**
     * 
     * @type {boolean}
     */
    SaveMediaAsItem;

    /**
     * 
     * @type {boolean}
     */
    CopyLinkItem;

    /**
     * 
     * @type {boolean}
     */
    CopyLinkToHighlightItem;

    /**
     * 
     * @type {boolean}
     */
    PrintItem;

    /**
     * 
     * @type {boolean}
     */
    BackItem;

    /**
     * 
     * @type {boolean}
     */
    ForwardItem;

    /**
     * 
     * @type {boolean}
     */
    ReloadItem;

    /**
     * 
     * @type {boolean}
     */
    SaveAsItem;

    /**
     * 
     * @type {boolean}
     */
    SaveImageAsItem;

    /**
     * 
     * @type {boolean}
     */
    CopyImageItem;

    /**
     * 
     * @type {boolean}
     */
    CopyImageLocationItem;

    /**
     * 
     * @type {boolean}
     */
    MagnifyImageItem;

    /**
     * 
     * @type {boolean}
     */
    SaveFrameAsItem;

    /**
     * 
     * @type {boolean}
     */
    CopyVideoFrameItem;

    /**
     * 
     * @type {boolean}
     */
    PictureInPictureItem;

    /**
     * 
     * @type {boolean}
     */
    SaveLinkAsItem;

    /**
     * 
     * @type {boolean}
     */
    OpenLinkInNewWindowItem;

    //#endregion

    //#region METHODS

    /**
     * 
     * @param {string} name 
     * @param {string} kind 
     * @param {string | null} icon 
     * @param {function | null} callback 
     * @returns 
     */
    CreateContextItem(name, kind, icon = null, callback = null){
        return new IContextMenuItem()
    }

    /**
     * 
     * @returns 
     */
    CreateContextItemSeparator(){
        return new IContextMenuItem()
    }

    /**
     * 
     * @param {IContextMenuItem} item 
     */
    AddItem(item){}

    /**
     * 
     * @param {number} index 
     * @param {IContextMenuItem} item 
     */
    InsertItem(index, item){}

    /**
     * 
     * @param {IContextMenuItem} item 
     */
    RemoveItem(item){}

    /**
     * 
     * @param {number} index 
     */
    RemoveItemAt(index){}

    /**
     * 
     */
    Clear(){}

    //#endregion
}

/**
 * @class
 */
class IBrowser {
    
    //#region IBrowser PROPS

    /**
     * Gets the URI of the current top level document.
     * @readonly
     * @type {string}
     */
    Uri;

    /**
     * Enable or disable automatic browser reloading, use it during development.
     * @type {boolean}
     */
    HotReload;

    /**
     * True if the WebView is able to navigate to a previous page in the navigation history.
     * @readonly
     * @type {boolean}
     */
    CanGoBack;

    /**
     * True if the WebView is able to navigate to a next page in the navigation history.
     * @readonly
     * @type {boolean}
     */
    CanGoForward;

    /**
     * Indicates whether any audio output from this CoreWebView2 is playing. 
     * 
     * True if audio is playing even if IBrowser.Muted is true. 
     * @readonly
     * @type {boolean}
     */
    IsPlayingAudio;

    /**
     * Get current status bar text
     * @readonly
     * @type {string}
     */
    StatusBarText;

    /**
     * Determines whether browser-specific accelerator keys are enabled.
     * 
     *  When this setting is set to false, it disables all accelerator keys that access 
     * features specific to a web browser, including but not limited to:
     * - Ctrl+F and F3 for Find on Page
     * - Ctrl+P for Print
     * - Ctrl+R and F5 for Reload
     * - Ctrl+Plus and Ctrl+Minus for zooming
     * - Ctrl+Shift-C and F12 for DevTools
     * - Special keys for browser functions, such as Back, Forward, and Search
     * 
     * It does not disable accelerator keys related to movement and text editing, such as:
     * - Home, End, Page Up, and Page Down
     * - Ctrl+X, Ctrl+C, Ctrl+V
     * - Ctrl+A for Select All
     * - Ctrl+Z for Undo
     * @type {boolean}
     */
    AcceleratorKeys;

    /**
     * Determines whether the end user to use swiping gesture on touch input enabled devices to navigate in WebView2.
     * 
     * Swiping gesture navigation on touch screen includes:
     * - Swipe left/right (swipe horizontally) to navigate to previous/next page in navigation history.
     * @type {boolean}
     */
    SwipeNavigation;

    /**
     * Gets or sets the zoom factor for the WebView.
     * 
     * Note that changing zoom factor may cause window.innerWidth or window.innerHeight
     * and page layout to change. A zoom factor that is applied by the host by setting
     * this ZoomFactor property becomes the new default zoom for the WebView. This zoom   
     * factor applies across navigations and is the zoom factor WebView is returned
     * to when the user presses Ctrl+0. Specifying a ZoomFactor less than
     * or equal to 0 is not allowed. WebView also has an internal supported zoom factor
     * range. When a specified zoom factor is out of that range, it is normalized to
     * be within the range event is raised for the real applied zoom factor. 
     * @type {number}
     */
    ZoomFactor;

    /**
     * Gets maximum ZommFactor
     * @type {number}
     */
    MaxZoomFactor;

    /**
     * Gets minimum ZoomFactor
     * @type {number}
     */
    MinZoomFactor;

    /**
     * When WebView is reload, reset all settings to default
     * @type {boolean}
     */
    ResetWebViewOnReload;

    /**
     * 
     * @readonly
     * @type {IContexMenu}
     */
    ContextMenu;

    /**
     * Indicates whether all audio output from this WebView2 is muted or not. 
     * Set to true will mute this CoreWebView2, and set to false will unmute this WebView2.
     * @type {boolean}
     */
    Muted;

    //#endregion

    //#region IBrowser METHODS

    /**
     * Open developer tools [DevTools]
     */
    OpenDevTools(){}

    /**
     * Navigate to a specific URI
     * @param {string} uri 
     */
    Navigate(uri){}

    /**
     * Reload the page
     */
    Reload(){}

    /**
     * Reload the page avoiding the cache
     */
    HardReload(){}

    /**
     * Navigates the WebView to the previous page in the navigation history.
     */
    GoBack(){}

    /**
     * Navigates the WebView to the next page in the navigation history.
     */
    GoForward(){}

    //#endregion

    //#region IBrowser EVENTS

    /**
     * Playing Audio event
     * @type {(isPlayingAudio: boolean) => void | null}
     */
    OnPlayingAudio;

    /**
     * Muted Event
     * @type {(muted: boolean) => void | null}
     */
    OnMuted;

    /**
     * ZoomFactor changed event
     * @type {(zoomfactor: number) => void | null}
     */
    OnZoomFactorChanged;

    /**
     * StatusBarText changed event
     * @type {(StatusBarText: string) => void | null}
     */
    OnStatusBarTextChanged;

    /**
     * Appends an event listener for events whose type attribute value is type.
     * @param {string} type 
     * @param {function} callback 
     */
    AddEventListener(type, callback){}

    /**
     * Removes the event listener in target's event listener list with the same type and callback.
     * @param {string} type 
     * @param {function} callback 
     */
    RemoveEventListener(type, callback){}

    //#endregion

}

/**
 * @class
 */
class IPrintManager {

    /**
     * Gets a value indicating that the printmanager is printing
     * @readonly
     * @type {boolean}
     */
    IsBusy;

    /**
     * Print orientation
     * @type {PrintOrientation}
     */
    Orientation;

    /**
     * Print orientation
     * @type {string}
     */
    OrientationText;

    /**
     * The bottom margin in centimeters. The default is 1 cm.
     * @type {number}
     */
    MarginBottom;

    /**
     * The left margin in centimeters. The default is 1 cm.
     * @type {number}
     */
    MarginLeft;

    /**
     * The right margin in centimeters. The default is 1 cm.
     * @type {number}
     */
    MarginRight;

    /**
     * The top margin in centimeters. The default is 1 cm.
     * @type {number}
     */
    MarginTop;

    /**
     * The page width in centimeters. The default width is 21 cm.
     * @type {number}
     */
    PageWidth;

    /**
     * The page height in centimeters. The default height is 29.7 cm.
     * @type {number}
     */
    PageHeight;

    /**
     * The scale factor is a value between 0.1 and 2.0. The default is 1.
     * @type {number}
     */
    ScaleFactor;

    /**
     * true if background colors and images should be printed. The default value is false.
     * @type {boolean}
     */
    PrintBackgrounds;

    /**
     * true if only the current end user's selection of HTML in the document should be printed.
     * The default value is false.
     * @type {boolean}
     */
    PrintSelectionOnly;

    /**
     * true if header and footer should be printed. The default value is false.
     * 
     * The header consists of the date and time of printing, and the title of the page. 
     * 
     * The footer consists of the URI and page number. The height of the header and footer is 0.5 cm
     * @type {boolean}
     */
    PrintHeaderAndFooter;

    /**
     * The URI in the footer if PrintHeaderAndFooter is true. The default value is the current URI.
     * 
     * If an empty string or null value is provided, no URI is shown in the footer.
     * @type {string}
     */
    FooterUri;

    /**
     * Page range to print. Defaults to empty string, which means print all pages.
     * 
     * The PageRanges property is a list of page ranges specifying one or more pages
     * that should be printed separated by commas. Any whitespace between page ranges
     * is ignored. A valid page range is either a single integer identifying the page
     * to print, or a range in the form [start page]-[last page] where start page and
     * last page are integers identifying the first and last inclusive pages respectively
     * to print. Every page identifier is an integer greater than 0 unless wildcards
     * are used (see below examples). The first page is 1. In a page range of the form
     * [start page]-[last page] the start page number must be larger than 0 and less
     * than or equal to the document's total page count. If the start page is not present,
     * then 1 is used as the start page. The last page must be larger than the start
     * page. If the last page is not present, then the document total page count is
     * used as the last page. Repeating a page does not print it multiple times. To
     * print multiple times, use the Microsoft.Web.WebView2.Core.CoreWebView2PrintSettings.Copies
     * property. The pages are always printed in ascending order, even if specified
     * in non-ascending order. If page range is not valid or if a page is greater than
     * document total page count, ArgumentException is thrown. The following examples
     * assume a document with 20 total pages.
     * 
     * ExampleResultNotes 
     * - "2"Page 2 
     * - "1-4, 9, 3-6, 10, 11"Pages 1-6, 9-11 
     * - "1-4, -6" Pages 1-6 The "-6" is interpreted as "1-6". 
     * - "2-" Pages 2-20The "2-" is interpreted as "pages 2 to the end of the document". 
     * - 
     * - "4-2, 11, -6"Invalid"4-2" is an invalid range. 
     * - "-"Pages 1-20The "-" is interpreted as "page 1 to the end of the document". 
     * - "1-4dsf, 11"Invalid 
     * - "2-2"Page 2 
     * @type {string}
     */
    PageRanges;

    /**
     * Number of copies to print. Minimum value is 1 and the maximum copies count is 999. 
     * The default value is 1.
     * @type {number}
     */
    Copies;

    /**
     * Prints multiple pages of a document on a single piece of paper. Choose from 1, 2, 4, 6, 9 or 16.
     * The default value is 1.
     * @type {number}
     */
    PagesPerSide;

    /**
     * The name of the printer to use. Defaults to empty string.
     * 
     * If the printer name is empty string or null, then it
     * prints to the default printer on the user OS. If provided printer name doesn't
     * match with the name of any installed printers on the user OS, the event returns
     * with PrintStatus.PrinterUnavailable.
     * @type {string}
     */
    PrinterName;

    /**
     * Printer duplex settings. The default value is PrintDuplex.Default.
     * 
     * Printing uses default value of printer's duplex if an invalid value is provided for the specific printer.
     * @type {PrintDuplex}
     */
    Duplex;

    /**
     * Printer duplex settings. The default value is PrintDuplex.Default.
     * 
     * Printing uses default value of printer's duplex if an invalid value is provided for the specific printer.
     * @type {string}
     */
    DuplesText;

    /**
     * Printer color mode. The default value is PrintColorMode.Default.
     * 
     * Printing uses default value of printer supported color if an invalid value is provided for the specific printer.
     * @type {PrintColorMode}
     */
    ColorMode;

    /**
     * Printer color mode. The default value is PrintColorMode.Default.
     * 
     * Printing uses default value of printer supported color if an invalid value is provided for the specific printer.
     * @type {string}
     */
    ColorModeText;

    /**
     * Printer collation. The default value is PrintCollation.Default.
     * 
     * Printing uses default value of printer's collation if an invalid value is provided for the specific printer.
     * @type {PrintColorMode}
     */
    Collation;

    /**
     * Printer collation. The default value is PrintCollation.Default.
     * 
     * Printing uses default value of printer's collation if an invalid value is provided for the specific printer.
     * @type {string}
     */
    CollationText;

    /**
     * Print the current web page to the specified printer with the provided settings.
     */
    Print(){}

    /**
     * Print the current page to PDF with the provided settings.
     * @param {string} ResultFilePath 
     */
    PrintToPDF(ResultFilePath){}

    /**
     * PrintFinished event.
     * @type {(Status: PrintStatus, StatusText: string) => void | null}
     */
    OnPrintFinished;

    /**
     * Appends an event listener for events whose type attribute value is type.
     * @param {string} type 
     * @param {function} callback 
     */
    AddEventListener(type, callback){}

    /**
     * Removes the event listener in target's event listener list with the same type and callback.
     * @param {string} type 
     * @param {function} callback 
     */
    RemoveEventListener(type, callback){}
}

/**
 * @class
 */
class IWebView {

    //#region IWebView PROPS

    /**
     * Gets a value that identify this WebView
     * @readonly 
     * @type {string}
     */
    UID;

    /**
     * Gets plugin name
     * @readonly 
     * @type {string}
     */
    Name;

    /**
     * Gets a Window object
     * @readonly 
     * @type {IWindow}
     */
    Window;

    /**
     * Gets a Browser object
     * @readonly 
     * @type {IBrowser}
     */
    Browser;

    /**
     * 
     * @readonly
     * @type {IPrintManager}
     */
    PrintManager;

    /**
     * Gets a value that indicates wheter this WebView is the main window.
     * @readonly 
     * @type {boolean}
     */
    IsMain;

    /**
     * Gets an array with all the names of the loaded plugins
     * @readonly 
     * @type {Array<string>}
     */
    PluginsName;

    //#endregion

    //#region IWebView METHODS
    
    /**
     * Create an instance of a plugin
     * @param {string} pluginName 
     * @param  {...any} args 
     * @returns Plugin instance
     */
    NewPluginInstance(pluginName, ...args){
        return Object.create(null);
    }

    /**
     * Retrieves a plugin instance using its UID
     * @param {string} UID 
     * @returns 
     */
    GetPluginInstance(UID){
        return Object.create(null);
    }

    /**
     * Restart the application
     */
    Restart(){}

    //#endregion

}