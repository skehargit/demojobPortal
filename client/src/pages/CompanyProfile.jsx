import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Login } from "../redux/userSlice";
import { HiLocationMarker } from "react-icons/hi";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhoneCall, FiUpload } from "react-icons/fi";
import { Link, useParams } from "react-router-dom";
import { CustomButton, JobCard, Loading, TextInput } from "../components";
import { apiRequest, handleFileUpload } from "../utils";
import Card from "../components/Card";

const CompanyForm = ({ open, setOpen }) => {
  const { user } = useSelector((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: { ...user },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errMsg, setErrMsg] = useState(null);

  const dispatch = useDispatch();
  const [profileImage, setProfileImage] = useState("");
  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrMsg(null);

    const uri = profileImage && (await handleFileUpload(profileImage));
    const newData = uri ? { ...data, profileUrl: uri } : data;
    newData.user = { userId: user?._id };

    try {
      const res = await apiRequest({
        url: "/companies/update-company",
        token: user?.token,
        data: newData,
        method: "PUT",
      });
      setIsLoading(false);

      if (res.status === "failed") {
        setErrMsg({ ...res });
      } else {
        setErrMsg({ status: "success", message: res.message });
        const newData = { token: res?.token, ...res?.user };
        dispatch(Login(newData));
        localStorage.setItem("userInfo", JSON.stringify(data));
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const closeModal = () => setOpen(false);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold leading-6 text-gray-900"
                >
                  Edit Company Profile
                </Dialog.Title>

                <form
                  className="w-full mt-2 flex flex-col gap-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <TextInput
                    name="name"
                    label="Company Name"
                    type="text"
                    register={register("name", {
                      required: "Company Name is required",
                    })}
                    error={errors.name ? errors.name.message : ""}
                  />

                  <TextInput
                    name="location"
                    label="Location/Address"
                    placeholder="eg. California"
                    type="text"
                    register={register("location", {
                      required: "Address is required",
                    })}
                    error={errors.location ? errors.location.message : ""}
                  />

                  <div className="w-full flex gap-2">
                    <div className="w-1/2">
                      <TextInput
                        name="contact"
                        label="Contact"
                        placeholder="Phone Number"
                        type="text"
                        register={register("contact", {
                          required: "Contact is required!",
                        })}
                        error={errors.contact ? errors.contact.message : ""}
                      />
                    </div>

                    <div className="w-1/2 mt-2">
                      <label className="text-gray-600 text-sm mb-1">
                        Company Logo
                      </label>
                      <input
                        type="file"
                        onChange={(e) => setProfileImage(e.target.files[0])}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col">
                    <label className="text-gray-600 text-sm mb-1">
                      About Company
                    </label>
                    <textarea
                      className="rounded border border-gray-400 focus:outline-none focus:border-[#14a800] focus:ring-1 focus:ring-[#14a800] text-base px-4 py-2 resize-none"
                      rows={4}
                      cols={6}
                      {...register("about", {
                        required: "Write a little bit about your company.",
                      })}
                      aria-invalid={errors.about ? "true" : "false"}
                    ></textarea>
                    {errors.about && (
                      <span
                        role="alert"
                        className="text-xs text-red-500 mt-0.5"
                      >
                        {errors.about.message}
                      </span>
                    )}
                  </div>

                  <div className="mt-4">
                    <CustomButton
                      type="submit"
                      containerStyles="inline-flex justify-center rounded-md border border-transparent bg-[#14a800] px-8 py-2 text-sm font-medium text-white hover:bg-[#1d4fd846] hover:text-[#1d4fd8] focus:outline-none"
                      title={"Make Changes"}
                    />
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const CompanyProfile = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.user);
  const [info, setInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);

  const fetchCompany = async () => {
    setIsLoading(true);
    let id = params.id ? params.id : user?._id;
    try {
      const res = await apiRequest({
        url: "/companies/get-company/" + id,
        method: "GET",
      });
      // console.log(res);
      setInfo(res?.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  // const dets = async ()=>{
  //   const res = await apiRequest({
  //     url: "/job-detail/" + info?._id,
  //     method: "GET",
  //   });
  //   console.log(res);
  // }

  // dets();

  return (
    <div className="container mx-auto p-5">
      <div className="">
        <div className="w-full flex flex-col md:flex-row gap-3 justify-between">
          <h2 className="text-gray-600 text-xl font-semibold">
            Company: {info?.name}
          </h2>

          {info?._id === user?._id && (
            <div className="flex items-center justify-center py-5 md:py-0 gap-4">
              <CustomButton
                onClick={() => setOpenForm(true)}
                title="Edit Profile"
                containerStyles="py-1.5 px-3 md:px-5 focus:outline-none bg-[#14a800] hover:bg-[#14a800] text-white rounded text-sm md:text-base border border-[#14a800]"
              />

              <Link to="/upload-job">
                <CustomButton
                  title="Upload Job"
                  iconRight={<FiUpload />}
                  containerStyles="text-[#14a800] py-1.5 px-3 md:px-5 focus:outline-none rounded text-sm md:text-base border border-[#14a800]"
                />
              </Link>
            </div>
          )}
        </div>

        <div className="w-full flex flex-col md:flex-row justify-start md:justify-between mt-4 md:mt-8 text-sm">
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <HiLocationMarker /> {info?.location ?? "No Location"}
          </p>
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <AiOutlineMail /> {info?.email ?? "No Email"}
          </p>
          <p className="flex gap-1 items-center px-3 py-1 text-slate-600 rounded-full">
            <FiPhoneCall /> {info?.contact ?? "No Contact"}
          </p>

          <div className="flex flex-col items-center mt-10 md:mt-0">
            <span className="text-xl">{info?.jobPosts?.length}</span>
            <p className="text-[#14a800]">Job Post</p>
          </div>
        </div>
      </div>

      <div className="w-full mt-20 flex flex-col gap-2">
        <p>Jobs Posted by <span className="text-[#14a800]">{info?.name}</span></p>
        <div className="flex flex-wrap gap-3">
          {info?.jobPosts?.length === 0 && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-gray-500">No Jobs Posted</p>
            </div>
          )}
          {info?.jobPosts?.map((jobId, index) => (
            <Card jobId={jobId} name={info.name} key={index} info={info} job={info} />
            
          ))}
          {/* {console.log(info)} */}
        </div>
      </div>

      <CompanyForm open={openForm} setOpen={setOpenForm} />
    </div>
  );
};

export default CompanyProfile;
