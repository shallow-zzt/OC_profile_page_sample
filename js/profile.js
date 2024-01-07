const urlParams = new URLSearchParams(window.location.search);
const lang = urlParams.get('lang') || 'zh-cn';
const chara = urlParams.get('chara') || 'shallow';

function setGeneric(language){
	var filePath=`json/${language}/generic.json`
	fetch(filePath)
    .then(response => response.json()) 
    .then(data => {
		var translateKeys=Object.keys(data);
		for(var i=0;i<translateKeys.length;i++){
			var translateId = `${translateKeys[i]}_translate`;
			i < 8 ? document.getElementById(translateId).innerText = data[translateKeys[i]] : document.getElementById(translateId).innerText = `> ${data[translateKeys[i]]}`
		}
    });
}

function setProfile(language , character){
	var filePath=`json/${language}/${character}.json`
	fetch(filePath)
    .then(response => response.json()) 
    .then(data => {
		var avatar = data["avatar"];
		var name = data["name"];
		var birthday = data["birthday"];
		var favorites = data["favorites"];
		var dislikes = data["dislikes"];
		var nature = data["nature"];	
		var socials = data["socials"];		
		var stories = data["stories"];
		var figure = data["figure-pic"];
		
		var threeside = data["3side-view"];
		var otherpic = data["other-pictures"];
		var projectSong = data["project-song"];
		var projcetProduction = data["projcet-production"];
		
		
		name != "" ? document.getElementById('name').innerText = name : document.getElementById('name_content').style.display = 'none';
		birthday != "" ? document.getElementById('birthday').innerText = birthday : document.getElementById('birthday_content').style.display = 'none';
		favorites != "" ? document.getElementById('favorites').innerText = favorites : document.getElementById('favorites_content').style.display = 'none';
		dislikes != "" ? document.getElementById('dislikes').innerText = dislikes : document.getElementById('dislikes_content').style.display = 'none';
		nature != "" ? document.getElementById('nature').innerText = nature : document.getElementById('nature_content').style.display = 'none';
		figure != "" ? document.getElementById('figure').innerHTML  = `<img src="${figure}" style="width: 90%; height: 100%; object-fit: cover;"><img>` : document.getElementById('figure').innerHTML  = '';

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

		if(threeside.length == 0 && otherpic.length == 0 && projectSong.length == 0 && projcetProduction.length == 0){
			document.getElementById('side_project_content').style.display = 'none';
			return;
		}
		
		if(threeside.length == 0){document.getElementById('chara_3_view_content').style.display = 'none';}
		else{
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
		
		if(otherpic.length == 0){document.getElementById('other_pic_content').style.display = 'none';}
		else{
			document.getElementById('chara_other_pic_list').innerText= '' ;	
			for(var i=0;i<otherpic.length;i++){
				var pic = otherpic[i];
				var content = `<div class="chara_other_pic_item"><img src="${pic}"></div>`;
				document.getElementById('chara_other_pic_list').innerHTML += content;
			}
		}
		
		if(projectSong.length == 0){document.getElementById('project_song_content').style.display = 'none';}	
		else{
			document.getElementById('project_song_list').innerText= '' ;
			for(var i=0;i<projectSong.length;i++){
				var pic = projectSong[i]['pic'];
				var title = projectSong[i]['title'];
				var author = projectSong[i]['author'];
				var song = projectSong[i]['song'];
				
				pic != "" ? pic = `<div class="song_pic_area"><img src="${pic}"></div>` : pic = "";
				author != "" ? author = `<div class="song_author">Made By </br>${author}</div>` : author = "";
				
				var content = `<div class="song_frame_area" id="${title}">
								${pic}
								<div class="song_detail_area">
								<div class="song_title_area_frame">
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
		
		if(projcetProduction.length == 0){document.getElementById('project_production_content').style.display = 'none';}		
		else{
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
		
    });
}

setGeneric(lang);
setProfile(lang,chara);