/***************************

Script by (c)2022 Tekrevio

***************************/


//Declaring variables 
let lang = "";                      //default language 
let lang_clickcnt = 0;              //
let tab = "about";                  //default selected tab
let tab_about = "";                 //element contents of "About" tab
let tab_about_color = "#3090cc";    //element's background-color of "About" tab
let tab_games = "";                 //element contents of "Games" tab
let tab_games_color = "#c72323";    //element's background-color of "Games" tab
let tab_info = "";                  //element contents of "Info" tab
let tab_info_color = "#9154e5";     //element's background-color of "Info" tab
let tab_line = "";                  //element contents of a line of menu bar
let clicked = "";                   //for click judgement of menu tab
let tab_y = "";                     //current y-position of the menu tab
let tab_height = "";                //menu tab height
let logo_def_padding = "";          //default padding-bottom value of #logo
let cnt = 0;                        //roop counter


lang = window.navigator.language;
if( lang == "undefined" || lang == null ) {
    lang = "en";
}
if( lang != "ja" ) {
    lang = "en"
}
clicked = document.querySelector( "#lang_select a" );
clicked.addEventListener( "click", function() {
    lang_clickcnt ++;
    if ( lang_clickcnt > 1 ) {
        lang_clickcnt = 0;
    }
    if ( lang_clickcnt == 0 ) {
        lang = "ja";
    } else if ( lang_clickcnt == 1 ) {
        lang = "en";
    }
    SwitchLanguage( lang );
    SwitchTab( tab );
});
SwitchLanguage( lang );
function SwitchLanguage( arg ) {
    document.querySelector( "#lang" ).lang = lang;
if ( arg == "ja" ) {
    document.querySelector( "div#lang_select a" ).textContent = "EN";
    document.querySelector( "#about" ).textContent = "ホーム";
    document.querySelector( "#games" ).textContent = "作品";
    document.querySelector( "#info" ).textContent = "その他";
} else {
    document.querySelector( "div#lang_select a" ).textContent = "JA";
    document.querySelector( "#about" ).textContent = "About";
    document.querySelector( "#games" ).textContent = "Games";
    document.querySelector( "#info" ).textContent = "Info";
}
}

//When the button on menu tab is clicked, set the background color of it's own with the function; "SwitchTab()".
function SwitchTab( arg ) {
    tab_about = document.querySelector( "div#menu ul li div a#about" );
    tab_games = document.querySelector( "div#menu ul li div a#games" );
    tab_info = document.querySelector( "div#menu ul li div a#info" );
    tab_line = document.querySelector( "div#menu hr" );
    if( arg == "about" ) {
        document.querySelector( "#frame" ).src = lang + "_about.html";
        tab_about.style.background = tab_about_color; 
        tab_games.style.background = "";
        tab_info.style.background = "";
        tab_line.style.background = tab_about_color;
        tab_line.style.border = "solid 5px " + tab_about_color;
    } else if( arg == "games" ) {
        document.querySelector( "#frame" ).src = lang + "_games.html";
        tab_about.style.background = "";
        tab_games.style.background = tab_games_color;
        tab_info.style.background = "";
        tab_line.style.background = tab_games_color;
        tab_line.style.border = "solid 5px" + tab_games_color;
    } else if( arg == "info" ) {
        document.querySelector( "#frame" ).src = lang + "_info.html";
        tab_about.style.background = "";
        tab_games.style.background = "";
        tab_info.style.background = tab_info_color;
        tab_line.style.background = tab_info_color;
        tab_line.style.border = "solid 5px" + tab_info_color;
    }
}
clicked = document.getElementsByClassName( "button" );
for( cnt=0; cnt < clicked.length; cnt++ ) {
     clicked[cnt].addEventListener( "click", function( e ) {
        tab = e.target.id;
        SwitchTab( tab );
    });
}
SwitchTab( tab );

//Adjust the height of the frame in which is embedded html(contents of "About","Games", and "Info" tab).
jQuery( "#frame" ).on( "load", function(){
    try {
        jQuery( this ).height( 0 );
        jQuery( this ).height( this.contentWindow.document.documentElement.scrollHeight);
    } catch( e ) {
    }
});
jQuery( "#frame" ).trigger( "load" );

//Fix menu tab when it reaches the top of window.
function SetLogoPadding( arg ) {
    if( arg == null ) {
        jQuery( "header" ).css({
            "padding-bottom": ""
            });
    } else {
        jQuery( "header" ).css({
            "padding-bottom": arg
            });
    }
}
function FixMenutab( arg ) {
    if ( arg == "fix" ) {
        jQuery( "#menu" ).css({
            "position": "fixed",
            "top": "0",
            "width": "100%"
            });
    } else if ( arg == "remove" ) {
        jQuery( "#menu" ).css({
            "position": "",
            "top": "",
            "width": ""
            });
    }
}
tab_y = jQuery( "#menu" ).offset().top;
tab_height = jQuery( "#menu" ).height();
SetLogoPadding();
logo_def_padding = parseInt( jQuery( "#logo" ).css( "padding-bottom" ), 10 );   //return value in decimal
jQuery( window ).on( "scroll", function() {

	if( jQuery( this ).scrollTop() >= tab_y ) {
		FixMenutab( "fix" );
        SetLogoPadding( tab_height + logo_def_padding );
	} else {
		FixMenutab( "remove" );
        SetLogoPadding();
	}

});

fetch('/ok.json')
.then(res =>	{
	console.log(res.status);
	return res.json();
})