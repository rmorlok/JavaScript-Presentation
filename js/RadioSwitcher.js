(function() {
	window.RadioSwitcher = function(parent, pairs, name) {
		var me = this;
		me.container = $(document.createElement('div')).appendTo($(parent));
		me.blocks = $(document.createElement('div')).appendTo($(parent));
		me.buttonList = $(document.createElement('ul')).appendTo(me.container);
		
		$.each(pairs, function(label, id) {
			var listItem = $(document.createElement('li')).appendTo(me.buttonList);
			
			$(document.createElement('input'))
				.attr('type', 'radio')
				.attr('class', 'switcher')
				.attr('id', 'RadioButtonFor_' + id)
				.attr('target', id)
				.attr('name', name)
				.appendTo(listItem);

			$(document.createElement('label'))
				.attr('for', 'RadioButtonFor_' + id)
				.html(label)
				.appendTo(listItem);

			$('#' + id)
				.appendTo(me.blocks)
				.addClass('switchee')
				.hide();
		});

		me.buttonList.find('.switcher').click(function() {
			var id = $(this).attr('target');
			$('.switchee:visible[id!=' + id + ']').slideUp();
			$('#' + id).slideDown();
		});
	}
})();