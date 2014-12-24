function setDOMInfo(info) {
    if(typeof info == 'undefined'){
        document.getElementById('result').style.display='none';
        return;
    }
    document.getElementById('info-detail').style.display='none';
    setElement('APlusTC', info.APlusTCCount);
    setElement('ATC', info.ATCCount);
    setElement('APlusM', info.APlusCount);
    setElement('AM', info.ACount);

    setElement('BPlusTC', info.BPlusTCCount);
    setElement('BTC', info.BTCCount);
    setElement('BPlusM', info.BPlusCount);
    setElement('BM', info.BCount);

    setElement('CPlusTC', info.CPlusTCCount);
    setElement('CTC', info.CTCCount);
    setElement('CPlusM', info.CPlusCount);
    setElement('CM', info.CCount);

    setElement('DPlusTC', info.DPlusTCCount);
    setElement('DTC', info.DTCCount);
    setElement('DPlusM', info.DPlusCount);
    setElement('DM', info.DCount);

    setElement('FTC', info.FTCCount);
    setElement('FM', info.FCount);

    setElement('SubjectSum', info.subjectSum);
    setElement('TCSum', info.tcSum);

    setElement('markSum', info.markSum);
    setElement('mark4Sum', info.markSum4);
    setElement('tbmSum', info.tbm);
    setElement('tbmFirst', info.tbmFirst);
    setElement('tbm4Sum', info.tbm4);

    if(info.error !=''){
        setElement('msgErr', info.error);
        return;
    }
    if(info.errorSubjects.length > 0 ){
        var subjs='<ol>';
        for(var i=0; i<info.errorSubjects.length; i++){
            subjs+='<li>'+info.errorSubjects[i]+'</li>';
        }
        subjs+='</ol>';
        setElement('msgInfo', '<p>Các môn sau chưa có điểm hoặc gặp lỗi nào đó nên chưa được tính, mong bạn thông cảm:</p>'+subjs);
    }

}   
function setElement(id, value){
    if(value==0){
        value='';
    }
    document.getElementById(id).innerHTML=value;
}

window.addEventListener('DOMContentLoaded', function() {
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, function(tabs) {
        chrome.tabs.sendMessage(
                tabs[0].id,
                {from: 'popup', subject: 'DOMInfo'},
                setDOMInfo);
    });
});