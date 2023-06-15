import API from "../../Api/api";
import { useEffect, useState } from "react";


import { useParams, useNavigate } from "react-router-dom";

const Post = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [image, setImage] = useState('')
  const [mobile, setMobile] = useState('')
  const [interest, setInterest] = useState('')
  // const [post, setPost] = useState();

  // useEffect(() => {
  //   if (!id) return;
  //   const fetchPost = async () => {
  //     const { data } = await API.get(`/users/${id}`);

  //     setPost(data);
  //   };
  //   fetchPost();
  // }, []);

  const user = {
    fullname: fullname,
    email: email,
    image: image,
    mobile: mobile,
    interest:interest
  }

  const convertToBase = (e)=>{
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result)
    }
    reader.onerror = error => {
      console.log('error',error);
    }
  }

  // const handleChange = (e) => {
  //   const postClone = { ...post };
  //   postClone[e.target.name] = e.target.value;
  //   setPost(postClone);
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id === "new") {
      await API.post('/users/new', user);
      return navigate("/");
    } else {
      await API.patch(`/users/${id}`, user);
      console.log(id);
      return navigate("/");
    }

  };

  return (
    <div className='flex flex-col bg-slate-700 pb-20 text-gray-200 font-mono font-semibold items-center justify-center  w-full h-screen '>
      <div className="flex flex-col w-full items-center justify-center">
        <form className='flex sm:w-[400px] w-[300px]  flex-col rounded-lg p-5 gap-10 bg-purple-800 '>
          <input
            type="text"
            placeholder="Fullname"
            value={fullname}
            name="fullname"
            className='flex bg-transparent border-b-2 pb-2 outline-none'
            onChange={(e)=>setFullname(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            name="email"
            className='flex bg-transparent border-b-2 pb-2 outline-none'
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="file"
            placeholder="Image"
            name="image"

            onChange={convertToBase}
          />
          <input
            type="text"
            placeholder="Mobile"
            name="mobile"
            value={mobile}
            className='flex bg-transparent border-b-2 pb-2 outline-none'
            onChange={(e) => setMobile(e.target.value)}
          />   <input
            type="text"
            placeholder="Interested Domain"
            name="interest"
            value={interest}
            className='flex bg-transparent border-b-2 pb-2 outline-none'
            onChange={(e) => { setInterest(e.target.value.split(/[.,!,?]/)) }}
          />
   
          <button onClick={handleSubmit} className='flex uppercase text-xl tex bg-pink-600 hover:bg-pink-800 rounded-xl px-3 py-2 items-center justify-center'>
            {id === "new" ? "Post" : "Update"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Post;
