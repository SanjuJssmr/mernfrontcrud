import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../Api/api";
import { AiOutlinePlus } from 'react-icons/ai'

import moment from 'moment'

const Posts = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isError, setIsError] = useState("");

  const fetchPosts = async () => {
    try {
      const res = await API.get('/users');
      console.log(res.data);
      setPosts(res.data);
    } catch (error) {
      setIsError(error.message);
    }
   
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (post) => {
    setPosts(posts.filter((p) => p._id !== post._id));
    await API.delete( `users/${post._id}`);
  };

  return (
    <div className='flex flex-col font-mono w bg-slate-700 pb-20 text-gray-200 items-center min-h-screen  w-full h-full '>
      <h1 className='flex mt-10 mb-2 text-4xl'>MERN-CRUD</h1>
      <h3 className='flex mb-10 text-xl'>REST Api, Axios</h3>
      <button
        onClick={() => navigate("/users/new")}
        class="flex items-center justify-center gap-2 bg-green-500 px-3 py-1 font-semibold uppercase rounded-lg hover:bg-green-700 mb-10"
      >
        New Post{<AiOutlinePlus className="text-xl font-bold"/>}
      </button>
      {isError !== "" && <h2>{isError}</h2>}
      <div className="flex flex-col w-full h-full overflow-x-scroll md:overflow-hidden items-start justify-center xl:items-center">
       
        <table className="table w-[1200px]  mx-10  border-slate-400">
          <thead>
            <tr >
              {/* <th class="border p-2  border-slate-300">Id</th> */}
              <th class="border p-2  border-slate-300">Fullname</th>
              <th class="border p-2  border-slate-300">Email</th>
              <th class="border p-2  border-slate-300">Image</th>
              <th class="border p-2  border-slate-300">Number</th>
              <th class="border p-2  border-slate-300">Interest</th>
              <th class="border p-2  border-slate-300">Date</th>
              <th class="border p-2  border-slate-300">Update</th>
              <th class="border p-2  border-slate-300">Delete</th>
            </tr>
          </thead>
          <tbody>
            {posts.slice(0, 10).map((post) => (
              <tr key={post._id}>
                {/* <td class="border p-5  border-slate-300">{post._id.slice(0, 5)}</td> */}
                <td class="border p-5  border-slate-300"> {post.fullname.slice(0, 10).toUpperCase()} </td>
                <td class="border p-5  border-slate-300"> {post.email.slice(0, 100)} </td>
                <td class="border p-5   border-slate-300" > <img src={post.image} alt="" className="flex rounded-full w-20 " />  </td>
                <td class="border p-5  border-slate-300"> {post.mobile} </td>
                <td class="border p-5   border-slate-300">   {
                 post.interest.map((tag) => (
                    <p key={tag} className="flex uppercase bg-indigo-600 px-3 rounded-sm w-fit m-2 ">{tag}</p>
                  ))
                } </td>
                <td class="border p-5  border-slate-300">{moment(post.date).format("DD-MM-YYYY ")}</td>

                <td class="border p-5  border-slate-300">
                  <button
                    onClick={() => navigate(`users/${post._id}`)}
                    class="bg-cyan-500 px-3 py-1 font-semibold uppercase rounded-lg hover:bg-cyan-600"
                  >
                    Update
                  </button>
                </td>
                <td class="border p-5  border-slate-300">
                  <button
                    onClick={() => handleDelete(post)}
                    class="bg-red-500 px-3 py-1 font-semibold uppercase rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Posts;
