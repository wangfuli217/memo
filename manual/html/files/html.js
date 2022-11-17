function win(str)
{
	var winEx = window.open("", "winEx", "width=500,height=300,status=yes,menubar=no,scrollbars=yes,resizable=yes"); winEx.document.open("text/html", "replace"); 
	winEx.document.write(document.getElementById(str).value); 
	winEx.document.close(); 
}