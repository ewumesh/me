// 'use client'

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { debounce } from 'lodash';

// export default function WatchThis() {
//     const [movies, setMovies] = useState([]);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [currentPage, setCurrentPage] = useState(1);
//     const [history, setHistory] = useState(null);

//     const debouncedSearch = debounce((term:any) => {
//         if (term !== history) {
//             setHistory(term);
//           const fetchMovies = async () => {
//             try {
//               const response = await axios.get(`http://www.omdbapi.com/?s=${term}&apikey=6f384c84&page=${currentPage}`);
//               setMovies(response.data.Search);
//             } catch (error) {
//               console.error('Failed to fetch movies:', error);
//             }
//           };
    
//           fetchMovies();
//         }
//      }, 500); // Delay of 500ms
    
//      useEffect(() => {
//         debouncedSearch(searchTerm);
//      }, [searchTerm, currentPage, debouncedSearch]);
        



//  return (
//     <div className="max-w-md mx-auto mt-20 pt-20">
//       <input
//         type="text"
//         placeholder="Search for a movie"
//         value={searchTerm}
//         onChange={(e) => setSearchTerm(e.target.value)}
//         className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
//       />
//       <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
//       {movies && Array.isArray(movies) ? movies.map((movie:any) => (
//           <div key={movie.imdbID} className="rounded overflow-hidden shadow-lg">
//             <img className="w-full" src={movie.Poster} alt={`${movie.Title} Poster`} />
//             <div className="px-6 py-4">
//               <div className="font-bold text-xl text-white mb-2">{movie.Title}</div>
//               <p className="text-white text-base">{movie.Year}</p>
//             </div>
//           </div>
//         )): (
//             <li className="text-white">Loading...</li>
//         )}
//       </div>
//       <div className="flex justify-center mt-4">
//         <button
//           onClick={() => setCurrentPage(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => setCurrentPage(currentPage + 1)}
//           className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//  )
// }

'use client'

import axios from "axios";
import { useEffect, useState } from "react";
import { debounce } from 'lodash';

export default function WatchThis() {
    const [movies, setMovies] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [history, setHistory] = useState(null);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const debouncedSearch = debounce((term:any) => {
        if (term !== history) {
            setHistory(term);
            const fetchMovies = async () => {
                try {
                    const response = await axios.get(`http://www.omdbapi.com/?s=${term}&apikey=6f384c84&page=${currentPage}`);
                    setMovies(response.data.Search);
                } catch (error) {
                    console.error('Failed to fetch movies:', error);
                }
            };

            fetchMovies();
        }
    }, 500); // Delay of 500ms

    const fetchRecommendations = async (movieId: string) => {
        try {
            const response = await axios.get(`http://www.example.com/api/recommendations?movieId=${movieId}&apikey=YOUR_API_KEY`);
            setRecommendations(response.data.recommendations);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        }
    };

    useEffect(() => {
        debouncedSearch(searchTerm);
    }, [searchTerm, currentPage, debouncedSearch]);

    useEffect(() => {
        if (selectedMovieId) {
            fetchRecommendations(selectedMovieId);
        }
    }, [selectedMovieId]);

    return (
        <div className="max-w-md mx-auto mt-20 pt-20">
            <input
                type="text"
                placeholder="Search for a movie"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
            />
            <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                {movies && Array.isArray(movies) ? movies.map((movie:any) => (
                    <div key={movie.imdbID} className="rounded overflow-hidden shadow-lg" onClick={() => setSelectedMovieId(movie.imdbID)}>
                        <img className="w-full" src={movie.Poster} alt={`${movie.Title} Poster`} />
                        <div className="px-6 py-4">
                            <div className="font-bold text-xl text-white mb-2">{movie.Title}</div>
                            <p className="text-white text-base">{movie.Year}</p>
                        </div>
                    </div>
                )): (
                    <li className="text-white">Loading...</li>
                )}
            </div>
            <div className="flex justify-center mt-4">
                <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Next
                </button>
            </div>
            {recommendations && recommendations.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold mb-4">Recommendations</h2>
                    <div className="grid grid-cols-1 gap-4 mt-4 md:grid-cols-2 lg:grid-cols-3">
                        {recommendations.map((recommendation:any) => (
                            <div key={recommendation.imdbID} className="rounded overflow-hidden shadow-lg">
                                <img className="w-full" src={recommendation.Poster} alt={`${recommendation.Title} Poster`} />
                                <div className="px-6 py-4">
                                    <div className="font-bold text-xl text-white mb-2">{recommendation.Title}</div>
                                    <p className="text-white text-base">{recommendation.Year}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

