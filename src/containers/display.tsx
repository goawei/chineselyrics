import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// const pinyin = require('pinyin');
import { clearSongInput } from 'src/actions/songInput';
import { loadSongs } from 'src/actions/saveSong';
import { togglePinyin } from 'src/actions/settings';
const defaultSongs = require('../model/defaultSongs.json');
import { patcher1 } from 'src/helpers/patcher';
import parseSong from 'src/helpers/songParser';

// Components
import SongInput from './songInput';
import SaveSong from './saveSong';

interface IDisplayProps {
    pinyin: boolean;
    songInput: string;
    clearSongInput: (input: string) => Dispatch<object>;
    loadSongs: (input: any) => Dispatch<object>;
    togglePinyin: () => Dispatch<object>;
}

interface IDisplayState {
    activeSong: string[];
    songArray: { chinese: string, pinyin: string }[][];
    activeRows: number[];
    displaySongInput: boolean;
}

class Display extends React.Component<IDisplayProps, IDisplayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            activeSong: [],
            songArray: [],
            activeRows: [],

            displaySongInput: true,
        };
    }
    componentDidMount() {
        let savedSongs: any = localStorage.getItem('saveSongs');
        let activeSong: any = localStorage.getItem('activeSong');
        if (activeSong) {
            const patchedSong = patcher1(activeSong, 'activeSong');
            const parsedSong = parseSong(patchedSong);
            this.setState({ 
                activeSong: patchedSong,
                songArray: parsedSong,
                displaySongInput: false
            });
        }
        if (savedSongs && JSON.parse(savedSongs).length > 0) {
            const patchedSong = patcher1(savedSongs, 'saveSongs');
            this.props.loadSongs(patchedSong);
        } else {
            this.props.loadSongs(defaultSongs);
        }
    }
    handleSubmit = () => {
        if (this.props.songInput.length === 0) {
            return;
        }
        let activeSong = this.props.songInput.split('\n');
        let songArray = parseSong(this.props.songInput.split('\n'));

        this.setState({ activeSong, songArray });
        localStorage.setItem('activeSong', JSON.stringify(activeSong));
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
            // songArray: [],
            // activeRows: []
        });
    }
    handleCloseModal = () => {
        this.setState({ displaySongInput: false });
    }
    handleLoadSong = (unparsedSongArray: any) => {
        let songArray = parseSong(unparsedSongArray);
        this.setState({ songArray });
        localStorage.setItem('activeSong', JSON.stringify(unparsedSongArray));
    }
    handleScrollTop = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    render() {
        return (
            <div className="display-container">
                <div className="fixed-button-group">
                    <div className="icon-button scroll-top-button" onClick={this.props.togglePinyin}>
                        <i className={`fa fa-${this.props.pinyin ? 'comments' : 'comment'}`} />
                    </div>
                    <div className="icon-button scroll-top-button" onClick={this.handleScrollTop}>
                        <i className="fa fa-arrow-up" />
                    </div>
                </div>
                <SaveSong lyrics={this.state.activeSong} handleLoadSong={this.handleLoadSong} handleSongInputModal={this.handleOpenModal} />
                {/* {this.state.displaySongInput ? <SongInput handleSubmit={this.handleSubmit} handleCloseModal={this.handleCloseModal} /> : null} */}
                <SongInput handleSubmit={this.handleSubmit} handleCloseModal={this.handleCloseModal} openModal={this.state.displaySongInput} />
                <div className="song-container">
                    {/* <div className="icon-button-list">
                        <div className="icon-button" onClick={this.handleOpenModal}>
                            <i className="fa fa-upload" />
                        </div>
                        <div className="icon-button" onClick={this.handleOpenModal}>
                            <i className="fa fa-music" />
                        </div>
                    </div> */}
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
                                                        {this.props.pinyin ? <div className="song-pinyin">{word.pinyin}</div> : null}
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
        songInput: state.songInputReducer,
        pinyin: state.pinyinReducer
    };
}

function mapDispatchToProps(dispatch: Dispatch<Object>) {
    return bindActionCreators(
        {
            clearSongInput,
            loadSongs,
            togglePinyin
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Display);