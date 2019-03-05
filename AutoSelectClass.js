function open_block(){
    var course_block=document.getElementsByClassName('panel panel-info');
for (j=1;j<=course_block.length-1;j++){
    course_block[j].children[0].children[7].click();
};
};

function click_but(){
    var course_block=document.getElementsByClassName('body_tr');
for (k=0;k<course_block.length;k++){
    if(course_block[k].getElementsByClassName('jsxm')[0].textContent==='¶ûÑÅ'){
        if (course_block[k].children[21].children[0].textContent==='Ñ¡¿Î'){
            course_block[k].children[21].children[0].click();
        };
    };
};
};

function ref(){
    var but=document.getElementsByClassName('btn btn-primary btn-sm');
    but[0].click();
};

function implement(){
    open_block();
    setTimeout(click_but,0.5);
    setTimeout(ref,2);
};

setInterval(implement,500);