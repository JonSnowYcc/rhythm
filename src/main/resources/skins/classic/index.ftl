<#--

    Rhythm - A modern community (forum/BBS/SNS/blog) platform written in Java.
    Modified version from Symphony, Thanks Symphony :)
    Copyright (C) 2012-present, b3log.org

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.

    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.

-->
<#include "macro-head.ftl">
<#include "common/title-icon.ftl">
<!DOCTYPE html>
<html>
<head>
    <@head title="${symphonyLabel}">
        <meta name="description" content="${symDescriptionLabel}"/>
    </@head>
    <link rel="stylesheet" href="${staticServePath}/css/index.css?${staticResourceVersion}"/>
    <link rel="canonical" href="${servePath}">
</head>
<body class="index">

<#include "header.ftl">
<#if showTopAd>
    ${HeaderBannerLabel}
</#if>
<div class="main">
    <div class="wrapper index-full-size-white" id="nightTips" style="display: none"></div>
    <div class="wrapper" style="padding-bottom: 20px">
        <div class="index-recent fn-flex-1">
            <div class="index-head-title">
                <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">最新</div>
                <div style="float:right;font-size:13px;margin:5px 0 0 0;"><a href="${servePath}/recent">更多</a></div>
                <div style="clear:both;"></div>
            </div>
            <div class="module-panel">
                <ul class="module-list">
                    <style>
                        .cb-stick {
                            position: absolute;
                            top: 0;
                            left: 0;
                            border-width: 10px 10px 13px 10px;
                            border-color: #999 transparent transparent #999;
                            border-style: solid;
                            margin-left: 5px;
                            z-index: 10;
                        }

                        .icon-pin {
                            position: absolute;
                            top: -9px;
                            left: -11px;
                            color: #FFF;
                        }

                        .icon-pin-rank {
                            position: absolute;
                            top: -11px;
                            left: -9px;
                            color: #FFF;
                        }

                        .rank {
                            padding: 7px 15px 7px 15px !important;
                        }
                    </style>
                    <#list recentArticles as article>
                        <li class="fn-flex">
                            <#if article.articleStick != 0>
                                <span class="cb-stick" aria-label="管理置顶"><svg class="icon-pin"><use
                                                xlink:href="#pin"></use></svg></span>
                            </#if>
                            <a rel="nofollow" href="${servePath}/member/${article.articleAuthorName}">
                                    <span class="avatar-small slogan"
                                          aria-label="${article.articleAuthorName}"
                                          style="background-image:url('${article.articleAuthorThumbnailURL48}')"></span>
                            </a>
                            <a rel="nofollow" class="title fn-ellipsis fn-flex-1"
                               href="${servePath}${article.articlePermalink}">${article.articleTitleEmoj}</a>
                            <a class="fn-right count ft-gray ft-smaller"
                               href="${servePath}${article.articlePermalink}"><#if article.articleViewCount < 1000>
                                    ${article.articleViewCount}<#else>${article.articleViewCntDisplayFormat}</#if></a>
                        </li>
                    </#list>
                </ul>
            </div>

        </div>
        <div class="index-recent fn-flex-1">
            <div class="index-head-title">
                <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">热议</div>
                <div style="float:right;font-size:13px;margin:5px 0 0 0;">
                    <a href="${servePath}/hot">更多</a>
                </div>
                <div style="clear:both;"></div>
            </div>
            <div class="module-panel">
                <ul class="module-list" id="hotArticles">
                    <#list hot as article>
                        <li class="fn-flex">
                            <a rel="nofollow" href="${servePath}/member/${article.articleAuthorName}">
                                <span class="avatar-small slogan"
                                      aria-label="${article.articleAuthorName}"
                                      style="background-image:url('${article.articleAuthorThumbnailURL48}')"></span>
                            </a>
                            <a rel="nofollow" class="title fn-ellipsis fn-flex-1"
                               href="${servePath}${article.articlePermalink}">${article.articleTitleEmoj}</a>
                            <a class="fn-right count ft-gray ft-smaller"
                               href="${servePath}${article.articlePermalink}">
                                <svg style="padding-top: 1px;vertical-align: -2px;">
                                    <use xlink:href="#fire"></use>
                                </svg> ${article.total_score}
                            </a>
                        </li>
                    </#list>
                </ul>
            </div>
        </div>
        <div class="index-recent fn-flex-1">
            <!--<div style="border-bottom: 1px solid #eee;margin:0px 10px ;">
                <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">活跃成员</div>
                <div style="clear:both;"></div>
            </div>-->
            <div class="module-panel">
                    <#if TGIF == '0'>
                        <div class="TGIF__item">
                            <div style="float: left">
                                <svg style="width: 30px; height: 30px;"><use xlink:href="#tadaIcon"></use></svg>
                            </div>
                            <div style="padding-left:40px">
                                <b>每周五的摸鱼周报时间到了！</b>
                                <br>
                                <button class="green fn-right" style="margin-left: 5px" onclick="window.location.href=Label.servePath+'/post?type=0&tags=摸鱼周报&title=摸鱼周报 ${yyyyMMdd}'">我抢~</button>
                                今天还没有人写摸鱼周报哦，抢在第一名写摸鱼周报，获得 <b style="color:orange">1000 积分</b> 奖励！
                            </div>
                        </div>
                        <#elseif TGIF == '-1'>

                        <#else>
                        <div class="TGIF__item">
                            <div style="float: left">
                                <svg style="width: 30px; height: 30px;"><use xlink:href="#tadaIcon"></use></svg>
                            </div>
                            <div style="padding-left:40px">
                                <b>每周五的摸鱼周报时间到了！</b>
                                <br>
                                今天已经有人写了摸鱼周报哦，<a href="${TGIF}" style="text-decoration:none;font-weight:bold;color:green;">快来看看吧~</a>
                            </div>
                        </div>
                    </#if>
            </div>

            <div class="index-head-title">
                <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">今日连签排行</div>
                <div style="float:right;font-size:13px;margin:5px 0 0 0;"><a href="${servePath}/top/checkin">更多</a>
                </div>
                <div style="clear:both;"></div>
            </div>
            <div class="module-panel">
                <ul class="module-list">
                    <#list topCheckinUsers as user>
                        <#if user_index < 7>
                            <li class="fn-flex rank topCheckInUsersElement">
                                <#if user_index == 0 || user_index == 1 || user_index == 2>
                                <span
                                        <#if user_index == 0>
                                            style="border-color: #ffab10 transparent transparent #ffab10;"
                                        <#elseif user_index == 1>
                                            style="border-color: #c0c0c0 transparent transparent #c0c0c0;"
                                        <#elseif user_index == 2>
                                            style="border-color: #d9822b transparent transparent #d9822b;"
                                        </#if>
                                        class="cb-stick" aria-label="第${user_index + 1}名">
                                    <span class="icon-pin-rank">${user_index + 1}</span>
                                    </#if>
                                </span>
                                <a rel="nofollow" href="${servePath}/member/${user.userName}">
                                    <span class="avatar-small slogan"
                                          aria-label="${user.userName}"
                                          style="background-image:url('${user.userAvatarURL48}')"></span>
                                </a>
                                <a rel="nofollow" class="title fn-flex-1"
                                   aria-label="${pointLabel} ${user.userPoint?c}"
                                   href="${servePath}/member/${user.userName}">${user.userName}</a>
                                <a class="tooltipped tooltipped-s fn-right count ft-gray ft-smaller"
                                   aria-label="${checkinStreakPart0Label}${user.userLongestCheckinStreak}${checkinStreakPart1Label}${user.userCurrentCheckinStreak}${checkinStreakPart2Label}"
                                   href="${servePath}/top/checkin">${user.userCurrentCheckinStreak}${checkinStreakPart2Label}</a>
                            </li>
                        </#if>
                    </#list>
                </ul>
            </div>

            <div class="index-head-title">
                <div style="float:left;font-size:13px;margin:15px 0 10px 0; font-weight:bold;">在线时间排行</div>
                <div style="float:right;font-size:13px;margin:15px 0 0 0;"><a href="${servePath}/top/online">更多</a>
                </div>
                <div style="clear:both;"></div>
            </div>
            <div class="module-panel">
                <ul class="module-list">
                    <#list onlineTopUsers as user>
                        <#if user_index < 6>
                            <li class="fn-flex rank topCheckInUsersElement">
                                <#if user_index == 0 || user_index == 1 || user_index == 2>
                                <span
                                        <#if user_index == 0>
                                            style="border-color: #ffab10 transparent transparent #ffab10;"
                                        <#elseif user_index == 1>
                                            style="border-color: #c0c0c0 transparent transparent #c0c0c0;"
                                        <#elseif user_index == 2>
                                            style="border-color: #d9822b transparent transparent #d9822b;"
                                        </#if>
                                        class="cb-stick" aria-label="第${user_index + 1}名">
                                    <span class="icon-pin-rank">${user_index + 1}</span>
                                    </#if>
                                </span>
                                <a rel="nofollow" href="${servePath}/member/${user.userName}">
                                    <span class="avatar-small slogan"
                                          aria-label="${user.userName}"
                                          style="background-image:url('${user.userAvatarURL48}')"></span>
                                </a>
                                <a rel="nofollow" class="title fn-flex-1"
                                   aria-label="${pointLabel} ${user.userPoint?c}"
                                   href="${servePath}/member/${user.userName}">${user.userName}</a>
                                <a class="fn-right count ft-gray ft-smaller"
                                   aria-label="在线时长共计 ${user.onlineMinute} 分钟"
                                   href="${servePath}/top/online">
                                    <#assign x=(user.onlineMinute?c)>
                                    <#if onlineTimeUnit??>
                                        <#if onlineTimeUnit == 'h'>
                                            <#assign t=(x?number/60)>
                                            ${t} 小时
                                        <#elseif onlineTimeUnit == 'd'>
                                            <#assign t=(x?number/60/24)>
                                            ${t} 天
                                        <#else>
                                            ${user.onlineMinute} 分钟
                                        </#if>
                                    <#else>
                                        ${user.onlineMinute} 分钟
                                    </#if>
                                </a>
                            </li>
                        </#if>
                    </#list>
                </ul>
            </div>
        </div>
    </div>

    <div class="wrapper index-full-size" id="goodNight" style="display: none"></div>

    <div class="index-bottom" style="margin-top: 20px">
        <div class="wrapper">
            <div class="fn-flex-1">
                <div class="metro-line fn-flex" style="align-items:center;">
                    <div class="metro-item" style="flex:1.2;">
                        <div class="calendar-container">
                        <div class="canendar-body">
                            <div class="calendar-head" id="vLine1">距离放假还有 🎉</div>
                            <div class="calendar-content" id="vLine2"><span
                                        id="vDay">?</span><span style="font-size: 30px"> 天</span></div>
                            <#--  <div style="font-size: 10px; color: rgba(161,163,163,0.91)" id="vLine3">我还在编......</div>  -->
<!--                            <a href="${servePath}/oldAlmanac">-->
<!--                                <div style="font-size: 10px; color: rgba(161,163,163,0.91)">点击查看今日运势</div>-->
<!--                            </a>-->
                        </div></div>
                    </div>
                    <div class="metro-item">
                        <a class="preview" style="padding-top:70px;">
                            <span id="checkedInStatus">
                            </span>
                            <div class="review" style="margin-bottom: 25px">
                                <div class="progress">
                                    <div class="progress-done" id="sp1"></div>
                                </div>
                                <span class="percent" id="sp2">0%</span>
                            </div>
                            <p id="activityDesc" style="user-select:none">
                            </p>
                        </a>
                    </div>
                    <div class="metro-item" style="cursor: pointer">
                        <a class="preview" id="yesterday" onclick="yesterday()">
                            <img style="border-radius: 0" id="yesterdayImg"
                                 src="https://file.fishpi.cn/2021/10/coin-2-70217cc1.png"><b>领取昨日活跃奖励</b>
                        </a>
                    </div>
                    <div class="metro-item">
                        <a class="preview" href="${servePath}/activities">
                            <img style="border-radius: 10px"
                                 src="https://file.fishpi.cn/2021/10/psp-game-1a94ae64.png">
                            <b>摸鱼派在线游戏</b>
                        </a>
                    </div>
                    <div class="metro-item">
                        <a class="preview" href="${servePath}/shop">
                            <img style="border-radius: 0"
                                 src="https://file.fishpi.cn/2022/03/ss-61cf1b96.png">
                            <b>系统商店</b>
                        </a>
                    </div>
                </div>

<#--                <div class="metro-border fn-flex">-->
<#--                    <div style="background:transparent;;flex:1.2;"></div>-->
<#--                    <div class="green"></div>-->
<#--                    <div class="yellow"></div>-->
<#--                    <div class="red"></div>-->
<#--                    <div class="purple"></div>-->
<#--                </div>-->
            </div>
        </div>
    </div>


    <div class="index-bottom" style="padding-top:20px;padding-bottom: 20px;">
        <div class="wrapper">
            <div class="index-recent fn-flex-1">
                <div class="index-head-title">
                    <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">聊天室（<span
                                id="indexOnlineChatCnt">?</span>人在线）
                    </div>
                    <div style="float:right;font-size:13px;margin:5px 0 0 0;"><a href="${servePath}/cr">进入完整版聊天室</a>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div class="module-panel">
                    <div class="module-header form" style="border: none;">
                        <input id="chatRoomInput"
                               type="text"
                               class="comment__text breezemoon__input"
                               placeholder="说点什么..."/>
                        <div id="chatUsernameSelectedPanel" class="completed-panel"
                             style="height:170px;display:none;left:auto;top:auto;cursor:pointer;"></div>
                        <span id="chatRoomPostBtn" class="btn breezemoon__btn" data-csrf="${csrfToken}"
                              onclick="sendChat()">发送</span>
                    </div>
                    <div class="module-panel">
                        <ul class="module-list" id="chatRoomIndex">
                            <#if messages?size != 0>
                                <#list messages as msg>
                                    <#if msg_index <= 9>
                                        <li class="fn-flex index-chat" id="chatindex${msg.oId}">
                                            <a rel="nofollow" href="${servePath}/member/${msg.userName}">
                                                <div class="avatar"
                                                     aria-label="${msg.userName}"
                                                     style="background-image:url('${msg.userAvatarURL48}')"></div>
                                            </a>
                                            <div class="fn-flex-1">
                                                <div class="ft-smaller">
                                                    <a rel="nofollow" href="${servePath}/member/${msg.userName}">
                                                        <#if msg.userNickname?? && msg.userNickname?length gt 1>
                                                            <span class="ft-gray">${msg.userNickname} (${msg.userName})</span>
                                                        <#else>
                                                            <span class="ft-gray">${msg.userName}</span>
                                                        </#if>
                                                    </a>
                                                </div>
                                                <div class="vditor-reset comment<#if 0 == chatRoomPictureStatus> blur</#if>">
                                                    <#assign text=msg.content>
                                                    <#if text?contains("\"msgType\":\"redPacket\"")>
                                                        [收到红包，请在完整版聊天室查看]
                                                    <#elseif text?contains("\"msgType\":\"weather\"")>
                                                        [天气卡片，请在完整版聊天室查看]
                                                    <#elseif text?contains("\"msgType\":\"music\"")>
                                                        [音乐卡片，请在完整版聊天室查看]
                                                    <#else>
                                                        ${text}
                                                    </#if>
                                                </div>
                                            </div>
                                        </li>
                                    </#if>
                                </#list>
                            <#else>
                                <li class="ft-center ft-gray" id="emptyChatRoom">${chickenEggLabel}</li>
                            </#if>
                        </ul>
                    </div>
                </div>
            </div>

            <div class="index-recent fn-flex-1">
                <div class="index-head-title">
                    <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">标签</div>
                    <div style="float:right;font-size:13px;margin:5px 0 0 0;"><a href="${servePath}/tags">更多</a>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div class="module-panel">
                    <div class="index-user">
                        <#list tags as tag>
                            <#if tag_index <= 20>
                                <div class="tag-metro-item">
                                    <a class="preview" href="${servePath}/tag/${tag.tagURI}">
                                        <img src="${tag.tagIconPath}" alt="${tag.tagTitle}">
                                        <span style="white-space: nowrap;">
                                        <#if tag.tagTitle?length gt 2>
                                            <marquee width="100%" height="100%" scrollamount="1" scrolldelay="100"
                                                     truespeed>
                                                    ${tag.tagTitle}
                                                </marquee>
                                        <#else>
                                            ${tag.tagTitle}
                                        </#if>
                                        </span>
                                    </a>
                                </div>
                            </#if>
                        </#list>
                    </div>
                </div>

                <div class="index-head-title">
                    <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;">问答</div>
                    <div style="float:right;font-size:13px;margin:5px 0 0 0;"><a href="${servePath}/qna">更多</a>
                    </div>
                    <div style="clear:both;"></div>
                </div>
                <div class="module-panel">
                    <ul class="module-list">
                        <#list qna as article>
                            <#if article_index <= 8>
                                <li class="fn-flex">
                                    <a rel="nofollow" href="${servePath}/member/${article.articleAuthorName}">
                                    <span class="avatar-small slogan"
                                          aria-label="${article.articleAuthorName}"
                                          style="background-image:url('${article.articleAuthorThumbnailURL48}')"></span>
                                    </a>
                                    <a rel="nofollow" class="title fn-ellipsis fn-flex-1"
                                       href="${servePath}${article.articlePermalink}">${article.articleTitleEmoj}</a>
                                    <a class="fn-right count ft-gray ft-smaller"
                                       href="${servePath}${article.articlePermalink}">
                                        <svg style="padding-top: 1px;vertical-align: -2px;">
                                            <use xlink:href="#coin"></use>
                                        </svg> ${article.articleQnAOfferPoint?c}</a>
                                </li>
                            </#if>
                        </#list>
                    </ul>
                </div>
            </div>
            <div class="index-recent fn-flex-1">
                <div class="index-head-title">
                    <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;cursor: pointer">最新注册</div>
                    <#list recentRegUsers as user>
                        <#if user_index = 0>
                            <a target="_blank" href="${servePath}/member/${user.userName}"
                               style="float: right; margin: 5px 0 10px 0; color: #646464; text-decoration: none">
                                🎉 欢迎新人 <b>${user.userName}</b>
                            </a>                    <div style="clear:both;"></div>
                        </#if>
                    </#list>
                </div>
                <div class="module-panel">
                    <div class="index-user">
                        <#list recentRegUsers as user>
                            <a rel="nofollow"
                               href="${servePath}/member/${user.userName}">
                                    <span class="avatar-middle slogan"
                                          aria-label="${user.userName}"
                                          style="background-image:url('${user.userAvatarURL48}');height:30px;width:30px;margin: 0px 10px 10px 0px"></span>
                            </a>
                        </#list>
                    </div>
                </div>

                <div class="index-head-title">
                    <div style="float:left;font-size:13px;margin:5px 0 10px 0; font-weight:bold;cursor: pointer" onclick="location.href='${servePath}/breezemoons'">清风明月</div>
                    <a href="${servePath}/article/1630938317106" title="清风明月是什么？"
                       style="float: right; margin: 5px 0 10px 0">
                        <svg>
                            <use xlink:href="#iconQuestion"></use>
                        </svg>
                    </a>
                    <div style="clear:both;"></div>
                </div>
                <div class="module-panel">
                    <div class="module-header form" style="border: none;">
                        <input id="breezemoonInput"
                               type="text"
                               class="comment__text breezemoon__input"
                               placeholder="${breezemoonLabel}"/>
                        <span id="breezemoonPostBtn" class="btn breezemoon__btn"
                              data-csrf="${csrfToken}">${postLabel}</span>
                    </div>
                    <div class="module-panel">
                        <ul class="module-list active-bz-list">
                            <#list sideBreezemoons as item>
                                <#if item_index <= 10>
                                    <li>
                                        <a href="${servePath}/member/${item.breezemoonAuthorName}">
                    <span class="avatar-small slogan" aria-label="${item.breezemoonAuthorName}"
                          style="background-image: url(${item.breezemoonAuthorThumbnailURL48})"></span>
                                        </a>
                                        <a href="${servePath}/member/${item.breezemoonAuthorName}/breezemoons/${item.oId}"
                                           class="title">${item.breezemoonContent}</a>
                                    </li>
                                </#if>
                            </#list>
                            <#if sideBreezemoons?size == 0>
                                <li class="ft-center ft-gray">${chickenEggLabel}</li>
                            </#if>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>

</div>
<#include "footer.ftl">
<script>
    Label.chatRoomPictureStatus = "<#if 0 == chatRoomPictureStatus> blur</#if>";
</script>
<script src="${staticServePath}/js/channel${miniPostfix}.js?${staticResourceVersion}"></script>
<script type="text/javascript">
    // tag click
    $('.preview, .index-tabs > span').click(function (event) {
        var $it = $(this),
            maxLen = Math.max($it.width(), $it.height());
        $it.prepend('<span class="ripple" style="top: ' + (event.offsetY - $it.height() / 2)
            + 'px;left:' + (event.offsetX - $it.width() / 2) + 'px;height:' + maxLen + 'px;width:' + maxLen + 'px"></span>');

        setTimeout(function () {
            $it.find('.ripple').remove();
        }, 800);
    });

    // 聊天室发送讯息
    $('#chatRoomInput').bind('keydown', function (event) {
        if (event.keyCode == "13") {
            $("#chatUsernameSelectedPanel").hide();
            sendChat();
        }
    });

    $("#chatRoomInput").on('input', function () {
        $("#chatUsernameSelectedPanel").html("");

        let value = $("#chatRoomInput").val()
        let users = [];
        if (value == '@') {
            $("#chatUsernameSelectedPanel").show();
            users = Util.getAtUsers('');
        } else if (value.startsWith('@')) {
            $("#chatUsernameSelectedPanel").show();
            value = value.substring(1)
            users = Util.getAtUsers(value);
        } else {
            $("#chatUsernameSelectedPanel").hide();
        }
        if (users.length === 0 || $("#chatRoomInput").val() === "") {
            $("#chatUsernameSelectedPanel").hide();
        } else {
            for (let i = 0; i < users.length; i++) {
                let user = users[i];
                $("#chatUsernameSelectedPanel").append("<a onclick=\"fillUsername('" + user.username + "')\"><img src='" + user.avatar + "' style='height:20px;width:20px;'> " + user.username + "</a>");
            }
        }
    });


    function fillUsername(username) {
        $("#chatRoomInput").val('@' + username + ' ');
        $("#chatUsernameSelectedPanel").html("");
        $("#chatUsernameSelectedPanel").hide();
    }

    var thisClient = 'Web/PC网页端 主页精简版';
    function sendChat() {
        <#if isLoggedIn>
        var content = $("#chatRoomInput").val();
        var requestJSONObject = {
            content: content,
            client: thisClient
        };
        $.ajax({
            url: Label.servePath + '/chat-room/send',
            type: 'POST',
            cache: false,
            data: JSON.stringify(requestJSONObject),
            beforeSend: function () {
                $("#chatRoomInput").val("")
            },
            success: function (result) {
                if (result.code !== 0) {
                    Util.alert(result.msg)
                }
            }
        });
        <#else>
        window.location.href = "${servePath}/login";
        </#if>
    }

    // Init [ChatRoom] channel
    $.ajax({
        url: Label.servePath + '/chat-room/node/get',
        type: 'GET',
        cache: false,
        success: function (result) {
            ChatRoomChannel.init(result.data);
        }
    });

    var chatRoomPictureStatus = "<#if 0 == chatRoomPictureStatus> blur</#if>";
</script>
<script>
    // 随机一句话
    function randomPoem() {
        let maxNum = 5;
        let num = parseInt(Math.random() * (maxNum - 1 + 1) + 1, 10)
        switch (num) {
            case 1:
                return "都放假了，有逛摸鱼派的时间，出去玩一玩，它不香吗？";
                break;
            case 2:
                return "是不是打算睡个大懒觉，结果发现熬夜根本停不下来？";
                break;
            case 3:
                return "如果你觉得无聊，就去谈个恋爱吧~"
                break;
            case 4:
                return "虽然放假，但是你还是要敲代码呀，卷起来。"
                break;
            case 5:
                return "上学的时候，放假想上学；上班的时候：不可能，我死在家里。"
                break;
        }
    }

    // 放假倒计时
    $(function () {
        let result = ${vocationData};
        let dayName = result.dayName;
        let type = result.type;
        if (type === 0 || type === 3) {
            let vName = result.vName;
            let vRest = result.vRest;
            if (type === 3) {
                $("#vLine1").html("调休不摸🐟，天理难容！<br>距离" + vName + "还有");
            } else {
                $("#vLine1").html("摸 🐟 加油！<br>距离" + vName + "还有");
            }
            $("#vDay").html(vRest);
            if (vRest === 1) {
                $("#vLine1").html("今天提桶！明天跑路！<br>" + vName + "马上就要到了！！！");
                $("#vLine2").html("<span style='font-size:30px;width:100%;height:100%;color:#0cc958;'>🎉<br>明天放假</span>");
                $("#vLine2").css("line-height", "30px");
                // $("#vLine3").css("display", "none");
            }
              //$.ajax({
              //    url: "https://v1.hitokoto.cn/",
              //    type: "GET",
              //    cache: false,
              //    success: function (result) {
              //      $("#vLine3").html(result.hitokoto);
              //  }
              //});
        } else if (type === 1 || type === 2) {
            let wRest = result.wRest;
            if (wRest === 1) {
                $("#vLine1").html("😰 今天是" + dayName + "<br><b>假期余额严重不足❗❗❗️</b>");
                $("#vLine2").html("<span style='font-size:30px;width:100%;height:100%;color:#c9320c;'>😭<br>明天上班</span>");
                $("#vLine2").css("line-height", "30px");
                // $("#vLine3").html("明天，你就可以见到久违的老板和可爱的同事们了！<b>你开心吗？</b>");
                // $("#vLine3").css("padding-top", "15px");
            } else {
                $("#vLine1").html("" + dayName + "快乐 🏖️<br><div>假期余额还有<b>" + wRest + "</b>天！</div>");
                $("#vLine2").html("<span style='font-size:60px;height:100%;color:#63bf8a;'>放假</span>");
                // $("#vLine3").html(randomPoem());
            }
        }
    });

    var fishingPiVersion = "${fishingPiVersion}";

    $(function () {
        var collectedYesterdayLivenessReward = ${collectedYesterdayLivenessReward};
        var checkedIn = ${checkedIn};
        if (collectedYesterdayLivenessReward === 0) {
            $("#yesterdayImg").addClass("cake");
        }
        if (checkedIn === 0) {
            $("#checkInImg").addClass("cake");
        }
    });

    function yesterday() {
        let yesterdayBtn = document.getElementById("yesterday");
        Util.fadeOut(yesterdayBtn);
        $.ajax({
            url: "${servePath}/activity/yesterday-liveness-reward-api",
            type: "GET",
            cache: false,
            async: false,
            headers: {'csrfToken': '${csrfToken}'},
            success: function (result) {
                if (result.sum === undefined) {
                    Util.goLogin();
                }
                setTimeout(function () {
                    if (result.sum === -1) {
                        $("#yesterday").html("<img style='border-radius: 0' src='https://file.fishpi.cn/2021/09/embarrassed-4112bd37.png'><b>暂时没有昨日奖励可领取呦！明天再来试试吧</b>");
                        Util.fadeIn(yesterdayBtn, function () {
                            setTimeout(function () {
                                Util.fadeOut(yesterdayBtn, function () {
                                    $("#yesterday").html('<img style="border-radius: 0" src="https://file.fishpi.cn/2021/10/coin-2-70217cc1.png" alt="领取昨日活跃奖励"><b>领取昨日活跃奖励</b>');
                                    Util.fadeIn(yesterdayBtn);
                                });
                            }, 2000);
                        });
                    } else {
                        $("#yesterday").html("<img style='border-radius: 0' src='https://file.fishpi.cn/2021/09/correct-1f5e3258.png'><b>昨日奖励已领取！积分 +" + result.sum + "</b>");
                        Util.fadeIn(yesterdayBtn, function () {
                            setTimeout(function () {
                                Util.fadeOut(yesterdayBtn, function () {
                                    $("#yesterday").html('<img style="border-radius: 0" src="https://file.fishpi.cn/2021/10/coin-2-70217cc1.png" alt="领取昨日活跃奖励"><b>领取昨日活跃奖励</b>');
                                    Util.fadeIn(yesterdayBtn);
                                });
                            }, 2000);
                        });
                    }
                }, 700);
            },
            error: function () {
                Util.goLogin();
            }
        });
    }

    var loading = false;
    var rotate = new Rotate("randomArticlesRefreshSvg");
</script>
<script>
    // 渐变输出
    /*function elementFadeOut(element, speed) {
        let fadePicList = $(element);
        for (i = 0; i < fadePicList.length; i++) {
            let element = $(fadePicList[i]);
            setTimeout(function () {
                element.css("display", "none");
                element.removeClass("fn-hidden");
                element.fadeIn(500);
            }, speed * (i + 1));
        }
    }

    elementFadeOut(".niceUsersElement", 20);
    elementFadeOut(".topCheckInUsersElement", 90);*/
</script>
<script>
    //drawCalendar();
    function drawCalendar() {
      var canvas = document.getElementById("adleredsCalendar");
      var ctx = canvas.getContext("2d");
      var width = canvas.width;
      var height = canvas.height;
      var leftEdge = width * 0.1;
      var calenderWidth = width * 0.8;
      var x = leftEdge;
      var y = 20;
      var radius = 10;
      ctx.beginPath();
      ctx.arc(x + radius, y+radius, radius,Math.PI, -0.5*Math.PI, false);
      ctx.lineTo(x + calenderWidth - radius * 2, y);
      ctx.arc(x + calenderWidth - radius, y+radius, radius, -0.5*Math.PI, 0, false);
      ctx.lineTo(x + calenderWidth, y + radius * 4);
      ctx.lineTo(x, y + radius * 4);
      ctx.lineTo(x, y + radius);
      ctx.fillStyle = "#be4145";
      ctx.fill();
    }
    var liveness = ${liveness};
    var checkedIn = <#if checkedIn == 1>true<#else>false</#if>;
    function getCheckedInStatus() {
        $.ajax({
            url: Label.servePath + "/user/checkedIn",
            method: "get",
            cache: false,
            async: false,
            success: function (result) {
                checkedIn = result.checkedIn;
            }
        });
    }
    function getActivityStatus() {
        $.ajax({
            url: Label.servePath + "/user/liveness",
            method: "get",
            cache: false,
            async: false,
            success: function (result) {
                liveness = result.liveness;
            }
        });
    }
    function refreshActivities() {
        <#if isLoggedIn>
        getCheckedInStatus();
        getActivityStatus();
        </#if>
        if (checkedIn === true) {
            $("#checkedInStatus").html('' +
                '<p style="user-select:none;color:#3caf36;font-weight:bold;font-size:13px">' +
                '今日已签到' +
                '</p>');
        } else if (checkedIn === false) {
            $("#checkedInStatus").html('' +
                '<p style="user-select:none;color:#c46b25;font-weight:bold;font-size:13px">' +
                '今日未签到' +
                '</p>');
        }
        $("#sp1").css("width", liveness + "%");
        let formatedLiveness;
        for (let i = 0; i <= liveness; i++) {
            formatedLiveness = i;
        }
        let nowLiveness = parseInt($("#sp2").text().replace("%", ""));
        if (liveness == 0) {
            nowLiveness = 0;
        }
        if ($("#sp2").html() !== formatedLiveness + "%") {
            let j = 1;
            for (let i = nowLiveness; i <= liveness; i++) {
                setTimeout(function () {
                    $("#sp2").html(i + "%");
                    if (i < 10) {
                        $("#sp1").css("background", "linear-gradient(to left, #f11616, #d71212)").css("box-shadow", "0 3px 3px -5px #c72222, 0 2px 5px #c72222");
                    } else if (i >= 10 && i < 100) {
                        $("#sp1").css("background", "linear-gradient(to left, #24b0b7, #1dacb3)").css("box-shadow", "0 3px 3px -5px #22bfc7, 0 2px 5px #22bfc7");
                    } else if (i == 100) {
                        $("#sp1").css("background", "linear-gradient(to left, #29d120, #3caf36)").css("box-shadow", "#3caf36 0px 3px 3px -5px, #3caf36 0px 2px 5px");
                    }
                }, j * 10);
                j++;
            }
        }
        if (liveness < 10 && !checkedIn) {
            $("#activityDesc").html("今日活跃度到达 10% 后<br>系统将自动签到");
        } else if (liveness < 10 && checkedIn) {
            $("#activityDesc").html("您的免签卡今日已生效");
        } else if (liveness >= 10 && !checkedIn) {
            $("#activityDesc").html("已提交自动签到至系统<br>请稍候查看签到状态");
        } else if (liveness < 100) {
            $("#activityDesc").html("今日活跃度到达 100% 后<br>可获得神秘礼物及明日天降红包资格");
        } else {
            $("#activityDesc").html("礼物已放入背包，并获得明日天降红包资格！明天在线时如有新人注册，将获得天降红包");
        }
    }
    refreshActivities();
    <#if isLoggedIn>
    setInterval(refreshActivities, 30000);
    </#if>
</script>
<script>
    $('#chatRoomIndex').on('click', '.vditor-reset img', function () {
        if ($(this).hasClass('emoji')) {
            return;
        }
        window.open($(this).attr('src'));
    });
    $(function(){
        let today = new Date();
        if(today.getMonth() == 11 && today.getDate() == 13){
        $('html').css("filter","grayscale(100%)")
         $('html').css("-webkit-filter","grayscale(100%)")
     }
    });

    <#if userPhone == "">
        Util.alert("⛔ 为了确保账号的安全及正常使用，依照相关法规政策要求：<br>您需要绑定手机号后方可正常访问摸鱼派。<br><br><button onclick='location.href=\"${servePath}/settings/account#bind-phone\"'>点击这里前往设置</button>")
    </#if>

    <#if need2fa == "yes">
    Util.alert("⛔ 摸鱼派管理组成员，您好！<br>作为管理组的成员，您的账号需要更高的安全性，以确保社区的稳定运行。<br>请您收到此通知后，立即在个人设置-账户中启用两步验证，感谢你对社区的贡献！<br><br><button onclick='location.href=\"${servePath}/settings/account#mfaCode\"'>点击这里前往设置</button>", "致管理组成员的重要通知️")
    </#if>
</script>
<script>
    /*let now = new Date().getHours();
    let day = new Date().getDay();
    if ((now >= 19 && now <= 23) || (now >= 0 && now <= 7)) {
        $("head").append('<link rel="stylesheet" href="https://fonts.font.im/css2?family=Ma+Shan+Zheng&display=swap">');
        //loadTips();
        goodNight();
    } else if (day === 0 || day === 6) {
        $("head").append('<link rel="stylesheet" href="https://fonts.font.im/css2?family=Ma+Shan+Zheng&display=swap">');
        //loadTips();
    }

    function goodNight() {
        $("#goodNight").html('' +
            '<div style="float: left; margin-left: 40px">' +
            '    <svg style="width: 95px; height: 95px;"><use xlink:href="#moon"></use></svg>' +
            '</div>' +
            '<div style="margin: 20px 0 20px 30px;">' +
            '   <div style="font-size: 25px;"><#if currentUser??>To ${currentUser.userName}: </#if>工作辛苦啦，请早点回家休息 :)</div>' +
            '   <div style="font-size: 17px; margin-top: 10px">下班时间，我们认为专注于做自己喜欢的事会更有意义。</div>' +
            '   <div style="font-size: 17px; margin-top: 9px">现在是摸鱼派的休息时间，但小派还在默默地陪伴你，请尽快完成工作回家吧~ <span class="ft-red">♥️</span></div>' +
            '</div>');
        setTimeout(function () {
            $("#goodNight").slideDown(1500);
        }, 2000)
    }

    function loadTips() {
        $("#nightTips").html('' +
            '<div style="float: left;margin: 16px 15px 0 55px;">' +
            '    <svg style="width: 30px; height: 30px;"><use xlink:href="#coffee"></use></svg>' +
            '</div>' +
            '<div>' +
            '   <div style="font-size: 17px; margin-top: 10px">送你一份「加班补助」</div>' +
            '   <div style="font-size: 17px; margin-top: 9px">使用「加班小记」作为文章标签和标题(如提示标题重复可在后面加上日期)，经人工审核内容真实，发放500积分加班补助。</div>' +
            '</div>' +
            '');
        setTimeout(function () {
            $("#nightTips").slideDown(1500);
        }, 500);
    }*/
</script>
</body>
</html>
