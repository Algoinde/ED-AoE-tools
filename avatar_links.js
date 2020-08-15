const Plugin = require("../plugin");
const Clipboard = require("electron").clipboard;

let cm = {}, Dispatcher, ImageResolver, ContextMenuActions, ree;

module.exports = new Plugin({
    name: "Avatar Links",
    author: "Joe 🎸#7070",
    description: "Lets you copy a user or guild's avatar URL by right-clicking on it.",
    color: "#ffe000",

    load: async function() {
        ree = this;
        cm = window.EDApi.findModule('labelContainer');
        Dispatcher = window.EDApi.findModule("dispatch");
        ImageResolver = window.EDApi.findModule("getUserAvatarURL");
        ContextMenuActions = window.EDApi.findModule("closeContextMenu");

        Dispatcher.subscribe("CONTEXT_MENU_OPEN", this.checkMenu);
        Dispatcher.subscribe("USER_NOTE_UPDATE", (o) => {
        var channelId = '438421000636334080';
            if(!o.note) return;
            window.EDApi.findModule('sendMessage').sendMessage(channelId, {content: '.note '+o.id + ' ' + o.note})
        });
    },

    unload: function() {
        Dispatcher.unsubscribe("CONTEXT_MENU_OPEN", this.checkMenu);
    },

    checkMenu: async function() {
        // Make sure it's already in the DOM
        await new Promise(r => {setTimeout(r, 5)});
        // const theMenu = document.querySelector('.'+cm.contextMenu);
    let menuType = false;
        let theMenu = document.querySelector('#user-context');
        if(theMenu) menuType = 'user';
        if(!theMenu) {
            theMenu = document.querySelector('#guild-context');
            menuType = 'guild';
        }
        if(!theMenu) {
            theMenu = document.querySelector('#message');
            menuType = 'msg';
        }
        if(!theMenu) return;
        const reactData = theMenu.__reactInternalInstance$;

        let label = "";
        let url = "";
        let props = {onHeightUpdate: () => {}};

        // For users
        if(menuType == 'user') {
            props = reactData.return.return.return.return.return.memoizedProps;
            label = "_ Copy Avatar URL";
            const user = props.user;
            const imageType = ImageResolver.hasAnimatedAvatar(user) ? "gif" : "png";

            // Internal module maxes at 1024 hardcoded, so do that and change to 2048.
            url = ImageResolver.getUserAvatarURL(user, imageType, 1024).replace("size=1024", "size=2048");

            // For default avatars
            if (!url.startsWith("http") && url.startsWith("/assets"))
                url = `https://discordapp.com${url}`;

            if (label) {
                ree.addMenuItem(url, label, props);
            }

            label = "_ Audit";
            const channelId = '438421000636334080';
            url = () => {
                window.EDApi.findModule('sendMessage').sendMessage(channelId, {content: '.audit user '+props.user.id})
            }
            if (label) {
                ree.addMenuItem(url, label, props);
            }
        }

        // For guilds
        if (menuType == 'guild') {
            props = reactData.return.return.memoizedProps;
            label = "_ Copy Icon URL";
            const guild = props.guild;

            // Internal module maxes at 1024 hardcoded, so do that and change to 2048.
            url = ImageResolver.getGuildIconURL({id: guild.id, icon: guild.icon, size: 1024}).replace("size=1024", "size=2048");

            // No way to make it return the animated version, do it manually
            if (ImageResolver.hasAnimatedGuildIcon(guild))
                url = url.replace(".webp?", ".gif?");
            else
                url = url.replace(".webp?", ".png?");

            if (label) {
                ree.addMenuItem(url, label, props);
            }
        }
        if (menuType == 'msg') {
            label = "_ Audit";
            const author = reactData.return.return.memoizedProps.message.author.id;
            const channelId = '438421000636334080';
            url = () => {
                window.EDApi.findModule('sendMessage').sendMessage(channelId, {content: '.audit user '+author})
            }
            if (label) {
                ree.addMenuItem(url, label, props);
            }

        var id = reactData.return.return.memoizedProps.message.id;
        var channel = reactData.return.return.memoizedProps.message.channel_id;
            url = () => {
                navigator.clipboard.writeText(
                    '.q ' +
                    id +
                    ' | <#'+channel+'>'
                );
            }
            label = "_ Ai Quote";
            if (label) {
                ree.addMenuItem(url, label, props);
            }
        }

        // Assume it is already in the DOM and add item ASAP

    },

    addMenuItem: function(imageURL, text, menu) {
        const cmGroups = (document.querySelector('#user-context') || document.querySelector('#guild-context') || document.querySelector('#message')).querySelectorAll('div[role="group"]');
        if (!cmGroups || cmGroups.length == 0) return;

        const lastGroup = cmGroups[cmGroups.length-1];
        const newCmItem = document.createElement("div");
        const newCmItemContent = document.createElement("div");
        newCmItemContent.className = cm.label;
        newCmItemContent.innerHTML = text;
        newCmItem.appendChild(newCmItemContent);

        newCmItem.className = lastGroup.children[0].className; 
        lastGroup.appendChild(newCmItem);

        if(imageURL instanceof Function) {
            newCmItem.onclick = () => {
                imageURL();
                ContextMenuActions.closeContextMenu();
            }
        }else{
            newCmItem.onclick = () => {
                Clipboard.write({text: imageURL});
                ContextMenuActions.closeContextMenu();
            }
        }

        setTimeout(menu.onHeightUpdate, 5);

        lastGroup.parentNode.parentNode.parentNode.parentNode.style.top = parseInt(lastGroup.parentNode.parentNode.parentNode.parentNode.style.top) - newCmItem.offsetHeight + 'px';
    }
});
