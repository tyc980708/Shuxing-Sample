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
	var buttonclicked;
	
	audio.play();
	
	var kaken = 0;
		
	var chatMap = new Map();
	chatMap.set("你好", [["<img src='./botemoji/greetings.jpg'></img>",""],["<img src='./botemoji/greetings_alt1.jpg'></img>",""],["<img src='./botemoji/greetings_alt2.jpg'></img>",""]]);
	chatMap.set("早上好", [["<img src='./botemoji/gm.gif'></img>",""]]);
	chatMap.set("早安", [["<img src='./botemoji/gm.gif'></img>",""]]);
	chatMap.set("早", [["<img src='./botemoji/gm.gif'></img>",""]]);
	chatMap.set("中午好", [["<img src='./botemoji/gnoon.gif'></img>",""]]);
	chatMap.set("下午好", [["<img src='./botemoji/ga.gif'></img>",""]]);
	chatMap.set("晚上好", [["<img src='./botemoji/gn.gif'></img>",""]]);
	chatMap.set("再见", [["再见←A←"]]);
	//chatMap.set("再见", [["再见←A←"]]);
	chatMap.set("关于", [["HaNA(SH1)41-Bot<br/>Generation:Genesis2:01<br/>Created by Alligrater, Serve for Alligrater.<br/>The world ends when the world ends when the world ends..."]]);
	chatMap.set("你是谁", [["我是Alligrater创造出的第一代聊天机器人Hanashiai-Bot. 正式一点的名字叫HaNA(SH1)41-Bot[[Genesis2:01]]。这个页面现在由我来负责管理哟~★"]]);
	chatMap.set("推荐", [["<center>今日的推荐是……<br/><a href=\"./creations.html\" class=\"textlink\">作品页！</a><br/>非常有意思哟！<center/>"],["<center>今日的推荐是……<br/><a href=\"./hanashiai.html\" class=\"textlink\">我 推 荐 我 自 己</a><br/>非常有意思哟！<center/>"]]);
	chatMap.set("alligrater", [["写代码不打草稿的屑"]]);
	chatMap.set("bilibili", [["<center>不来看一发吗（诱惑）<br/><a href=\"http://space.bilibili.com/2936578\" class=\"textlink\">前往哔哩哔哩动画</a></center>"]]);
	chatMap.set("哔哩哔哩", [["<center>不来看一发吗（诱惑）<br/><a href=\"http://space.bilibili.com/2936578\" class=\"textlink\">前往哔哩哔哩动画</a></center>"]]);
	chatMap.set("github", [["<center>不来掉头发吗（谢顶）<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Github</a></center>"],["<center>全球最大的程序员同性交友网站<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Github</a></center>"]]);
	chatMap.set("gayhub", [["<center>不来掉头发吗（谢顶）<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Gayhub</a></center>"],["<center>全球最大的程序员同性交友网站<br/><a href=\"https://www.github.com/Alligrater\" class=\"textlink\">Gayhub</a></center>"]]);
	chatMap.set("喜欢", [["←U←"]]);
	chatMap.set("讨厌", [["→U→"]]);
	chatMap.set("siri", [["谁啊，不认识……"]]);
	chatMap.set("alexa", [["谁啊，不认识……"]]);
	chatMap.set("谷歌娘", [["谁啊，不认识……"]]);
	chatMap.set("认识", [["不认识，下一个"]]);
	chatMap.set("联络", [["QQ:201258779<br/>邮箱:Alligrater@outlook.com"]]);
	chatMap.set("上古野良缝合怪", [["借代码一时爽，一直借一直爽"]]);
	chatMap.set("♂", [["Boy♂Next♂Door"]]);
	chatMap.set("嘤嘤", [["一拳一个嘤嘤怪！"]]);
	chatMap.set("brain power", [["O-oooooooooo","AAAAE-A-A-I-A-U-","JO-oooooooooooo","AAE-O-A-A-U-U-A-","E-eee-ee-eee","AAAAE-A-E-I-E-A-","JO-ooo-oo-oo-oo","EEEEO-A-AAA-AAAA"]]);
	chatMap.set("有freestyle", [["<audio autoplay><source src=\"./botemoji/skr.mp3\" type=\"audio/mpeg\"></audio>哎","哎","哎","准备好了没有","你看这个面它又长又宽","就像这个碗它又大又圆","你们","来这里","吃饭","觉得","饭很","好","吃","我看行","你们","来这里","吃饭","就像","我给你们拉面一样很开心，哎"]]);
	chatMap.set("孙悟空有几个女朋友", [["戏说不是胡说,改编不是乱编","孙悟空叫白骨精叫晶晶，白骨精叫孙悟空叫空空","人妖不分，是非颠倒","这样的编剧是要向全国人民谢罪的"]]);
	chatMap.set("身份证", [["我有两张分身证，一张叫Alligrater，一张叫大葱坷垃"],["那天有一个保安拦住我不给进","他跟我说：“诶你不是姓“大”吗\”","怎么身份证上写的是姓\"A\"?"]]);
	chatMap.set("自动六学炮击",[["戏说不是胡说，改编不是乱编"],["今年下半年","中美合拍的西游记即将正式开机","我继续扮演美猴王孙悟空","我会用美猴王艺术形象努力创造一个正能量的形象","文体两开花","弘扬中华文化"],["我刚刚见到还有哪个小朋友逮着我问","“六爷爷，孙悟空有几个女妖精的朋友啊”"]])
	chatMap.set("自动狼语炮击",[["鉴不鉴啊？","真的太鉴了"],["美国佬一个人干掉了一个师","身上还没中枪","他就是英雄","我中国人我打十几个雇佣兵我没死","我就是不行","鉴不鉴啊？","真的太鉴了"],["我是中国人！","I'm Chinese!"],["我爱国无罪"],["看不惯别看","去看美国人的片子去<br/><a href=\"https://www.netflix.com\" class=\"textlink\">美国人的片子</a></center>"]])
	chatMap.set("音乐", [["<audio autoplay><source src=\"./botemoji/6234.mp3\" type=\"audio/mpeg\"></audio>💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃💃"]]);
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
			}
			else{
				for (var entry of chatMap.entries()) {
					var key = entry[0],
					value = entry[1];
					if(usermessage.toLowerCase().indexOf(key) > -1){
						messagequeue = value[rnd(0,value.length-1)];
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
					messagequeue = ["(D20+1>25)你没有收获任何相关的信息……（绝望）"];
				}
				else if(Math.random() > 0.8){
					messagequeue = ["<img src='./botemoji/nayan.gif'></img>","怎么搞得像我听得懂一样"];
				}
				else if(Math.random() > 0.7){
					messagequeue = ["这种东西我怎么会知道呢（心虚）"];
				}
				else if(Math.random() > 0.6){
					messagequeue = ["不懂的东西问100遍我也不会懂的，不过问1000遍可能就不一样了"];
				}
				else if(Math.random() > 0.5){
					messagequeue = ["<center><font color=\"red\">ERROR: INTEL_NETWORK_FAILURE<br/>LEVEL: SEVERE<br/>MANUAL OVERRIDE REQUIRED<br/><a background-color='#FF0000' color='#111111' id='override' class='textlink' onclick='override()'><br/>OVERRIDE</a><br/>DO NOT OVERRIDE UNADVISED</font><center>"];
				}
				else if(Math.random() > 0.4){
					messagequeue = ["你再问一句这样的话我就……好像也不能把你怎么样（悲）"];
				}
				else if(Math.random() > 0.3){
					messagequeue = ["用户提出了不该问的问题，开始执行排除程式"];
				}
				else if(Math.random() > 0.2){
					messagequeue = ["听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂"];
				}
				else if(Math.random() > 0.1){
					messagequeue = ["好厉害好厉害（完全没在听）"];
				}
				else{
					messagequeue = ["よくわからんな...（困惑）"];
				}

			}
			
			//Hanashiai-BOT now recognize your word and is waiting to input soon.
			usermessage = "";
		}
		//Completes all chat and once again allow chat
		if(messagequeue[0] != null){
			timer = setTimeout('botsend()', 10*messagequeue[0].length + Math.random()*200+800);//botsend();
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
			//Scrolling fix, not best solution but works.
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
	
	/*Sends his greetings*/
	function greetings(){
		messagequeue = ['你好！我是HaNA(SH1)41-Bot。有什么问题都可以来问我哟~！<br/>你可以试试向我用这些关键字发问：<br/>推荐 | Alligrater | 你是谁 | 哔哩哔哩<br/>实际存在的关键词比这个要多，还请多加尝试。','*偷偷告诉你个秘密，你可以跟我说\"关键词\"来查看所有的关键词。*' ]
		queueindex = 0;
		timer = setTimeout('botsend()', 10*messagequeue[0].length + Math.random()*200+800);//botsend();
	}
	
	/*Summon RNGesus*/
	function rnd(lowerValue,upperValue){
		return Math.floor(Math.random() * (upperValue - lowerValue + 1) + lowerValue);
	}
	
	/*Dangerous Button, Do Not Press*/
	function override(){
		//Game Over!
		document.getElementById('override').parentNode.innerHTML = "<img src='./botemoji/boom.gif'></img>";
		var nuke = new Audio('./botemoji/nuke.mp3');
		nuke.play();
		window.scrollTo(0,document.body.scrollHeight);
		messagequeue = ["GAME OVER<br/><a background-color='#FF0000' color='#111111' class='textlink' onclick='location.reload()'>やりなおす</a>",""];
		timer = setTimeout('botsend()', 10*messagequeue[queueindex].length + Math.random()*200+800);//botsend();
		
	}
