var urlParams = new URLSearchParams(window.location.search);
var lang = urlParams.get('lang') || 'zh-cn';
var chara = urlParams.get('chara') || 'shallow';


// function setLanguageList(){
// 	var filepath=`json/manifest.json`;
// 	fetch(filepath)
// 	.then(response => response.json())
// 	.then(data => {
// 		languageList = data["language-list"]
// 		for (let i = languageList.length - 1; i >= 0; i--) {
// 			let languageCode = languageList[i]["language-code"];
// 			let languageLogo = languageList[i]["language-logo"];
// 			let content = `<div class="round_button" id="${languageCode}">${languageLogo}</div>`;
// 			document.getElementById("lang_list").innerHTML += content;
		
// 			document.getElementById(languageList[i]["language-code"]).addEventListener('click', () => {
// 				console.log(languageList[i]["language-code"]);
// 				setGeneric(languageList[i]["language-code"]);
// 				setProfile(languageList[i]["language-code"], chara);
// 				history.pushState({}, '', `index.html?lang=${languageList[i]["language-code"]}&chara=${chara}`);
// 			});
// 		}
// 	});

// }

function setAvatar(){
	var filePath=`json/manifest.json`;
	fetch(filePath)
    .then(response => response.json()) 
    .then(data => {
		charaList = data["characters"];
		for(var i=charaList.length-1;i>=0;i--){
			charaName = charaList[i]["name"];
			charaAvatar = charaList[i]["avatar"];
			if(charaAvatar != ""){
				content = `<div class="chara_profile_avatar_select" id="${charaName}"><img src="${charaAvatar}" id="${charaName}"></div>`;
				document.getElementById("chara_list").innerHTML += content;
			}
			else{
				content = `<div class="chara_profile_avatar_select" id="${charaName}"></div>`;
				document.getElementById("chara_list").innerHTML += content;
			}
		}
    });	
}

function setGeneric(language){
	var filePath=`json/${language}/generic.json`;
	fetch(filePath)
    .then(response => {
		if (response.status === 404) {
		  window.location.href = '/404.html'; 
		} else {
			return response.json();
		}
	  }) 
    .then(data => {
		var translateKeys=Object.keys(data);
		for(var i=0;i<translateKeys.length;i++){
			var translateId = `${translateKeys[i]}_translate`;
			i < 8 ? document.getElementById(translateId).innerText = data[translateKeys[i]] : document.getElementById(translateId).innerText = `> ${data[translateKeys[i]]}`
		}
    })
	.catch(error => {
        console.error('Error:', error);
    });
}

function setProfile(language , character){
	var applyProfile = 0;
	var filePath=`json/${language}/${character}.json`;
	fetch(filePath)
    .then(response => {
		if (response.status === 404) {
		  window.location.href = '/404.html'; 
		} else {
			return response.json();
		}
	  }) 
    .then(data => {

		var name = data["name"];
		var birthday = data["birthday"];
		var favorites = data["favorites"];
		var dislikes = data["dislikes"];
		var details = data["details"];	
		var socials = data["socials"];		
		var stories = data["stories"];
		var figure = data["figure-pic"];
		
		var threeside = data["3side-view"];
		var otherpic = data["other-pictures"];
		var projectSong = data["project-song"];
		var projcetProduction = data["projcet-production"];
		
		document.getElementById('name_content').style.display = 'block';
		document.getElementById('birthday_content').style.display = 'block';
		document.getElementById('favorites_content').style.display = 'block';
		document.getElementById('dislikes_content').style.display = 'block';
		document.getElementById('details_content').style.display = 'block';
		

		name != "" ? document.getElementById('name').innerHTML = name : document.getElementById('name_content').style.display = 'none';
		birthday != "" ? document.getElementById('birthday').innerHTML = birthday : document.getElementById('birthday_content').style.display = 'none';
		favorites != "" ? document.getElementById('favorites').innerHTML = favorites : document.getElementById('favorites_content').style.display = 'none';
		dislikes != "" ? document.getElementById('dislikes').innerHTML = dislikes : document.getElementById('dislikes_content').style.display = 'none';
		details != "" ? document.getElementById('details').innerHTML = details : document.getElementById('details_content').style.display = 'none';
		figure != "" ? document.getElementById('figure').innerHTML  = `<img src="${figure}" style="width: 90%; height: 100%; object-fit: cover;"><img>` : document.getElementById('figure').innerHTML  = '';

		
		document.getElementById('socials_content').style.display = 'block';
		if(socials.length == 0){document.getElementById('socials_content').style.display = 'none';}
		else{
			document.getElementById('socials').innerText = '';
			for(var i=0;i<socials.length;i++){
				var links = socials[i]['links'];
				var username = socials[i]['username'];
				var platform = socials[i]['platform'];
				var content = `<a href=\"${links}\"><i class=\"fa fa-${platform}\"></i> ${username}</a></br>`;
				document.getElementById('socials').innerHTML +=  content;
			}
		}
		
		document.getElementById('stories_content').style.display = 'block';
		if(stories.length == 0){document.getElementById('stories_content').style.display = 'none';}
		else{
			document.getElementById('story_titles').innerText = '';
			for(var i=0;i<stories.length;i++){
				var title = stories[i]['title'];
				var color = stories[i]['color'];
				var links = stories[i]['links'];
				
				color != "" ? color = color : color = "white";
				
				var content = `<div class="side_stories_select" id="${title}">${title}</div>`;
				document.getElementById('story_titles').innerHTML +=  content;
				document.getElementById(title).style.background = color;
				document.getElementById(title).addEventListener("click", function() {
					window.location.href = links;
				});
			}
		}

		document.getElementById('side_project_content').style.removeProperty('column-count');
		document.getElementById('side_project_content').style.display = 'block';
		if(threeside.length == 0 && otherpic.length == 0 && projectSong.length == 0 && projcetProduction.length == 0){
			document.getElementById('side_project_content').style.display = 'none';
			return;
		}
		
		document.getElementById('chara_3_view_content').style.display = 'block';
		if(threeside.length == 0){document.getElementById('chara_3_view_content').style.display = 'none';}
		else{
			applyProfile +=1;
			document.getElementById('chara_3_view_list').innerText= '' ;
			for(var i=0;i<threeside.length;i++){
				var clothName = threeside[i]['cloth-name'];
				var pic = threeside[i]['pic'];
				var addition = threeside[i]['addition'];
				var content = `<div class="chara_3view_frame">
								<div class="chara_3view_title">${clothName}</div>
								<div class="chara_3view_pic">
								<img src="${pic}"><img>
								</div>
								<div class="chara_3view_foot">${addition}</div>
								</div>`;
				document.getElementById('chara_3_view_list').innerHTML += content;
			}
		}
		
		document.getElementById('other_pic_content').style.display = 'block';
		if(otherpic.length == 0){document.getElementById('other_pic_content').style.display = 'none';}
		else{
			applyProfile +=1;
			document.getElementById('chara_other_pic_list').innerText= '' ;	
			for(var i=0;i<otherpic.length;i++){
				var pic = otherpic[i];
				var content = `<div class="chara_other_pic_item"><img src="${pic}"></div>`;
				document.getElementById('chara_other_pic_list').innerHTML += content;
			}
		}
		
		document.getElementById('project_song_content').style.display = 'block';
		if(projectSong.length == 0){document.getElementById('project_song_content').style.display = 'none';}	
		else{
			applyProfile +=1;
			document.getElementById('project_song_list').innerText= '' ;
			for(var i=0;i<projectSong.length;i++){
				var pic = projectSong[i]['pic'];
				var title = projectSong[i]['title'];
				var author = projectSong[i]['author'];
				var song = projectSong[i]['song'];
				
				pic != "" ? pic = `<div class="song_pic_area" id="song_author"><img src="${pic}"></div>` : pic = "";
				author != "" ? author = `<div class="song_author id="song_author">Made By </br>${author}</div>` : author = "";
				
				var content = `<div class="song_frame_area" id="${title}">
								${pic}
								<div class="song_detail_area">
								<div class="song_title_area_frame${author != "" ? "":"_no_author"}">
									<div class="song_name_title">${title}</div>
									${author}
								</div>
								<div class="song_audio_area">
									<audio controls>
									<source src="${song}" type="audio/mpeg">
									</audio>
								</div>
								</div>
							</div>`;
				document.getElementById('project_song_list').innerHTML += content;
			}
		}
		
		document.getElementById('project_production_content').style.display = 'block';
		if(projcetProduction.length == 0){document.getElementById('project_production_content').style.display = 'none';}		
		else{
			applyProfile +=1;
			document.getElementById('project_list').innerText= '' ;
			for(var i=0;i<projcetProduction.length;i++){
				var name = projcetProduction[i]['name'];
				var pic = projcetProduction[i]['pic'];
				var contentSub = projcetProduction[i]['content'];
				
				var button = projcetProduction[i]['button'];
				var contentButton = '';
				if(button.length == 0){contentButton = ''}
				else{
					for(var j=0;j<button.length;j++){
						
					}
				}
				
				pic != "" ? pic = `<div class="other_project_pic_area"><img src="${pic}"></div>` : pic = "";
				
				var content = `	<div>
									<div class="project_title">${name}</div>
									<div class="other_detail_area">
										${pic}
										<div class="other_project_content_area">${contentSub}</div>
									</div>
									<div class="other_project_content_button_list">
										${contentButton}
									</div>
								</div>`
				document.getElementById('project_list').innerHTML += content;
			}
		}
		if(applyProfile == 1){
			document.getElementById('side_project_content').style.columnCount = 1;
		}
    })
	.catch(error => {
        console.error('Error:', error);
    });
}


setGeneric(lang);
setProfile(lang,chara);
setAvatar();

document.getElementById("chara_list").addEventListener('click', (event) => {
		if(event.target.matches("#shallow")){
			chara = 'shallow';
			setGeneric(lang);
			setProfile(lang,chara);
			history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);			
		}
		else if(event.target.matches("#shellxy")){
			chara = 'shellxy';
			setGeneric(lang);
			setProfile(lang,chara);
			history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);			
		}
		else if(event.target.matches("#bt")){
			chara = 'bt';
			setGeneric(lang);
			setProfile(lang,chara);
			history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);			
		}
    }
);

document.getElementById("language_list").addEventListener('click', (event) => {
	if(event.target.matches("#zh-cn")){
		lang = 'zh-cn';
		setGeneric(lang);
		setProfile(lang,chara);
		history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);			
	}
	else if(event.target.matches("#en-us")){
		lang = 'en-us';
		setGeneric(lang);
		setProfile(lang,chara);
		history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);		
	}
	else if(event.target.matches("#ja-jp")){
		lang = 'ja-jp';
		setGeneric(lang);
		setProfile(lang,chara);
		history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);
	}
	else if(event.target.matches("#ko-kr")){
		lang = 'ko-kr';
		setGeneric(lang);
		setProfile(lang,chara);
		history.pushState({}, '', `index.html?lang=${lang}&chara=${chara}`);	
	}
});




