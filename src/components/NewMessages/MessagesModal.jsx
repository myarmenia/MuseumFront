import React from 'react';
import Modal from 'react-modal';

const customStyles = {
   content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      // border: '2px solid red',
      boxShadow: 'inset 0 0 0 1px #cea670',
      color: '#cea670',
   },
};
// Modal.setAppElement('#yourAppElement');

const MessagesModal = ({ modalIsOpen, setIsOpen }) => {
   let subtitle;
   function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#000';
   }
   function closeModal() {
      setIsOpen(false);
   }
   return (
      <Modal
         isOpen={modalIsOpen}
         onAfterOpen={afterOpenModal}
         onRequestClose={closeModal}
         style={customStyles}
         contentLabel="Example Modal">
         <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
         <button onClick={closeModal}>close</button>
         <div>I am a modal</div>
         <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
         </form>
      </Modal>
   );
};

export default MessagesModal;
