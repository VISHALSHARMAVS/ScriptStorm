import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Post() {
  const { currentUser } = useSelector((state) => state.user);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/v1/post/getposts?userId=${currentUser._id}`);
        const data = res.data;

        if (data && data.posts) {
          setUserPosts(data.posts);
        } else {
          console.error('Failed to fetch posts:', data.message);
        }
      } catch (error) {
        console.error('Error fetching posts:', error.message);
      }
    };

    fetchPosts();
  }, [currentUser._id]);

  return (
    <div className='p-4 overflow-x-auto md:mx-auto scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
      {userPosts.length > 0 ? (
        <table className='min-w-full divide-y divide-gray-200 dark:divide-gray-700'>
          <thead className='bg-gray-200 dark:bg-gray-800'>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Date updated
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Post image
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Post title
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Category
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Delete
              </th>
              <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider'>
                Edit
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700'>
            {userPosts.map((post, index) => (
              <tr key={post._id} className={`hover:bg-gray-100 dark:hover:bg-gray-700 ${index % 2 === 0 ? 'bg-gray-50 dark:bg-gray-900' : ''}`}>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white'>
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link to={`/post/${post.slug}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className='w-24 h-12 object-cover rounded-md shadow-md'
                    />
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap'>
                  <Link
                    className='text-teal-600 dark:text-teal-400 hover:underline'
                    to={`/post/${post.slug}`}
                  >
                    {post.title}
                  </Link>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400'>
                  {post.category}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-red-500 dark:text-red-400'>
                  <span className='cursor-pointer hover:underline'>Delete</span>
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-teal-600 dark:text-teal-400'>
                  <Link
                    className='hover:underline'
                    to={`/update-post/${post._id}`}
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className='text-center text-gray-500 dark:text-gray-400'>You have no posts yet!</p>
      )}
    </div>
  );
}
