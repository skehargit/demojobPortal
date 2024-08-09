import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall } from "react-icons/fi";
import { CustomButton, TextInput } from "../components";
import { Link, useNavigate } from "react-router-dom";

// const UserForm = ({ open, setOpen }) => {
//   const { user } = useSelector((state) => state.user);
//   console.log(user);
//   const {
//     register,
//     handleSubmit,
//     getValues,
//     watch,
//     formState: { errors },
//   } = useForm({
//     mode: "onChange",
//     defaultValues: { ...user },
//   });
//   const dispatch = useDispatch();
//   const [profileImage, setProfileImage] = useState("");
//   const [uploadCv, setUploadCv] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   // console.log(uploadCv)
//   const onSubmit = async (data) => {
//     // console.log(data)
//     setIsSubmitting(true);
//     try {
//       console.log(data);
//       const newData = uri ? { ...data, profileUrl: uri } : data;
//       const res = await apiRequest({
//         url: "/users/update-user",
//         token: user?.token,
//         data: data,
//         method: "PUT",
//       });

//       if (res) {
//         const newData = { token: res?.token, ...res?.user };
//         dispatch(Login(newData));
//         localStorage.setItem("userInfo", JSON.stringify(res));
//         window.location.reload();
//       }
//       setIsSubmitting(false);
//     } catch (error) {
//       console.log(error);
//       setIsSubmitting(false);
//     }
//   };

//   const closeModal = () => setOpen(false);
//   useEffect(() => {
//     console.log(user);
//   });
//   return (
//     <>
//       <Transition appear show={open ?? false} as={Fragment}>
//         <Dialog as="div" className="relative z-10" onClose={closeModal}>
//           <Transition.Child
//             as={Fragment}
//             enter="ease-out duration-300"
//             enterFrom="opacity-0"
//             enterTo="opacity-100"
//             leave="ease-in duration-200"
//             leaveFrom="opacity-100"
//             leaveTo="opacity-0"
//           >
//             <div className="fixed inset-0 bg-black bg-opacity-25" />
//           </Transition.Child>

//           <div className="fixed inset-0 overflow-y-auto">
//             <div className="flex min-h-full items-center justify-center p-4 text-center">
//               <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//               >
//                 <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
//                   <Dialog.Title
//                     as="h3"
//                     className="text-lg font-semibold leading-6 text-gray-900"
//                   >
//                     Add Additional info
//                   </Dialog.Title>

//                   <form
//                     className="w-full mt-2 flex flex-col gap-5"
//                     onSubmit={handleSubmit(onSubmit)}
//                   >
//                     <div className="w-full flex gap-2">
//                       <div className="w-1/2">
//                         <TextInput
//                           name="currentCompany"
//                           label="Current Company"
//                           placeholder="currentCompany"
//                           type="text"
//                         />
//                       </div>
//                       <div className="w-1/2">
//                         <TextInput
//                           name="currentSalary"
//                           label="current Salary"
//                           placeholder="current Salary"
//                           type="text"
//                         />
//                       </div>
//                     </div>

//                     <div className="w-full flex gap-2">
//                       <div className="w-1/2">
//                         <TextInput
//                           name="contact"
//                           label="Contact"
//                           placeholder="Phone Number"
//                           type="text"
//                         />
//                       </div>

//                       <div className="w-1/2">
//                         <TextInput
//                           name="location"
//                           label="Location"
//                           placeholder="Location"
//                           type="text"
//                         />
//                       </div>
//                     </div>
//                     <div className="w-full flex gap-2">
//                       <div className="w-1/2">
//                         <TextInput
//                           name="experience"
//                           label="Experience"
//                           placeholder="Experience"
//                           type="text"
//                         />
//                       </div>

//                       <div className="w-1/2">
//                         <TextInput
//                           name="currentLocation"
//                           label="current Location"
//                           placeholder="current Location"
//                           type="text"
//                         />
//                       </div>
//                     </div>
//                     <select className="border p-2" name="openToRelocate" id="">
//                       <option value="">open To Relocate</option>
//                       <option value="">YES</option>
//                       <option value="">NO</option>
//                     </select>
//                     <select className="border p-2" name="joinConsulting" id="">
//                       <option value="">Join Consulting</option>
//                       <option value="">Post Graduation</option>
//                       <option value="">lateral</option>
//                     </select>
//                     <TextInput
//                       name="currentJobRole"
//                       label="Current Job Role"
//                       placeholder="Current Job Role"
//                       type="text"
//                     />
//                     <div className="w-full flex gap-2 text-sm">
//                       <div className="w-1/2">
//                         <label className="text-gray-600 text-sm mb-1">
//                           Profile Picture
//                         </label>
//                         <input
//                           type="file"
//                           onChange={(e) => setProfileImage(e.target.files[0])}
//                         />
//                       </div>

//                       <div className="w-1/2">
//                         <label className="text-gray-600 text-sm mb-1">
//                           Resume
//                         </label>
//                         <input
//                           type="file"
//                           onChange={(e) => setUploadCv(e.target.files[0])}
//                         />
//                       </div>
//                     </div>

//                     <div className="flex flex-col">
//                       <label className="text-gray-600 text-sm mb-1">
//                         About
//                       </label>
//                       <textarea
//                         className="ounded border border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-base px-4 py-2 resize-none"
//                         rows={4}
//                         cols={6}
//                         {...register("about", {
//                           required:
//                             "Write a little bit about yourself and your projects",
//                         })}
//                         aria-invalid={errors.about ? "true" : "false"}
//                       ></textarea>
//                       {errors.about && (
//                         <span
//                           role="alert"
//                           className="text-xs text-red-500 mt-0.5"
//                         >
//                           {errors.about?.message}
//                         </span>
//                       )}
//                     </div>

//                     <div className="mt-4">
//                       <CustomButton
//                         type="submit"
//                         containerStyles="inline-flex justify-center rounded-md border border-transparent bg-[#14a800] px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none "
//                         title={"Submit"}
//                       />
//                     </div>
//                   </form>
//                 </Dialog.Panel>
//               </Transition.Child>
//             </div>
//           </div>
//         </Dialog>
//       </Transition>
//     </>
//   );
// };

const UserProfile = () => {
  const { user } = useSelector((state) => state.user);
  // const [open, setOpen] = useState(false);
  const navigate = useNavigate()
  const userInfo = user;
  console.log(user.cvUrl);
  return (
    <div className="container mx-auto flex items-center justify-center py-10 ">
      <div className="w-full md:w-2/3 2xl:w-2/4 bg-white flex flex-col gap-3 shadow-lg p-10 rounded-lg">
        <div className="flex gap-3">
          <div className="w-36 h-36 rounded-full border border-blue-500 flex items-center justify-center">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png?20200919003010"
              alt=""
            />
          </div>
          <div className="">
            <h2 className="text-4xl capitalize">
              {" "}
              {userInfo?.firstName + " " + userInfo?.lastName}
            </h2>
            <div className="flex flex-col text-sm">
              <p className="flex gap-1 items-center py-1 text-slate-600 rounded-full">
                <AiOutlineMail /> {userInfo?.email ?? "No Email"}
              </p>
              <p className="flex gap-1 items-center py-1 text-slate-600 rounded-full">
                <FiPhoneCall /> {userInfo?.contactNumber ?? "No Contact"}
              </p>
              <p className="flex gap-1 items-center py-1 text-slate-600 rounded-full">
                <HiLocationMarker />{" "}
                {userInfo?.currentLocation ?? "No Location"}
              </p>
            </div>
          </div>
        </div>
        <div className="capitalize border rounded p-2">
          <div>resume</div>
          <div className="border rounded h-10 overflow-hidden">
            {user?.cvUrl != "" ? (
              <a href={userInfo?.cvUrl}>
                <div className="bg-blue-500 p-2 text-white">view Resume</div>
              </a>
            ) : (
              <Link to={"/upload-resume"}>
                <div className="bg-blue-500 p-2 text-white">Upload Resume</div>
              </Link>
            )}
          </div>
        </div>
        <div className="capitalize border rounded p-2">
          <div>Details</div>
          <div className="pl-2">
            <div className="flex text-sm gap-2">
              <p className="">experience :</p>
              <p className="text-slate-600">
                {userInfo?.experience ?? "experience"}
              </p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Current Company :</p>
              <p className="text-slate-600">
                {userInfo?.currentCompany ?? "current company"}
              </p>
            </div>
            <div className="flex text-sm gap-2">
              <p>Current Job :</p>
              <p className="text-slate-600">
                {userInfo?.currentJobRole ?? "currentJobRole"}
              </p>
            </div>
            <div className="flex text-sm gap-2">
              <p>join Consulting :</p>
              <p className="text-slate-600">
                {userInfo?.joinConsulting ?? "joinConsulting"}
              </p>
            </div>
            <div className="flex text-sm gap-2">
              <p>open To Relocate :</p>
              <p className="text-slate-600">
                {userInfo?.openToRelocate ?? "openToRelocate"}
              </p>
            </div>
          </div>
        </div>
        <div className="border rounded p-2">
          <div>Profile summary</div>
          <p className="text-slate-600 pl-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat
            facere eveniet nam ut officia iste magni repudiandae cupiditate
            harum assumenda.
          </p>
          {/* {userInfo?.about ?? "No About Found"} */}
        </div>
        <div className="border rounded p-2 ">
          <button
            className="w-full md:w-64 bg-blue-500 text-white py-2 capitalize rounded"
            onClick={() =>{
              navigate('/user-additional-details')
            }}
          >
            update details
          </button>
        </div>
      </div>

      {/* <UserForm open={open} setOpen={setOpen} /> */}
    </div>
  );
};

export default UserProfile;
