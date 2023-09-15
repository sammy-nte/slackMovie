const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNGU2NWJhNDViMWYyMTg5ODBjMmE3YTcxNDNmMGUwMSIsInN1YiI6IjY0ZmU2OWM4ZGI0ZWQ2MTAzODU0ZjljYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2L8tBFvYGuT_7MLmv2tOANRpfUM7vbsPXECPy-oeo7I"
  }
};

export async function getTopMovies() {
  const url = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
  const res = await fetch(url, options);
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
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const res = await fetch(url, options);
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
  const url = `https://api.themoviedb.org/3/search/movie?&query=${encodeURIComponent(
    search
  )}`;

  const res = await fetch(url, options);
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
  const url = `https://api.themoviedb.org/3/movie/${id}`
  const res = await fetch(url, options)
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
