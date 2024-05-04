import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { unFriend } from "../features/post/postActions";

function List(props) {
  const [openModal, setOpenModal] = useState(false);
  const [email, setEmail] = useState("");

  const { id, token } = useSelector((store) => store.user);

  function onCloseModal() {
    setOpenModal(false);
    setEmail("");
  }

  const handleChange = async (_id) => {
    await unFriend(token, _id);
  };

  const name = props.name;
  const list = props.list;
  const ID = props.id;
  console.log(name, list, ID);

  return (
    <>
      <Button
        className="text-black rounded-full"
        onClick={() => setOpenModal(true)}
      >
        <span className="text-lg hover:text-rose-700">{name}</span>
      </Button>
      <Modal
        show={openModal}
        size="md"
        className="py-auto"
        onClose={onCloseModal}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="flex flex-col ">
            <div className="px-10 overflow-hidden">
              <div className="text-blue-200 overflow-y-auto text-lg">
                {list && list.length > 0 ? (
                  list?.map(({ _id, name, image, profession }) => {
                    return (
                      <div
                        className="flex items-center py-3 border-b border-b-gray-300"
                        key={_id}
                      >
                        <Link
                          to={`/profile/${_id}`}
                          onClick={onCloseModal}
                          key={_id}
                        >
                          <div className="cursor-pointer flex flex-row items-center ">
                            <div className="rounded-full ">
                              <img
                                src={image}
                                className="h-20 w-20 rounded-full object-cover"
                                alt={name}
                              />{" "}
                            </div>

                            <div className="ml-6">
                              <h3 className="text-xl font-semibold text-black">
                                {name}{" "}
                              </h3>
                              <p className="text-sm font-light text-green-600">
                                {profession}{" "}
                              </p>
                            </div>
                          </div>
                        </Link>

                        {ID === id && (
                          <div className="flex flex-row ml-auto">
                            <button
                              type="submit"
                              className="text-black text-xl font-medium"
                              onClick={() => handleChange(_id)}
                            >
                              <IoPersonRemoveSharp />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="text-black">No Records</div>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default List;

// import { Button, Modal } from "flowbite-react";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { IoPersonRemoveSharp } from "react-icons/io5";
// import { useSelector } from "react-redux";
// import { unFriend } from "../features/post/postActions";

// function List(props) {
//   const [openModal, setOpenModal] = useState(false);
//   const [email, setEmail] = useState("");

//   const { id, token } = useSelector((store) => store.user);

//   function onCloseModal() {
//     setOpenModal(false);
//     setEmail("");
//   }

//   const handleChange = async (_id) => {
//     await unFriend(token, _id);
//   };

//   const name = props.name;
//   const list = props.list;
//   const ID = props.id;
//   console.log(name, list, ID);

//   return (
//     <>
//       <Button
//         className="text-black  rounded-full"
//         onClick={() => setOpenModal(true)}
//       >
//         <span className="text-lg hover:text-rose-700">{name}</span>
//       </Button>
//       <Modal
//         show={openModal}
//         size="md"
//         className="py-auto"
//         onClose={onCloseModal}
//         popup
//       >
//         <Modal.Header />
//         <Modal.Body>
//           <div className="flex flex-col ">
//             <div className="px-10 overflow-hidden">
//               <div className=" text-blue-200 overflow-y-auto text-lg ">
//                 {list && list.length > 0 ? (
//                   list?.map(({ _id, name, image, profession }) => {
//                     return (
//                       <div
//                         className="flex items-center py-3 border-b border-b-gray-300"
//                         key={_id}
//                       >
//                         <Link
//                           to={`/profile/${_id}`}
//                           onClick={onCloseModal}
//                           key={_id}
//                         >
//                           <div className="cursor-pointer flex flex-row items-center ">
//                             <div className="rounded-full ">
//                               <img
//                                 src={image}
//                                 className="h-20 w-20 rounded-full object-cover"
//                               />{" "}
//                             </div>

//                             <div className="ml-6">
//                               <h3 className="text-xl font-semibold text-black">
//                                 {name}{" "}
//                               </h3>
//                               <p className="text-sm font-light text-green-600">
//                                 {profession}{" "}
//                               </p>
//                             </div>
//                           </div>
//                         </Link>

//                         <div className="flex flex-row">
//                         {ID === id && (

//                           <button
//                             type="submit"
//                             className="text-black text-xl ml-10 font-medium"
//                             onClick={() => handleChange(_id)}
//                           >
//                             <IoPersonRemoveSharp />
//                           </button>
//                         )}
//                         </div>
//                       </div>
//                     );
//                   })
//                 ) : (
//                   <div className="text-black">No Records</div>
//                 )}
//               </div>
//             </div>
//           </div>
//         </Modal.Body>
//       </Modal>
//     </>
//   );
// }

// export default List;
