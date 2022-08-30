var ps = "---Please Select---";
var psValue = "_";
var origHPPCode = "axteopdgfgte";

/*--- Avanquest WebEasy Document Script ---*/
IE = (navigator.appName.indexOf('Microsoft') >= 0);
NS = (navigator.appName.indexOf('Netscape') >= 0);
SF = (navigator.appName.indexOf('Safari') >= 0);
FF = (navigator.userAgent.indexOf('Firefox') >= 0);
OP = (navigator.userAgent.indexOf('Opera') >= 0);
GK = (navigator.userAgent.indexOf('Gecko') >= 0);

V4 = (parseInt(navigator.appVersion) >= 4);

if ((V5 = navigator.appVersion.indexOf('MSIE ')) < 0)
	V5 = -5;

V5 = (parseInt(navigator.appVersion.charAt(V5 + 5)) >= 5);
MAC = (navigator.userAgent.indexOf('Mac') != -1);

IDP = {};
IDP[0] = 0;

// The function handles F5 / Ctrl + F5 / Ctrl + R
document.onkeydown = checkKeycode;

function checkKeycode(e) {

	var keycode;

	if (window.event) {
		// IE
		keycode = window.event.keyCode;

		if (keycode == 116 || (window.event.ctrlKey && keycode == 82)) {
			window.event.returnValue = false;
			window.event.keyCode = 0;
			window.status = "Refresh is disabled";
		}

	} else if (e) {
		// Firefox
		keycode = e.which;

		if (keycode == 116 || (e.ctrlKey && keycode == 82)) {
			if (e.preventDefault) {
				e.preventDefault();
				e.stopPropagation();
			}
		}
	}
}

window.onbeforeunload = function() {
	var inputs = document.getElementsByTagName("input");
	for ( var i in inputs) {
		if (inputs[i].type == "button" || inputs[i].type == "submit") {
			inputs[i].disabled = true;
		}
	}
	return null;
};

function goHome() {

	document.getElementById("pageName").value = "home";
	document.getElementById("frm").submit();
}

function showCsMenu() {

	if (parent.document.frm1 != null) {
		var en = parent.document.frm1.examName.value;
		document.getElementById("csmenu_exam_name").value = en;
	}
	document.getElementById("csMenuForm").submit();
}

var examName;

function setExamName() {
	if (parent.document.frm1 != null) {
		examName = parent.document.frm1.examName.value;
		document.getElementById("examName").value = examName;
		document.getElementById("exam_name_lbl").innerHTML = " ( " + examName + " )";
	}
}

function setFocus(fieldToFocus) {
	document.getElementById(fieldToFocus).focus();
}

function addTableRow(tableId, rowData, arrayNames, arrayPropNames) {

	var tbl = document.getElementById(tableId);
	var rowCount = tbl.rows.length;

	// Row
	// ------------------------------------------
	var row = tbl.insertRow(rowCount);
	var colCount = rowData.length;

	for (var i = 0; i < colCount; i++) {
		var cell = row.insertCell(i);
		// cell.appendChild(document.createTextNode(rowData[i]));
		cell.innerHTML = rowData[i];

		// Hidden Input Fields
		// --------------------------------------
		if (arrayNames != null && arrayNames[i] != null) {
			var inputElement = document.createElement("input");
			inputElement.type = "hidden";
			inputElement.name = arrayNames[i] + "[" + rowCount + "]" + arrayPropNames[i];
			inputElement.id = arrayNames[i] + "[" + rowCount + "]" + arrayPropNames[i];
			inputElement.value = rowData[i];
			cell.appendChild(inputElement);
		}
	}
	return row;
}

function addQuestionRow(tableId, rowData) {

	var tbl = document.getElementById(tableId);
	var rowCount = tbl.rows.length;

	// Row
	// ------------------------------------------
	var row = tbl.insertRow(rowCount);
	var colCount = rowData.length;

	for (var i = 0; i < colCount; i++) {
		var cell = row.insertCell(i);
		// cell.appendChild(document.createTextNode(rowData[i]));
		cell.innerHTML = rowData[i];
	}
}

function setOptions(selectFieldId, optionValues, showPleaseSelect) {

	var selectField = document.getElementById(selectFieldId);
	$('#' + selectFieldId).find('option').remove();
	// optionValues = optionValues.sort();

	if (showPleaseSelect) {
		var op = document.createElement("option");
		op.text = "--Please Select--";
		op.value = "";
		selectField.options.add(op);
	}
	var n = optionValues.length;

	for (var i = 0; i < n; i++) {
		var op = document.createElement("option");
		op.text = optionValues[i];
		op.value = optionValues[i];
		selectField.options.add(op);
	}
}

function logout() {
	document.getElementById("logoutForm").submit();
}

function showErrorMessage(errorMessage) {

	var sm = document.getElementById("status_message");
	sm.innerHTML = "<font color='red'>" + errorMessage + "</font>";
}

function showSuccessMessage(successMessage) {

	var sm = document.getElementById("status_message");
	sm.innerHTML = "<font color='green'>" + successMessage + "</font>";
}

function clearMessage() {

	var sm = document.getElementById("status_message");
	sm.innerHTML = "";
}

function clearFormMessage(formId) {

	var messageField = document.getElementById("message");

	if (messageField != null) {
		messageField.innerHTML = "&nbsp";
	}
	var frm = document.getElementById(formId);

	if (frm != null && document.getElementById("errors") != null) {
		frm.removeChild(document.getElementById("errors"));
	}
}

function resetFormFields(formId, focusToFieldId) {

	clearFormMessage(formId);

	var frm = document.getElementById(formId);
	var frm_elements = frm.elements;

	for (i = 0; i < frm_elements.length; i++) {
		frm_elements[i].style.border = '';
		field_type = frm_elements[i].type.toLowerCase();

		switch (field_type) {
		case "text":
		case "password":
		case "textarea":
		case "hidden":
			var name = "_csrf";

			if (name != frm_elements[i].name) {
				frm_elements[i].value = "";

				if (frm_elements[i].readOnly) {
					frm_elements[i].readOnly = false;
					frm_elements[i].style.backgroundColor = "";
				}
			}
			break;
		case "radio":
		case "checkbox":
			if (frm_elements[i].checked) {
				frm_elements[i].checked = false;
			}
			break;
		case "select-one":
			// frm_elements[i].selectedIndex = -1;
			frm_elements[i].selectedIndex = 0;
			break;
		case "select-multi":
		case "select-multiple":
			frm_elements[i].selectedIndex = -1;
			break;
		default:
			break;
		}
	}
	var focusToField = document.getElementById(focusToFieldId);

	if (focusToField != null) {
		focusToField.focus();
	}
}

function disableFormField(fieldId) {

	var field = document.getElementById(fieldId);

	field.readOnly = true;
	field.style.backgroundColor = 'lightgrey';
	field.style.border = "1px solid grey";
}

function checkNumber(evt) {

	if ((evt.which < 48 || evt.which > 57) && evt.which != 8 && evt.which != 0) {
		return false;
	}
	return true;
}

function checkDecimalNumber(evt) {
	if ((evt.which < 48 || evt.which > 57) && evt.which != 8 && evt.which != 0) {
		if (evt.which == 46) {
			return true;
		}
		return false;
	}
	return true;
}

function checkAlphaNumeric(evt) {

	if (((evt.which < 91) && (evt.which > 64)) || evt.which == 8 || evt.which == 0) {
		return true;
	}
	if (((evt.which < 123) && (evt.which > 96)) || evt.which == 8 || evt.which == 0) {
		return true;
	}
	if (((evt.which < 58) && (evt.which > 47)) || evt.which == 8 || evt.which == 0) {
		return true;
	}
	return false;
}

function errorFunction(jqXHR, textStatus, errorThrown) {
	if (jqXHR.status == 0) {
		alert('Not Connected. Verify Network.');
	} else if (jqXHR.status == 404) {
		alert('Requested Page Not Found. [404]');
	} else if (jqXHR.status == 500) {
		alert('Internal Server Error [500]');
	} else if (exception == 'parsererror') {
		alert('Requested JSON Parse Failed.');
	} else if (exception == 'timeout') {
		alert('Time Out Error');
	} else if (exception == 'abort') {
		alert('Ajax Request Aborted.');
	} else {
		alert('Uncaught Error - ' + jqXHR.responseText);
	}
}

function clearDataTable(dataTableId, numColumns) {

	document.getElementById(dataTableId).innerHTML = "<tr><td colspan=" + numColumns
			+ ">No data available in the table</td></tr>";
}

function getSelectFieldValue(fieldId) {

	var field = document.getElementById(fieldId);
	var value = field.options[field.selectedIndex].value;
	return value;
}

function startProgressBar() {
	document.getElementById("progressBar").style.display = "block";
}

function stopProgressBar() {
	document.getElementById("progressBar").style.display = "none";
}

function disableButton(btnId) {
	document.getElementById(btnId).disabled = true;
}

function enableButton(btnId) {
	document.getElementById(btnId).disabled = false;
}

function setTitle(elem) {
	elem.title = elem.value;
}

function getInputCode(input) {
	var output = 0;

	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i) + i;
		output += c;
	}
	return output;
}

function getHPPCode(hppCode, inputCode) {

	var n = parseInt(inputCode);

	for (var i = 0; i < n; i++) {
		hppCode = encode(hppCode, 3);
	}
	return hppCode;
}

function encode(input, key) {
	var output = "";

	for (var i = 0; i < input.length; i++) {
		var c = input.charCodeAt(i);

		if (c >= 65 && c <= 90) {
			output += String.fromCharCode((c - 65 + key) % 26 + 65); // Uppercase
		} else if (c >= 97 && c <= 122) {
			output += String.fromCharCode((c - 97 + key) % 26 + 97); // Lowercase
		} else {
			output += input.charAt(i); // Copy
		}
	}
	return output;
}

function showDialog(msg) {
	document.getElementById("dialog-text").innerHTML = msg;
	$("#dialog").dialog({
		resizable : false,
		scrollable : true,
		width : 600,
		modal : true
	});
	$("#dialog").dialog("option", "maxHeight", 400);
}
