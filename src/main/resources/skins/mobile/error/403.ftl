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
<#include "../macro-head.ftl">
<!DOCTYPE html>
<html>
    <head>
        <@head title="403 Forbidden! - ${symphonyLabel}">
        <meta name="robots" content="none" />
        </@head>
    </head>
    <body class="error error-403">
        <#include "../header.ftl">
        <div class="slogan">
            <div class="wrapper block">
                <h2>${sc403Label}</h2>
                <div class="slogan-border fn-clear">
                    <div class="slogan-register">
                        <button onclick="Util.goRegister()" class="green">${nowLabel}${registerLabel}</button>
                    </div>
                    <div class="slogan-text">
                        ${indexIntroLabel} &nbsp; &nbsp;
                    </div>
                </div>
            </div>
        </div>
        <div class="main">
            <div class="wrapper">
                <div class="fn-hr10"></div>
                <div class="side">
                    <#include "../side.ftl">
                </div>
            </div>
        </div>

        <#include '../footer.ftl'/>
    </body>
</html>
