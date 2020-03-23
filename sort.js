!function partA(){

	let url = document.URL;
	let frame = document.createElement('iframe');
	frame.src=url+'?action=source';
	frame.id='test';
	document.body.append(frame);

	window.setTimeout(partB,2000);
	function partB(){
		let source = frame.contentWindow.document.body.innerText;
		console.log(source);
		let result = sortExamples(source);

		let frame2 = document.createElement('iframe');
		frame2.src=url+'?action=edit';
		frame2.id='test2';
		document.body.append(frame2);

		if(source.length > 30){
			window.setTimeout(partC,2000);
		} else {alert('oh oh');}
		function partC(){
			frame2.contentDocument.getElementById('sourceTextarea').value=result;

			frame2.contentDocument.getElementsByClassName('input-edit-reason')[0].value='Examples sorted';

			frame2.contentDocument.getElementsByTagName('button')[2].click();
		}
	}
}();

function sortExamples(input){
	let example = [];
	lines = input.split('\n');
	for(let i = 0;i < lines.length;i++){
		if(isExample(lines[i]) ){
			let add = lines[i];
			while(true){
				i++;

				if( isSub(lines[i]) || lines[i-1].endsWith('\\') ){
					add+='\n'+lines[i];
				} else {i--;break;}
			}
			example.push(add);
		}
	}

	example.sort(function(Ori_x,Ori_y) {

		x=format(Ori_x);
		y=format(Ori_y);

		if (x < y) {
			return -1;
		}
		if (x > y) {
			return 1;
		}
		if( Ori_x < Ori_y){
			return -1;
		}
		if( Ori_x > Ori_y){
			return 1;
		}
		return 0;
	});

	return example.join('\n');;
}


function isExample(text){
	text=text.trim();
	if(text.startsWith("%%")){
		text=text.substring(2);
		text=text.trim();
	}
	return text.startsWith('*') && !text.startsWith("**");
}


function isSub(text){
	try {
		text=text.trim();
		if(text.startsWith("%%")){
		   text=text.substring(2);
		}
	}
	catch(e){
		return false;
	}
	return text.startsWith('**') || text.startsWith('-->') || text.startsWith('--->') || text.startsWith("'''") || text.startsWith('//');
}

function format(str){
	s=str.trim();
	s=s.slice(s.indexOf('*')+1,(s.indexOf('**')==-1?s.length:s.indexOf('**')));
	s=s.trim();
	if(s.startsWith("%%")){
		s=s.slice(2);
	}
	
	s = removeTag(s,'[[spoiler:');
	s = removeTag(s,'[[note:');

	let leftB = [];
	let rightB = [];
	let b;
	let limit = s.length;

	tier1 = []; 
	tier2 = []; 

	for(let i=0;i<limit;i++){
		if(s.substring(i,i+2)=='[['){
			leftB.push(i);
		}
		if(s.substring(i,i+2)==']]'){
			if(leftB !== []){
				rightB.push(i);
			}
		}

		if(leftB.length !== 0 && rightB.length !== 0) {
			b = s.substring(leftB[leftB.length-1]+2,rightB[0]);
			b = b.substring(b.indexOf(' ')+1);

			if(s.substring(leftB[leftB.length-1]-2,rightB[0]+4).includes("''")){
				tier2.push(b);
			}

			s = s.substring(0,leftB[leftB.length-1])+b+s.substring(rightB[0]+2);
			leftB.pop();
			rightB.shift();
		}
	}

	let words = s.split(" ");

	s="";
	for(let i=0;i<words.length;i++){
		if(words[i].includes("/") && !words[i].includes(":/")){
			words[i]=words[i].substring(words[i].indexOf('/')+1)+' ';

			if(words[i].includes("''")){
				tier1.push(words[i]);
			} else {
				tier2.push(words[i]);
			}
			
		}
	}
	words = tier2.concat(words);
	words = tier1.concat(words);

	s = words.join(' ');

	s = s.replace(/([A-Z])/g, ' $1').trim();

	s=s.toLowerCase();

	s=s.replace('æ','ae');
	removeA('in');
	removeA('the');
	removeA('los');
	removeA('las');
	removeA('les');
	removeA('an');
	removeA('a');
	removeA('la');
	removeA('le');
	removeA('el');
	removeA('da');
	removeA('ye');
	
	s=s.replace(/\'/g, '');
	s=s.replace(/\"/g, '');
	s=s.replace(/\{/g, '');
	s=s.replace(/\}/g, '');
	s=s.trim();
	s=s.replace(/\s+/g,'z');

	return s;

	function removeA(word){
		let letter = s.substring(word.length,word.length+1);
		let r = /[0-9 ]+/
		if(s.startsWith(word) && r.test(letter)){
			s=s.substring(word.length);
		} else {
			if(s.startsWith(capitalize(word)+' ')){
				s=s.reaplce(capitalize(word)+' ','');
			}
		}
	}
}

function removeTag(s,type){
	while(s.indexOf(type) !== -1){
		let level = 1;
		let failSafe = s.indexOf(type);
		for(let i = s.indexOf(type)+10;i<s.length;i++){
			if(s.indexOf(type) === -1 || i === -1)break;
			if(s.substring(i).startsWith('[['))level++;
			if(s.substring(i).startsWith(']]'))level--;
			if(level === 0){
				s=s.substring(0,s.indexOf(type))+s.substring(i+2);
				break;
			}
		}
		if(s.indexOf(type) === failSafe){
			s=s.substring(0,s.indexOf(type));
		}	
	}
	return s;
}

function capitalize(word) {
	return word.charAt(0).toUpperCase() + word.slice(1);
}

