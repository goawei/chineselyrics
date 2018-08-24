import * as React from 'react';

const defaultStyles = {
    modalContainer: {
        width: '100%',
        height: '100%',
        position: 'fixed' as 'fixed',
        zIndex: 1,
        top: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'rgba(0,0,0,0.7)'
    },
    modalContent: {
        background: 'white',
        padding: '20px',
        width: '500px',
        height: '400px',
        boxShadow: '0 0 0.5cm rgba(0,0,0,0.5)',
        // textAlign: 'center',
    },
    modalClose: {
        cursor: 'pointer',
        float: 'right' as 'right'
    }
};

interface IModalProps {
    containerStyles?: Object;
    contentStyles?: Object;
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
            <div 
                className="modal-container"
                style={this.props.containerStyles ? {...this.state.containerStyles, ...this.props.containerStyles} : this.state.containerStyles}
                // style={this.state.containerStyles}
                // onClick={() => { console.log('test'); }}
            >
                <div 
                    className="modal"
                    style={this.props.contentStyles ? {...this.state.contentStyles, ...this.props.contentStyles} : this.state.contentStyles}
                    // style={this.state.contentStyles}
                >
                    <div className="modal-close-button" style={defaultStyles.modalClose}><i onClick={() => { console.log('test'); }} className="fa fa-close" /></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Modal;