const pinyin = require('pinyin');

export default (song: string[]) => {
    let songArray: { chinese: string, pinyin: string }[][] = [];
    // console.log(song);
    song.forEach((line) => {
        let newLine: { chinese: string, pinyin: string }[] = [];
        let rowArray = line.trim().split('');
        let tempEnglish = '';
        for (var i = 0; i < rowArray.length; i++) {
            if (rowArray[i] !== pinyin(rowArray[i])[0][0]) {
                let songArrayItem = { chinese: '', pinyin: '' };
                if (tempEnglish === '') {
                    songArrayItem.chinese = rowArray[i];
                    songArrayItem.pinyin = pinyin(rowArray[i]);
                } else {
                    songArrayItem.chinese = tempEnglish;
                    songArrayItem.pinyin = tempEnglish;
                    i--;
                }
                newLine.push(songArrayItem);
                tempEnglish = '';
            } else if (rowArray[i] === ' ') {
                let songArrayItem = { chinese: '', pinyin: '' };
                if (tempEnglish === '') {
                    songArrayItem.chinese = ' ';
                    songArrayItem.pinyin = ' ';
                } else {
                    songArrayItem.chinese = tempEnglish;
                    songArrayItem.pinyin = ' ';
                    i--;
                }
                newLine.push(songArrayItem);
                tempEnglish = '';
            } else {
                tempEnglish += rowArray[i];
                if (i === rowArray.length - 1) {
                    let songArrayItem = {
                        chinese: tempEnglish,
                        pinyin: ' '
                    };
                    newLine.push(songArrayItem);
                    tempEnglish = '';
                }
            }
        }
        if (newLine.length > 0) {
            songArray.push(newLine);
        }
    });
    return songArray;
};