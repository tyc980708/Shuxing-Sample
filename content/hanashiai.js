	//Shit ton of codes here because i'm too lazy to have another file and link them back and forth.
	//Hanashiai-BOT Logic:
	//Wait for input.
	//Receives input.
	//Display a loading icon and wait for a random amount of time.
	//Send back message by using jquery
	//Restart the loop.
	
	//One at a time, no rush. Button is disabled until responded.
	
	let usermessage = "";
	let botmessage = "";
	let messagebackup = "";
	let messagequeue = [];
	queueindex = 0;
	var audio = new Audio('../audio/notification_sound.mp3');
	
	audio.play();
	
	var kaken = 0;
		
		var chatMap = new Map();
	chatMap.set("你好", ["<img src='./botemoji/greetings.jpg'></img>",""]);
	chatMap.set("早上好", ["<img src='./botemoji/gm.gif'></img>",""]);
	chatMap.set("早安", ["<img src='./botemoji/gm.gif'></img>",""]);
	chatMap.set("早", ["<img src='./botemoji/gm.gif'></img>",""]);
	chatMap.set("晚上好", ["<img src='./botemoji/gn.gif'></img>",""]);
	chatMap.set("再见", ["再见←A←"]);
	//chatMap.set("再见", ["再见←A←"]);
	chatMap.set("关于", ["HaNA(SH1)41-Bot<br/>Generation:Genesis0:01<br/>Created by Alligrater, Serve for Alligrater.<br/>The world ends when the world ends when the world ends..."]);
	chatMap.set("你是谁", ["我是Alligrater创造出的第一代聊天机器人Hanashiai-Bot. 正式一点的名字叫HaNA(SH1)41-Bot[Genesis0:01]。这个页面现在由我来负责管理哟~★"]);
	chatMap.set("推荐", ["<center>今日的推荐是……<br/><a href=\"./creations.html\" class=\"textlink\">作品页！</a><br/>非常有意思哟！<center/>"]);
	chatMap.set("alligrater", ["写代码不打草稿的屑"]);
	chatMap.set("bilibili", ["<center>不来看一发吗（诱惑）<br/><a href=\"http://space.bilibili.com/2936578\" class=\"textlink\">前往哔哩哔哩动画</a></center>"]);
	chatMap.set("哔哩哔哩", ["<center>不来看一发吗（诱惑）<br/><a href=\"http://space.bilibili.com/2936578\" class=\"textlink\">前往哔哩哔哩动画</a></center>"]);
	chatMap.set("github", ["<center>不来掉头发吗（谢顶）<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Github</a></center>"]);
	chatMap.set("gayhub", ["<center>不来掉头发吗（谢顶）<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Gayhub</a></center>"]);
	chatMap.set("喜欢", ["←U←"]);
	chatMap.set("讨厌", ["→U→"]);
	chatMap.set("siri", ["谁啊，不认识……"]);
	chatMap.set("alexa", ["谁啊，不认识……"]);
	chatMap.set("谷歌娘", ["谁啊，不认识……"]);
	chatMap.set("认识", ["不认识，下一个"]);
	chatMap.set("联络", ["QQ:201258779<br/>邮箱:Alligrater@outlook.com"]);
	chatMap.set("上古野良缝合怪", ["借代码一时爽，一直借一直爽"]);
	chatMap.set("♂", ["Boy♂Next♂Door"]);
	chatMap.set("嘤嘤", ["一拳一个嘤嘤怪！"]);
	chatMap.set("brain power", ["O-oooooooooo","AAAAE-A-A-I-A-U-","JO-oooooooooooo","AAE-O-A-A-U-U-A-","E-eee-ee-eee","AAAAE-A-E-I-E-A-","JO-ooo-oo-oo-oo","EEEEO-A-AAA-AAAA"]);
	chatMap.set("有freestyle", ["<audio autoplay><source src=\"./botemoji/skr.mp3\" type=\"audio/mpeg\"></audio>哎","哎","哎","准备好了没有","你看这个面它又长又宽","就像这个碗它又大又圆","你们","来这里","吃饭","觉得","饭很","好","吃","我看行","你们","来这里","吃饭","就像","我给你们拉面一样很开心，哎"]);
	chatMap.set("孙悟空有几个女朋友", ["戏说不是胡说,改编不是乱编","孙悟空叫白骨精叫晶晶，白骨精叫孙悟空叫空空","人妖不分，是非颠倒","这样的编剧是要向全国人民谢罪的"]);
	chatMap.set("身份证", ["我有两张分身证，一张叫Alligrater，一张叫大葱坷垃"]);
	chatMap.set("音乐", ["<audio autoplay><source src=\"./botemoji/6234.mp3\" type=\"audio/mpeg\"></audio>💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃"]);
	function hanashiai(){
		if(usermessage != ""){
			console.log(usermessage);
			//上古野良缝合怪(指这一块的代码也是照搬现有的东西)
			var canfind = false;
			if(usermessage.toLowerCase().indexOf("我") > -1 && usermessage.toLowerCase().indexOf("是谁") > -1 ){
				usermessage = document.getElementById('chatbox').value;
				var div = document.getElementById('chatarea');
				greetingmessage = document.createElement("div")
				greetingmessage.innerHTML = "<center>当你在读到这段话的时候<br/>你已经昏迷10年了<br/>我们正在尝试新的治疗方案<br/>我不知道这段信息会出现在你梦境的哪里<br/>但我们希望你能够看到<br/>请赶快醒来</center>";
				greetingmessage.className = "mikata";
				div.insertBefore(greetingmessage, div.lastChild.nextSibling);
				window.scrollTo(0,document.body.scrollHeight);
				canfind = true;
				document.getElementById('sendbutton').disabled = false;
			}/*
			else if(usermessage.toLowerCase().indexOf("你好") > -1){
				var div = document.getElementById('chatarea');
				greetingmessage = document.createElement("div")
				greetingmessage.innerHTML = "你";
				greetingmessage.className = "aite";
				greetingmessage.id = "incomplete";
				div.insertBefore(greetingmessage, div.lastChild.nextSibling);
				window.scrollTo(0,document.body.scrollHeight);
				canfind = true;
				//meant to be broken af
				timer = setTimeout('incompletesend()', 80);
			}*/
			else{
				for (var entry of chatMap.entries()) {
					var key = entry[0],
					value = entry[1];
					if(usermessage.toLowerCase().indexOf(key) > -1){
						messagequeue = value;
						botmessage = messagequeue[0];
						canfind = true;
					}
				}
			}

			if(usermessage.toLowerCase().indexOf("关键字") > -1 || usermessage.toLowerCase().indexOf("关键词") > - 1){
				
				botmessage = "以下是我认识的所有关键字： <br/>";
				for (var entry of chatMap.entries()) {
					botmessage += entry[0] + " | ";
				}
				messagequeue = [botmessage];
				canfind = true;
			}

			if(canfind == false){
				if(Math.random() > 0.9){
					botmessage = "(D20+1>25)你没有收获任何相关的信息……（绝望）"
					messagequeue = [botmessage];
				}/*
				else if(Math.random() > 0.8){
					messagequeue = ["<img src='./botemoji/nayan.gif'></img>","怎么搞得像我听得懂一样"];
				}
				else if(Math.random() > 0.7){
					botmessage = "这种东西我怎么会知道呢（心虚）"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.6){
					messagequeue = ["不懂的东西问100遍我也不会懂的，不过问1000遍可能就不一样了"];
				}*/
				else if(Math.random() > 0.5){
					messagequeue = ["<center><font color=\"red\">ERROR: SYS_CONNECTION_FAILURE<br/>LEVEL: SEVERE<br/>ACTION REQUIRED<br/><a background-color='#FF0000' color='#111111' class='textlink' onclick='override()'>OVERRIDE</a></font><center>"];
				}
				else if(Math.random() > 0.4){
					botmessage = "你再问一句这样的话我就……好像也不能把你怎么样（悲）"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.3){
					botmessage = "to SERVER: \"用户提出了不该问的问题，是否排除？\""
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.2){
					botmessage = "听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.1){
					botmessage = "好厉害好厉害（完全没在听）"
					messagequeue = [botmessage];
				}
				else{
					botmessage = "よくわからんな...（困惑）"
					messagequeue = [botmessage];
				}

			}
			
			//Hanashiai-BOT now recognize your word and is waiting to input soon.
			usermessage = "";
		}
		//Completes all chat and once again allow chat
		if(messagequeue[0] != null){
			timer = setTimeout('botsend()', 10*botmessage.length + Math.random()*200+800);//botsend();
		}
		
		//Simple infinite loop, tuned down for lower grade pcs.
	}
	
	/*Client Side Message Sending*/
	function message(){
		if(document.getElementById('chatbox').value == ""){
			
			return;
		}
		usermessage = document.getElementById('chatbox').value;
		messagebackup = usermessage;
		var div = document.getElementById('chatarea');
		greetingmessage = document.createElement("div")
		greetingmessage.innerHTML = usermessage;
		greetingmessage.className = "mikata";
		
		div.insertBefore(greetingmessage, div.lastChild.nextSibling);
		document.getElementById('sendbutton').disabled = true;
		
		//Always scroll to bottom, witchery.
		window.scrollTo(0,document.body.scrollHeight);
		document.getElementById('chatbox').value = "";
		document.getElementById('chatbox').placeholder = "ロボットが入力しています..."
		timer = setTimeout('hanashiai()', 400);
	}
	
	/*Bot Side Message Sending*/
	function botsend(){
		if(messagequeue[queueindex] == null){
			//timer = setTimeout('hanashiai()', 400);
			window.scrollTo(0,document.body.scrollHeight);
			return;
		}
		if(messagequeue[queueindex] == ""){
			window.scrollTo(0,document.body.scrollHeight);
			queueindex = 0;
			messagequeue = []; //Finished sending all messages in the queue
			document.getElementById('chatbox').placeholder = "言いたいことを書いてください..."
			document.getElementById('sendbutton').disabled = false;
			return;
		}
		var div = document.getElementById('chatarea');
		greetingmessage = document.createElement("div")
		greetingmessage.innerHTML = messagequeue[queueindex];
		greetingmessage.className = "aite";
		
		div.insertBefore(greetingmessage, div.lastChild.nextSibling);
		audio.play();
		//Always scroll to bottom, witchery.
		window.scrollTo(0,document.body.scrollHeight);
		queueindex += 1;
		if(messagequeue[queueindex] != null){
		//Calls botsend if the bot have something to say
			window.scrollTo(0,document.body.scrollHeight);
			timer = setTimeout('botsend()', 10*messagequeue[queueindex].length + Math.random()*200+800);//botsend();
			
		}
		else{
			queueindex = 0;
			messagequeue = []; //Finished sending all messages in the queue
			document.getElementById('chatbox').placeholder = "言いたいことを書いてください..."
			document.getElementById('sendbutton').disabled = false;
			return;
		}


	}
	
	function override(){
		var aite = document.getElementsByClassName("aite");
		var i;
		for (i = 0; i < aite.length; i++) {
			aite[i].innerHTML = "<img src='./botemoji/boom.gif'></img>";
		}
		var nuke = new Audio('./botemoji/nuke.mp3');
		nuke.play();
		window.scrollTo(0,document.body.scrollHeight);
	}
	
	/*function incompletesend(){
		kaken += 1;
		if(kaken > 30){
			var content = document.getElementById('incomplete');
			content.innerHTML += "好";
		}
		window.scrollTo(0,document.body.scrollHeight);
		var content = document.getElementById('incomplete');
		if(Math.random() > 0.5){
			content.innerHTML += "锟斤拷";
		}
		else{
			content.innerHTML += "烫";
		}
		
		timer = setTimeout('incompletesend()', 80);
		
	}*/
	
	/*Sends his greetings*/
	function greetings(){
		messagequeue = ['你好！我是HaNA(SH1)41-Bot。有什么问题都可以来问我哟~！<br/>你可以试试向我用这些关键字发问：<br/>推荐 | Alligrater | 你是谁 | 哔哩哔哩<br/>实际存在的关键词比这个要多，还请多加尝试。','*偷偷告诉你个秘密，你可以跟我说\"关键词\"来查看所有的关键词。*' ]
		queueindex = 0;
		timer = setTimeout('botsend()', 10*messagequeue[0].length + Math.random()*200+800);//botsend();
	}