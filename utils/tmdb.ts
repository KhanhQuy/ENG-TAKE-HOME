const API_KEY = "6a54b77d0396ad5ff593366372c192ec";
const BASE_URL = "https://api.themoviedb.org/3";

export type Movie = {
  id: number;
  title: string;
  poster_path?: string;
  [key: string]: any;
};

export async function searchMovies(query: string): Promise<Movie[]> {
  if (!query) return [];
  const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to fetch movies');
  }
  const data = await response.json();
  return data.results || [];
}
