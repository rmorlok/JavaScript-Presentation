(function(window, document, $) {
	if( typeof window.Example === "undefined" ) {
		window.Example = {};
	}
	
    window.Example.DependentDropdown = function(parent, id1, id2, label1, label2, map, htmlOptions) {
        var me = this;
        me.parent = $(parent);
        me.container = $(document.createElement('div')).appendTo(me.parent);
        if (htmlOptions) {
            me.container.addClass(htmlOptions.cssClass);
        }

        me.addElement = function(tag, parent, htmlOptions) {
            var elem = $(document.createElement(tag)).appendTo(parent);
            if (htmlOptions) {
                if (htmlOptions.cssClass) {
                    elem.addClass(htmlOptions.cssClass);
                    delete htlmOptions.cssClass;
                }

                if (htmlOptions.text) {
                    elem.html(htmlOptions.text);
                    delete htmlOptions.text;
                }

                for (var option in htmlOptions) {
                    var currentOption = htmlOptions[option];
                    elem.attr(currentOption.name, currentOption.value);
                }
            }

            return elem;
        }

        me.addDropDownItem = function(dropdown, item) {
            var name = item.name ? item.name : item, value = item.value ? item.value : item;
            me.addElement('option', dropdown, { text: name, value: { name: "value", value: value} });
        }

        me.dropDown1Container = me.addElement('div', me.container);

        if (label1 != null && id1 != null) {
            me.addElement('label', me.dropDown1Container, { text: label1, target: { 'for': id1} });
        }

        me.dropDown1 = me.addElement('select', me.dropDown1Container);
        if (id1) {
            me.dropDown1.attr('id', id1);
        }

        me.dropDown2Container = me.addElement('div', me.container);

        if (label2 != null && id2 != null) {
            me.addElement('label', me.dropDown2Container, { text: label2, target: { 'for': id2} });
        }

        me.dropDown2 = me.addElement('select', me.dropDown2Container);
        if (id2) {
            me.dropDown2.attr('id', id2);
        }

        me.bindList = function() {
            /* TODO: Add support for web service calls. In that case, web service will accept the value of the first dropdown and will return
             * a list of items which have a name and a value, and optional HtmlOptions */
            me.dropDown2.html('');
            var workingList = map[me.dropDown1.val()].list;
            
            // Support arrays as well as hashes
            if (workingList.length) {
                for (var i = 0; i < workingList.length; i++) {
                    me.addDropDownItem(me.dropDown2, workingList[i]);
                }
            }
            else {
                for (var item in workingList) {
                    me.addDropDownItem(me.dropDown2, workingList[item]);
                }
            }
        }

        me.dropDown1.change(function() {
            me.bindList();
        });

        for (var item in map) {
            me.addDropDownItem(me.dropDown1, item);
        }

        me.bindList();
    }
})(window, document, jQuery);