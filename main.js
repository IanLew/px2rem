/*
 * Copyright (c) 2016 liuyang - All rights reserved
 *  
 */

define(function(require, exports, module) {
    "use strict";

    var CommandManager = brackets.getModule("command/CommandManager"),
        Menus = brackets.getModule("command/Menus"),
        KeyBindingManager = brackets.getModule("command/KeyBindingManager"),
        AppInit = brackets.getModule("utils/AppInit");

    var Settings = require("settings"),
        Convert = require("convert");

    var convertKeyId = "me.convert.pxrem";

    AppInit.appReady(function() {
        var editMenu = Menus.getMenu(Menus.AppMenuBar.EDIT_MENU);
        var cmdSettings = CommandManager.register("px2rem settings", "me.convert.setting", function() {
            Settings.showSettingsDialog();
        });
        editMenu.addMenuDivider();
        editMenu.addMenuItem('me.convert.setting', 'Ctrl-:')


        CommandManager.register("conversion", convertKeyId, function() {
            Convert.pxrem(Settings.getSettings('value'));
        });
        KeyBindingManager.addBinding(convertKeyId, "shift-tab");
    });
});