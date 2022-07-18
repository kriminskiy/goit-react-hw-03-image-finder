import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './components/Searchbar/Searchbar';
import searchbarAPI from './components/services/searchbarApi';
import SearchbarError from './components/Searchbar/SearchbarError';
import Loader from './components/Loader/Loader';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';

export default class App extends Component {
  state = {
    images: [],
    searchName: '',
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchName !== this.state.searchName) {
      this.setState({ images: [] });
      this.feachCartImg(this.state.searchName, this.state.page);
    }
  }

  feachCartImg = () => {
    const { searchName, page } = this.state;
    searchbarAPI
      .fetchSearchbar(searchName, page)
      .then(name => {
        this.setState(prevState => ({
          images: [...prevState.images, ...name.hits],
          status: 'resolved',
          page: prevState.page + 1,
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  handleLoadMore = () => {
    this.feachCartImg();
  };

  handleFormSubmit = searchName => {
    this.setState({ searchName, page: 1 });
  };

  render() {
    const { status, images, error } = this.state;
    return (
      <div style={{ maxWidth: 1170, margin: '0 auto', padding: 20 }}>
        <Searchbar onSubmir={this.handleFormSubmit} />
        <ToastContainer autoClose={3000} />
        {status === 'idle' && (
          <div
            style={{
              textAlign: 'center',
              color: '#3f51b5',
              margin: '0 auto',
              padding: 20,
            }}
          >
            Введите имя для поиска
          </div>
        )}
        {status === 'pending' && <Loader />}
        {status === 'rejected' && <SearchbarError message={error.message} />}
        {status === 'resolved' && (
          <div>
            <ImageGallery names={images} />
            <Button onClickBtn={this.handleLoadMore} />
          </div>
        )}
      </div>
    );
  }
}
