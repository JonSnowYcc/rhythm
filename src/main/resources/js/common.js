/*
 * Rhythm - A modern community (forum/BBS/SNS/blog) platform written in Java.
 * Modified version from Symphony, Thanks Symphony :)
 * Copyright (C) 2012-present, b3log.org
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
/**
 * @fileoverview util and every page should be used.
 *
 * @author <a href="http://vanessa.b3log.org">Liyuan Li</a>
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @author <a href="https://ld246.com/member/ZephyrJung">Zephyr</a>
 * @version 1.49.1.1, Aug 31, 2020
 */

/**
 * @description Util
 * @static
 */
var Util = {
    bling: undefined,
    isBlinging: false,

    ipAction: function (num) {
        switch (num) {
            case 1:
                // 封禁
                $("#ipType").val("ban");
                break;
            case 2:
                // 解封
                $("#ipType").val("unban");
                break;
        }
        $("#ipListForm").submit();
    },

    /**
     * 插入紧急公告模板
     * @param num
     */
    insertWarnBroadcastModel: function (num) {
        let model = '';
        switch (num) {
            case 1:
                model = '摸鱼派社区即将进行升级维护，预计停服时间：<b>5分钟</b><br>' +
                    '维护完成后摸鱼派将自动刷新（客户端请手动重新登录），感谢你的理解～<br>' +
                    '摸鱼这么久了，去给自己倒杯咖啡吧 ☕️';
                break;
            case 2:
                model = '摸鱼派社区即将进行升级维护，预计停服时间：<b>20秒</b><br>' +
                    '维护完成后摸鱼派将自动刷新（客户端请手动重新登录），感谢你的理解～<br>' +
                    '摸鱼这么久了，去给自己倒杯咖啡吧 ☕️';
                break;
        }
        $("[name='warnBroadcastText']").val(model);
    },

    genMetal(name, attr) {
        if (attr !== undefined && attr !== '') {
            attr = '&' + attr;
        } else {
            attr = '';
        }
        return 'https://fishpi.cn/gen?ver=0.1&scale=0.79&txt=' + name + attr;
    },

    genMiniMetal(attr) {
        if (attr !== undefined && attr !== '') {
            attr = '&' + attr;
        } else {
            attr = '';
        }
        return 'https://fishpi.cn/gen?ver=0.1&scale=0.79&txt=' + attr;
    },

    parseDom(arg) {
        var objE = document.createElement("div");
        objE.innerHTML = arg;
        return objE.childNodes;
    },

    parseArray(arrStr) {
        var tempKey = 'arr23' + new Date().getTime();//arr231432350056527
        var arrayJsonStr = '{"' + tempKey + '":' + arrStr + '}';
        var arrayJson;
        if (JSON && JSON.parse) {
            arrayJson = JSON.parse(arrayJsonStr);
        } else {
            arrayJson = eval('(' + arrayJsonStr + ')');
        }
        return arrayJson[tempKey];
    },

    fadeIn(element, callback) {
        let opacity = 0;
        for (let i = 0; i < 100; i++) {
            setTimeout(function () {
                opacity = +(opacity + 0.01).toFixed(2);
                element.style.opacity = opacity;
                if (i === 99) {
                    setTimeout(callback, 200);
                }
            }, i * 5);
        }
    },

    fadeOut(element, callback) {
        let opacity = 1;
        for (let i = 0; i < 100; i++) {
            setTimeout(function () {
                opacity = +(opacity - 0.01).toFixed(2);
                element.style.opacity = opacity;
                if (i === 99) {
                    setTimeout(callback, 400);
                }
            }, i * 5);
        }
    },

    getAtUsers: function (key) {
        var atUsers = [];
        $.ajax({
            url: Label.servePath + '/users/names',
            type: 'POST',
            async: false,
            data: JSON.stringify({name: key}),
            success: function (result) {
                if (result.code === 0) {
                    for (var i = 0; i < result.data.length; i++) {
                        atUsers.push({
                            value: '@' + result.data[i].userName + " ",
                            html: '<img src="' + result.data[i].userAvatarURL48 +
                                '"/>' +
                                result.data[i].userName,
                            avatar: result.data[i].userAvatarURL48,
                            username: result.data[i].userName
                        });
                    }
                } else {
                    alert(result.msg);
                }
            },
        });
        return atUsers;
    },

    LazyLoadImage: function () {
        var loadImg = function (it) {
            var testImage = document.createElement('img')
            testImage.src = it.getAttribute('data-src')
            testImage.addEventListener('load', function () {
                if (!$(it).attr('style') && !$(it).attr('class') &&
                    !$(it).attr('width') && !$(it).attr('height') &&
                    $(it).closest('.vditor-reset').length === 1) {
                    if (testImage.naturalHeight > testImage.naturalWidth &&
                        testImage.naturalWidth / testImage.naturalHeight <
                        $(it).closest('.vditor-reset').width() /
                        ($(window).height() - 40) &&
                        testImage.naturalHeight > ($(window).height() - 40)) {
                        it.style.height = ($(window).height() - 40) + 'px'
                    }
                }

                if (!$(it).attr('class') && $(it).closest('.vditor-reset').length ===
                    1) {
                    _processPreview($(it))
                }

                it.src = testImage.src
                it.style.backgroundImage = 'none'
                it.style.backgroundColor = 'transparent'
            })
            it.removeAttribute('data-src')
        }

        if (!('IntersectionObserver' in window)) {
            $('img').each(function () {
                if (this.getAttribute('data-src')) {
                    loadImg(this)
                }
            })
            return false
        }

        if (window.imageIntersectionObserver) {
            window.imageIntersectionObserver.disconnect()
            $('img').each(function () {
                window.imageIntersectionObserver.observe(this)
            })
        } else {
            window.imageIntersectionObserver = new IntersectionObserver(
                function (entries) {
                    entries.forEach(function (entrie) {
                        if ((typeof entrie.isIntersecting === 'undefined'
                                ? entrie.intersectionRatio !== 0
                                : entrie.isIntersecting)
                            && entrie.target.getAttribute('data-src')
                        ) {
                            loadImg(entrie.target)
                        }
                    })
                })
            $('img').each(function () {
                window.imageIntersectionObserver.observe(this)
            })
        }
    },
    addStyle: function (url, id) {
        if (!document.getElementById(id)) {
            var styleElement = document.createElement('link')
            styleElement.id = id
            styleElement.setAttribute('rel', 'stylesheet')
            styleElement.setAttribute('type', 'text/css')
            styleElement.setAttribute('href', url)
            document.getElementsByTagName('head')[0].appendChild(styleElement)
        }
    },
    parseHljs: function () {
        Vditor.highlightRender({
            style: 'github',
            enable: !Label.luteAvailable,
        }, document)
    },
    /**
     * 按需加载 MathJax 及 flow、live photo
     * @returns {undefined}
     */
    parseMarkdown: function () {
        Vditor.mermaidRender(document.body)
        Vditor.flowchartRender(document.body)
        Vditor.chartRender()
        Vditor.mindmapRender()
        Vditor.mathRender(document.body)
        Vditor.codeRender(document.body, Label.langLabel)
        Vditor.abcRender()
        Vditor.graphvizRender(document.body)
        Vditor.plantumlRender(document.body)

        var hasLivePhoto = false
        $('.vditor-reset').each(function () {
            $(this).find('a').each(function () {
                var href = $(this).attr('href')
                if (href && href.substr(href.length - 4).toLowerCase() === '.mov') {
                    hasLivePhoto = true
                }
            })
        })

        if (hasLivePhoto) {
            var initLivePhoto = function () {
                $('.vditor-reset').each(function () {
                    $(this).find('a').each(function () {
                        var $it = $(this)
                        var href = $(this).attr('href')
                        if (href && href.substr(href.length - 4).toLowerCase() === '.mov') {
                            this.style.height = '360px'
                            this.style.width = '270px'
                            $it.removeAttr('href')
                            var player = LivePhotosKit.Player(this)
                            player.photoSrc = Label.staticServePath + '/images/livephoto.png'
                            player.videoSrc = href
                        }
                    })
                })
            }
            if (typeof (LivePhotosKit) !== 'undefined') {
                initLivePhoto()
            } else {
                $.ajax({
                    method: 'GET',
                    url: Label.staticServePath + '/js/lib/livephotoskit.js',
                    dataType: 'script',
                    cache: true,
                }).done(function () {
                    initLivePhoto()
                })
            }
        }
    },
    /**
     * @description 前置快捷键
     */
    prevKey: undefined,
    /**
     * 粘贴
     * @param {jQuery} $click 点击触发复制事件的元素
     * @param {jQuery} $text 包含复制内容的元素
     * @param {function} cb 复制成功的回调函数
     */
    clipboard: function ($click, $text, cb) {
        $click.click(function (event) {
            $text[0].select()

            try {
                // Now that we've selected the anchor text, execute the copy command
                var successful = document.execCommand('copy')
                if (successful) {
                    cb()
                } else {
                    console.log('Copy command was unsuccessful')
                }
            } catch (err) {
                console.log('Oops, unable to copy')
            }

            // Remove the selections - NOTE: Should use
            // removeRange(range) when it is supported
            window.getSelection().removeAllRanges()
        })
    },
    /**
     * @description 关闭 alert
     */
    closeAlert: function () {
        $(document).mouseup(function () {
            $("body").css("overflow", "")
            $(document).off('mousemove');
        }).on('touchend', function (e) {
            $("body").css("overflow", "")
            $(document).off('touchmove');
        })
        $("#alertDialogPanel,.dialog-background").fadeOut(200);
        setTimeout(function () {
            $("#alertDialogPanel,.dialog-background").remove();
        }, 200);
    },

    clearAlert() {
        $("#alertDialogPanel,.dialog-background").remove();
    },
    /**
     * @description alert
     * @param {String} content alert 内容
     * @param {String} title 标题
     */
    alert: function (content, title="") {
        function function_drag(ele) {
            function ondown(e) {
                // 获取鼠标离元素(0,0)位置的距离
                const positionDiv = $(ele).offset();
                e = e.pageX ? e : e.targetTouches[0]
                const distenceX = e.pageX - positionDiv.left;
                const distenceY = e.pageY - positionDiv.top;

                function onmove(e) {
                    $("body").css("overflow", "hidden")
                    e = e.pageX ? e : e.targetTouches[0]
                    let x = e.pageX - distenceX;
                    let y = e.pageY - distenceY-$(window).scrollTop();
                    if (x < 0) {
                        x = 0;
                    } else if (x > $(document).width() - $(ele).outerWidth(true)) {
                        x = $(document).width() - $(ele).outerWidth(true);
                    }
                    if (y < 0) {
                        y = 0;
                    } else if (y > $(document).height() - $(ele).outerHeight(true)) {
                        y = $(document).height() - $(ele).outerHeight(true);
                    }
                    $(ele).css({
                        'left': x + 'px',
                        'top': y + 'px'
                    })
                }

                $(document).mousemove(onmove).on('touchmove', onmove)
                $(document).mouseup(function () {
                    $("body").css("overflow", "")
                    $(document).off('mousemove');
                }).on('touchend', function (e) {
                    $("body").css("overflow", "")
                    $(document).off('touchmove');
                })
            }

            $(".dialog-header-bg").mousedown(ondown).on('touchstart', ondown)
        }

        var alertHTML = '',
            alertBgHTML = '<div onclick="Util.closeAlert(this)" style="height: ' +
                document.documentElement.scrollHeight
                + 'px;display: block;" class="dialog-background"></div>',
            alertContentHTML = '<div class="dialog-panel" id="alertDialogPanel" tabindex="0">'
                +
                '<div class="fn-clear dialog-header-bg"><span style="font-size: 14px;">' + title + '</span><a class="icon-close" href="javascript:void(0);" onclick="Util.closeAlert()"><svg><use xlink:href="#close"></use></svg></a></div>'
                +
                '<div class="dialog-main" style="text-align:center;padding: 30px 10px 40px">' +
                content + '</div></div>'

        alertHTML = alertBgHTML + alertContentHTML

        $('body').append(alertHTML)

        $('#alertDialogPanel').css({
            'top': ($(window).height() - $('#alertDialogPanel').height()) / 2 + 'px',
            'left': ($(window).width() - $('#alertDialogPanel').width()) / 2 + 'px',
            'outline': 'none',
        }).fadeIn(200).focus()
        function_drag('#alertDialogPanel');
    },
    /**
     * @description 标记指定类型的消息通知为已读状态.
     * @param {String} type 指定类型："commented"/"at"/"following"/"reply"
     * @param {Bom} it
     */
    makeNotificationRead: function (type, it) {
        $.ajax({
            url: Label.servePath + '/notifications/make-read/' + type,
            type: 'GET',
            cache: false,
            success: function (result, textStatus) {
                if (0 === result.code) {
                    Util.setUnreadNotificationCount(false)
                    $('.notification li').addClass('read')
                    if (it) {
                        $(it).prev().remove()
                        $(it).remove()

                        if ($('.home-menu .count').length === 0) {
                            $('.module-header:last > span').remove()
                        }
                    }
                }
            },
        })

        return false
    },
    /**
     * 初始化全局快捷键
     * @returns {undefined}
     */
    _initCommonHotKey: function () {
        if (!Label.userKeyboardShortcutsStatus ||
            Label.userKeyboardShortcutsStatus === '1') {
            return false
        }

        /**
         * go to focus
         * @param {string} type 滚动方式: 'top'/'bottom'/'up'/'down'.
         * @returns {undefined}
         */
        var goFocus = function (type) {
            var $focus = $('.list > ul > li.focus'),
                offsetHeight = $('.radio-btn').length === 0 ? 0 : 48
            if ($focus.length === 1) {
                if (type === 'top' || type === 'bottom') {
                    $(window).scrollTop($focus.offset().top - offsetHeight)
                    return false
                }

                if ($(window).height() + $(window).scrollTop() < $focus.offset().top +
                    $focus.outerHeight()
                    || $(window).scrollTop() > $focus.offset().top) {
                    if (type === 'down') {
                        $(window).
                        scrollTop($focus.offset().top -
                            ($(window).height() - $focus.outerHeight()))
                    } else {
                        $(window).scrollTop($focus.offset().top - offsetHeight)
                    }
                }
            }
        }

        // c 新建帖子
        if ($('#articleTitle').length === 0) {
            $(document).bind('keydown', 'c', function assets (event) {
                if (Util.prevKey) {
                    return false
                }
                window.location = Label.servePath + '/post?type=0'
                return false
            })
        }

        $(document).bind('keyup', 'g', function () {
            // listen jump hotkey g
            Util.prevKey = 'g'
            setTimeout(function () {
                Util.prevKey = undefined
            }, 1000)
            return false
        }).bind('keyup', 's', function () {
            // s 定位到搜索框
            $('#search').focus()
            return false
        }).bind('keyup', 't', function () {
            // t 回到顶部
            if (Util.prevKey === undefined) {
                Util.goTop()
            }
            return false
        }).bind('keyup', 'n', function (event) {
            // g n 跳转到通知页面
            if (Util.prevKey === 'g') {
                window.location = Label.servePath + '/notifications'
            }
            return false
        }).bind('keyup', 'h', function (event) {
            // g n 跳转到通知页面
            if (Util.prevKey === 'g') {
                window.location = Label.servePath + '/hot'
            }
            return false
        }).bind('keyup', 'i', function (event) {
            // g i 跳转到首页
            if (Util.prevKey === 'g') {
                window.location = Label.servePath
            }
            return false
        }).bind('keyup', 'r', function (event) {
            // g r 跳转到最新页面
            if (Util.prevKey === 'g') {
                window.location = Label.servePath + '/recent'
            }
            return false
        }).bind('keyup', 'p', function (event) {
            // g p 跳转到优选页面
            if (Util.prevKey === 'g') {
                window.location = Label.servePath + '/perfect'
            }
            return false
        }).bind('keyup', 'Shift+/', function (event) {
            // shift/⇧ ? 新窗口打开键盘快捷键说明文档
            window.open(Label.servePath + '/article/1631459254239')
            return false
        }).bind('keyup', 'j', function (event) {
            // j 移动到下一项
            var query = '.content .list:last > ul > '
            if ($('#comments').length === 1) {
                query = '#comments .list > ul > '
            }
            var $prev = $(query + 'li.focus')
            if ($prev.length === 0) {
                $(query + 'li:first').addClass('focus')
            } else if ($prev.next().length === 1) {
                $prev.next().addClass('focus')
                $prev.removeClass('focus')
            }
            goFocus('down')
            return false
        }).bind('keyup', 'k', function (event) {
            // k 移动到上一项
            var query = '.content .list:last > ul > '
            if ($('#comments').length === 1) {
                query = '#comments .list > ul > '
            }
            var $next = $(query + 'li.focus')
            if ($next.length === 0) {
                $(query + 'li:last').addClass('focus')
            } else if ($next.prev().length === 1) {
                $next.prev().addClass('focus')
                $next.removeClass('focus')
            }
            goFocus('up')
            return false
        }).bind('keyup', 'f', function (event) {
            // f 移动到第一项
            var query = '.content .list:last > ul > '
            if ($('#comments').length === 1) {
                query = '#comments .list > ul > '
            }
            $(query + 'li.focus').removeClass('focus')
            $(query + 'li:first').addClass('focus')
            goFocus('top')
            return false
        }).bind('keyup', 'l', function (event) {
            // l 移动到最后一项
            if (Util.prevKey) {
                return false
            }
            var query = '.content .list:last > ul > '
            if ($('#comments').length === 1) {
                query = '#comments .list > ul > '
            }
            $(query + 'li.focus').removeClass('focus')
            $(query + 'li:last').addClass('focus')
            goFocus('bottom')
            return false
        }).bind('keyup', 'o', function (event) {
            // o/enter 打开选中项
            if ($('#comments').length === 1) {
                return false
            }
            var href = $('.content .list:last > ul > li.focus > h2 > a').attr('href')
            if (!href) {
                href = $('.content .list:last > ul > li.focus .fn-flex-1 > h2 > a').
                attr('href')
            }
            if (!href) {
                href = $('.content .list:last > ul > li.focus h2.fn-flex-1 > a').
                attr('href')
            }
            if (href) {
                window.location = href
            }
            return false
        }).bind('keyup', 'return', function (event) {
            // o/enter 打开选中项
            if ($('#comments').length === 1) {
                return false
            }
            var href = $('.content .list:last > ul > li.focus > h2 > a').attr('href')
            if (!href) {
                href = $('.content .list:last > ul > li.focus .fn-flex-1 > h2 > a').
                attr('href')
            }
            if (!href) {
                href = $('.content .list:last > ul > li.focus h2.fn-flex-1 > a').
                attr('href')
            }
            if (href) {
                window.location = href
            }
            return false
        })
    },
    /**
     * 消息通知
     * @param {type} count 现有消息数目
     * @returns {Boolean}
     */
    notifyMsg: function (count) {
        // Let's check if the browser supports notifications
        if (!('Notification' in window)) {
            return false
        }

        var initNogification = function (c) {
            var notification = new Notification(Label.visionLabel, {
                body: Label.desktopNotificationTemplateLabel.replace('${count}', c),
                icon: Label.staticServePath + '/images/faviconH.png',
            })
            notification.onclick = notification.onerror = function () {
                window.location = Label.servePath + '/notifications'
            }
        }

        // Let's check if the user is okay to get some notification
        if (Notification.permission === 'granted') {
            // If it's okay let's create a notification
            initNogification(count)
        }

        // Otherwise, we need to ask the user for permission
        else if (Notification.permission !== 'denied') {
            Notification.requestPermission(function (permission) {
                // If the user is okay, let's create a notification
                if (permission === 'granted') {
                    initNogification(count)
                }
            })
        }

        // At last, if the user already denied any notification, and you
        // want to be respectful there is no need to bother them any more.
    },
    /**
     * 粘贴中包含图片和文案时，需要处理为 markdown 语法
     * @param {object} clipboardData
     * @param {object} cm
     * @returns {String}
     */
    processClipBoard: function (clipboardData, cm) {
        if (clipboardData.getData('text/html') === '' &&
            clipboardData.items.length === 2) {
            return ''
        }
        var hasCode = false
        var text = toMarkdown(clipboardData.getData('text/html'), {
            converters: [
                {
                    filter: 'img',
                    replacement: function (innerHTML, node) {
                        if (1 === node.attributes.length) {
                            return ''
                        }

                        var requestJSONObject = {
                            url: node.src,
                        }

                        $.ajax({
                            url: Label.servePath + '/fetch-upload',
                            type: 'POST',
                            data: JSON.stringify(requestJSONObject),
                            cache: false,
                            success: function (result, textStatus) {
                                if (0 === result.code) {
                                    var value = cm.getValue()
                                    value = value.replace(result.originalURL, result.url)
                                    cm.setValue(value)
                                }
                            },
                        })

                        return '![](' + node.src + ')'
                    },
                },
                {
                    filter: ['pre', 'code'],
                    replacement: function (content) {
                        if (content.split('\n').length > 1) {
                            hasCode = true
                        }
                        return '`' + content + '`'
                    },
                },
            ], gfm: true,
        })

        if (hasCode) {
            return event.originalEvent.clipboardData.getData('text/plain')
        } else {
            var div = document.createElement('div')
            div.innerHTML = text
            text = div.innerText.replace(/\n{2,}/g, '\n\n').
            replace(/(^\s*)|(\s*)$/g, '')
            return text
        }
    },
    /**
     * @description 根据 url search 获取值
     * @param {type} name
     * @returns {String}
     */
    getParameterByName: function (name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]')
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
            results = regex.exec(location.search)

        return results === null ? '' : decodeURIComponent(
            results[1].replace(/\+/g, ' '))
    },
    /**
     * 通过 UA 获取设备
     * @param {String} ua user agent
     * @returns {String} 设备
     */
    getDeviceByUa: function (ua) {
        $.ua.set(ua)
        var name = $.ua.device.model ? $.ua.device.model : $.ua.os.name

        if (!name || name === 'Windows') {
            name = ''
        }
        return name
    },
    /**
     * 初始化 algolia 搜索
     * @returns {undefined}
     */
    initSearch: function (algoliaAppId, algoliaSearchKey, algoliaIndex) {
        var client = algoliasearch(algoliaAppId, algoliaSearchKey)
        var index = client.initIndex(algoliaIndex)
        $('#search').autocomplete({
            hint: false,
            templates: {
                footer: '<div class="fn-right fn-pointer" onclick="window.open(\'https://www.algolia.com\')">'
                    + '<span class="ft-gray">With &hearts; from</span> <img src="' +
                    Label.staticServePath +
                    '/images/services/algolia128x40.png" /> </div>',
            },
        }, [
            {
                source: function (q, cb) {
                    index.search(q, {hitsPerPage: 20}, function (error, content) {
                        if (error) {
                            cb([])
                            return
                        }
                        cb(content.hits, content)
                    })
                },
                displayKey: 'name',
                templates: {
                    suggestion: function (suggestion) {
                        return suggestion._highlightResult.articleTitle.value
                    },
                },
            },
        ]).on('autocomplete:selected', function (event, suggestion, dataset) {
            window.open(Label.servePath + '/article/' + suggestion.oId)
        }).bind('keyup', 'esc', function () {
            $(this).blur()
        })
    },
    newVditor: function (data) {
        if (!Label.emoji) {
            $.ajax({
                url: Label.servePath + '/users/emotions',
                type: 'GET',
                cache: true,
                async: false,
                success: function (result) {
                    Label.emoji = {}
                    result.data.forEach(function (item) {
                        var key = Object.keys(item)[0]
                        Label.emoji[key] = item[key]
                    })
                },
            })
        }

        var options = {
            outline: data.outline || { enable: false },
            after: data.after || undefined,
            typewriterMode: data.typewriterMode || false,
            cache: {
                enable: data.cache || false,
            },
            input: data.input,
            preview: {
                delay: 500,
                mode: data.preview.mode,
                url: Label.servePath + '/markdown',
                parse: function (element) {
                    if (element.style.display === 'none') {
                        return
                    }
                    Util.LazyLoadImage()
                },
                hljs: {
                    enable: !Label.luteAvailable,
                },
            },
            upload: {
                max: Label.fileMaxSize,
                url: Label.servePath + '/upload',
                filename: function (name) {
                    return name.replace(/\?|\\|\/|:|\||<|>|\*|\[|\]|\s+/g, '-')
                },
                accept: '.zip,.rar,.7z,.tar,.gzip,.bz2,.jar,.jpg,.jpeg,.png,.gif,.webp,.webm,.bmp,.mp3,.mp4,.wav,.mov,.weba,.mkv',
            },
            placeholder: data.placeholder,
            height: data.height,
            counter: {
                enable: data.counter ? true : false,
                max: data.counter,
            },
            resize: {
                enable: data.resize.enable,
                position: data.resize.position,
            },
            lang: Label.langLabel,
            hint: {
                parse: false,
                emojiTail: '<a href="' + Label.servePath +
                    '/settings/function" target="_blank">设置常用表情</a>',
                emoji: Label.emoji,
                extend: [
                    {
                        key: '@',
                        hint: function (key) {
                            var atUsers = []
                            $.ajax({
                                url: Label.servePath + '/users/names',
                                type: 'POST',
                                async: false,
                                data: JSON.stringify({name: key}),
                                success: function (result) {
                                    if (result.code === 0) {
                                        for (var i = 0; i < result.data.length; i++) {
                                            atUsers.push({
                                                value: '@' + result.data[i].userName + " ",
                                                html: '<img src="' + result.data[i].userAvatarURL48 +
                                                    '"/>' +
                                                    result.data[i].userName,
                                            })
                                        }
                                        if (key === '') {
                                            atUsers.push({
                                                html: '<img src="' + Label.staticServePath +
                                                    '/images/user-thumbnail.png"/> 参与者',
                                                value: '@participants ',
                                            })
                                        }
                                    } else {
                                        alert(result.msg)
                                    }
                                },
                            })
                            return atUsers
                        },
                    }],
            },
            esc: data.esc,
            ctrlEnter: data.ctrlEnter,
        }

        if ($(window).width() < 768) {
            options.toolbar = [
                'emoji',
                'link',
                'upload',
                'edit-mode',
                {
                    name: 'more',
                    toolbar: [
                        'insert-after',
                        'fullscreen',
                        'preview',
                        'info',
                        'help',
                    ],
                },
            ]
            options.resize.enable = false
        } else if (data.toolbar) {
            options.toolbar = data.toolbar
        }
        return new Vditor(data.id, options)
    },
    /**
     * @description 设置当前登录用户的未读提醒计数.
     * @param {Boolean} isSendMsg 是否发送消息
     */
    setUnreadNotificationCount: function (isSendMsg) {
        $.ajax({
            url: Label.servePath + '/notifications/unread/count',
            type: 'GET',
            cache: false,
            success: function (result, textStatus) {
                // 生成消息的 li 标签
                var genLiHTML = function (data) {
                    var notiHTML = '',
                        markReadHTML = '<span onclick="Util.makeNotificationRead(\'${markReadType}\');return false;" aria-label="'
                            + Label.makeAsReadLabel +
                            '" class="fn-right tooltipped tooltipped-nw">'
                            + '<svg><use xlink:href="#check"></use></svg>' + '</span>'

                    // 收到的回帖 unreadCommentedNotificationCnt
                    if (data.unreadCommentedNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/commented">'
                            + Label.notificationCommentedLabel
                            + ' <span class="count">' + data.unreadCommentedNotificationCnt +
                            '</span>'
                            + markReadHTML.replace('${markReadType}', 'commented')
                            + '</a></li>'
                    }

                    // 收到的回复 unreadReplyNotificationCnt
                    if (data.unreadReplyNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/reply">' + Label.notificationReplyLabel +
                            ' <span class="count">' + data.unreadReplyNotificationCnt +
                            '</span>'
                            + markReadHTML.replace('${markReadType}', 'reply')
                            + '</a></li>'
                    }

                    // @ 我的 unreadAtNotificationCnt
                    if (data.unreadAtNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/at">' + Label.notificationAtLabel +
                            ' <span class="count">' + data.unreadAtNotificationCnt + '</span>'
                            + markReadHTML.replace('${markReadType}', 'at')
                            + '</a></li>'
                    }

                    // 我关注的 unreadFollowingNotificationCnt
                    if (data.unreadFollowingNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/following">' + Label.notificationFollowingLabel +
                            ' <span class="count">' + data.unreadFollowingNotificationCnt +
                            '</span>'
                            + markReadHTML.replace('${markReadType}', 'following')
                            + '</a></li>'
                    }

                    // 积分 unreadPointNotificationCnt
                    if (data.unreadPointNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/point">' + Label.pointLabel +
                            ' <span class="count">' + data.unreadPointNotificationCnt +
                            '</span>'
                            + '</a></li>'
                    }

                    // 同城 unreadBroadcastNotificationCnt
                    if (data.unreadBroadcastNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/broadcast">' + Label.sameCityLabel +
                            ' <span class="count">' + data.unreadBroadcastNotificationCnt +
                            '</span>'
                            + '</a></li>'
                    }

                    // 系统 unreadSysAnnounceNotificationCnt
                    if (data.unreadSysAnnounceNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath +
                            '/notifications/sys-announce">' + Label.systemLabel +
                            ' <span class="count">' + data.unreadSysAnnounceNotificationCnt +
                            '</span>'
                            + '</a></li>'
                    }

                    // 新关注者 unreadNewFollowerNotificationCnt
                    if (data.unreadNewFollowerNotificationCnt > 0) {
                        notiHTML += '<li><a href="' + Label.servePath + '/member/' +
                            Label.currentUserName + '/followers">' +
                            Label.newFollowerLabel + ' <span class="count">' +
                            data.unreadNewFollowerNotificationCnt + '</span>'
                            + '</a></li>'
                    }

                    return notiHTML
                }

                var count = result.unreadNotificationCnt
                // mobile
                $.ua.set(navigator.userAgent)
                if ($.ua.device.type && $.ua.device.type === 'mobile') {
                    if (0 < count) {
                        $('#aNotifications').
                        removeClass('no-msg').
                        addClass('msg').
                        text(count).
                        attr('href', 'javascript:void(0)')
                        if (0 === result.userNotifyStatus &&
                            window.localStorage.hadNotificate !== count.toString() &&
                            isSendMsg) {
                            Util.notifyMsg(count)
                            window.localStorage.hadNotificate = count
                        }

                        var notiHTML = genLiHTML(result)

                        if ($('#notificationsPanel').length === 1) {
                            $('#notificationsPanel ul').html(notiHTML)
                            return false
                        }
                        $('.main:first').
                        prepend(
                            '<div id="notificationsPanel" class="tab-current fn-clear fn-none"><ul class="tab fn-clear">' +
                            notiHTML + '</ul></div>')

                        $('#aNotifications').click(function () {
                            $('#notificationsPanel').slideToggle()
                        })
                    } else {
                        window.localStorage.hadNotificate = 'false'
                        $('#aNotifications').
                        removeClass('msg').
                        addClass('no-msg').
                        text(count).
                        attr('href', Label.servePath + '/notifications')
                    }
                    return false
                }

                // browser
                let icon = '<svg style="height: 15px;pointer-events: none;">' +
                    '  <use xlink:href="#notification"></use>' +
                    '</svg>' +
                    '&nbsp;';
                if (0 < count) {
                    $('#aNotifications').
                    removeClass('no-msg tooltipped tooltipped-w').
                    addClass('msg').
                    html(icon + count).
                    attr('href', 'javascript:void(0)')
                    if (0 === result.userNotifyStatus &&
                        window.localStorage.hadNotificate !== count.toString() &&
                        isSendMsg) {
                        Util.notifyMsg(count)
                        window.localStorage.hadNotificate = count
                    }

                    var notiHTML = genLiHTML(result)

                    if ($('#notificationsPanel').length === 1) {
                        $('#notificationsPanel ul').html(notiHTML)
                        return false
                    }

                    $('#aNotifications').
                    after(
                        '<div id="notificationsPanel" class="module person-list"><ul>' +
                        notiHTML + '</ul></div>')

                    $('#aNotifications').click(function (e) {
                        let posRight = window.innerWidth - e.pageX - ($('#notificationsPanel').width() /2);
                        console.log(posRight)
                        $('#notificationsPanel').css('right',posRight + 'px')
                        $('#notificationsPanel').show()
                    })

                    $('body').click(function (event) {
                        if (event.target.id !== 'aNotifications' &&
                            $(event.target).closest('.module').attr('id') !==
                            'notificationsPanel') {
                            $('#notificationsPanel').hide()
                        }
                    })
                } else {
                    window.localStorage.hadNotificate = 'false'
                    $('#notificationsPanel').remove()
                    $('#aNotifications').
                    removeClass('msg').
                    addClass('no-msg tooltipped tooltipped-w').
                    html(icon + count).
                    attr('href', Label.servePath + '/notifications')
                }
            },
        })
    },
    /**
     * @description 关注
     * @param {BOM} it 触发事件的元素
     * @param {String} id 关注 id
     * @param {String} type 关注的类型
     * @param {String} index 为数字时表示关注数，String 时表示来源
     */
    follow: function (it, id, type, index) {
        if (!Label.isLoggedIn) {
            Util.needLogin()
            return false
        }

        if ($(it).hasClass('disabled')) {
            return false
        }

        var requestJSONObject = {
            followingId: id,
        }
        $(it).addClass('disabled')
        $.ajax({
            url: Label.servePath + '/follow/' + type,
            type: 'POST',
            cache: false,
            data: JSON.stringify(requestJSONObject),
            success: function (result, textStatus) {
                if (0 === result.code) {
                    $(it).removeClass('disabled')
                    if (typeof (index) !== 'undefined') {
                        if ('article' === type || 'tag' === type) {
                            $(it).
                            html(
                                '<svg class="icon-star"><use xlink:href="#star"></use></svg> ' +
                                (index + 1)).
                            attr('onclick', 'Util.unfollow(this, \'' + id + '\', \'' +
                                type +
                                '\', ' + (index + 1) + ')').
                            attr('aria-label', Label.uncollectLabel).
                            addClass('ft-red')
                        } else if ('article-watch' === type) {
                            $(it).
                            html(
                                '<svg class="icon-view"><use xlink:href="#view"></use></svg> ' +
                                (index + 1)).
                            attr('onclick', 'Util.unfollow(this, \'' + id + '\', \'' +
                                type +
                                '\', ' + (index + 1) + ')').
                            attr('aria-label', Label.unfollowLabel).
                            addClass('ft-red')
                        }
                    } else {
                        $(it).
                        attr('onclick', 'Util.unfollow(this, \'' + id + '\', \'' + type +
                            '\')').
                        text('article' === type
                            ? Label.uncollectLabel
                            : Label.unfollowLabel)
                    }
                }
            },
            complete: function () {
                $(it).removeClass('disabled')
            },
        })
    },
    /**
     * @description 取消关注
     * @param {BOM} it 触发事件的元素
     * @param {String} id 关注 id
     * @param {String} type 取消关注的类型
     * @param {String} index 为数字时表示关注数，String 时表示来源
     */
    unfollow: function (it, id, type, index) {
        if ($(it).hasClass('disabled')) {
            return false
        }

        var requestJSONObject = {
            followingId: id,
        }
        $(it).addClass('disabled')
        $.ajax({
            url: Label.servePath + '/unfollow/' + type,
            type: 'POST',
            cache: false,
            data: JSON.stringify(requestJSONObject),
            success: function (result, textStatus) {
                if (0 === result.code) {
                    if (typeof (index) !== 'undefined') {
                        if ('article' === type || 'tag' === type) {
                            $(it).
                            removeClass('ft-red').
                            html(
                                '<svg class="icon-star"><use xlink:href="#star"></use></svg> ' +
                                (index - 1)).
                            attr('onclick', 'Util.follow(this, \'' + id + '\', \'' + type +
                                '\',' + (index - 1) + ')').
                            attr('aria-label', Label.collectLabel)
                        } else if ('article-watch' === type) {
                            $(it).
                            removeClass('ft-red').
                            html(
                                '<svg class="icon-view"><use xlink:href="#view"></use></svg> ' +
                                (index - 1)).
                            attr('onclick', 'Util.follow(this, \'' + id + '\', \'' + type +
                                '\',' + (index - 1) + ')').
                            attr('aria-label', Label.followLabel)
                        }
                    } else {
                        $(it).
                        attr('onclick', 'Util.follow(this, \'' + id + '\', \'' + type +
                            '\')').
                        text('article' === type ? Label.collectLabel : Label.followLabel)
                    }
                }
            },
            complete: function () {
                $(it).removeClass('disabled')
            },
        })
    },
    /**
     * @description 回到顶部
     */
    goTop: function () {
        $('html, body').animate({scrollTop: 0}, 800)
    },
    /**
     * @description 跳转到登录界面
     */
    goLogin: function () {
        if (-1 !== location.href.indexOf('/login')) {
            return
        }

        var gotoURL = location.href
        if (location.search.indexOf('?goto') === 0) {
            gotoURL = location.href.replace(location.search, '')
        }
        window.location.href = Label.servePath + '/login?goto=' +
            encodeURIComponent(gotoURL)
    },
    /**
     *
     * @returns {undefined}
     */
    needLogin: function () {
        Util.goLogin()
    },
    /**
     * @description 跳转到注册页面
     */
    goRegister: function () {
        if (-1 !== location.href.indexOf('/register')) {
            return
        }
        var gotoURL = location.href
        if (location.search.indexOf('?goto') === 0) {
            gotoURL = location.href.replace(location.search, '')
        }
        window.location.href = Label.servePath + '/register?goto=' +
            encodeURIComponent(gotoURL)
    },
    /**
     * @description 禁止 IE7 以下浏览器访问
     */
    _kill: function () {
        if ($.ua.browser.name === 'IE' && parseInt($.ua.browser.version) < 10) {
            $.ajax({
                url: Label.servePath + '/kill-browser',
                type: 'GET',
                cache: false,
                success: function (result, textStatus) {
                    $('body').append(result)
                    $('#killBrowser').dialog({
                        'modal': true,
                        'hideFooter': true,
                        'height': 345,
                        'width': 600,
                    })
                    $('#killBrowser').dialog('open')
                },
            })
        }
    },
    /**
     * 每日活跃样式
     * @returns {undefined}
     */
    _initActivity: function (percent, color) {
        if (percent <= 0) {
            percent = 1;
        }
        let now = 0;
        let topAnimation = setInterval(()=>{
            now++;
            if(now >= percent){
                now = percent;
                clearInterval(topAnimation)
            }
            let top = (20 - (percent / 2)) + "px";
            $("#activityProcessor .percent-wave-before").css("top",top);
            $("#activityProcessor .percent-wave-after").css("top",top);
            $("#activityProcessor .percent").html(parseInt(now) + "%")

        },10)
        // $("#activityProcessor .percent-wave-before").css("top",top);
        // $("#activityProcessor .percent-wave-after").css("top",top);
        // $("#activityProcessor .percent").html(percent + "%")
        // $("#activityProcessor").circleChart({
        //     value: percent,
        //     text: percent + '%',
        //     color: color,
        //     backgroundColor: "#e6e6e6",
        //     size: 50,
        //     widthRatio: 0.1,
        //     background: false,
        //     startAngle: 50,
        //     onDraw: function(el, circle) {
        //         circle.text(Math.round(circle.value) + "%");
        //     }
        // });
    },
    /**
     * 初始化网站弹幕
     * @private
     */
    _initBreezemoon: function ($btn, $text, isLoggedIn) {
        if ($btn.length === 0) {
            return
        }

        $text.keypress(function (event) {
            if (event.keyCode === 13) {
                $btn.click()
            }
        })

        $btn.click(function () {
            if (!isLoggedIn) {
                Util.goLogin()
                return
            }
            if ($btn.attr('disabled') === 'disabled') {
                return
            }

            $btn.attr('disabled', 'disabled').css('opacity', '0.3')
            $.ajax({
                url: Label.servePath + '/breezemoon',
                type: 'POST',
                cache: false,
                headers: {'csrfToken': $(this).data('csrf')},
                data: JSON.stringify({
                    breezemoonContent: $text.val(),
                }),
                success: function (result) {
                    if (result.code === 0) {
                        let input = $btn.parent().find("input");
                        input.val("");
                        /*let breezemoonAuthorName = result.data.breezemoonAuthorName;
                        let breezemoonAuthorThumbnailURL48 = result.data.breezemoonAuthorThumbnailURL48;
                        let breezemoonContent = result.data.breezemoonContent;
                        let breezemoonOId = result.data.oId;
                        let list = $btn.parent().parent().find('.module-list');
                        list.prepend(
                            "<li style=\"display: none\">\n" +
                            "<a href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "\">\n" +
                            "<span class=\"avatar-small slogan\" aria-label=\"" + breezemoonAuthorName + "\" style=\"background-image: url(" + breezemoonAuthorThumbnailURL48 + ")\"></span>\n" +
                            "</a>\n" +
                            "<a href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "/breezemoons/" + breezemoonOId + "\" class=\"title\">" + breezemoonContent + "</a>\n" +
                            "</li>"
                        );
                        list.find("li:last").fadeOut(199, function () {
                            list.find("li:last").remove();
                        });
                        list.find("li:first").slideDown(200);
                        Util.listenUserCard();*/
                    } else {
                        Util.alert(result.msg);
                    }
                },
                complete: function () {
                    $btn.css('opacity', 1).removeAttr('disabled')
                },
            })
        })
    },
    /**
     * @description 初识化前台页面
     */
    init: function (isLoggedIn) {
        // 初始化用户卡片
        $.ua.set(navigator.userAgent);
        if ($.ua.device.type !== 'mobile') {
            let cardHtml = '' +
                '<div id="userCard" style="position: absolute; z-index: 130; right: auto; display: none; ">' +
                '</div>';
            $("body").append(cardHtml);
            Util.listenUserCard();
        }
        //禁止 IE7 以下浏览器访问
        this._kill()
        // 导航
        this._initNav()
        // 每日活跃
        // this._initActivity()
        // 移动端分页
        if ($('.pagination select').length === 1) {
            $('.pagination select').change(function () {
                var url = $(this).data('url') + '?p=' + $(this).val()
                if ($(this).data('param')) {
                    url += '&' + $(this).data('param')
                }
                window.location.href = url
            })
        }
        // search input
        $('.nav input.search').focus(function () {
            $('.nav .tags').css('visibility', 'hidden')
        }).blur(function () {
            $('.nav .tags').css('visibility', 'visible')
        })

        $(window).scroll(function () {
            if ($(window).scrollTop() > 20 && $('.radio-btn').length === 0) {
                $('.go-top').show()
            } else {
                $('.go-top').hide()
            }
        })

        Util.parseMarkdown()
        Util.parseHljs()

        if (isLoggedIn) { // 如果登录了
            if (!window.localStorage.hadNotificate) {
                window.localStorage.hadNotificate = 'false'
            }

            Util.setUnreadNotificationCount(true)
        }

        $(window).keyup(function (event) {
            if (event.keyCode === 27) {
                Util.closeAlert()
            }
        })

        this._initBreezemoon($('#breezemoonPostBtn'), $('#breezemoonInput'),
            isLoggedIn)

        this._initCommonHotKey()
        if (isLoggedIn) {
            return false
        }

        // 点击空白影藏登录框
        $('body').click(function (event) {
            if ($(event.target).closest('.nav .form').length === 0) {
                $('.nav .form').hide()
            }
        })
    },
    /**
     * @description 监听用户名片
     */
    userCardCache: new Map(),
    listenUserCard: function () {
        var cardLock = false;
        $(".avatar, .avatar-small, .avatar-middle, .avatar-mid, .avatar-big, .name-at").unbind();

        $(".avatar, .avatar-small, .avatar-middle, .avatar-mid, .avatar-big, .name-at").hover(function () {
            // 加载用户信息
            if ($(this).attr("aria-label") !== undefined) {
                let username = $(this).attr("aria-label");
                // 请求数据
                let data;
                if (Util.userCardCache.has(username)) {
                    data = Util.userCardCache.get(username);
                } else {
                    $.ajax({
                        url: Label.servePath + "/user/" + username,
                        type: "GET",
                        cache: false,
                        async: false,
                        headers: {'csrfToken': Label.csrfToken},
                        success: function (result) {
                            data = result;
                            Util.userCardCache.set(username, data);
                        }
                    });
                }
                let followerCount = data.followerCount;
                let followingUserCount = data.followingUserCount;
                let oId = data.oId;
                let onlineMinute = data.onlineMinute;
                let userAvatarURL = data.userAvatarURL210;
                let userCity = data.userCity;
                let userIntro = data.userIntro;
                let userName = data.userName;
                let userNickname = data.userNickname;
                let userOnlineFlag = data.userOnlineFlag;
                let userPoint = data.userPoint;
                let userURL = data.userURL;
                let userRole = data.userRole;
                let cardBg = data.cardBg;
                let canFollow = data.canFollow;
                let userNo = data.userNo;
                let userAppRole = data.userAppRole;
                let sysMetal = JSON.parse(data.sysMetal);
                let mbti = data.mbti;
                // 组合内容
                let html = "" +
                    '<div class="user-card" id="userCardContent">\n' +
                    '    <div>\n' +
                    '        <a href="' + Label.servePath + '/member/' + userName + '">\n' +
                    '            <div class="avatar-mid-card" style="background-image: url(' + userAvatarURL + ');"></div>\n' +
                    '        </a>\n' +
                    '        <div class="user-card__meta">\n' +
                    '            <div class="fn__ellipsis">\n' +
                    '                <a class="user-card__name" href="' + Label.servePath + '/member/' + userName + '"><b>' + userNickname + '</b></a>\n' +
                    '                <a class="ft-gray ft-smaller" href="' + Label.servePath + '/member/' + userName + '"><b>' + userName + '</b></a>\n';
                if (mbti !== "") {
                    let leftMbti = mbti;
                    if (mbti.indexOf('-') > 0) {
                        leftMbti = mbti.split('-')[0];
                    }
                    html += '' +
                        '<a target="_blank" href="https://www.16personalities.com/ch/' + leftMbti + '-%E4%BA%BA%E6%A0%BC" class="tooltipped-new tooltipped__n" rel="nofollow"\n' +
                        '   aria-label="TA是 ' + mbti + '">\n' +
                        '   <span style="background-color: #b2b1ff;color: #fff;font-size: 12px;line-height: 20px;border-radius: 3px;height: 20px;display: inline-block;padding: 0 5px;vertical-align: middle;box-sizing: border-box;svg {margin-top: 2px;}">' +
                        '   <svg style="vertical-align: -3px"><use xlink:href="#mbti"></use></svg> ' + mbti + '</span>' +
                        '</a>\n';
                }
                html += '            </div>\n';
                if (userIntro !== "") {
                    html += '' +
                        '            <div class="user-card__info vditor-reset">\n' +
                        '                ' + userIntro + '\n' +
                        '            </div>\n';
                } else {
                    if (userAppRole === "0") {
                        html += '<div class="user-card__info vditor-reset">' +
                            '摸鱼派 ' + userNo + ' 号成员，<b>黑客</b>' +
                            '</div>\n';
                    } else if (userAppRole === "1") {
                        html += '<div class="user-card__info vditor-reset">' +
                            '摸鱼派 ' + userNo + ' 号成员，<b>画家</b>' +
                            '</div>\n';
                    }
                }
                let list = sysMetal.list;
                if (list !== undefined && list.length !== 0) {
                    html += '<div class="user-card__info vditor-reset">';
                    for (let i = 0; i < list.length; i++) {
                        let m = list[i];
                        html += "<img title='" + m.description + "' src='" + Util.genMetal(m.name, m.attr) + "'/>";
                    }
                    html += '</div>';
                }
                html += '            <div class="user-card__icons fn__flex">\n' +
                    '                <div class="fn__flex-1">\n' +
                    '                    <a href="https://fishpi.cn/article/1630575841478" class="tooltipped__n tooltipped-new"\n' +
                    '                       aria-label="用户分组：' + userRole + '">\n';
                switch (userRole) {
                    case '管理员':
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/adminRole.png"/>';
                        break;
                    case 'OP':
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/opRole.png"/>';
                        break;
                    case '纪律委员':
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/policeRole.png"/>';
                        break;
                    case '超级会员':
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/svipRole.png"/>';
                        break;
                    case '成员':
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/vipRole.png"/>';
                        break;
                    default:
                        html += '<img style="height: 20px;margin: 0px;" src="https://file.fishpi.cn/newRole.png"/>';
                        break;
                }
                html += '                    </a>\n';
                html += '                    <a href="' + Label.servePath + '/member/' + userName + '/points" class="tooltipped-new tooltipped__n"\n' +
                    '                       aria-label="' + userPoint + ' 积分">\n' +
                    '                        <svg>\n' +
                    '                            <use xlink:href="#iconPoints"></use>\n' +
                    '                        </svg>\n' +
                    '                    </a>\n';
                if (userCity !== "") {
                    html += '' +
                        '<a href="' + Label.servePath + '/city/' + userCity + '" class="tooltipped-new tooltipped__n" rel="nofollow"\n' +
                        '   aria-label="' + userCity + '">\n' +
                        '    <svg>\n' +
                        '        <use xlink:href="#icon-local"></use>\n' +
                        '    </svg>\n' +
                        '</a>\n';
                }
                if (userURL !== "") {
                    html += '' +
                        '<a target="_blank" href="' +  Label.servePath + '/forward?goto=' + userURL + '" class="tooltipped-new tooltipped__n" rel="nofollow"\n' +
                        '   aria-label="' + userURL + '">\n' +
                        '    <svg>\n' +
                        '        <use xlink:href="#card-link"></use>\n' +
                        '    </svg>\n' +
                        '</a>\n';
                }

                html += '' +
                    '<a class="tooltipped-new tooltipped__n" rel="nofollow" onclick="javascript:void(0)" style="background-color:#eeeeeecc;border-radius:5px;padding:0 7px 0 4px;cursor:default;color:#6d6c6c;font-size:12px;"\n' +
                    '   aria-label="' + userNo + ' 号成员">\n' +
                    '    <svg style="height: 12px; vertical-align: -4.5px">\n' +
                    '        <use xlink:href="#no"></use>\n' +
                    '    </svg>' +
                    '    <span style="margin: 0;float: none;vertical-align: -3px;">' + userNo + '</span> \n' +
                    '</a>\n';
                html += '' +
                    '                </div>\n';

                if (userOnlineFlag === true) {
                    html += '<span style="background-color:#d23f31;color:#fff;font-size:12px;line-height:20px;border-radius:3px;height:20px;display:inline-block;padding:0 5px;vertical-align:middle;box-sizing:border-box;">在线</span>';
                } else {
                    html += '<span style="background-color:rgba(0,0,0,0.54);color:#fff;font-size:12px;line-height:20px;border-radius:3px;height:20px;display:inline-block;padding:0 5px;vertical-align:middle;box-sizing:border-box;">离线</span>';
                }
                html += '                <div class="fn__shrink">\n' +
                    '                    <a class="green small btn" href="' + Label.servePath + '/chat?toUser=' + userName + '" rel="nofollow">\n' +
                    '                        私信\n' +
                    '                    </a>\n';
                if (canFollow === "yes") {
                    html += '' +
                        '<button class="follow small" onclick="Util.follow(this, \'' + oId + '\', \'user\')">\n' +
                        ' 关注\n' +
                        '</button>';
                } else if (canFollow === "no") {
                    html += '' +
                        '<button class="follow small" onclick="Util.unfollow(this, \'' + oId + '\', \'user\')">\n' +
                        ' 取消关注\n' +
                        '</button>';
                }
                html += '' +
                    '                </div>\n' +
                    '            </div>\n' +
                    '        </div>\n' +
                    '    </div>\n' +
                    '</div>';
                $("#userCard").html(html);
                if (cardBg !== "") {
                    $("#userCardContent").addClass("user-card--bg");
                    $("#userCardContent").css("background-image", "url(" + cardBg + ")");
                    $("#userCardContent > div").attr("style", "background-image: linear-gradient(90deg, rgba(214, 227, 235, 0.36), rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.76));");
                    $("#userCardContent > div > a > div").css("width", "105px");
                    $("#userCardContent > div > a > div").css("height", "105px");
                    $("#userCardContent > div > a > div").css("top", "80px");
                }

                // 设置位置
                let left = $(this).offset().left;
                left = left + 30;
                if (left + 350 > $(document.body).width()) {
                    left = left - 350;
                }
                $("#userCard").css("left", left);
                let top = $(this).offset().top - 110;
                if (top < 45) {
                    top = $(this).offset().top + 45;
                }
                $("#userCard").css("top", top + "px");
                $("#userCard").show();
            }
        }, function (event) {
            setTimeout(function () {
                let el = $(event.toElement);
                if ($(el).parents("#userCard").length === 0) {
                    if (!cardLock) {
                        $("#userCard").hide();
                    }
                }
            }, 50);
        });
        $("#userCard").unbind();
        $("#userCard").hover(function () {
            cardLock = true;
        }, function () {
            cardLock = false;
            $("#userCard").hide();
        });
    },
    /**
     * @description 用户状态 channel.
     * @static
     */
    initUserChannel: function (channelServer) {
        var userChannel = new WebSocket(channelServer)

        userChannel.onopen = function () {
            console.log("Connected to user channel websocket.")
        }

        userChannel.onmessage = function (evt) {
            var data = JSON.parse(evt.data)

            switch (data.command) {
                case 'bz-update':
                    if ($(".active-bz-list-big")[0] !== undefined) {
                        let breezemoonAuthorName = data.bz.breezemoonAuthorName;
                        let breezemoonAuthorThumbnailURL48 = data.bz.breezemoonAuthorThumbnailURL48;
                        let breezemoonContent = data.bz.breezemoonContent;
                        let breezemoonOId = data.bz.oId;
                        let list = $($(".active-bz-list-big")[0]);
                        list.prepend(
                            "<li>" +
                            "<div class=\"fn-flex\">" +
                            "<div class=\"fn-flex-1\">" +
                            "<div class=\"fn-flex\">" +
                            "<a rel=\"nofollow\" href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "\">" +
                            "<div class=\"avatar\" aria-label=\"" + breezemoonAuthorName + "\" style=\"background-image:url('" + breezemoonAuthorThumbnailURL48 + "')\"></div>" +
                            "</a>" +
                            "<div class=\"fn-ellipsis ft-fade ft-smaller list-info\">" +
                            "<a rel=\"nofollow\" class=\"author\" href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "\">" +
                            breezemoonAuthorName +
                            "</a>" +
                            "<br>" +
                            "刚刚" +
                            "<br>" +
                            "</div>" +
                            "</div>" +
                            "<a style=\"color: #3b3b3b\" class=\"abstract\" href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "/breezemoons/" + breezemoonOId + "\">" +
                            breezemoonContent +
                            "</a>" +
                            "</div>" +
                            "</div>" +
                            "</li>"
                        );
                    }
                    if ($(".active-bz-list")[0] !== undefined) {
                        let breezemoonAuthorName = data.bz.breezemoonAuthorName;
                        let breezemoonAuthorThumbnailURL48 = data.bz.breezemoonAuthorThumbnailURL48;
                        let breezemoonContent = data.bz.breezemoonContent;
                        let breezemoonOId = data.bz.oId;
                        let list = $($(".active-bz-list")[0]);
                        list.prepend(
                            "<li style=\"display: none\">\n" +
                            "<a href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "\">\n" +
                            "<span class=\"avatar-small slogan\" aria-label=\"" + breezemoonAuthorName + "\" style=\"background-image: url(" + breezemoonAuthorThumbnailURL48 + ")\"></span>\n" +
                            "</a>\n" +
                            "<a href=\"" + Label.servePath + "/member/" + breezemoonAuthorName + "/breezemoons/" + breezemoonOId + "\" class=\"title\">" + breezemoonContent + "</a>\n" +
                            "</li>"
                        );

                        list.find("li:last").fadeOut(199, function () {
                            list.find("li:last").remove();
                        });
                        list.find("li:first").slideDown(200);
                        Util.listenUserCard();
                    }
                    break;
                case 'refreshNotification':
                    if (window.location.pathname === '/cr') {
                        Util.makeNotificationRead('at');
                        Util.setUnreadNotificationCount(true);
                    } else {
                        Util.setUnreadNotificationCount(true);
                        if (data.count !== 0) {
                            Util.notice("default", 3000, "你有新的通知！<a href='/notifications'>点击查看</a>");
                        }
                    }
                    break;
                case 'chatUnreadCountRefresh':
                    if (data.count === 0) {
                        Util.pauseBling();
                    }
                    $("#aChatCount").text(data.count);
                    break;
                case 'newIdleChatMessage':
                    $("#aChatCount").text(parseInt($("#aChatCount").text()) + 1);
                    if (window.location.pathname !== "/chat") {
                        Util.blingChat();
                        Util.notice("warning", 3000, "叮咚！" + data.senderUserName + " 向你发送了一条私信。<a href='/chat?toUser=" + data.senderUserName + "'>点击查看</a>");
                    } else {
                        let preview = data.preview.substring(0, 10);
                        let dot = data.preview.length > 10 ? "..." : "";
                        let senderUserName = data.senderUserName;
                        let senderAvatar = data.senderAvatar;
                        if ($("#chatTo" + senderUserName).length <= 0) {
                            Chat.addToMessageList(senderUserName, senderAvatar, preview);
                        } else {
                            $("#chatTo" + senderUserName).find("span").html(preview + dot);
                        }
                        if ($("#chatTo" + senderUserName).css("background-color") !== 'rgb(241, 241, 241)') {
                            $("#chatTo" + senderUserName).css("background-color", "#fff4eb");
                        }
                        // 新消息置顶
                        let html = $("#chatTo" + senderUserName).prop('outerHTML');
                        $("#chatTo" + senderUserName).remove();
                        $("#chatMessageList").prepend(html);
                    }
                    break;
                case 'warnBroadcast':
                    let text = data.warnBroadcastText;
                    let who = data.who;
                    Util.alert("" +
                        "<style>" +
                        ".dialog-header-bg {" +
                        "border-radius: 4px 4px 0px 0px; background-color: rgb(151,49,210); color: rgb(255, 255, 255);" +
                        "}" +
                        ".dialog-main {" +
                        "height: 170px;" +
                        "overflow: auto;" +
                        "}" +
                        "</style>" +
                        "<div class=\"fn-hr5\"></div>\n" +
                        "<div class=\"ft__center\">\n" +
                        "<div><h1>摸鱼派社区紧急公告</h1><br>" + text + "<br><br>——紧急公告发布人：" + who + "</div>" +
                        "</div>\n" +
                        "", "紧急公告");
                    Util.alert(text);
                    $(".dialog-background").attr("onclick", "")
                    break;
            }
        }

        userChannel.onclose = function () {
            console.log("Disconnected to user channel websocket.")
        }

        userChannel.onerror = function (err) {
            console.log('ERROR', err)
        }
    },
    /**
     * @description 让聊天图标闪烁
     */
    blingChat: function () {
        $('#aChat').
        removeClass('no-msg').
        addClass('msg');
        if (!Util.isBlinging) {
            Util.isBlinging = true;
            bling = setInterval(function () {
                $('#aChat').removeClass('no-msg').addClass('msg');
                setTimeout(function () {
                    $('#aChat').removeClass('msg').addClass('no-msg');
                }, 1000);
            }, 2000);
        }
    },
    /**
     * @description 终止闪烁聊天图标
     */
    pauseBling: function () {
        $('#aChat').
        removeClass('msg').
        addClass('no-msg');
        if (Util.isBlinging) {
            Util.isBlinging = false;
            clearInterval(bling);
        }
    },
    /**
     * @description 设置导航状态
     */
    _initNav: function () {
        var href = location.href
        $('.user-nav > a').each(function () {
            if (href.indexOf($(this).attr('href')) === 0) {
                $(this).addClass('current')
            } else if (location.pathname === '/register') {
                // 注册没有使用 href，对其进行特殊处理
                $('.user-nav a:last').addClass('current')
            } else if (location.pathname === '/login') {
                // 登录没有使用 href，对其进行特殊处理
                $('.user-nav a:first').addClass('current')
            } else if (href.indexOf(Label.servePath + '/settings') === 0 ||
                href.indexOf($('#aPersonListPanel').data('url')) === 0) {
                $('#aPersonListPanel').addClass('current')
            }
        })

        $('.nav .avatar-small').parent().click(function () {
            $('#personListPanel').show()
        })

        $('body').click(function (event) {
            if ($(event.target).closest('a').attr('id') !== 'aPersonListPanel' &&
                $(event.target).closest('.module').attr('id') !== 'personListPanel') {
                $('#personListPanel').hide()
            }
        })

        // 导航过长处理 导航栏跳舞?涛涛你打野-----Yui留
        /*
        if ($('.nav-tabs a:last').length === 1 &&
            $('.nav-tabs a:last')[0].offsetTop > 0) {
            $('.nav-tabs').mouseover(function () {
                $('.user-nav').hide()
            }).mouseout(function () {
                $('.user-nav').show()
            })
        }
         */
    },
    /**
     * @description 登出
     */
    logout: function () {
        if (window.localStorage) {
            // Clear localStorage
            window.localStorage.clear()
            window.localStorage.hadNotificate = 'false'
        }
        window.location.href = Label.servePath + '/logout?goto=' + Label.servePath
    },
    /**
     * @description 获取字符串开始位置
     * @param {String} string 需要匹配的字符串
     * @param {String} prefix 匹配字符
     * @return {Integer} 以匹配字符开头的位置
     */
    startsWith: function (string, prefix) {
        return (string.match('^' + prefix) == prefix)
    },
    /**
     * @description Mouse click special effects.
     */
    mouseClickEffects: function () {
        var click_cnt = 0
        jQuery(document).ready(function ($) {
            $('html').click(function (e) {
                var n = 18
                var $i
                click_cnt++
                if (click_cnt == 10) {
                    $i = $('<b></b>').text('OωO')
                } else if (click_cnt === 20) {
                    $i = $('<b></b>').text('(๑•́ ∀ •̀๑)')
                } else if (click_cnt === 30) {
                    $i = $('<b></b>').text('(๑•́ ₃ •̀๑)')
                } else if (click_cnt === 40) {
                    $i = $('<b></b>').text('(๑•̀_•́๑)')
                } else if (click_cnt === 50) {
                    $i = $('<b></b>').text('（￣へ￣）')
                } else if (click_cnt === 60) {
                    $i = $('<b></b>').text('(╯°口°)╯(┴—┴')
                } else if (click_cnt === 70) {
                    $i = $('<b></b>').text('૮( ᵒ̌皿ᵒ̌ )ა')
                } else if (click_cnt === 80) {
                    $i = $('<b></b>').text('╮(｡>口<｡)╭')
                } else if (click_cnt === 90) {
                    $i = $('<b></b>').text('( ง ᵒ̌皿ᵒ̌)ง⁼³₌₃')
                } else if (click_cnt >= 100 && click_cnt <= 105) {
                    $i = $('<b></b>').text('(ꐦ°᷄д°᷅)')
                } else {
                    $i = $('<svg><use xlink:href="#heart"></use></svg>')
                    n = Math.round(Math.random() * 14 + 6)
                }
                var x = e.pageX, y = e.pageY
                $i.css({
                    'z-index': 9999,
                    'top': y - 20,
                    'left': x,
                    'position': 'absolute',
                    'color': '#E94F06',
                    'font-size': n,
                    '-moz-user-select': 'none',
                    '-webkit-user-select': 'none',
                    '-ms-user-select': 'none',
                })
                $('body').append($i)
                $i.animate(
                    {'top': y - 180, 'opacity': 0},
                    1500,
                    function () {
                        $i.remove()
                    }
                )
            })
        })
    },
    /**
     * @description 通知
     * options 说明
     * 参数名	默认值	类型	参数说明
     * type	success	{String}	提示框的类型，可填写参数 default, success, warning, danger
     * duration	3000	{Number}	设置提示框消失时间，默认 3000 毫秒
     * callback	function()	{Function}	提示框关闭时所调用的回调法。
     */
    notice: function (type, duration, text, callback) {
        if (callback !== undefined) {
            $.tooltips(text, {
                type: type,
                duration: duration,
                callback: callback
            });
        } else {
            $.tooltips(text, {
                type: type,
                duration: duration
            });
        }
    },
}
/**
 * @description 数据验证
 * @static
 */
var Validate = {
    /**
     * @description 提交时对数据进行统一验证。
     * @param {array} data 验证数据
     * @returns 验证通过返回 true，否则为 false。
     */
    goValidate: function (obj) {
        var tipHTML = '<ul>'
        for (var i = 0; i < obj.data.length; i++) {
            if (!Validate.validate(obj.data[i])) {
                tipHTML += '<li>' + obj.data[i].msg + '</li>'
            }
        }

        if (tipHTML === '<ul>') {
            obj.target.html('')
            obj.target.removeClass('error')
            return true
        } else {
            obj.target.html(tipHTML + '</ul>')
            obj.target.addClass('error')
            return false
        }
    },
    /**
     * @description 数据验证。
     * @param {object} data 验证数据
     * @param {string} data.type 验证类型
     * @param {object} data.target 验证对象
     * @param {number} [data.min] 最小值
     * @param {number} [data.max] 最大值
     * @returns 验证通过返回 true，否则为 false。
     */
    validate: function (data) {
        var isValidate = true,
            val = ''
        if (data.type === 'editor') {
            val = data.target.getValue()
        } else if (data.type === 'imgSrc') {
            val = data.target.attr('src')
        } else if (data.type === 'imgStyle') {
            val = data.target.data('imageurl')
        } else {
            val = data.target.val().toString().replace(/(^\s*)|(\s*$)/g, '')
        }
        switch (data.type) {
            case 'email':
                if (!/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(
                    data.target.val())) {
                    isValidate = false
                }
                break
            case 'password':
                if (data.target.val().length < 6 || data.target.val().length > 16 ||
                    !/\d/.test(data.target.val()) ||
                    !/[A-Za-z]/.test(data.target.val())) {
                    isValidate = false
                }
                break
            case 'confirmPassword':
                if (data.target.val() !== data.original.val()) {
                    isValidate = false
                }
                break
            case 'tags':
                var tagList = val.split(',')
                if (val === '' || tagList.length > 7) {
                    isValidate = false
                }

                for (var i = 0; i < tagList.length; i++) {
                    if (tagList[i].replace(/(^\s*)|(\s*$)/g, '') === ''
                        || tagList[i].replace(/(^\s*)|(\s*$)/g, '').length > 50) {
                        isValidate = false
                        break
                    }
                }
                break
            case 'url':
            case 'imgSrc':
            case 'imgStyle':
                if (val === '' ||
                    (val !== '' && (!/^\w+:\/\//.test(val) || val.length > 100))) {
                    isValidate = false
                }
                break
            case 'phone' :
                if (!/^[1][0-9]{10}$/.test(
                    data.target.val())) {
                    isValidate = false
                }
                break
            default:
                if (val.length <= data.max && val.length >= (data.min ? data.min : 0)) {
                    isValidate = true
                } else {
                    isValidate = false
                }
                break
        }
        return isValidate
    },
}
/**
 * @description 全局变量
 */
var Label = {}

// 开始 - 判断文件类型
var pngMagic = [
    0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]
var jpeg_jfif = [
    0x4a, 0x46, 0x49, 0x46,
]
var jpeg_exif = [
    0x45, 0x78, 0x69, 0x66,
]
var jpegMagic = [
    0xFF, 0xD8, 0xFF, 0xE0,
]
var gifMagic0 = [
    0x47, 0x49, 0x46, 0x38, 0x37, 0x61,
]
var getGifMagic1 = [
    0x47, 0x49, 0x46, 0x38, 0x39, 0x61,
]
var wavMagic1 = [
    0x52, 0x49, 0x46, 0x46,
]
var wavMagic2 = [
    0x57, 0x41, 0x56, 0x45,
]

function arraycopy (src, index, dist, distIndex, size) {
    for (i = 0; i < size; i++) {
        dist[distIndex + i] = src[index + i]
    }
}

function arrayEquals (arr1, arr2) {
    if (arr1 == 'undefined' || arr2 == 'undefined') {
        return false
    }

    if (arr1 instanceof Array && arr2 instanceof Array) {
        if (arr1.length != arr2.length) {
            return false
        }

        for (i = 0; i < arr1.length; i++) {
            if (arr1[i] != arr2[i]) {
                return false
            }
        }

        return true
    }

    return false
}

function isImage (buf) {
    return null !== getImageMime(buf)
}

function getImageMime (buf) {
    if (buf == null || buf == 'undefined' || buf.length < 8) {
        return null
    }

    var bytes = []
    arraycopy(buf, 0, bytes, 0, 6)
    if (isGif(bytes)) {
        return 'image/gif'
    }

    bytes = []
    arraycopy(buf, 6, bytes, 0, 4)
    if (isJpeg(bytes)) {
        return 'image/jpeg'
    }

    bytes = []
    arraycopy(buf, 0, bytes, 0, 8)
    if (isPng(bytes)) {
        return 'image/png'
    }

    return null
}

function isAudio (buf) {
    if (buf == null || buf == 'undefined' || buf.length < 12) {
        return null
    }

    var bytes1 = []
    arraycopy(buf, 0, bytes1, 0, 4)

    var bytes2 = []
    arraycopy(buf, 8, bytes2, 0, 4)

    if (isWav(bytes1, bytes2)) {
        return 'audio/wav'
    }

    return null
}

/**
 * @param data first 6 bytes of file
 * @return gif image file true, other false
 */
function isGif (data) {
    //console.log('GIF')
    return arrayEquals(data, gifMagic0) || arrayEquals(data, getGifMagic1)
}

/**
 * @param data first 4 bytes of file
 * @return jpeg image file true, other false
 */
function isJpeg (data) {
    //console.log('JPEG')
    return arrayEquals(data, jpegMagic) || arrayEquals(data, jpeg_jfif) ||
        arrayEquals(data, jpeg_exif)
}

/**
 * @param data first 8 bytes of file
 * @return png image file true, other false
 */
function isPng (data) {
    //console.log('PNG')
    return arrayEquals(data, pngMagic)
}

/**
 * @param data first 12 bytes of file
 * @return wav file true, other false
 */
function isWav (data1, data2) {
    return arrayEquals(data1, wavMagic1) && arrayEquals(data2, wavMagic2)
}

// 结束 - 判断文件类型
function getUUID () {
    var d = new Date().getTime()

    var ret = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g,
        function (c) {
            var r = (d + Math.random() * 16) % 16 | 0
            d = Math.floor(d / 16)
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
        })

    ret = ret.replace(new RegExp('-', 'g'), '')

    return ret
}

/**
 * @description Audio
 * @static
 */
var Audio = {
    availabel: false,
    wavFileBlob: null,
    recorderObj: null,
    /**
     * @description 初识化音频
     */
    init: function (succCB) {
        var detectGetUserMedia = new BrowserGetUserMediaDetection()

        //First, check to see if get user media is supported:

        if (detectGetUserMedia.getUserMediaSupported()) {
            navigator.getUserMedia = detectGetUserMedia.getUserMediaMethod()
            navigator.getUserMedia({audio: true}, success, failure)
        } else {
            console.log('ERROR: getUserMedia not supported by browser.')
        }

        //Get user media failure callback function:
        function failure (e) {
            console.log(
                'getUserMedia->failure(): ERROR: Microphone access request failed!')

            var errorMessageToDisplay
            var PERMISSION_DENIED_ERROR = 'PermissionDeniedError'
            var DEVICES_NOT_FOUND_ERROR = 'DevicesNotFoundError'

            switch (e.name) {
                case PERMISSION_DENIED_ERROR:
                    errorMessageToDisplay = Label.recordDeniedLabel
                    break
                case DEVICES_NOT_FOUND_ERROR:
                    errorMessageToDisplay = Label.recordDeviceNotFoundLabel
                    break
                default:
                    errorMessageToDisplay = 'ERROR: The following unexpected error occurred while attempting to connect to your microphone: ' +
                        e.name
                    break
            }
        }

        //Get user media success callback function:
        function success (e) {
            var BUFFER_SIZE = 2048
            var RECORDING_MODE = PredefinedRecordingModes.MONO_5_KHZ // 单声道 5kHz 最低的采样率
            var SAMPLE_RATE = RECORDING_MODE.getSampleRate()
            var OUTPUT_CHANNEL_COUNT = RECORDING_MODE.getChannelCount()

            var detectWindowAudioContext = new BrowserWindowAudioContextDetection()

            if (detectWindowAudioContext.windowAudioContextSupported()) {
                var windowAudioContext = detectWindowAudioContext.getWindowAudioContextMethod()

                Audio.recorderObj = new SoundRecorder(windowAudioContext, BUFFER_SIZE,
                    SAMPLE_RATE, OUTPUT_CHANNEL_COUNT)

                Audio.recorderObj.init(e)

                Audio.recorderObj.recorder.onaudioprocess = function (e) {
                    //Do nothing if not recording:
                    if (!Audio.recorderObj.isRecording()) {
                        return
                    }

                    // Copy the data from the input buffers;
                    var left = e.inputBuffer.getChannelData(0)
                    var right = e.inputBuffer.getChannelData(1)
                    Audio.recorderObj.cloneChannelData(left, right)
                }

                Audio.availabel = true
                succCB && succCB()
            } else {
                var messageString = 'Unable to detect window audio context, cannot continue.'
                console.log('getUserMedia->success(): ' + messageString)
                return
            }
        }
    },
    /**
     * @description 开始录音
     */
    handleStartRecording: function () {
        Audio.recorderObj.startRecordingNewWavFile()
    },
    /**
     * @description 结束录音
     */
    handleStopRecording: function () {
        Audio.recorderObj.stopRecording()

        //Save the recording by building the wav file blob and send it to the client:
        Audio.wavFileBlob = Audio.recorderObj.buildWavFileBlob()
    },
}
function Rotate(id) {
    let pause = false;
    let running = false;

    this.submit = function () {
        if (!running) {
            running = true;
            let rotate = 0;
            let styleSave;
            let pool;

            if (pool === undefined) {
                styleSave = document.getElementById(id).getAttribute("style");
                if (styleSave !== null && styleSave !== undefined && styleSave !== "") {
                    if (!styleSave.endsWith(";")) {
                        styleSave = styleSave + ";";
                    }
                } else {
                    styleSave = "";
                }
                pool = setInterval(function () {
                    rotate += 5;
                    if (rotate > 360) {
                        rotate = 0;
                    }
                    document.getElementById(id).setAttribute("style", styleSave + "-webkit-transform: rotate(" + rotate + "deg);");
                    if (rotate === 0) {
                        if (pause) {
                            clearInterval(pool);
                            document.getElementById(id).setAttribute("style", styleSave);
                            running = false;
                        }
                    }
                }, 15);
            }
        }
    }

    this.stop = function () {
        pause = true;
    }

    String.prototype.endWith = function (endStr) {
        const d = this.length - endStr.length;
        return (d >= 0 && this.lastIndexOf(endStr) === d);
    }
}


