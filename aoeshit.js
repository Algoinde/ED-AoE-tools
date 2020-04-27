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
			this.circle.style.transform = "translateX(0px) translateY(0px) scale(0.5)";
		let style = document.createElement('style');
			style.innerHTML = `
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
			}

			#aoe_circle:before {
				content: attr(data-time);
				display: block;
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				will-change: transform;
				background: url(//algoinde.ru/f/aoe.png) 0% 0% / contain no-repeat;
				animation: rotat 18s infinite linear;
				display: flex;
				align-items: center;
				padding: 0 0 66% 0;
				justify-content: center;
				color: white;
				text-shadow: 0px 0px 10px #005aff, 0px 0px 3px #2590ec, 0px 0px 6px #28bef7, 0px 0px 10px #21a9ea;
				font-family: 'Rock Salt';
				font-size: 4rem;
			}

			#aoe_circle:after {
				content: "";
				display: block;
				position: absolute;
				top: 50%;
				left: 50%;
				width: 100px;
				height: 100px;
				transform: translate3d(-50%,-50%,0);
				pointer-events: all;
			}

			@keyframes rotat {
				0% {
					transform: rotate(30deg);
				}
				100% {
					transform: rotate(390deg);
				}
			}
			
			.aoe-active div[class*="cozyMessage"] {
				transition: text-shadow 0.2s ease, opacity 0.2s ease;
			}
			
			.aoe-active * {
				cursor: none;
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
			.aoe-active .dereact {
				text-shadow: 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1), 1px 1px 4px rgba(255,150,150,1), -1px -1px 4px rgba(255,150,150,1);
				opacity: 0.6;
			}
			`;
			document.body.appendChild(style);
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

	   this.toggleCircle = (mode, force) => {
			if(!this.active || force) {
				this.active = true;
				this.mode = mode;
				document.body.classList.add('aoe-active');
				this.circle.style.opacity = 0.7;
				this.circle.style.display = 'block';
				this.setCircle(false, this.x, this.y)
				this.circle.setAttribute('data-time', '');
				this.highlight();
				switch(mode) {
					case 'delete':
						this.circle.style.filter = "hue-rotate(-213deg)";
						break;
					case 'get-md':
						this.circle.style.filter = "hue-rotate(10deg)";
						break;
					case 'mute':
						this.circle.style.filter = "hue-rotate(80deg)";
						this.circle.setAttribute('data-time', '10');
						break;
					case 'unmute':
						this.circle.style.filter = "hue-rotate(80deg) invert()";
						break;
					case 'ban':
						this.circle.style.filter = "invert() brightness(0.1)";
						break;
					case 'smug':
						this.circle.style.filter = "saturate(0) brightness(1.6)";
						break;
					case 'dereact':
						this.circle.style.filter = "invert() saturate(0.2) brightness(1.6)";
						break;
					default:
						this.circle.style.filter = "";
				}
			}else{
				this.mode = null;
				this.setCircle(0.5, false, false, true);
				this.circle.style.opacity = 0;
				document.removeEventListener("mousemove", this.moveListener);
				this.mouseListened = false;
				document.body.classList.remove('aoe-active');
				this.active = false;
				setTimeout(() => this.circle.style.display = 'none', 100);
			}
		}

		this.keyListener = (e) => {
			if(e.type == 'keydown') {
				if (e.keyCode == 68 && e.ctrlKey)
					this.toggleCircle('delete', this.mode !== 'delete' && this.active);
				if (e.keyCode == 83 && e.ctrlKey)
					this.toggleCircle('get-md', this.mode !== 'get-md' && this.active);
				if (e.keyCode == 77 && e.ctrlKey)
					this.toggleCircle('mute', this.mode !== 'mute' && this.active);
				if (e.keyCode == 85 && e.ctrlKey)
					this.toggleCircle('unmute', this.mode !== 'unmute' && this.active);
				if (e.keyCode == 89 && e.ctrlKey)
					this.toggleCircle('ban', this.mode !== 'ban' && this.active);
				if (e.keyCode == 87 && e.ctrlKey)
					this.toggleCircle('smug', this.mode !== 'smug' && this.active);
				if (e.keyCode == 88 && e.ctrlKey)
					this.toggleCircle('dereact', this.mode !== 'dereact' && this.active);
				if(this.mode == 'mute' && +e.key > -1 && +e.key < 10) {
					if(this.keyBounce)
						this.muteDuration += '' + e.key;
					else
						this.muteDuration = e.key;
					clearTimeout(this.keyBounce);
					this.keyBounce = setTimeout(() => this.keyBounce = null, 1000);
					this.circle.setAttribute('data-time', this.muteDuration);
					e.preventDefault();
				}
				if (e.ctrlKey) {
					if(!this.mouseListened) document.addEventListener("mousemove", this.moveListener);
					this.mouseListened = true;
				}

			}

			if (e.ctrlKey == true && this.active) {
				this.ctrl = true;
			}else{
				this.ctrl = false;
			}
		}

		this.clickListener = (e) => {
			if(this.active) {
				if(this.mode == 'ban') {
					if(!this.banConfirmation)
						this.banConfirmation = 1;
					else
						this.banConfirmation++;
					if(this.banConfirmation < 3){
						e.preventDefault();
						return;
					}else{
						this.banConfirmation = 0;
					}
				}
				this.applyAction();
				e.preventDefault();
			}
		}
		this.wheeListener = (e) => {
			if(this.ctrl) {
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
			if(!this.active) return;
			this.setCircle(undefined, e.pageX, e.pageY);
			this.highlight();
		}

		this.highlight = () => {
			if(!this.messageDebounce) {
		var classList = ['delete', 'get-md', 'mute', 'unmute', 'ban', 'smug', 'dereact']
			var prevArray = this.messageArray;
				this.messageArray = Array.prototype.slice.call(this.getMessages(true));
				if(prevArray){
				var leftovers = prevArray.filter(value => !this.messageArray.includes(value));
					leftovers.forEach(item => {
						item.classList.remove(...classList);
					});
				}
				this.messageArray.forEach(item => {
					item.classList.remove(...classList);
					item.classList.add(this.mode);
					if(item.timerino) {
						clearTimeout(item.timerino);
					}
					item.timerino = setTimeout(() => item.classList.remove(...classList), 4000);
				})
			}
			this.messageDebounce = true;
			setTimeout(() => this.messageDebounce = false, 300);
		}

		this.setCircle = (scale, x, y, fade) => {
		let values = this.getCircle();
		let rect = this.circle.getBoundingClientRect();
			if(scale) {
				if(fade) {
				var oldScale = values.scale;
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
		}

		this.getCircle = () => {
			let props = this.circle.style.transform.split(' ');
			return {
				x: parseInt(props[0].split('(')[1].split(')')[0]),
				y: parseInt(props[1].split('(')[1].split(')')[0]),
				scale: props[2].split('(')[1].split(')')[0],
			};
		}

		this.getMessages = (getElements) => {
		let rect = this.circle.getBoundingClientRect()
		let up = Math.max(0, rect.top) + rect.height * 0.1;
		let down = rect.height + rect.top - rect.height * 0.1;
		let x = Math.round(document.querySelector(this.chatContentClass).getBoundingClientRect().left) + 20;
		let messages = [];
			for(var y=up; y<down; y+=20) {
			let elm = document.elementFromPoint(x,y);
				if(elm && elm.closest) {
					elm = elm.closest(this.messageClass);
				}else{
					continue;
				}
				if(getElements) {
					if(elm
					&& elm.__reactInternalInstance$
					&& elm.__reactInternalInstance$.memoizedProps
					&& elm.__reactInternalInstance$.memoizedProps.id
					&& !messages.includes(elm)) {
						messages.push(elm);
					}
				}else{
					if(elm && elm.__reactInternalInstance$.memoizedProps.id && !messages.includes(elm.__reactInternalInstance$.memoizedProps.id)) {
						messages.push(elm.__reactInternalInstance$.memoizedProps.id);
					}
				}
			}
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
							this.dM.deleteMessage(channelId, item.__reactInternalInstance$.memoizedProps.id)
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
					([...new Set(ids)]).forEach((userID, i) => {
							userID = userID.__reactInternalInstance$.memoizedProps.children[1].props.message.author.id
							setTimeout(() => {
								this.sM.sendMessage(channelId, {content: message(userID)})
							}, i*350)
						})
					break;
				case 'smug':
					ids = shuffle(ids);
					ids.forEach((item, i) => {
						setTimeout(() => {
							this.reactionModule.addReaction(channelId, item.__reactInternalInstance$.memoizedProps.id, {id: "643603380748419085", name: "KaguyaSmug", animated: false})
						}, i*350)
					})
					break;
				case 'dereact':
					ids = shuffle(ids);
					ids.forEach((item, i) => {
						setTimeout(() => {
							this.reactionModule.removeAllReactions(channelId, item.__reactInternalInstance$.memoizedProps.id)
						}, i*400)
					})
					break;
			}
			this.toggleCircle();
		}

		document.addEventListener("keydown", this.keyListener);
		document.addEventListener("keyup", this.keyListener);
		document.addEventListener("click", this.clickListener);
		document.addEventListener("wheel", this.wheeListener);
	},
	unload: async () => {
		document.removeEventListener("keydown", this.keyListener);
		document.removeEventListener("keyup", this.keyListener);
		document.removeEventListener("click", this.clickListener);
		document.removeEventListener("wheel", this.wheeListener);
		document.removeEventListener("mousemove", this.moveListener);
	}
});
