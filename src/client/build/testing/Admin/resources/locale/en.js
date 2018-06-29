I18N = {

    ApplicationUpdate: 'Application Update',
    ApplicationUpdateMsg: 'This application has an update, reload?',

    DaterangeText: 'Start date must be less than end date',
    PasswordText: 'The password does not meet the requirements',
    CompareText: 'Two input results are different',
    PasswordVTypeText: 'Passwords must consist of letters and numbers',

    FailedTitle: 'Error',
    Failed404: 'Request Address Error',
    Failed500: 'Server Internal Error',
    FailedOtherCode: 'Error Code: {0} <br\>response：{1}',

    AppTitle: 'LyApp',
    DefaultMessageTitle: 'Message',
    GetUserInfo: 'Loading user information......',
    StateRestoreWait: 'Restoring status information...',
    EmptyText: 'no data',

    ComingSoon: 'Coming Soon!',
    StayTunedForUpdates: 'Stay tuned for updates',
    Error404HTML: '<div>Seems you\'ve hit a wall!</div><div>Try going back to our <a href="/"> Home page </a></div>',
    Error500HTML: '<div>Something went wrong and server could not process your request.</div><div>Try going back to our <a href="/"> Home page </a></div>',

    DefaultDatetimeFormat: 'Y-m-d H:i:s',
    DefaultDateFormat: 'Y-m-d',
    DatetimeIsoFormat: 'C',

    Logout: 'Quit',
    LoginTitle: 'login',
    LoginLabel: 'Let\'s Log In',
    LoginSubmitWaitMsg: 'Logging in, please wait......',
    LoginSubmitWaitTitle: 'Logging in',
    PasswordResetTitle: 'change password',
    PasswordResetLabel: 'Enter the following fields to modify the password',
    PasswordResetSuccess: 'Password has been modified, please login again',
    OldPasswordEqualNew: 'The new password cannot be the same as the old password',
    UserId: 'User name',
    Password: 'Password',
    NewPassword: 'New password',
    PasswordRegexText: 'Passwords must consist of letters and numbers with a length of at least 6 digits',
    ConfirmPassword: 'Confirm password',
    RememberMe: 'Remember me',
    ForgotPassword: 'Forgot password',

    Save: 'save',
    SaveWaitMsg: 'Saving, please wait......',
    SavedAndClose: 'The data has been saved successfully and the window will be closed',
    SavedAndNothing: 'The data has been saved successfully',
    SavedAndNew: 'The data has been saved successfully and you can continue to add new data',
    Reset: 'Reset',
    Return: 'Return',
    Required: 'This field is required',
    RequiredTips: '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>is required',
    RequiredTpl: [
        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
    ],
    PasswordNoEqual: 'Different passwords entered two times',
    Count: '{count} item',

    DeleteNoSelection: 'Please select the option to delete',
    DeleteWaitMsg: 'Deleting, please wait...',
    DeleteConfirmMessageTitle: 'Delete',
    DeleteConfirmMessage: '<p>Make sure you want to delete the following {0}？</p>{1}',

    Add: 'Add',
    Edit: 'Edit',
    Delete: 'Delete',
    Details: 'Details',
    ShowDetails: 'View more information',
    Refresh: 'Refresh',
    Search: 'Search',
    Cancel: 'Cancel',
    Selected: 'Selected',
    NoModel: 'No model defined',
    NoSelection: 'Please select{0}, then {1}',
    Loading: 'Loading......',
    SaveAndNewButtonText: 'Save and New',
    SaveButtonText: 'Save',
    PasswordNoChange: 'Note: If you do not modify your password, leave blank',
    Sorter: 'Sorter',
    SorterASC: 'ASC',
    SorterDESC: 'DESC',
    EmptyValue: 'Empty',
    Help: 'Help',
    PhoneRegex: 'Only digits, horizontal lines (-), and spaces are allowed',
    Keyword: 'Keyword',

    SearchDate: 'Date:',
    SearchText: 'Text:',
    SearchStart: 'Start/Cancel Search',
    NoSearchValue: 'Please enter the correct search value to search again',
    SearchCompareErrorMessage: 'Start {0} cannot be greater than or equal to end {0}',

    User: 'User',
    Model: {
        User: {
            userName: 'Username',
            surname: 'surname',
            name: 'name',
            roleNames: 'role Names',
            emailAddress: 'email',
            creationTime: 'creation',
            lastLoginTime: 'last login',
            fullName: 'fullName',
            isActive: 'is Active',
            password: 'password'
        }
    },
    ValueList: {
        roles: [{
            id: 'Admin',
            text: '管理员'
        }, {
            id: 'User',
            text: '用户'
        }],
        roleDescription: {
            Admin: '管理员',
            User: '用户'
        },
        deleteMessage: ['## <i style="color:red">{0}</i> has been deleted', '## <i style="color:#ffc037">{0}</i> failed to delete']
    },


    init: function () {
        if (Ext.data && Ext.data.Types) {
            Ext.data.Types.stripRe = /[\$,%]/g;
        }

        if (Ext.Date) {
            Ext.Date.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

            Ext.Date.getShortMonthName = function (month) {
                return Ext.Date.monthNames[month].substring(0, 3);
            };

            Ext.Date.monthNumbers = {
                January: 0,
                Jan: 0,
                February: 1,
                Feb: 1,
                March: 2,
                Mar: 2,
                April: 3,
                Apr: 3,
                May: 4,
                June: 5,
                Jun: 5,
                July: 6,
                Jul: 6,
                August: 7,
                Aug: 7,
                September: 8,
                Sep: 8,
                October: 9,
                Oct: 9,
                November: 10,
                Nov: 10,
                December: 11,
                Dec: 11
            };

            Ext.Date.getMonthNumber = function (name) {
                return Ext.Date.monthNumbers[name.substring(0, 1).toUpperCase() + name.substring(1, 3).toLowerCase()];
            };

            Ext.Date.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

            Ext.Date.getShortDayName = function (day) {
                return Ext.Date.dayNames[day].substring(0, 3);
            };

            Ext.Date.parseCodes.S.s = "(?:st|nd|rd|th)";

            Ext.Date.firstDayOfWeek = 0;
            Ext.Date.weekendDays = [6, 0];
        }

        if (Ext.util && Ext.util.Format) {
            Ext.apply(Ext.util.Format, {
                thousandSeparator: ',',
                decimalSeparator: '.',
                currencySign: '$',
                dateFormat: 'm/d/Y'
            });
        }

        if (Ext.form.field.ComboBox) {
            Ext.apply(Ext.form.field.ComboBox.prototype.defaultListConfig, {
                loadingText: "Loading..."
            });
        }

        if (Ext.form.field.HtmlEditor) {
            Ext.apply(Ext.form.field.HtmlEditor.prototype, {
                buttonTips: {
                    bold: {
                        title: 'Bold (Ctrl+B)',
                        text: 'Make the selected text bold.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    italic: {
                        title: 'Italic (Ctrl+I)',
                        text: 'Make the selected text italic.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    underline: {
                        title: 'Underline (Ctrl+U)',
                        text: 'Underline the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    increasefontsize: {
                        title: 'Grow Text',
                        text: 'Increase the font size.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    decreasefontsize: {
                        title: 'Shrink Text',
                        text: 'Decrease the font size.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    backcolor: {
                        title: 'Text Highlight Color',
                        text: 'Change the background color of the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    forecolor: {
                        title: 'Font Color',
                        text: 'Change the color of the selected text.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyleft: {
                        title: 'Align Text Left',
                        text: 'Align text to the left.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifycenter: {
                        title: 'Center Text',
                        text: 'Center text in the editor.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    justifyright: {
                        title: 'Align Text Right',
                        text: 'Align text to the right.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertunorderedlist: {
                        title: 'Bullet List',
                        text: 'Start a bulleted list.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    insertorderedlist: {
                        title: 'Numbered List',
                        text: 'Start a numbered list.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    createlink: {
                        title: 'Hyperlink',
                        text: 'Make the selected text a hyperlink.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    },
                    sourceedit: {
                        title: 'Source Edit',
                        text: 'Switch to source editing mode.',
                        cls: Ext.baseCSSPrefix + 'html-editor-tip'
                    }
                }
            });
        }

        Ext.Object.each(I18N.overrides, function(key, value, myself) {
            var cls = Ext.ClassManager.get(key);
            if(cls){
                Ext.override(cls,value);
            }
        });
    },

    overrides:{

        'Ext.data.validator.Bound':{
            emptyMessage: "Must be present"
        },
        'Ext.data.validator.Email':{
            message: "Is not a valid email address"
        },
        'Ext.data.validator.Exclusion':{
            message: "Is a value that has been excluded"
        },
        'Ext.data.validator.Format':{
            message: "Is in the wrong format"
        },
        'Ext.data.validator.Inclusion':{
            message: "Is not in the list of acceptable values"
        },
        'Ext.data.validator.Length':{
            minOnlyMessage: "Length must be at least {0}",
            maxOnlyMessage: "Length must be no more than {0}",
            bothMessage: "Length must be between {0} and {1}"
        },
        'Ext.data.validator.Presence':{
            message: "Must be present"
        },
        'Ext.data.validator.Range':{
            minOnlyMessage: "Must be must be at least {0}",
            maxOnlyMessage: "Must be no more than than {0}",
            bothMessage: "Must be between {0} and {1}",
            nanMessage: "Must be numeric"
        },
        'Ext.grid.plugin.DragDrop':{
            dragText: "{0} selected row{1}"
        },
        'Ext.view.AbstractView':{
            loadingText: "Loading..."
        },
        'Ext.picker.Date':{
            todayText: "Today",
            minText: "This date is before the minimum date",
            maxText: "This date is after the maximum date",
            disabledDaysText: "",
            disabledDatesText: "",
            nextText: 'Next Month (Control+Right)',
            prevText: 'Previous Month (Control+Left)',
            monthYearText: 'Choose a month (Control+Up/Down to move years)',
            todayTip: "{0} (Spacebar)",
            format: "m/d/y",
            startDay: 0
        },
        'Ext.picker.Month':{
            okText: "&#160;OK&#160;",
            cancelText: "Cancel"
        },
        'Ext.PagingToolbar':{
            beforePageText: "Page",
            afterPageText: "of {0}",
            firstText: "First Page",
            prevText: "Previous Page",
            nextText: "Next Page",
            lastText: "Last Page",
            refreshText: "Refresh",
            displayMsg: "Displaying {0} - {1} of {2}",
            emptyMsg: 'No data to display'
        },
        'Ext.form.Basic':{
            waitTitle: "Please Wait..."
        },
        'Ext.form.field.Base':{
            invalidText: "The value in this field is invalid"
        },
        'Ext.form.field.Text':{
            minLengthText: "The minimum length for this field is {0}",
            maxLengthText: "The maximum length for this field is {0}",
            blankText: "This field is required",
            regexText: "",
            emptyText: null
        },
        'Ext.form.field.Number':{
            minText: "The minimum value for this field is {0}",
            maxText: "The maximum value for this field is {0}",
            nanText: "{0} is not a valid number"
        },
        'Ext.form.field.Date':{
            disabledDaysText: "Disabled",
            disabledDatesText: "Disabled",
            minText: "The date in this field must be after {0}",
            maxText: "The date in this field must be before {0}",
            invalidText: "{0} is not a valid date - it must be in the format {1}",
            format: "m/d/y",
            altFormats: "m/d/Y|m-d-y|m-d-Y|m/d|m-d|md|mdy|mdY|d|Y-m-d"
        },
        'Ext.form.field.VTypes':{
            emailText: 'This field should be an e-mail address in the format "user@example.com"',
            urlText: 'This field should be a URL in the format "http:/' + '/www.example.com"',
            alphaText: 'This field should only contain letters and _',
            alphanumText: 'This field should only contain letters':numbers and _'
        },
        'Ext.form.field.HtmlEditor':{
            createLinkText: 'Please enter the URL for the link:'
        },
        'Ext.grid.header.Container':{
            sortAscText: "Sort Ascending",
            sortDescText: "Sort Descending",
            columnsText: "Columns"
        },
        'Ext.grid.feature.Grouping':{
            emptyGroupText: '(None)',
            groupByText: 'Group by this field',
            showGroupsText: 'Show in Groups'
        },
        'Ext.grid.PropertyColumnModel':{
            nameText: "Name",
            valueText: "Value",
            dateFormat: "m/j/Y",
            trueText: "true",
            falseText: "false"
        },
        'Ext.grid.BooleanColumn':{
            trueText: "true",
            falseText: "false",
            undefinedText: '&#160;'
        },
        'Ext.form.field.Time':{
            minText: "The time in this field must be equal to or after {0}",
            maxText: "The time in this field must be equal to or before {0}",
            invalidText: "{0} is not a valid time",
            format: "g:i A",
            altFormats: "g:ia|g:iA|g:i a|g:i A|h:i|g:i|H:i|ga|ha|gA|h a|g a|g A|gi|hi|gia|hia|g|H"
        },
        'Ext.form.field.File':{
            buttonText: "Browse..."
        },
        'Ext.form.CheckboxGroup':{
            blankText: "You must select at least one item in this group"
        },
        'Ext.form.RadioGroup':{
            blankText: "ou must select one item in this group"
        },
        'Ext.window.MessageBox':{
            buttonText: {
                ok: "OK",
                cancel: "Cancel",
                yes: "Yes",
                no: "No"
            }
        },
        'Ext.grid.filters.Filters':{
            menuFilterText: "Filters"
        },
        'Ext.grid.filters.filter.Boolean':{
            yesText: "Yes",
            noText: "No"
        },
        'Ext.grid.filters.filter.Date':{
            fields: {
                lt: {
                    text: 'Before'
                },
                gt: {
                    text: 'After'
                },
                eq: {
                    text: 'On'
                }
            }
        },
        'Ext.grid.filters.filter.List':{
            loadingText: "Loading..."
        },
        'Ext.grid.filters.filter.Number':{
            emptyText: "Enter Number..."
        },
        'Ext.grid.filters.filter.String':{
            emptyText: "Enter Filter Text..."
        },
        'Ext.view.MultiSelectorSearch':{
            searchText: 'Search...'
        },
        'Ext.view.MultiSelector':{
            emptyText: 'Nothing selected',
            removeRowTip: 'Remove this item',
            addToolText: 'Search for items to add'
        },
        'Ext.tab.Tab':{
            closeText: "removable"
        }
    }


}