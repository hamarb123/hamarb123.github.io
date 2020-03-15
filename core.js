function filter(func, array)
{
    'use strict';
    if ( ! ((typeof func === 'Function' || typeof func === 'function')) )
        throw new TypeError();
   
    var len = array.length >>> 0,
        res = new Array(len), // preallocate array
        t = array, c = 0, i = -1;
	if (array === undefined)
	{
	  while (++i !== len)
	  {
        // checks to see if the key was set
		if (i in array)
		{
		  if (func(t[i], i, t))
		  {
            res[c++] = t[i];
          }
        }
      }
    }
	else
	{
	  while (++i !== len)
	  {
        // checks to see if the key was set
		if (i in array)
		{
		  if (func.call(array, t[i], i, t))
		  {
            res[c++] = t[i];
          }
        }
      }
    }
   
    res.length = c; // shrink down array to proper size
    return res;
}

function setNamedElementsAdvanced(name, htmlGen)
{
	function setNamedElementsAdvancedBody(name, htmlGen)
	{
		var done = false;
		while (!done)
		{
			const es = document.getElementsByName(name);
			if (es.length > 0)
			{
				var x = es[0];
				var dictionary = { };
				var children = x.children;
				for (let i = 0; i < children.length; i++)
				{
					var x_ = children[i];
					if (x_.getAttribute('name') === 'parameter')
					{
						function addStructure(structure)
						{
							if (dictionary.hasOwnProperty(structure.name))
							{
								if (dictionary[structure.name] instanceof Array)
								{
									dictionary[structure.name].push(structure.value);
								}
								else
								{
									dictionary[structure.name] = [dictionary[structure.name], structure.value];
								}
							}
							else
							{
								dictionary[structure.name] = structure.value;
							}
						}
						if (x_.hasAttribute('pValue'))
						{
							addStructure({name: x_.getAttribute('pName'), value: x_.getAttribute('pValue')});
						}
						if (x_.innerHTML != null && x_.innerHTML.trim() != "")
						{
							addStructure({name: x_.getAttribute('pName'), value: x_.innerHTML});
						}
						x_.remove();
						i--;
					}
				}
				//innerHTML should be after the item, not before
				var value = htmlGen(dictionary, x.innerHTML.trim());
				var postExecute = "";
				if (value.hasOwnProperty('postExecute'))
				{
					postExecute = value.postExecute;
				}
				if (value.hasOwnProperty('value'))
				{
					value = value.value;
				}
				x.insertAdjacentHTML('afterend', value.trim());
				x.remove();
				eval(postExecute);
			}
			else
			{
				done = true;
			}
		}
		setTimeout(function()
		{
			setNamedElementsAdvancedBody(name, htmlGen);
		}, 100);
	}
	setNamedElementsAdvancedBody(name, htmlGen);
}

//from https://stackoverflow.com/a/25396011
function escapeHTML(unsafeText)
{
    let div = document.createElement('div');
    div.innerText = unsafeText;
    return div.innerHTML;
}

function escapeHTMLAttribute(unsafeText)
{
    let div = document.createElement('div');
    div.setAttribute("_", unsafeText);
    var oHTML = div.outerHTML;
    var index0 = oHTML.indexOf(`"`);
    var index1 = oHTML.lastIndexOf(`"`);
    return oHTML.substring(index0, index1 + 1);
}

setNamedElementsAdvanced("header", function(params, innerHTML)
{
	var returnValue = 
`<div name="break">
	<div name="parameter" pName="size" pValue="e"></div>
</div>
<h1 class="a">
	<a href="/index.html" class="unchanging underlined">hamarb123 - Home</a><br/>
</h1>
<br/>
<div class="menu-outer">
	<div class="table">
		<ul class="horizontal-list">
			<li class="b">
				<a href="/discord.html">
					<img src="/discord.png" alt="Discord" class="discord" height="45pt" width="75pt"/>
				</a>
			</li><li class="b">
				<a href="/2dcraftchannel.html">
					<img src="/youtube.png" alt="Youtube" class="youtube" height="45pt" width="201pt"/>
				</a>
			</li><li class="b">
				<a href="mailto:hamarb123.help@gmail.com" target="_blank">
					<img src="/gmail help.png" alt="Email contact" class="gmail-help" height="45pt" width="63pt"/>
				</a>
			</li>
		</ul>
	</div>
</div>`;
	if (params.hasOwnProperty('text'))
	{
		returnValue += 
`<div name="break">
	<div name="parameter" pName="size" pValue="b"></div>
</div>
<div name="title">
	<div name="parameter" pName="text" pValue="` + params.text + `"></div>
</div>`;
	}
	var nobreak = false;
	var breaksize = "f";
	if (params.hasOwnProperty('nobreak'))
	{
		nobreak = true;
	}
	else if (params.hasOwnProperty('breaksize'))
	{
		breaksize = params.breaksize;
	}
	if (!nobreak)
	{
		returnValue += 
`<div name="break">
	<div name="parameter" pName="size" pValue="` + breaksize + `"></div>
</div>`;
	}
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("button", function(params, innerHTML)
{
	var text = "";
	var link = null;
	var onclick = null;
	var caption = null;
	if (params.hasOwnProperty('text'))
	{
		text = params.text;
	}
	if (params.hasOwnProperty('link'))
	{
		link = params.link;
	}
	else if (params.hasOwnProperty('onclick'))
	{
		onclick = params.onclick;
	}
	if (params.hasOwnProperty('caption'))
	{
		caption = params.caption;
	}
	var returnValue = "";
	if (link)
	{
		returnValue = 
`<a href="` + params.link + `"><button class="a">
		<h1 class="c">
			` + params.text + `
		</h1>
	</button></a>`;
	}
	else if (onclick)
	{
		returnValue = 
`<button class="a" onclick="` + onclick + `">
	<h1 class="c">
		` + params.text + `
	</h1>
</button>`;
	}
	else
	{
		returnValue = 
`<button class="a">
	<h1 class="c">
		` + params.text + `
	</h1>
</button>`;
	}
	if (caption)
	{
		returnValue = 
`<h1 class="c">
	` + returnValue + caption + `<br/>
</h1>`;
	}
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("compatibility", function(params, innerHTML)
{
	var returnValue = "";
	if (params.hasOwnProperty('platform'))
	{
		var platforms = null;
		if (params.platform instanceof Array)
		{
			platforms = params.platform;
		}
		else
		{
			platforms = [params.platform];
		}
		for (let i = 0; i < platforms.length; i++)
		{
			if (platforms[i] === 'windowsvista')
			{
			returnValue += 
`<li class="a">
	<img src="/windows vista desktop.png" alt="Compatible with Windows 7 SP1+" class="windows7" height="120pt" width="180pt"/>
</li>`;
			}
			if (platforms[i] === 'windows7')
			{
			returnValue += 
`<li class="a">
	<img src="/windows 7 desktop.png" alt="Compatible with Windows 7 SP1+" class="windows7" height="120pt" width="120pt"/>
</li>`;
			}
			if (platforms[i] === 'windows8')
			{
			returnValue += 
`<li class="a">
	<img src="/windows 8 desktop.png" alt="Compatible with Windows 8" class="windows8" height="120pt" width="96pt"/>
</li>`;
			}
			if (platforms[i] === 'windows10')
			{
			returnValue += 
`<li class="a">
	<img src="/windows 10 desktop.png" alt="Compatible with Windows 10" class="windows7" height="120pt" width="120pt"/>
</li>`;
			}
			if (platforms[i] === 'hamarb123store')
			{
			returnValue += 
`<li class="a">
	<img src="/hamarb123 store.png" alt="Available on the hamarb123 Store" class="hamarb123-store" height="120pt" width="160pt"/>
</li>`;
			}
			if (platforms[i] === 'microsoftstore')
			{
			returnValue += 
`<li class="a">
	<img src="/microsoft store.svg" alt="Available on the Microsoft Store" class="microsoft-store" height="120pt" width="164pt"/>
</li>`;
			}
		}
	}
	returnValue = 
`<div class="menu-outer">
	<div class="table">
		<ul class="horizontal-list">
			` + returnValue + `
		</ul>
	</div>
</div>`;
	if (params.hasOwnProperty('caption'))
	{
		returnValue += 
`<div name="break">
	<div name="parameter" pName="size" pValue="c"></div>
</div>
<h1 class="d">
	` + params.caption + `
</h1>`;
	}
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("linktext", function(params, innerHTML)
{
	var returnValue = "";
	var text = "";
	var link = "";
	if (params.hasOwnProperty('text'))
	{
		text = params.text;
	}
	if (params.hasOwnProperty('link'))
	{
		link = params.link;
	}
	var innersize = "c";
	var outersize = "c";
	if (params.hasOwnProperty('innersize'))
	{
		innersize = params.innersize;
	}
	if (params.hasOwnProperty('outersize'))
	{
		outersize = params.outersize;
	}
	returnValue = 
`<h1 class="` + outersize + `">
	<a href="` + link + `" class="unchanging underlined">
		<h1 class="` + innersize + `">
			` + text + `
		</h1>
	</a>
</h1>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("toponly", function(params, innerHTML)
{
	var returnValue = "";
	returnValue = 
`<div name="linktext">
	<div name="parameter" pName="text" pValue="Top"></div>
	<div name="parameter" pName="link" pValue="#top"></div>
</div>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("eulaagree", function(params, innerHTML)
{
	var returnValue = "";
	var link = "eula.html";
	if (params.hasOwnProperty('link'))
	{
		link = params.link;
	}
	returnValue = 
`<h1 class="f">
	By downloading you agree to the <a href="/eula.html" class="unchanging underlined">Terms and Conditions</a>
</h1>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("tableofcontents", function(params, innerHTML)
{
	var returnValue = "";
	var texts = [];
	var links = [];
	if (params.hasOwnProperty('text'))
	{
		texts = params.text;
	}
	if (params.hasOwnProperty('link'))
	{
		links = params.link;
	}
	if (!(texts instanceof Array))
	{
		texts = [texts];
	}
	if (!(links instanceof Array))
	{
		links = [links];
	}
	var len = texts.length;
	if (links.length < len) len = links.length;
	for (let i = 0; i < len; i++)
	{
		returnValue += 
`<li>
	<div name="linktext">
		<div name="parameter" pName="text" pValue="` + texts[i] + `"></div>
		<div name="parameter" pName="link" pValue="` + links[i] + `"></div>
		<div name="parameter" pName="outersize" pValue="c"></div>
		<div name="parameter" pName="innersize" pValue="d h"></div>
	</div>
</li>`;
	}
	returnValue = 
`<table style="margin-left: auto; margin-right: auto;">
	<tr><th>
		<div name="title">
			<div name="parameter" pName="text" pValue="Table of contents:"></div>
			<div name="parameter" pName="size" pValue="c h"></div>
		</div>
	</th></tr>
	<tr><th>
		<h1 class="e">
			<ul>
				` + returnValue + `
			</ul>
		</h1>
	</th></tr>
</table>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("break", function(params, innerHTML)
{
	var returnValue = "";
	var size = "de";
	if (params.hasOwnProperty('size'))
	{
		size = params.size;
	}
	returnValue = 
`<h1 class="` + size + `">
	<br/>
</h1>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("title", function(params, innerHTML)
{
	var returnValue = "";
	var size = "a-light";
	var text = "";
	if (params.hasOwnProperty('size'))
	{
		size = params.size;
	}
	if (params.hasOwnProperty('text'))
	{
		text = params.text;
	}
	returnValue = 
`<h1 class="` + size + `">
	` + text + `
</h1>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("horizontallist", function(params, innerHTML)
{
	var returnValue = "";
	var items = [];
	var liClass = "";
	if (params.hasOwnProperty('item'))
	{
		items = params.item;
	}
	if (params.hasOwnProperty('liClass'))
	{
		liClass = params.liClass;
	}
	if (!(items instanceof Array))
	{
		items = [items];
	}
	var len = items.length;
	for (let i = 0; i < len; i++)
	{
		returnValue += 
(liClass == "" ? `<li>` : `<li class="` + liClass + `">`) + `
	` + items[i] + `
</li>`;
	}
	returnValue = 
`<div class="menu-outer">
	<div class="table">
		<ul class="horizontal-list">
			` + returnValue + `
		</ul>
	</div>
</div>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("table", function(params, innerHTML)
{
	var width = 0;
	var height = 0;
	var items = [];
	var tableClass = "";
	var rowClass = "";
	var columnClass = "";
	if (params.hasOwnProperty('width'))
	{
		width = params.width;
	}
	if (params.hasOwnProperty('height'))
	{
		height = params.height;
	}
	if (params.hasOwnProperty('item'))
	{
		items = params.item;
	}
	if (params.hasOwnProperty('tableClass'))
	{
		tableClass = params.tableClass;
	}
	if (params.hasOwnProperty('rowClass'))
	{
		rowClass = params.rowClass;
	}
	if (params.hasOwnProperty('columnClass'))
	{
		columnClass = params.columnClass;
	}
	if (!(items instanceof Array))
	{
		items = [items];
	}
	if (items.length > width * height)
	{
		items = items.slice(0, width * height);
	}
	else if (items.length < width * height)
	{
		items = items.concat(Array(width * height - items.length).fill(""));
	}
	var tableStart = `<table` + (tableClass == "" ? `` : ` class="` + tableClass + `"`);
	var rowStart = `<tr` + (rowClass == "" ? `` : ` class="` + rowClass + `"`);
	var columnStart = `<th` + (columnClass == "" ? `` : ` class="` + columnClass + `"`);
	var returnValue = 
tableStart + ` style="margin-left: auto; margin-right: auto;">
`;
	var x = 0;
	for (let j = 0; j < height; j++)
	{
		returnValue +=
`	` + rowStart + `>
`;
		for (let i = 0; i < width; i++)
		{
			returnValue +=
`		` + columnStart + `>
			` + items[x++] + `
		</th>
`;
		}
		returnValue += 
`	</tr>
`;
	}
	returnValue += 
`</table>
`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("changelog", function(params, innerHTML)
{
	var urlprefix = "";
	var versions = [];
	if (params.hasOwnProperty('urlprefix'))
	{
		urlprefix = params.urlprefix;
	}
	if (params.hasOwnProperty('version'))
	{
		versions = params.version;
	}
	if (!(versions instanceof Array))
	{
		versions = [versions];
	}
	var returnValue =
`<div name="table">
	<div name="parameter" pName="width" pValue="1"></div>
	<div name="parameter" pName="height" pValue="` + versions.length + `"></div>
`;
	var jsCode = `var urlprefix = ` + JSON.stringify(urlprefix) + `
`;
	for (let i = 0; i < versions.length; i++)
	{
		returnValue +=
`	<div name="parameter" pName="item">
		<h1 class="h i">
			<div id=` + escapeHTMLAttribute("v" + versions[i]) + `></div>
		</h1>
	</div>
`;
		jsCode += `
loadversion(urlprefix, ` + JSON.stringify(versions[i]) + `);`;
	}
	returnValue +=
`</div>
`;
	returnValue += innerHTML;
	return {value: returnValue, postExecute: jsCode};
});

setNamedElementsAdvanced("copyrightmessage", function(params, innerHTML)
{
	var returnValue = "";
	returnValue = 
`<div style="position: absolute; left: 100%; transform: translate(-100%, -100%); white-space: nowrap; padding-right: 7pt;">
	<div name="title">
		<div name="parameter" pName="text" pValue="&copy; hamarb123 FunBandit29 2018&hairsp;&hairsp;-&hairsp;&hairsp;2020"></div>
		<div name="parameter" pName="size" pValue="f"></div>
	</div>
</div>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("top", function(params, innerHTML)
{
	var returnValue = "";
	returnValue = 
`<div name="toponly"></div>
<div name="copyrightmessage"></div>`;
	returnValue += innerHTML;
	return returnValue;
});

setNamedElementsAdvanced("dotpoints", function(params, innerHTML)
{
	var returnValue = "";
	var items = [];
	if (params.hasOwnProperty('item'))
	{
		items = params.item;
	}
	if (!(items instanceof Array))
	{
		items = [items];
	}
	var len = items.length;
	for (let i = 0; i < len; i++)
	{
		returnValue += 
	`<li>
		` + items[i] + `
	</li>`;
	}
	returnValue = 
`<ul>
	` + returnValue + `
</ul>`;
	returnValue += innerHTML;
	return returnValue;
});
