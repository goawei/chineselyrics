export const patcher1 = (songList: string, type: string) => {
    // switch (typeof JSON.parse(songList)[0]) {
    //     case 'object':
    //         let patchedSongList = JSON.parse(songList).map((val: any) => {
    //             console.log(val);
    //             return val.map((line: any) => {
    //                 return line.chinese;
    //             }).join('').trim();
    //         });
    //         localStorage.setItem(type, JSON.stringify(patchedSongList));
    //         return patchedSongList;
    //     default:
    //         return JSON.parse(songList);
    // }
    if (type === 'activeSong' && typeof JSON.parse(songList)[0] === 'object') {
        let patchedSongList = JSON.parse(songList).map((val: any) => {
            return val.map((line: any) => {
                return line.chinese;
            }).join('').trim();
        });
        localStorage.setItem(type, JSON.stringify(patchedSongList));
        return patchedSongList;
    }
    if (type === 'saveSongs' && typeof JSON.parse(songList)[0].lyrics[0] === 'object') {
        let patchedSongList = JSON.parse(songList).map((song: any) => {
            let patchedLyrics = song.lyrics.map((val: any) => {
                                    return typeof val === 'object' ? val.map((line: any) => {
                                        return line.chinese;
                                    }).join('').trim() : val;
                                });
            return { title: song.title, lyrics: patchedLyrics };
        });
        // let patchedSongList = JSON.parse(songList).map((val: any) => {
        //     return val.map((line: any) => {
        //         return line.chinese;
        //     }).join('').trim();
        // });
        localStorage.setItem(type, JSON.stringify(patchedSongList));
        return patchedSongList;
    }
    return JSON.parse(songList);
};