import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import MovieListItem from '../components/MovieListItem';
import { Movie } from '../utils/tmdb';

describe('MovieListItem', () => {
  const movie: Movie = {
    id: 1,
    title: 'Inception',
    poster_path: '/inception.jpg',
    release_date: '2010-07-16',
    vote_average: 8.8,
    overview: 'A thief who steals corporate secrets through the use of dream-sharing technology.'
  };

  it('renders movie details correctly', () => {
    const { getByText } = render(
      <MovieListItem movie={movie} onPress={jest.fn()} />
    );
    expect(getByText('Inception')).toBeTruthy();
    expect(getByText('Release: 2010-07-16')).toBeTruthy();
    expect(getByText('Rating: 8.8')).toBeTruthy();
    expect(getByText('A thief who steals corporate secrets through the use of dream-sharing technology.')).toBeTruthy();
  });

  it('calls onPress with movie when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <MovieListItem movie={movie} onPress={onPressMock} />
    );
    fireEvent.press(getByTestId('movie-list-item'));
    expect(onPressMock).toHaveBeenCalledWith(movie);
  });
}); 