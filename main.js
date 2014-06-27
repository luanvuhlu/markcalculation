	var table = document.getElementById("tblStudentMark");
var trArr = table.getElementsByTagName("tr");
var tcSum = 0;
var markSum = 0;
var markSum4 = 0;
var mark = 0;
var tmp;
var mark4 = 0;
var firstMark = 0;
var firstMarkSum = 0;
var tc = 0;
var tbm = 0;
var tbm4 = 0;
var tbmFirst = 0;
var error = false;
var FCount=0;
var DCount = 0;
var DPlusCount = 0;
var CCount = 0;
var CPlusCount = 0;
var BCount = 0;
var BPlusCount = 0;
var ACount = 0;
var APlusCount = 0;
var FCount = 0;
var DTCCount = 0;
var DPlusTCCount = 0;
var CTCCount = 0;
var CPlusTCCount = 0;
var BTCCount = 0;
var BPlusTCCount = 0;
var ATCCount = 0;
var APlusTCCount = 0;
var FTCCount = 0;
var alphaMark;
var TCindex;
var markIndex;
var mark4Index;
var codeIndex = 1;
var STTindex = 0;
var nameIndex = 2;
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
        if (alphaMark == "D") {
            mark4 = 1;
            DTCCount += tc;
            DCount++
        } else if (alphaMark == "D+") {
            mark4 = 1.5;
            DPlusTCCount += tc;
            DPlusCount++
        } else if (alphaMark == "C") {
            mark4 = 2;
            CTCCount += tc;
            CCount++
        } else if (alphaMark == "C+") {
            mark4 = 2.5;
            CPlusTCCount += tc;
            CPlusCount++
        } else if (alphaMark == "B") {
            mark4 = 3;
            BTCCount += tc;
            BCount++
        } else if (alphaMark == "B+") {
            mark4 = 3.5;
            BPlusTCCount += tc;
            BPlusCount++
        } else if (alphaMark == "A") {
            mark4 = 3.7;
            ATCCount += tc;
            ACount++
        } else if (alphaMark == "A+") {
            mark4 = 4;
            APlusTCCount += tc;
            APlusCount++
        } else {
            mark4 = 0;
            FTCCount += tc;
            FCount++
        }
        tcSum += tc;
        markSum += mark * tc;
        markSum4 += mark4 * tc;
        firstMarkSum += firstMark * tc;
        if (isNaN(tcSum) || isNaN(markSum)) {
            alert("Rất xin lỗi bạn. Đã có lỗi tại môn thứ " + tdArr[STTindex].innerHTML + ": " + tdArr[nameIndex].innerHTML + ".\n" + "Vui lòng liên hệ để giải quyết. Xin cảm ơn !");
            error = true;
            break
        }
    } catch (err) {
        alert("Rất xin lỗi bạn. Đã có lỗi xảy ra.\n" + "Vui lòng liên hệ để giải quyết. Xin cảm ơn !");
        error = true
    }
}
if (!error) {
    tbm = (markSum / tcSum).toFixed(2);
    tbm4 = (markSum4 / tcSum).toFixed(2);
    tbmFirst = (firstMarkSum / tcSum).toFixed(2);
    msg = "Bạn đã học " + tcSum + " TC.\n" + "Bạn có ";
    if (FCount > 0) {
        msg += FCount + " điểm F (" + FTCCount + " tín chỉ), "
    }
    if (DCount > 0) {
        msg += DCount + " điểm D (" + DTCCount + " tín chỉ), "
    }
    if (DPlusCount > 0) {
        msg += DPlusCount + " điểm D+ (" + DPlusTCCount + " tín chỉ), "
    }
    if (CCount > 0) {
        msg += CCount + " điểm C (" + CTCCount + " tín chỉ),\n"
    }
    if (CPlusCount > 0) {
        msg += CPlusCount + " điểm C+ (" + CPlusTCCount + " tín chỉ), "
    }
    if (BCount > 0) {
        msg += BCount + " điểm B (" + BTCCount + " tín chỉ), "
    }
    if (BPlusCount > 0) {
        msg += BPlusCount + " điểm B+ (" + BPlusTCCount + " tín chỉ),\n"
    }
    if (ACount > 0) {
        msg += ACount + " điểm A (" + ATCCount + " tín chỉ), "
    }
    if (APlusCount > 0) {
        msg += APlusCount + " điểm A+ (" + APlusTCCount + " tín chỉ)"
    }
    msg += "\n";
    msg += "\n";
    msg += "Tổng số điểm hệ số 10: " + markSum + " điểm.\n" + "Tổng số điểm hệ số 4: " + markSum4 + " điểm.\n" + "Điểm trung bình theo hệ số 10: " + tbm + ".\n" + "Điểm trung bình theo hệ số 4: " + tbm4 + ".\n";
    if (tbm != tbmFirst) {
        msg += "\nĐiểm trung bình theo hệ số 10 lần 1: " + tbmFirst + "."
    };
    alert(msg);
}
