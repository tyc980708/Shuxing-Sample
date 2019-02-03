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
		
	
	/*HanashiaiBot Retrieves Message from here*/
	eval(function(p,a,c,k,e,d){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--){d[e(c)]=k[c]||e(c)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('x 0=y w();0.1("你好",["你好呀←U←"]);0.1("再见",["再见←A←"]);0.1("关于",["n(q)i-e<2/>B:g:h<2/>v z 4, K C 4.<2/>D 9 c r s 9 c r s 9 c..."]);0.1("你是谁",["我是4创造出的第一代聊天机器人F-e. 正式一点的名字叫n(q)i-e[g:h]。这个页面现在由我来负责管理哟~★"]);0.1("推荐",["<3>今日的推荐是……<2/><a 8=\\"./G.H\\" 7=\\"6\\">作品页！</a><2/>非常有意思哟！<3/>"]);0.1("J",["写代码不打草稿的屑"]);0.1("d",["<3>不来看一发吗（诱惑）<2/><a 8=\\"k://m.d.5/t\\" 7=\\"6\\">前往哔哩哔哩动画</a></3>"]);0.1("哔哩哔哩",["<3>不来看一发吗（诱惑）<2/><a 8=\\"k://m.d.5/t\\" 7=\\"6\\">前往哔哩哔哩动画</a></3>"]);0.1("b",["<3>不来掉头发吗（谢顶）<2/><a 8=\\"j://l.b.5/4\\" 7=\\"6\\">Q</a></3>"]);0.1("11",["<3>不来掉头发吗（谢顶）<2/><a 8=\\"j://l.b.5/4\\" 7=\\"6\\">L</a></3>"]);0.1("喜欢",["←U←"]);0.1("讨厌",["→U→"]);0.1("10",["谁啊，不认识……"]);0.1("Z",["谁啊，不认识……"]);0.1("谷歌娘",["谁啊，不认识……"]);0.1("认识",["不认识，下一个"]);0.1("联络",["13:16<2/>邮箱:4@14.5"]);0.1("上古野良缝合怪",["借代码一时爽，一直借一直爽"]);0.1("♂",["15♂17♂12"]);0.1("嘤嘤",["一拳一个嘤嘤怪！"]);0.1("X Y",["O-P","o-A-A-I-A-U-","u-N","M-O-A-A-U-U-A-","E-p-R-p","o-A-E-I-E-A-","u-S-f-f-f","W-A-V-T"]);0.1("大碗宽面",["哎","哎","准备好了没有","你看这个面它又长又宽","就像这个碗它又大又圆","你们","来这里","吃饭","觉得","饭很","好","吃","我看行","你们","来这里","吃饭","就像","我给你们拉面一样很开心，哎"]);0.1("孙悟空有几个女朋友",["戏说不是胡说,改编不是乱编","孙悟空叫白骨精叫晶晶，白骨精叫孙悟空叫空空","人妖不分，是非颠倒","这样的编剧是要向全国人民谢罪的"]);0.1("身份证",["我有两张分身证，一张叫4，一张叫大葱坷垃"]);',62,70,'chatMap|set|br|center|Alligrater|com|textlink|class|href|world||github|ends|bilibili|Bot|oo|Genesis0|01|41|https|http|www|space|HaNA|AAAAE|eee|SH1|when|the|2936578|JO|Created|Map|var|new|by||Generation|for|The||Hanashiai|creations|html||alligrater|Serve|Gayhub|AAE|oooooooooooo||oooooooooo|Github|ee|ooo|AAAA||AAA|EEEEO|brain|power|alexa|siri|gayhub|Door|QQ|outlook|Boy|201258779|Next'.split('|'),0,{}))

	function hanashiai(){
		if(usermessage != ""){
			console.log(usermessage);
			//上古野良缝合怪(指这一块的代码也是照搬现有的东西)
			var canfind = false;
			if(usermessage.toLowerCase().indexOf("我") > -1 && usermessage.toLowerCase().indexOf("是谁") > -1 ){
				usermessage = document.getElementById('chatbox').value;
				var div = document.getElementById('chatarea');
				greetingmessage = document.createElement("p");
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
				if(Math.random() > 0.8){
					botmessage = "(D20+1>25)你没有收获任何相关的信息……（绝望）"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.6){
					botmessage = "这种东西我怎么会知道呢（心虚）"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.4){
					botmessage = "你再问一句这样的话我就……好像也不能把你怎么样（悲）"
					messagequeue = [botmessage];
				}
				else if(Math.random() > 0.2){
					botmessage = "听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂听不懂"
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
		greetingmessage = document.createElement("p");
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
			timer = setTimeout('hanashiai()', 400);
			return;
		}
		var div = document.getElementById('chatarea');
		greetingmessage = document.createElement("p");
		greetingmessage.innerHTML = messagequeue[queueindex];
		greetingmessage.className = "aite";
		
		div.insertBefore(greetingmessage, div.lastChild.nextSibling);
		audio.play();
		//Always scroll to bottom, witchery.
		window.scrollTo(0,document.body.scrollHeight);
		queueindex += 1;
		if(messagequeue[queueindex] != null){
		//Calls botsend if the bot have something to say
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