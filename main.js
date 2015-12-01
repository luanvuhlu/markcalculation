chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

chrome.runtime.onMessage.addListener(function(msg, sender, response) {
    if ((msg.from === 'popup') && (msg.subject === 'DOMInfo')) {
        var domInfo=catchSite();
        response(domInfo);
    }
});	
function isProcessPage(){
	return new RegExp('^.+coursebyfieldtree\.aspx$').test(document.URL.toLowerCase());
}
function isMarkPage(){
	return new RegExp('^.+studentmark\.aspx$').test(document.URL.toLowerCase());
}
function catchSite(){
	if(isProcessPage()){
		try{
			return checkProcess();
		}catch (e) {
			console.log(e);
		}
		return undefined;
	}
	if(isMarkPage()){
		try{
			return getInfo();
		}catch (e) {
			console.log(e);
		}
		return undefined;
	}
	
	return undefined;
}
function checkProcess(){
	var mainTable = document.getElementById('grdField');
	if(mainTable === undefined){
		return {typeInfo : 1, msg:[]};
	}
	var msg = [],
	tmpMsg="",
	tcSum = 0, 
	parts = [],
	trTags = mainTable.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
	msg.push("<b>Thông báo từ extension:</b>");
	for(var i = 1, j=0; i<trTags.length; i++, j++){
		try{
			parts[j] = parseInt(trTags[i].getElementsByTagName('td')[6]
			.getElementsByTagName('font')[0]
			.getElementsByTagName('span')[0].innerHTML);
			tcSum += parts[j];
		}catch (e) {
			console.log(e);
			return;
		}
	}
	msg=testComplexPart(parts, msg);
	if(msg.length === 0 && (tmpMsg = testTotalTC(tcSum)) != ""){
		msg.push(tmpMsg);
	}
	if(msg.length === 0){
		msg.push("Mọi thứ trông có vẻ <b>OK</b>");
	}
//	msg.push("<b>*Mọi thông tin ở trên đều chỉ mang tính tham khảo.</b>");
	return {typeInfo : 1, msg:msg};
}
function testTotalTC(tcSum){
	return tcSum < 120 ? "Bạn chưa học đủ 120 tín chỉ. Bạn nên xem lại và học bổ sung các phần. Nếu có một số môn bạn chưa có điểm thì nên kiểm tra lại, cái đó phải tự làm thôi":"";
}
function testComplexPart(parts, msg){
	var part14=parts[1]+parts[4], part014=parts[0]+parts[1]+parts[4];
	// Phần 1 > 60
	msg.push("Phần 1. Khối Giáo dục chuyên nghiệp phần bắt buộc:"+(parts[0] < 60 ? " Yêu cầu tối thiểu 60 tín chỉ, bạn còn thiếu <b>"+(60 - parts[0])+"</b> tín chỉ" : " <b>OK</b>"));
	msg.push("Phần 3. Khối Giáo dục đại cương phần bắt buộc:"+(parts[2] < 19 ? " Yêu cầu tối thiểu 19 tín chỉ, bạn còn thiếu <b>"+(19 - parts[2])+"</b> tín chỉ" : " <b>OK</b>"));
	msg.push("Phần 4. Khối Giáo dục đại cương phần tự chọn:"+(parts[3] < 5 ? " Yêu cầu tối thiểu 5 tín chỉ, bạn còn thiếu <b>"+(5 - parts[3])+"</b> tín chỉ" : " <b>OK</b>"));
	msg.push("Phần 2 + Phần 5. Khối giáo dục chuyên nghiệp tự chọn: "+(part14 < 25 ? "Yêu cầu tối thiểu 25, bạn còn thiếu <b>"+(25-part14)+"</b> tín chỉ" : " <b>OK</b>"));
	if(part014 < 95){
		msg.push("Nếu bạn <b>không viết khóa luận</b>, khối giáo dục chuyên nghiệp cần tối thiểu 95 tín chỉ, bạn còn thiếu <b>"+(95 - part014)+"</b> tín chỉ");
	}
	return msg;
}
function getInfo(){
	var table = document.getElementById("tblStudentMark");
	var trArr = table.getElementsByTagName("tr");
	var tcSum = 0;
	markSum = 0;
	markSum4 = 0;
	firstMarkSum = 0;
	subjectSum = 0;
	var tmp;
	var mark = 0;
	mark4 = 0;
	firstMark = 0;
	var tc = 0;
	tbm = 0;
	tbm4 = 0;
	tbmFirst = 0;
	var error = false;
	var errorMsg = "";
	var FCount = 0;
	DCount = 0;
	DPlusCount = 0;
	CCount = 0;
	CPlusCount = 0;
	BCount = 0;
	BPlusCount = 0;
	ACount = 0;
	APlusCount = 0;
	var DTCCount = 0;
	DPlusTCCount = 0;
	CTCCount = 0;
	CPlusTCCount = 0;
	BTCCount = 0;
	BPlusTCCount = 0;
	ATCCount = 0;
	APlusTCCount = 0;
	FTCCount = 0;
	var alphaMark;
	var TCindex;
	var markIndex;
	var mark4Index;
	var codeIndex = 1;
	STTindex = 0;
	nameIndex = 2;
	var errorSubjects = [];
	var tdFirst = trArr[0].getElementsByTagName("td");

	for (var i = 0; i < tdFirst.length; i++) {
		tmp = tdFirst[i].innerHTML;
		if (tmp == "Số TC") {
			TCindex = i
		} else if (tmp == "TKHP") {
			markIndex = i
		} else if (tmp == "Điểm chữ") {
			mark4Index = i
		}
	}
	for (var i = 1; i < trArr.length - 1; i++) {
		var tdArr = trArr[i].getElementsByTagName("td");
		try {
			tmp = tdArr[TCindex].innerHTML;
			tc = Number(tmp);
			tmp = tdArr[markIndex].innerHTML;
			firstMark = parseFloat(tmp).toFixed(2);
			if (tmp.indexOf("|") > 0) {
				tmp = tmp.substring(tmp.indexOf("|") + 1)
			}
			mark = parseFloat(tmp).toFixed(2);
			tmp = tdArr[mark4Index].innerHTML;
			if (tmp.indexOf("|") > 0) {
				tmp = tmp.substring(tmp.indexOf("|") + 1)
			}
			alphaMark = tmp;
			if (alphaMark == "D" || (mark >= 4 && mark < 5)) {
				mark4 = 1;
				DTCCount += tc;
				DCount++
			} else if (alphaMark == "D+" || (mark >= 5 && mark < 5.5)) {
				mark4 = 1.5;
				DPlusTCCount += tc;
				DPlusCount++
			} else if (alphaMark == "C" || (mark >= 5.5 && mark < 6.5)) {
				mark4 = 2;
				CTCCount += tc;
				CCount++
			} else if (alphaMark == "C+" || (mark >= 6.5 && mark < 7)) {
				mark4 = 2.5;
				CPlusTCCount += tc;
				CPlusCount++
			} else if (alphaMark == "B" || (mark >= 7 && mark < 8)) {
				mark4 = 3;
				BTCCount += tc;
				BCount++
			} else if (alphaMark == "B+" || (mark >= 8 && mark < 8.5)) {
				mark4 = 3.5;
				BPlusTCCount += tc;
				BPlusCount++
			} else if (alphaMark == "A" || (mark >= 8.5 && mark < 9)) {
				mark4 = 3.7;
				ATCCount += tc;
				ACount++
			} else if (alphaMark == "A+" || mark >= 9) {
				mark4 = 4;
				APlusTCCount += tc;
				APlusCount++
			} else if (alphaMark == "F" || mark < 4) {
				mark4 = 0;
				FTCCount += tc;
				FCount++
			}
			if (isNaN(tc) || isNaN(mark) || isNaN(mark4) || isNaN(firstMark)) {
				errorSubjects[errorSubjects.length] = tdArr[nameIndex].innerHTML;
				continue;
			}
			tcSum += tc;
			markSum += mark * tc;
			markSum4 += mark4 * tc;
			firstMarkSum += firstMark * tc;
			subjectSum++;

		} catch (err) {
			errorMsg = "Rất xin lỗi bạn. Đã có lỗi xảy ra. Vui lòng liên hệ để giải quyết. Xin cảm ơn !";
			error = true;
		}
	}
	if (!error) {
		tbm = (markSum / tcSum).toFixed(2);
		tbm4 = (markSum4 / tcSum).toFixed(2);
		tbmFirst = (firstMarkSum / tcSum).toFixed(2);

		return {
			typeInfo : 0,
			tcSum : tcSum,
			subjectSum : subjectSum,
			FCount : FCount,
			FTCCount : FTCCount,
			DCount : DCount,
			DTCCount : DTCCount,
			DPlusCount : DPlusCount,
			DPlusTCCount : DPlusTCCount,
			CPlusCount : CPlusCount,
			CPlusTCCount : CPlusTCCount,
			CCount : CCount,
			CTCCount : CTCCount,
			BPlusCount : BPlusCount,
			BPlusTCCount : BPlusTCCount,
			BCount : BCount,
			BTCCount : BTCCount,
			APlusCount : APlusCount,
			APlusTCCount : APlusTCCount,
			ACount : ACount,
			ATCCount : ATCCount,
			markSum : markSum,
			markSum4 : markSum4,
			tbm : tbm,
			tbm4 : tbm4,
			tbmFirst : tbmFirst,
			errorSubjects : errorSubjects,
			error : ''
		};
	}
	return {
		error : errorMsg
	};
}



