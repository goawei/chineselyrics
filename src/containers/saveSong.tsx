import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { saveSong, deleteSong } from 'src/actions/saveSong';

// Components
import Modal from 'src/components/modal';
import TextInput from 'src/components/input';

interface ISavedSong {
    title: string;
    lyrics: any;
}

interface ISaveSongProps {
    lyrics: any;
    savedSongs: ISavedSong[];
    saveSong: (savedSong: ISavedSong) => Dispatch<Object>;
    deleteSong: (savedSong: ISavedSong) => Dispatch<Object>;
    handleLoadSong: (savedSong: any) => void;
    handleSongInputModal: () => void;
}

interface ISaveSongState {
    openModal: boolean;
    inputValue: string;
    inputError: boolean;
}

class SaveSong extends React.Component<ISaveSongProps, ISaveSongState> {
    constructor(props: any) {
        super(props);
        this.state = {
            openModal: false,

            inputValue: '',
            inputError: false
        };
    }
    handleOpenModal = () => {
        this.setState({ openModal: true });
    }
    handleCloseModal = () => {
        this.setState({ openModal: false });
    }
    handleInputChange = (e: any) => {
        this.setState({ inputValue: e.currentTarget.value });
    }
    handleSubmitForm = (e: any) => {
        e.preventDefault();
        let currentSong = {
            title: this.state.inputValue,
            lyrics: this.props.lyrics
        };
        let existingSong = this.props.savedSongs.filter((song) => song.title === currentSong.title);
        if (existingSong.length > 0 || currentSong.lyrics.length === 0 || currentSong.title.length === 0) {
            this.setState({ inputError: true });
            return;
        }
        this.props.saveSong(currentSong);
        this.setState({ inputError: false });
        let saveLocalObject = this.props.savedSongs.concat(currentSong);
        localStorage.setItem('saveSongs', JSON.stringify(saveLocalObject));
    }
    handleDeleteSong = (title: string) => {
        let deleteObj = {
            title,
            lyrics: []
        };
        this.props.deleteSong(deleteObj);
        let deleteLocalObject = this.props.savedSongs.filter((song) => song.title !== deleteObj.title);
        localStorage.setItem('saveSongs', JSON.stringify(deleteLocalObject));
    }
    render() {
        return (
            <div>
                <div className="icon-button-list">
                    <div className="icon-button" onClick={this.props.handleSongInputModal}>
                        <i className="fa fa-upload" />
                    </div>
                    <div className="icon-button" onClick={this.handleOpenModal}>
                        <i className="fa fa-music" />
                    </div>
                </div>
                {/* <button onClick={this.handleOpenModal}>Song List</button> */}
                <Modal
                    isModalOpen={this.state.openModal}
                    handleCloseModal={this.handleCloseModal} 
                >
                    <br />
                    <TextInput 
                        handleInputChange={this.handleInputChange}
                        inputValue={this.state.inputValue}
                        handleSubmitForm={this.handleSubmitForm} 
                        inputError={this.state.inputError}
                    />
                    <ul className="saved-songs-container">
                        {
                            this.props.savedSongs.map((song, index) => {
                                return (
                                    <li className="saved-songs-row" key={index}>
                                        <div
                                            className="saved-song"
                                            onClick={() => {
                                                this.setState({ openModal: false });
                                                this.props.handleLoadSong(song.lyrics);
                                            }}
                                        >
                                            {song.title}
                                        </div>
                                        <div 
                                            style={{ width: '40px', cursor: 'pointer' }}
                                            className="center-content close-button"
                                            onClick={() => { 
                                                this.handleDeleteSong(song.title);
                                            }}
                                        >
                                            <i className="fa fa-times" />
                                        </div>
                                    </li>
                                ); 
                            })
                        }
                    </ul>
                </Modal>
            </div>
        );
    }
}

// export default (SaveSong);

function mapStateToProps(state: any, ownProps: any) {
    return {
        songInput: state.songInputReducer,
        savedSongs: state.savedSongReducer, 
        lyrics: ownProps.lyrics,
        handleLoadSong: ownProps.handleLoadSong,
        handleSongInputModal: ownProps.handleSongInputModal
    };
}

function mapDispatchToProps(dispatch: Dispatch<Object>) {
    return bindActionCreators(
        {
            saveSong,
            deleteSong
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveSong);