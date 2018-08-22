import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
const pinyin = require('pinyin');
import { clearSongInput } from 'src/actions/songInput';

// Components
import SongInput from './songInput';

interface IDisplayProps {
    songInput: string;
    clearSongInput: (input: string) => Dispatch<Object>;
}

interface IDisplayState {
    songArray: { chinese: string, pinyin: string }[][];
    activeRows: number[];
    displaySongInput: boolean;
}

class Display extends React.Component<IDisplayProps, IDisplayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            songArray: [],
            activeRows: [],

            displaySongInput: true
        };
    }
    handleSubmit = () => {
        if (this.props.songInput.length === 0) {
            return;
        }
        let songArray: { chinese: string, pinyin: string }[][] = [];
        this.props.songInput.split('\n').forEach((line) => {
            let newLine: { chinese: string, pinyin: string }[] = [];
            let rowArray = line.split('');
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
                    // let songArrayItem = {
                    //     chinese: ' ',
                    //     pinyin: ' '
                    // };
                    // newLine.push(songArrayItem);
                    let songArrayItem = { chinese: '', pinyin: '' };
                    if (tempEnglish === '') {
                        songArrayItem.chinese = ' ';
                        songArrayItem.pinyin = ' ';
                    } else {
                        songArrayItem.chinese = tempEnglish;
                        // songArrayItem.pinyin = tempEnglish;
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
        this.setState({ songArray });
        this.handleCloseModal();
    }
    handleRowClick = (index: number) => {
        this.setState({
            activeRows: this.state.activeRows.indexOf(index) < 0 ? this.state.activeRows.concat(index) : this.state.activeRows.filter((row) => row !== index)
        });
    }
    handleOpenModal = () => {
        this.setState({
            displaySongInput: true,
            songArray: [],
            activeRows: []
        });
    }
    handleCloseModal = () => {
        this.setState({ displaySongInput: false });
    }
    render() {
        return (
            <div className="display-container">
                {this.state.displaySongInput ? <SongInput handleSubmit={this.handleSubmit} /> : null}
                <div className="song-container">
                    {
                        this.state.displaySongInput ? null :
                            <div className="open-modal-button" onClick={this.handleOpenModal}>
                                <i className="fa fa-upload" />
                            </div>
                    }
                    {
                        this.state.songArray.map((row, index) => {
                            return (
                                <div
                                    className="song-row-container"
                                    key={index}
                                    onClick={() => { this.handleRowClick(index); }}
                                    style={{
                                        color: this.state.activeRows.indexOf(index) < 0 ? 'black' : '#32CD32',
                                        fontWeight: this.state.activeRows.indexOf(index) < 0 ? 'normal' : 700,
                                    }}
                                >
                                    <ul className="song-row">
                                        {
                                            row.map((word, index2) => {
                                                return (
                                                    <li className="song-word" key={index2}>
                                                        <div className="song-chinese">{word.chinese}</div>
                                                        <div className="song-pinyin">{word.pinyin}</div>
                                                    </li>
                                                );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                    <br /><br /><br />
                </div>
            </div>
        );
    }
}
function mapStateToProps(state: any) {
    return {
        songInput: state.songInputReducer
    };
}

function mapDispatchToProps(dispatch: Dispatch<Object>) {
    return bindActionCreators(
        {
            clearSongInput
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);