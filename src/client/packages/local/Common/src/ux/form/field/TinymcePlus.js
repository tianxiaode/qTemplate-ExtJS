Ext.define('Common.ux.form.field.TinymcePlus',{
    extend: 'Common.ux.form.field.TinyMCE',
    xtype: 'tinymceplusfield',

    baseEditorConfig: {
        relative_urls: false,
        remove_script_host: false,
        document_base_url: IMAGEPATH,
        content_css: IMAGEPATH + '/content/metro.css',
        /*
        plugins: [
            'advlist lists link image charmap  hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars ',
            'media nonbreaking table code contextmenu',
            'paste textcolor colorpicker textpattern imagetools toc '
        ],
        toolbar1: 'undo redo | insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify| forecolor backcolor | bullist numlist outdent indent | link image media | insertMedia'
        */
        content_style: 'div,p {font-size:20px;text-indent: 2em;line-height: 30px;}',
        plugins: [
            "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
            "table contextmenu directionality emoticons template textcolor paste textcolor colorpicker textpattern"
        ],

        toolbar1: "newdocument | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
        toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media | insertdatetime preview | forecolor backcolor | code",
        toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | visualchars visualblocks nonbreaking template pagebreak restoredraft insertMedia",
        menubar: false,
        font_formats: '宋体=宋体;微软雅黑=微软雅黑;新宋体=新宋体;隶书=隶书;楷书=楷书;黑体=黑体;仿宋=仿宋;' +
        'Andale Mono=andale mono,monospace;' +
        'Arial=arial,helvetica,sans-serif;' +
        'Arial Black=arial black,sans-serif;' +
        'Book Antiqua=book antiqua,palatino,serif;' +
        'Comic Sans MS=comic sans ms,sans-serif;' +
        'Courier New=courier new,courier,monospace;' +
        'Georgia=georgia,palatino,serif;' +
        'Helvetica=helvetica,arial,sans-serif;' +
        'Impact=impact,sans-serif;' +
        'Symbol=symbol;' +
        'Tahoma=tahoma,arial,helvetica,sans-serif;' +
        'Terminal=terminal,monaco,monospace;' +
        'Times New Roman=times new roman,times,serif;' +
        'Trebuchet MS=trebuchet ms,geneva,sans-serif;' +
        'Verdana=verdana,geneva,sans-serif;' +
        'Webdings=webdings;' +
        'Wingdings=wingdings,zapf dingbats',

        toolbar_items_size: 'small'
    },

    initComponent: function () {
        var me = this,
            culture = Ext.util.Cookies.get('_culture') || 'zh_CN';
        me.tinyMCEConfig = Ext.apply({},
            me.baseEditorConfig,
            { language: culture, setup: Ext.bind(me.tinymceSetup, me) });
        me.callParent(arguments);
    },

    tinymceSetup: function (editor) {
        var me = this;
        editor.addButton('insertMedia', {
            text: I18N.InsertMedia,
            icon: false,
            onclick: Ext.bind(me.insertMedia, me)
        });
    },

    insertMedia: function () {
        var me = this,
            win = CFG.getDialog('mediaWin');
        win.on('selected', me.onMediaSelected, me, { single: true });
        win.setTitle(I18N.SelectedMedia);
        win.setImageOnly(false);
        win.show();
    },

    mediaTpl: [
        '<img src="{0}mediae/{1}/{2}" alt="{3}"/>',
        '<audio src="{0}mediae/{1}/{2}" controls="controls"></audio>',
        '<video controls="controls" width="300" height="150"><source src="{0}mediae/{1}/{2}"/></video>'
    ],

    onMediaSelected: function (win, records) {
        var me = this,
            ed = tinymce.get(me.getInputId()),
            ln = records.length,
            i, record;
        for (i = 0; i < ln; i++) {
            record = records[i];
            ed.insertContent(Ext.String.format(me.mediaTpl[record.data.Type - 1],
                IMAGEPATH,
                record.data.Path,
                record.data.FileName,
                record.data.Description));
        }
    }

});
