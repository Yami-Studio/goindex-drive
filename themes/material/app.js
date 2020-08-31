// load in head necessary static
document.write('<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/mdui@0.4.3/dist/css/mdui.min.css">');
// markdown support
document.write('<script src="//cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js"></script>');
//copy support
document.write('<script src="//cdn.jsdelivr.net/npm/clipboard@2/dist/clipboard.min.js"></script>');
document.write('<style>.mdui-appbar .mdui-toolbar{height:56px;font-size:1pc}.mdui-toolbar>*{padding:0 6px;margin:0 2px}.mdui-toolbar>i{opacity:.5}.mdui-toolbar>.mdui-typo-headline{padding:0 1pc 0 0}.mdui-toolbar>i{padding:0}.mdui-toolbar>a:hover,a.active,a.mdui-typo-headline{opacity:1}.mdui-container{max-width:980px}.mdui-list-item{transition:none}.mdui-list>.th{background-color:initial}.mdui-list-item>a{width:100%;line-height:3pc}.mdui-list-item{margin:2px 0;padding:0}.mdui-toolbar>a:last-child{opacity:1}@media screen and (max-width:980px){.mdui-list-item .mdui-text-right{display:none}.mdui-container{width:100%!important;margin:0}.mdui-toolbar>.mdui-typo-headline,.mdui-toolbar>a:last-child,.mdui-toolbar>i:first-child{display:block}}</style>');
if(dark){document.write('<style>* {box-sizing: border-box}body{color:rgba(255,255,255,.87);background-color:#333232}.mdui-theme-primary-'+main_color+' .mdui-color-theme{background-color:#232427!important} .mdui-textfield-input{color:rgb(255, 255, 255)!important} .mdui-textfield-label{color:rgba(255, 255, 255, 0.7)!important}</style>');}
// Initialize the page and load the necessary resources
var obj_list = {};
var searchval = '';
var currentpath = '';
function init(){
    document.siteName = $('title').html();
    $('body').addClass("mdui-theme-primary-"+main_color+" mdui-theme-accent-"+accent_color);
    var html = "";
    html += `
    <header class="mdui-appbar mdui-color-theme">`
    if(dark){
        html += `
        <div id="nav" class="mdui-toolbar mdui-container mdui-text-color-white-text">
        </div>`;
    }else{
        html += `
        <div id="nav" class="mdui-toolbar mdui-container">
        </div>`;
    }
html += `
    </header>
        <div id="content" class="mdui-container"> 
        </div>`;
    $('body').html(html);
}

function render(path){
	if(path.indexOf("?") > 0){
		path = path.substr(0,path.indexOf("?"));
	}
    title(path);
    nav(path);
    if(path.substr(-1) == '/'){
    	list(path);
        if(searchval != '') {
            $('#searchInput').val(searchval);
            searchOnlyActiveDir();
        }
    }else{
	    file(path);
    }
    $(window).scrollTop(0);
    $("input[type='text']").on("click", function () {
        $(this).select();
    });
    $(".windows-btn").on("click", function () {
        //Matomo Code
        _paq.push(['trackEvent', 'Play in PotPlayer', decodeURI(path)]);
        window.location = $(this).data("href");
        return false;
    });
    $(".mac-btn").on("click", function () {
        //Matomo Code
        _paq.push(['trackEvent', 'Play in IINA', decodeURI(path)]);
        window.location = $(this).data("href");
        return false;
    });
    $(".android-btn").on("click", function () {
        //Matomo Code
        _paq.push(['trackEvent', 'Play in MXPlayer', decodeURI(path)]);
        window.location = $(this).data("href");
        return false;
    });
    $(".download-btn").on("click", function () {
        //Matomo Code
        _paq.push(['trackEvent', 'Download', decodeURI(path)]);
    });
    $(".copy-btn").on("click", function () {
        //Matomo Code
        _paq.push(['trackEvent', 'Copy', decodeURI(path)]);
    });
    if(currentpath != path) {
        currentpath = path;
        //Matomo Code
        var currentUrl = location.href;
        _paq.push(['setCustomUrl', currentUrl]);
        _paq.push(['setDocumentTitle', document.siteName+' - '+path]);
        _paq.push(['deleteCustomVariables', 'page']);
        _paq.push(['setGenerationTimeMs', 0]);
        _paq.push(['trackPageView']);
        _paq.push(['enableLinkTracking']);
    }
}

// Title
function title(path){
    path = decodeURI(path);
    $('title').html(document.siteName+' - '+path);
}

// Nav
function nav(path) {
	var html = "";
	html += `<a href="/" class="mdui-typo-headline folder">${document.siteName}</a>`;
	var arr = path.trim('/').split('/');
	var p = '/';
	if (arr.length > 0) {
		for (i in arr) {
			var n = arr[i];
			n = decodeURI(n);
            var ext = n.split('.').pop();
            if("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|flac|m4a|mp3|wav|ogg|mpg|mpeg|mkv|m2ts|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
	            p += n + "?a=view";
            }else {
                p += n + '/';
            }
			if (n == '') {
				break;
			}
			html += `<i class="mdui-icon material-icons mdui-icon-dark folder" style="margin:0;">chevron_right</i><a class="folder" href="${p}">${n}</a>`;
		}
	}
    html += `<div class="mdui-toolbar-spacer"></div>
    <a href="https://yami-s.com" target="_blank" class="mdui-btn mdui-btn-icon mdui-ripple mdui-ripple-white" mdui-tooltip="{content: 'Site Yami'}" alt="Site Yami">
      <svg id="Layer_1" height="512" viewBox="0 0 512 512" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" data-name="Layer 1"><linearGradient id="linear-gradient" gradientUnits="userSpaceOnUse" x1="256" x2="256" y1="494.61" y2="-8.44"><stop offset=".322" stop-color="#a163f5"/><stop offset=".466" stop-color="#b074ee"/><stop offset=".752" stop-color="#d8a1dd"/><stop offset=".898" stop-color="#efbad3"/></linearGradient><path d="m463.936 348.786v-181.545a24.324 24.324 0 1 0 -24.453-41.417l-158.965-90.949a24 24 0 0 0 .663-5.587 24.532 24.532 0 0 0 -49.061 0 23.98 23.98 0 0 0 .7 5.763l-159.732 91.017a24.559 24.559 0 0 0 -37.633 20.518 24.287 24.287 0 0 0 13.6 21.732v179.123a24.312 24.312 0 1 0 22.381 41.61l161.564 92.063c-.035.529-.059 1.061-.059 1.6a24.532 24.532 0 0 0 49.061 0 24.156 24.156 0 0 0 -.151-2.664l158.37-90.238a24.388 24.388 0 1 0 23.711-41.024zm-8.96-216.435a12.29 12.29 0 1 1 -12.532 12.288 12.425 12.425 0 0 1 12.532-12.288zm-180.07-86.861 157.343 90.02a23.974 23.974 0 0 0 -.071 18.078l-52.248 29.09a145.984 145.984 0 0 0 -116.518-65.978l-.7-63.878a24.6 24.6 0 0 0 12.194-7.332zm47.421 116.6c-.449-.766-.882-1.551-1.343-2.3a112.413 112.413 0 0 0 -18.959-23.666 134.046 134.046 0 0 1 41.762 23.746q-9.924 1.302-21.46 2.218zm32.621 8.259a132.271 132.271 0 0 1 22.712 32.529c-8.284 2.741-20.9 5.032-36.841 6.771a180.3 180.3 0 0 0 -12.412-36.033c9.718-.872 18.546-1.96 26.541-3.269zm-46.138-7.354c-13.557.756-28.628 1.169-45.334 1.248v-35.107c16.809 2.616 32.618 14.384 45.334 33.857zm6.717 11.613a163.847 163.847 0 0 1 13.249 36.2c-18.665 1.567-40.84 2.478-65.3 2.606v-37.17c19.43-.094 36.724-.635 52.051-1.638zm15.744 48.07a213.334 213.334 0 0 1 3.181 31.633h-70.976v-28.9c25.745-.125 48.602-1.066 67.795-2.735zm3.181 43.633a212.984 212.984 0 0 1 -3.373 32.778c-19.241-1.631-42.335-2.546-67.6-2.67v-30.11zm-5.934 44.6a161.91 161.91 0 0 1 -13.759 36.555c-16.1-1.107-33.538-1.753-51.283-1.872v-37.178c24.594.121 46.596.984 65.042 2.494zm-20.643 48.134c-12.551 18.63-28 29.885-44.4 32.437v-33.889c15.276.107 30.3.607 44.4 1.451zm13.109 1.789c.167-.273.322-.562.488-.837 7.3.586 14.255 1.269 20.762 2.047a134.044 134.044 0 0 1 -40.209 22.456 112.413 112.413 0 0 0 18.959-23.667zm6.715-12.351a178.683 178.683 0 0 0 12.866-36.439c15.856 1.7 28.331 3.956 36.6 6.687a132.39 132.39 0 0 1 -23.365 32.736c-7.928-1.153-16.709-2.152-26.1-2.985zm15.341-48.237a225.325 225.325 0 0 0 3.411-33.936h44.442a129.336 129.336 0 0 1 -8.816 41.431c-8.965-3.105-22.042-5.617-39.037-7.496zm3.411-45.936a225.533 225.533 0 0 0 -3.222-32.823c16.844-1.9 30.166-4.452 39.242-7.586a129.316 129.316 0 0 1 8.422 40.409zm-89.801-237.31a12.29 12.29 0 1 1 -12.53 12.288 12.426 12.426 0 0 1 12.53-12.288zm-72.25 156.161a179.823 179.823 0 0 0 -12.568 36.226c-14.85-1.705-26.66-3.9-34.539-6.511a132.251 132.251 0 0 1 22.868-32.694c7.455 1.151 15.551 2.148 24.239 2.979zm-12.976-13.514a134.1 134.1 0 0 1 37.656-22.12 114.151 114.151 0 0 0 -17.48 22.257c-.376.616-.729 1.26-1.1 1.885q-10.059-.869-19.077-2.022zm-2.018 61.573a225.545 225.545 0 0 0 -3.267 33.089h-42.08a129.327 129.327 0 0 1 8.421-40.41c8.658 2.99 21.172 5.451 36.925 7.321zm-3.267 45.089a225.07 225.07 0 0 0 3.457 34.2c-15.862 1.848-28.171 4.267-36.72 7.227a129.309 129.309 0 0 1 -8.816-41.431zm5.946 45.988a178.452 178.452 0 0 0 12.88 36.34c-8.538.8-16.506 1.745-23.818 2.828a132.353 132.353 0 0 1 -23.355-32.735c7.858-2.597 19.53-4.764 34.292-6.43zm19.115 47.836c.139.23.268.471.408.7a114.151 114.151 0 0 0 17.475 22.257 134.069 134.069 0 0 1 -36.39-21.069q8.753-1.065 18.507-1.888zm13.582-1c14.581-.915 30.326-1.441 46.7-1.545v34.191c-17.252-1.789-33.562-13.179-46.704-32.641zm-6.889-11.56a161.687 161.687 0 0 1 -13.772-36.471c18.911-1.63 41.723-2.565 67.359-2.691v37.178c-18.932.123-37.063.802-53.591 1.989zm-16.342-48.289a212.856 212.856 0 0 1 -3.41-32.98h73.339v30.108c-26.3.134-50.24 1.119-69.933 2.877zm-3.41-44.98a213.216 213.216 0 0 1 3.216-31.843c19.664 1.8 43.326 2.815 70.123 2.946v28.9zm5.724-43.707a163.343 163.343 0 0 1 13.4-36.364c16.509 1.206 34.734 1.882 54.22 2v37.176c-25.494-.132-48.485-1.117-67.624-2.809zm20.127-47.928c13.276-20.188 29.893-32.011 47.488-33.841v35.4c-16.924-.093-32.857-.62-47.492-1.554zm34.519-117.048a24.6 24.6 0 0 0 12.2 7.231l.7 63.855a145.989 145.989 0 0 0 -115.258 64.276l-52.253-28.983a23.988 23.988 0 0 0 -2.329-16.948zm-191.056 100.965a12.533 12.533 0 1 1 12.53 12.288 12.425 12.425 0 0 1 -12.53-12.288zm7.6 236.692a12.29 12.29 0 1 1 12.527-12.288 12.425 12.425 0 0 1 -12.531 12.288zm6-35.837v-176.594a24.569 24.569 0 0 0 17.311-8.2l51.505 28.57a141.927 141.927 0 0 0 -.514 137.254l-56.096 26.266a24.6 24.6 0 0 0 -12.21-7.296zm175.845 122.079-158.723-90.437a23.958 23.958 0 0 0 .728-13.739l56.695-26.544a145.981 145.981 0 0 0 115.88 65.112v55.25a24.6 24.6 0 0 0 -14.58 10.358zm20.576 25.48a12.29 12.29 0 1 1 12.53-12.288 12.426 12.426 0 0 1 -12.53 12.288zm20.029-26.284a24.6 24.6 0 0 0 -14.029-9.554v-55.25a145.957 145.957 0 0 0 118.9-69.868l50.728 32.326a23.953 23.953 0 0 0 .572 13.359zm161.278-112.956-50.6-32.245a141.9 141.9 0 0 0 -2.126-130.515l53.281-29.665a24.551 24.551 0 0 0 12.6 5.4v179.553a24.594 24.594 0 0 0 -13.155 7.472zm18.166 28.593a12.291 12.291 0 1 1 12.53-12.289 12.426 12.426 0 0 1 -12.53 12.289z" fill="url(#linear-gradient)"/></svg>
    </a>`;
	$('#nav').html(html);
}

// List files
function list(path){
    var content = "";
	content += `
	<div id="head_md" class="mdui-typo" style="display:none;padding: 20px 0;"></div>`;
    if(search){
        if(dark){content += `<div class="mdui-textfield"><input class="mdui-textfield-input mdui-text-color-white-text" id="searchInput" onkeyup="searchOnlyActiveDir()" type="text" placeholder="Type to search.."></input></div>`;
        }else{content += `<div class="mdui-textfield"><input class="mdui-textfield-input" id="searchInput" onkeyup="searchOnlyActiveDir()" type="text" placeholder="Type to search.."></input></div>`;}
    }
	content += `<div class="mdui-row"> 
	  <ul class="mdui-list"> 
	   <li class="mdui-list-item th"> 
	    <div class="mdui-col-xs-12 mdui-col-sm-7">
	    File
	<i class="mdui-icon material-icons icon-sort" data-sort="name" data-order="more">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-3 mdui-text-right">
        Modified Time
	<i class="mdui-icon material-icons icon-sort" data-sort="date" data-order="downward">expand_more</i>
	    </div> 
	    <div class="mdui-col-sm-2 mdui-text-right">
	     Size
	<i class="mdui-icon material-icons icon-sort" data-sort="size" data-order="downward">expand_more</i>
	    </div> 
	    </li> 
	  </ul> 
	 </div> 
	 <div class="mdui-row"> 
	  <ul id="list" class="mdui-list"> 
	  </ul> 
	 </div>
	 <div id="readme_md" class="mdui-typo" style="display:none; padding: 20px 0;"></div>
	`;
	$('#content').html(content);
    $('#list').html(`<div class="mdui-progress"><div class="mdui-progress-indeterminate"></div></div>`);
    $('#readme_md').hide().html('');
    $('#head_md').hide().html('');
    path = decodeURI(path);
    if(obj_list[path] == null) {
        $.post(path, function(data,status){
            obj_list[path] = jQuery.parseJSON(data);
            if(typeof obj_list[path] != 'null'){
                list_files(path,obj_list[path].files);
            }
        });
    }else {
        if(typeof obj_list[path] != 'null'){
            list_files(path,obj_list[path].files);
        }
    }  
}

function list_files(path,files){
    html = "";
    for(i in files){
        var item = files[i];
        var p = path+item.name+'/';
        if(item['size']==undefined){
            item['size'] = "";
        }
        var modifiedTime = utc2Taiwan(item['modifiedTime']);
        var size = formatFileSize(item['size']);
        if(item['mimeType'] == 'application/vnd.google-apps.folder'){
            html +=`<li class="mdui-list-item mdui-ripple"><a href="${p}" class="folder">
	            <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
	            <i class="mdui-icon material-icons">folder_open</i>
	              ${item.name}
	            </div>
	            <div class="mdui-col-sm-3 mdui-text-right">${modifiedTime}</div>
	            <div class="mdui-col-sm-2 mdui-text-right">${size}</div>
	            </a>
	        </li>`;
        }else{
            var p = path+item.name;
            var c = "file";
            if(item.name == "README.md"){
                 get_file(p, item, function(data){
                    markdown("#readme_md",data);
                });
            }
            if(item.name == "HEAD.md"){
	            get_file(p, item, function(data){
                    markdown("#head_md",data);
                });
            }
            var ext = p.split('.').pop();
            if("|html|php|css|go|java|js|json|txt|sh|md|mp4|webm|avi|bmp|jpg|jpeg|png|gif|flac|m4a|mp3|wav|ogg|mpg|mpeg|mkv|m2ts|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
	            p += "?a=view";
	            c += " view";
            }
            html += `<li class="mdui-list-item file mdui-ripple" target="_blank"><a gd-type="${item.mimeType}" href="${p}" class="${c}">
	          <div class="mdui-col-xs-12 mdui-col-sm-7 mdui-text-truncate">
	          <i class="mdui-icon material-icons">insert_drive_file</i>
	            ${item.name}
	          </div>
	          <div class="mdui-col-sm-3 mdui-text-right">${modifiedTime}</div>
	          <div class="mdui-col-sm-2 mdui-text-right">${size}</div>
	          </a>
	      </li>`;
        }
    }
    $('#list').html(html);
}


function get_file(path, file, callback){
	var key = "file_path_"+path+file['modifiedTime'];
	var data = localStorage.getItem(key);
	if(data != undefined){
		return callback(data);
	}else{
		$.get(path, function(d){
			localStorage.setItem(key, d);
            callback(d);
        });
	}
}



// file display ?a=view
function file(path){
	var name = path.split('/').pop();
	var ext = name.split('.').pop().toLowerCase().replace(`?a=view`,"");
	if("|html|php|css|go|java|js|json|txt|sh|md|".indexOf(`|${ext}|`) >= 0){
		return file_code(path);
	}

	if("|mp4|webm|avi|".indexOf(`|${ext}|`) >= 0){
		return file_video(path);
	}

	if("|mpg|mpeg|mkv|m2ts|rm|rmvb|mov|wmv|asf|ts|flv|".indexOf(`|${ext}|`) >= 0){
		return file_video(path);
	}
	
	if("|mp3|wav|ogg|m4a|flac|".indexOf(`|${ext}|`) >= 0){
		return file_audio(path);
	}

	if("|bmp|jpg|jpeg|png|gif|".indexOf(`|${ext}|`) >= 0){
		return file_image(path);
	}
}

// file display |html|php|css|go|java|js|json|txt|sh|md|
function file_code(path){
	var type = {
		"html":"html",
		"php":"php",
		"css":"css",
		"go":"golang",
		"java":"java",
		"js":"javascript",
		"json":"json",
		"txt":"Text",
		"sh":"sh",
		"md":"Markdown",	
	};
	var name = path.split('/').pop();
	var ext = name.split('.').pop();
	var href = window.location.origin + path;
	var content = `
<div class="mdui-container">
<pre id="editor" ></pre>
</div>
<div class="mdui-textfield">
	<label class="mdui-textfield-label">Download link</label>
	<input class="mdui-textfield-input" type="text" value="${href}" readonly/>
</div>

<script src="https://cdn.staticfile.org/ace/1.4.7/ace.js"></script>
<script src="https://cdn.staticfile.org/ace/1.4.7/ext-language_tools.js"></script>
	`;
	$('#content').html(content);
	
	$.get(path, function(data){
		$('#editor').html($('<div/>').text(data).html());
		var code_type = "Text";
		if(type[ext] != undefined ){
			code_type = type[ext];
		}
		var editor = ace.edit("editor");
	    editor.setTheme("ace/theme/ambiance");
	    editor.setFontSize(18);
	    editor.session.setMode("ace/mode/"+code_type);
	    
	    //Autocompletion
	    editor.setOptions({
	        enableBasicAutocompletion: true,
	        enableSnippets: true,
	        enableLiveAutocompletion: true,
	        maxLines: Infinity
	    });
	});
}

// file display video |mp4|webm|avi|
function file_video(path){
	var url = decodeURI(window.location.origin + path);
    var encoded_url = encodeURI(url);
	var playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent windows-btn" data-href="potplayer://${encoded_url}">Play in PotPlayer</button>`;
    if(/(Mac)/i.test(navigator.userAgent)) {
        playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent mac-btn" data-href="iina://open?url=${encoded_url}">Play in IINA</button>`;
    }
	if (/(Android)/i.test(navigator.userAgent)) {
	    playBtn = `<button class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent android-btn" data-href="intent:${encoded_url}#Intent;package=com.mxtech.videoplayer.pro;S.title=${path};end">Play in MXPlayer Pro</button>`;
        playBtn += `<br><button style="margin-top: 15px" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent android-btn" data-href="intent:${encoded_url}#Intent;package=com.mxtech.videoplayer.ad;S.title=${path};end">Play in MXPlayer Free</button>`;
	}
    if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
        var applelink = url.replace(/(^\w+:|^)\/\//, '');
        playBtn = `<a class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" href="infuse://${applelink}">Play in Infuse</a>`;
    }
    playBtn += `<br><a style="margin-top: 15px" href="${encoded_url}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent download-btn">Direct Download</a>`;
    playBtn += `<br><button style="margin-top: 15px" class="btn mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent copy-btn" data-clipboard-text="${encoded_url}">Copy Download Link to Clipboard</button>`;
	var content = `
<div class="mdui-container-fluid">
	<br>${playBtn}
	<!-Fixed label->
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">download link</label>
	  <input class="mdui-textfield-input" type="text" value="${url}" readonly/>
	</div>
</div>
	`;
	$('#content').html(content);
}

// file display music |mp3|m4a|wav|ogg|
function file_audio(path){
	var url = decodeURI(window.location.origin + path);
    var playBtn = `<br><a style="margin-top: 15px" href="${url}" class="mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent">Direct Download</a>`;
    playBtn += `<br><button style="margin-top: 15px" class="btn mdui-btn mdui-btn-raised mdui-ripple mdui-color-theme-accent" data-clipboard-text="${url}">Copy Download Link to Clipboard</button>`;
	var content = `
<div class="mdui-container-fluid">
	<br>
	<audio class="mdui-center" preload controls>
	  <source src="${url}"">
	</audio>
	<br>${playBtn}
	<!-Fixed label->
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">Download link</label>
	  <input class="mdui-textfield-input" type="text" value="${url}" readonly/>
	</div>
</div>
	`;
	$('#content').html(content);
}


// picture display
function file_image(path){
	var url = decodeURI(window.location.origin + path);
	var content = `
<div class="mdui-container-fluid">
	<br>
	<img class="mdui-img-fluid" src="${url}"/>
	<br>
	<div class="mdui-textfield">
	  <label class="mdui-textfield-label">Download link</label>
	  <input class="mdui-textfield-input" type="text" value="${url}" readonly/>
	</div>
    <br>
</div>`;
	$('#content').html(content);
}

function searchOnlyActiveDir() {
	var e, t, n, l;
    searchval = document.getElementById("searchInput").value;
	for (e = document.getElementById("searchInput").value.toUpperCase(), t = document.getElementById("list").getElementsByTagName("li"), l = 0; l < t.length; l++)((n = t[l].getElementsByTagName("a")[0]).getElementsByTagName("div")[0].textContent || n.innerText).toUpperCase().indexOf(e) > -1 ? t[l].style.display = "" : t[l].style.display = "none"
}

// time conversion
function utc2Taiwan(utc_datetime) {
    // change to normal time format year-month-day hour: minutes: seconds
    var T_pos = utc_datetime.indexOf('T');
    var Z_pos = utc_datetime.indexOf('Z');
    var year_month_day = utc_datetime.substr(0, T_pos);
    var hour_minute_second = utc_datetime.substr(T_pos + 1, Z_pos - T_pos - 1);
    var new_datetime = year_month_day + " " + hour_minute_second;

    // processing becomes a timestamp
    timestamp = new Date(Date.parse(new_datetime));
    timestamp = timestamp.getTime();
    timestamp = timestamp / 1000;

    // Add 7 hours, Jakarta time is eight more time zones than UTC time
    var unixtimestamp = timestamp + 8 * 60 * 60;

    // timestamp into time
    var unixtimestamp = new Date(unixtimestamp * 1000);
    var year = 1900 + unixtimestamp.getYear();
    var month = "0" + (unixtimestamp.getMonth() + 1);
    var date = "0" + unixtimestamp.getDate();
    var hour = "0" + unixtimestamp.getHours();
    var minute = "0" + unixtimestamp.getMinutes();
    var second = "0" + unixtimestamp.getSeconds();
    return year + "-" + month.substring(month.length - 2, month.length) + "-" + date.substring(date.length - 2, date.length) +
        " " + hour.substring(hour.length - 2, hour.length) + ":" +
        minute.substring(minute.length - 2, minute.length) + ":" +
        second.substring(second.length - 2, second.length);
}

// bytes conversion to KB, MB, GB
function formatFileSize(bytes) {
    if (bytes>=1000000000) {bytes=(bytes/1000000000).toFixed(2)+' GB';}
    else if (bytes>=1000000)    {bytes=(bytes/1000000).toFixed(2)+' MB';}
    else if (bytes>=1000)       {bytes=(bytes/1000).toFixed(2)+' KB';}
    else if (bytes>1)           {bytes=bytes+' bytes';}
    else if (bytes==1)          {bytes=bytes+' byte';}
    else                        {bytes='';}
    return bytes;
}

String.prototype.trim = function (char) {
    if (char) {
        return this.replace(new RegExp('^\\'+char+'+|\\'+char+'+$', 'g'), '');
    }
    return this.replace(/^\s+|\s+$/g, '');
};

// README.md HEAD.md support
function markdown(el, data){
    if(window.md == undefined){
        //$.getScript('https://cdn.jsdelivr.net/npm/markdown-it@10.0.0/dist/markdown-it.min.js',function(){
        window.md = window.markdownit();
        markdown(el, data);
        //});
    }else{
        var html = md.render(data);
        $(el).show().html(html);
    }
}

// Listen for fallback events
window.onpopstate = function(){
    if(currentpath.substr(-1) == '/') searchval = '';
    var path = window.location.pathname;
    render(path);
}

$(function(){
    init();
    var path = window.location.pathname;
    var cp = new ClipboardJS('.btn');
    $("body").on("click",'.folder',function(){
        path = decodeURI(window.location.pathname);
        var url = $(this).attr('href');
        if(url == '/' && path == url) searchval = '';
        if((url != '/' && path == url) || (url.substr(-1) == '/' && path.substr(-1) == '/')) searchval = '';
        history.pushState(null, null, url);
        render(url);
        return false;
    });

    $("body").on("click",'.view',function(){
        var url = $(this).attr('href');
        history.pushState(null, null, url);
        render(url);
        return false;
    });
    
    render(path);
});
