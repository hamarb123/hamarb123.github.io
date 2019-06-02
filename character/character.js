function identifyChars()
{
	var text = window.input1.value;
	var output = "";
	for (var i = 0; i < text.length; i++)
	{
		output += "U+" + ("0000" + text.charCodeAt(i).toString(16)).substr(-4).toUpperCase();
		if (i != text.length - 1)
		{
			if (i % 7 == 6 && i != 0)
			{
				output += "\n";
			}
			else
			{
				output += " ";
			}
		}
	}
	window.output1.value = output;
}
function hexToDec()
{
	try
	{
		var valueInt = parseInt(window.input2.value, 16);
		if (isNaN(valueInt))
		{
			throw new Error();
		}
		window.output2.value = valueInt.toString(10);
	}
	catch(err)
	{
		alert("Please enter a legal number.");
	}
}
function decToHex()
{
	try
	{
		var valueInt = parseInt(window.input2.value, 10);
		if (isNaN(valueInt))
		{
			throw new Error();
		}
		window.output2.value = valueInt.toString(16).toUpperCase();
	}
	catch(err)
	{
		alert("Please enter a legal number.");
	}
}
function generateCharacter()
{
	try
	{
		var valueInt = parseInt(window.input3.value, 16);
		if (isNaN(valueInt) || valueInt > 65535 || valueInt < 1)
		{
			throw new Error();
		}
		window.output3.value = String.fromCharCode(valueInt);
	}
	catch(err)
	{
		alert("Please enter a legal number (cannot do character 0).");
	}
}
const copyToClipboard = str => {
	const el = document.createElement('textarea');
	el.value = str;
	document.body.appendChild(el);
	el.select();
	document.execCommand('copy');
	document.body.removeChild(el);
};
function copyCharacter()
{
	copyToClipboard(window.output2.value);
}
function generateCharacters()
{
	try
	{
		var valueInt1 = parseInt(window.input4_1.value, 16);
		var valueInt2 = parseInt(window.input4_2.value, 16);
		if (isNaN(valueInt1) || valueInt1 > 65535 || valueInt1 < 1)
		{
			throw new Error();
		}
		if (isNaN(valueInt2) || valueInt2 > 65535 || valueInt2 < 1)
		{
			throw new Error();
		}
		if (valueInt2 < valueInt1)
		{
			throw new Error();
		}
		var output = "";
		for (var i = valueInt1; i <= valueInt2; i++)
		{
			output += "U+" + ("0000" + i.toString(16)).substr(-4).toUpperCase() + ": " + String.fromCharCode(i);
			if (i != valueInt2)
			{
				output += "\n";
			}
		}
		window.output4.value = output;
	}
	catch(err)
	{
		alert("Please enter legal numbers (cannot do character 0).");
	}
}