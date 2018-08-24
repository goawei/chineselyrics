import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSongInput, clearSongInput } from 'src/actions/songInput';
// Components
import Modal from 'src/components/modal';

interface ISongInputProps {
    songInput: string;
    openModal: boolean;
    updateSongInput: (input: string) => Dispatch<Object>;
    clearSongInput: (input: string) => Dispatch<Object>;
    handleSubmit: () => void;
    handleCloseModal: () => void;
}

class SongInput extends React.Component<ISongInputProps, {}> {
    handleChangeSongInput = (e: any) => {
        this.props.updateSongInput(e.currentTarget.value);
    }
    render() {
        return (
            // <div className="song-input-container">
            //     <div className="song-input-modal">
            //         <button className="submit-button" onClick={this.props.handleSubmit}>Submit</button>
            //         <button className="clear-button" onClick={() => this.props.clearSongInput('')}>Clear</button><br /><br />
            //         <textarea className="song-input" onChange={this.handleChangeSongInput} value={this.props.songInput} placeholder="Copy and Paste Chinese here"/>
            //     </div>
                <Modal
                    isModalOpen={this.props.openModal}
                    handleCloseModal={this.props.handleCloseModal} 
                >
                    <div className="song-input-modal-content">
                        <button className="submit-button" onClick={this.props.handleSubmit}>Submit</button>
                        <button className="clear-button" onClick={() => this.props.clearSongInput('')}>Clear</button><br /><br />
                        <textarea className="song-input" onChange={this.handleChangeSongInput} value={this.props.songInput} placeholder="Copy and Paste Chinese here"/>
                    </div>
                </Modal> 
            // </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        songInput: state.songInputReducer,
        handleSubmit: ownProps.handleSubmit,
        handleCloseModal: ownProps.handleCloseModal,
        openModal: ownProps.openModal
    };
}

function mapDispatchToProps(dispatch: Dispatch<Object>) {
    return bindActionCreators(
        {
            updateSongInput,
            clearSongInput
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(SongInput);