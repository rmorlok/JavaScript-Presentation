/* 
 * Tri-state checkbox
 * TriStateCheckbox.js
 * Copyright 2010, Steel Underpants Software (Ryan Morlok)
 * Released under the MIT, BSD, and GPL Licenses.
 * 
 */
(function(window, document, $) {

if( typeof window.SteelUnderpants === "undefined")
	window.SteelUnderpants = {};

CLASSES = {
	triStateCheckbox: "TriStateCheckbox",
	checked: "Checked",
	mixed: "Mixed",
	disabled: "Disabled"
};

EVENTS = {
	clicked: "clicked",
	checked: "checked",
	enabled: "enabled"
};

window.SteelUnderpants.TriStateCheckbox = function(options) {	
	var state = {
		checked: false,
		enabled: true,
		tabIndex: -1
	};
	
	$.extend(state, options);
	
	var me = document.createElement("a");
	me.setAttribute("role", "checkbox");
	me.setAttribute("aria-checked", state.checked.toString());
	me.setAttribute("aria-disabled", (!state.enabled).toString());
	me.setAttribute("tabindex", state.tabIndex.toString());
	me.className = CLASSES.triStateCheckbox;
	
	$(me)
		.bind("click.internal", function() {
			if( state.enabled )
				me.checked(state.checked === "mixed" || !state.checked);
		})
		.bind("keypress.internal", function(event) {
			if( state.enabled && event.charCode == 32 )
				me.checked(state.checked === "mixed" || !state.checked);
		})[0];
	
	checked(state.checked, true);
	enabled(state.enabled, true);
	
	function setClassName(checked, enabled) {
		if( !checked || checked === "false" ) {
			me.className = CLASSES.triStateCheckbox + " " + CLASSES.triStateCheckbox  + (state.enabled ? "" : CLASSES.disabled);
		} else if( checked === "mixed" ) {
			me.className = CLASSES.triStateCheckbox + " " + CLASSES.triStateCheckbox + CLASSES.mixed + (state.enabled ? "" : CLASSES.disabled);
		} else {
			me.className = CLASSES.triStateCheckbox + " " + CLASSES.triStateCheckbox + CLASSES.checked  + (state.enabled ? "" : CLASSES.disabled);
		}
	}
	
	function checked(val, initializing) {
		if( typeof val === "undefined" )
			return state.checked;

		if( initializing 
			|| !(state.checked === val
					|| (state.checked && val === "true")
					|| (!state.checked && val === "false")) ) {

			if( !val || val === "false" ) {
				state.checked = false;
				me.setAttribute("aria-checked", "false");
			} else if( val === "mixed" ) {
				state.checked = "mixed";
				me.setAttribute("aria-checked", "false");
			} else {
				state.checked = true;
				me.setAttribute("aria-checked", "true");
			}
			
			setClassName(state.checked, state.enabled);
			
			if( !initializing )
				$(me).trigger(EVENTS.checked);
		}
	}
	
	function enabled(val, initializing) {
		if( typeof val === "undefined" )
			return state.enabled;
		
		if( initializing || val != state.enabled ) {
			if( val ) {
				state.enabled = true;
				me.setAttribute("aria-disabled", "false");
			} else {
				state.enabled = false;
				me.setAttribute("aria-disabled", "true");
			}
			
			setClassName(state.checked, state.enabled);
			
			if( !initializing )
				$(me).trigger(EVENTS.enabled);
		}
	}
	
	me.checked = function(val) { return checked(val, false); };
	me.enabled = function(val) { return enabled(val, false); };
	
	return me;
}

})(window, document, jQuery);
