import * as React from 'react';
import { Dispatch, bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { updateSongInput, clearSongInput } from 'src/actions/songInput';
// Components

interface ISongInputProps {
    songInput: string;
    updateSongInput: (input: string) => Dispatch<Object>;
    clearSongInput: (input: string) => Dispatch<Object>;
    handleSubmit: () => null;
}

class SongInput extends React.Component<ISongInputProps, {}> {
    handleChangeSongInput = (e: any) => {
        this.props.updateSongInput(e.currentTarget.value);
    }
    render() {
        return (
            <div className="song-input-container">
                <div className="song-input-modal">
                    <button className="submit-button" onClick={this.props.handleSubmit}>Submit</button>
                    <button className="clear-button" onClick={() => this.props.clearSongInput('')}>Clear</button><br /><br />
                    <textarea className="song-input" onChange={this.handleChangeSongInput} value={this.props.songInput} placeholder="Copy and Paste Chinese here"/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        songInput: state.songInputReducer,
        handleSubmit: ownProps.handleSubmit
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