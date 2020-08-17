const Plugin = require('../plugin');

module.exports = new Plugin({
	name: 'AOE Mod Actions',
	author: 'Algoinde#8377',
	description: 'Allows you to AOE shit.',
	color: '#00ff00',

	aoeActive: false,
	load: async () => {
		window.req = webpackJsonp.push([[], {
			'__extra_id__': (module, exports, req) => module.exports = req
		}, [['__extra_id__']]]);
		delete req.m['__extra_id__'];
		delete req.c['__extra_id__'];

		if(this.circle === undefined) {
			this.circle = document.createElement('div');
			this.circle.id = 'aoe_circle';
			this.circle.innerHTML = '<div></div>'
			this.circle.circle = this.circle.firstElementChild;
			this.circle.style.transform = "translateX(0px) translateY(0px) scale(0.5)";
			this.circle._x = 0;
			this.circle._y = 0;
			this.circle._scale = 0.5;
		let style = document.createElement('style');
			style.innerHTML = `
			.scrollableContainer-2NUZem {
				max-height: 500px;
			}

			.channelTextArea-2VhZ6z {
				background: rgba(0,0,0,0.3);
			}

			/* latin */
			@font-face {
			  font-family: 'Rock Salt';
			  font-style: normal;
			  font-weight: 400;
			  font-display: swap;
			  src: local('Rock Salt Regular'), local('RockSalt-Regular'), url(https://fonts.gstatic.com/s/rocksalt/v10/MwQ0bhv11fWD6QsAVOZrt0M6.woff2) format('woff2');
			  unicode-range: U+0030-0039;
			}
			#aoe_circle {
				top: 0;
				left: 0;
				position: fixed;
				z-index: 20000;
				will-change: transform;
				width: 917px;
				height: 917px;
				display: none;
				pointer-events: none;
				overflow: hidden;
				border-radius: 50%;
			}

			#aoe_circle div {
				transition: filter 0.3s ease;
				display: block;
				position: absolute;
				top: -1px;
				left: -1px;
				right: -1px;
				bottom: -1px;
				will-change: transform;
				background: url(//algoinde.ru/f/aoe.png) 0% 0% / contain no-repeat;
				animation: rotat 18s infinite linear;
				display: flex;
				align-items: center;
				justify-content: center;
				color: white;
				text-shadow: 0px 0px 10px #005aff, 0px 0px 3px #2590ec, 0px 0px 6px #28bef7, 0px 0px 10px #21a9ea;
				font-family: 'Rock Salt';
				font-size: 4rem;
			}
			#aoe_circle div:before {
				content: attr(data-time);
			}

			#aoe_circle div:after {
				content: "";
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				width: 500px;
				height: 500px;
				transform: translate3d(-50%,-50%,0);
			}

			@keyframes rotat {
				0% {
					transform: rotate(30deg);
				}
				100% {
					transform: rotate(390deg);
				}
			}
			@keyframes rotat2 {
				0% {
					transform: translate3d(-50%, -50%, 0) rotate(30deg);
				}
				100% {
					transform: translate3d(-50%, -50%, 0) rotate(390deg);
				}
			}
			
			.aoe-active .${EDApi.findModule('cozyMessage').cozyMessage} {
				transition: text-shadow 0.2s ease, opacity 0.2s ease, box-shadow: 0.2s ease;
			}
			
			.aoe-active {
				cursor: none;
			}

			.aoe-active #app-mount{
				pointer-events: none;
			}
			.aoe-active .${EDApi.findModule('cozyMessage').cozyMessage} {
				pointer-events: all;
			}

			.circle-pinned #aoe_circle {
			    filter: brightness(3);
			}

			.aoe-active .delete {
				box-shadow: 0px 0px 0px 200px inset rgba(200,0,0,0.13); 
				text-shadow: 1px 1px 4px rgba(200,0,0,1), -1px -1px 4px rgba(200,0,0,1), 1px 1px 4px rgba(200,0,0,1), -1px -1px 4px rgba(200,0,0,1);
				opacity: 0.8;
			}
			.tobedel {
				background-color: rgba(100,0,0,0.5);
			}
			.aoe-active .get-md {
				box-shadow: 0px 0px 0px 200px inset rgba(0,120,255,0.13); 
				text-shadow: 1px 1px 4px rgba(0,120,255,1), -1px -1px 4px rgba(0,120,255,1), 1px 1px 4px rgba(0,120,255,1), -1px -1px 4px rgba(0,120,255,1);
				opacity: 0.8;
			}
			.aoe-active .mute {
				box-shadow: 0px 0px 0px 200px inset rgba(203,6,239,0.13); 
				text-shadow: 1px 1px 4px rgba(203,6,239,1), -1px -1px 4px rgba(203,6,239,1), 1px 1px 4px rgba(203,6,239,1), -1px -1px 4px rgba(203,6,239,1);
				opacity: 0.8;
			}
			.aoe-active .unmute {
				box-shadow: 0px 0px 0px 200px inset rgba(0,200,0,0.13); 
				text-shadow: 1px 1px 4px rgba(0,200,0,1), -1px -1px 4px rgba(0,200,0,1), 1px 1px 4px rgba(0,200,0,1), -1px -1px 4px rgba(0,200,0,1);
				opacity: 0.8;
			}
			.aoe-active .ban {
				box-shadow: 0px 0px 0px 200px inset rgba(50,0,0,0.13); 
				text-shadow: 1px 1px 4px rgba(50,0,0,1), -1px -1px 4px rgba(50,0,0,1), 1px 1px 4px rgba(50,0,0,1), -1px -1px 4px rgba(50,0,0,1);
				opacity: 0.8;
			}
			.aoe-active .smug {
				box-shadow: 0px 0px 0px 200px inset rgba(150,150,150,0.13); 
				text-shadow: 1px 1px 4px rgba(150,150,150,1), -1px -1px 4px rgba(150,150,150,1), 1px 1px 4px rgba(150,150,150,1), -1px -1px 4px rgba(150,150,150,1);
				opacity: 0.8;
			}
			.aoe-active .hide {
				box-shadow: 0px 0px 0px 200px inset rgba(200,150,150,0.13); 
				text-shadow: 1px 1px 4px rgba(200,150,150,1), -1px -1px 4px rgba(200,150,150,1), 1px 1px 4px rgba(200,150,150,1), -1px -1px 4px rgba(200,150,150,1);
				opacity: 0.8;
			}
			.aoe-active .idban {
				box-shadow: 0px 0px 0px 200px inset rgba(90,0,0,0.13); 
				text-shadow: 1px 1px 4px rgba(90,0,0,1), -1px -1px 4px rgba(90,0,0,1), 1px 1px 4px rgba(90,0,0,1), -1px -1px 4px rgba(90,0,0,1);
				opacity: 0.8;
			}
			.aoe-active .dereact .${EDApi.findModule('reactions').reactions} {
				text-shadow: 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1), 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1);
				opacity: 0.8;
			}
			.aoe-active .dereact .${EDApi.findModule('reactions').reactions} .${EDApi.findModule('reaction').reaction} {
    			background-color: rgba(228, 21, 21, 0.3);
			}
			`;
			document.body.appendChild(style);
			this.dynamicStyle = document.body.appendChild(document.createElement('style'));
			this.circle = document.body.appendChild(this.circle);
		}

		// this.cM = window.EDApi.findModule('getChannelId');
		this.cM = {
			getChannelId: function() {
				if(!this.modeSelected) this.modeSelected = '.'+window.EDApi.findModule('modeSelected').modeSelected;
				return document.querySelector(this.modeSelected).__reactInternalInstance$.return.memoizedProps.channel.id;
			}
		}
		this.dM = window.EDApi.findModule('deleteMessage');
		this.ewM = window.EDApi.findModule('embedWrapper');
		this.sM = window.EDApi.findModule('sendMessage');
		this.reactionModule = EDApi.findModule('addReaction');
		this.chatContentClass = '.'+window.EDApi.findModule('chatContent').chatContent;
		this.messageClass = '.' + window.EDApi.findModule('cozyMessage').cozyMessage;
		this.textareaClass = '.'+EDApi.findModule('textAreaSlate').textArea;
		if (!this.cM || !this.dM || !this.ewM) {
			return this.error('Aborted loading - Failed to find required modules!');
		}
		this.muteDuration = 10;
		this.classList = ['delete', 'get-md', 'mute', 'unmute', 'ban', 'idban', 'smug', 'dereact', 'hide']

	   this.toggleCircle = (mode, force, cancel) => {
			if(!this.active || force) {
				this.active = true;
				this.mode = mode;
				document.body.classList.add('aoe-active');
				document.documentElement.style.cursor = 'none';
				document.body.setAttribute('data-aoe-mode',this.mode);
				this.circle.style.opacity = 0.7;
				this.circle.style.display = 'block';
				this.setCircle(false, this.x, this.y)
				this.circle.circle.setAttribute('data-time', '');
				this.highlight();
				switch(mode) {
					case 'delete':
						this.circle.circle.style.filter = "hue-rotate(-213deg)";
						break;
					case 'get-md':
						this.circle.circle.style.filter = "hue-rotate(10deg)";
						break;
					case 'mute':
						this.circle.circle.style.filter = "hue-rotate(80deg)";
						this.circle.circle.setAttribute('data-time', '10');
						break;
					case 'unmute':
						this.circle.circle.style.filter = "hue-rotate(-215deg) invert()";
						break;
					case 'ban':
						this.circle.circle.style.filter = "invert() brightness(0.4)";
						break;
					case 'idban':
						this.circle.circle.style.filter = "invert() brightness(0.6)";
						break;
					case 'hide':
						this.circle.circle.style.filter = "hue-rotate(-213deg) brightness(1.4)";
						break;
					case 'smug':
						this.circle.circle.style.filter = "saturate(0) brightness(1.6)";
					var emote = document.querySelector(this.textareaClass + ' .emoji')?document.querySelector(this.textareaClass + ' .emoji').src:'https://cdn.discordapp.com/emojis/643603380748419085.png';
						this.dynamicStyle.innerHTML = `
							.aoe-active[data-aoe-mode="smug"] #aoe_circle div:after {
							background: url(${emote}) 50% 50% / 50% auto no-repeat;
							animation: rotat2 9s infinite linear reverse;`
						break;
					case 'dereact':
						this.circle.circle.style.filter = "invert() saturate(0.2) brightness(1.6)";
						break;
					default:
						this.circle.circle.style.filter = "";
				}
			}else{
				this.mode = null;
				this.setCircle(0.5, false, false, true, cancel);
				this.circle.style.opacity = 0;
				document.removeEventListener("mousemove", this.moveListener);
				this.mouseListened = false;
				document.documentElement.style.cursor = '';
				document.body.classList.remove('aoe-active');
				document.body.setAttribute('data-aoe-mode',"");
				this.active = false;
				setTimeout(() => this.circle.style.display = 'none', 100);
			}
		}

		this.randomIntFromInterval = (min, max) => { // min and max included 
	 		return Math.floor(Math.random() * (max - min + 1) + min);
		}

		this.pinCircle = (b) => {
			this.pinned = !!b;
			document.body.classList[['remove','add'][+b]]('circle-pinned');
			if(b == false) {
				this.circle.style.transition = "";
			}
		}

		this.contextListener = (ev) => {
			if(!this.active) return;
			ev.preventDefault();
			ev.stopPropagation();
			ev.stopImmediatePropagation();
			this.toggleCircle(undefined, undefined, true);
			return false;
		}

		this.keyListener = (e) => {
			this.ctrl = e.ctrlKey == true && e.shiftKey == true;

			if(e.type == 'keydown') {
				var mode = ({
					68:	'delete', //D
					83:	'get-md', //S
					77:	'mute', //M
					71:	'unmute', //G
					89:	'ban', //Y
					76:	'idban', //Y
					87:	'smug', //W
					82:	'hide', //R
					88:	'dereact', //X
				})[e.keyCode];

				if(this.ctrl && mode) {
					this.toggleCircle(mode, this.mode != mode && this.active, this.mode == mode && this.active)
					e.preventDefault();
				}

				if(this.mode == 'mute' && +e.key > -1 && +e.key < 10) {
					if(this.keyBounce)
						this.muteDuration += '' + e.key;
					else
						this.muteDuration = e.key;
					clearTimeout(this.keyBounce);
					this.keyBounce = setTimeout(() => this.keyBounce = null, 1000);
					this.circle.firstElementChild.setAttribute('data-time', this.muteDuration);
					e.preventDefault();
				}

				if(this.ctrl && !this.mouseListened) {
					if(!this.mouseListened) document.addEventListener("mousemove", this.moveListener);
					this.mouseListened = true;
				}

			}
		}

		this.clickListener = (e) => {
			if(!this.active) return;
			if(e.which == 3) return;
			if(e.type == 'mousedown') {
				var time = ({
					'get-md': 60,
					'hide': 100,
					'smug': 200,
					'dereact': 500,
					'delete': 300,
					'mute': 1000,
					'unmute': 1000,
					'ban': 3000,
					'idban': 3000,
				})[this.mode];
				this.circle.style.transition += `filter ${time/1000}s linear`;
				this.pinCircle(true);
				this.castTimer = setTimeout(() => {
					this.applyAction();
					this.pinCircle(false);
				}, time);
				e.preventDefault();
			}else if(this.active && e.type == 'mouseup') {
				clearTimeout(this.castTimer);
				this.pinCircle(false);
				e.preventDefault();
			}
		}
		this.wheeListener = (e) => {
			if(this.active) {
				if (event.deltaY < 0) {
					this.setCircle(+this.getCircle().scale * 1.11);
				}else if(event.deltaY > 0){
					this.setCircle(+this.getCircle().scale * 0.89);
				}
				setTimeout(this.highlight.bind(this), 100);
				e.preventDefault();
				return false;
			}
		}

		this.moveListener = (e) => {
			this.x = e.pageX;
			this.y = e.pageY;
			if(!this.active || this.pinned) return;
			this.setCircle(undefined, e.pageX, e.pageY);
			setTimeout(this.highlight(),1);
			e.preventDefault();
			e.stopImmediatePropagation();
			e.stopPropagation();
		}

		this.highlight = () => {
			if(!this.messageDebounce) {
			var prevArray = this.messageArray;
				this.messageArray = Array.prototype.slice.call(this.getMessages(true));
				if(prevArray){
				var leftovers = prevArray.filter(value => !this.messageArray.includes(value));
					leftovers.forEach(item => {
						item.classList.remove(...this.classList);
					});
				}
				this.messageArray.forEach(item => {
					item.classList.remove(...this.classList);
					item.classList.add(this.mode);
					if(item.timerino) {
						clearTimeout(item.timerino);
					}
					//item.timerino = setTimeout(() => item.classList.remove(...this.classList), 15000);
				})
				this.messageDebounce = true;
				setTimeout(() => this.messageDebounce = false, 100);
			}
		}

		this.setCircle = (scale, x, y, fade, cancel) => {
		let values = this.getCircle();
		let rect = this.circle.getBoundingClientRect();
			if(scale) {
				if(fade) {
				var oldScale = values.scale;
					if(cancel)
						scale = +values.scale * scale;
					else
						scale = +values.scale + scale;
					this.circle.style.transition = "transform 0.1s ease, opacity 0.1s ease";
				}else{
					this.circle.style.transition = "transform 0.1s ease-in-out";
				}
				setTimeout(() => {
					this.circle.style.transition = ""
					this.setCircle(oldScale);
				}, 100)
				values.scale = scale;
			}
			if(x) values.x = x - 917*0.5;
			if(y) values.y = y - 917*0.5;
			this.circle.style.transform = `translateX(${values.x}px) translateY(${values.y}px) scale(${values.scale})`;
			this.circle._x = values.x;
			this.circle._y = values.y;
			this.circle._scale =  values.scale;
		}

		this.getCircle = () => {
			return {
				x: this.circle._x,
				y: this.circle._y,
				scale: this.circle._scale
			};
		}

		this.getMessages = (getElements) => {
			if(this.pinned) return this.messagesCache;
		let rect = this.circle.getBoundingClientRect()
		let up = Math.max(0, rect.top) + rect.height * 0.1;
		let down = rect.height + rect.top - rect.height * 0.1;
		let x = Math.round(document.querySelector(this.chatContentClass).getBoundingClientRect().left) + 40;
		let messages = [];
			for(var y=up; y<down; y+=24) {
			let elm = document.elementFromPoint(x,y);
				// if(elm == this.circle) {
				// 	y-=20;
				// 	x+=50;
				// 	continue;
				// }
				if(elm && elm.closest) {
					elm = elm.closest(this.messageClass);
				}else{
					continue;
				}
				if(elm
				&& elm.__reactInternalInstance$
				&& elm.__reactInternalInstance$.return
				&& elm.__reactInternalInstance$.return.return
				&& elm.__reactInternalInstance$.return.return.key) {
				var id = elm.__reactInternalInstance$.return.return.key;
					if(messages.includes(elm) || messages.includes(id)) continue;
					if(getElements) {
						messages.push(elm);
					}else{
						messages.push(id);
					}
				}
			}
			this.messagesCache = messages;

			return messages;
		}

		this.applyAction = () => {
			function shuffle(array) {
				return array.sort(() => Math.random() - 0.5);
			}
			let ids = this.getMessages(true);
			let channelId = this.cM.getChannelId();
			switch(this.mode) {
				case 'delete':
					ids = shuffle(ids);
					ids.forEach((item, i) => {
						item.classList.add('tobedel');
						setTimeout(() => {
							this.dM.deleteMessage(channelId, item.__reactInternalInstance$.return.return.key)
						}, i*350)
					})
					break;
				case 'hide':
					ids.forEach((item, i) => {
						item.parentNode.removeChild(item);
					})
					break;
				case 'get-md':
				var string = '';
					for (var i = 0; i < ids.length; i++) {
						if(i > 0) string+="\n";
						string += ids[i].__reactInternalInstance$.memoizedProps.children[1].props.message.content;
					}
					navigator.clipboard.writeText(string);
					break;
				case 'mute':
				case 'unmute':
				case 'ban':
				let message = ({
						'mute': (userID) => `.mute ${userID} ${this.muteDuration}m AoE-muted`,
						'unmute': (userID) => `.unmute ${userID} AoE-unmuted`,
						'ban': (userID) => `.ban ${userID} AoE-banned`
					})[this.mode];
					([...new Set(ids.map(userID => userID.__reactInternalInstance$.memoizedProps.children[1].props.message.author.id))])
						.forEach((userID, i) => {
							setTimeout(() => {
								this.sM.sendMessage(channelId, {content: message(userID)})
							}, i*350)
						})
					break;
				case 'idban':
				var string = '';
					for (var i = 0; i < ids.length; i++) {
						if(i > 0) string+="\n";
						string += ids[i].__reactInternalInstance$.memoizedProps.children[1].props.message.content;
					}
					string = string.split('\n');
					string.forEach((userID, i) => {
							setTimeout(() => {
								this.sM.sendMessage(channelId, {content: '.ban ' + userID + ' AoE ID-ban'})
							}, i*350)
						})
					break;
				case 'smug':
					ids = shuffle(ids);
				var emoteSource = document.querySelector(this.textareaClass + ' .emoji')
				var emote;
					if(!emoteSource){
					var text = [].map.call(document.querySelectorAll(this.textareaClass + ' [data-slate-string="true"]'), e => e.innerText).join().replace(/\n/g,'');
						if(text) {
						var emoteList = []
							text.toLowerCase().split('').forEach(letter => {
								if(!isNaN(parseInt(letter)) && !emoteList.includes(window.NUM_MAP[letter]))
									return emoteList.push(window.NUM_MAP[letter]);
								if(!emoteList.includes('regional_indicator_'+letter))
									emoteList.push('regional_indicator_'+letter)	
								else
									emoteList.push(letter+'2');
							});
							emotes = emoteList.map(emote => {
								if(emote.length > 2) {
									return {
										name: window.EMOJI_MAP[emote]
									}
								}else{
									return {
										id: window.A2_MAP[emote],
										name: emote,
										animated: false
									}
								}
							})
						}else{
							emotes = [{id: "643603380748419085", name: "KaguyaSmug", animated: false}]
						}
					} else {
					var props = emoteSource.__reactInternalInstance$.return.memoizedProps;
						emotes = [{
							id: props.emojiId,
							name: props.emojiName.replace(/:/g, ''),
							animated: props.animated
						}]
						if(emoteSource.__reactInternalInstance$.memoizedProps.src.indexOf('.svg') > -1) {
							emotes[0].name = window.EMOJI_MAP[emotes[0].name];
							if(!emotes[0].name) return;
							delete emotes[0].id;
						}

					}
				var queue = [];
					ids.forEach(item => {
						emotes.forEach(emote => {
							queue.push([item, emote])
						})
					})

					queue.forEach((pair, i) => {
					var random = this.randomIntFromInterval(800, 1200);
						setTimeout(() => {
						this.reactionModule.addReaction(channelId, pair[0].__reactInternalInstance$.return.return.key, pair[1])
						}, i*random)
						console.log(pair[1], random)
					})
					
					break;
				case 'dereact':
					ids = ids.filter(msg => msg.__reactInternalInstance$.return.return.memoizedProps.message.reactions.length > 0);
					ids = shuffle(ids);
					ids.forEach((item, i) => {
						setTimeout(() => {
							this.reactionModule.removeAllReactions(channelId, item.__reactInternalInstance$.return.return.key)
						}, i*400)
					})
					break;
			}
			this.toggleCircle();
		}

		document.addEventListener("keydown", this.keyListener);
		document.addEventListener("keyup", this.keyListener);
		document.addEventListener("mousedown", this.clickListener);
		document.addEventListener("mouseup", this.clickListener);
		document.addEventListener("wheel", this.wheeListener);
		document.addEventListener('contextmenu', this.contextListener, true);

		this.embedWrapperClass = this.ewM.embedWrapper;
		this.imgWrapperClass = EDApi.findModule('imageWrapper').imageWrapper;
		document.addEventListener("mousemove", (e) => {
			if(this.moveDebounce) return;
			this.moveDebounce = true;
			setTimeout(() => {this.moveDebounce = false}, 150)
		var img = document.elementFromPoint(e.pageX, e.pageY)
			if(img.tagName != 'IMG' || img._replaced) return;
			if(!img.closest('.'+this.embedWrapperClass)
			&& !img.closest('.'+this.imgWrapperClass)) return;
			img.src = img.src.replace(/width=[0-9]+\&height=[0-9]+/g, '');
			img._replaced = true;
		});

		window.ED.plugins.aoeshit.self = this;

		window.A2_MAP = {"a2":"313822932092715008", "b2":"313822931601850389", "c2":"313822931543130113", "d2":"313822931581140992", "e2":"313822932109492224", "f2":"313822931723616263", "g2":"313822931270500354", "h2":"313822931211780107", "i2":"313822932071743488", "j2":"313822931702513664", "k2":"313822931740524544", "l2":"313822931623084033", "m2":"313822932113686559", "n2":"313822931769753602", "o2":"313822931794919426", "p2":"313822931668959232", "q2":"313822931773947905", "r2":"313822932046708736", "s2":"313822931685998592", "t2":"313822931765559298", "u2":"313822931773816832", "v2":"313822932113686528", "w2":"313822931849445379", "x2":"313822931992051714", "y2":"313822931362775061", "z2":"313822932222738442"}

		window.NUM_MAP = {"1": "one", "2": "two", "3": "three", "4": "four", "5": "five", "6": "six", "7": "seven", "8": "eight", "9": "nine"}

		window.EMOJI_MAP = {"grinning": "\ud83d\ude00", "smiley": "\ud83d\ude03", "smile": "\ud83d\ude04", "grin": "\ud83d\ude01", "laughing": "\ud83d\ude06", "satisfied": "\ud83d\ude06", "sweat_smile": "\ud83d\ude05", "joy": "\ud83d\ude02", "rofl": "\ud83e\udd23", "rolling_on_the_floor_laughing": "\ud83e\udd23", "relaxed": "\u263a\ufe0f", "blush": "\ud83d\ude0a", "innocent": "\ud83d\ude07", "slight_smile": "\ud83d\ude42", "slightly_smiling_face": "\ud83d\ude42", "upside_down": "\ud83d\ude43", "upside_down_face": "\ud83d\ude43", "wink": "\ud83d\ude09", "relieved": "\ud83d\ude0c", "heart_eyes": "\ud83d\ude0d", "smiling_face_with_3_hearts": "\ud83e\udd70", "kissing_heart": "\ud83d\ude18", "kissing": "\ud83d\ude17", "kissing_smiling_eyes": "\ud83d\ude19", "kissing_closed_eyes": "\ud83d\ude1a", "yum": "\ud83d\ude0b", "stuck_out_tongue": "\ud83d\ude1b", "stuck_out_tongue_closed_eyes": "\ud83d\ude1d", "stuck_out_tongue_winking_eye": "\ud83d\ude1c", "zany_face": "\ud83e\udd2a", "face_with_raised_eyebrow": "\ud83e\udd28", "face_with_monocle": "\ud83e\uddd0", "nerd": "\ud83e\udd13", "nerd_face": "\ud83e\udd13", "sunglasses": "\ud83d\ude0e", "star_struck": "\ud83e\udd29", "partying_face": "\ud83e\udd73", "smirk": "\ud83d\ude0f", "unamused": "\ud83d\ude12", "disappointed": "\ud83d\ude1e", "pensive": "\ud83d\ude14", "worried": "\ud83d\ude1f", "confused": "\ud83d\ude15", "slight_frown": "\ud83d\ude41", "slightly_frowning_face": "\ud83d\ude41", "frowning2": "\u2639\ufe0f", "white_frowning_face": "\u2639\ufe0f", "persevere": "\ud83d\ude23", "confounded": "\ud83d\ude16", "tired_face": "\ud83d\ude2b", "weary": "\ud83d\ude29", "pleading_face": "\ud83e\udd7a", "cry": "\ud83d\ude22", "sob": "\ud83d\ude2d", "triumph": "\ud83d\ude24", "angry": "\ud83d\ude20", "rage": "\ud83d\ude21", "face_with_symbols_over_mouth": "\ud83e\udd2c", "exploding_head": "\ud83e\udd2f", "flushed": "\ud83d\ude33", "hot_face": "\ud83e\udd75", "cold_face": "\ud83e\udd76", "scream": "\ud83d\ude31", "fearful": "\ud83d\ude28", "cold_sweat": "\ud83d\ude30", "disappointed_relieved": "\ud83d\ude25", "sweat": "\ud83d\ude13", "hugging": "\ud83e\udd17", "hugging_face": "\ud83e\udd17", "thinking": "\ud83e\udd14", "thinking_face": "\ud83e\udd14", "face_with_hand_over_mouth": "\ud83e\udd2d", "yawning_face": "\ud83e\udd71", "shushing_face": "\ud83e\udd2b", "lying_face": "\ud83e\udd25", "liar": "\ud83e\udd25", "no_mouth": "\ud83d\ude36", "neutral_face": "\ud83d\ude10", "expressionless": "\ud83d\ude11", "grimacing": "\ud83d\ude2c", "rolling_eyes": "\ud83d\ude44", "face_with_rolling_eyes": "\ud83d\ude44", "hushed": "\ud83d\ude2f", "frowning": "\ud83d\ude26", "anguished": "\ud83d\ude27", "open_mouth": "\ud83d\ude2e", "astonished": "\ud83d\ude32", "sleeping": "\ud83d\ude34", "drooling_face": "\ud83e\udd24", "drool": "\ud83e\udd24", "sleepy": "\ud83d\ude2a", "dizzy_face": "\ud83d\ude35", "zipper_mouth": "\ud83e\udd10", "zipper_mouth_face": "\ud83e\udd10", "woozy_face": "\ud83e\udd74", "nauseated_face": "\ud83e\udd22", "sick": "\ud83e\udd22", "face_vomiting": "\ud83e\udd2e", "sneezing_face": "\ud83e\udd27", "sneeze": "\ud83e\udd27", "mask": "\ud83d\ude37", "thermometer_face": "\ud83e\udd12", "face_with_thermometer": "\ud83e\udd12", "head_bandage": "\ud83e\udd15", "face_with_head_bandage": "\ud83e\udd15", "money_mouth": "\ud83e\udd11", "money_mouth_face": "\ud83e\udd11", "cowboy": "\ud83e\udd20", "face_with_cowboy_hat": "\ud83e\udd20", "smiling_imp": "\ud83d\ude08", "imp": "\ud83d\udc7f", "japanese_ogre": "\ud83d\udc79", "japanese_goblin": "\ud83d\udc7a", "clown": "\ud83e\udd21", "clown_face": "\ud83e\udd21", "poop": "\ud83d\udca9", "shit": "\ud83d\udca9", "hankey": "\ud83d\udca9", "poo": "\ud83d\udca9", "ghost": "\ud83d\udc7b", "skull": "\ud83d\udc80", "skeleton": "\ud83d\udc80", "skull_crossbones": "\u2620\ufe0f", "skull_and_crossbones": "\u2620\ufe0f", "alien": "\ud83d\udc7d", "space_invader": "\ud83d\udc7e", "robot": "\ud83e\udd16", "robot_face": "\ud83e\udd16", "jack_o_lantern": "\ud83c\udf83", "smiley_cat": "\ud83d\ude3a", "smile_cat": "\ud83d\ude38", "joy_cat": "\ud83d\ude39", "heart_eyes_cat": "\ud83d\ude3b", "smirk_cat": "\ud83d\ude3c", "kissing_cat": "\ud83d\ude3d", "scream_cat": "\ud83d\ude40", "crying_cat_face": "\ud83d\ude3f", "pouting_cat": "\ud83d\ude3e", "palms_up_together": "\ud83e\udd32", "open_hands": "\ud83d\udc50", "raised_hands": "\ud83d\ude4c", "clap": "\ud83d\udc4f", "handshake": "\ud83e\udd1d", "shaking_hands": "\ud83e\udd1d", "thumbsup": "\ud83d\udc4d", "+1": "\ud83d\udc4d", "thumbup": "\ud83d\udc4d", "thumbsdown": "\ud83d\udc4e", "-1": "\ud83d\udc4e", "thumbdown": "\ud83d\udc4e", "punch": "\ud83d\udc4a", "fist": "\u270a", "left_facing_fist": "\ud83e\udd1b", "left_fist": "\ud83e\udd1b", "right_facing_fist": "\ud83e\udd1c", "right_fist": "\ud83e\udd1c", "fingers_crossed": "\ud83e\udd1e", "hand_with_index_and_middle_finger_crossed": "\ud83e\udd1e", "v": "\u270c\ufe0f", "love_you_gesture": "\ud83e\udd1f", "metal": "\ud83e\udd18", "sign_of_the_horns": "\ud83e\udd18", "ok_hand": "\ud83d\udc4c", "pinching_hand": "\ud83e\udd0f", "point_left": "\ud83d\udc48", "point_right": "\ud83d\udc49", "point_up_2": "\ud83d\udc46", "point_down": "\ud83d\udc47", "point_up": "\u261d\ufe0f", "raised_hand": "\u270b", "raised_back_of_hand": "\ud83e\udd1a", "back_of_hand": "\ud83e\udd1a", "hand_splayed": "\ud83d\udd90\ufe0f", "raised_hand_with_fingers_splayed": "\ud83d\udd90\ufe0f", "vulcan": "\ud83d\udd96", "raised_hand_with_part_between_middle_and_ring_fingers": "\ud83d\udd96", "wave": "\ud83d\udc4b", "call_me": "\ud83e\udd19", "call_me_hand": "\ud83e\udd19", "muscle": "\ud83d\udcaa", "mechanical_arm": "\ud83e\uddbe", "middle_finger": "\ud83d\udd95", "reversed_hand_with_middle_finger_extended": "\ud83d\udd95", "writing_hand": "\u270d\ufe0f", "pray": "\ud83d\ude4f", "foot": "\ud83e\uddb6", "leg": "\ud83e\uddb5", "mechanical_leg": "\ud83e\uddbf", "lipstick": "\ud83d\udc84", "kiss": "\ud83d\udc8b", "lips": "\ud83d\udc44", "tooth": "\ud83e\uddb7", "bone": "\ud83e\uddb4", "tongue": "\ud83d\udc45", "ear": "\ud83d\udc42", "ear_with_hearing_aid": "\ud83e\uddbb", "nose": "\ud83d\udc43", "footprints": "\ud83d\udc63", "eye": "\ud83d\udc41\ufe0f", "eyes": "\ud83d\udc40", "brain": "\ud83e\udde0", "speaking_head": "\ud83d\udde3\ufe0f", "speaking_head_in_silhouette": "\ud83d\udde3\ufe0f", "bust_in_silhouette": "\ud83d\udc64", "busts_in_silhouette": "\ud83d\udc65", "baby": "\ud83d\udc76", "girl": "\ud83d\udc67", "child": "\ud83e\uddd2", "boy": "\ud83d\udc66", "woman": "\ud83d\udc69", "adult": "\ud83e\uddd1", "man": "\ud83d\udc68", "woman_curly_haired": "\ud83d\udc69\u200d\ud83e\uddb1", "man_curly_haired": "\ud83d\udc68\u200d\ud83e\uddb1", "woman_red_haired": "\ud83d\udc69\u200d\ud83e\uddb0", "man_red_haired": "\ud83d\udc68\u200d\ud83e\uddb0", "blond_haired_woman": "\ud83d\udc71\u200d\u2640\ufe0f", "blond_haired_person": "\ud83d\udc71", "person_with_blond_hair": "\ud83d\udc71", "blond_haired_man": "\ud83d\udc71\u200d\u2642\ufe0f", "woman_white_haired": "\ud83d\udc69\u200d\ud83e\uddb3", "man_white_haired": "\ud83d\udc68\u200d\ud83e\uddb3", "woman_bald": "\ud83d\udc69\u200d\ud83e\uddb2", "man_bald": "\ud83d\udc68\u200d\ud83e\uddb2", "bearded_person": "\ud83e\uddd4", "older_woman": "\ud83d\udc75", "grandma": "\ud83d\udc75", "older_adult": "\ud83e\uddd3", "older_man": "\ud83d\udc74", "man_with_chinese_cap": "\ud83d\udc72", "man_with_gua_pi_mao": "\ud83d\udc72", "person_wearing_turban": "\ud83d\udc73", "man_with_turban": "\ud83d\udc73", "woman_wearing_turban": "\ud83d\udc73\u200d\u2640\ufe0f", "man_wearing_turban": "\ud83d\udc73\u200d\u2642\ufe0f", "woman_with_headscarf": "\ud83e\uddd5", "police_officer": "\ud83d\udc6e", "cop": "\ud83d\udc6e", "woman_police_officer": "\ud83d\udc6e\u200d\u2640\ufe0f", "man_police_officer": "\ud83d\udc6e\u200d\u2642\ufe0f", "construction_worker": "\ud83d\udc77", "woman_construction_worker": "\ud83d\udc77\u200d\u2640\ufe0f", "man_construction_worker": "\ud83d\udc77\u200d\u2642\ufe0f", "guard": "\ud83d\udc82", "guardsman": "\ud83d\udc82", "woman_guard": "\ud83d\udc82\u200d\u2640\ufe0f", "man_guard": "\ud83d\udc82\u200d\u2642\ufe0f", "detective": "\ud83d\udd75\ufe0f", "spy": "\ud83d\udd75\ufe0f", "sleuth_or_spy": "\ud83d\udd75\ufe0f", "woman_detective": "\ud83d\udd75\ufe0f\u200d\u2640\ufe0f", "man_detective": "\ud83d\udd75\ufe0f\u200d\u2642\ufe0f", "woman_health_worker": "\ud83d\udc69\u200d\u2695\ufe0f", "man_health_worker": "\ud83d\udc68\u200d\u2695\ufe0f", "woman_farmer": "\ud83d\udc69\u200d\ud83c\udf3e", "man_farmer": "\ud83d\udc68\u200d\ud83c\udf3e", "woman_cook": "\ud83d\udc69\u200d\ud83c\udf73", "man_cook": "\ud83d\udc68\u200d\ud83c\udf73", "woman_student": "\ud83d\udc69\u200d\ud83c\udf93", "man_student": "\ud83d\udc68\u200d\ud83c\udf93", "woman_singer": "\ud83d\udc69\u200d\ud83c\udfa4", "man_singer": "\ud83d\udc68\u200d\ud83c\udfa4", "woman_teacher": "\ud83d\udc69\u200d\ud83c\udfeb", "man_teacher": "\ud83d\udc68\u200d\ud83c\udfeb", "woman_factory_worker": "\ud83d\udc69\u200d\ud83c\udfed", "man_factory_worker": "\ud83d\udc68\u200d\ud83c\udfed", "woman_technologist": "\ud83d\udc69\u200d\ud83d\udcbb", "man_technologist": "\ud83d\udc68\u200d\ud83d\udcbb", "woman_office_worker": "\ud83d\udc69\u200d\ud83d\udcbc", "man_office_worker": "\ud83d\udc68\u200d\ud83d\udcbc", "woman_mechanic": "\ud83d\udc69\u200d\ud83d\udd27", "man_mechanic": "\ud83d\udc68\u200d\ud83d\udd27", "woman_scientist": "\ud83d\udc69\u200d\ud83d\udd2c", "man_scientist": "\ud83d\udc68\u200d\ud83d\udd2c", "woman_artist": "\ud83d\udc69\u200d\ud83c\udfa8", "man_artist": "\ud83d\udc68\u200d\ud83c\udfa8", "woman_firefighter": "\ud83d\udc69\u200d\ud83d\ude92", "man_firefighter": "\ud83d\udc68\u200d\ud83d\ude92", "woman_pilot": "\ud83d\udc69\u200d\u2708\ufe0f", "man_pilot": "\ud83d\udc68\u200d\u2708\ufe0f", "woman_astronaut": "\ud83d\udc69\u200d\ud83d\ude80", "man_astronaut": "\ud83d\udc68\u200d\ud83d\ude80", "woman_judge": "\ud83d\udc69\u200d\u2696\ufe0f", "man_judge": "\ud83d\udc68\u200d\u2696\ufe0f", "bride_with_veil": "\ud83d\udc70", "man_in_tuxedo": "\ud83e\udd35", "princess": "\ud83d\udc78", "prince": "\ud83e\udd34", "superhero": "\ud83e\uddb8", "woman_superhero": "\ud83e\uddb8\u200d\u2640\ufe0f", "man_superhero": "\ud83e\uddb8\u200d\u2642\ufe0f", "supervillain": "\ud83e\uddb9", "woman_supervillain": "\ud83e\uddb9\u200d\u2640\ufe0f", "man_supervillain": "\ud83e\uddb9\u200d\u2642\ufe0f", "mrs_claus": "\ud83e\udd36", "mother_christmas": "\ud83e\udd36", "santa": "\ud83c\udf85", "mage": "\ud83e\uddd9", "woman_mage": "\ud83e\uddd9\u200d\u2640\ufe0f", "man_mage": "\ud83e\uddd9\u200d\u2642\ufe0f", "elf": "\ud83e\udddd", "woman_elf": "\ud83e\udddd\u200d\u2640\ufe0f", "man_elf": "\ud83e\udddd\u200d\u2642\ufe0f", "vampire": "\ud83e\udddb", "woman_vampire": "\ud83e\udddb\u200d\u2640\ufe0f", "man_vampire": "\ud83e\udddb\u200d\u2642\ufe0f", "zombie": "\ud83e\udddf", "woman_zombie": "\ud83e\udddf\u200d\u2640\ufe0f", "man_zombie": "\ud83e\udddf\u200d\u2642\ufe0f", "genie": "\ud83e\uddde", "woman_genie": "\ud83e\uddde\u200d\u2640\ufe0f", "man_genie": "\ud83e\uddde\u200d\u2642\ufe0f", "merperson": "\ud83e\udddc", "mermaid": "\ud83e\udddc\u200d\u2640\ufe0f", "merman": "\ud83e\udddc\u200d\u2642\ufe0f", "fairy": "\ud83e\uddda", "woman_fairy": "\ud83e\uddda\u200d\u2640\ufe0f", "man_fairy": "\ud83e\uddda\u200d\u2642\ufe0f", "angel": "\ud83d\udc7c", "pregnant_woman": "\ud83e\udd30", "expecting_woman": "\ud83e\udd30", "breast_feeding": "\ud83e\udd31", "person_bowing": "\ud83d\ude47", "bow": "\ud83d\ude47", "woman_bowing": "\ud83d\ude47\u200d\u2640\ufe0f", "man_bowing": "\ud83d\ude47\u200d\u2642\ufe0f", "person_tipping_hand": "\ud83d\udc81", "information_desk_person": "\ud83d\udc81", "woman_tipping_hand": "\ud83d\udc81\u200d\u2640\ufe0f", "man_tipping_hand": "\ud83d\udc81\u200d\u2642\ufe0f", "person_gesturing_no": "\ud83d\ude45", "no_good": "\ud83d\ude45", "woman_gesturing_no": "\ud83d\ude45\u200d\u2640\ufe0f", "man_gesturing_no": "\ud83d\ude45\u200d\u2642\ufe0f", "person_gesturing_ok": "\ud83d\ude46", "ok_woman": "\ud83d\ude46", "woman_gesturing_ok": "\ud83d\ude46\u200d\u2640\ufe0f", "man_gesturing_ok": "\ud83d\ude46\u200d\u2642\ufe0f", "person_raising_hand": "\ud83d\ude4b", "raising_hand": "\ud83d\ude4b", "woman_raising_hand": "\ud83d\ude4b\u200d\u2640\ufe0f", "man_raising_hand": "\ud83d\ude4b\u200d\u2642\ufe0f", "deaf_person": "\ud83e\uddcf", "deaf_woman": "\ud83e\uddcf\u200d\u2640\ufe0f", "deaf_man": "\ud83e\uddcf\u200d\u2642\ufe0f", "person_facepalming": "\ud83e\udd26", "face_palm": "\ud83e\udd26", "facepalm": "\ud83e\udd26", "woman_facepalming": "\ud83e\udd26\u200d\u2640\ufe0f", "man_facepalming": "\ud83e\udd26\u200d\u2642\ufe0f", "person_shrugging": "\ud83e\udd37", "shrug": "\ud83e\udd37", "woman_shrugging": "\ud83e\udd37\u200d\u2640\ufe0f", "man_shrugging": "\ud83e\udd37\u200d\u2642\ufe0f", "person_pouting": "\ud83d\ude4e", "person_with_pouting_face": "\ud83d\ude4e", "woman_pouting": "\ud83d\ude4e\u200d\u2640\ufe0f", "man_pouting": "\ud83d\ude4e\u200d\u2642\ufe0f", "person_frowning": "\ud83d\ude4d", "woman_frowning": "\ud83d\ude4d\u200d\u2640\ufe0f", "man_frowning": "\ud83d\ude4d\u200d\u2642\ufe0f", "person_getting_haircut": "\ud83d\udc87", "haircut": "\ud83d\udc87", "woman_getting_haircut": "\ud83d\udc87\u200d\u2640\ufe0f", "man_getting_haircut": "\ud83d\udc87\u200d\u2642\ufe0f", "person_getting_massage": "\ud83d\udc86", "massage": "\ud83d\udc86", "woman_getting_face_massage": "\ud83d\udc86\u200d\u2640\ufe0f", "man_getting_face_massage": "\ud83d\udc86\u200d\u2642\ufe0f", "person_in_steamy_room": "\ud83e\uddd6", "woman_in_steamy_room": "\ud83e\uddd6\u200d\u2640\ufe0f", "man_in_steamy_room": "\ud83e\uddd6\u200d\u2642\ufe0f", "nail_care": "\ud83d\udc85", "selfie": "\ud83e\udd33", "dancer": "\ud83d\udc83", "man_dancing": "\ud83d\udd7a", "male_dancer": "\ud83d\udd7a", "people_with_bunny_ears_partying": "\ud83d\udc6f", "dancers": "\ud83d\udc6f", "women_with_bunny_ears_partying": "\ud83d\udc6f\u200d\u2640\ufe0f", "men_with_bunny_ears_partying": "\ud83d\udc6f\u200d\u2642\ufe0f", "levitate": "\ud83d\udd74\ufe0f", "man_in_business_suit_levitating": "\ud83d\udd74\ufe0f", "person_walking": "\ud83d\udeb6", "walking": "\ud83d\udeb6", "woman_walking": "\ud83d\udeb6\u200d\u2640\ufe0f", "man_walking": "\ud83d\udeb6\u200d\u2642\ufe0f", "person_running": "\ud83c\udfc3", "runner": "\ud83c\udfc3", "woman_running": "\ud83c\udfc3\u200d\u2640\ufe0f", "man_running": "\ud83c\udfc3\u200d\u2642\ufe0f", "person_standing": "\ud83e\uddcd", "woman_standing": "\ud83e\uddcd\u200d\u2640\ufe0f", "man_standing": "\ud83e\uddcd\u200d\u2642\ufe0f", "person_kneeling": "\ud83e\uddce", "woman_kneeling": "\ud83e\uddce\u200d\u2640\ufe0f", "man_kneeling": "\ud83e\uddce\u200d\u2642\ufe0f", "woman_with_probing_cane": "\ud83d\udc69\u200d\ud83e\uddaf", "man_with_probing_cane": "\ud83d\udc68\u200d\ud83e\uddaf", "woman_in_motorized_wheelchair": "\ud83d\udc69\u200d\ud83e\uddbc", "man_in_motorized_wheelchair": "\ud83d\udc68\u200d\ud83e\uddbc", "woman_in_manual_wheelchair": "\ud83d\udc69\u200d\ud83e\uddbd", "man_in_manual_wheelchair": "\ud83d\udc68\u200d\ud83e\uddbd", "people_holding_hands": "\ud83e\uddd1\u200d\ud83e\udd1d\u200d\ud83e\uddd1", "couple": "\ud83d\udc6b", "two_women_holding_hands": "\ud83d\udc6d", "two_men_holding_hands": "\ud83d\udc6c", "couple_with_heart": "\ud83d\udc91", "couple_with_heart_woman_man": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc68", "couple_ww": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69", "couple_with_heart_ww": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc69", "couple_mm": "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68", "couple_with_heart_mm": "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc68", "couplekiss": "\ud83d\udc8f", "kiss_woman_man": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68", "kiss_ww": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69", "couplekiss_ww": "\ud83d\udc69\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc69", "kiss_mm": "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68", "couplekiss_mm": "\ud83d\udc68\u200d\u2764\ufe0f\u200d\ud83d\udc8b\u200d\ud83d\udc68", "family": "\ud83d\udc6a", "family_man_woman_boy": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66", "family_mwg": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67", "family_mwgb": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66", "family_mwbb": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66", "family_mwgg": "\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67", "family_wwb": "\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66", "family_wwg": "\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67", "family_wwgb": "\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66", "family_wwbb": "\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66", "family_wwgg": "\ud83d\udc69\u200d\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67", "family_mmb": "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66", "family_mmg": "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67", "family_mmgb": "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66", "family_mmbb": "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66", "family_mmgg": "\ud83d\udc68\u200d\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67", "family_woman_boy": "\ud83d\udc69\u200d\ud83d\udc66", "family_woman_girl": "\ud83d\udc69\u200d\ud83d\udc67", "family_woman_girl_boy": "\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc66", "family_woman_boy_boy": "\ud83d\udc69\u200d\ud83d\udc66\u200d\ud83d\udc66", "family_woman_girl_girl": "\ud83d\udc69\u200d\ud83d\udc67\u200d\ud83d\udc67", "family_man_boy": "\ud83d\udc68\u200d\ud83d\udc66", "family_man_girl": "\ud83d\udc68\u200d\ud83d\udc67", "family_man_girl_boy": "\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc66", "family_man_boy_boy": "\ud83d\udc68\u200d\ud83d\udc66\u200d\ud83d\udc66", "family_man_girl_girl": "\ud83d\udc68\u200d\ud83d\udc67\u200d\ud83d\udc67", "yarn": "\ud83e\uddf6", "thread": "\ud83e\uddf5", "coat": "\ud83e\udde5", "lab_coat": "\ud83e\udd7c", "safety_vest": "\ud83e\uddba", "womans_clothes": "\ud83d\udc5a", "shirt": "\ud83d\udc55", "jeans": "\ud83d\udc56", "shorts": "\ud83e\ude73", "necktie": "\ud83d\udc54", "dress": "\ud83d\udc57", "bikini": "\ud83d\udc59", "one_piece_swimsuit": "\ud83e\ude71", "kimono": "\ud83d\udc58", "sari": "\ud83e\udd7b", "womans_flat_shoe": "\ud83e\udd7f", "high_heel": "\ud83d\udc60", "sandal": "\ud83d\udc61", "boot": "\ud83d\udc62", "ballet_shoes": "\ud83e\ude70", "mans_shoe": "\ud83d\udc5e", "athletic_shoe": "\ud83d\udc5f", "hiking_boot": "\ud83e\udd7e", "briefs": "\ud83e\ude72", "socks": "\ud83e\udde6", "gloves": "\ud83e\udde4", "scarf": "\ud83e\udde3", "tophat": "\ud83c\udfa9", "billed_cap": "\ud83e\udde2", "womans_hat": "\ud83d\udc52", "mortar_board": "\ud83c\udf93", "helmet_with_cross": "\u26d1\ufe0f", "helmet_with_white_cross": "\u26d1\ufe0f", "crown": "\ud83d\udc51", "ring": "\ud83d\udc8d", "pouch": "\ud83d\udc5d", "purse": "\ud83d\udc5b", "handbag": "\ud83d\udc5c", "briefcase": "\ud83d\udcbc", "school_satchel": "\ud83c\udf92", "luggage": "\ud83e\uddf3", "eyeglasses": "\ud83d\udc53", "dark_sunglasses": "\ud83d\udd76\ufe0f", "goggles": "\ud83e\udd7d", "diving_mask": "\ud83e\udd3f", "closed_umbrella": "\ud83c\udf02", "dog": "\ud83d\udc36", "cat": "\ud83d\udc31", "mouse": "\ud83d\udc2d", "hamster": "\ud83d\udc39", "rabbit": "\ud83d\udc30", "fox": "\ud83e\udd8a", "fox_face": "\ud83e\udd8a", "bear": "\ud83d\udc3b", "panda_face": "\ud83d\udc3c", "koala": "\ud83d\udc28", "tiger": "\ud83d\udc2f", "lion_face": "\ud83e\udd81", "lion": "\ud83e\udd81", "cow": "\ud83d\udc2e", "pig": "\ud83d\udc37", "pig_nose": "\ud83d\udc3d", "frog": "\ud83d\udc38", "monkey_face": "\ud83d\udc35", "see_no_evil": "\ud83d\ude48", "hear_no_evil": "\ud83d\ude49", "speak_no_evil": "\ud83d\ude4a", "monkey": "\ud83d\udc12", "chicken": "\ud83d\udc14", "penguin": "\ud83d\udc27", "bird": "\ud83d\udc26", "baby_chick": "\ud83d\udc24", "hatching_chick": "\ud83d\udc23", "hatched_chick": "\ud83d\udc25", "duck": "\ud83e\udd86", "eagle": "\ud83e\udd85", "owl": "\ud83e\udd89", "bat": "\ud83e\udd87", "wolf": "\ud83d\udc3a", "boar": "\ud83d\udc17", "horse": "\ud83d\udc34", "unicorn": "\ud83e\udd84", "unicorn_face": "\ud83e\udd84", "bee": "\ud83d\udc1d", "bug": "\ud83d\udc1b", "butterfly": "\ud83e\udd8b", "snail": "\ud83d\udc0c", "shell": "\ud83d\udc1a", "beetle": "\ud83d\udc1e", "ant": "\ud83d\udc1c", "mosquito": "\ud83e\udd9f", "cricket": "\ud83e\udd97", "spider": "\ud83d\udd77\ufe0f", "spider_web": "\ud83d\udd78\ufe0f", "scorpion": "\ud83e\udd82", "turtle": "\ud83d\udc22", "snake": "\ud83d\udc0d", "lizard": "\ud83e\udd8e", "t_rex": "\ud83e\udd96", "sauropod": "\ud83e\udd95", "octopus": "\ud83d\udc19", "squid": "\ud83e\udd91", "shrimp": "\ud83e\udd90", "lobster": "\ud83e\udd9e", "oyster": "\ud83e\uddaa", "crab": "\ud83e\udd80", "blowfish": "\ud83d\udc21", "tropical_fish": "\ud83d\udc20", "fish": "\ud83d\udc1f", "dolphin": "\ud83d\udc2c", "whale": "\ud83d\udc33", "whale2": "\ud83d\udc0b", "shark": "\ud83e\udd88", "crocodile": "\ud83d\udc0a", "tiger2": "\ud83d\udc05", "leopard": "\ud83d\udc06", "zebra": "\ud83e\udd93", "gorilla": "\ud83e\udd8d", "orangutan": "\ud83e\udda7", "elephant": "\ud83d\udc18", "hippopotamus": "\ud83e\udd9b", "rhino": "\ud83e\udd8f", "rhinoceros": "\ud83e\udd8f", "dromedary_camel": "\ud83d\udc2a", "camel": "\ud83d\udc2b", "giraffe": "\ud83e\udd92", "kangaroo": "\ud83e\udd98", "water_buffalo": "\ud83d\udc03", "ox": "\ud83d\udc02", "cow2": "\ud83d\udc04", "racehorse": "\ud83d\udc0e", "pig2": "\ud83d\udc16", "ram": "\ud83d\udc0f", "llama": "\ud83e\udd99", "sheep": "\ud83d\udc11", "goat": "\ud83d\udc10", "deer": "\ud83e\udd8c", "dog2": "\ud83d\udc15", "guide_dog": "\ud83e\uddae", "service_dog": "\ud83d\udc15\u200d\ud83e\uddba", "poodle": "\ud83d\udc29", "cat2": "\ud83d\udc08", "rooster": "\ud83d\udc13", "turkey": "\ud83e\udd83", "peacock": "\ud83e\udd9a", "parrot": "\ud83e\udd9c", "swan": "\ud83e\udda2", "flamingo": "\ud83e\udda9", "dove": "\ud83d\udd4a\ufe0f", "dove_of_peace": "\ud83d\udd4a\ufe0f", "rabbit2": "\ud83d\udc07", "sloth": "\ud83e\udda5", "otter": "\ud83e\udda6", "skunk": "\ud83e\udda8", "raccoon": "\ud83e\udd9d", "badger": "\ud83e\udda1", "mouse2": "\ud83d\udc01", "rat": "\ud83d\udc00", "chipmunk": "\ud83d\udc3f\ufe0f", "hedgehog": "\ud83e\udd94", "feet": "\ud83d\udc3e", "paw_prints": "\ud83d\udc3e", "dragon": "\ud83d\udc09", "dragon_face": "\ud83d\udc32", "cactus": "\ud83c\udf35", "christmas_tree": "\ud83c\udf84", "evergreen_tree": "\ud83c\udf32", "deciduous_tree": "\ud83c\udf33", "palm_tree": "\ud83c\udf34", "seedling": "\ud83c\udf31", "herb": "\ud83c\udf3f", "shamrock": "\u2618\ufe0f", "four_leaf_clover": "\ud83c\udf40", "bamboo": "\ud83c\udf8d", "tanabata_tree": "\ud83c\udf8b", "leaves": "\ud83c\udf43", "fallen_leaf": "\ud83c\udf42", "maple_leaf": "\ud83c\udf41", "mushroom": "\ud83c\udf44", "ear_of_rice": "\ud83c\udf3e", "bouquet": "\ud83d\udc90", "tulip": "\ud83c\udf37", "rose": "\ud83c\udf39", "wilted_rose": "\ud83e\udd40", "wilted_flower": "\ud83e\udd40", "hibiscus": "\ud83c\udf3a", "cherry_blossom": "\ud83c\udf38", "blossom": "\ud83c\udf3c", "sunflower": "\ud83c\udf3b", "sun_with_face": "\ud83c\udf1e", "full_moon_with_face": "\ud83c\udf1d", "first_quarter_moon_with_face": "\ud83c\udf1b", "last_quarter_moon_with_face": "\ud83c\udf1c", "new_moon_with_face": "\ud83c\udf1a", "full_moon": "\ud83c\udf15", "waning_gibbous_moon": "\ud83c\udf16", "last_quarter_moon": "\ud83c\udf17", "waning_crescent_moon": "\ud83c\udf18", "new_moon": "\ud83c\udf11", "waxing_crescent_moon": "\ud83c\udf12", "first_quarter_moon": "\ud83c\udf13", "waxing_gibbous_moon": "\ud83c\udf14", "crescent_moon": "\ud83c\udf19", "earth_americas": "\ud83c\udf0e", "earth_africa": "\ud83c\udf0d", "earth_asia": "\ud83c\udf0f", "ringed_planet": "\ud83e\ude90", "dizzy": "\ud83d\udcab", "star": "\u2b50", "star2": "\ud83c\udf1f", "sparkles": "\u2728", "zap": "\u26a1", "comet": "\u2604\ufe0f", "boom": "\ud83d\udca5", "fire": "\ud83d\udd25", "flame": "\ud83d\udd25", "cloud_tornado": "\ud83c\udf2a\ufe0f", "cloud_with_tornado": "\ud83c\udf2a\ufe0f", "rainbow": "\ud83c\udf08", "sunny": "\u2600\ufe0f", "white_sun_small_cloud": "\ud83c\udf24\ufe0f", "white_sun_with_small_cloud": "\ud83c\udf24\ufe0f", "partly_sunny": "\u26c5", "white_sun_cloud": "\ud83c\udf25\ufe0f", "white_sun_behind_cloud": "\ud83c\udf25\ufe0f", "cloud": "\u2601\ufe0f", "white_sun_rain_cloud": "\ud83c\udf26\ufe0f", "white_sun_behind_cloud_with_rain": "\ud83c\udf26\ufe0f", "cloud_rain": "\ud83c\udf27\ufe0f", "cloud_with_rain": "\ud83c\udf27\ufe0f", "thunder_cloud_rain": "\u26c8\ufe0f", "thunder_cloud_and_rain": "\u26c8\ufe0f", "cloud_lightning": "\ud83c\udf29\ufe0f", "cloud_with_lightning": "\ud83c\udf29\ufe0f", "cloud_snow": "\ud83c\udf28\ufe0f", "cloud_with_snow": "\ud83c\udf28\ufe0f", "snowflake": "\u2744\ufe0f", "snowman2": "\u2603\ufe0f", "snowman": "\u26c4", "wind_blowing_face": "\ud83c\udf2c\ufe0f", "dash": "\ud83d\udca8", "droplet": "\ud83d\udca7", "sweat_drops": "\ud83d\udca6", "umbrella": "\u2614", "umbrella2": "\u2602\ufe0f", "ocean": "\ud83c\udf0a", "fog": "\ud83c\udf2b\ufe0f", "green_apple": "\ud83c\udf4f", "apple": "\ud83c\udf4e", "pear": "\ud83c\udf50", "tangerine": "\ud83c\udf4a", "lemon": "\ud83c\udf4b", "banana": "\ud83c\udf4c", "watermelon": "\ud83c\udf49", "grapes": "\ud83c\udf47", "strawberry": "\ud83c\udf53", "melon": "\ud83c\udf48", "cherries": "\ud83c\udf52", "peach": "\ud83c\udf51", "mango": "\ud83e\udd6d", "pineapple": "\ud83c\udf4d", "coconut": "\ud83e\udd65", "kiwi": "\ud83e\udd5d", "kiwifruit": "\ud83e\udd5d", "tomato": "\ud83c\udf45", "eggplant": "\ud83c\udf46", "avocado": "\ud83e\udd51", "broccoli": "\ud83e\udd66", "leafy_green": "\ud83e\udd6c", "cucumber": "\ud83e\udd52", "hot_pepper": "\ud83c\udf36\ufe0f", "corn": "\ud83c\udf3d", "carrot": "\ud83e\udd55", "onion": "\ud83e\uddc5", "garlic": "\ud83e\uddc4", "potato": "\ud83e\udd54", "sweet_potato": "\ud83c\udf60", "croissant": "\ud83e\udd50", "bagel": "\ud83e\udd6f", "bread": "\ud83c\udf5e", "french_bread": "\ud83e\udd56", "baguette_bread": "\ud83e\udd56", "pretzel": "\ud83e\udd68", "cheese": "\ud83e\uddc0", "cheese_wedge": "\ud83e\uddc0", "egg": "\ud83e\udd5a", "cooking": "\ud83c\udf73", "pancakes": "\ud83e\udd5e", "waffle": "\ud83e\uddc7", "bacon": "\ud83e\udd53", "cut_of_meat": "\ud83e\udd69", "poultry_leg": "\ud83c\udf57", "meat_on_bone": "\ud83c\udf56", "hotdog": "\ud83c\udf2d", "hot_dog": "\ud83c\udf2d", "hamburger": "\ud83c\udf54", "fries": "\ud83c\udf5f", "pizza": "\ud83c\udf55", "sandwich": "\ud83e\udd6a", "falafel": "\ud83e\uddc6", "stuffed_flatbread": "\ud83e\udd59", "stuffed_pita": "\ud83e\udd59", "taco": "\ud83c\udf2e", "burrito": "\ud83c\udf2f", "salad": "\ud83e\udd57", "green_salad": "\ud83e\udd57", "shallow_pan_of_food": "\ud83e\udd58", "paella": "\ud83e\udd58", "canned_food": "\ud83e\udd6b", "spaghetti": "\ud83c\udf5d", "ramen": "\ud83c\udf5c", "stew": "\ud83c\udf72", "curry": "\ud83c\udf5b", "sushi": "\ud83c\udf63", "bento": "\ud83c\udf71", "dumpling": "\ud83e\udd5f", "fried_shrimp": "\ud83c\udf64", "rice_ball": "\ud83c\udf59", "rice": "\ud83c\udf5a", "rice_cracker": "\ud83c\udf58", "fish_cake": "\ud83c\udf65", "fortune_cookie": "\ud83e\udd60", "moon_cake": "\ud83e\udd6e", "oden": "\ud83c\udf62", "dango": "\ud83c\udf61", "shaved_ice": "\ud83c\udf67", "ice_cream": "\ud83c\udf68", "icecream": "\ud83c\udf66", "pie": "\ud83e\udd67", "cupcake": "\ud83e\uddc1", "cake": "\ud83c\udf70", "birthday": "\ud83c\udf82", "custard": "\ud83c\udf6e", "pudding": "\ud83c\udf6e", "flan": "\ud83c\udf6e", "lollipop": "\ud83c\udf6d", "candy": "\ud83c\udf6c", "chocolate_bar": "\ud83c\udf6b", "popcorn": "\ud83c\udf7f", "doughnut": "\ud83c\udf69", "cookie": "\ud83c\udf6a", "chestnut": "\ud83c\udf30", "peanuts": "\ud83e\udd5c", "shelled_peanut": "\ud83e\udd5c", "honey_pot": "\ud83c\udf6f", "butter": "\ud83e\uddc8", "milk": "\ud83e\udd5b", "glass_of_milk": "\ud83e\udd5b", "baby_bottle": "\ud83c\udf7c", "coffee": "\u2615", "tea": "\ud83c\udf75", "mate": "\ud83e\uddc9", "cup_with_straw": "\ud83e\udd64", "beverage_box": "\ud83e\uddc3", "ice_cube": "\ud83e\uddca", "sake": "\ud83c\udf76", "beer": "\ud83c\udf7a", "beers": "\ud83c\udf7b", "champagne_glass": "\ud83e\udd42", "clinking_glass": "\ud83e\udd42", "wine_glass": "\ud83c\udf77", "tumbler_glass": "\ud83e\udd43", "whisky": "\ud83e\udd43", "cocktail": "\ud83c\udf78", "tropical_drink": "\ud83c\udf79", "champagne": "\ud83c\udf7e", "bottle_with_popping_cork": "\ud83c\udf7e", "spoon": "\ud83e\udd44", "fork_and_knife": "\ud83c\udf74", "fork_knife_plate": "\ud83c\udf7d\ufe0f", "fork_and_knife_with_plate": "\ud83c\udf7d\ufe0f", "bowl_with_spoon": "\ud83e\udd63", "takeout_box": "\ud83e\udd61", "chopsticks": "\ud83e\udd62", "salt": "\ud83e\uddc2", "soccer": "\u26bd", "basketball": "\ud83c\udfc0", "football": "\ud83c\udfc8", "baseball": "\u26be", "softball": "\ud83e\udd4e", "tennis": "\ud83c\udfbe", "volleyball": "\ud83c\udfd0", "rugby_football": "\ud83c\udfc9", "flying_disc": "\ud83e\udd4f", "8ball": "\ud83c\udfb1", "ping_pong": "\ud83c\udfd3", "table_tennis": "\ud83c\udfd3", "badminton": "\ud83c\udff8", "hockey": "\ud83c\udfd2", "field_hockey": "\ud83c\udfd1", "lacrosse": "\ud83e\udd4d", "cricket_game": "\ud83c\udfcf", "cricket_bat_ball": "\ud83c\udfcf", "goal": "\ud83e\udd45", "goal_net": "\ud83e\udd45", "golf": "\u26f3", "bow_and_arrow": "\ud83c\udff9", "archery": "\ud83c\udff9", "fishing_pole_and_fish": "\ud83c\udfa3", "boxing_glove": "\ud83e\udd4a", "boxing_gloves": "\ud83e\udd4a", "martial_arts_uniform": "\ud83e\udd4b", "karate_uniform": "\ud83e\udd4b", "running_shirt_with_sash": "\ud83c\udfbd", "skateboard": "\ud83d\udef9", "sled": "\ud83d\udef7", "parachute": "\ud83e\ude82", "ice_skate": "\u26f8\ufe0f", "curling_stone": "\ud83e\udd4c", "ski": "\ud83c\udfbf", "skier": "\u26f7\ufe0f", "snowboarder": "\ud83c\udfc2", "person_lifting_weights": "\ud83c\udfcb\ufe0f", "lifter": "\ud83c\udfcb\ufe0f", "weight_lifter": "\ud83c\udfcb\ufe0f", "woman_lifting_weights": "\ud83c\udfcb\ufe0f\u200d\u2640\ufe0f", "man_lifting_weights": "\ud83c\udfcb\ufe0f\u200d\u2642\ufe0f", "people_wrestling": "\ud83e\udd3c", "wrestlers": "\ud83e\udd3c", "wrestling": "\ud83e\udd3c", "women_wrestling": "\ud83e\udd3c\u200d\u2640\ufe0f", "men_wrestling": "\ud83e\udd3c\u200d\u2642\ufe0f", "person_doing_cartwheel": "\ud83e\udd38", "cartwheel": "\ud83e\udd38", "woman_cartwheeling": "\ud83e\udd38\u200d\u2640\ufe0f", "man_cartwheeling": "\ud83e\udd38\u200d\u2642\ufe0f", "person_bouncing_ball": "\u26f9\ufe0f", "basketball_player": "\u26f9\ufe0f", "person_with_ball": "\u26f9\ufe0f", "woman_bouncing_ball": "\u26f9\ufe0f\u200d\u2640\ufe0f", "man_bouncing_ball": "\u26f9\ufe0f\u200d\u2642\ufe0f", "person_fencing": "\ud83e\udd3a", "fencer": "\ud83e\udd3a", "fencing": "\ud83e\udd3a", "person_playing_handball": "\ud83e\udd3e", "handball": "\ud83e\udd3e", "woman_playing_handball": "\ud83e\udd3e\u200d\u2640\ufe0f", "man_playing_handball": "\ud83e\udd3e\u200d\u2642\ufe0f", "person_golfing": "\ud83c\udfcc\ufe0f", "golfer": "\ud83c\udfcc\ufe0f", "woman_golfing": "\ud83c\udfcc\ufe0f\u200d\u2640\ufe0f", "man_golfing": "\ud83c\udfcc\ufe0f\u200d\u2642\ufe0f", "horse_racing": "\ud83c\udfc7", "person_in_lotus_position": "\ud83e\uddd8", "woman_in_lotus_position": "\ud83e\uddd8\u200d\u2640\ufe0f", "man_in_lotus_position": "\ud83e\uddd8\u200d\u2642\ufe0f", "person_surfing": "\ud83c\udfc4", "surfer": "\ud83c\udfc4", "woman_surfing": "\ud83c\udfc4\u200d\u2640\ufe0f", "man_surfing": "\ud83c\udfc4\u200d\u2642\ufe0f", "person_swimming": "\ud83c\udfca", "swimmer": "\ud83c\udfca", "woman_swimming": "\ud83c\udfca\u200d\u2640\ufe0f", "man_swimming": "\ud83c\udfca\u200d\u2642\ufe0f", "person_playing_water_polo": "\ud83e\udd3d", "water_polo": "\ud83e\udd3d", "woman_playing_water_polo": "\ud83e\udd3d\u200d\u2640\ufe0f", "man_playing_water_polo": "\ud83e\udd3d\u200d\u2642\ufe0f", "person_rowing_boat": "\ud83d\udea3", "rowboat": "\ud83d\udea3", "woman_rowing_boat": "\ud83d\udea3\u200d\u2640\ufe0f", "man_rowing_boat": "\ud83d\udea3\u200d\u2642\ufe0f", "person_climbing": "\ud83e\uddd7", "woman_climbing": "\ud83e\uddd7\u200d\u2640\ufe0f", "man_climbing": "\ud83e\uddd7\u200d\u2642\ufe0f", "person_mountain_biking": "\ud83d\udeb5", "mountain_bicyclist": "\ud83d\udeb5", "woman_mountain_biking": "\ud83d\udeb5\u200d\u2640\ufe0f", "man_mountain_biking": "\ud83d\udeb5\u200d\u2642\ufe0f", "person_biking": "\ud83d\udeb4", "bicyclist": "\ud83d\udeb4", "woman_biking": "\ud83d\udeb4\u200d\u2640\ufe0f", "man_biking": "\ud83d\udeb4\u200d\u2642\ufe0f", "trophy": "\ud83c\udfc6", "first_place": "\ud83e\udd47", "first_place_medal": "\ud83e\udd47", "second_place": "\ud83e\udd48", "second_place_medal": "\ud83e\udd48", "third_place": "\ud83e\udd49", "third_place_medal": "\ud83e\udd49", "medal": "\ud83c\udfc5", "sports_medal": "\ud83c\udfc5", "military_medal": "\ud83c\udf96\ufe0f", "rosette": "\ud83c\udff5\ufe0f", "reminder_ribbon": "\ud83c\udf97\ufe0f", "ticket": "\ud83c\udfab", "tickets": "\ud83c\udf9f\ufe0f", "admission_tickets": "\ud83c\udf9f\ufe0f", "circus_tent": "\ud83c\udfaa", "person_juggling": "\ud83e\udd39", "juggling": "\ud83e\udd39", "juggler": "\ud83e\udd39", "woman_juggling": "\ud83e\udd39\u200d\u2640\ufe0f", "man_juggling": "\ud83e\udd39\u200d\u2642\ufe0f", "performing_arts": "\ud83c\udfad", "art": "\ud83c\udfa8", "clapper": "\ud83c\udfac", "microphone": "\ud83c\udfa4", "headphones": "\ud83c\udfa7", "musical_score": "\ud83c\udfbc", "musical_keyboard": "\ud83c\udfb9", "drum": "\ud83e\udd41", "drum_with_drumsticks": "\ud83e\udd41", "saxophone": "\ud83c\udfb7", "trumpet": "\ud83c\udfba", "banjo": "\ud83e\ude95", "guitar": "\ud83c\udfb8", "violin": "\ud83c\udfbb", "game_die": "\ud83c\udfb2", "chess_pawn": "\u265f\ufe0f", "dart": "\ud83c\udfaf", "kite": "\ud83e\ude81", "yo_yo": "\ud83e\ude80", "bowling": "\ud83c\udfb3", "video_game": "\ud83c\udfae", "slot_machine": "\ud83c\udfb0", "jigsaw": "\ud83e\udde9", "red_car": "\ud83d\ude97", "taxi": "\ud83d\ude95", "blue_car": "\ud83d\ude99", "bus": "\ud83d\ude8c", "trolleybus": "\ud83d\ude8e", "race_car": "\ud83c\udfce\ufe0f", "racing_car": "\ud83c\udfce\ufe0f", "police_car": "\ud83d\ude93", "ambulance": "\ud83d\ude91", "fire_engine": "\ud83d\ude92", "minibus": "\ud83d\ude90", "truck": "\ud83d\ude9a", "articulated_lorry": "\ud83d\ude9b", "tractor": "\ud83d\ude9c", "auto_rickshaw": "\ud83d\udefa", "motor_scooter": "\ud83d\udef5", "motorbike": "\ud83d\udef5", "motorcycle": "\ud83c\udfcd\ufe0f", "racing_motorcycle": "\ud83c\udfcd\ufe0f", "scooter": "\ud83d\udef4", "bike": "\ud83d\udeb2", "motorized_wheelchair": "\ud83e\uddbc", "manual_wheelchair": "\ud83e\uddbd", "rotating_light": "\ud83d\udea8", "oncoming_police_car": "\ud83d\ude94", "oncoming_bus": "\ud83d\ude8d", "oncoming_automobile": "\ud83d\ude98", "oncoming_taxi": "\ud83d\ude96", "aerial_tramway": "\ud83d\udea1", "mountain_cableway": "\ud83d\udea0", "suspension_railway": "\ud83d\ude9f", "railway_car": "\ud83d\ude83", "train": "\ud83d\ude8b", "mountain_railway": "\ud83d\ude9e", "monorail": "\ud83d\ude9d", "bullettrain_side": "\ud83d\ude84", "bullettrain_front": "\ud83d\ude85", "light_rail": "\ud83d\ude88", "steam_locomotive": "\ud83d\ude82", "train2": "\ud83d\ude86", "metro": "\ud83d\ude87", "tram": "\ud83d\ude8a", "station": "\ud83d\ude89", "airplane": "\u2708\ufe0f", "airplane_departure": "\ud83d\udeeb", "airplane_arriving": "\ud83d\udeec", "airplane_small": "\ud83d\udee9\ufe0f", "small_airplane": "\ud83d\udee9\ufe0f", "seat": "\ud83d\udcba", "satellite_orbital": "\ud83d\udef0\ufe0f", "rocket": "\ud83d\ude80", "flying_saucer": "\ud83d\udef8", "helicopter": "\ud83d\ude81", "canoe": "\ud83d\udef6", "kayak": "\ud83d\udef6", "sailboat": "\u26f5", "speedboat": "\ud83d\udea4", "motorboat": "\ud83d\udee5\ufe0f", "cruise_ship": "\ud83d\udef3\ufe0f", "passenger_ship": "\ud83d\udef3\ufe0f", "ferry": "\u26f4\ufe0f", "ship": "\ud83d\udea2", "anchor": "\u2693", "fuelpump": "\u26fd", "construction": "\ud83d\udea7", "vertical_traffic_light": "\ud83d\udea6", "traffic_light": "\ud83d\udea5", "busstop": "\ud83d\ude8f", "map": "\ud83d\uddfa\ufe0f", "world_map": "\ud83d\uddfa\ufe0f", "moyai": "\ud83d\uddff", "statue_of_liberty": "\ud83d\uddfd", "tokyo_tower": "\ud83d\uddfc", "european_castle": "\ud83c\udff0", "japanese_castle": "\ud83c\udfef", "stadium": "\ud83c\udfdf\ufe0f", "ferris_wheel": "\ud83c\udfa1", "roller_coaster": "\ud83c\udfa2", "carousel_horse": "\ud83c\udfa0", "fountain": "\u26f2", "beach_umbrella": "\u26f1\ufe0f", "umbrella_on_ground": "\u26f1\ufe0f", "beach": "\ud83c\udfd6\ufe0f", "beach_with_umbrella": "\ud83c\udfd6\ufe0f", "island": "\ud83c\udfdd\ufe0f", "desert_island": "\ud83c\udfdd\ufe0f", "desert": "\ud83c\udfdc\ufe0f", "volcano": "\ud83c\udf0b", "mountain": "\u26f0\ufe0f", "mountain_snow": "\ud83c\udfd4\ufe0f", "snow_capped_mountain": "\ud83c\udfd4\ufe0f", "mount_fuji": "\ud83d\uddfb", "camping": "\ud83c\udfd5\ufe0f", "tent": "\u26fa", "house": "\ud83c\udfe0", "house_with_garden": "\ud83c\udfe1", "homes": "\ud83c\udfd8\ufe0f", "house_buildings": "\ud83c\udfd8\ufe0f", "house_abandoned": "\ud83c\udfda\ufe0f", "derelict_house_building": "\ud83c\udfda\ufe0f", "construction_site": "\ud83c\udfd7\ufe0f", "building_construction": "\ud83c\udfd7\ufe0f", "factory": "\ud83c\udfed", "office": "\ud83c\udfe2", "department_store": "\ud83c\udfec", "post_office": "\ud83c\udfe3", "european_post_office": "\ud83c\udfe4", "hospital": "\ud83c\udfe5", "bank": "\ud83c\udfe6", "hotel": "\ud83c\udfe8", "convenience_store": "\ud83c\udfea", "school": "\ud83c\udfeb", "love_hotel": "\ud83c\udfe9", "wedding": "\ud83d\udc92", "classical_building": "\ud83c\udfdb\ufe0f", "church": "\u26ea", "mosque": "\ud83d\udd4c", "hindu_temple": "\ud83d\uded5", "synagogue": "\ud83d\udd4d", "kaaba": "\ud83d\udd4b", "shinto_shrine": "\u26e9\ufe0f", "railway_track": "\ud83d\udee4\ufe0f", "railroad_track": "\ud83d\udee4\ufe0f", "motorway": "\ud83d\udee3\ufe0f", "japan": "\ud83d\uddfe", "rice_scene": "\ud83c\udf91", "park": "\ud83c\udfde\ufe0f", "national_park": "\ud83c\udfde\ufe0f", "sunrise": "\ud83c\udf05", "sunrise_over_mountains": "\ud83c\udf04", "stars": "\ud83c\udf20", "sparkler": "\ud83c\udf87", "fireworks": "\ud83c\udf86", "city_sunset": "\ud83c\udf07", "city_sunrise": "\ud83c\udf07", "city_dusk": "\ud83c\udf06", "cityscape": "\ud83c\udfd9\ufe0f", "night_with_stars": "\ud83c\udf03", "milky_way": "\ud83c\udf0c", "bridge_at_night": "\ud83c\udf09", "foggy": "\ud83c\udf01", "watch": "\u231a", "iphone": "\ud83d\udcf1", "calling": "\ud83d\udcf2", "computer": "\ud83d\udcbb", "keyboard": "\u2328\ufe0f", "desktop": "\ud83d\udda5\ufe0f", "desktop_computer": "\ud83d\udda5\ufe0f", "printer": "\ud83d\udda8\ufe0f", "mouse_three_button": "\ud83d\uddb1\ufe0f", "three_button_mouse": "\ud83d\uddb1\ufe0f", "trackball": "\ud83d\uddb2\ufe0f", "joystick": "\ud83d\udd79\ufe0f", "compression": "\ud83d\udddc\ufe0f", "minidisc": "\ud83d\udcbd", "floppy_disk": "\ud83d\udcbe", "cd": "\ud83d\udcbf", "dvd": "\ud83d\udcc0", "vhs": "\ud83d\udcfc", "camera": "\ud83d\udcf7", "camera_with_flash": "\ud83d\udcf8", "video_camera": "\ud83d\udcf9", "movie_camera": "\ud83c\udfa5", "projector": "\ud83d\udcfd\ufe0f", "film_projector": "\ud83d\udcfd\ufe0f", "film_frames": "\ud83c\udf9e\ufe0f", "telephone_receiver": "\ud83d\udcde", "telephone": "\u260e\ufe0f", "pager": "\ud83d\udcdf", "fax": "\ud83d\udce0", "tv": "\ud83d\udcfa", "radio": "\ud83d\udcfb", "microphone2": "\ud83c\udf99\ufe0f", "studio_microphone": "\ud83c\udf99\ufe0f", "level_slider": "\ud83c\udf9a\ufe0f", "control_knobs": "\ud83c\udf9b\ufe0f", "compass": "\ud83e\udded", "stopwatch": "\u23f1\ufe0f", "timer": "\u23f2\ufe0f", "timer_clock": "\u23f2\ufe0f", "alarm_clock": "\u23f0", "clock": "\ud83d\udd70\ufe0f", "mantlepiece_clock": "\ud83d\udd70\ufe0f", "hourglass": "\u231b", "hourglass_flowing_sand": "\u23f3", "satellite": "\ud83d\udce1", "battery": "\ud83d\udd0b", "electric_plug": "\ud83d\udd0c", "bulb": "\ud83d\udca1", "flashlight": "\ud83d\udd26", "candle": "\ud83d\udd6f\ufe0f", "fire_extinguisher": "\ud83e\uddef", "oil": "\ud83d\udee2\ufe0f", "oil_drum": "\ud83d\udee2\ufe0f", "money_with_wings": "\ud83d\udcb8", "dollar": "\ud83d\udcb5", "yen": "\ud83d\udcb4", "euro": "\ud83d\udcb6", "pound": "\ud83d\udcb7", "moneybag": "\ud83d\udcb0", "credit_card": "\ud83d\udcb3", "gem": "\ud83d\udc8e", "scales": "\u2696\ufe0f", "toolbox": "\ud83e\uddf0", "wrench": "\ud83d\udd27", "hammer": "\ud83d\udd28", "hammer_pick": "\u2692\ufe0f", "hammer_and_pick": "\u2692\ufe0f", "tools": "\ud83d\udee0\ufe0f", "hammer_and_wrench": "\ud83d\udee0\ufe0f", "pick": "\u26cf\ufe0f", "nut_and_bolt": "\ud83d\udd29", "gear": "\u2699\ufe0f", "bricks": "\ud83e\uddf1", "chains": "\u26d3\ufe0f", "magnet": "\ud83e\uddf2", "gun": "\ud83d\udd2b", "bomb": "\ud83d\udca3", "firecracker": "\ud83e\udde8", "axe": "\ud83e\ude93", "razor": "\ud83e\ude92", "knife": "\ud83d\udd2a", "dagger": "\ud83d\udde1\ufe0f", "dagger_knife": "\ud83d\udde1\ufe0f", "crossed_swords": "\u2694\ufe0f", "shield": "\ud83d\udee1\ufe0f", "smoking": "\ud83d\udeac", "coffin": "\u26b0\ufe0f", "urn": "\u26b1\ufe0f", "funeral_urn": "\u26b1\ufe0f", "amphora": "\ud83c\udffa", "diya_lamp": "\ud83e\ude94", "crystal_ball": "\ud83d\udd2e", "prayer_beads": "\ud83d\udcff", "nazar_amulet": "\ud83e\uddff", "barber": "\ud83d\udc88", "alembic": "\u2697\ufe0f", "telescope": "\ud83d\udd2d", "microscope": "\ud83d\udd2c", "hole": "\ud83d\udd73\ufe0f", "probing_cane": "\ud83e\uddaf", "stethoscope": "\ud83e\ude7a", "adhesive_bandage": "\ud83e\ude79", "pill": "\ud83d\udc8a", "syringe": "\ud83d\udc89", "drop_of_blood": "\ud83e\ude78", "dna": "\ud83e\uddec", "microbe": "\ud83e\udda0", "petri_dish": "\ud83e\uddeb", "test_tube": "\ud83e\uddea", "thermometer": "\ud83c\udf21\ufe0f", "chair": "\ud83e\ude91", "broom": "\ud83e\uddf9", "basket": "\ud83e\uddfa", "roll_of_paper": "\ud83e\uddfb", "toilet": "\ud83d\udebd", "potable_water": "\ud83d\udeb0", "shower": "\ud83d\udebf", "bathtub": "\ud83d\udec1", "bath": "\ud83d\udec0", "soap": "\ud83e\uddfc", "sponge": "\ud83e\uddfd", "squeeze_bottle": "\ud83e\uddf4", "bellhop": "\ud83d\udece\ufe0f", "bellhop_bell": "\ud83d\udece\ufe0f", "key": "\ud83d\udd11", "key2": "\ud83d\udddd\ufe0f", "old_key": "\ud83d\udddd\ufe0f", "door": "\ud83d\udeaa", "couch": "\ud83d\udecb\ufe0f", "couch_and_lamp": "\ud83d\udecb\ufe0f", "bed": "\ud83d\udecf\ufe0f", "sleeping_accommodation": "\ud83d\udecc", "teddy_bear": "\ud83e\uddf8", "frame_photo": "\ud83d\uddbc\ufe0f", "frame_with_picture": "\ud83d\uddbc\ufe0f", "shopping_bags": "\ud83d\udecd\ufe0f", "shopping_cart": "\ud83d\uded2", "shopping_trolley": "\ud83d\uded2", "gift": "\ud83c\udf81", "balloon": "\ud83c\udf88", "flags": "\ud83c\udf8f", "ribbon": "\ud83c\udf80", "confetti_ball": "\ud83c\udf8a", "tada": "\ud83c\udf89", "dolls": "\ud83c\udf8e", "izakaya_lantern": "\ud83c\udfee", "wind_chime": "\ud83c\udf90", "red_envelope": "\ud83e\udde7", "envelope": "\u2709\ufe0f", "envelope_with_arrow": "\ud83d\udce9", "incoming_envelope": "\ud83d\udce8", "e_mail": "\ud83d\udce7", "email": "\ud83d\udce7", "love_letter": "\ud83d\udc8c", "inbox_tray": "\ud83d\udce5", "outbox_tray": "\ud83d\udce4", "package": "\ud83d\udce6", "label": "\ud83c\udff7\ufe0f", "mailbox_closed": "\ud83d\udcea", "mailbox": "\ud83d\udceb", "mailbox_with_mail": "\ud83d\udcec", "mailbox_with_no_mail": "\ud83d\udced", "postbox": "\ud83d\udcee", "postal_horn": "\ud83d\udcef", "scroll": "\ud83d\udcdc", "page_with_curl": "\ud83d\udcc3", "page_facing_up": "\ud83d\udcc4", "bookmark_tabs": "\ud83d\udcd1", "receipt": "\ud83e\uddfe", "bar_chart": "\ud83d\udcca", "chart_with_upwards_trend": "\ud83d\udcc8", "chart_with_downwards_trend": "\ud83d\udcc9", "notepad_spiral": "\ud83d\uddd2\ufe0f", "spiral_note_pad": "\ud83d\uddd2\ufe0f", "calendar_spiral": "\ud83d\uddd3\ufe0f", "spiral_calendar_pad": "\ud83d\uddd3\ufe0f", "calendar": "\ud83d\udcc6", "date": "\ud83d\udcc5", "wastebasket": "\ud83d\uddd1\ufe0f", "card_index": "\ud83d\udcc7", "card_box": "\ud83d\uddc3\ufe0f", "card_file_box": "\ud83d\uddc3\ufe0f", "ballot_box": "\ud83d\uddf3\ufe0f", "ballot_box_with_ballot": "\ud83d\uddf3\ufe0f", "file_cabinet": "\ud83d\uddc4\ufe0f", "clipboard": "\ud83d\udccb", "file_folder": "\ud83d\udcc1", "open_file_folder": "\ud83d\udcc2", "dividers": "\ud83d\uddc2\ufe0f", "card_index_dividers": "\ud83d\uddc2\ufe0f", "newspaper2": "\ud83d\uddde\ufe0f", "rolled_up_newspaper": "\ud83d\uddde\ufe0f", "newspaper": "\ud83d\udcf0", "notebook": "\ud83d\udcd3", "notebook_with_decorative_cover": "\ud83d\udcd4", "ledger": "\ud83d\udcd2", "closed_book": "\ud83d\udcd5", "green_book": "\ud83d\udcd7", "blue_book": "\ud83d\udcd8", "orange_book": "\ud83d\udcd9", "books": "\ud83d\udcda", "book": "\ud83d\udcd6", "bookmark": "\ud83d\udd16", "safety_pin": "\ud83e\uddf7", "link": "\ud83d\udd17", "paperclip": "\ud83d\udcce", "paperclips": "\ud83d\udd87\ufe0f", "linked_paperclips": "\ud83d\udd87\ufe0f", "triangular_ruler": "\ud83d\udcd0", "straight_ruler": "\ud83d\udccf", "abacus": "\ud83e\uddee", "pushpin": "\ud83d\udccc", "round_pushpin": "\ud83d\udccd", "scissors": "\u2702\ufe0f", "pen_ballpoint": "\ud83d\udd8a\ufe0f", "lower_left_ballpoint_pen": "\ud83d\udd8a\ufe0f", "pen_fountain": "\ud83d\udd8b\ufe0f", "lower_left_fountain_pen": "\ud83d\udd8b\ufe0f", "black_nib": "\u2712\ufe0f", "paintbrush": "\ud83d\udd8c\ufe0f", "lower_left_paintbrush": "\ud83d\udd8c\ufe0f", "crayon": "\ud83d\udd8d\ufe0f", "lower_left_crayon": "\ud83d\udd8d\ufe0f", "pencil": "\ud83d\udcdd", "memo": "\ud83d\udcdd", "pencil2": "\u270f\ufe0f", "mag": "\ud83d\udd0d", "mag_right": "\ud83d\udd0e", "lock_with_ink_pen": "\ud83d\udd0f", "closed_lock_with_key": "\ud83d\udd10", "lock": "\ud83d\udd12", "unlock": "\ud83d\udd13", "heart": "\u2764\ufe0f", "orange_heart": "\ud83e\udde1", "yellow_heart": "\ud83d\udc9b", "green_heart": "\ud83d\udc9a", "blue_heart": "\ud83d\udc99", "purple_heart": "\ud83d\udc9c", "black_heart": "\ud83d\udda4", "brown_heart": "\ud83e\udd0e", "white_heart": "\ud83e\udd0d", "broken_heart": "\ud83d\udc94", "heart_exclamation": "\u2763\ufe0f", "heavy_heart_exclamation_mark_ornament": "\u2763\ufe0f", "two_hearts": "\ud83d\udc95", "revolving_hearts": "\ud83d\udc9e", "heartbeat": "\ud83d\udc93", "heartpulse": "\ud83d\udc97", "sparkling_heart": "\ud83d\udc96", "cupid": "\ud83d\udc98", "gift_heart": "\ud83d\udc9d", "heart_decoration": "\ud83d\udc9f", "peace": "\u262e\ufe0f", "peace_symbol": "\u262e\ufe0f", "cross": "\u271d\ufe0f", "latin_cross": "\u271d\ufe0f", "star_and_crescent": "\u262a\ufe0f", "om_symbol": "\ud83d\udd49\ufe0f", "wheel_of_dharma": "\u2638\ufe0f", "star_of_david": "\u2721\ufe0f", "six_pointed_star": "\ud83d\udd2f", "menorah": "\ud83d\udd4e", "yin_yang": "\u262f\ufe0f", "orthodox_cross": "\u2626\ufe0f", "place_of_worship": "\ud83d\uded0", "worship_symbol": "\ud83d\uded0", "ophiuchus": "\u26ce", "aries": "\u2648", "taurus": "\u2649", "gemini": "\u264a", "cancer": "\u264b", "leo": "\u264c", "virgo": "\u264d", "libra": "\u264e", "scorpius": "\u264f", "sagittarius": "\u2650", "capricorn": "\u2651", "aquarius": "\u2652", "pisces": "\u2653", "id": "\ud83c\udd94", "atom": "\u269b\ufe0f", "atom_symbol": "\u269b\ufe0f", "accept": "\ud83c\ude51", "radioactive": "\u2622\ufe0f", "radioactive_sign": "\u2622\ufe0f", "biohazard": "\u2623\ufe0f", "biohazard_sign": "\u2623\ufe0f", "mobile_phone_off": "\ud83d\udcf4", "vibration_mode": "\ud83d\udcf3", "u6709": "\ud83c\ude36", "u7121": "\ud83c\ude1a", "u7533": "\ud83c\ude38", "u55b6": "\ud83c\ude3a", "u6708": "\ud83c\ude37\ufe0f", "eight_pointed_black_star": "\u2734\ufe0f", "vs": "\ud83c\udd9a", "white_flower": "\ud83d\udcae", "ideograph_advantage": "\ud83c\ude50", "secret": "\u3299\ufe0f", "congratulations": "\u3297\ufe0f", "u5408": "\ud83c\ude34", "u6e80": "\ud83c\ude35", "u5272": "\ud83c\ude39", "u7981": "\ud83c\ude32", "a": "\ud83c\udd70\ufe0f", "b": "\ud83c\udd71\ufe0f", "ab": "\ud83c\udd8e", "cl": "\ud83c\udd91", "o2": "\ud83c\udd7e\ufe0f", "sos": "\ud83c\udd98", "x": "\u274c", "o": "\u2b55", "octagonal_sign": "\ud83d\uded1", "stop_sign": "\ud83d\uded1", "no_entry": "\u26d4", "name_badge": "\ud83d\udcdb", "no_entry_sign": "\ud83d\udeab", "100": "\ud83d\udcaf", "anger": "\ud83d\udca2", "hotsprings": "\u2668\ufe0f", "no_pedestrians": "\ud83d\udeb7", "do_not_litter": "\ud83d\udeaf", "no_bicycles": "\ud83d\udeb3", "non_potable_water": "\ud83d\udeb1", "underage": "\ud83d\udd1e", "no_mobile_phones": "\ud83d\udcf5", "no_smoking": "\ud83d\udead", "exclamation": "\u2757", "grey_exclamation": "\u2755", "question": "\u2753", "grey_question": "\u2754", "bangbang": "\u203c\ufe0f", "interrobang": "\u2049\ufe0f", "low_brightness": "\ud83d\udd05", "high_brightness": "\ud83d\udd06", "part_alternation_mark": "\u303d\ufe0f", "warning": "\u26a0\ufe0f", "children_crossing": "\ud83d\udeb8", "trident": "\ud83d\udd31", "fleur_de_lis": "\u269c\ufe0f", "beginner": "\ud83d\udd30", "recycle": "\u267b\ufe0f", "white_check_mark": "\u2705", "u6307": "\ud83c\ude2f", "chart": "\ud83d\udcb9", "sparkle": "\u2747\ufe0f", "eight_spoked_asterisk": "\u2733\ufe0f", "negative_squared_cross_mark": "\u274e", "globe_with_meridians": "\ud83c\udf10", "diamond_shape_with_a_dot_inside": "\ud83d\udca0", "m": "\u24c2\ufe0f", "cyclone": "\ud83c\udf00", "zzz": "\ud83d\udca4", "atm": "\ud83c\udfe7", "wc": "\ud83d\udebe", "wheelchair": "\u267f", "parking": "\ud83c\udd7f\ufe0f", "u7a7a": "\ud83c\ude33", "sa": "\ud83c\ude02\ufe0f", "passport_control": "\ud83d\udec2", "customs": "\ud83d\udec3", "baggage_claim": "\ud83d\udec4", "left_luggage": "\ud83d\udec5", "mens": "\ud83d\udeb9", "womens": "\ud83d\udeba", "baby_symbol": "\ud83d\udebc", "restroom": "\ud83d\udebb", "put_litter_in_its_place": "\ud83d\udeae", "cinema": "\ud83c\udfa6", "signal_strength": "\ud83d\udcf6", "koko": "\ud83c\ude01", "symbols": "\ud83d\udd23", "information_source": "\u2139\ufe0f", "abc": "\ud83d\udd24", "abcd": "\ud83d\udd21", "capital_abcd": "\ud83d\udd20", "ng": "\ud83c\udd96", "ok": "\ud83c\udd97", "up": "\ud83c\udd99", "cool": "\ud83c\udd92", "new": "\ud83c\udd95", "free": "\ud83c\udd93", "zero": "0\ufe0f\u20e3", "one": "1\ufe0f\u20e3", "two": "2\ufe0f\u20e3", "three": "3\ufe0f\u20e3", "four": "4\ufe0f\u20e3", "five": "5\ufe0f\u20e3", "six": "6\ufe0f\u20e3", "seven": "7\ufe0f\u20e3", "eight": "8\ufe0f\u20e3", "nine": "9\ufe0f\u20e3", "keycap_ten": "\ud83d\udd1f", "1234": "\ud83d\udd22", "hash": "#\ufe0f\u20e3", "asterisk": "*\ufe0f\u20e3", "keycap_asterisk": "*\ufe0f\u20e3", "eject": "\u23cf\ufe0f", "eject_symbol": "\u23cf\ufe0f", "arrow_forward": "\u25b6\ufe0f", "pause_button": "\u23f8\ufe0f", "double_vertical_bar": "\u23f8\ufe0f", "play_pause": "\u23ef\ufe0f", "stop_button": "\u23f9\ufe0f", "record_button": "\u23fa\ufe0f", "track_next": "\u23ed\ufe0f", "next_track": "\u23ed\ufe0f", "track_previous": "\u23ee\ufe0f", "previous_track": "\u23ee\ufe0f", "fast_forward": "\u23e9", "rewind": "\u23ea", "arrow_double_up": "\u23eb", "arrow_double_down": "\u23ec", "arrow_backward": "\u25c0\ufe0f", "arrow_up_small": "\ud83d\udd3c", "arrow_down_small": "\ud83d\udd3d", "arrow_right": "\u27a1\ufe0f", "arrow_left": "\u2b05\ufe0f", "arrow_up": "\u2b06\ufe0f", "arrow_down": "\u2b07\ufe0f", "arrow_upper_right": "\u2197\ufe0f", "arrow_lower_right": "\u2198\ufe0f", "arrow_lower_left": "\u2199\ufe0f", "arrow_upper_left": "\u2196\ufe0f", "arrow_up_down": "\u2195\ufe0f", "left_right_arrow": "\u2194\ufe0f", "arrow_right_hook": "\u21aa\ufe0f", "leftwards_arrow_with_hook": "\u21a9\ufe0f", "arrow_heading_up": "\u2934\ufe0f", "arrow_heading_down": "\u2935\ufe0f", "twisted_rightwards_arrows": "\ud83d\udd00", "repeat": "\ud83d\udd01", "repeat_one": "\ud83d\udd02", "arrows_counterclockwise": "\ud83d\udd04", "arrows_clockwise": "\ud83d\udd03", "musical_note": "\ud83c\udfb5", "notes": "\ud83c\udfb6", "heavy_plus_sign": "\u2795", "heavy_minus_sign": "\u2796", "heavy_division_sign": "\u2797", "heavy_multiplication_x": "\u2716\ufe0f", "infinity": "\u267e\ufe0f", "heavy_dollar_sign": "\ud83d\udcb2", "currency_exchange": "\ud83d\udcb1", "tm": "\u2122\ufe0f", "copyright": "\u00a9\ufe0f", "registered": "\u00ae\ufe0f", "wavy_dash": "\u3030\ufe0f", "curly_loop": "\u27b0", "loop": "\u27bf", "end": "\ud83d\udd1a", "back": "\ud83d\udd19", "on": "\ud83d\udd1b", "top": "\ud83d\udd1d", "soon": "\ud83d\udd1c", "heavy_check_mark": "\u2714\ufe0f", "ballot_box_with_check": "\u2611\ufe0f", "radio_button": "\ud83d\udd18", "white_circle": "\u26aa", "black_circle": "\u26ab", "red_circle": "\ud83d\udd34", "blue_circle": "\ud83d\udd35", "brown_circle": "\ud83d\udfe4", "purple_circle": "\ud83d\udfe3", "green_circle": "\ud83d\udfe2", "yellow_circle": "\ud83d\udfe1", "orange_circle": "\ud83d\udfe0", "small_red_triangle": "\ud83d\udd3a", "small_red_triangle_down": "\ud83d\udd3b", "small_orange_diamond": "\ud83d\udd38", "small_blue_diamond": "\ud83d\udd39", "large_orange_diamond": "\ud83d\udd36", "large_blue_diamond": "\ud83d\udd37", "white_square_button": "\ud83d\udd33", "black_square_button": "\ud83d\udd32", "black_small_square": "\u25aa\ufe0f", "white_small_square": "\u25ab\ufe0f", "black_medium_small_square": "\u25fe", "white_medium_small_square": "\u25fd", "black_medium_square": "\u25fc\ufe0f", "white_medium_square": "\u25fb\ufe0f", "black_large_square": "\u2b1b", "white_large_square": "\u2b1c", "orange_square": "\ud83d\udfe7", "blue_square": "\ud83d\udfe6", "red_square": "\ud83d\udfe5", "brown_square": "\ud83d\udfeb", "purple_square": "\ud83d\udfea", "green_square": "\ud83d\udfe9", "yellow_square": "\ud83d\udfe8", "speaker": "\ud83d\udd08", "mute": "\ud83d\udd07", "sound": "\ud83d\udd09", "loud_sound": "\ud83d\udd0a", "bell": "\ud83d\udd14", "no_bell": "\ud83d\udd15", "mega": "\ud83d\udce3", "loudspeaker": "\ud83d\udce2", "speech_left": "\ud83d\udde8\ufe0f", "left_speech_bubble": "\ud83d\udde8\ufe0f", "eye_in_speech_bubble": "\ud83d\udc41\u200d\ud83d\udde8", "speech_balloon": "\ud83d\udcac", "thought_balloon": "\ud83d\udcad", "anger_right": "\ud83d\uddef\ufe0f", "right_anger_bubble": "\ud83d\uddef\ufe0f", "spades": "\u2660\ufe0f", "clubs": "\u2663\ufe0f", "hearts": "\u2665\ufe0f", "diamonds": "\u2666\ufe0f", "black_joker": "\ud83c\udccf", "flower_playing_cards": "\ud83c\udfb4", "mahjong": "\ud83c\udc04", "clock1": "\ud83d\udd50", "clock2": "\ud83d\udd51", "clock3": "\ud83d\udd52", "clock4": "\ud83d\udd53", "clock5": "\ud83d\udd54", "clock6": "\ud83d\udd55", "clock7": "\ud83d\udd56", "clock8": "\ud83d\udd57", "clock9": "\ud83d\udd58", "clock10": "\ud83d\udd59", "clock11": "\ud83d\udd5a", "clock12": "\ud83d\udd5b", "clock130": "\ud83d\udd5c", "clock230": "\ud83d\udd5d", "clock330": "\ud83d\udd5e", "clock430": "\ud83d\udd5f", "clock530": "\ud83d\udd60", "clock630": "\ud83d\udd61", "clock730": "\ud83d\udd62", "clock830": "\ud83d\udd63", "clock930": "\ud83d\udd64", "clock1030": "\ud83d\udd65", "clock1130": "\ud83d\udd66", "clock1230": "\ud83d\udd67", "female_sign": "\u2640\ufe0f", "male_sign": "\u2642\ufe0f", "medical_symbol": "\u2695\ufe0f", "regional_indicator_z": "\ud83c\uddff", "regional_indicator_y": "\ud83c\uddfe", "regional_indicator_x": "\ud83c\uddfd", "regional_indicator_w": "\ud83c\uddfc", "regional_indicator_v": "\ud83c\uddfb", "regional_indicator_u": "\ud83c\uddfa", "regional_indicator_t": "\ud83c\uddf9", "regional_indicator_s": "\ud83c\uddf8", "regional_indicator_r": "\ud83c\uddf7", "regional_indicator_q": "\ud83c\uddf6", "regional_indicator_p": "\ud83c\uddf5", "regional_indicator_o": "\ud83c\uddf4", "regional_indicator_n": "\ud83c\uddf3", "regional_indicator_m": "\ud83c\uddf2", "regional_indicator_l": "\ud83c\uddf1", "regional_indicator_k": "\ud83c\uddf0", "regional_indicator_j": "\ud83c\uddef", "regional_indicator_i": "\ud83c\uddee", "regional_indicator_h": "\ud83c\udded", "regional_indicator_g": "\ud83c\uddec", "regional_indicator_f": "\ud83c\uddeb", "regional_indicator_e": "\ud83c\uddea", "regional_indicator_d": "\ud83c\udde9", "regional_indicator_c": "\ud83c\udde8", "regional_indicator_b": "\ud83c\udde7", "regional_indicator_a": "\ud83c\udde6", "flag_white": "\ud83c\udff3\ufe0f", "flag_black": "\ud83c\udff4", "checkered_flag": "\ud83c\udfc1", "triangular_flag_on_post": "\ud83d\udea9", "rainbow_flag": "\ud83c\udff3\ufe0f\u200d\ud83c\udf08", "gay_pride_flag": "\ud83c\udff3\ufe0f\u200d\ud83c\udf08", "pirate_flag": "\ud83c\udff4\u200d\u2620\ufe0f", "flag_af": "\ud83c\udde6\ud83c\uddeb", "flag_ax": "\ud83c\udde6\ud83c\uddfd", "flag_al": "\ud83c\udde6\ud83c\uddf1", "flag_dz": "\ud83c\udde9\ud83c\uddff", "flag_as": "\ud83c\udde6\ud83c\uddf8", "flag_ad": "\ud83c\udde6\ud83c\udde9", "flag_ao": "\ud83c\udde6\ud83c\uddf4", "flag_ai": "\ud83c\udde6\ud83c\uddee", "flag_aq": "\ud83c\udde6\ud83c\uddf6", "flag_ag": "\ud83c\udde6\ud83c\uddec", "flag_ar": "\ud83c\udde6\ud83c\uddf7", "flag_am": "\ud83c\udde6\ud83c\uddf2", "flag_aw": "\ud83c\udde6\ud83c\uddfc", "flag_au": "\ud83c\udde6\ud83c\uddfa", "flag_at": "\ud83c\udde6\ud83c\uddf9", "flag_az": "\ud83c\udde6\ud83c\uddff", "flag_bs": "\ud83c\udde7\ud83c\uddf8", "flag_bh": "\ud83c\udde7\ud83c\udded", "flag_bd": "\ud83c\udde7\ud83c\udde9", "flag_bb": "\ud83c\udde7\ud83c\udde7", "flag_by": "\ud83c\udde7\ud83c\uddfe", "flag_be": "\ud83c\udde7\ud83c\uddea", "flag_bz": "\ud83c\udde7\ud83c\uddff", "flag_bj": "\ud83c\udde7\ud83c\uddef", "flag_bm": "\ud83c\udde7\ud83c\uddf2", "flag_bt": "\ud83c\udde7\ud83c\uddf9", "flag_bo": "\ud83c\udde7\ud83c\uddf4", "flag_ba": "\ud83c\udde7\ud83c\udde6", "flag_bw": "\ud83c\udde7\ud83c\uddfc", "flag_br": "\ud83c\udde7\ud83c\uddf7", "flag_io": "\ud83c\uddee\ud83c\uddf4", "flag_vg": "\ud83c\uddfb\ud83c\uddec", "flag_bn": "\ud83c\udde7\ud83c\uddf3", "flag_bg": "\ud83c\udde7\ud83c\uddec", "flag_bf": "\ud83c\udde7\ud83c\uddeb", "flag_bi": "\ud83c\udde7\ud83c\uddee", "flag_kh": "\ud83c\uddf0\ud83c\udded", "flag_cm": "\ud83c\udde8\ud83c\uddf2", "flag_ca": "\ud83c\udde8\ud83c\udde6", "flag_ic": "\ud83c\uddee\ud83c\udde8", "flag_cv": "\ud83c\udde8\ud83c\uddfb", "flag_bq": "\ud83c\udde7\ud83c\uddf6", "flag_ky": "\ud83c\uddf0\ud83c\uddfe", "flag_cf": "\ud83c\udde8\ud83c\uddeb", "flag_td": "\ud83c\uddf9\ud83c\udde9", "flag_cl": "\ud83c\udde8\ud83c\uddf1", "flag_cn": "\ud83c\udde8\ud83c\uddf3", "flag_cx": "\ud83c\udde8\ud83c\uddfd", "flag_cc": "\ud83c\udde8\ud83c\udde8", "flag_co": "\ud83c\udde8\ud83c\uddf4", "flag_km": "\ud83c\uddf0\ud83c\uddf2", "flag_cg": "\ud83c\udde8\ud83c\uddec", "flag_cd": "\ud83c\udde8\ud83c\udde9", "flag_ck": "\ud83c\udde8\ud83c\uddf0", "flag_cr": "\ud83c\udde8\ud83c\uddf7", "flag_ci": "\ud83c\udde8\ud83c\uddee", "flag_hr": "\ud83c\udded\ud83c\uddf7", "flag_cu": "\ud83c\udde8\ud83c\uddfa", "flag_cw": "\ud83c\udde8\ud83c\uddfc", "flag_cy": "\ud83c\udde8\ud83c\uddfe", "flag_cz": "\ud83c\udde8\ud83c\uddff", "flag_dk": "\ud83c\udde9\ud83c\uddf0", "flag_dj": "\ud83c\udde9\ud83c\uddef", "flag_dm": "\ud83c\udde9\ud83c\uddf2", "flag_do": "\ud83c\udde9\ud83c\uddf4", "flag_ec": "\ud83c\uddea\ud83c\udde8", "flag_eg": "\ud83c\uddea\ud83c\uddec", "flag_sv": "\ud83c\uddf8\ud83c\uddfb", "flag_gq": "\ud83c\uddec\ud83c\uddf6", "flag_er": "\ud83c\uddea\ud83c\uddf7", "flag_ee": "\ud83c\uddea\ud83c\uddea", "flag_et": "\ud83c\uddea\ud83c\uddf9", "flag_eu": "\ud83c\uddea\ud83c\uddfa", "flag_fk": "\ud83c\uddeb\ud83c\uddf0", "flag_fo": "\ud83c\uddeb\ud83c\uddf4", "flag_fj": "\ud83c\uddeb\ud83c\uddef", "flag_fi": "\ud83c\uddeb\ud83c\uddee", "flag_fr": "\ud83c\uddeb\ud83c\uddf7", "flag_gf": "\ud83c\uddec\ud83c\uddeb", "flag_pf": "\ud83c\uddf5\ud83c\uddeb", "flag_tf": "\ud83c\uddf9\ud83c\uddeb", "flag_ga": "\ud83c\uddec\ud83c\udde6", "flag_gm": "\ud83c\uddec\ud83c\uddf2", "flag_ge": "\ud83c\uddec\ud83c\uddea", "flag_de": "\ud83c\udde9\ud83c\uddea", "flag_gh": "\ud83c\uddec\ud83c\udded", "flag_gi": "\ud83c\uddec\ud83c\uddee", "flag_gr": "\ud83c\uddec\ud83c\uddf7", "flag_gl": "\ud83c\uddec\ud83c\uddf1", "flag_gd": "\ud83c\uddec\ud83c\udde9", "flag_gp": "\ud83c\uddec\ud83c\uddf5", "flag_gu": "\ud83c\uddec\ud83c\uddfa", "flag_gt": "\ud83c\uddec\ud83c\uddf9", "flag_gg": "\ud83c\uddec\ud83c\uddec", "flag_gn": "\ud83c\uddec\ud83c\uddf3", "flag_gw": "\ud83c\uddec\ud83c\uddfc", "flag_gy": "\ud83c\uddec\ud83c\uddfe", "flag_ht": "\ud83c\udded\ud83c\uddf9", "flag_hn": "\ud83c\udded\ud83c\uddf3", "flag_hk": "\ud83c\udded\ud83c\uddf0", "flag_hu": "\ud83c\udded\ud83c\uddfa", "flag_is": "\ud83c\uddee\ud83c\uddf8", "flag_in": "\ud83c\uddee\ud83c\uddf3", "flag_id": "\ud83c\uddee\ud83c\udde9", "flag_ir": "\ud83c\uddee\ud83c\uddf7", "flag_iq": "\ud83c\uddee\ud83c\uddf6", "flag_ie": "\ud83c\uddee\ud83c\uddea", "flag_im": "\ud83c\uddee\ud83c\uddf2", "flag_il": "\ud83c\uddee\ud83c\uddf1", "flag_it": "\ud83c\uddee\ud83c\uddf9", "flag_jm": "\ud83c\uddef\ud83c\uddf2", "flag_jp": "\ud83c\uddef\ud83c\uddf5", "crossed_flags": "\ud83c\udf8c", "flag_je": "\ud83c\uddef\ud83c\uddea", "flag_jo": "\ud83c\uddef\ud83c\uddf4", "flag_kz": "\ud83c\uddf0\ud83c\uddff", "flag_ke": "\ud83c\uddf0\ud83c\uddea", "flag_ki": "\ud83c\uddf0\ud83c\uddee", "flag_xk": "\ud83c\uddfd\ud83c\uddf0", "flag_kw": "\ud83c\uddf0\ud83c\uddfc", "flag_kg": "\ud83c\uddf0\ud83c\uddec", "flag_la": "\ud83c\uddf1\ud83c\udde6", "flag_lv": "\ud83c\uddf1\ud83c\uddfb", "flag_lb": "\ud83c\uddf1\ud83c\udde7", "flag_ls": "\ud83c\uddf1\ud83c\uddf8", "flag_lr": "\ud83c\uddf1\ud83c\uddf7", "flag_ly": "\ud83c\uddf1\ud83c\uddfe", "flag_li": "\ud83c\uddf1\ud83c\uddee", "flag_lt": "\ud83c\uddf1\ud83c\uddf9", "flag_lu": "\ud83c\uddf1\ud83c\uddfa", "flag_mo": "\ud83c\uddf2\ud83c\uddf4", "flag_mk": "\ud83c\uddf2\ud83c\uddf0", "flag_mg": "\ud83c\uddf2\ud83c\uddec", "flag_mw": "\ud83c\uddf2\ud83c\uddfc", "flag_my": "\ud83c\uddf2\ud83c\uddfe", "flag_mv": "\ud83c\uddf2\ud83c\uddfb", "flag_ml": "\ud83c\uddf2\ud83c\uddf1", "flag_mt": "\ud83c\uddf2\ud83c\uddf9", "flag_mh": "\ud83c\uddf2\ud83c\udded", "flag_mq": "\ud83c\uddf2\ud83c\uddf6", "flag_mr": "\ud83c\uddf2\ud83c\uddf7", "flag_mu": "\ud83c\uddf2\ud83c\uddfa", "flag_yt": "\ud83c\uddfe\ud83c\uddf9", "flag_mx": "\ud83c\uddf2\ud83c\uddfd", "flag_fm": "\ud83c\uddeb\ud83c\uddf2", "flag_md": "\ud83c\uddf2\ud83c\udde9", "flag_mc": "\ud83c\uddf2\ud83c\udde8", "flag_mn": "\ud83c\uddf2\ud83c\uddf3", "flag_me": "\ud83c\uddf2\ud83c\uddea", "flag_ms": "\ud83c\uddf2\ud83c\uddf8", "flag_ma": "\ud83c\uddf2\ud83c\udde6", "flag_mz": "\ud83c\uddf2\ud83c\uddff", "flag_mm": "\ud83c\uddf2\ud83c\uddf2", "flag_na": "\ud83c\uddf3\ud83c\udde6", "flag_nr": "\ud83c\uddf3\ud83c\uddf7", "flag_np": "\ud83c\uddf3\ud83c\uddf5", "flag_nl": "\ud83c\uddf3\ud83c\uddf1", "flag_nc": "\ud83c\uddf3\ud83c\udde8", "flag_nz": "\ud83c\uddf3\ud83c\uddff", "flag_ni": "\ud83c\uddf3\ud83c\uddee", "flag_ne": "\ud83c\uddf3\ud83c\uddea", "flag_ng": "\ud83c\uddf3\ud83c\uddec", "flag_nu": "\ud83c\uddf3\ud83c\uddfa", "flag_nf": "\ud83c\uddf3\ud83c\uddeb", "flag_kp": "\ud83c\uddf0\ud83c\uddf5", "flag_mp": "\ud83c\uddf2\ud83c\uddf5", "flag_no": "\ud83c\uddf3\ud83c\uddf4", "flag_om": "\ud83c\uddf4\ud83c\uddf2", "flag_pk": "\ud83c\uddf5\ud83c\uddf0", "flag_pw": "\ud83c\uddf5\ud83c\uddfc", "flag_ps": "\ud83c\uddf5\ud83c\uddf8", "flag_pa": "\ud83c\uddf5\ud83c\udde6", "flag_pg": "\ud83c\uddf5\ud83c\uddec", "flag_py": "\ud83c\uddf5\ud83c\uddfe", "flag_pe": "\ud83c\uddf5\ud83c\uddea", "flag_ph": "\ud83c\uddf5\ud83c\udded", "flag_pn": "\ud83c\uddf5\ud83c\uddf3", "flag_pl": "\ud83c\uddf5\ud83c\uddf1", "flag_pt": "\ud83c\uddf5\ud83c\uddf9", "flag_pr": "\ud83c\uddf5\ud83c\uddf7", "flag_qa": "\ud83c\uddf6\ud83c\udde6", "flag_re": "\ud83c\uddf7\ud83c\uddea", "flag_ro": "\ud83c\uddf7\ud83c\uddf4", "flag_ru": "\ud83c\uddf7\ud83c\uddfa", "flag_rw": "\ud83c\uddf7\ud83c\uddfc", "flag_ws": "\ud83c\uddfc\ud83c\uddf8", "flag_sm": "\ud83c\uddf8\ud83c\uddf2", "flag_st": "\ud83c\uddf8\ud83c\uddf9", "flag_sa": "\ud83c\uddf8\ud83c\udde6", "flag_sn": "\ud83c\uddf8\ud83c\uddf3", "flag_rs": "\ud83c\uddf7\ud83c\uddf8", "flag_sc": "\ud83c\uddf8\ud83c\udde8", "flag_sl": "\ud83c\uddf8\ud83c\uddf1", "flag_sg": "\ud83c\uddf8\ud83c\uddec", "flag_sx": "\ud83c\uddf8\ud83c\uddfd", "flag_sk": "\ud83c\uddf8\ud83c\uddf0", "flag_si": "\ud83c\uddf8\ud83c\uddee", "flag_gs": "\ud83c\uddec\ud83c\uddf8", "flag_sb": "\ud83c\uddf8\ud83c\udde7", "flag_so": "\ud83c\uddf8\ud83c\uddf4", "flag_za": "\ud83c\uddff\ud83c\udde6", "flag_kr": "\ud83c\uddf0\ud83c\uddf7", "flag_ss": "\ud83c\uddf8\ud83c\uddf8", "flag_es": "\ud83c\uddea\ud83c\uddf8", "flag_lk": "\ud83c\uddf1\ud83c\uddf0", "flag_bl": "\ud83c\udde7\ud83c\uddf1", "flag_sh": "\ud83c\uddf8\ud83c\udded", "flag_kn": "\ud83c\uddf0\ud83c\uddf3", "flag_lc": "\ud83c\uddf1\ud83c\udde8", "flag_pm": "\ud83c\uddf5\ud83c\uddf2", "flag_vc": "\ud83c\uddfb\ud83c\udde8", "flag_sd": "\ud83c\uddf8\ud83c\udde9", "flag_sr": "\ud83c\uddf8\ud83c\uddf7", "flag_sz": "\ud83c\uddf8\ud83c\uddff", "flag_se": "\ud83c\uddf8\ud83c\uddea", "flag_ch": "\ud83c\udde8\ud83c\udded", "flag_sy": "\ud83c\uddf8\ud83c\uddfe", "flag_tw": "\ud83c\uddf9\ud83c\uddfc", "flag_tj": "\ud83c\uddf9\ud83c\uddef", "flag_tz": "\ud83c\uddf9\ud83c\uddff", "flag_th": "\ud83c\uddf9\ud83c\udded", "flag_tl": "\ud83c\uddf9\ud83c\uddf1", "flag_tg": "\ud83c\uddf9\ud83c\uddec", "flag_tk": "\ud83c\uddf9\ud83c\uddf0", "flag_to": "\ud83c\uddf9\ud83c\uddf4", "flag_tt": "\ud83c\uddf9\ud83c\uddf9", "flag_tn": "\ud83c\uddf9\ud83c\uddf3", "flag_tr": "\ud83c\uddf9\ud83c\uddf7", "flag_tm": "\ud83c\uddf9\ud83c\uddf2", "flag_tc": "\ud83c\uddf9\ud83c\udde8", "flag_vi": "\ud83c\uddfb\ud83c\uddee", "flag_tv": "\ud83c\uddf9\ud83c\uddfb", "flag_ug": "\ud83c\uddfa\ud83c\uddec", "flag_ua": "\ud83c\uddfa\ud83c\udde6", "flag_ae": "\ud83c\udde6\ud83c\uddea", "flag_gb": "\ud83c\uddec\ud83c\udde7", "england": "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc65\udb40\udc6e\udb40\udc67\udb40\udc7f", "scotland": "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc73\udb40\udc63\udb40\udc74\udb40\udc7f", "wales": "\ud83c\udff4\udb40\udc67\udb40\udc62\udb40\udc77\udb40\udc6c\udb40\udc73\udb40\udc7f", "flag_us": "\ud83c\uddfa\ud83c\uddf8", "flag_uy": "\ud83c\uddfa\ud83c\uddfe", "flag_uz": "\ud83c\uddfa\ud83c\uddff", "flag_vu": "\ud83c\uddfb\ud83c\uddfa", "flag_va": "\ud83c\uddfb\ud83c\udde6", "flag_ve": "\ud83c\uddfb\ud83c\uddea", "flag_vn": "\ud83c\uddfb\ud83c\uddf3", "flag_wf": "\ud83c\uddfc\ud83c\uddeb", "flag_eh": "\ud83c\uddea\ud83c\udded", "flag_ye": "\ud83c\uddfe\ud83c\uddea", "flag_zm": "\ud83c\uddff\ud83c\uddf2", "flag_zw": "\ud83c\uddff\ud83c\uddfc", "flag_ac": "\ud83c\udde6\ud83c\udde8", "flag_bv": "\ud83c\udde7\ud83c\uddfb", "flag_cp": "\ud83c\udde8\ud83c\uddf5", "flag_ea": "\ud83c\uddea\ud83c\udde6", "flag_dg": "\ud83c\udde9\ud83c\uddec", "flag_hm": "\ud83c\udded\ud83c\uddf2", "flag_mf": "\ud83c\uddf2\ud83c\uddeb", "flag_sj": "\ud83c\uddf8\ud83c\uddef", "flag_ta": "\ud83c\uddf9\ud83c\udde6", "flag_um": "\ud83c\uddfa\ud83c\uddf2", "united_nations": "\ud83c\uddfa\ud83c\uddf3"}
	},
	unload: async () => {
		document.removeEventListener("keydown", this.keyListener);
		document.removeEventListener("keyup", this.keyListener);
		document.removeEventListener("mousedown", this.clickListener);
		document.removeEventListener("mouseup", this.clickListener);
		document.removeEventListener("wheel", this.wheeListener);
		document.removeEventListener("mousemove", this.moveListener);
		document.removeEventListener('contextmenu', this.contextListener);
	}
});