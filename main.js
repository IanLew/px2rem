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
     
     var convertKeyId = "me.convert.bind";
     
     AppInit.appReady(function() {
         var menu = Menus.addMenu("px2rem", "me.convert.rem");
         
         var cmdSettings = CommandManager.register("settings...", "me.convert.settings", function() {
             Settings.showSettingsDialog();
         });
         menu.addMenuItem(cmdSettings, "Ctrl-:");
         
         CommandManager.register("conversion", convertKeyId, function() {
             Convert.pxToRem(Settings.getSettings('value'));
         });
         KeyBindingManager.addBinding(convertKeyId, "`");
     });
});