import * as React from 'react';

const defaultStyles = {
    modalBackground: {
        position: 'fixed' as 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '100%',
        background: 'rgba(0,0,0,0.7)'
    },
    modalContainer: {
        background: 'white',
        maxWidth: '500px',
        width: '100%',
        maxHeight: '500px',
        height: '100%',
        boxShadow: '0 0 0.5cm rgba(0,0,0,0.5)',
        position: 'fixed' as 'fixed',
        left: '50%',
        top: '50%',
        zIndex: 1000,

        transform: 'translateY(-50%) translateX(-50%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        padding: '30px'
    },
    modalContent: {
        width: '100%',
        height: '100%',
    },
    modalClose: {
        color: 'rgba(0,0,0,0.7)',
        cursor: 'pointer',
        position: 'absolute' as 'absolute',
        right: 0,
        top: 0,
        margin: '10px',
        fontSize: '1.5em'
    }
};

interface IModalProps {
    isModalOpen: boolean;
    containerStyles?: Object;
    contentStyles?: Object;
    handleCloseModal: () => void;
}

interface IModalState {
    containerStyles: Object;
    contentStyles: Object;
}

class Modal extends React.Component<IModalProps, IModalState> {
    constructor(props: any) {
        super(props);
        this.state = {
            containerStyles: defaultStyles.modalContainer,
            contentStyles: defaultStyles.modalContent
        };
    }
    render() {
        return (
            <div>
                {
                    this.props.isModalOpen ? 
                    <div>
                        <div style={defaultStyles.modalBackground} onClick={this.props.handleCloseModal} />
                        <div 
                            className="modal-container"
                            style={this.props.containerStyles ? {...this.state.containerStyles, ...this.props.containerStyles} : this.state.containerStyles}
                        >
                            <div style={this.props.contentStyles ? {...this.state.contentStyles, ...this.props.contentStyles} : this.state.contentStyles}>
                                <div className="modal-close-button" style={defaultStyles.modalClose}><i onClick={this.props.handleCloseModal} className="fa fa-close" /></div>
                                {this.props.children}
                            </div>
                        </div>
                    </div> : null
                }
                {/* <div style={defaultStyles.modalBackground} onClick={this.props.closeModal} />
                <div 
                    className="modal-container"
                    style={this.props.containerStyles ? {...this.state.containerStyles, ...this.props.containerStyles} : this.state.containerStyles}
                >
                    <div style={this.props.contentStyles ? {...this.state.contentStyles, ...this.props.contentStyles} : this.state.contentStyles}>
                        {this.props.children}
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Modal;