const apiKey = 'd4e65ba45b1f218980c2a7a7143f0e01'; 

export async function getTopMovies() {
  const url = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch top movies",
      statusText: res.statusText,
      status: res.status
    };
  }
  const data = await res.json();
  return data.results;
}

export async function getSliderMovies() {
  const url =
    `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch movie slides",
      statusText: res.statusText,
      status: res.status
    };
  }
  const data = await res.json();
  return data.results;
}

export async function getSearchedMovies( search) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(
    search
  )}`;

  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch movie slides",
      statusText: res.statusText,
      status: res.status
    };
  }
  const data = await res.json()
  return data.results
}

export async function getMovieById(id){
  const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`
  const res = await fetch(url)
  if(!res.ok){
    throw{
      message: "Failed to fetch movies",
      statusText: res.statusText,
      status: res.status
    }
  }
  const data = await res.json()
  return data
}
