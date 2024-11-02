// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const useAxios = ({ url, method = 'GET', body = null, headers = null }) => {
//   const [response, setResponse] = useState(null);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await axios({
//           url,
//           method,
//           headers,
//           data: body,
//         });
//         setResponse(result.data);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, [url, method, body, headers]);

//   return { response, error, loading };
// };

// export default useAxios;
