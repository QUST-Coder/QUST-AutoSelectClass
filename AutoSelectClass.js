/*打开课程panel*/
function Open_panel(){
    var course_block=document.getElementsByClassName('panel panel-info');
for (j=1;j<=course_block.length-1;j++){
    course_block[j].children[0].children[7].click();
};
};

/*点击选课按钮*/
function Click_button(){
    var course_block=document.getElementsByClassName('body_tr');
for (k=0;k<course_block.length;k++){
    if(course_block[k].getElementsByClassName('jsxm')[0].textContent==='尔雅'||
       course_block[k].getElementsByClassName('jsxm')[0].textContent==='卓越'){
        if (course_block[k].children[21].children[0].textContent==='选课'){
            course_block[k].children[21].children[0].click();
        };
    };
};
};

/*刷新课程列表*/
function RefreshClasses(){
    var but=document.getElementsByClassName('btn btn-primary btn-sm');
    but[0].click();
};

/*入口在这*/
function StartSelecting(){
    Open_panel();
    setTimeout(Click_button,0.25);
    setTimeout(RefreshClasses,2);
};


setInterval(StartSelecting,500);
