import React, { Component } from 'react';
import s from './ImageGallery.module.css';
import Modal from '../Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };
  render() {
    const { largeImageURL, tags, webformatURL } = this.props;
    return (
      <li className={s.ImageGalleryItem} onClick={this.toggleModal}>
        <img className={s.imgCart} src={largeImageURL} alt={tags} />
        {this.state.showModal && (
          <Modal onClose={this.toggleModal}>
            <img className={s.ModalIMG} src={webformatURL} alt={tags}></img>
          </Modal>
        )}
      </li>
    );
  }
}
