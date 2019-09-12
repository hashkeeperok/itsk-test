
function win1(){
	$('.win-2, .win-3').fadeOut(500, function(){
		$('.win-1').fadeIn(500);
	});
}

function win2(){
	$('.win-1').fadeOut(500, function(){
		$('.win-2').fadeIn(500);
	});
}

function win3(){
	$('.win-3').fadeIn(500);
}

function createTable(){
	inner = $('.win-2 .inner');
	inner.html('');
	var tbl = $('<table>', {
		class: 'table table-bordered m-auto',
        append: $('<tbody>')
    }).appendTo(inner);

	for(i=0;i<m;i++){
		var tr = $('<tr>', {
			id: 'i-' + i
		}).appendTo(tbl);
		a1[i] = Array(m);
		for(j=0;j<m;j++){
			var x = RND(0, 9);
			a1[i][j] = x;
			td = $('<td>', {
				text: x,
				id: 'j-' + j
			});
			tr.append(td);
		}
	}
}

function createTableFromArray(a){
	var result = Array(m);
	inner = $('.win-3 .inner');
	inner.html('');
	var tbl = $('<table>', {
		class: 'table table-bordered m-auto',
        append: $('<tbody>')
    }).appendTo(inner);

	for(i=0;i<m;i++){
		var tr = $('<tr>', {
			id: 'i-' + i
		}).appendTo(tbl);
		for(j=0;j<m;j++){
			td = $('<td>', {
				text: a[i][j],
				id: 'j-' + j
			});
			tr.append(td);
		}
	}
}

function createZiroArray(m,n){
	var result = Array(m);
	for(i=0;i<m;i++){
			result[i] = Array(n);
			for(j=0;j<n;j++){
				result[i][j] = 0;
			}
		}
	return result;
}

function createResultArray(a){
	var result = Array(m);
	p1 = createZiroArray(10, m) // число повторов в столбце
	p2 = createZiroArray(10, m); // число повторов в строке

	for(n=0;n<10;n++){
		for(i=0;i<m;i++){
			for(j=0;j<m;j++){
				if(a[i][j] == n){
					p1[n][i]++;
					p2[n][j]++;
				}
			}
		}
	}
	
	for(i=0;i<m;i++){
		result[i] = Array(m);
		for(j=0;j<m;j++){
			if (p1[a[i][j]][i] == 1 && p2[a[i][j]][j] == 1){
				result[i][j] = a[i][j];
			} else if(p1[a[i][j]][i] == 1){
				result[i][j] = a[i][j]*p2[a[i][j]][j];
			} else if(p2[a[i][j]][j] == 1){
				result[i][j] = a[i][j]*p1[a[i][j]][i];
			} else{
				result[i][j] = a[i][j]*p1[a[i][j]][i] + a[i][j]*p2[a[i][j]][j];
			}
		}
	}

	return result;
}

function RND(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

$(function(){
	btn_name = 'Преобразовать';
	btn_restart = 'Рестарт';
	currentWin = $('.win-1');
	n = 10;
	$('form').on('submit', function(event){
		event.preventDefault();
		m = $('#M').val();
		a1 = Array(m);
		win2();
		createTable();
	});
	$('#go').on('click', function(){
		if(!$('#go').data().restart){
			a2 = createResultArray(a1);
			createTableFromArray(a2);
			win3();
			$('#go').data().restart = true;
			$('#go').html(btn_restart);
		} else {
			win1();
			$('#go').data().restart = false;
			$('#go').html(btn_name);
		}
		
	});
});