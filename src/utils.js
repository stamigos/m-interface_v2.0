function getMonth(date) {
	var str = '';
		switch(date){
			case 'Jan':
				str = '01';
				break;
			case 'Feb':
				str = '02';
				break;
			case 'Mar':
				str = '03';
				break;
			case 'Apr':
				str = '04';
				break;
			case 'May':
				str = '05';
				break;
			case 'Jun':
				str = '06';
				break;
			case 'Jul':
				str = '07';
				break;
			case 'Aug':
				str = '08';
				break;
			case 'Sep':
				str = '09';
				break;
			case 'Oct':
				str = '10';
				break;
			case 'Nov':
				str = '11';
				break;
			case 'Dec':
				str = '12';
				break;
		}
		return str;
}
function formatCheckFromDate(date) {
	var date_sp = date.split(" ");
	var month = getMonth(date_sp[1]);
	var year = date_sp[3];
	var day = date_sp[2];
	return year + "-" + month + "-" + day
}
