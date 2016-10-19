export function getMonth(date) {
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
export function formatCheckFromDate(date) {
	var date_sp = date.split(" ");
	var month = getMonth(date_sp[1]);
	var year = date_sp[3];
	var day = date_sp[2];
	return year + "-" + month + "-" + day
}
export function citySearchSelect(elem, additions) {
		additions = null;
		
		$(elem + " input").keyup(function(){
			var search = $(this).val();
			var link = "http://dev.jobufo.com/api/v1/geo/city/";

			$.ajax({
				url: link,
				type: "GET",
				data: {search: search},
				success: function(data) {
					console.log(data);
					var fields = $(elem + " .fields");
					fields.empty();
					for(var id in data) {
						var name = data[id].name;
						var code = data[id].pk;
						var div = `<div class="item" data-code="${code}">${name}</div>`;
						fields.append(div);
					}

					if (search != "" && data.length > 0)
						$(elem + " .fields").show();
					else 
						$(elem + " .fields").hide();

					fields.find(".item").click(function(){
						var city = $(this).text();
						var code = $(this).data("code");
						fields.hide();
						$(this).parent().parent().find("input").val(city);
						$(this).parent().parent().find("input").data("code", code);

						additions;
						/**/
					});
				}
			});
		});	

		$(elem + " input").focus(function(){
			if ($(elem + " .fields").html() != "")
			$(this).parent().find(".fields").show();
		});
		$(elem).focusout(function() {
	    	$(this).find(".fields").hide();     
	    });
	    $(elem).css('outline', 0).attr('tabindex', -1).focus(function() {
	    	if ($(elem + " .fields").html() != "")
	    	$(this).find(".fields").show();
		});

	}