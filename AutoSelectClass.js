const nonMoocCoursesList = [113017800, 113020500, 113020600]
const specific_socre = 2
const wait_for_bettween_two_requests = 300 
const wait_for_button = 10
const refreshrate = 2500 
const round_times = 1

var openPanel = (panel_class) => {
	panel_class.children[0].children[7].click();
};

async function selectSingleCourse(panel_class) { 
	openPanel(panel_class);
	Click_choose_button()
	var confirm_btn = document.getElementById('btn_confirm');
    while (confirm_btn == null) {
        Click_choose_button();
		confirm_btn = document.getElementById('btn_confirm');
	    await new Promise(r => setTimeout(r, wait_for_bettween_two_requests));
    }
	confirm_btn.click();
	await new Promise(r => setTimeout(r, wait_for_button));
	// wait the ok button
	var ok_button = document.getElementById('btn_ok');
	if (ok_button == null) {
		alert("succeed!")
	} else {
		ok_button.click();
	}
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
    var score = parseInt(classofcourse.children[1].textContent)
	courseNum = parseInt(course);
    if (score < specific_socre) {
        return false
    }
	if (course == null) { 
		return false 
	}
	if (nonMoocCoursesList.includes(courseNum)) {
		return false
	}
	return true 
}

function sequentialPromiseGenerator(args_list, asyncfunc) {
	// return a sequential execute promise
	return args_list.reduce(function(p, arg) {
		return p.then(() => asyncfunc(arg));
	}, Promise.resolve());
};

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

/*刷新课程列表*/
function RefreshClasses(){
    var but=document.getElementsByClassName('btn btn-primary btn-sm');
    but[0].click();
	console.log("refresh")
};

async function selectCourse() {
	for (var i = 0; i < round_times; i++) {
		var courses_panel = document.getElementsByClassName('panel panel-info');
		// The first panel is unuseful
		var courses_panel_array = Array.from(courses_panel).slice(1);
		var mooc_list = getMoocList(courses_panel_array);
		if (mooc_list.length == 0) { 
			RefreshClasses()
			await new Promise(r => setTimeout(r, wait_for_button)); 
			document.getElementById("more").children[0].children[0].click();
			continue;
		}	
		await sequentialPromiseGenerator(mooc_list, selectSingleCourse);
		RefreshClasses();
	}
};

setInterval(selectCourse, refreshrate)
