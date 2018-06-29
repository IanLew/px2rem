/*
 * Copyright (c) 2016 liuyang - All rights reserved
 *  
 */

define(function(require, exports, module) {
    "use strict";

    var Dialogs = brackets.getModule("widgets/Dialogs"),
        Strings = brackets.getModule("strings"),
        oMustache = brackets.getModule("thirdparty/mustache/mustache"),
        SetTemplate = require("text!ui/settings.html");

    var settingsKeyId = 'me.convert.settings';

    var defaultSettings = {
        value: '10'
    };

    function getStorage() {
        var userData = localStorage.getItem(settingsKeyId);
        return userData ? JSON.parse(userData) : $.extend({}, defaultSettings);
    }

    function saveStorage(storage) {
        localStorage.setItem(settingsKeyId, JSON.stringify(storage));
    }

    function setSettings(name, value) {
        var storage = getStorage();
        if (typeof name == 'object') {
            for (var p in name) {
                if (name.hasOwnProperty(p)) {
                    storage[p] = name[p];
                }
            }
        } else {
            storage[name] = value;
        }
        saveStorage(storage);
    }

    function getSettings(name) {
        return getStorage()[name];
    }

    function showSettingsDialog() {
        var dlg, valueFld, base;

        var promise = Dialogs.showModalDialogUsingTemplate(oMustache.render(SetTemplate, Strings)).done(function(id) {
            if (id === Dialogs.DIALOG_BTN_OK) {
                base = valueFld.val();
                if (base !== '' && base !== 0) {
                    setSettings({
                        value: base
                    });
                } else {
                    setSettings(defaultSettings);
                }
            }
        });

        dlg = $(".convert-setting-dialog.instance");
        valueFld = dlg.find('#convert-setting-fld');
        base = getSettings('value');
        if (base !== '') {
            valueFld.val(base);
        } else {
            valueFld.val(defaultSettings.value);
        }

        return promise;
    }

    exports.showSettingsDialog = showSettingsDialog;
    exports.getSettings = getSettings;
    exports.setSettings = setSettings;
});