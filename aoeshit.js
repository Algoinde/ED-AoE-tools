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
            style.innerHTML = `#aoe_circle {
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
                content: "";
                display: block;
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                will-change: transform;
                background: url(//algoinde.ru/f/aoe.png) 0% 0% / contain no-repeat;
                animation: rotat 18s infinite linear;
            }

            #aoe_circle:after {
                content: "";
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                width: 60px;
                height: 80px;
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

            .aoe-active .targetto {
                text-shadow: 2px 1px 2px rgba(200,0,0,1), -2px -1px 2px rgba(200,0,0,1);
                opacity: 0.5;
            }
            
            .tobedel {
                background-color: rgba(100,0,0,0.5);
            }
            `;
            document.body.appendChild(style);
            this.circle = document.body.appendChild(this.circle);
        }

        this.cM = window.EDApi.findModule('getChannelId');
        this.dM = window.EDApi.findModule('deleteMessage');
        this.ewM = window.EDApi.findModule('embedWrapper');
        this.chatContentClass = '.'+window.EDApi.findModule('chatContent').chatContent;
        this.messageClass = '.' + window.EDApi.findModule('cozyMessage').cozyMessage;
        if (!this.cM || !this.dM || !this.ewM) {
            return this.error('Aborted loading - Failed to find required modules!');
        }

       this.toggleCircle = (mode) => {
            if(!this.active) {
                this.active = true;
                this.mode = mode;
                document.body.classList.add('aoe-active');
                this.circle.style.opacity = 1;
                this.circle.style.display = 'block';
                this.setCircle(false, this.x, this.y)
                this.highlight();
                switch(mode) {
                    case 'delete':
                        this.circle.style.filter = "hue-rotate(-213deg)";
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
            if (e.keyCode == 68 && e.ctrlKey == true)
                this.toggleCircle('delete');
            if (e.ctrlKey) {
                if(!this.mouseListened) document.addEventListener("mousemove", this.moveListener);
                this.mouseListened = true;
            }
            if (e.ctrlKey == true && this.active) {
                this.ctrl = true;
            }else{
                this.ctrl = false;
            }
        }

        this.clickListener = (e) => {
            if(this.active) {
                this.applyAction();
                e.preventDefault();
            }
        }
        this.wheeListener = (e) => {
            if(this.ctrl) {
                if (event.deltaY < 0) {
                    this.setCircle(+this.getCircle().scale + 0.07);
                }else if(event.deltaY > 0){
                    this.setCircle(+this.getCircle().scale - 0.07);
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
            var prevArray = this.messageArray;
                this.messageArray = Array.prototype.slice.call(this.getMessages(true));
            var leftovers = prevArray.filter(value => !this.messageArray.includes(value));
                leftovers.forEach(item => {
                    item.classList.remove('targetto');
                });
                this.messageArray.forEach(item => {
                    item.classList.add('targetto');
                    if(item.timerino) {
                        clearTimeout(item.timerino);
                    }
                    item.timerino = setTimeout(() => item.classList.remove('targetto'), 5000);
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
            var ids = this.getMessages(true);
            ids = shuffle(ids);
            switch(this.mode) {
                case 'delete':
                    const channelId = this.cM.getChannelId();
                    if (!channelId) return;
                var Functerino = function(self, id, channelId) {
                        this.self = self;
                        this.id = id;
                        this.channelId = channelId;
                        this.main = () => {
                            this.self.dM.deleteMessage(this.channelId, this.id);
                        }
                    }
                    for (var i = 0; i < ids.length; i++) {
                        ids[i].classList.add('tobedel');
                        setTimeout((new Functerino(this,ids[i].__reactInternalInstance$.memoizedProps.id,channelId)).main, i*350)
                    }
                    break;
            }
            this.toggleCircle();
        }

        document.addEventListener("keydown", this.keyListener);
        document.addEventListener("click", this.clickListener);
        document.addEventListener("wheel", this.wheeListener);
    },
    unload: async () => {
        document.removeEventListener("keydown", this.keyListener);
        document.removeEventListener("click", this.clickListener);
        document.removeEventListener("wheel", this.wheeListener);
        document.removeEventListener("mousemove", this.moveListener);
    }
});
