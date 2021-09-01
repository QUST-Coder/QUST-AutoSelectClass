const nonMoocCoursesList = [113017800, 113020500, 113020600]

var openPanel = (panel_class) => {
	panel_class.children[0].children[7].click();
};

async function selectSingleCourse(panel_class) { 
	openPanel(panel_class);
	Click_choose_button()
	await new Promise(r => setTimeout(r, 200));
	document.getElementById('btn_confirm').click();
	await new Promise(r => setTimeout(r, 600));
	// wait the ok button
	document.getElementById('btn_ok').click();
};

/*点击选课按钮*/
function Click_choose_button(){
    var course_block=document.getElementsByClassName('body_tr');
for (k=0;k<course_block.length;k++){
    if(course_block[k].getElementsByClassName('jsxm')[0].textContent==='尔雅'||
       course_block[k].getElementsByClassName('jsxm')[0].textContent==='卓越'){
        if (course_block[k].getElementsByTagName("button")[0].textContent==='选课'){
            course_block[k].getElementsByTagName("button")[0].click();
        };
    };
};
};

var isMoocClass = (panel_info) => { 
	var classofcourse = panel_info.querySelector('.kcmc');
	var course = classofcourse.textContent.match(/1130+[0-9]+/g);
	courseNum = parseInt(course);
	if (course == null) { 
		return false 
	}
	if (nonMoocCoursesList.includes(courseNum)) {
		return false
	}
	return true 
}

function selectMooc(mooc_list) {
	for (var i = 0; i < mooc_list.length; i++) { 
		(function(i, mooc_list) { 
			setTimeout(() => {
				selectSingleCourse(mooc_list[i])
			}, i * 3000);
		})(i, mooc_list)
	}
}

function getMoocList(courses_array) {
	var mooc_list = [];
	for (var i = 0; i < courses_array.length; i++) {
		if (isMoocClass(courses_array[i])) {
			mooc_list.push(courses_array[i])
		} else {
			continue
		}
	}
	return mooc_list
}

function selectCourse() {
	var courses_panel = document.getElementsByClassName('panel panel-info');
	// The first panel is unuseful
	var courses_panel_array = Array.from(courses_panel).slice(1);
	var mooc_list = getMoocList(courses_panel_array);
	if (mooc_list.length == 0) { return }	
	selectMooc(mooc_list)
};

/*刷新课程列表*/
function RefreshClasses(){
    var but=document.getElementsByClassName('btn btn-primary btn-sm');
    but[0].click();
	console.log("refresh")
};

setInterval(RefreshClasses, 12000);
setInterval(selectCourse, 12650);