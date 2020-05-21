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
				transition: text-shadow 0.2s ease, opacity 0.2s ease;
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
				text-shadow: 1px 1px 4px rgba(200,0,0,1), -1px -1px 4px rgba(200,0,0,1), 1px 1px 4px rgba(200,0,0,1), -1px -1px 4px rgba(200,0,0,1);
				opacity: 0.5;
			}
			.tobedel {
				background-color: rgba(100,0,0,0.5);
			}
			.aoe-active .get-md {
				text-shadow: 1px 1px 4px rgba(0,120,255,1), -1px -1px 4px rgba(0,120,255,1), 1px 1px 4px rgba(0,120,255,1), -1px -1px 4px rgba(0,120,255,1);
				opacity: 0.6;
			}
			.aoe-active .mute {
				text-shadow: 1px 1px 4px rgba(203,6,239,1), -1px -1px 4px rgba(203,6,239,1), 1px 1px 4px rgba(203,6,239,1), -1px -1px 4px rgba(203,6,239,1);
				opacity: 0.6;
			}
			.aoe-active .unmute {
				text-shadow: 1px 1px 4px rgba(0,200,0,1), -1px -1px 4px rgba(0,200,0,1), 1px 1px 4px rgba(0,200,0,1), -1px -1px 4px rgba(0,200,0,1);
				opacity: 0.6;
			}
			.aoe-active .ban {
				text-shadow: 1px 1px 4px rgba(50,0,0,1), -1px -1px 4px rgba(50,0,0,1), 1px 1px 4px rgba(50,0,0,1), -1px -1px 4px rgba(50,0,0,1);
				opacity: 0.6;
			}
			.aoe-active .smug {
				text-shadow: 1px 1px 4px rgba(150,150,150,1), -1px -1px 4px rgba(150,150,150,1), 1px 1px 4px rgba(150,150,150,1), -1px -1px 4px rgba(150,150,150,1);
				opacity: 0.6;
			}
			.aoe-active .dereact .${EDApi.findModule('reactions').reactions} {
				text-shadow: 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1), 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1);
				opacity: 0.6;
			}
			.aoe-active .dereact .${EDApi.findModule('reactions').reactions} .${EDApi.findModule('reaction').reaction} {
    			background-color: rgba(228, 21, 21, 0.3);
			}
			`;
			document.body.appendChild(style);
			this.dynamicStyle = document.body.appendChild(document.createElement('style'));
			this.circle = document.body.appendChild(this.circle);
		}

		this.cM = window.EDApi.findModule('getChannelId');
		this.dM = window.EDApi.findModule('deleteMessage');
		this.ewM = window.EDApi.findModule('embedWrapper');
		this.sM = window.EDApi.findModule('sendMessage');
		this.reactionModule = EDApi.findModule('addReaction');
		this.chatContentClass = '.'+window.EDApi.findModule('chatContent').chatContent;
		this.messageClass = '.' + window.EDApi.findModule('cozyMessage').cozyMessage;
		if (!this.cM || !this.dM || !this.ewM) {
			return this.error('Aborted loading - Failed to find required modules!');
		}
		this.muteDuration = 10;
		this.classList = ['delete', 'get-md', 'mute', 'unmute', 'ban', 'smug', 'dereact']

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
					case 'smug':
						this.circle.circle.style.filter = "saturate(0) brightness(1.6)";
					var emote = document.querySelector('.'+EDApi.findModule('textAreaSlate').textArea+' .emoji')?document.querySelector('.'+EDApi.findModule('textAreaSlate').textArea+' .emoji').src:'https://cdn.discordapp.com/emojis/643603380748419085.png';
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

		this.pinCircle = (b) => {
			this.pinned = !!b;
			document.body.classList[['remove','add'][+b]]('circle-pinned');
			if(b == false) {
				this.circle.style.transition = "";
			}
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
					87:	'smug', //W
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
			if(e.type == 'mousedown') {
				var time = ({
					'get-md': 1,
					'smug': 200,
					'dereact': 800,
					'delete': 500,
					'mute': 1000,
					'unmute': 1000,
					'ban': 3000,
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
						'unmute': (userID) => `.unmute ${userID} AoE-muted`,
						'ban': (userID) => `.ban ${userID} AoE-banned`
					})[this.mode];
					([...new Set(ids.map(userID => userID.__reactInternalInstance$.memoizedProps.children[1].props.message.author.id))])
						.forEach((userID, i) => {
							setTimeout(() => {
								this.sM.sendMessage(channelId, {content: message(userID)})
							}, i*350)
						})
					break;
				case 'smug':
					ids = shuffle(ids);
				var emoteSource = document.querySelector('.'+EDApi.findModule('textAreaSlate').textArea+' .emoji')
				var emote;
					if(!emoteSource){
						emote = {id: "643603380748419085", name: "KaguyaSmug", animated: false}
					} else {
					var props = emoteSource.__reactInternalInstance$.return.memoizedProps;
						emote = {
							id: props.emojiId,
							name: props.emojiName.replace(/:/g, ''),
							animated: props.animated
						}
						if(emoteSource.__reactInternalInstance$.memoizedProps.src.indexOf('.svg') > -1) {
							delete emote.id;
							emote.name = '\N{'+emote.name.split('_').join(' ').toUpperCase()+'}';
						}

					}
					ids.forEach((item, i) => {
						setTimeout(() => {
							this.reactionModule.addReaction(channelId, item.__reactInternalInstance$.return.return.key, emote)
						}, i*350)
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

		window.ED.plugins.aoeshit.self = this;
	},
	unload: async () => {
		document.removeEventListener("keydown", this.keyListener);
		document.removeEventListener("keyup", this.keyListener);
		document.removeEventListener("mousedown", this.clickListener);
		document.removeEventListener("mouseup", this.clickListener);
		document.removeEventListener("wheel", this.wheeListener);
		document.removeEventListener("mousemove", this.moveListener);
	}
});
